/**
 * VMK wire protocol: framing, the Diffie-Hellman handshake, and the RC4 variant.
 *
 * Every rule here was read out of the client's own Lingo, not guessed. The
 * sources, so a future reader can check the claims rather than trust them:
 *
 *   CConnection.msghandler   (core.old.cct, script 184) — server->client framing
 *   CConnection.send         (same)                     — client->server framing
 *   CConnection.GetStrFrom / GetIntFrom / ToInt         — parameter encoding
 *   CMainHandler.connectionReady (vmk_main, 239fb1d2)   — the DH exchange
 *   CMainHandler.regMsgList  (same)                     — the message id table
 *   CDecoderRC4              (core.old.cct, script 73)  — Setkey/Encipher/Decipher
 *   String_Services_Class    (core.old.cct, script 40)  — pDigits, the hex alphabet
 *
 * The two directions are NOT symmetric, which is the easiest thing to get wrong:
 *
 *   server -> client:  <hdr1><hdr2> <params...> 0x01      strings end with 0x02
 *   client -> server:  <len3><len2><len1><cmd1><cmd2> <params...>   strings are
 *                      length-prefixed with ToInt, and there is no terminator
 */

/** A malformed or unusable message from the peer. Never fatal to the server. */
export class VmkProtocolError extends Error {}

/**
 * What the client sends as its "public key" when encryption is disabled:
 * `connectionReady`'s else branch is literally `send(11, [#str: "00"])`, and it
 * does not install an encoder. Treat this as "stay plaintext", not as a key.
 */
export const NO_ENCRYPTION_KEY = "00";

/** Message ids the client listens for; see CMainHandler.regMsgList. */
export const MSG = {
  CONNECTION_LOST: -1,
  GENERIC_ERROR: 2000,
  CONNECTION_READY: 2001,
  HELLO: 2002,
  CONNECTION_DROPPED: 2011,
  INACTIVITY_ALERT: 2012,
  REMOVE_LOGIN_WINDOW: 2018,
  /**
   * The "VMK Staff Alert" dialog — a modal box with a single OK button.
   *
   * `CMainHandler._AdminMessage` (cast `239fb1d2`, `cast.entry.2`) reads:
   * ```
   * str message
   * int target    -- 0 user, 1 room, 2 queue, 3 global
   * ```
   * and does `createDialogWindow(id, "AdminMessage", 1, 1)` then
   * `setText(message, getText("admin.message.<target>.hd"), "OK")`. The target
   * only picks the TITLE — `admin.message.user.hd` is "Personal Message from
   * VMK Staff", `.global.hd` is "VMK Staff Alert to VMK" — it does not route
   * anything, so the server decides who receives it by who it sends to.
   *
   * ⚠ NOT the same thing as the messenger's `2548`. That one files a message
   * into the friends/messages panel (player mail, minigame rewards); this is
   * the alert dialog. And `COpenVMKHandler`'s `handle_generalalert` is a third,
   * unusable option — its cast `2230483a` is absent from `cast.entry.*`, so
   * that listener never registers.
   */
  ADMIN_MESSAGE: 2240,
  /** No body: `CHelpHandler.HelpReceivedOK` shows "your call for help was sent". */
  HELP_RECEIVED_OK: 2215,
  // From CRegistrationHandler.regMsgList (vmk_registration, fb72f4a9); see
  // SESSION-HANDOFF 6f for the full registration table.
  /** Reply to GetName: `[str name, int permissionCount, ...int permissions]`. */
  SET_NAME: 2510,

  /**
   * Reply to `INSTANCE_INFO_BY_TAG` (36): a single `int` — the REAL room id.
   *
   * `CRegistrationHandler.InstanceInfo` clears `m_bRegistrationGoingOn`,
   * unregisters the registration listeners, and calls
   * `_UpdateRegData(roomId, "LandingRoomRealID")`. That category is the ONLY one
   * that makes `CRegPageBase.update` fire
   * `send(31, [#integer: roomId, #integer: -1])` — the room request. Without
   * this reply the client shows its UI and then sits forever on a black stage,
   * having never asked for a room.
   *
   * ⚠ 2023 HAS TWO DIFFERENT FORMATS, chosen by who is listening.
   *
   *   during registration  `CRegistrationHandler.InstanceInfo` — ONE int
   *   afterwards           `Navigator_Handler_Class.InstanceInfo` —
   *                        `int spaceId, int maxUsers, int count,
   *                         then count x (int instanceId, int userCount)`
   *
   * They do not collide, because the registration handler is guarded by
   * `m_bRegistrationGoingOn` and calls `this.regMsgList(0)` to unregister itself
   * the first time it fires. So the single int is correct as a reply to
   * `INSTANCE_INFO_BY_TAG` (36), and the long form is correct as a reply to
   * `NODE_INSTANCES` (26) — see `instanceInfoParams`.
   */
  INSTANCE_INFO: 2023,
  /**
   * A list of guest rooms for the navigator. From
   * `Navigator_Handler_Class.spaceListSearch`:
   * ```
   * int count
   *   int id, str name, str owner, str desc,
   *   int friendsOnly, int accessFromNavi, int userCount, int maxUsers
   * ```
   * ⚠ `count = 0` is meaningful, not empty: the handler returns `NoResults()`,
   * which is how the window says "no rooms" instead of hanging half-open.
   *
   * 2030, 2032 and 2033 are all bound to the SAME handler, so which one is used
   * only reflects the question asked — the client renders them identically.
   */
  SPACE_LIST_SEARCH: 2030,
  SPACE_LIST_OWN: 2032,
  SPACE_LIST_FRIENDS: 2033,

  // ---- avatar creation (login state 1) -------------------------------------
  // Field orders below are read from the client's own handlers in
  // CRegistrationHandler, not inferred. An unhandled/short message falls
  // through VMK's `case` silently, so a wrong layout presents as a hang.
  /**
   * Reply to GetNewAvatarSets (502). `getAvailableSets` reads, in order:
   *   int maleCount,   then that many int set ids
   *   int femaleCount, then that many int set ids
   *   12 ints — the default MALE figure
   *   12 ints — the default FEMALE figure
   */
  GET_AVAILABLE_SETS: 2502,
  /**
   * The hair ids that CANNOT wear a hat: `int count`, then that many int ids.
   *
   * ⚠ Not optional, and nothing asks for it. `CRegistrationHandler.AllClothesLoaded`
   * only proceeds when `m_bHatListReady and m_bAvailableSetsReady`, and this
   * message is the ONLY thing that sets the first flag. Without it the client
   * loads every clothing cast, fires AllClothesLoaded, takes the early exit, and
   * sits there forever having never sent 512 — no error, no screen.
   *
   * The sense is inverted from what the name suggests: `GetHatList(hairId)`
   * returns 1 (hat allowed) when the id is NOT in this list. An empty list is
   * therefore the permissive answer — every hairstyle can wear a hat.
   */
  HAIR_LIST_FOR_HATS: 2512,
  /**
   * Reply to GenarateNames (512) — the typo is VMK's.
   * ⚠ `GeneratedNames` reads an int count and then loops **exactly 5 times**
   * regardless of it. Always send 5 strings or the frame desynchronises.
   */
  GENERATED_NAMES: 2515,
  /** Reply to SendNewName (511) when rejected: `int reason`, plus `str info` when 0 < reason < 5. */
  NAME_REJECTED: 2511,
  /** Reply to CreateAvatar (507) on success. Takes NO parameters. */
  AVATAR_CREATED: 2507,
  /** Reply to CreateAvatar (507) on failure: `int count`, then that many `str` name suggestions. */
  AVATAR_NOT_CREATED: 2508,
  /** Where to drop the new player: `int roomCode`. */
  LANDING_ROOM: 2514,
  /** `int count`, then that many int room ids. */
  AVAILABLE_GUEST_ROOMS: 2509,
  /** Reply to NavigatorHandshake. Takes no parameters; fires `ui_show`. */
  NAVIGATOR_HANDSHAKED: 2034,
  /**
   * Reply to both GET_ROOT_NODE (25) and NAVIGATE_NODE (22).
   * `Navigator_Handler_Class.navigationNodeInfo` reads, in order:
   *   int nodetag, int parentnodetag, int absoluteNodeUserCount,
   *   int instanceInfoIncluded, int spaceCount,
   *     per space: int isPublic
   *       public  -> int spaceId, int tag
   *       private -> int spaceId, str name, str owner, str description,
   *                  int friendOnly, int accessFromNavi, int userCount, int maxUsers
   *       if instanceInfoIncluded -> int maxUsers, int instanceCount,
   *                                  per instance: int instanceId, int userCount
   *   int childNodeCount, per child: int childTag, int childAbsoluteUserCount
   */
  NAVIGATION_NODE_INFO: 2020,
  /** Reply to GET_PARENT_CHAIN (21): int count, then that many ints. */
  PARENT_CHAIN: 2021,
  /**
   * Room entry. From `CRoomHandler._Config` (`fda7c1aa`) — that cast registers
   * its listeners inline in `_Config` rather than in a `regMsgList`, which is
   * why the room ids are not in the 6f tables.
   *
   * `_EnterRoom` reads, in order:
   *   int roomCode, int roomVer, str roomText, int roomRef
   *
   * The client then resolves everything else **locally, from variables**:
   *   `room.code.<roomCode>`      -> room name        (141 of these in our config)
   *   `room.cast.<roomCode>.1..N` -> the room's casts (420 entries)
   *   `preload.<roomRef>`         -> items to preload (optional; skipped if absent)
   * and calls `_CreateRoom(xml, roomVer, roomRef)` + `ShowLoadBar(roomText, roomCode)`.
   * So the server only has to name a room code that exists in the config.
   */
  ENTER_ROOM: 2590,
  LEAVE_ROOM: 2591,
  /**
   * Tells the client WHICH public room it is in. From
   * `CRoomInfoHandler.PublicRoomInfoMessage` (`6df220c5`):
   * ```
   * int roomTag
   * int instanceID      -- the client adds 1 before indexing its title list
   * ```
   * It then calls `setPublicInfo` / `setPublic` / `enterRoom` and sets the
   * session's `RoomType` to `#public`.
   *
   * ⚠ MORE LOAD-BEARING THAN IT LOOKS. `CRoomInfoComponent.m_iRoomTag` starts
   * at -1 and this is the ONLY message that ever sets it, and two unrelated
   * features read it back:
   *
   *   • the room info tab, via `getRoomByTag` -> `ROOM.<tag>.NAME`/`.DESC`
   *   • the BILLBOARDS: `CBillBoardsComponent.LateActivation` builds the
   *     variable name `"room." & tRoomTag & ".board." & n`, so with the tag
   *     left at -1 it looks up `room.-1.board.1`, finds nothing, and every
   *     board stays on its `shadow.pixel` placeholder — a black rectangle.
   *
   * `roomTag` is the same room code as ENTER_ROOM. Send `instanceID` 0 unless
   * instances are actually implemented; the client turns that into 1.
   */
  PUBLIC_ROOM_INFO: 2584,
  /** Private/guest room counterpart of PUBLIC_ROOM_INFO; same handler class. */
  GUEST_ROOM_INFO: 2587,
  /**
   * Refresh a guest room's name/description after an edit.
   * `CRoomInfoHandler.GuestRoomInfoUpdate` reads:
   * ```
   * int roomTag, str roomName, str roomDescription, int accessibilityCode
   * ```
   * ⚠ PLAIN STRINGS here, unlike `2587`, which carries the same two fields as
   * canned-text token streams. The two messages disagree, so they cannot share
   * an encoder.
   */
  GUEST_ROOM_INFO_UPDATE: 2796,
  /** `int entryState` — drives `setRoomEntryState` (the friends-only lock). */
  GUEST_ROOM_ENTRY_STATE: 2884,
  /** NO parameters — raises the "clear this room?" confirm dialog. */
  CONFIRM_CLEAR_ROOM: 2812,
  /**
   * Open a configurable item's settings dialog:
   * `[int ref, int count, (str key, str value) × count]`.
   *
   * ⚠ This — not a state toggle — is what an interactive-but-CONFIGURABLE item
   * expects back from `584 UseItem`. A turnstile double-click asks the server
   * for its settings and opens a dialog; toggling its state does nothing
   * visible. Keys are per item class: a turnstile reads `fee` and `credits`.
   */
  ITEM_CONFIGURATION: 2881,
  /** Same shape as `2881`; the already-configured view rather than the editor. */
  CURRENT_ITEM_CONFIGURATION: 2882,
  /**
   * Outcome of a configuration:
   * `[int ref, int status, int count, (str key, str value) × count]`.
   *
   * Status is a small enum the item class switches on — for the turnstile, 2
   * closes the pay dialog and 3 reports collected credits (`collected`,
   * `credits`). Anything else logs "Unknown configuration status".
   */
  ITEM_CONFIGURATION_USED: 2883,
  /**
   * The Steamboat stage (`CSteamBoatHandler`, room 57): someone stepped onto
   * the tile named `podium`. `[int avatarRef]` — the client lights the "stage
   * beams", plays `SB-lightson` and projects that avatar's figure on "screen".
   */
  STEAMBOAT_ENTER_PODIUM: 2840,
  /** They stepped off (or left): screen and lights off. No params. */
  STEAMBOAT_EXIT_PODIUM: 2841,
  /** `int spaceId, str spaceName, int refund` — the "sell this room?" dialog. */
  ROOM_SELL_CONFIRM: 2794,
  /** `int spaceId, int refund` — the room is gone; the navigator refreshes. */
  ROOM_SOLD: 2795,
  // The rest of the room protocol, for when entry works. Same source.
  /** ⚠ STUB IN THE CLIENT — `_CreateFloors` is `put "TODO"`. Never send it. */
  CREATE_FLOORS: 2580,
  REMOVE_FLOOR: 2581,
  /**
   * Reply to `ROOM_START` (580). Until it is sent NOTHING appears in the room —
   * not even the player's own avatar. Format from `CRoomHandler._CreateAvatars`:
   * ```
   * int count
   *   str name, int sex, str desc
   *   int figure[12]                     -- exactly what 507 gave us
   *   int pinCount   -> {int code, level, singleUse} x
   *   int iconCount  -> {int code} x
   *   int ref, int tile, int stack
   *   int actions[12]                    -- [9] trade state, [12] friend request
   * ```
   * ⚠ Both 12-length arrays are read unconditionally; a short one desynchronises
   * the frame. `tile` is resolved by the ROOM via `_AccessIndexed(tile,"tile")` —
   * an unknown index logs "Referred tile not found" and leaves the avatar
   * unplaced; `-1` explicitly hides it.
   */
  CREATE_AVATARS: 2582,
  /**
   * A player's appearance changed. `CRoomHandler._ModifyAvatar`:
   * ```
   * int ref, int figure[12], int ref, int tile, int stack, int actions[12]
   * ```
   * ⚠ `ref` really is sent TWICE — the handler reads it again after the figure
   * and before the tile. Both are the same avatar; the second read overwrites
   * the first and is then unused, but the field must be there or the tile and
   * actions land one int early.
   */
  MODIFY_AVATAR: 2504,
  /**
   * Reply to `REQUEST_AVATAR_DATA` (505) — what the clothing button opens with.
   * `CAvatarFactoryHandler.getAvatarData`:
   * ```
   * str name, int sex, str slogan, int figure[12]
   * ```
   */
  AVATAR_DATA: 2505,
  /**
   * The signature, pushed to everyone in the room.
   * `CRoomHandler._AvatarSlogan`: `int ref`, then CANNED TEXT, which it stores
   * as the avatar's `DESC` param — that is what the profile panel shows.
   *
   * ⚠ Canned text here, but `AVATAR_DATA` (2505) carries the SAME slogan as a
   * plain string. The two are not interchangeable.
   */
  AVATAR_SLOGAN: 2506,
  /**
   * Acknowledge `CHANGE_SLOGAN` (506). `CAvatarFactoryHandler.SloganChanged`
   * reads one int and passes it to the interface as `a_iFromHK`: non-zero
   * picks the "changed by staff" wording, 0 the ordinary "changed" dialog.
   */
  SLOGAN_CHANGED: 2513,
  /**
   * Reply to `GET_FIGURE_LIST` (501): `int count`, then that many set ids.
   *
   * ⚠ MUST NOT BE EMPTY. `CAvatarFactoryHandler.getAvailableSets` only acts
   * `if t_ar_iSetList.count > 0`, so a zero count leaves the clothes loader
   * un-created and the Character window draws as a blank panel.
   */
  AVAILABLE_SETS: 2501,
  /** `int credits` — reply to `REQUEST_BALANCE` (14). */
  RECEIVE_CREDITS: 2014,
  /**
   * Inventory contents. `CInventoryHandler._ReceiveItemList`:
   * ```
   * int inventoryId   -- 1 items, 3 worn pins, 5 vmks
   * int clearFlag     -- replace rather than append
   * int count
   *   int ref, int typeCode, int category, str itemGroup, int itemCount
   *     category 1 (items):   int paramCount, then that many ints
   *     category 2 (clothes): nothing further
   *     category 3 (posters): nothing further
   *     category 4 (pins):    int param, int singleUse, int expiryDate
   * ```
   */
  RECEIVE_ITEM_LIST: 2532,
  /**
   * What the player is wearing. `CInventoryHandler._ReceiveWornClothes`:
   * `int count`, then `int ref, int code, str group` each.
   */
  RECEIVE_WORN_CLOTHES: 2535,
  /**
   * Worn pins: `[int count, (int ref, int code, int param, int singleUse,
   * int expiryDate, str itemGroup) × count]`.
   *
   * ⚠ MUST be sent, even empty. `CInventoryHandler` registers it and ends with
   * `GetInventory(3).UpdateItemList(#pins, …)`; inventory 3 is the worn-pins
   * grid, and it is the ONLY thing that populates it. We were sending `2535`
   * for clothes and nothing for pins, so that grid was never initialised —
   * which is what took the inventory down when the pins tab was opened.
   *
   * ⚠ The field order is NOT the same as `2532`: itemGroup comes LAST here,
   * after the three pin fields, where in `2532` it precedes them.
   */
  RECEIVE_WORN_PINS: 2536,
  /**
   * `2523 _UnwearPin`: `int srcRef, int destRef, str srcGroup, str destGroup`.
   * destRef -1 simply REMOVES `srcRef`/`srcGroup` from the lanyard (inventory
   * 3). ⚠ The only way off it: `2536` merges into the worn grid and never
   * deletes, so a resend alone left taken-off pins showing.
   */
  PIN_UNWORN: 2523,
  /**
   * `2527 getAvailableMagic` — the magic menu's list, one entry per worn magic
   * pin: `int count`, then `int fxId, int pinCode, int effect, str name,
   * str magicWord, int secondsUntilReady, int stars, int active, int singleUse,
   * int expiry`. An effect of 4 marks the Teleportation entry.
   */
  AVAILABLE_MAGIC: 2527,
  /**
   * No body — `Navigator_Handler_Class.UserWasKicked`: opens the navigator and
   * shows "You've been booted…" (guest-room or public wording by `RoomType`).
   */
  USER_WAS_KICKED: 2790,
  /** `int avatarRef, <canned tokens with count>` — a line in the trade window. */
  TRADE_CHAT: 2562,
  /** `str message` — shown in the trade window as from "VMK Administration". */
  TRADE_CHAT_NOTIFICATION: 2563,
  /** `int requesterRef, int requestId` — "Do you want to trade with $?" */
  TRADE_REQUEST: 2594,
  /**
   * `int partnerRef, int response` — 1 OPENS the trade window (send it to BOTH
   * players), 0 shows "The invitation to trade was declined", 2 shows nothing.
   */
  TRADE_RESPONSE: 2595,
  /**
   * The whole trade, each player's OWN side first:
   * `int myLevel, int n, n x item, int theirLevel, int m, m x item`, where an
   * item is `int ref, int code, int cat` then, for cat 1, `int k, k x int param`
   * (a teleporter half: [1, pairId, partnerRef]) and, for cat 4, `int pinLevel`.
   */
  TRADE_STATUS: 2596,
  /** `int status` — 1 cancelled, else completed. Closes the trade window. */
  TRADE_FINISHED: 2597,
  REMOVE_AVATAR: 2589,
  LOCATE_AVATAR: 2585,
  /**
   * Place items in the room. `CRoomHandler._CreateElements`:
   * ```
   * int count
   *   int ref, int typeCode, int category, int placeRef, int allowGuestMove
   *   int paramCount        -- how many ints FOLLOW, dir and state included
   *   category 1,5 (furniture):  int dir, [int state], [extra params...]
   *   category 3 (poster):       int x, int y, int z, [extra params...]
   *   category 6,7 (collectable):int dir, [int state]
   * ```
   * `placeRef` is a TILE ref for 1/5/6/7 and a WALL ref for 3; the handler
   * errors with "Referred tile not found" if it does not exist in the room.
   *
   * ⚠ `paramCount` is a countdown, not a count of "extras". The handler reads
   * dir and decrements, reads state only `if t_iPrm` and decrements, then reads
   * whatever remains. So 1 = dir only, 2 = dir + state.
   *
   * ⚠ NOTHING about behaviour is sent. The client resolves `typeCode` through
   * the furnimap for art and footprint, and through the `CRoomObjectType<code>`
   * class variable for behaviour — that is what makes code 283 ("Invisible
   * Public Room Chair With Height Zero") a seat rather than scenery.
   */
  CREATE_ELEMENTS: 2586,
  /** `CRoomHandler._RemoveElement`: `[int ref]`. Element, poster or collectable. */
  /**
   * The shop's tab structure. `CCatalogHandler.CatalogIndex`:
   * ```
   * int shopCount
   *   int nameId          -- client renders getText("cat.name." & nameId)
   *   int pageCount
   *     int pageId, str title, int special
   * ```
   * ⚠ `nameId` is a TEXT KEY id, not a string. A nameId with no `cat.name.<n>`
   * entry gives a blank tab, since the client resolves the label itself.
   */
  CATALOG_INDEX: 2701,
  /**
   * One shelf. `CCatalogHandler.GetCatalogCategory`:
   * ```
   * int pageId, str name, int layout, int productCount
   *   int code, int price, int keyPairCount
   *     str key, str value          -- per pair
   * ```
   * ⚠ `layout = 3` diverts the whole reply to `_SaveRoomList` instead of the
   * product grid — that is the guest-room shelf, not furniture.
   */
  CATALOG_CATEGORY: 2016,
  /** Purchase accepted. Errors go on 4015-4018 / 4700 / 4701 instead. */
  PURCHASE_OK: 2017,
  /**
   * Guest-room purchase accepted: `int catalogueCode, int spaceId`.
   * `CCatalogHandler.RoomPurchaseOk` hands the pair to the rooms view, which
   * opens "Room created" and whose GO TO ROOM sends `31 [spaceId, -1]`.
   */
  ROOM_PURCHASE_OK: 2700,
  REMOVE_ELEMENT: 2531,
  /**
   * `CInventoryHandler._PinsCombined`: `[int updatedRef, str oldGroup, str
   * newGroup, int newLevel, int removedRef, str removedGroup]`.
   */
  PINS_COMBINED: 2539,
  /**
   * `CInventoryHandler.HandleLevelRequirementNotMetMessage`: `[int itemCode,
   * int requiredLevel, int avatarLevel]` -> `ShowLevelRequiredScreen`.
   */
  LEVEL_REQUIREMENT_NOT_MET: 2908,
  /**
   * `CInventoryHandler._ListItemGroups`: `[int inventoryId, int count, {str
   * group, int items, int ref}...]` — updates slot counts in place.
   */
  LIST_ITEM_GROUPS: 2930,
  /**
   * `CVMKCentralHandler.openCatalogPage`: `[int shop, int page]` — opens the
   * shop on that page (`showCatalogPage`). Answers `701`.
   */
  OPEN_CATALOG_PAGE: 2702,
  /** `CRoomHandler._RemovePoster`: `[int ref]`. Poster index only. */
  REMOVE_POSTER: 2530,
  /**
   * Take items out of an inventory grid: `int inventoryId, int count`, then per
   * item `int ref, int category, str itemGroup`.
   *
   * ⚠ `ref` and `itemGroup` must match what `2532 ReceiveItemList` sent for that
   * row, because `RemItem(cat, ref, grp)` matches on all three. Category is the
   * 1/2/3/4 items/clothes/posters/pins scale, and an unrecognised value hits an
   * explicit `error()` in `_RemItemsFromList`.
   */
  REMOVE_ITEMS_FROM_LIST: 2520,
  /**
   * Reply to `REQUEST_ITEM_DETAILS` (535). `CInventoryHandler._ItemDetails`:
   * ```
   * int code, str owner, int type
   *   type 1: int ref, int entityID   (-1 means "omit")
   *   type 2: int ref
   *   type 3..6: nothing
   *   type 7: int pinLevel, str magicWord
   *   type 8: int timeToExpire, str magicWord
   *   type 9: int timeToExpire, str validForRooms
   * ```
   * `code` is the item TYPE code — the panel titles itself with
   * `getText("item." & code)` — and `type` must echo what the request asked for.
   */
  ITEM_DETAILS: 2522,
  /**
   * `int inventoryId, int clearFlag, int count`, then per entry
   * `str group, int pairCount, pairCount x (str key, str value)`.
   * Must follow `2532` — details only attach to groups already listed.
   * Room tickets carry `goodfor` = the room owner's name.
   */
  INVENTORY_ITEM_DETAILS: 2533,
  /** `int ref, int type, int price` — "Are you sure?" before a sale. */
  SELL_CONFIRM_REQUEST: 2537,
  /**
   * Sale done: `int fromHK (0), int showAlert, int price, int itemCount,
   * int category, int ref, str group`. The client removes the item itself;
   * the new balance still needs `2014`.
   */
  SELL_CONFIRMED: 2538,
  /**
   * `CRoomHandler._UpdateElement` — move, rotate or restate an EXISTING item:
   * ```
   * int ref, int category, int placeRef, int allowGuestMove, int paramCount
   *   category 1,5: int dir, [int state if paramCount > 1]
   *   category 3:   int x, int y, int z
   * ```
   * ⚠ Use this, NOT a second `CREATE_ELEMENTS` with the same ref — that path
   * creates rather than updates, and would leave a duplicate element behind.
   *
   * ⚠ `paramCount` counts dir plus any state: 1 = dir only, 2 = dir + state.
   */
  UPDATE_ELEMENT: 2599,
  /**
   * `CRoomHandler._FailedToPlace` — `int ref, int reason`: the "couldn't place
   * this" dialog (`room.placefurni.failed.title`). Reason 0 is
   * `error.failedtoplace.0` "Furniture placement failed", 1 is
   * `error.failedtoplace.1` "Maximum items in room reached" (no room cap exists
   * here yet, so only 0 is sent). The client changes nothing on a PlaceItem
   * until the server answers, so this is the whole refusal.
   */
  FAILED_TO_PLACE: 2534,
  /**
   * One movement step. Format from `CRoomHandler._StatusPulse`:
   * ```
   * int count
   *   int ref, int tile, int stack
   *   int actions[12]
   * ```
   * The handler calls `WalkToTile(tile, stack)` and then `Actions(actions)`.
   *
   * ⚠ ONE HOP PER MESSAGE. `CRoomFactorAvatar.WalkToTile` lerps from where the
   * avatar stands to the target over `m_iStatusDelay` = **500 ms** and has no
   * route logic; worse, a pulse arriving while `m_bWalking` is set calls
   * `SetToTileStack` and SNAPS to the old target first. So pulses must be one
   * adjacent tile apart and ~500 ms apart, or the walk animation never plays.
   */
  STATUS_PULSE: 2583,
  AVATAR_CHAT: 2560,
  AVATAR_INFO: 2592,
  CANCEL_ROOM_LOAD: 2042,
  /**
   * `int spaceId, int code` — `Navigator_Handler_Class._EntranceDenied`.
   * 1001 cancels the room load, reopens the navigator and shows the
   * `nav.ticketing.*` "no valid ticket" dialog; 1000 is the "kicked" dialog;
   * any other code does nothing at all.
   */
  ENTRANCE_DENIED: 2040,
  /**
   * `int itemCode, str message` — an NPC answered a double-click. Every NPC
   * cast's handler (`handleNPCClicked`) opens `createNPCDialogWindow` with the
   * message, a "<Name> Found!" title and the NPC's portrait.
   */
  NPC_CLICKED: 2710,
  /**
   * `int count`, per animation `int ref, int type, int state, int age,
   * int n, n x int, int m, m x str` — an NPC cast's `RoomAnimationList`,
   * sent on room entry so a newcomer sees the NPC's current state.
   */
  ROOM_ANIMATION_LIST: 2791,
  /**
   * `int ref, int state` — play one of the NPC's animations. The state
   * numbers are per NPC; see `animations` in npcs.ts.
   */
  ROOM_ANIMATION_STATE: 2792,
  /**
   * `int elementRef, str message, str name` — a speech bubble from an
   * ELEMENT (`CRoomHandler._ElementChat`), in the NPC's own colour, anchored
   * at the element's tile. Plain text, not canned; an empty name falls back
   * to `item.<type>`.
   */
  ELEMENT_CHAT: 2598,
  /**
   * Reply to GET_SOUND_PREFS (781), from `CSoundHandler.regMsgList`
   * (`42c66f7b`). `GetSoundSettings` reads **six ints** in this order:
   *   fx, music, ui, volume, tutorialState, tradeRequests
   * and stores them on the session object, then fires `set_tutorials_state`,
   * `ResetRoomSound` and `ResetFXChannels`.
   *
   * ⚠ This gates ALL audio. `CLoadingWindow.EnableLoadingSound` — and the same
   * pattern elsewhere — is wrapped in `if getObject(#session).get("fx") then`,
   * so until this message arrives `fx` is unset and every `PlaySound()` is
   * skipped. Silence is the symptom of a missing reply, not a broken decoder.
   *
   * The payload is confirmed from both directions: `CSoundHandler.SetSoundSettings`
   * sends command 780 with the identical six ints.
   */
  GET_SOUND_SETTINGS: 2780,
  /**
   * Reply to GET_POPULAR (29). `Navigator_Handler_Class.spaceListPopular`
   * reads **two** lists back to back — featured spaces, then ordinary ones:
   *   int count, per entry: int id, str name, str owner, str description,
   *                         int friendsOnly, int accessFromNavi,
   *                         int userCount, int maxUsers
   * Both loops are `repeat with i = 1 to count`, so `[0, 0]` is well formed and
   * yields two empty lists. Sending only one count leaves the second read
   * consuming whatever follows in the buffer.
   */
  SPACE_LIST_POPULAR: 2031,
  /**
   * The themed guest-room list (`Navigator_Handler_Class.spaceListRoomType`):
   * int roomCode, int count, then entries shaped exactly as SPACE_LIST_POPULAR's.
   * Opens the ThemedGuestRoomNavigator. Reply to GET_POPULAR_BY_TYPE (830).
   */
  SPACE_LIST_ROOM_TYPE: 2830,
  /**
   * `SpaceListRoomTypeTrigger [int roomCode]`: makes the client ask for that
   * list (it sends GET_POPULAR_BY_TYPE). What an `open_navigator` exit sends —
   * the Frontierland Dock's booth opens the Mark Twain guest rooms.
   */
  SPACE_LIST_ROOM_TYPE_TRIGGER: 2831,
  /**
   * `MonorailEvent [int state]` — both monorail handlers (station
   * `CMonorailStationHandler`, train `CMonorailTrainHandler`) listen for it:
   *   10 train approaching, 1 stopped with doors open (the client switches the
   *   boarding exits ON), 0 doors close and it leaves, 2 hidden / between stops.
   */
  MONORAIL_EVENT: 2730,
  /**
   * `NextMonorailStop [int stopId]` — the train's destination display and
   * music. Stop ids from `CMonorailTrainHandler.construct`: 20 Main Street,
   * 21 Adventureland, 22 Frontierland, 23 Fantasyland, 24 Tomorrowland,
   * 92 New Orleans Square. The station handler only logs it.
   */
  MONORAIL_NEXT_STOP: 2731,
  /**
   * Reply to QUERY_CAMERA (767), from `CInterfaceHandler.regMsgList`
   * (`02a651b7`). `CameraStatus` reads exactly one int: 1 sets the session's
   * `HasCamera` and shows the message-bar camera icon, anything else hides it.
   * Purely cosmetic — it does not gate room entry.
   */
  CAMERA_STATUS: 2762,

  // ---- photos (camera a279e2, catalog 1cc362, album aca627, wall fb3299).
  // The pictures themselves travel on the photo socket (photo-server.ts).
  /** `CRegistrationHandler.SaveSessionId`: `[int status, str sessionID, str failure]`. */
  SAVE_SESSION_ID: 2010,
  /** `CCameraHandler.FilmCounter`: `[int film]`. */
  FILM_COUNTER: 2760,
  /** `CPhotoCatalogHandler.PhotoCatalogIndex`: `[int count, int id...]`. */
  PHOTO_CATALOG_INDEX: 2761,
  /** `SuccessfullyPlacedPhotoOnWall`: `[int photoId]`. */
  PHOTO_PLACED_ON_WALL: 2763,
  /** `CWallPhotoViewer.PhotoIdOfPoster`: `[int ref, int photoId]`. */
  PHOTO_ID_OF_POSTER: 2764,
  /** `SuccessfullyRemovedPhotoFromWall`: `[int ref, int photoId]`. */
  PHOTO_REMOVED_FROM_WALL: 2765,
  /** `PublishPhotoResponse`: `[int action, int photoId, int code]` (0 ok, 1 error, 2 album full). */
  PUBLISH_PHOTO_RESPONSE: 2766,
  /** `PhotoAlbumStatus`: `[int pics, int capacity]`. */
  PHOTO_ALBUM_STATUS: 2767,
  /** `CHiddenMickeyHandler`: `[int reqId, int newMickeyFound]` — answers 770. */
  HIDDEN_MICKEY_IN_PICTURE: 2770,

  // ---- music mixers (CMusicMixerHandler / CMusicPlayerHandler; music-mixer.ts)
  /** No body. `ui_MusicMixer`: the ONLY thing that opens the mixer window. */
  OPEN_MIXER: 2750,
  /** `int n, (int id, str name) x n`. Mixer: fills and opens the manager; stage: the play list. */
  SONG_LIST: 2751,
  /** `str data` — the song's track list literal, for REMIX. */
  SONG_DATA: 2752,
  /** `int result (0 ok, 1 all slots full), int songId`, then a song list. */
  CREATE_SONG_RESULT: 2753,
  /** `int result`, then a song list. Also answers RenameSong, which has no reply of its own. */
  SAVE_SONG_RESULT: 2754,
  /** `int result`, then a song list. */
  DELETE_SONG_RESULT: 2755,
  /** `str data, str songName, str avatarName` — to the whole room: plays it, "Playing X, mixed by Y". */
  PLAY_SONG_RESULT: 2756,
  /** `int flag`: 1 open the song picker, 0 "No Songs Available", 2 hide the picker. */
  PLAY_SONG_QUEUE_START: 2757,
  /** No body. Mixer: `InvalidSongName` dialog. (The stage's `PlaySongNotFound` shares the id.) */
  INVALID_SONG_NAME: 2758,
  /** No body. The performance is over; the stage's player state resets. */
  PLAY_SONG_QUEUE_END: 2759,

  // ---- minigame engine (CGameHandler, cast minigame_engine; jungle-cruise.ts)
  /**
   * One turn: `int turn, int checksum, int nSubturns`, then per subturn
   * `int nEvents, (int count, count x int)*` — each event's first int is its
   * code. The client plays a turn over `m_fTurnPulse` (1.65 s) and checks the
   * checksum (`CIterateSeed.IterateSeed(turn)` plus its engine objects).
   */
  GAME_STATUS_UPDATE: 2601,
  /**
   * `int n, n x object`; an object is `int count, type, ref, owner, team, x, y,
   * z, dir, (count-8) x extra`. ⚠ Only after the client's 602 — before
   * `StartMinigameEngine` there is no room context and objects come out VOID.
   */
  GAME_OBJECTS_LIST: 2605,
  /**
   * Objects as 2605 then a turn as 2601: replaces the client's world
   * wholesale (deletes what is not listed) — the answer to action 3.
   * ⚠ Never use 2603: Disney's `_GameUpdateObject` builds a misaligned prop
   * list in the original bytecode and loses position and direction.
   */
  GAME_FULL_STATUS: 2609,
  /** One object as 2605 carries it — the player's own (`GetMyObjects`). */
  GAME_CREATE_MY_OBJECT: 2610,
  /**
   * `str stage, int version, int paramCount, (str key, str value)*`. The older
   * engine copy reads only the first two; the trailing count is harmless there.
   */
  GAME_LOAD_STAGE: 2607,
  /** `int timeToStart`. */
  GAME_START_STAGE: 2611,
  /** `int timeToStart, int n, n x int`. */
  GAME_END_STAGE: 2612,
  /** `int roomCode` (ignored): the in-place switch into the game scene. */
  GAME_PREPARE_ROOM: 2613,
  /** `int n, (int avatarRef, str name, int figCount, figCount x int) x n`. */
  GAME_PARTICIPANT_LIST: 2614,
  /** `int n, (int avatarRef, int rank, int score) x n`, at most 3 for fireworks. */
  GAME_INFO_UPDATE: 2615,

  // ---- minigame lobby (CLobbyHandler, cast minigame_lobby)
  /** `int gameRef` — the game is gone. */
  LOBBY_GAME_REMOVED: 2640,
  /** `int n, (int gameRef, str name, int numParticipants, int timeLeft) x n`. */
  LOBBY_GAME_LIST: 2641,
  /**
   * `int n`, per game `int ref, str desc, int ownerRef, int timeLeft, int nAv,
   * (int ref, int team, int k, (str, str) x k) x nAv, int m, (str, str) x m`.
   */
  LOBBY_GAME_DATA: 2642,
  /** `int gameRef, int avatarRef, int team, int k, (str, str) x k`. */
  LOBBY_GAME_JOINED: 2643,
  /** `int gameRef, int avatarRef` — the kicked player gets the "kicked" dialog. */
  LOBBY_AVATAR_KICKED: 2644,
  /** `int code` — shown as `lobby.error.create.<code>`. */
  LOBBY_CREATE_FAILED: 2645,
  /** `int state` — answers SET_READY_TO_PLAY. */
  LOBBY_READY_TO_PLAY: 2646,
  /** `int code` — shown as `lobby.error.join.<code>`. */
  LOBBY_JOIN_FAILED: 2647,
  /** `int gameRef, int avatarRef`. */
  LOBBY_AVATAR_LEFT: 2648,
  /** `int gameRef, int avatarRef, int team, int k, (str, str) x k`. */
  LOBBY_SET_PARTICIPANT_DATA: 2650,
  /** `int k, (str, str) x k` — Pirates reads `c` (cost; its presence enables NEW GAME). */
  LOBBY_GAME_CONDITIONS: 2651,
  /** `int code` — shown as `lobby.error.start.<code>`. */
  LOBBY_START_FAILED: 2652,

  // ---- high scores (CHighscoreHandler, cast vmk_highscore)
  /** `int myRank, int n, (int rank, int score, str name) x n`. */
  HIGH_SCORES: 2660,
  /** Haunted Mansion's Hall of Fame: `int gameId, int scoreType, int n, (int rank, int score, str name) x n`. */
  HIGH_SCORES_HM: 2662,

  // ---- messenger (CMessyCheeseStuff.regMsgList, cast 0b6ee192 = cast.entry.7)
  // Bodies are parsed by `parseServerMessage` from a descriptor; see
  // messenger.ts for the friend-entry shape these share.
  /** No body. Acknowledges `MESSENGER_INIT`. */
  MESSENGER_READY: 2540,
  /** `int count, count x friendEntry` — REPLACES the whole address book. */
  FRIEND_LIST: 2541,
  /** Same body; MERGES entries by userID (presence and room changes). */
  FRIEND_LIST_UPDATE: 2542,
  /** `int msgid, int senderID, str date, canned content, str avatarName`. */
  INSTANT_MESSAGE: 2543,
  /** `int requesterId, str requesterName`. */
  FRIEND_REQUESTED: 2544,
  /** One friendEntry, no count. */
  FRIEND_ADDED: 2545,
  /** `int userId`. */
  FRIEND_REMOVED: 2546,
  /** `int userId, str name`. */
  MESSENGER_AVATAR_INFO: 2547,
  /**
   * `int msgid, int flash, str date, str content` — a message from VMK Staff
   * (sender 0) filed in the messenger inbox. `flash` 1 pops the messenger open
   * on it. Not the modal `ADMIN_MESSAGE` (2240).
   */
  MESSENGER_STAFF_MESSAGE: 2548,
  /** As `MESSENGER_STAFF_MESSAGE` plus `str url, str caption` (a link button). */
  MESSENGER_STAFF_RESOURCE_MESSAGE: 2549,
  /** `int requesterId` — "their friend list is full". */
  ADD_FRIEND_FAILED: 2550,
  /** No body. Makes the client re-send `MESSENGER_INIT`. */
  MESSENGER_REINITIALIZE: 2551,

  // ---- full-room queue + FastPass (Navigator_Handler_Class, cast eba88a10) --
  /**
   * `_QueueRoom`: `[str roomName, int position]`. Position is 0-based (the
   * window shows +1); the first one fixes the bar's 100%. -1 hides the queue
   * window — send it just before admitting the player.
   */
  QUEUE_ROOM: 2041,
  /**
   * `CreateFastPass`: `[int spaceId, int instanceId, str spaceName, int
   * position]`. The pass's ENTER button re-sends `31 [spaceId, instanceId]`.
   */
  CREATE_FAST_PASS: 2832,
  /** `CancelFastPass`: no body. Closes the pass window. */
  CANCEL_FAST_PASS: 2833,
  /**
   * `FastPAssQueuePosition`: `[int position]`. -1 = your turn: ENTER lights
   * and flashes, counting down `fast.pass.flash.time` (20) seconds.
   */
  FAST_PASS_QUEUE_POSITION: 2834,
} as const;

/** Command ids the client sends; see CMainHandler.regMsgList tCmds. */
export const CMD = {
  LOGIN: 10,
  /** Client's DH public key. Sent literally as `send(11, ...)` in connectionReady. */
  PUBLIC_KEY: 11,
  ACTIVE_RESPONSE: 12,
  /** Leave the full-room queue (`roomqueue.cancel`). No body. */
  CANCEL_ROOM_QUEUE: 41,
  /** Swap a queue place for a FastPass (queue window's FASTPASS button). No body. */
  GET_FAST_PASS: 832,
  /** Throw the FastPass away (`fastpass.leave`). No body. */
  DISCARD_FAST_PASS: 833,

  // ---- messenger (CMessyCheeseStuff, cast 0b6ee192) ------------------------
  /** No body. Sent once per login, on `init_messenger`. */
  MESSENGER_INIT: 540,
  /** No body. POLLED while a friends view is open, so answer cheaply. */
  FRIEND_LIST_REFRESH: 541,
  /** No body. */
  FRIEND_LIST_FULL: 542,
  /** `int messageId`. Sent when a message is DELETED from the inbox. */
  MESSAGE_READ: 543,
  /**
   * `int recipientCount, int recipient, canned tokens` — the tokens carry NO
   * leading count (`TransformCannedToMsg(x, 1)`), so they run to the end of the
   * body. Compose always sends one recipient.
   */
  SEND_INSTANT_MESSAGE: 544,
  /**
   * `str characterName`. Two senders: the messenger's `RequestFriendship`, and
   * the room profile's "ask friendship" button (`AskToBeFriend`), which is the
   * one players actually use.
   */
  ASK_TO_BE_FRIEND: 545,
  /** `int requesterId`. */
  ACCEPT_FRIEND_REQUEST: 546,
  /** `int requesterId`. */
  DECLINE_FRIEND_REQUEST: 547,
  /** `int friendId`. */
  REMOVE_FRIEND: 548,
  /** `int userId`. */
  MESSENGER_AVATAR_INFO: 549,
  /** `int friendId` — move to the friend's room. */
  GO_TO_FRIEND: 550,
  /** `int messageId`. */
  REPORT_MESSAGE: 551,
  /**
   * Help window's "Call for Help" (`CHelpHandler.callForHelp`, cast 1a936647):
   * `[int category, <canned text WITH a leading token count>, str harasserName]`.
   * Answered with `HELP_RECEIVED_OK` (2215). Filed for Housekeeping's queue.
   */
  CALL_FOR_HELP: 210,
  /** `int requesterId` — sent after a decline: refuse this player's requests. */
  IGNORE_FRIEND_REQUESTS: 593,
  /**
   * `send("GetName")` from CRegistrationHandler.HandleLogin state 0. The id is
   * not in CMainHandler's table — it was read off the wire (`@@BG~`) after the
   * client accepted a login, and is recorded here so it need not be rediscovered.
   */
  GET_NAME: 510,

  // ---- avatar creation (CRegistrationHandler tCmds) ------------------------
  /** `send("GetNewAvatarSets", [#int: 0])` from CRegistrationInterface.CreateAvatar. */
  GET_NEW_AVATAR_SETS: 502,
  /** `send("GenarateNames")` — no body. Typo is VMK's own. */
  GENERATE_NAMES: 512,
  /** `send("SendNewName", …)` — a chosen name to validate. */
  SEND_NEW_NAME: 511,
  /**
   * `send("CreateAvatar", …)` from CRegPage2._GatherData:
   *   str name, int sex (0 = M, 1 = F), then the figure as int pairs.
   */
  CREATE_AVATAR: 507,
  /** `send("AcceptEULA")` from CRegPage3.SendData — no body. The rules step. */
  ACCEPT_EULA: 508,

  /** CRegistrationHandler tCmds. Answered with MSG.NAVIGATOR_HANDSHAKED. */
  NAVIGATOR_HANDSHAKE: 20,
  // Navigator_Handler_Class tCmds (vmk_navigator, eba88a10).
  GET_PARENT_CHAIN: 21,
  /** Body is one int: the node tag to move to. Answered with NAVIGATION_NODE_INFO. */
  NAVIGATE_NODE: 22,
  GET_USER_SELECTABLE_NODES: 23,
  /** "My rooms" in the guest-room navigator. NO body (observed: 0 bytes). */
  GET_OWN_SPACES: 24,
  GET_ROOT_NODE: 25,
  /**
   * How many copies of a space are running, and how full each is.
   * Body is a single int — the space id (observed: 1–2 bytes).
   */
  NODE_INSTANCES: 26,
  /** Friends' rooms in the guest-room navigator. NO body (observed: 0 bytes). */
  FRIEND_SPACES: 27,
  SEARCH_PRIVATE: 28,
  /** Answered with SPACE_LIST_POPULAR. */
  GET_POPULAR: 29,
  /** `GetPopularSpacesByType [int roomCode]`. Answered with SPACE_LIST_ROOM_TYPE. */
  GET_POPULAR_BY_TYPE: 830,
  /**
   * Begin an emote. Body is one int, from `CEmoticons.eventProcEmoticons`:
   *   0 = dance (a toggle — ended with STOP_ACTION)
   *   1 = wave  (one-shot)
   */
  START_ACTION: 582,
  /** End an emote. Body is one int, the same code START_ACTION used. */
  STOP_ACTION: 583,
  /**
   * Rename / re-describe the room you are STANDING IN, from the room info tab.
   * `CRoomInfoInterface.SendEditRoomInfo` sends two canned-text blocks:
   * ```
   * canned roomName, canned roomDescription
   * ```
   * ⚠ These blocks DO carry their own token count: `TransformCannedToMsg` is
   * called with one argument, so `a_bNoPhraseLength` is VOID and the count is
   * written — unlike chat, where the sender passes 1 and omits it.
   */
  EDIT_ROOM_INFO: 594,
  /**
   * The same edit from the guest-room navigator, for a room you are not in.
   * `CGuestRoomNavigator.SendEditRoomInfo`:
   * ```
   * int roomId, int nameCount, canned roomName, int descCount, canned roomDescription
   * ```
   * ⚠ The counts appear TWICE. The caller writes `t_ar_roomName.count` itself
   * and then the canned block writes the identical value again. Read and
   * discard the outer one.
   */
  EDIT_ROOM_INFO_BY_ID: 37,
  /** `int state` — lock the current room to friends (1) or open it (0). */
  SET_FRIENDS_ONLY: 598,
  /**
   * `int flag` — empty the room of furniture. TWO-STEP:
   *   0 = the player asked; answer `2812` to raise the confirm dialog
   *   1 = they confirmed in that dialog; actually do it
   */
  CLEAR_ROOM_ITEMS: 812,
  /**
   * `int roomId, int confirm` — sell a room. Also two-step:
   *   0 = asked; answer `2794` with the name and refund to raise the dialog
   *   1 = confirmed; delete the room and answer `2795`
   */
  SELL_ROOM: 597,
  /** `int ref` — sell an inventory item; answered with `SELL_CONFIRM_REQUEST`. */
  SELL_ITEM_REQUEST: 522,
  /** `int ref` — the player confirmed; answered with `SELL_CONFIRMED`. */
  SELL_ITEM_CONFIRM: 525,
  /**
   * `int expiryChoice (1-4 = 1/3/7/30 days), int amount (1-10)` — buy room
   * tickets for the guest room you are standing in (room info → Create Tickets).
   */
  CREATE_ROOM_TICKET: 533,
  /**
   * The clothing button. `CAvatarBuilderInterface.OpenCloseAvatarBuilder` sends
   * it with NO body; answer with `AVATAR_DATA` (2505) or the builder opens with
   * nothing to edit.
   */
  REQUEST_AVATAR_DATA: 505,
  /**
   * The signature from the Character page ("MY SIGNATURE" / `set.myslogan`).
   * `CAvatarBuilderPage.SetUpMySlogan` builds it with `TransformCannedToMsg`
   * WITHOUT `a_bNoPhraseLength`, so unlike inbound chat (560/561) the body
   * DOES begin with a token count.
   *
   * ⚠ The client closes the builder as soon as it sends this and waits for
   * `SLOGAN_CHANGED` (2513) for its confirmation dialog.
   */
  CHANGE_SLOGAN: 506,
  /**
   * Place an item FROM THE INVENTORY: `[int itemRef, int tileRef, int x, y, z]`
   * (`CInvPageItems._PlaceElementCbk`). Distinct from `MOVE_ITEM`, which moves
   * something already in the room.
   */
  /**
   * The "i" button on a room item, and the entity-id lookup behind the VMKs
   * button. `[int avatarRef, int type, int itemRef]` — the type selects which
   * extra fields the reply carries; 3 (a room element) carries none.
   */
  /**
   * Save the client's settings: `CSoundHandler.SetSoundSettings` sends
   * `[int fx, int music, int ui, int volume, int tutorial, int traderequests]`
   * — the same six `GET_SOUND_SETTINGS` (2028) returns, in the same order.
   *
   * ⚠ Not just sound. `tutorial` and `traderequests` travel here too, and
   * `traderequests` is what enables the trade button on another player's
   * profile. Ignoring this message means every preference resets at login,
   * because the reply is what the client trusts.
   */
  /**
   * The quest button on the chat bar (and the Q hotkey).
   * `CMessageBar` fires `ui_questengine` -> `CQuestEngineComponent
   * .requestQuestEngineData` -> `GetCurrentTaskData`, which sends this and then
   * waits for `2853 CurrentTaskData`.
   *
   * ⚠ Unanswered, the quest UI simply hangs — there is no timeout and no error
   * path, so the button looks dead rather than unimplemented.
   */
  /** Open the shop. No parameters; answered with `CATALOG_INDEX` (2701). */
  CAT_INDEX_REQUEST: 15,
  /**
   * Show one shelf: `[int pageId]`, answered with `CATALOG_CATEGORY` (2016).
   *
   * ⚠ The page id carries NO shop context, so ids must be unique across the
   * whole catalogue or the wrong shelf is served.
   */
  CAT_CATEGORY_REQUEST: 16,
  /** Buy a guest room; answered with `ROOM_PURCHASE_OK` (2700). */
  /**
   * Buy the selected catalogue product: `[int typeCode, int pageId]`.
   *
   * ⚠ NOT `[pos, code]` with `pos` a slot index, as this was previously
   * documented. `m_iPos` is misleadingly named: it is assigned
   * `this.GetSelected().code`, so both ints identify the product, and neither
   * is a grid position.
   *
   * ⚠ The first int is the TYPE CODE, not a product row id —
   * `CCatalogFurniView.dialogWindowEvent` sends `m_iPos` (which is
   * `GetSelected().code`) and `m_iId` (`GetSelected().categoryId`, the page the
   * item was listed on). The pair is what identifies the purchase, so the price
   * must be looked up from the page rather than trusted from the client, which
   * never sends one.
   *
   * Answer `2017 PURCHASE_OK` with the same type code. The client then asks for
   * the balance itself, so no credit push is required (we send one anyway, to
   * keep the number right if the dialog is dismissed early).
   */
  BUY: 17,
  BUY_ROOM: 700,
  QUEST_CURRENT_TASK: 852,
  SET_SOUND_SETTINGS: 780,
  REQUEST_ITEM_DETAILS: 535,
  /** The state button on an item: `[int ref]`. Server decides the new state. */
  TOGGLE_ITEM: 815,
  /**
   * Use an interactive item in the room: `[int ref, int 0]`.
   *
   * ⚠ DOUBLE-click, not single. Every `CRoomItem*.select` that sends this wraps
   * it in `if the doubleClick then` and still calls `callAncestor(#select, …)`
   * afterwards, so a single click only ever walks you there. Walking on a
   * single click is the correct behaviour, not a missing interaction.
   *
   * Distinct from `TOGGLE_ITEM` in who may do it: toggling is the OWNER editing
   * their furniture from the element-control panel, using is any guest in the
   * room double-clicking it, which is the entire point of interactive pieces.
   */
  USE_ITEM: 584,
  /**
   * A settings dialog was SAVED: `[int ref, int count, (str key, str value) × count]`.
   * Sent by the dark-ride editor (`CRoomItemProximityConfig`, keys f fr r br b
   * bl l fl) and the turnstile. Not a request for the dialog — that is `584`.
   */
  CONFIGURE_ITEM: 810,
  /**
   * The configuration dialog was answered:
   * `[int ref, int ok, int count, (str key, str value) × count]`.
   *
   * `ok` is 1 for accept and 0 for cancel — `CRoomItemEntranceFeeTurnStile`
   * sends both, so a cancel still reaches the server.
   */
  USE_ITEM_CONFIGURATION: 811,
  CHANGE_ITEM_PROPERTIES: 813,
  /** `[int pinRef]` — put a pin on the lanyard (`CInvPagePins` WEAR). */
  WEAR_PIN: 523,
  /** `[int wornPinRef]` — take one off (TAKE OFF, or double-click in the worn grid). */
  UNWEAR_PIN: 530,
  /** `[int firstPinRef, int secondPinRef]` — merge two same magic pins (stars add, max 5). */
  COMBINE_PIN: 524,
  /** `[int fxId]` — cast a worn magic pin (spelled "ActivataMagicFx" in the client). */
  ACTIVATE_MAGIC_FX: 526,
  /** No payload — the magic menu asks for its list (answered with `2527`). */
  QUERY_MAGIC_FX: 527,
  /** No payload — STOP EFFECT. */
  DEACTIVATE_MAGIC_FX: 528,
  /**
   * `[int fxId, int tileRef]` — Teleportation magic: the tile the player
   * clicked after choosing it. (`SellClothing` is also registered as 529 but
   * nothing in the client ever sends it.)
   */
  MAGIC_TELEPORT: 529,
  /**
   * `[int avatarRef]` — the owner's BOOT button on a player's profile
   * (`CRoomAvatarProfile.dialogWindowEvent`, "RoomProfileKickUser" OK).
   */
  KICK_USER: 596,
  /**
   * Trading (`CInventoryHandler._Configure`). All ints:
   *   586 `TrdConfLevel [level]` — 1 "You accept", 0 untick / back out,
   *       2 final confirm (`CInvPageConfirmTrade` OK), -1 STOP TRADING;
   *   587 `TrdAddRemItem [0 add | 1 remove, 1, itemRowId]`;
   *   588 `TrdSendRequest [targetAvatarRef]` — the profile's TRADE button;
   *   589 `TrdResponse [0 decline | 1 accept | 2 ignore, requestId]`.
   * Trade chat arrives as 561 (`CInvTrade.SendMessage`), the room canned-say id.
   */
  TRADE_CONF_LEVEL: 586,
  TRADE_ADD_REMOVE_ITEM: 587,
  TRADE_SEND_REQUEST: 588,
  TRADE_RESPONSE: 589,
  PLACE_ITEM: 520,
  /** Take an item back to the inventory: `[int ref]`. */
  PICK_ITEM: 521,
  /**
   * Hang a poster from the inventory: `[int invRef, int wallRef, int x, int y,
   * int z]` (`CInvPagePosters._PlacePosterCbk`). x/y/z is the position on the
   * wall, from `CRoomObjectPlacer`; the wall's own `PlaneInside` already
   * checked it fits.
   */
  PLACE_POSTER: 531,
  /** Rehang a placed poster: `[int ref, int wallRef, int x, int y, int z]`. */
  MOVE_POSTER: 595,
  /** Rotate in place: `[int ref]`. The client sends no angle — the server picks. */
  ROTATE_ITEM: 590,
  /**
   * Move an item already in the room: `[int ref, int tileRef, int x, y, z]`.
   * From `CRoomElementControl.PlaceElementCbk`, at the END of a local drag —
   * the move button itself sends nothing.
   */
  MOVE_ITEM: 591,
  /**
   * A new outfit from the avatar builder. `CAvatarBuilderPage.parseToServerFormat`
   * sends `(int setId, int colour)` per part and nothing else — no name, no
   * trailing room style, unlike `CREATE_AVATAR` (507).
   *
   * ⚠ A part with `setId = -1` is followed by colour `-1`, so the pairs stay
   * even; the same shape registration uses.
   */
  CHANGE_FIGURE: 504,
  /**
   * What the avatar builder may dress you in. Sent with NO body right after
   * `REQUEST_AVATAR_DATA`, and answered with `AVAILABLE_SETS` (2501).
   *
   * ⚠ Distinct from registration's `502 GetNewAvatarSets` / `2502`, which has a
   * much longer payload (two gendered lists plus two default figures). This one
   * is a single flat list.
   */
  GET_FIGURE_LIST: 501,
  /** `int inventoryId` (0 = everything). Answer with `RECEIVE_ITEM_LIST`. */
  GET_ITEM_LIST: 532,
  /** No body. Answer with `RECEIVE_CREDITS` (2014). */
  REQUEST_BALANCE: 14,
  /**
   * Room entry. `PUBLIC_SPACE_REQUEST` is how the client asks to be put into a
   * public space; the navigator listens for 2040 `_EntranceDenied`,
   * 2041 `_QueueRoom` and 2042 `_CancelRoomLoad` in reply. Not yet exercised —
   * this is the next step for "put a player in a room".
   */
  PRIVATE_SPACE_REQUEST: 30,
  /**
   * Enter a public room. Body is **two ints: spaceId, instanceId** — the
   * hardcoded shortcuts in `CRoomInfoHandler` (`6df220c5`) show the shape
   * exactly: `send(31, [#integer: 21, #integer: -1])` for the Music Mixer,
   * `29` for the Monorail Train, `25` for Monorail Sulake. **-1 means "any
   * instance"**. Answered with ENTER_ROOM.
   */
  PUBLIC_SPACE_REQUEST: 31,

  /**
   * `send("InstanceInfoByTag", [#integer: m_iLandingRoom])` — id read from the
   * client's own `CRegistrationHandler.regMsgList` tCmds table.
   *
   * Sent once, from `CRegPageBase._EventProc` on `reg.regstep5.agree`, and ONLY
   * when `m_iLandingRoom` is already an integer > -1. Answer with
   * `INSTANCE_INFO` (2023) carrying the real room id; that is what finally makes
   * the client send `PUBLIC_SPACE_REQUEST` and enter the world.
   */
  INSTANCE_INFO_BY_TAG: 36,

  // Room commands, from CRoomHandler._Config. Unimplemented, listed so an
  // unhandled id can be recognised on sight rather than re-derived.
  ROOM_START: 580,
  ROOM_MOVE: 581,
  /** Chat bar. Body is canned-text tokens with NO leading count — see chat-tokens.ts. */
  ROOM_SAY: 560,
  /** Canned-message composer. Same token body as ROOM_SAY. */
  ROOM_CANNED_SAY: 561,
  /**
   * ⚠ TWO CASTS CLAIM 585, and the one that actually fires is the emoticon.
   *
   *   `CRoomHandler._Config`   registers it as "chat"
   *   `CEmoticons.regMsgList`  registers it as "SendEmoticon"
   *
   * Nothing in any loaded cast sends the room's "chat", while
   * `CEmoticons.ShowEmotInfo` does `send("SendEmoticon", [#int: t_iItemId])`.
   * So the body is ONE int — the emoticon id — which matches the 2-byte body
   * observed. Treating this as chat text would have mangled it.
   *
   * ⚠ It only fires on a DOUBLE click; a single click merely selects.
   */
  SEND_EMOTICON: 585,
  /** CInterfaceHandler tCmds. */
  QUERY_CAMERA: 767,
  // ---- photos (see MSG.FILM_COUNTER and photo-server.ts)
  QUERY_FILM_COUNTER: 760,
  /**
   * VMK Central's clickable posters (`CVMKCentralHandler`): `[int 0]` the
   * "click here for camera" cash register, `[int 1]` the river ad. The server
   * answers with `OPEN_CATALOG_PAGE`.
   */
  CENTRAL_AD_CLICKED: 701,
  REQUEST_PHOTO_CATALOG_INDEX: 761,
  /** `[int action, int photoId]`: 1 catalog -> album, 0 album -> catalog. */
  PUBLISH_PHOTO: 762,
  /** `[int photoId]`. No reply; the UI promises 5 credits. */
  DELETE_PHOTO: 763,
  /** `[int photoId, int wallRef, int x, int y, int z]` — hang as poster 3008. */
  PLACE_PHOTO_ON_WALL: 764,
  /** `[int ref]` — the 3008 poster's ref. */
  REMOVE_PHOTO_FROM_WALL: 765,
  /** `[int photoId, canned tokens...]` (no leading count). */
  EDIT_CAPTION: 766,
  /** `[int ref]` — which photo a 3008 poster shows. */
  REQUEST_PHOTO_ID_OF_POSTER: 768,
  TEST_ALBUM_STATUS: 769,
  /** `[int reqId, int left, int top]` — a Hidden Mickey was in the viewfinder. */
  HIDDEN_MICKEY_CHECK: 770,
  // ---- music mixers (see MSG.OPEN_MIXER). Names are canned tokens, no count.
  /** No body. EXIT / RETURN TO ROOM — back to the lobby or the train. */
  CLOSE_MIXER: 750,
  GET_SONGS: 751,
  /** `[int songId]`. */
  LOAD_SONG: 752,
  /** `[str data, name tokens...]`. */
  CREATE_SONG: 753,
  /** `[int listPosition, str data, name tokens...]` — a POSITION, see music-mixer.ts. */
  SAVE_SONG: 754,
  /** `[int songId]`. */
  DELETE_SONG: 755,
  /** `[int songId]` — perform it (on the stage). */
  PLAY_SONG: 756,
  /** `[int songId, name tokens...]`. */
  RENAME_SONG: 757,
  /** No body. "Don't perform" on the stage's song picker. */
  CANCEL_PLAY: 758,
  // ---- minigame engine / lobby / high scores (see MSG.GAME_STATUS_UPDATE)
  /** `int count, int action, (count-1) x int` — `_SendMinigameAction`. */
  GAME_ACTION: 601,
  /** No body — the stage has loaded (Jungle Cruise: the boat reached you). */
  GAME_STAGE_LOADED: 602,
  /** `int k, (str, str) x k` — client strings are length-prefixed. */
  LOBBY_CREATE_GAME: 640,
  /** `[int gameRef]` — the owner cancels. */
  LOBBY_REMOVE_GAME: 641,
  LOBBY_LIST_GAMES: 642,
  LOBBY_GET_GAME_DATA: 643,
  /** `int gameRef, int k, (str, str) x k` — Pirates: add an AI player `{a: slot, t: ship}`. */
  LOBBY_SET_GAME_DATA: 644,
  /** `int gameRef, int team, int k, (str, str) x k`. */
  LOBBY_JOIN_GAME: 645,
  /** `[int gameRef]`. */
  LOBBY_LEAVE_GAME: 646,
  /** `[int gameRef, int avatarRef]`. */
  LOBBY_KICK_FROM_GAME: 647,
  /** `[int gameRef]`. */
  LOBBY_START_GAME: 648,
  /** `[int state]` — the Dock's START GAME. */
  LOBBY_SET_READY_TO_PLAY: 649,
  /** `int gameRef, int avatarRef, int k, (str, str) x k` — Pirates: `t` ship, `team: switch`. */
  LOBBY_SEND_PARTICIPANT_DATA: 650,
  /** No body. */
  LOBBY_REQUEST_GAME_CONDITIONS: 651,
  /** `[int gameCode]` — 2 is Jungle Cruise. */
  GET_HIGH_SCORES: 660,
  /** `APIHighScore` for Haunted Mansion: `int gameCode (5), int indexType` (0 today, 1 week, 2 ever) → 2662. */
  GET_HIGH_SCORES_HM: 661,
  // CSoundHandler tCmds (42c66f7b). SET_SOUND_PREFS is the client saving its
  // own settings and expects no reply; GET_SOUND_PREFS is answered with
  // GET_SOUND_SETTINGS and is what unlocks audio.
  SET_SOUND_PREFS: 780,
  GET_SOUND_PREFS: 781,
} as const;

/** A room as the navigator presents it. Public spaces carry only ids. */
export interface NavigatorPublicSpace {
  spaceId: number;
  tag: number;
  /**
   * People in this space now. Sent as its instance's user count, which the
   * advanced-mode chooser turns into 1-3 Mickeys by fullness
   * (`CAdvancedNavListItem.render`). Falls back to the node's instance count.
   */
  userCount?: number;
}

/**
 * One running copy of a space. `PUBLIC_SPACE_REQUEST` is
 * `[spaceId, instanceId]` — you enter an *instance*, not the space itself — so
 * a space advertised with no instances plausibly has nothing to enter.
 */
export interface NavigatorInstance {
  instanceId: number;
  userCount: number;
}

export interface NavigatorNode {
  nodeTag: number;
  parentNodeTag: number;
  userCount: number;
  spaces: NavigatorPublicSpace[];
  children: { tag: number; userCount: number }[];
  /** Per-space instances. Omit for the old `instanceInfoIncluded = 0` shape. */
  maxUsers?: number;
  instances?: NavigatorInstance[];
}

/**
 * Build a NAVIGATION_NODE_INFO body.
 *
 * ⚠ `instanceInfoIncluded` used to be hardcoded 0 — "the smallest well-formed
 * answer the client accepts". It IS well-formed, but minimal is not the same as
 * sufficient: `Navigator_Handler_Class.navigationNodeInfo` reads, per space,
 * `if t_bInstanceInfoIncluded then maxUsers, instanceCount, {instanceId,
 * userCount}…`, and `PUBLIC_SPACE_REQUEST` is `[spaceId, instanceId]`. A player
 * enters an *instance*; a space advertised with none may have nothing to offer,
 * which fits the observed symptom — the navigator renders rooms but clicking
 * them never emits 31.
 *
 * Pass `instances` to emit the full shape.
 */
export function navigationNodeInfoParams(node: NavigatorNode): OutgoingParam[] {
  const withInstances = node.instances !== undefined && node.instances.length > 0;
  const params: OutgoingParam[] = [
    { int: node.nodeTag },
    { int: node.parentNodeTag },
    { int: node.userCount },
    { int: withInstances ? 1 : 0 }, // instanceInfoIncluded
    { int: node.spaces.length },
  ];
  for (const space of node.spaces) {
    params.push({ int: 1 }, { int: space.spaceId }, { int: space.tag });
    if (withInstances) {
      params.push({ int: node.maxUsers ?? 50 }, { int: node.instances!.length });
      for (const instance of node.instances!) {
        // One instance per space (id 0), so the space's own count is its count.
        params.push({ int: instance.instanceId }, { int: space.userCount ?? instance.userCount });
      }
    }
  }
  params.push({ int: node.children.length });
  for (const child of node.children) {
    params.push({ int: child.tag }, { int: child.userCount });
  }
  return params;
}

/**
 * Diffie-Hellman parameters. These are hardcoded in the client
 * (CMainHandler.connectionReady) so the server has no say in them.
 */
export const DH_P = BigInt("0xAEFBD08604A3F4BDE60CD6BD9");
export const DH_G = BigInt("0x29A05BBCE4064976EF7C30AA3");

/**
 * Uppercase, because String_Services_Class indexes `pDigits = "0123456789ABCDEF"`.
 * Lingo's `offset` is case-insensitive, but relying on our VM to reproduce that
 * quirk would be a needless bet — uppercase is correct either way.
 */
const HEX = "0123456789ABCDEF";

export function toHex(bytes: Uint8Array): string {
  let out = "";
  for (const byte of bytes) out += HEX[byte >> 4] + HEX[byte & 15];
  return out;
}

/**
 * A bigint as minimal-length uppercase hex, padded to an even number of digits.
 * The padding matters: the client does exactly this to the shared secret before
 * splitting it into bytes, so a different width here yields a different RC4 key.
 */
export function bigIntToHex(value: bigint): string {
  const hex = value.toString(16).toUpperCase();
  return hex.length % 2 === 0 ? hex : `0${hex}`;
}

export function hexToBytes(hex: string): Uint8Array {
  const out = new Uint8Array(hex.length >> 1);
  for (let i = 0; i < out.length; i++) out[i] = parseInt(hex.substr(i * 2, 2), 16);
  return out;
}

function modPow(base: bigint, exponent: bigint, modulus: bigint): bigint {
  let result = 1n;
  let b = base % modulus;
  let e = exponent;
  while (e > 0n) {
    if (e & 1n) result = (result * b) % modulus;
    b = (b * b) % modulus;
    e >>= 1n;
  }
  return result;
}

export interface DiffieHellman {
  privateKey: bigint;
  publicKey: bigint;
  /** Hex form of our public key, exactly as it goes on the wire. */
  publicKeyHex: string;
  /** Derive the shared secret from the client's public key (hex string). */
  deriveSharedKey(clientPublicKeyHex: string): Uint8Array;
}

export function createDiffieHellman(randomBytesFn: (n: number) => Uint8Array): DiffieHellman {
  // The client uses a 128-bit private exponent (BigInt_randTruePrime(128)).
  // Primality is irrelevant to the shared secret, so a random exponent of the
  // same size is equivalent here and far cheaper.
  let privateKey = 0n;
  for (const byte of randomBytesFn(16)) privateKey = (privateKey << 8n) | BigInt(byte);
  privateKey |= 1n;

  const publicKey = modPow(DH_G, privateKey, DH_P);
  return {
    privateKey,
    publicKey,
    publicKeyHex: bigIntToHex(publicKey),
    deriveSharedKey(clientPublicKeyHex: string): Uint8Array {
      // A peer that failed its own DH sends an empty or non-hex key. That is a
      // protocol error to report, not a reason to take the server down.
      if (!/^[0-9A-Fa-f]+$/.test(clientPublicKeyHex)) {
        throw new VmkProtocolError(
          `client public key is not hex: ${JSON.stringify(clientPublicKeyHex)}`,
        );
      }
      const clientPublic = BigInt(`0x${clientPublicKeyHex}`);
      return hexToBytes(bigIntToHex(modPow(clientPublic, privateKey, DH_P)));
    },
  };
}

/**
 * The client's RC4, keyed the way CDecoderRC4.Setkey(key, #old) does it:
 * the key material is the shared secret's bytes cycled to fill 256 entries.
 *
 * Ciphertext travels as hex TEXT, not raw bytes — Decipher reads two hex
 * characters per plaintext byte. Encipher likewise emits hex.
 */
export class VmkRc4 {
  private sbox: number[] = [];
  private i = 0;
  private j = 0;

  constructor(key: Uint8Array) {
    if (key.length === 0) throw new Error("VmkRc4: empty key");
    const schedule: number[] = [];
    for (let n = 0; n < 256; n++) {
      schedule[n] = key[n % key.length];
      this.sbox[n] = n;
    }
    let j = 0;
    for (let n = 0; n < 256; n++) {
      j = (j + this.sbox[n] + schedule[n]) % 256;
      const k = this.sbox[n];
      this.sbox[n] = this.sbox[j];
      this.sbox[j] = k;
    }
  }

  /**
   * One keystream byte. This is textbook RC4 PRGA, and the key schedule above
   * is textbook KSA with the key cycled to 256 bytes — CDecoderRC4's `#old`
   * mode is plain RC4. What is unusual is only the transport: the ciphertext
   * travels as hex text. (Its `#artificialKey` and `#new` modes are genuinely
   * different; we do not use them, and neither does connectionReady.)
   */
  private nextKeystreamByte(): number {
    this.i = (this.i + 1) % 256;
    this.j = (this.j + this.sbox[this.i]) % 256;
    const temp = this.sbox[this.i];
    this.sbox[this.i] = this.sbox[this.j];
    this.sbox[this.j] = temp;
    return this.sbox[(this.sbox[this.i] + this.sbox[this.j]) % 256];
  }

  /** Plaintext bytes -> uppercase hex ciphertext, as the client's Decipher expects. */
  encipher(plaintext: Uint8Array): string {
    let out = "";
    for (const byte of plaintext) {
      const d = this.nextKeystreamByte();
      const cipher = byte ^ d;
      out += HEX[cipher >> 4] + HEX[cipher & 15];
    }
    return out;
  }

  /** Hex ciphertext from the client -> plaintext bytes. */
  decipher(hex: string): Uint8Array {
    const out = new Uint8Array(hex.length >> 1);
    for (let n = 0; n < out.length; n++) {
      const d = this.nextKeystreamByte();
      out[n] = parseInt(hex.substr(n * 2, 2), 16) ^ d;
    }
    return out;
  }
}

/**
 * Server -> client message type header. Two characters, six payload bits each,
 * biased by 64. This is why the old stub's literal "DU" prefix decoded as
 * message 277: 'D'&63 = 4, 'U'&63 = 21, 4*64 + 21 = 277.
 */
export function encodeMessageType(msgType: number): string {
  if (msgType < 0 || msgType > 4095) {
    throw new Error(`VMK message type out of range for a 2-char header: ${msgType}`);
  }
  return String.fromCharCode(64 | ((msgType >> 6) & 63), 64 | (msgType & 63));
}

export type OutgoingParam = { str: string } | { int: number } | { bool: boolean };

/**
 * Build a server -> client message. Strings are terminated by 0x02 (GetStrFrom
 * scans for it); the whole message is terminated by 0x01 (msghandler scans for
 * it to find the frame boundary).
 */
/**
 * Typographic characters -> their ASCII equivalents.
 *
 * ⚠ THE WIRE IS LATIN-1. `encodeServerMessage` ends in `Buffer.from(s, "latin1")`,
 * which keeps only the low byte of each codepoint, so an em dash (U+2014) is
 * sent as 0x14 — a control character the client draws as a missing-glyph box.
 * That is exactly what happened to the first "not implemented" alert: the text
 * was right and the dash arrived as a square.
 *
 * Converting here rather than at each call site means it cannot be forgotten,
 * and it is never wrong: none of these have a latin-1 representation anyway.
 */
const ASCII_FOLDING: Array<[RegExp, string]> = [
  [/[—–]/g, "-"], // em/en dash
  [/[‘’‛]/g, "'"], // curly single quotes
  [/[“”]/g, '"'], // curly double quotes
  [/…/g, "..."], // ellipsis
  [/ /g, " "], // non-breaking space
];

/** Make a string safe for the latin-1 wire, warning about anything left over. */
export function wireText(text: string): string {
  let out = text;
  for (const [pattern, replacement] of ASCII_FOLDING) out = out.replace(pattern, replacement);
  if (/[^\x00-\xFF]/.test(out)) {
    console.warn(
      `[protocol] dropping characters with no latin-1 form from an outgoing string: ${JSON.stringify(out)}`,
    );
    out = out.replace(/[^\x00-\xFF]/g, "?");
  }
  return out;
}

export function encodeServerMessage(msgType: number, params: OutgoingParam[] = []): Buffer {
  let body = "";
  for (const param of params) {
    if ("str" in param) body += `${wireText(param.str)}\x02`;
    else if ("int" in param) body += encodeToInt(param.int);
    else body += String.fromCharCode(64 | (param.bool ? 1 : 0));
  }
  return Buffer.from(`${encodeMessageType(msgType)}${body}\x01`, "latin1");
}

/** CConnection.ToInt: 2 value bits in the first char, 6 in each following char. */
export function encodeToInt(value: number): string {
  let negMask = 0;
  let n = value;
  if (n < 0) {
    negMask = 4;
    n = -n;
  }
  let chars = String.fromCharCode(64 + (n & 3));
  let length = 1;
  n = Math.floor(n / 4);
  while (n !== 0) {
    length += 1;
    chars += String.fromCharCode(64 + (n & 63));
    n = Math.floor(n / 64);
  }
  const first = chars.charCodeAt(0) | (length * 8) | negMask;
  return String.fromCharCode(first) + chars.slice(1);
}

/** Inverse of ToInt; mirrors CConnection.GetIntFrom. */
export function decodeToInt(text: string, offset: number): { value: number; next: number } {
  const first = text.charCodeAt(offset) & 63;
  const count = (first & 56) / 8;
  const negative = (first & 4) !== 0;
  let value = first & 3;
  const powers = [4, 256, 16384, 1048576, 67108864];
  for (let n = 2; n <= count; n++) {
    value |= (text.charCodeAt(offset + n - 1) & 63) * powers[n - 2];
  }
  return { value: negative ? -value : value, next: offset + Math.max(count, 1) };
}

export interface ClientMessage {
  command: number;
  /** Raw parameter bytes, still encoded. */
  body: string;
}

/**
 * Parse one client -> server message from `text`, or null if incomplete.
 *
 * Layout (CConnection.send, read in reverse): three length characters, then two
 * command characters, then parameters. The length counts the command characters
 * plus the parameters, so the full frame is 3 + length characters.
 */
/**
 * Read one wire string: everything up to the `\x02` terminator.
 *
 * ⚠ `next` skips the terminator, so it is the offset of whatever follows. A
 * missing terminator means a truncated frame; the rest of the body is returned
 * and `next` lands at the end, which stops the caller's loop rather than
 * spinning on the same offset.
 */
export function decodeString(text: string, offset: number): { value: string; next: number } {
  const end = text.indexOf("\x02", offset);
  if (end < 0) return { value: text.slice(offset), next: text.length };
  return { value: text.slice(offset, end), next: end + 1 };
}

export function decodeClientMessage(text: string): { message: ClientMessage; rest: string } | null {
  if (text.length < 5) return null;
  const l3 = text.charCodeAt(0) & 63;
  const l2 = text.charCodeAt(1) & 63;
  const l1 = text.charCodeAt(2) & 63;
  const length = l3 * 4096 + l2 * 64 + l1;
  if (text.length < 3 + length) return null;

  const frame = text.slice(3, 3 + length);
  const command = ((frame.charCodeAt(0) & 63) << 6) | (frame.charCodeAt(1) & 63);
  return {
    message: { command, body: frame.slice(2) },
    rest: text.slice(3 + length),
  };
}

/** Read a length-prefixed string parameter from a client message body. */
export function readClientString(body: string, offset = 0): { value: string; next: number } {
  const { value: raw, next } = decodeToInt(body, offset);
  // ⚠ The length is the client's word. A negative one moved `next` BACKWARDS,
  // so a `for (i < count && at < body.length)` loop re-read the same byte for
  // up to 2^31 iterations: a ten-byte message hung the server. Clamp it into
  // what is actually left, so every read moves forward.
  const length = Math.max(0, Math.min(raw, body.length - next));
  return { value: body.slice(next, next + length), next: next + length };
}


/**
 * The 12-int "actions" array that both `2582 _CreateAvatars` and
 * `2583 _StatusPulse` end with.
 *
 * `CRoomVisualAvatar.Actions` hands the list straight to the renderer, and
 * `CAvatarFactor.Action` unpacks it positionally:
 * ```
 *  [1] HeadDir    [2] BodyDir   [3] emoticon  [4] Eyes
 *  [5] Mouth      [6] LeftHand  [7] RightHand [8] legs
 *  [9] TradeState [10] magic    [11] Weapon   [12] FriendRequest
 * ```
 * (`CAvatarAnimator.SetAction` builds the same list from named fields, which is
 * where the `legs` name comes from.)
 *
 * ⚠ `legs` IS THE ANIMATION. `CAvatarRenderer.ActLeftFoot` switches on it:
 * 1 = "wlk" (the walk cycle), 2 = dance, 3/4 = sit, 5..13 = vehicles, and
 * anything else — including 0 — = "std". An avatar moved with legs=0 slides
 * along in its standing pose, which is exactly what a zero-filled array does.
 */
export interface AvatarActions {
  /** 0..7, counter-clockwise from "facing away up-screen". See `directionBetween`. */
  headDir?: number;
  /** 0..7. Normally the same as `headDir` while walking. */
  bodyDir?: number;
  /** `LEGS_WALK` while moving, `LEGS_STAND` on arrival. */
  legs?: number;
  /**
   * Arm pose. ⚠ MUST be set to `HAND_WALK` alongside `legs` or the arms stay
   * still while the legs stride.
   *
   * `ActLeftFoot("wlk")` does call `defineActMultiple("wlk", [...])` over the
   * hand parts, but that is then ignored: `CBodypartClass.update` resolves
   * "lh"/"ls" (and "rh"/"rs") from `m_sStatusLeftHand`/`m_sStatusRightHand`,
   * which only `ActLeftHand`/`ActRightHand` write — and those map anything that
   * is not 1 to "std".
   */
  leftHand?: number;
  rightHand?: number;
  /** `MOUTH_TALKING` while a chat bubble is up, so the face animates. */
  mouth?: number;
  emoticon?: number;
  tradeState?: number;
  friendRequest?: number;
  /**
   * Magic effect (`CAvatarFactor.Action` slot 10 -> `CMagicFactor.SetFx`).
   * Non-zero starts an effect that LOOPS until this goes back to 0. The
   * furniture teleporter uses 6 (out: `magic_teleport_01..09`, `teleport-2`)
   * and 7 (in: `magic_teleport_10..16`, `teleport-4`).
   */
  magic?: number;
}

/** Magic effects the furniture teleporters play. See `AvatarActions.magic`. */
export const MAGIC_TELEPORT_OUT = 6;
export const MAGIC_TELEPORT_IN = 7;

export const LEGS_STAND = 0;
export const LEGS_WALK = 1;
/**
 * Mouth poses, from `CAvatarRenderer.ActMouth`: 1 and 2 both set the talking
 * flag, anything else leaves the face still.
 *
 * ⚠ Talking is SERVER-DRIVEN. `_AvatarChat` renders the bubble but never
 * touches the face, so an avatar sits stone-faced while its chat bubble is up
 * unless a `_StatusPulse` carries this. `prepare()` is what animates it, mixing
 * the "spk" frames in at random while the flag is set.
 */
export const MOUTH_CLOSED = 0;
export const MOUTH_TALKING = 1;

/**
 * Emote poses, from `CAvatarRenderer.ActLeftFoot` / `ActLeftHand`.
 *
 * Dance is a LEG action that also drives the arms (`ActLeftFoot` case 2 sets
 * `m_bActDnc` and starts the "dance.aero" animation); waving is a HAND action
 * (`ActLeftHand`/`ActRightHand` case 24 sets `m_bActWav`, and `prepare()` then
 * calls `doHandWorkRight`, so it is the right arm that moves).
 */
export const LEGS_DANCE = 2;
export const HAND_DANCE = 10;
export const HAND_WAVE = 24;
/** Arm poses, from `CAvatarRenderer.ActLeftHand`: 1 = "wlk", anything else "std". */
export const HAND_STAND = 0;
export const HAND_WALK = 1;
/**
 * Holding a paper cup: `ActLeftHand` case 2 = "crr" with item 1, drawn as the
 * still first frame of `drk_lfood_1_*` (the cone cup) at chest height.
 */
export const HAND_CARRY_CUP = 2;
/**
 * Sipping from it: case 3 = "drk" with item 1. ⚠ The renderer flips the two
 * `drk` frames every other tick (`m_iAnimCounter mod 2`), a fast gulp — so a
 * sip must be a short burst between spells of `HAND_CARRY_CUP`, never held.
 */
export const HAND_DRINK = 3;

/** Build the 12 ints in wire order. Anything omitted is 0 (= idle/none). */
export function avatarActions(a: AvatarActions = {}): number[] {
  return [
    a.headDir ?? 0,
    a.bodyDir ?? 0,
    a.emoticon ?? 0,
    0, // Eyes -- CAvatarRenderer.ActEyes is an empty handler
    a.mouth ?? MOUTH_CLOSED,
    a.leftHand ?? HAND_STAND,
    a.rightHand ?? HAND_STAND,
    a.legs ?? LEGS_STAND,
    a.tradeState ?? 0,
    a.magic ?? 0,
    0, // Weapon
    a.friendRequest ?? 0,
  ];
}

// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 0]))
  callMethod("_LoadInventory", callNamed("getThread", "inventory").component)
  setMeProp(_me, "m_iPartnerRef", -float(1));
  setMeProp(_me, "m_sPartner", "???");
  setMeProp(_me, "m_kCategory", symbol("items"));
  setMeProp(_me, "m_bOwnConfirm", 0);
  setMeProp(_me, "m_bHerConfirm", 0);
  setMeProp(_me, "m_iItemsPerPage", 10);
  setMeProp(_me, "m_iCurrentPage", 1);
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([symbol("items"), new LingoPropList([]), symbol("pins"), new LingoPropList([]), symbol("posters"), new LingoPropList([]), symbol("clothes"), new LingoPropList([])]));
  setMeProp(_me, "m_mp_iRef_rOwnItems", new LingoPropList([]));
  setMeProp(_me, "m_mp_iRef_rHerItems", new LingoPropList([]));
  setMeProp(_me, "m_mp_iRef_rInvItems", meProp(_me, "m_mp_kType_mp_iRef_rItem")[meProp(_me, "m_kCategory")]);
  setMeProp(_me, "m_mp_CannedField", 0);
  var m_mp_ChatBoard = 0;
  setMeProp(_me, "m_bOppositeGender", 0);
  setMeProp(_me, "m_rObjTradConf", callNamed("createObject", callNamed("getUniqueID"), "CInvPageConfirmTrade"));
  setMeProp(_me, "m_mp_ItemsInTrade", new LingoPropList([symbol("items"), new LingoPropList([]), symbol("pins"), new LingoPropList([]), symbol("posters"), new LingoPropList([]), symbol("clothes"), new LingoPropList([])]));
  setMeProp(_me, "m_iLastTeleporterSelection", undefined);
  setMeProp(_me, "m_iRefJustPlaced", undefined);
  setMeProp(_me, "m_rHerGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_rOwnGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_rInvGridLoadAnim", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_iHerGridRequest", 0);
  setMeProp(_me, "m_iOwnGridRequest", 0);
  setMeProp(_me, "m_iInvGridRequest", 0);
  setMeProp(_me, "m_bLoadingHerThumbs", 1);
  setMeProp(_me, "m_bLoadingOwnThumbs", 1);
  setMeProp(_me, "m_bLoadingInvThumbs", 1);
  callNamed("registerMessage", symbol("tradechat"), callMethod("getID", _this), symbol("ReceivedChatMessage"))
  callNamed("executeMessage", "hide_inventory")
  callNamed("executeMessage", "close_AvatarBuilder")
  callNamed("executeMessage", "close_profile")
  callNamed("registerMessage", "teleport_selected", callMethod("getID", _this), symbol("TeleportSelected"))
  callNamed("registerMessage", "teleport_unselected", callMethod("getID", _this), symbol("TeleportUnSelected"))
  var t_sID = callNamed("getUniqueID");
  if (callNamed("createWindow", t_sID, "vmk_tra.window", 0, 0, symbol("modal"))) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sID));
  callMethod("center", meProp(_me, "m_rWindow"))
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyDown"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("keyUp"))
  setMeProp(_me, "m_rGridInvItems", callNamed("createObject", "TradeItemsGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rGridOwnItems", callNamed("createObject", "OfferedItemsGrid", "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridHerItems", callNamed("createObject", "IncomingItemsGrid", "CGenericThumbnailGrid"));
  setMeProp(_me, "m_ar_NonTradableItems", new LingoList([]));
  if (callNamed("variableExists", "nontradable")) {
  setMeProp(_me, "m_ar_NonTradableItems", callNamed("getVariableValue", "nontradable"));
  }

  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_iPos = callMethod("findPos", callMethod("get", callNamed("getObject", symbol("session")), "permissions"), "11");
  }

  if (lingoBinary("gt", t_iPos, 0)) {
  setMeProp(_me, "m_bTradeAnyItem", 1);
  } else {
  setMeProp(_me, "m_bTradeAnyItem", 0);
  }

  callMethod("_SwitchPage", _this, symbol("items"))
  callMethod("status", _this, new LingoPropList([symbol("confirm"), 0, symbol("items"), new LingoPropList([])]), new LingoPropList([symbol("confirm"), 0, symbol("items"), new LingoPropList([])]))
  setMeProp(_me, "m_mp_CannedField", callNamed("CreateCannedField", t_sID, "tra.chat.field", callNamed("rgb", "#000000"), callNamed("rgb", "#FF0000")));
  callMethod("set", callNamed("getObject", symbol("session")), "IsTrading", 1)
  callMethod("DefineItemInfo", _this, undefined)
  callMethod("RegisterItemListCallback", callMethod("GetInventory", callNamed("getThread", "inventory").component, 1), _this, symbol("_RefreshItemList"))
  return 1;
  } else {
  return callNamed("error", _this, "Trade window is fucked up.", symbol("construct"));
  }

}


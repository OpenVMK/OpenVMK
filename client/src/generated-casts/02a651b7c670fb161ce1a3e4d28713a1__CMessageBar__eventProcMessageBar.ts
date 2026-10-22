// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / eventProcMessageBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

/**
 * HAND-CORRECTED (addition): saying Teleportation's magic word starts the tile
 * pick, exactly as double-clicking it in the magic menu does
 * (`CMagicMenu.ShowMagicInfo` -> `HandleTeleportFx`). The server casts every
 * OTHER magic word itself; teleport alone needs the client, because the tile
 * pick is client-side and ends in `MagicTeleport [fxId, tile]` from
 * `CMagicMenu.CatchLoc`. Words come from `2527` (`trigger`), matched on
 * letters and digits in any case, the whole line being the word.
 */
function sayTeleportWord(said: string): void {
  const norm = (s: string) => s.toLowerCase().replace(/[^a-z0-9]/g, "");
  const key = norm(said);
  if (key === "") return;
  const menu = callNamed("getObject", "MagicMenu") as unknown as Record<string, unknown> | 0;
  if (!menu || typeof menu !== "object") return;
  const list = menu.m_mp_FxList as { count?: number; [i: number]: { code?: unknown; trigger?: unknown; FxId?: unknown } } | undefined;
  if (!list || typeof list.count !== "number") return;
  for (let i = 1; i <= list.count; i++) {
    const fx = list[i];
    if (Number(fx?.code) !== 4 || norm(String(fx?.trigger ?? "")) !== key) continue;
    setThePropOf(menu as unknown as LingoValue, "m_iTelePortFxId", fx.FxId as LingoValue);
    callMethod("HandleTeleportFx", menu as unknown as LingoValue);
    return;
  }
}

export function eventProcMessageBar(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWndTitle"));
  var tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "chatbar.info":
  callNamed("executeMessage", symbol("ui_roominfo"))
  break;
case "chatbar.avatar":
  callNamed("executeMessage", "ui_AvatarBuilder")
  break;
case "chatbar.settings":
  callNamed("executeMessage", "ui_Settings")
  break;
case "chatbar.inventory":
  callNamed("executeMessage", symbol("ui_inventory"))
  break;
case "chatbar.messenger":
  callNamed("executeMessage", symbol("ui_messenger"))
  break;
case "chatbar.navigator":
  callNamed("executeMessage", symbol("ui_navigator"))
  break;
case "chatbar.help":
  callNamed("executeMessage", symbol("ui_help"))
  break;
case "chatbar.camera":
  callMethod("TogglePhotoPopup", _me)
  break;
case "chatbar.emoticons":
  callNamed("executeMessage", "ui_Emoticons")
  break;
case "chatbar.magics":
  callNamed("executeMessage", "ui_Magic")
  break;
case "chatbar.shop":
  callNamed("executeMessage", "ui_catalog")
  break;
case "chatbar.quest":
  callNamed("executeMessage", "ui_questengine")
  break;
case "chatbar.exit":
  callMethod("ConfirmExit", _me)
  break;
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("or", lingoBinary("eq", theProperty("key"), "\r"), lingoBinary("eq", theProperty("key"), "\x03"))) {
  t_iKeyCode = 36;
  }

  if (lingoBinary("and", lingoBinary("neq", meProp(_me, "m_pCannedField"), 0), tElem.pMember.editable)) {
  switch (t_iKeyCode) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_pCannedField"));
  if (t_pass) {
  var t_sSaid = String((tElem as { pMember?: { text?: unknown } } | null)?.pMember?.text ?? "");
  callMethod("SendMessage", _me, meProp(_me, "m_pCannedField").m_ar_cWords)
  callMethod("reset", meProp(_me, "m_pCannedField"))
  sayTeleportWord(t_sSaid)
  }

  return 1;
case 49:
  var tSelection = tElem.pMember.selection;
  var tCharcount = tElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", tElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", tElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  return 1;
  }

  }

  }

  t_pass = callMethod("CheckContent", meProp(_me, "m_pCannedField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_pCannedField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_pCannedField"))) ? 0 : 1)) {
  return 1;
  }

  var tValidKeys = lingoBinary("join", "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\\#;", "\"");
  var tAscii = callNamed("charToNum", theProperty("key"));
  var t_allow = 0;
  if (lingoBinary("and", lingoBinary("gt", tAscii, 31), lingoBinary("lt", tAscii, 128))) {
  if (lingoBinary("or", lingoBinary("contains", tValidKeys, theProperty("key")), lingoBinary("eq", tValidKeys, ""))) {
  t_allow = 1;
  }

  }

  if ((lingoTruthy(t_allow) ? 0 : 1)) {
  return 1;
  }

  break;
  break;
  break;
  break;
  }

  if (lingoBinary("neq", tElem, 0)) {
  var t_iChar = lingoBinary("add", tElem.pMember.text.char.count, 1);
  if (lingoBinary("gte", callMethod("charPosToLoc", tElem.pMember, t_iChar).locH, lingoBinary("sub", tElem.pMember.width, 10))) {
  return 1;
  }

  setMeProp(_me, "m_ar_lastSelection", tElem.pMember.selection);
  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  t_iKeyCode = theProperty("keyCode");
  if (lingoBinary("and", lingoBinary("neq", meProp(_me, "m_pCannedField"), 0), tElem.pMember.editable)) {
  switch (t_iKeyCode) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_pCannedField"))
  break;
  }

  tElem = callMethod("getElement", tWndObj, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  setMeProp(_me, "m_ar_lastSelection", tElem.pMember.selection);
  }

  }

  }

  }

  }

}


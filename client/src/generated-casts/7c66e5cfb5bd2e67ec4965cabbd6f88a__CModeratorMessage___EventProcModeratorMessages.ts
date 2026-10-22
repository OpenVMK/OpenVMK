// 7c66e5cfb5bd2e67ec4965cabbd6f88a.cct / CModeratorMessage / _EventProcModeratorMessages

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcModeratorMessages(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tElemID: LingoValue, tParam: LingoValue, a_sID: LingoValue) {
  if (callMethod("findPos", meProp(_me, "m_mp_MessageIDList"), lingoBinary("join", a_sID, "_field"))) {
  var t_rModReplyField = meProp(_me, "m_mp_MessageIDList")[lingoBinary("join", a_sID, "_field")];
  }

  if (lingoBinary("and", lingoBinary("eq", tElemID, "mods.messagereply.input"), callNamed("objectp", t_rModReplyField))) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", t_rModReplyField)
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", t_rModReplyField)
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", t_rModReplyField);
  return 1;
case 49:
  var tElem = callMethod("getElement", callNamed("getWindow", a_sID), tElemID);
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

  t_pass = callMethod("CheckContent", t_rModReplyField);
  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", t_rModReplyField)) ? 0 : 1)) {
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

  } else {
  if (lingoBinary("eq", tElemID, symbol("keyUp"))) {
  if (lingoBinary("eq", tElemID, "mods.messagereply.input")) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", t_rModReplyField)
  break;
  }

  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", t_rModReplyField)
  break;
  }

  }

  }

  }

  switch (tElemID) {
case "mods.ok":
  callMethod("_Remove", _this, a_sID)
  break;
case "mods.reply.send":
  callMethod("SendMessage", _this, a_sID)
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  break;
case "mods.cancel":
  callMethod("_Remove", _this, a_sID)
  break;
  }

}


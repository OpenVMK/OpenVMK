// eba88a10adbb7784498c2112110c5871.cct / CGuestRoomNavigator / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  var t_rWindow = callNamed("getWindow", "RoomNameWnd");
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElem) {
case "edit.cancel.button":
  callMethod("close", t_rWindow)
  break;
case "cat.rooms.nextstep.button":
  callMethod("_NextStep", _this)
  break;
case "cat.rooms.goto.button":
  callMethod("_GoToNewRoom", _this)
  break;
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  t_rWindow = callNamed("getWindow", "RoomNameWnd");
  if (lingoBinary("eq", a_sElem, "reg.roomname.input")) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rRoomNameField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rRoomNameField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_rRoomNameField"));
  if (t_pass) {
  var m_bRoomNAmeOK = 1;
  }

  return 1;
case 49:
  var tElem = callMethod("getElement", t_rWindow, a_sElem);
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

  t_pass = callMethod("CheckContent", meProp(_me, "m_rRoomNameField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rRoomNameField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rRoomNameField"))) ? 0 : 1)) {
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

  var t_iMaxlength = 30;
  tElem = callMethod("getElement", t_rWindow, a_sElem);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "reg.roomname.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  }

  if (lingoBinary("eq", a_sElem, "reg.roomdescription.input")) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rRoomDescField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rRoomDescField"))
  callNamed("pass")
  break;
case 36:
  t_pass = callMethod("CheckContent", meProp(_me, "m_rRoomDescField"));
  if (t_pass) {
  var m_bRoomDescOK = 1;
  }

  return 1;
case 49:
  tElem = callMethod("getElement", t_rWindow, a_sElem);
  tSelection = tElem.pMember.selection;
  tCharcount = tElem.pMember.text.char.count;
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

  t_pass = callMethod("CheckContent", meProp(_me, "m_rRoomDescField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rRoomDescField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rRoomDescField"))) ? 0 : 1)) {
  return 1;
  }

  tValidKeys = lingoBinary("join", "abcdefghijlkmnopqrstuvwxyz0123456789_-=+?!@<>:.,'*/()[]\\#;", "\"");
  tAscii = callNamed("charToNum", theProperty("key"));
  t_allow = 0;
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

  t_iMaxlength = 255;
  tElem = callMethod("getElement", t_rWindow, a_sElem);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckNameLength", 1, 1);
  callMethod("show", t)
  t_sMsg = callNamed("getText", "reg.roomdesc.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  if (lingoBinary("eq", a_sElem, "reg.roomname.input")) {
  if (lingoBinary("neq", meProp(_me, "m_rRoomNameField"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rRoomNameField"))
  break;
  }

  }

  }

  if (lingoBinary("eq", a_sElem, "reg.roomdescription.input")) {
  if (lingoBinary("neq", meProp(_me, "m_rRoomDescField"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rRoomDescField"))
  break;
  }

  }

  }

  }

  }

}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestCannedField / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", meProp(_me, "m_sElem"), a_sElemID)) {
  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_rField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rField"))
  var m_bHelpContentOk = 1;
  }

  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), meProp(_me, "m_sElem"));
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("gt", meProp(_me, "m_iWordLimit"), 0)) {
  if (lingoBinary("eq", callMethod("getText", t_rElem).word.count, meProp(_me, "m_iWordLimit"))) {
  return 1;
  }

  }

  }

  break;
case 49:
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), meProp(_me, "m_sElem"));
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

  t_pass = callMethod("CheckContent", meProp(_me, "m_rField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rField"))
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), meProp(_me, "m_sElem"));
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("gt", meProp(_me, "m_iWordLimit"), 0)) {
  if (lingoBinary("eq", callMethod("getText", t_rElem).word.count, meProp(_me, "m_iWordLimit"))) {
  return 1;
  }

  }

  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rField"))) ? 0 : 1)) {
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

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), meProp(_me, "m_sElem"));
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("gte", t_rElem.pMember.text.char.count, meProp(_me, "m_iCharacterLimit"))) {
  var t_txt = callNamed("getText", "quest.alert.canned.toolong.text");
  var t_title = callNamed("getText", "quest.alert.title");
  var t_btn1 = callNamed("getText", "quest.alert.ok");
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "quest.alert.canned.toolong", 1, 1);
  callMethod("setText", t, t_txt, t_title, t_btn1)
  callMethod("show", t)
  setThePropOf(t_rElem.pMember, "text", t_rElem.pMember.char.range(1, meProp(_me, "m_iCharacterLimit")));
  return 1;
  }

  }

  break;
  break;
  break;
  break;
  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rField"))
  break;
  }

  }

  }

  }

}


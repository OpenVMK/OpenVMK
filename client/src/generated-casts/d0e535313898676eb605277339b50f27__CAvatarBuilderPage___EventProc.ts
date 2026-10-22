// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (1) {
case lingoBinary("eq", a_sElem, "set.imready.button"):
  callMethod("updateContent", meProp(_me, "m_rSloganField"))
  callMethod("parseToServerFormat", _this)
  callMethod("SetUpMySlogan", _this)
  return 1;
case lingoBinary("and", lingoBinary("contains", a_sElem, "color"), lingoBinary("contains", a_sElem, "change")):
  var tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  var tPart = a_sElem.item[2];
  var tButtonType = a_sElem.item[a_sElem.item.count];
  setTheProperty("itemDelimiter", tTempDelim);
  callMethod("ChangeColor", _this, tPart, tButtonType)
  return 1;
case lingoBinary("contains", a_sElem, "change"):
  tTempDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ".");
  tPart = a_sElem.item[2];
  tButtonType = a_sElem.item[a_sElem.item.count];
  setTheProperty("itemDelimiter", tTempDelim);
  callMethod("changePart", _this, tPart, tButtonType)
  return 1;
  }

  }

  if (lingoBinary("eq", a_kEvent, symbol("keyDown"))) {
  if (lingoBinary("eq", a_sElem, "set.myslogan")) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rSloganField"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rSloganField"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_rSloganField"));
  if (t_pass) {
  setMeProp(_me, "m_bSloganOk", 1);
  return 1;
  }

  break;
case 49:
  var tElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem);
  var tSelection = tElem.pMember.selection;
  var tCharcount = tElem.pMember.text.char.count;
  if (lingoBinary("gt", tCharcount, 0)) {
  if (lingoBinary("eq", tElem.pMember.text.char[tSelection[2]], " ")) {
  return 1;
  }

  if (lingoBinary("lte", lingoBinary("add", tSelection[2], 1), tCharcount)) {
  if (lingoBinary("eq", tElem.pMember.text.char[lingoBinary("add", tSelection[2], 1)], " ")) {
  tSelection[1] = lingoBinary("add", tSelection[1], 1);
  tSelection[2] = lingoBinary("add", tSelection[2], 1);
  setThePropOf(tElem.pMember, "selection", tSelection);
  return 1;
  }

  }

  }

  t_pass = callMethod("CheckContent", meProp(_me, "m_rSloganField"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rSloganField"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rSloganField"))) ? 0 : 1)) {
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

  var t_iMaxlength = 80;
  tElem = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElem);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "CheckSloganLength", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "reg.slogan.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  }

  } else {
  if (lingoBinary("eq", a_kEvent, symbol("keyUp"))) {
  if (lingoBinary("eq", a_sElem, "set.myslogan")) {
  if (lingoBinary("neq", meProp(_me, "m_rSloganField"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rSloganField"))
  break;
  }

  }

  }

  }

  }

}


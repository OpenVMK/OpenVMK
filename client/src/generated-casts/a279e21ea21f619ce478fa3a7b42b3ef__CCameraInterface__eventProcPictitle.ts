// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / eventProcPictitle

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcPictitle(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  switch (tElemID) {
case "close":
  callMethod("hideCamera", _me)
  callNamed("pass")
  break;
case "help":
  callNamed("executeMessage", symbol("open_help_page"), "help.stuff.camera")
  break;
case "camera.save.button":
  if (callMethod("CheckContent", meProp(_me, "m_rCaptionCompose"))) {
  var tField = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sPicTitleWindowName")), "camera.caption.input");
  if (lingoBinary("gt", callMethod("getText", tField).length, 0)) {
  var tCaption = callNamed("TransformCannedToMsg", callNamed("ParseCannedField", tField), 1);
  callMethod("ChangeCaption", callMethod("getHandler", callNamed("getThread", "PhotoCatalog")), callMethod("getPhotoID", callMethod("getComponent", _me)), tCaption)
  }

  callMethod("hideCamera", _me)
  setMeProp(_me, "m_view", symbol("camera"));
  }

  break;
  default:
  callNamed("pass")
  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyDown"))) {
  var t_rWindow = callNamed("getWindow", meProp(_me, "m_sPicTitleWindowName"));
  if (lingoBinary("eq", tElemID, "camera.caption.input")) {
  switch (theProperty("keyCode")) {
case 123:
case 124:
case 125:
case 126:
  callMethod("updateContent", meProp(_me, "m_rCaptionCompose"))
  callNamed("pass")
  break;
case 117:
case 51:
  callMethod("updateContent", meProp(_me, "m_rCaptionCompose"))
  callNamed("pass")
  break;
case 36:
  var t_pass = callMethod("CheckContent", meProp(_me, "m_rCaptionCompose"));
  if (t_pass) {
  var m_bRoomNAmeOK = 1;
  }

  return 1;
case 49:
  var tElem = callMethod("getElement", t_rWindow, tElemID);
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

  t_pass = callMethod("CheckContent", meProp(_me, "m_rCaptionCompose"));
  if (t_pass) {
  callMethod("updateContent", meProp(_me, "m_rCaptionCompose"))
  }

  break;
  default:
  if ((lingoTruthy(callMethod("updateContent", meProp(_me, "m_rCaptionCompose"))) ? 0 : 1)) {
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

  var t_iMaxlength = 90;
  tElem = callMethod("getElement", t_rWindow, tElemID);
  if (lingoBinary("neq", tElem, 0)) {
  if (lingoBinary("gte", tElem.pMember.text.char.count, t_iMaxlength)) {
  setThePropOf(tElem.pMember, "text", tElem.pMember.char.range(1, t_iMaxlength));
  var t = callNamed("createDialogWindow", callMethod("getID", _me), "CaptionTooLong", 1, 1);
  callMethod("show", t)
  var t_sMsg = callNamed("getText", "camera.dialog.caption.toolong");
  callMethod("setText", t, t_sMsg, "Error", "OK")
  return 1;
  }

  }

  }

  } else {
  if (lingoBinary("eq", tEvent, symbol("keyUp"))) {
  if (lingoBinary("eq", tElemID, "camera.caption.input")) {
  if (lingoBinary("neq", meProp(_me, "m_rCaptionCompose"), 0)) {
  switch (theProperty("keyCode")) {
case 36:
case 49:
  break;
  default:
  callMethod("CheckWord", meProp(_me, "m_rCaptionCompose"))
  break;
  }

  }

  }

  }

  }

  }

}


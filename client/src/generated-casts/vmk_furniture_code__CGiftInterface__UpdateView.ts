// vmk_furniture_code.cct / CGiftInterface / UpdateView

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateView(_me: LingoMe, a_sElemID: LingoValue) {
  var t_iOldBg = meProp(_me, "m_BgType");
  var t_count = a_sElemID.char.count;
  var t_ibackground = a_sElemID.char[t_count];
  var t_ar_CardData = callNamed("value", callNamed("getText", lingoBinary("join", "giftcard.", t_ibackground)));
  var t_mp_OldBg = callNamed("value", callNamed("getText", lingoBinary("join", "giftcard.", t_iOldBg)));
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (lingoBinary("neq", t_rElem, 0)) {
  var t_sText = callMethod("getText", t_rElem);
  if (callNamed("listp", t_mp_OldBg)) {
  var t_sTextOld = t_mp_OldBg[2];
  }

  if (lingoBinary("neq", t_sText, t_sTextOld)) {
  setMeProp(_me, "m_sText", t_sText);
  } else {
  if (callNamed("listp", t_ar_CardData)) {
  setMeProp(_me, "m_sText", t_ar_CardData[2]);
  }

  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.message.hd");
  if (callNamed("objectp", t_rElem)) {
  t_sText = callMethod("getText", t_rElem);
  if (callNamed("listp", t_mp_OldBg)) {
  t_sTextOld = t_mp_OldBg[1];
  }

  if (lingoBinary("neq", t_sText, t_sTextOld)) {
  setMeProp(_me, "m_sHeadline", t_sText);
  } else {
  if (callNamed("listp", t_ar_CardData)) {
  setMeProp(_me, "m_sHeadline", t_ar_CardData[1]);
  }

  }

  }

  if (callNamed("memberExists", lingoBinary("join", lingoBinary("join", "vmk_gift_layout_", t_ibackground), ".window"))) {
  callMethod("unmerge", meProp(_me, "m_rWindow"), meProp(_me, "m_sMergedWnd"))
  callMethod("merge", meProp(_me, "m_rWindow"), lingoBinary("join", lingoBinary("join", "vmk_gift_layout_", t_ibackground), ".window"))
  setMeProp(_me, "m_BgType", t_ibackground);
  setMeProp(_me, "m_sMergedWnd", lingoBinary("join", lingoBinary("join", "vmk_gift_layout_", t_ibackground), ".window"));
  }

  if (callNamed("listp", t_ar_CardData)) {
  var t_sImageUrl = lingoBinary("join", lingoBinary("join", callNamed("getVariable", "imagedownload.url"), t_ar_CardData[3]), "_0.jpg");
  } else {
  if (callNamed("variableExists", "imagedownload.url")) {
  t_sImageUrl = lingoBinary("join", lingoBinary("join", callNamed("getVariable", "imagedownload.url"), meProp(_me, "m_BgType")), "_0.jpg");
  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.image");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("LoadImageToWindowElement", _me, t_sImageUrl, t_rElem)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.sender");
  if (callNamed("objectp", t_rElem)) {
  var t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "m_sSender"), callNamed("getText", "gift.sender.wrote")), meProp(_me, "m_sDate"));
  callMethod("setText", t_rElem, t_sTxt)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_sText"), "")) {
  if (callNamed("listp", t_ar_CardData)) {
  t_sText = callNamed("replaceChunks", t_ar_CardData[2], "\\r", "\r");
  callMethod("setText", t_rElem, t_sText)
  }

  } else {
  t_sText = callNamed("replaceChunks", meProp(_me, "m_sText"), "\\r", "\r");
  callMethod("setText", t_rElem, t_sText)
  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.message.hd");
  if (callNamed("objectp", t_rElem)) {
  if (lingoBinary("eq", meProp(_me, "m_sHeadline"), "")) {
  if (callNamed("listp", t_ar_CardData)) {
  t_sText = callNamed("replaceChunks", t_ar_CardData[1], "\\r", "\r");
  callMethod("setText", t_rElem, t_sText)
  }

  } else {
  callMethod("setText", t_rElem, meProp(_me, "m_sHeadline"))
  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "basic.dialog1.button1");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setProperty", t_rElem, symbol("visible"), (lingoTruthy(meProp(_me, "m_bEditable")) ? 0 : 1))
  }

  callNamed("removeCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "mes.messages.messageinput")
  setMeProp(_me, "m_pComposeMessage", callNamed("CreateCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "mes.messages.messageinput"));
  callMethod("setAllowFreeWords", meProp(_me, "m_pComposeMessage"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_pComposeMessage"), 1)
  callMethod("setAllowEmpty", meProp(_me, "m_pComposeMessage"), 1)
  callNamed("removeCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "gift.message.hd")
  setMeProp(_me, "m_rMessageHd", callNamed("CreateCannedField", callMethod("getID", meProp(_me, "m_rWindow")), "gift.message.hd"));
  callMethod("setAllowFreeWords", meProp(_me, "m_rMessageHd"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_rMessageHd"), 1)
  callMethod("setAllowEmpty", meProp(_me, "m_rMessageHd"), 1)
  callMethod("updateContent", meProp(_me, "m_pComposeMessage"))
  callMethod("updateContent", meProp(_me, "m_rMessageHd"))
}


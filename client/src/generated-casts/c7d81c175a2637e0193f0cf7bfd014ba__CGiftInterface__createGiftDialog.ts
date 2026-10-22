// c7d81c175a2637e0193f0cf7bfd014ba.cct / CGiftInterface / createGiftDialog

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createGiftDialog(_me: LingoMe, a_iRef: LingoValue, a_ar_Configuration: LingoValue, a_bModal: LingoValue) {
  setMeProp(_me, "m_iRef", a_iRef);
  if (callNamed("listp", a_ar_Configuration)) {
  setMeProp(_me, "m_iInventoryID", a_ar_Configuration.invId);
  setMeProp(_me, "m_bEditable", a_ar_Configuration.editable);
  setMeProp(_me, "m_BgType", a_ar_Configuration.backgroundCode);
  setMeProp(_me, "m_sText", a_ar_Configuration.GiftText);
  setMeProp(_me, "m_sSender", a_ar_Configuration.Sender);
  setMeProp(_me, "m_sDate", a_ar_Configuration.date);
  setMeProp(_me, "m_sHeadline", a_ar_Configuration.headline);
  setMeProp(_me, "m_sText", callNamed("replaceChars", meProp(_me, "m_sText"), callNamed("numToChar", 10), callNamed("numToChar", 13)));
  if (lingoBinary("lt", meProp(_me, "m_BgType"), 1)) {
  setMeProp(_me, "m_BgType", 1);
  }

  var t_ar_CardData = callNamed("value", callNamed("getText", lingoBinary("join", "giftcard.", meProp(_me, "m_BgType"))));
  if (callNamed("listp", t_ar_CardData)) {
  var t_sImageUrl = lingoBinary("join", lingoBinary("join", callNamed("getVariable", "imagedownload.url"), t_ar_CardData[3]), "_0.jpg");
  } else {
  if (callNamed("variableExists", "imagedownload.url")) {
  t_sImageUrl = lingoBinary("join", lingoBinary("join", callNamed("getVariable", "imagedownload.url"), meProp(_me, "m_BgType")), "_0.jpg");
  }

  }

  var t_sWndName = lingoBinary("join", lingoBinary("join", "vmk_gift_layout_", meProp(_me, "m_BgType")), ".window");
  if ((lingoTruthy(callNamed("memberExists", t_sWndName)) ? 0 : 1)) {
  t_sWndName = "vmk_gift_layout_1.window";
  }

  if (meProp(_me, "m_bEditable")) {
  var t_ar_windowDescriptions = new LingoList(["vmk_gift_message_write.window", t_sWndName]);
  } else {
  t_ar_windowDescriptions = new LingoList(["vmk_gift_message_read.window", t_sWndName]);
  }

  var t_sConfigurationWindowID = lingoBinary("join", "GiftWnd", a_iRef);
  if (a_bModal) {
  var t_bSuccess = callNamed("createWindow", t_sConfigurationWindowID, undefined, 0, 0, symbol("modal"));
  } else {
  t_bSuccess = callNamed("createWindow", t_sConfigurationWindowID, undefined, 0, 0);
  }

  if (t_bSuccess) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", t_sConfigurationWindowID));
  for (var t_sWinDesc of t_ar_windowDescriptions.toArray()) {
  t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), t_sWinDesc);
  setMeProp(_me, "m_sMergedWnd", t_sWinDesc);
  }

  callMethod("center", meProp(_me, "m_rWindow"))
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _me))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_GiftEventProc"), callMethod("getID", _me), symbol("mouseUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_GiftEventProc"), callMethod("getID", _me), symbol("keyUp"))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_GiftEventProc"), callMethod("getID", _me), symbol("keyDown"))
  if (meProp(_me, "m_bEditable")) {
  var t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "basic.dialog1.button1");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setProperty", t_rElem, symbol("visible"), 0)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setProperty", t_rElem, symbol("wordWrap"), 1)
  }

  callMethod("createRadioButtonMenu", _me)
  callMethod("clickElement", meProp(_me, "m_pRadioButtons"), lingoBinary("join", "gift.template", meProp(_me, "m_BgType")))
  callMethod("updateMenu", meProp(_me, "m_pRadioButtons"))
  setMeProp(_me, "m_pComposeMessage", callNamed("CreateCannedField", t_sConfigurationWindowID, "mes.messages.messageinput"));
  callMethod("setAllowFreeWords", meProp(_me, "m_pComposeMessage"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_pComposeMessage"), 1)
  callMethod("setAllowEmpty", meProp(_me, "m_pComposeMessage"), 0)
  setMeProp(_me, "m_rMessageHd", callNamed("CreateCannedField", t_sConfigurationWindowID, "gift.message.hd"));
  callMethod("setAllowFreeWords", meProp(_me, "m_rMessageHd"), 0)
  callMethod("setAllowFriendNames", meProp(_me, "m_rMessageHd"), 1)
  callMethod("setAllowEmpty", meProp(_me, "m_rMessageHd"), 0)
  if (lingoBinary("neq", meProp(_me, "m_sSender"), "")) {
  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.editdialog.hd");
  if (callNamed("objectp", t_rElem)) {
  var t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "m_sSender"), callNamed("getText", "gift.sender.wrote")), meProp(_me, "m_sDate"));
  callMethod("setText", t_rElem, t_sTxt)
  }

  }

  } else {
  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "basic.dialog1.button1");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setProperty", t_rElem, symbol("visible"), 1)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.message.hd");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setEdit", t_rElem, 0)
  callMethod("setFocus", t_rElem, 0)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("setEdit", t_rElem, 0)
  callMethod("setFocus", t_rElem, 0)
  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.image");
  if (lingoBinary("neq", t_rElem, 0)) {
  callMethod("LoadImageToWindowElement", _me, t_sImageUrl, t_rElem)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.sender");
  if (callNamed("objectp", t_rElem)) {
  t_sTxt = lingoBinary("joinPad", lingoBinary("joinPad", meProp(_me, "m_sSender"), callNamed("getText", "gift.sender.wrote")), meProp(_me, "m_sDate"));
  callMethod("setText", t_rElem, t_sTxt)
  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  if (lingoBinary("neq", t_rElem, 0)) {
  if (lingoBinary("eq", meProp(_me, "m_sText"), "")) {
  if (callNamed("listp", t_ar_CardData)) {
  var t_sText = callNamed("replaceChunks", t_ar_CardData[2], "\\r", "\r");
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

  }

  }

  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput");
  var t_rTextField = callMethod("getProperty", t_rElem, symbol("sprite")).member;
  setThePropOf(t_rTextField, "color", callNamed("rgb", "#000000"));
  t_rElem = callMethod("getElement", meProp(_me, "m_rWindow"), "gift.message.hd");
  t_rTextField = callMethod("getProperty", t_rElem, symbol("sprite")).member;
  setThePropOf(t_rTextField, "color", callNamed("rgb", "#000000"));
}


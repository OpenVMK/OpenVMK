// 312ea5aa5d6c166d8f614e2d3c0e4920.cct / CGiftInterface / ConfirmData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ConfirmData(_me: LingoMe) {
  var t_sTxtHd = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "gift.message.hd"));
  var t_sTxt = callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "mes.messages.messageinput"));
  if (lingoBinary("or", lingoBinary("eq", t_sTxtHd, ""), lingoBinary("eq", t_sTxt, ""))) {
  var t_rDialogWnd = callNamed("createDialogWindow", callMethod("getID", _me), "GiftNoText", 1, 1);
  callMethod("show", t_rDialogWnd)
  var t_sMsg = callNamed("getText", "gift.text.missing");
  callMethod("setText", t_rDialogWnd, t_sMsg, callNamed("getText", "gift.text.missing.hd"), "OK")
  return 1;
  }

  var t_bHd = 0;
  if (callMethod("CheckContent", meProp(_me, "m_rMessageHd"))) {
  t_bHd = 1;
  }

  var t_bTxt = 0;
  if (callMethod("CheckContent", meProp(_me, "m_pComposeMessage"))) {
  t_bTxt = 1;
  }

  if (lingoBinary("and", t_bTxt, t_bHd)) {
  t_rDialogWnd = callNamed("createDialogWindow", callMethod("getID", _me), "ConfirGiftData", 2, 1);
  callMethod("show", t_rDialogWnd)
  t_sMsg = callNamed("getText", "gift.are.you.sure");
  callMethod("setText", t_rDialogWnd, t_sMsg, callNamed("getText", "gift.are.you.sure.hd"), "CANCEL", "OK")
  return 1;
  }

}


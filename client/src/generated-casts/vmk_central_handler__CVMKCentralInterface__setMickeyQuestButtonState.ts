// vmk_central_handler.cct / CVMKCentralInterface / setMickeyQuestButtonState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setMickeyQuestButtonState(_me: LingoMe, t_arHiddenMickeyStatus: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sHiddenMickeyWndTitle"));
  var t_bShowDetails = 1;
  var t_txt = callNamed("getText", "hm.info.text");
  var t_txt_append = "";
  if (lingoBinary("eq", t_arHiddenMickeyStatus.foundMickeys, 0)) {
  t_bShowDetails = 0;
  t_txt_append = callNamed("getText", "hm.info.mickeys.none");
  } else {
  if (lingoBinary("eq", t_arHiddenMickeyStatus.foundMickeys, 1)) {
  t_txt_append = callNamed("getText", "hm.info.mickeys.one");
  t_txt_append = callNamed("replaceChunks", t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys);
  } else {
  if (lingoBinary("eq", t_arHiddenMickeyStatus.foundMickeys, t_arHiddenMickeyStatus.totalMickeys)) {
  t_txt_append = callNamed("getText", "hm.info.mickeys.all");
  } else {
  t_txt_append = callNamed("getText", "hm.info.mickeys.amount");
  t_txt_append = callNamed("replaceChunks", t_txt_append, "%foundMickeys%", t_arHiddenMickeyStatus.foundMickeys);
  }

  }

  }

  var tElem = callMethod("getElement", tWndObj, "hm.info.text");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, lingoBinary("join", lingoBinary("join", lingoBinary("join", t_txt, "\r"), "\r"), t_txt_append))
  }

  if (t_bShowDetails) {
  callMethod("setButtonState", _me, meProp(_me, "m_sHiddenMickeyWndTitle"), "hm.mickeydetail.button", 1)
  } else {
  callMethod("setButtonState", _me, meProp(_me, "m_sHiddenMickeyWndTitle"), "hm.mickeydetail.button", 0)
  }

}


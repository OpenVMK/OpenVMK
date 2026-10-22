// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageConfirmTrade / UpdateStates

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateStates(_me: LingoMe, _this: LingoValue, a_bOwnConfirm: LingoValue, a_bHerConfirm: LingoValue) {
  var t_bOwnConfirm = meProp(_me, "m_bOwnConfirm");
  var t_bHerConfirm = meProp(_me, "m_bHerConfirm");
  setMeProp(_me, "m_bOwnConfirm", a_bOwnConfirm);
  setMeProp(_me, "m_bHerConfirm", a_bHerConfirm);
  if (lingoBinary("and", lingoBinary("gt", t_bHerConfirm, meProp(_me, "m_bHerConfirm")), lingoBinary("neq", meProp(_me, "m_bOwnConfirm"), 0))) {
  callMethod("send", callNamed("getConnection", "VMK"), 586, new LingoPropList([symbol("int"), 0]))
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  }

  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  if (lingoBinary("eq", meProp(_me, "m_bHerConfirm"), 2)) {
  var t_sTxt = lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", callNamed("getText", "tra.confirm.hd"), "\t"), meProp(_me, "m_sPartner")), callNamed("getText", "tra.heaccepts"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.confirm.hd"), t_sTxt)
  } else {
  if (lingoBinary("eq", meProp(_me, "m_bOwnConfirm"), 2)) {
  t_sTxt = callNamed("replaceChunks", callNamed("getText", "tra.confirm.hd2"), "%name%", meProp(_me, "m_sPartner"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.confirm.hd"), t_sTxt)
  } else {
  t_sTxt = callNamed("getText", "tra.confirm.hd");
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.confirm.hd"), t_sTxt)
  }

  }

  }

}


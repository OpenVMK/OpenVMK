// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / SetResubmitReason

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetResubmitReason(_me: LingoMe, _this: LingoValue, a_sReason: LingoValue, a_sName: LingoValue) {
  setMeProp(_me, "m_sResubmitReason", a_sReason);
  setMeProp(_me, "m_sName", a_sName);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (lingoBinary("eq", meProp(_me, "m_sResubmitReason"), "resubmit")) {
  var t_sTxt = callNamed("getText", "reg.name.resubmit.hd");
  } else {
  t_sTxt = callNamed("getText", "reg.username.refused.hd");
  }

  t_sTxt = callNamed("replaceChunks", t_sTxt, "\\$", meProp(_me, "m_sName"));
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.refused.hd"), t_sTxt)
  }

}


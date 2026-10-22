// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "m_iState"), symbol("play"))) {
  setMeProp(_me, "m_iFrame", lingoBinary("add", meProp(_me, "m_iFrame"), 1));
  if (lingoBinary("gt", meProp(_me, "m_iFrame"), meProp(_me, "m_iRunningLength"))) {
  callNamed("executeMessage", symbol("animation_ready"), meProp(_me, "m_sName"))
  callMethod("stop", _me)
  }

  }

}


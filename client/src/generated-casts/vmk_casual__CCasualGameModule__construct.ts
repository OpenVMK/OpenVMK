// vmk_casual.cct / CCasualGameModule / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iGameTypeCode", 0);
  setMeProp(_me, "m_ar_sEngineClass", callNamed("GetClsVariable", "casual.engine.class"));
  setMeProp(_me, "m_mp_iRef_rEngine", new LingoPropList([]));
  return 1;
}


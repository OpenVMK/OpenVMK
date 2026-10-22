// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var t_rWindow = undefined;
  setMeProp(_me, "m_objClient", undefined);
  setMeProp(_me, "m_sButtonText", "");
  setMeProp(_me, "m_sSoundName", "");
  setMeProp(_me, "m_LoopSnd_obj", undefined);
  return 1;
}


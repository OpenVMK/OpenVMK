// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_sounds", new LingoPropList([]));
  setMeProp(_me, "m_ar_animContainers", new LingoList([]));
  setMeProp(_me, "m_ar_pAnimations", new LingoList([]));
  setMeProp(_me, "m_ar_pNodes", new LingoList([]));
  setMeProp(_me, "m_iState", symbol("stop"));
  setMeProp(_me, "m_iFrame", 1);
  setMeProp(_me, "m_anistarttime", theProperty("milliSeconds"));
  setMeProp(_me, "m_iRunningLength", 0);
  setMeProp(_me, "m_sName", "");
  return 1;
}


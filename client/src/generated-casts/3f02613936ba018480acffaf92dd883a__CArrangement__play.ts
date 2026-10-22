// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / play

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function play(_me: LingoMe, i_iFrameIndex: LingoValue) {
  if (callNamed("voidp", i_iFrameIndex)) {
  i_iFrameIndex = 1;
  }

  setMeProp(_me, "m_anistarttime", theProperty("milliSeconds"));
  setMeProp(_me, "m_iState", symbol("play"));
  var t_iFrame = callNamed("max", 1, callNamed("min", callNamed("integer", i_iFrameIndex), lingoBinary("sub", meProp(_me, "m_iRunningLength"), 1)));
  setMeProp(_me, "m_iFrame", t_iFrame);
}


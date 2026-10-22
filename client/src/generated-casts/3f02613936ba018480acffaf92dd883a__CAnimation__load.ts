// 3f02613936ba018480acffaf92dd883a.cct / CAnimation / load

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function load(_me: LingoMe, i_ar_framelist: LingoValue, i_iLoopStart: LingoValue, i_iLoopEnd: LingoValue, i_iLoopCount: LingoValue, i_bFreeze: LingoValue, i_ar_soundList: LingoValue) {
  setMeProp(_me, "m_ar_framelist", i_ar_framelist);
  setMeProp(_me, "m_iLoopCount", i_iLoopCount);
  setMeProp(_me, "m_iLoopStart", i_iLoopStart);
  setMeProp(_me, "m_iLoopEnd", i_iLoopEnd);
  setMeProp(_me, "m_bFreeze", i_bFreeze);
  if ((lingoTruthy(callNamed("voidp", i_ar_soundList)) ? 0 : 1)) {
  setMeProp(_me, "m_ar_soundList", new LingoPropList([]));
  if (lingoBinary("neq", i_ar_soundList.count, 0)) {
  for (var i = 1; i <= i_ar_soundList.count; ++i) {
  var prop = callMethod("getPropAt", i_ar_soundList, i);
  meProp(_me, "m_ar_soundList")[prop] = new LingoPropList([]);
  meProp(_me, "m_ar_soundList")[prop][symbol("name")] = i_ar_soundList[i];
  meProp(_me, "m_ar_soundList")[prop][symbol("playcount")] = 0;
  }

  }

  }

}


// 42c66f7b170484e24189f467fe87b08d.cct / CSoundObjectBU / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_SndName: LingoValue) {
  var t_sndMem = callNamed("member", callNamed("getmemnum", a_SndName));
  if ((lingoTruthy(callNamed("voidp", t_sndMem)) ? 0 : 1)) {
  setMeProp(_me, "m_mpSndProps", new LingoPropList([symbol("member"), t_sndMem]));
  setMeProp(_me, "m_rMemSound", t_sndMem);
  return 1;
  } else {
  return 0;
  }

}


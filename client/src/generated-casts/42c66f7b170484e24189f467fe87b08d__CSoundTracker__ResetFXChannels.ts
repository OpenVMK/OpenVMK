// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / ResetFXChannels

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResetFXChannels(_me: LingoMe) {
  setMeProp(_me, "m_iVolume", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  for (var i = 1; i <= 3; ++i) {
  setThePropOf(callNamed("sound", i), "pan", 0);
  setThePropOf(callNamed("sound", i), "volume", meProp(_me, "m_iVolume"));
  }

}


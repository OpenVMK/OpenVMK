// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / ResetRoomSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResetRoomSounds(_me: LingoMe) {
  setMeProp(_me, "m_bMusic", callMethod("get", callNamed("getObject", symbol("session")), "music"));
  setMeProp(_me, "m_bFx", callMethod("get", callNamed("getObject", symbol("session")), "fx"));
  setMeProp(_me, "m_iVolume", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  callMethod("StartRoomSounds", _me)
}


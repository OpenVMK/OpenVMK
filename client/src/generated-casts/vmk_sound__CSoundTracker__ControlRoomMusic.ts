// vmk_sound.cct / CSoundTracker / ControlRoomMusic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ControlRoomMusic(_me: LingoMe, a_bState: LingoValue) {
  setMeProp(_me, "m_StopJustMusic", 0);
  if (a_bState) {
  callMethod("ResetRoomSounds", _me)
  } else {
  setMeProp(_me, "m_StopJustMusic", 1);
  }

  callMethod("StopRoomSounds", _me)
  callMethod("StartRoomSounds", _me)
}


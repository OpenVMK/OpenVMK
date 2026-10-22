// vmk_sound.cct / CSoundComponent / AllCastsDone

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AllCastsDone(_me: LingoMe) {
  callMethod("setAllSoundsOn", _me)
  callNamed("createObject", "SoundTracker", "CSoundTracker")
  var t_Obj = callNamed("createObject", "SoundChannelAllocator", "CSoundChannelAllocator");
  callMethod("Define", t_Obj)
}


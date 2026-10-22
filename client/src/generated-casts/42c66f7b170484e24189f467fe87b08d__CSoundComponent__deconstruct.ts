// 42c66f7b170484e24189f467fe87b08d.cct / CSoundComponent / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  callNamed("unregisterMessage", symbol("set_AllSoundsOn"))
  callNamed("unregisterMessage", symbol("set_MusicOn"))
  callNamed("unregisterMessage", symbol("set_FxOn"))
  callNamed("unregisterMessage", symbol("set_AllSoundsOff"))
  callNamed("unregisterMessage", symbol("set_MusicOff"))
  callNamed("unregisterMessage", symbol("set_FxOff"))
  callNamed("unregisterMessage", symbol("adjustVolume_allSounds"))
  callNamed("unregisterMessage", symbol("adjustVolume_music"))
  callNamed("unregisterMessage", symbol("adjustVolume_fx"))
  callNamed("unregisterMessage", "PlayInterfaceSound")
  callNamed("unregisterMessage", "PlayFxSound")
  callNamed("removeObject", "SoundChannelAllocator")
  return 1;
}


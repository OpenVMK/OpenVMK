// vmk_sound.cct / CSoundComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("AllCastsDone"))
  callNamed("registerMessage", symbol("set_AllSoundsOn"), callMethod("getID", _me), symbol("setAllSoundsOn"))
  callNamed("registerMessage", symbol("set_MusicOn"), callMethod("getID", _me), symbol("setMusicOn"))
  callNamed("registerMessage", symbol("set_FxOn"), callMethod("getID", _me), symbol("setFxOn"))
  callNamed("registerMessage", symbol("set_AllSoundsOff"), callMethod("getID", _me), symbol("setAllSoundsOff"))
  callNamed("registerMessage", symbol("set_MusicOff"), callMethod("getID", _me), symbol("setMusicOff"))
  callNamed("registerMessage", symbol("set_FxOff"), callMethod("getID", _me), symbol("setFxOff"))
  callNamed("registerMessage", symbol("adjustVolume_allSounds"), callMethod("getID", _me), symbol("adjustVolumeAllSounds"))
  callNamed("registerMessage", symbol("adjustVolume_music"), callMethod("getID", _me), symbol("adjustVolumeMusic"))
  callNamed("registerMessage", symbol("adjustVolume_fx"), callMethod("getID", _me), symbol("adjustVolumeFx"))
  callNamed("registerMessage", "PlayInterfaceSound", callMethod("getID", _me), symbol("InterfaceSnd"))
  callNamed("registerMessage", "PlayFxSound", callMethod("getID", _me), symbol("FxSnd"))
  return 1;
}


// vmk_musicmix1.cct / CMusicMixerInterface / StopEverything

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function StopEverything(_me: LingoMe) {
  callMethod("playBackControl", callMethod("getComponent", _me), "Stop")
  callMethod("StopPointerTimer", _me)
  for (var i = 1; i <= 5; ++i) {
  callMethod("setPlayList", callNamed("sound", lingoBinary("add", callMethod("getComponent", _me).m_iFirstSoundChannel, i)), new LingoList([]))
  }

}


// vmk_music_mixer.cct / CMusicMixerPopup / eventProcSongList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcSongList(_me: LingoMe, tEvent: LingoValue, tActiveItem: LingoValue) {
  callMethod("evaluateActiveButtons", _me)
}


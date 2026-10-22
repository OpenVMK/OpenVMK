// vmk_monorail_mixer.cct / CMusicMixerHandler / PlaySongResult

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySongResult(_me: LingoMe, tMsg: LingoValue) {
  callNamed("put", "Received PlaySongResult")
}


// vmk_monorail_mixer.cct / CMusicMixerHandler / GetSongs

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSongs(_me: LingoMe) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetSongs")
}


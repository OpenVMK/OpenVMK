// vmk_monorail_musicmix_handler.cct / CMusicPlayerEngine / playRoomSounds

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function playRoomSounds(_me: LingoMe) {
  callNamed("executeMessage", "LoadRoomSound", "music-mix_")
}


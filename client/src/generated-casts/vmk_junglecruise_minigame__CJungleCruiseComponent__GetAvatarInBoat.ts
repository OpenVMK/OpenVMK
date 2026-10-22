// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / GetAvatarInBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetAvatarInBoat(_me: LingoMe) {
  return meProp(_me, "m_avatarInBoat");
}


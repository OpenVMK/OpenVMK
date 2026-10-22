// vmk_pirates2_minigame.cct / CPiratesComponent / GetMyAvatarRef

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMyAvatarRef(_me: LingoMe) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  return meProp(_me, "m_myAvatarRef");
}


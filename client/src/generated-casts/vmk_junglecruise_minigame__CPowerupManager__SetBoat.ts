// vmk_junglecruise_minigame.cct / CPowerupManager / SetBoat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetBoat(_me: LingoMe, a_rBoat: LingoValue) {
  setMeProp(_me, "m_boat", a_rBoat);
}


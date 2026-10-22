// vmk_junglecruise_minigame.cct / CCatmullRom / setAccuracy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setAccuracy(_me: LingoMe, i_iAccuracy: LingoValue) {
  setMeProp(_me, "steps", i_iAccuracy);
}


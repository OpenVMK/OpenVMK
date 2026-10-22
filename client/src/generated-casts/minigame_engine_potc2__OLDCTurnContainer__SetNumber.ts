// minigame_engine_potc2.cct / OLDCTurnContainer / SetNumber

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetNumber(_me: LingoMe, i_iNumber: LingoValue) {
  setMeProp(_me, "m_iNumber", i_iNumber);
}


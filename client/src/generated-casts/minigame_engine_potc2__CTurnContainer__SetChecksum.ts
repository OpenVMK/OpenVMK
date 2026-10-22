// minigame_engine_potc2.cct / CTurnContainer / SetChecksum

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetChecksum(_me: LingoMe, i_iChecksum: LingoValue) {
  setMeProp(_me, "m_iChecksum", i_iChecksum);
}


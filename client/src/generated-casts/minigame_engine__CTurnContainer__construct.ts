// minigame_engine.cct / CTurnContainer / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_subturns", new LingoList([]));
  setMeProp(_me, "m_iNumber", -float(1));
  setMeProp(_me, "m_bTested", 0);
  setMeProp(_me, "m_iChecksum", 0);
  return 1;
}


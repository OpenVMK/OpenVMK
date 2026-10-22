// item_2355.cct / CCheckersGameEngine / IsMyTurn

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsMyTurn(_me: LingoMe, _this: LingoValue) {
  return lingoBinary("and", lingoBinary("eq", meProp(_me, "m_iWhosTurn"), meProp(_me, "m_iOwnPlayer")), lingoBinary("neq", meProp(_me, "m_iOwnPlayer"), 0));
}


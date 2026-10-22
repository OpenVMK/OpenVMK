// vmk_tutorial.cct / CAlbumWindow / updateTotalScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateTotalScore(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getThread", "junglecruise"), 0)) {
  setMeProp(_me, "m_iTotalScore", callMethod("GetScore", callMethod("getComponent", callNamed("getThread", "junglecruise"))));
  }

}


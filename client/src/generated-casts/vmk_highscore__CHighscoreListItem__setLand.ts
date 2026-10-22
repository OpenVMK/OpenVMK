// vmk_highscore.cct / CHighscoreListItem / setLand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLand(_me: LingoMe, a_sLand: LingoValue) {
  setMeProp(_me, "m_sLand", a_sLand);
}


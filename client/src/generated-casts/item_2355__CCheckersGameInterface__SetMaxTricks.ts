// item_2355.cct / CCheckersGameInterface / SetMaxTricks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMaxTricks(_me: LingoMe, _this: LingoValue, a_iMaxTricks: LingoValue) {
  setMeProp(_me, "m_iMaxTricks", a_iMaxTricks);
}


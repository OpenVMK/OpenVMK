// vmk_mystics.cct / CFWRenderer / SetTileSize

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTileSize(_me: LingoMe, _this: LingoValue, a_iTileSize: LingoValue) {
  setThePropOf(_this, "m_iTileSize", a_iTileSize);
}


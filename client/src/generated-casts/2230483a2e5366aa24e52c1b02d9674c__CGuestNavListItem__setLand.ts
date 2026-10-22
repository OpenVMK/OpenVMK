// 2230483a2e5366aa24e52c1b02d9674c.cct / CGuestNavListItem / setLand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLand(_me: LingoMe, a_sLand: LingoValue) {
  setThePropOf(_me, "m_sLand", a_sLand);
}


// eba88a10adbb7784498c2112110c5871.cct / CGuestNavListItem / SetVisibleInNavi

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetVisibleInNavi(_me: LingoMe, a_bVisible: LingoValue) {
  setMeProp(_me, "m_bVisibleInNavi", a_bVisible);
}


// eba88a10adbb7784498c2112110c5871.cct / CGuestNavItemList / SetMinimumHeight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetMinimumHeight(_me: LingoMe, i_iHeight: LingoValue) {
  setMeProp(_me, "m_minHeight", i_iHeight);
}


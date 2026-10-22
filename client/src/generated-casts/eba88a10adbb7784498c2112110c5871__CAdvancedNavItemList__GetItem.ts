// eba88a10adbb7784498c2112110c5871.cct / CAdvancedNavItemList / GetItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetItem(_me: LingoMe, i_iIndex: LingoValue) {
  return meProp(_me, "m_ar_pTopics")[i_iIndex];
}


// eba88a10adbb7784498c2112110c5871.cct / CGuestNavItemList / SetWidth

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetWidth(_me: LingoMe, a_iWidth: LingoValue) {
  setMeProp(_me, "m_width", a_iWidth);
}


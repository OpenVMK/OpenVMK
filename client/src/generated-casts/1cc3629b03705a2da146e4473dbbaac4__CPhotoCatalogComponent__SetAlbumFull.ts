// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / SetAlbumFull

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAlbumFull(_me: LingoMe, a_bState: LingoValue) {
  setMeProp(_me, "m_bAlbumFull", a_bState);
}


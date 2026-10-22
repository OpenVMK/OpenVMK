// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_binaryMgr", callNamed("getBinaryManager"));
  setMeProp(_me, "m_mp_photos", new LingoPropList([]));
  setMeProp(_me, "m_bAlbumFull", 0);
  return 1;
}


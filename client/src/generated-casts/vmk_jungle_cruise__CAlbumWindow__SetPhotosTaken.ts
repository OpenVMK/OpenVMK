// vmk_jungle_cruise.cct / CAlbumWindow / SetPhotosTaken

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPhotosTaken(_me: LingoMe, a_iPhotos: LingoValue) {
  setThePropOf(meProp(_me, "m_mp_stats"), "shots", a_iPhotos);
}


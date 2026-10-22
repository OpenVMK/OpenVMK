// vmk_jungle_cruise.cct / CAlbumWindow / SetPhotos

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPhotos(_me: LingoMe, i_ar_photos: LingoValue) {
  setMeProp(_me, "m_ar_photos", i_ar_photos);
}


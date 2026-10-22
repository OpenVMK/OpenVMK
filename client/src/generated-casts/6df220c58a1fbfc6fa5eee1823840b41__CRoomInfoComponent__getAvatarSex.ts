// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoComponent / getAvatarSex

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAvatarSex(_me: LingoMe, i_sAvatarName: LingoValue, i_ar_sexInfo: LingoValue) {
  if (callMethod("findAvatarinRoom", _me, i_sAvatarName, i_ar_sexInfo)) {
  return 1;
  } else {
  return 0;
  }

}


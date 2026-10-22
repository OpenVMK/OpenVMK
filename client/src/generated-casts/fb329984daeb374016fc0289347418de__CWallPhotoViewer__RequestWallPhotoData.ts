// fb329984daeb374016fc0289347418de.cct / CWallPhotoViewer / RequestWallPhotoData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestWallPhotoData(_me: LingoMe, a_iID: LingoValue) {
  callMethod("retrieveWallPhotoData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


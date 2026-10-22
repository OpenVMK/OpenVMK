// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / RequestNextPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestNextPhoto(_me: LingoMe, a_iID: LingoValue) {
  callMethod("retrieveNextAlbumPhotoData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / RequestPrevPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestPrevPhoto(_me: LingoMe, a_iID: LingoValue) {
  callMethod("retrievePreviousAlbumPhotoData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


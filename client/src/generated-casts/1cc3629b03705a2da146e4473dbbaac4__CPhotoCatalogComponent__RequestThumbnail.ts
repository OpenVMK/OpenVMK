// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / RequestThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestThumbnail(_me: LingoMe, a_iID: LingoValue) {
  callMethod("retrieveThumbnailData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogComponent / RequestCatalogPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RequestCatalogPhoto(_me: LingoMe, a_iID: LingoValue) {
  callMethod("retrieveCatalogPhotoData", callNamed("getBinaryManager"), a_iID, callMethod("getID", _me))
}


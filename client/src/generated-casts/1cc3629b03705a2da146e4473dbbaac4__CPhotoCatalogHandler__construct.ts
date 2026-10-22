// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callMethod("regMsgList", _me, 1)
  callNamed("registerMessage", "refresh_catalog", symbol("RequestPhotoIndex"))
  return 1;
}


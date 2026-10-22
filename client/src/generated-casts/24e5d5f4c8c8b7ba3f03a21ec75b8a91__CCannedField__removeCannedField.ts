// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CCannedField / removeCannedField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function removeCannedField(_me: LingoMe, t_sWindowTitle: LingoValue, t_sFieldElement: LingoValue) {
  return callMethod("removeCannedField", callMethod("getComponent", callNamed("getThread", "CannedField")), t_sWindowTitle, t_sFieldElement);
}


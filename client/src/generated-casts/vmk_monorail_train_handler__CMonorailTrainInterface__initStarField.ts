// vmk_monorail_train_handler.cct / CMonorailTrainInterface / initStarField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initStarField(_me: LingoMe) {
  var t_pStarField = callNamed("createObject", "StarField", "CStarField");
  return t_pStarField;
}


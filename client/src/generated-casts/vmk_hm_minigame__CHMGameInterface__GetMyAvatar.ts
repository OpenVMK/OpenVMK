// vmk_hm_minigame.cct / CHMGameInterface / GetMyAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetMyAvatar(_me: LingoMe) {
  var t_ar_myObjects = callMethod("GetMyObjects", callNamed("getObject", symbol("minigame_component")));
  if (lingoBinary("eq", t_ar_myObjects.count, 0)) {
  return undefined;
  } else {
  return t_ar_myObjects[1];
  }

}


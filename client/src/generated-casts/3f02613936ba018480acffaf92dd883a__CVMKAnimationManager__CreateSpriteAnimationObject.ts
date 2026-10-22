// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / CreateSpriteAnimationObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateSpriteAnimationObject(_me: LingoMe, a_sClass: LingoValue, a_iRef: LingoValue, a_mp_params: LingoValue) {
  var t_rAnimationObject = callNamed("createObject", symbol("random"), "CSpriteAnimationObject");
  for (var i = 1; i <= a_mp_params.count; ++i) {
  var tKey = callMethod("getPropAt", a_mp_params, i);
  var tvalue = callMethod("getaProp", a_mp_params, tKey);
  callMethod("SetParam", t_rAnimationObject, tKey, tvalue)
  }

  return t_rAnimationObject;
}


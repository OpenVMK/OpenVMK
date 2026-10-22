// 3f02613936ba018480acffaf92dd883a.cct / CVMKAnimationManager / getAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAnimation(_me: LingoMe, a_sAnimationID: LingoValue) {
  var t_rAnimation = meProp(_me, "m_ar_rAnimations")[a_sAnimationID];
  if (callNamed("objectp", t_rAnimation)) {
  return t_rAnimation;
  } else {
  return undefined;
  }

}


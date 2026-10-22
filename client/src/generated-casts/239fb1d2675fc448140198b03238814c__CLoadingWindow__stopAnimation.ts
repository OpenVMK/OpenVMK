// 239fb1d2675fc448140198b03238814c.cct / CLoadingWindow / stopAnimation

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimation(_me: LingoMe, _this: LingoValue) {
  var t_rAnimationManager = callNamed("getObject", "AnimationManager");
  if (callNamed("objectp", t_rAnimationManager)) {
  callMethod("RemoveAnimation", t_rAnimationManager, "animation")
  }

}


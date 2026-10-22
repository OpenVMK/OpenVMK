// 3f02613936ba018480acffaf92dd883a.cct / CAnimationComponent / deActivateAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deActivateAnimations(_me: LingoMe) {
  callMethod("removeAllAnimations", _me)
  for (var i = 1; i <= 15; ++i) {
  var tVarName = lingoBinary("join", "vmk_anim_", i);
  if (callNamed("variableExists", tVarName)) {
  callNamed("removeVariable", tVarName)
  continue;
  }

  }

  if (callNamed("objectp", meProp(_me, "m_rAnimationManager"))) {
  callMethod("ClearAll", meProp(_me, "m_rAnimationManager"))
  }

}


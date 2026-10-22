// vmk_monorail_train_handler.cct / CMonorailTrainInterface / stopAnimations

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopAnimations(_me: LingoMe, tAnimEngine: LingoValue) {
  if (callNamed("threadExists", symbol("animation"))) {
  tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  for (var tAnim of meProp(_me, "m_animIDs").toArray()) {
  callMethod("StopAnim", tAnimEngine, tAnim)
  }

  }

}


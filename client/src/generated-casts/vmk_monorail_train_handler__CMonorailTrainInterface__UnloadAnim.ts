// vmk_monorail_train_handler.cct / CMonorailTrainInterface / UnloadAnim

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UnloadAnim(_me: LingoMe) {
  if (callNamed("threadExists", symbol("animation"))) {
  var tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  tAnimEngine = callMethod("getComponent", callNamed("getThread", symbol("animation")));
  for (var tAnim of meProp(_me, "m_animIDs").toArray()) {
  callMethod("RemoveAnim", tAnimEngine, tAnim)
  }

  }

}


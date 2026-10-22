// vmk_hm_minigame.cct / CHMVisualCoffin / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var t_rattler = callMethod("GetRattler", callMethod("GetFactor", callMethod("getObject", _me)));
  if ((lingoTruthy(callNamed("voidp", t_rattler)) ? 0 : 1)) {
  switch (callMethod("GetState", t_rattler)) {
case symbol("tremble"):
  callMethod("tremble", t_rattler)
  break;
case symbol("rattle"):
  callMethod("rattle", t_rattler)
  break;
  }

  }

}


// vmk_hm_minigame.cct / CHMFactorCoffin / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe) {
  var t_rattler = callMethod("getARattler", callMethod("getComponent", callNamed("getThread", "hauntedmansiongame")).m_rStage);
  if (lingoBinary("neq", t_rattler, 0)) {
  setMeProp(_me, "m_rRattler", t_rattler);
  }

}


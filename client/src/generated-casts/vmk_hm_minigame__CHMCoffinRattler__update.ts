// vmk_hm_minigame.cct / CHMCoffinRattler / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  switch (meProp(_me, "m_iState")) {
case symbol("tremble"):
  callMethod("tremble", _me)
  break;
case symbol("rattle"):
  callMethod("rattle", _me)
  break;
case symbol("opening"):
  callMethod("openCoffin", _me)
  break;
case symbol("closing"):
  callMethod("closeCoffin", _me)
  break;
  }

}


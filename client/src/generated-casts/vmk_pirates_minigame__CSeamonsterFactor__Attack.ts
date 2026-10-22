// vmk_pirates_minigame.cct / CSeamonsterFactor / Attack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Attack(_me: LingoMe) {
  var tstate = callMethod("GetParam", callMethod("getObject", _me), "State");
  tstate = callNamed("SetBit", tstate, meProp(_me, "m_ATTACK_BIT"));
  callMethod("SetParam", callMethod("getObject", _me), "State", tstate)
}


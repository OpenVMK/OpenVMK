// vmk_hm_minigame.cct / CHMAvatarClassPossessed / GetShirtColor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetShirtColor(_me: LingoMe) {
  switch (meProp(_me, "m_iTeam")) {
case 1:
  return callNamed("rgb", "#FF5AB7");
case 2:
  return callNamed("rgb", "#40FF31");
  }

  return callNamed("rgb", "#FF5AB7");
}


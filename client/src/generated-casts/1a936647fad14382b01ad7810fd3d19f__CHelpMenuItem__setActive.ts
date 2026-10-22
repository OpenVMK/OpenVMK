// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItem / setActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setActive(_me: LingoMe, t_active: LingoValue) {
  setThePropOf(_me, "Active", t_active);
  if ((lingoTruthy(_me.Active) ? 0 : 1)) {
  callMethod("inActivate", _me)
  } else {
  callMethod("Activate", _me)
  }

}


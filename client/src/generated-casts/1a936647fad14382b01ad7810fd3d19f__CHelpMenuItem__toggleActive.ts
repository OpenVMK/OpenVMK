// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItem / toggleActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toggleActive(_me: LingoMe) {
  setThePropOf(_me, "Active", (lingoTruthy(_me.Active) ? 0 : 1));
  if (_me.Active) {
  callMethod("Activate", _me)
  } else {
  callMethod("inActivate", _me)
  }

  setMeProp(_me, "pNeedUpdate", 1);
  callMethod("update", _me)
}


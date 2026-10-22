// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenuItemCategory / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  for (var Help of meProp(_me, "helps").toArray()) {
  callNamed("removeObject", callMethod("getID", Help))
  }

  setThePropOf(_me, "helps", new LingoList([]));
}


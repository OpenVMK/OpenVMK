// vmk_junglecruise_minigame.cct / CPuffFactor / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  var tAge = callMethod("GetParam", callMethod("getObject", _me), "Age");
  tAge = lingoBinary("add", tAge, 1);
  callMethod("SetParam", callMethod("getObject", _me), "Age", tAge)
  callMethod("SetAbsPos", callMethod("getObject", _me), callMethod("GetParam", callMethod("getObject", _me), "WorldPosition"))
}


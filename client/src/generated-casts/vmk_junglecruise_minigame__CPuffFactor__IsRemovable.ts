// vmk_junglecruise_minigame.cct / CPuffFactor / IsRemovable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function IsRemovable(_me: LingoMe) {
  if (lingoBinary("gt", callMethod("GetParam", callMethod("getObject", _me), "Age"), 15)) {
  return 1;
  } else {
  return 0;
  }

}


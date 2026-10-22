// vmk_hm_minigame.cct / CHMGameInterface / checkMouseAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkMouseAction(_me: LingoMe) {
  if (_mouse.mouseDown) {
  if (lingoBinary("and", lingoBinary("gt", _mouse.mouseH, 0), lingoBinary("lt", _mouse.mouseH, 800))) {
  if (lingoBinary("and", lingoBinary("gt", _mouse.mouseV, 0), lingoBinary("lt", _mouse.mouseV, 560))) {
  return 1;
  }

  }

  }

  return 0;
}


// vmk_pirates2_minigame.cct / MathMethods / AdjustDirection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AdjustDirection(_me: LingoMe, i_current: LingoValue, i_difference: LingoValue) {
  i_current = lingoBinary("add", i_current, i_difference);
  if (lingoBinary("gt", i_current, 359)) {
  i_current = lingoBinary("mod", i_current, 360);
  }

  if (lingoBinary("lt", i_current, 0)) {
  i_current = lingoBinary("sub", 360, lingoBinary("mod", -float(i_current), 360));
  }

  return i_current;
}


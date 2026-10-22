// vmk_junglecruise_minigame.cct / CCatmullRom / b

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function b(_me: LingoMe, i: LingoValue, t: LingoValue) {
  switch (i) {
case -float(2):
  return lingoBinary("div", lingoBinary("mul", lingoBinary("sub", lingoBinary("mul", lingoBinary("add", -float(t), 2), t), 1), t), 2);
case -float(1):
  return lingoBinary("div", lingoBinary("add", lingoBinary("mul", lingoBinary("mul", lingoBinary("sub", lingoBinary("mul", 3, t), 5), t), t), 2), 2);
case 0:
  return lingoBinary("div", lingoBinary("mul", lingoBinary("add", lingoBinary("mul", lingoBinary("add", lingoBinary("mul", -float(3), t), 4), t), 1), t), 2);
case 1:
  return lingoBinary("div", lingoBinary("mul", lingoBinary("mul", lingoBinary("sub", t, 1), t), t), 2);
  }

  return 0;
}


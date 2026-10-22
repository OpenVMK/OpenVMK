// vmk_fireworks_minigame.cct / CFireworksGameComponent / getFireworksBetween

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFireworksBetween(_me: LingoMe, i_fStart: LingoValue, i_fEnd: LingoValue) {
  var tList = new LingoList([]);
  for (var tEntry of callMethod("GetLevel", meProp(_me, "m_stage")).toArray()) {
  var tTime = tEntry[symbol("t")];
  if (lingoBinary("and", lingoBinary("lte", i_fStart, tTime), lingoBinary("lt", tTime, i_fEnd))) {
  callMethod("append", tList, tEntry)
  }

  }

  if (meProp(_me, "m_tutorialmode")) {
  var tBombs = callNamed("getVariableValue", "payload_types");
  if (lingoBinary("gt", callNamed("random", 100), 95)) {
  callMethod("append", tList, new LingoPropList([symbol("f"), tBombs[callNamed("random", tBombs.count)], symbol("pos"), callNamed("vector", -float(15), lingoBinary("sub", callNamed("random", 20), 10), lingoBinary("sub", 10, callNamed("random", 20))), symbol("id"), -float(1)]))
  }

  }

  return tList;
}


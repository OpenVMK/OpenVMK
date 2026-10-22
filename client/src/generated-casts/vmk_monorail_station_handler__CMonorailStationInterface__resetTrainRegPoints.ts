// vmk_monorail_station_handler.cct / CMonorailStationInterface / resetTrainRegPoints

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetTrainRegPoints(_me: LingoMe) {
  var t_parts = new LingoList(["monorail_start", "monorail_mid", "monorail_end"]);
  var t_regpoints = new LingoList([callNamed("point", 761, 504), callNamed("point", 96, 203), callNamed("point", -float(507), -float(101))]);
  var i = 1;
  for (var part of t_parts.toArray()) {
  var tMem = callNamed("getMember", part);
  setThePropOf(tMem, "regPoint", t_regpoints[i]);
  i = lingoBinary("add", i, 1);
  }

}


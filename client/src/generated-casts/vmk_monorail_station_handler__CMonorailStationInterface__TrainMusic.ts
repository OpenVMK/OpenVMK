// vmk_monorail_station_handler.cct / CMonorailStationInterface / TrainMusic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainMusic(_me: LingoMe) {
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callNamed("executeMessage", "PlayInterfaceSound", "MS-train-music-FX")
  }

}


// vmk_monorail_station_handler.cct / CMonorailStationHandler / MonorailEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MonorailEvent(_me: LingoMe, a_rMsg: LingoValue) {
  callNamed("executeMessage", symbol("MonorailStatus"), callMethod("GetIntFrom", a_rMsg.connection))
}


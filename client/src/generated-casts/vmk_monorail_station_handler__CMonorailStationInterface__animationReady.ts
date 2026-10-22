// vmk_monorail_station_handler.cct / CMonorailStationInterface / animationReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function animationReady(_me: LingoMe, arrangement: LingoValue) {
  switch (arrangement) {
case "monorail_open_arrangement":
  callMethod("showExits", _me)
  callMethod("showMasks", _me)
  break;
case "monorail_close_arrangement":
  callMethod("leaveStation", _me)
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Arrengement ready received!", arrangement))
  }

}


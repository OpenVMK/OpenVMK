// vmk_monorail_station_handler.cct / CMonorailStationInterface / TrainApproaches

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TrainApproaches(_me: LingoMe) {
  callMethod("ShowTrain", _me)
  if (callNamed("voidp", meProp(_me, "m_monorailAnimator"))) {
  callMethod("createMonorailAnimator", _me)
  }

  callMethod("approachStation", meProp(_me, "m_monorailAnimator"))
  var t_bOn = callMethod("get", callNamed("getObject", symbol("session")), "fx");
  if (t_bOn) {
  callNamed("executeMessage", "PlayInterfaceSound", "MRVO-stand-clear")
  callMethod("displayText", _me, "Train approaching. Stand clear of the doors!")
  callNamed("executeMessage", "PlayInterfaceSound", "MR-train-arrive")
  }

}


// vmk_casual_checkers.cct / CCheckersGameModule / OnNextGameStarting

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnNextGameStarting(_me: LingoMe, _this: LingoValue, a_iSeconds: LingoValue) {
  var t_sCounter = "CheckersNextGameCounter";
  if (callNamed("objectExists", t_sCounter)) {
  var t_rCounter = callNamed("getObject", t_sCounter);
  } else {
  t_rCounter = callNamed("createObject", t_sCounter, "CCheckersNextGameCountDown");
  }

  callMethod("updateCounter", t_rCounter, a_iSeconds)
  if (lingoBinary("eq", a_iSeconds, 1)) {
  callMethod("delay", t_rCounter, 1000, symbol("Destroy"))
  }

}


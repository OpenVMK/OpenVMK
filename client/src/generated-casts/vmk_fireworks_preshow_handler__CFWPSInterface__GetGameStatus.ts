// vmk_fireworks_preshow_handler.cct / CFWPSInterface / GetGameStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetGameStatus(_me: LingoMe, a_rGame: LingoValue) {
  var tGame = callMethod("GetGameByIndex", callMethod("getComponent", callNamed("getThread", "lobby")), 1);
  if ((lingoTruthy(callNamed("voidp", tGame)) ? 0 : 1)) {
  if (lingoBinary("lt", callMethod("GetParameterValue", tGame, "NumParticipants"), callNamed("value", callMethod("GetParameterValue", tGame, "miu")))) {
  return symbol("waiting");
  } else {
  return symbol("countdown");
  }

  }

  return symbol("waiting");
}


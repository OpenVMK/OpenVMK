// vmk_tutorial.cct / CJungleCruiseHandlerExtension / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_bDebugOut", 1);
  setMeProp(_me, "m_sDebugPre", "[JC.handlerX.dbg]");
  var tFuel = callNamed("getVariableValue", "junglecruise.powerUp.fuel.pickup");
  if (lingoBinary("eq", tFuel, 0)) {
  tFuel = 5;
  }

  setMeProp(_me, "m_iFuelPickup", tFuel);
  var tFilm = callNamed("getVariableValue", "junglecruise.powerUp.film.pickup");
  if (lingoBinary("eq", tFilm, 0)) {
  tFilm = 5;
  }

  setMeProp(_me, "m_iFilmPickup", tFilm);
  return 1;
}


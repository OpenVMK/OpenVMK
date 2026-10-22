// vmk_tutorial.cct / CJungleCruiseComponent / AwardPowerup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AwardPowerup(_me: LingoMe, a_iFuel: LingoValue, a_iFilm: LingoValue) {
  if (lingoBinary("neq", meProp(_me, "m_stage"), 0)) {
  if (lingoBinary("neq", callMethod("GetName", meProp(_me, "m_stage")), "tutorial")) {
  var tFilm = callMethod("GetParam", meProp(_me, "m_boat"), "Film");
  tFilm = lingoBinary("add", tFilm, a_iFilm);
  callMethod("SetParam", meProp(_me, "m_boat"), "Film", tFilm)
  callMethod("AddFilm", meProp(_me, "m_filmstrip"), a_iFilm)
  var tFuel = callMethod("GetParam", meProp(_me, "m_boat"), "Fuel");
  tFuel = lingoBinary("add", tFuel, a_iFuel);
  callMethod("SetParam", meProp(_me, "m_boat"), "Fuel", tFuel)
  }

  }

  callMethod("updatePowerups", callMethod("getInterface", _me))
}


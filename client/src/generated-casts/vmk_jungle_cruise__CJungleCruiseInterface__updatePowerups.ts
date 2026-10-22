// vmk_jungle_cruise.cct / CJungleCruiseInterface / updatePowerups

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updatePowerups(_me: LingoMe) {
  var tBoat = callMethod("GetBoat", callMethod("getComponent", _me));
  if (lingoBinary("neq", tBoat, 0)) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tFilm = callMethod("GetParam", tBoat, "Film");
  var tFuel = callMethod("GetParam", tBoat, "Fuel");
  var tElem = callMethod("getElement", tWndObj, "film.amount");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, tFilm)
  }

  tElem = callMethod("getElement", tWndObj, "gas.amount");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, tFuel)
  }

  }

  }

}


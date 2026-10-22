// vmk_pirates_minigame.cct / CPiratesComponent / GetShipByOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetShipByOwner(_me: LingoMe, a_iRef: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var t_ar_ships = callMethod("GetObjectsByCode", meProp(_me, "m_rMGE"), 1);
  for (var tShip of t_ar_ships.toArray()) {
  if (lingoBinary("eq", a_iRef, callMethod("GetParam", tShip, "Owner"))) {
  return tShip;
  }

  }

  return undefined;
}


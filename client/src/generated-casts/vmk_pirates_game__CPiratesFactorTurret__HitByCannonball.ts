// vmk_pirates_game.cct / CPiratesFactorTurret / HitByCannonball

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HitByCannonball(_me: LingoMe) {
  var tMyObject = callMethod("getObject", _me);
  var tGameParams = callMethod("GetParam", tMyObject, "GameParams");
  tGameParams[meProp(_me, "m_HEALTH")] = lingoBinary("sub", tGameParams[meProp(_me, "m_HEALTH")], 1);
  if (lingoBinary("lte", tGameParams[meProp(_me, "m_HEALTH")], 0)) {
  tGameParams[meProp(_me, "m_HEALTH")] = 0;
  }

  callMethod("SetParam", tMyObject, "GameParams", tGameParams)
}


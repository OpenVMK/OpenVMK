// vmk_pirates_minigame.cct / CPiratesFactorWindIndicator / ChangeWind

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeWind(_me: LingoMe, a_iDirection: LingoValue, a_iVelocity: LingoValue) {
  var tGameParams = callMethod("GetParam", callMethod("getObject", _me), "GameParams");
  tGameParams[1] = a_iVelocity;
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", tGameParams)
  callMethod("SetParam", callMethod("getObject", _me), "Direction", a_iDirection)
  callMethod("SetParam", callMethod("getObject", _me), "Strength", meProp(_me, "m_ar_windStrength")[lingoBinary("add", a_iVelocity, 1)])
}


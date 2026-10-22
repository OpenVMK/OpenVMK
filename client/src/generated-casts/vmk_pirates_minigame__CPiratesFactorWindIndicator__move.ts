// vmk_pirates_minigame.cct / CPiratesFactorWindIndicator / move

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function move(_me: LingoMe) {
  var tGameParams = callMethod("GetParam", callMethod("getObject", _me), "GameParams");
  callMethod("SetParam", callMethod("getObject", _me), "Strength", meProp(_me, "m_ar_windStrength")[lingoBinary("add", tGameParams[1], 1)])
}


// vmk_pirates2_minigame.cct / CPiratesFactorWindIndicator / UpdateParameters

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateParameters(_me: LingoMe, i_ar_data: LingoValue) {
  callMethod("SetParam", callMethod("getObject", _me), "GameParams", i_ar_data)
  callMethod("SetParam", callMethod("getObject", _me), "Strength", meProp(_me, "m_ar_windStrength")[lingoBinary("add", i_ar_data[1], 1)])
}


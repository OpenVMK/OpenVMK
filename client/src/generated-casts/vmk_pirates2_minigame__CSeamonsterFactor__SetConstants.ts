// vmk_pirates2_minigame.cct / CSeamonsterFactor / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("circle"))
  callMethod("SetParam", callMethod("getObject", _me), "BoundingCirleRadius", 5000)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 0)
  callMethod("SetParam", callMethod("getObject", _me), "NavigationStopRadius", 1000)
  callMethod("SetParam", callMethod("getObject", _me), "State", 0)
  callMethod("SetParam", callMethod("getObject", _me), "Speed", callMethod("getaProp", callMethod("GetSeaMonsterSettings", callMethod("GetStage", callMethod("getComponent", callNamed("getThread", "piratesminigame")))), "ChaseSpeed"))
}


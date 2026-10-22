// vmk_pirates2_minigame.cct / CPiratesBuildingFactor / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  var tGraphicCode = callMethod("GetParam", callMethod("getObject", _me), "GameParams")[2];
  callMethod("SetParam", callMethod("getObject", _me), "Killed", 0)
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("box"))
  var t_dimensions = callMethod("GetBuildingBounds", callMethod("getComponent", callNamed("getThread", "piratesminigame")), tGraphicCode);
  callMethod("SetParam", callMethod("getObject", _me), "BoxDimensions", t_dimensions)
  callMethod("SetParam", callMethod("getObject", _me), "WindAffects", 0)
  callMethod("SetParam", callMethod("getObject", _me), "DmgObjects", callMethod("GetBuildingDmgObjects", callMethod("getComponent", callNamed("getThread", "piratesminigame")), tGraphicCode))
  callMethod("SetParam", callMethod("getObject", _me), "BurnObjects", callMethod("GetBuildingBurnObjects", callMethod("getComponent", callNamed("getThread", "piratesminigame")), tGraphicCode))
  callMethod("SetParam", callMethod("getObject", _me), "OriginalHealth", callMethod("GetParam", callMethod("getObject", _me), "GameParams")[1])
}


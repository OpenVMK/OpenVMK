// vmk_pirates_game.cct / CPiratesBridgeFactor / SetConstants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetConstants(_me: LingoMe) {
  callMethod("SetParam", callMethod("getObject", _me), "Killed", 0)
  callMethod("SetParam", callMethod("getObject", _me), "BoundsType", symbol("box"))
  var t_dimensions = new LingoList([callNamed("intvector", -float(1000), -float(1000), 0), callNamed("intvector", 1000, 1000, 0)]);
  callMethod("SetParam", callMethod("getObject", _me), "BoxDimensions", t_dimensions)
}


// vmk_casual_checkers.cct / CCheckersGamePiece / SetObject

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetObject(_me: LingoMe, _this: LingoValue, a_rObject: LingoValue) {
  callMethod("SetParam", a_rObject, "CHECKERS_GAME_PIECE", 1)
  callNamed("callAncestor", symbol("SetObject"), _this, a_rObject)
}


// vmk_casual_checkers.cct / CCheckersGameModule / OnPlayerDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OnPlayerDetails(_me: LingoMe, _this: LingoValue, a_rPlayer: LingoValue) {
  callMethod("SetAvatarFigure", callMethod("getInterface", _this), a_rPlayer)
}


// item_2355.cct / CCheckersGamePiece / PlayTrick

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlayTrick(_me: LingoMe, _this: LingoValue, a_iTrick: LingoValue, a_iParams: LingoValue) {
  var t_rTrick = callNamed("createObject", callNamed("getUniqueID"), callNamed("GetClsVariable", lingoBinary("join", "checkers.trick.class.", a_iTrick)));
  callMethod("SetParams", t_rTrick, a_iParams)
  callMethod("SetPiece", t_rTrick, _this)
  callMethod("start", t_rTrick)
  callNamed("put", lingoBinary("joinPad", "Trick used:", a_iTrick))
}


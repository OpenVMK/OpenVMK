// item_2355.cct / CCheckersTrickLevitation / SetPiece

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPiece(_me: LingoMe, _this: LingoValue, a_rPiece: LingoValue) {
  callNamed("executeMessage", "PlayFxSound", "checkers-levitation")
  callNamed("callAncestor", symbol("SetPiece"), _this, a_rPiece)
  var t = callNamed("createObject", callNamed("getUniqueID"), "CCheckersPieceParticleEmitter");
  callMethod("SetPiece", t, callMethod("getObject", a_rPiece))
  callMethod("setAnimation", _this, t)
}


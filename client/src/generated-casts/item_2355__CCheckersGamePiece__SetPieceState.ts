// item_2355.cct / CCheckersGamePiece / SetPieceState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetPieceState(_me: LingoMe, _this: LingoValue, a_iState: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "Piece is now in state", a_iState))
  if (lingoBinary("eq", a_iState, 2)) {
  callNamed("executeMessage", "PlayFxSound", "checkers-intosupercharacter")
  }

}


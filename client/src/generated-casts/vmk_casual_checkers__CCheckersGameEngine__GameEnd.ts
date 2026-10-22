// vmk_casual_checkers.cct / CCheckersGameEngine / GameEnd

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GameEnd(_me: LingoMe, _this: LingoValue, a_iWinnerRef: LingoValue, a_rMsg: LingoValue) {
  callMethod("ClearAllowedMoves", _this)
  setMeProp(_me, "m_mp_iRef_rPiece", new LingoPropList([]));
  if (callNamed("objectp", meProp(_me, "m_rInterface"))) {
  callMethod("NotifyGameEnd", meProp(_me, "m_rInterface"), a_iWinnerRef)
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rInterface")))
  setMeProp(_me, "m_rInterface", undefined);
  }

}


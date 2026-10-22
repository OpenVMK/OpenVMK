// vmk_casual_checkers.cct / CCheckersGameList / _PollOngoingGames

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PollOngoingGames(_me: LingoMe, _this: LingoValue) {
  if (_this.valid) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetOngoingGames", new LingoPropList([symbol("integer"), _this.m_iGameCode]))
  callMethod("delay", _this, meProp(_me, "m_iPollInterval"), symbol("_PollOngoingGames"))
  }

}


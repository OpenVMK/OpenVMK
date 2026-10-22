// vmk_casual_checkers.cct / CCheckersLobbyInterface / _ShowGameDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowGameDetails(_me: LingoMe, _this: LingoValue, a_iInstance: LingoValue, a_sPlayer1: LingoValue, a_sPlayer2: LingoValue) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetGameDetails", new LingoPropList([symbol("integer"), meProp(_me, "m_iGameCode"), symbol("integer"), a_iInstance]))
}


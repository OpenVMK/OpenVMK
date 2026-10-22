// vmk_pirates_game.cct / CPiratesMessageBar / SendMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendMessage(_me: LingoMe) {
  var tCmd = 560;
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), tCmd, callNamed("TransformCannedToMsg", meProp(_me, "m_pCannedField").m_ar_cWords, 1))
  return 1;
}


// 565d7caa66391c8e45a3923725ba051b.cct / CInvTrade / SendMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SendMessage(_me: LingoMe, _this: LingoValue, t_ar_sWords: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 561, callNamed("TransformCannedToMsg", t_ar_sWords, 1))
  return 1;
}


// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _StopMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _StopMagic(_me: LingoMe, _this: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "DeactivateMagicFx")
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), "QueryMagicFx")
  callMethod("HandleUi", _this)
}


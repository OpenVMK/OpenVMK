// vmk_sound.cct / CSoundHandler / SetTutorialSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetTutorialSettings(_me: LingoMe) {
  var t_bTut = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "tutorial"));
  var t = new LingoPropList([symbol("int"), t_bTut]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 782, t)
}


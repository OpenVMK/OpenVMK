// 42c66f7b170484e24189f467fe87b08d.cct / CSoundHandler / SetSoundSettings

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetSoundSettings(_me: LingoMe) {
  var t_bFx = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "fx"));
  var t_bMusic = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "music"));
  var t_bUi = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "ui"));
  var t_bVol = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "volume"));
  var t_bTut = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "tutorial"));
  var t_bTrade = callNamed("integer", callMethod("get", callNamed("getObject", symbol("session")), "traderequests"));
  var t = new LingoPropList([symbol("int"), t_bFx, symbol("int"), t_bMusic, symbol("int"), t_bUi, symbol("int"), t_bVol, symbol("int"), t_bTut, symbol("int"), t_bTrade]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 780, t)
}


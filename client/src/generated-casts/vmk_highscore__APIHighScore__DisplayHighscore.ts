// vmk_highscore.cct / APIHighScore / DisplayHighscore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayHighscore(_me: LingoMe, a_iGameCode: LingoValue, a_rElement: LingoValue, a_rgbColor: LingoValue, a_iIndexType: LingoValue) {
  callMethod("SetElement", callMethod("getComponent", callNamed("getThread", "highscore")), a_rElement)
  if ((lingoTruthy(callNamed("voidp", a_rgbColor)) ? 0 : 1)) {
  callMethod("SetRenderColor", callMethod("getComponent", callNamed("getThread", "highscore")), a_rgbColor)
  }

  switch (a_iGameCode) {
case 5:
  if (callNamed("voidp", a_iIndexType)) {
  a_iIndexType = 0;
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 661, new LingoPropList([symbol("int"), a_iGameCode, symbol("int"), a_iIndexType]))
  break;
  default:
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 660, new LingoPropList([symbol("int"), a_iGameCode]))
  }

}


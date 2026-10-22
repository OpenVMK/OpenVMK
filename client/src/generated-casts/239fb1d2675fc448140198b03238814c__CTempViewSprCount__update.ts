// 239fb1d2675fc448140198b03238814c.cct / CTempViewSprCount / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  callMethod("setText", _this, lingoBinary("join", callNamed("string", lingoBinary("sub", 100, lingoBinary("div", lingoBinary("mul", callMethod("getProperty", callNamed("getSpriteManager"), symbol("freeSprCount")), 100), _movie.lastChannel))), "%"))
}


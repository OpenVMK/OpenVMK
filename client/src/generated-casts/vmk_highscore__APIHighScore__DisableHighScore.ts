// vmk_highscore.cct / APIHighScore / DisableHighScore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisableHighScore(_me: LingoMe) {
  callMethod("SetElement", callMethod("getComponent", callNamed("getThread", "highscore")), undefined)
}


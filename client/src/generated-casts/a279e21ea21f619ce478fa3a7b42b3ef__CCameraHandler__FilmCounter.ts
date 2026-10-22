// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraHandler / FilmCounter

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FilmCounter(_me: LingoMe, tMsg: LingoValue) {
  var tCount = callMethod("GetIntFrom", tMsg.connection);
  callNamed("put", lingoBinary("joinPad", "Film Amount :", tCount))
  callMethod("setFilmAmount", callMethod("getComponent", _me), tCount)
}


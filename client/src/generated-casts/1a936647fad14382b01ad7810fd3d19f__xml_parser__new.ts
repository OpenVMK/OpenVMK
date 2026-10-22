// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe) {
  setThePropOf(_me, "child", new LingoList([]));
  setThePropOf(_me, "_ignoreWhiteSpace", 1);
  setThePropOf(_me, "_doneParsing", 1);
  setThePropOf(_me, "_errorStr", "");
  setThePropOf(_me, "_whiteSpace", lingoBinary("join", lingoBinary("join", lingoBinary("join", callNamed("space"), "\r"), "\t"), callNamed("numToChar", 10)));
  return _me;
}


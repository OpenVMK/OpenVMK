// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / ignoreWhitespace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ignoreWhitespace(_me: LingoMe, ignore: LingoValue) {
  setThePropOf(_me, "_ignoreWhiteSpace", ignore);
}


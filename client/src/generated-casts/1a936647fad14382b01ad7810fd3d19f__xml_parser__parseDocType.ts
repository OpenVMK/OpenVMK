// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseDocType

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseDocType(_me: LingoMe, tokenStr: LingoValue) {
  setThePropOf(_me, "_docType", tokenStr.word[2]);
}


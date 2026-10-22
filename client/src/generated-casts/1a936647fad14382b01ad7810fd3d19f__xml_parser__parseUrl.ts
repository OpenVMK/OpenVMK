// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / parseUrl

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseUrl(_me: LingoMe, url: LingoValue, cbMethod: LingoValue, cbObject: LingoValue) {
  setThePropOf(_me, "_cbMethod", cbMethod);
  setThePropOf(_me, "_cbObject", cbObject);
  setThePropOf(_me, "_netID", callNamed("getNetText", url));
  setThePropOf(_me, "_doneParsing", 0);
  callMethod("add", theProperty("actorList"), _me)
}


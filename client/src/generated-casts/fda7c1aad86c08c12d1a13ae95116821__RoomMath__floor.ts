// fda7c1aad86c08c12d1a13ae95116821.cct / RoomMath / floor

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function floor(_me: LingoMe, f: LingoValue) {
  return lingoBinary("sub", callNamed("bitOr", f, 0), lingoBinary("eq", lingoBinary("add", lingoBinary("lt", f, 0), lingoBinary("neq", f, callNamed("integer", f))), 2));
}


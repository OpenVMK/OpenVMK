// core.old.cct / CMgrCastload / FindCastNumber

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FindCastNumber(_me: LingoMe, _this: LingoValue, tCast: LingoValue) {
  for (var j = 1; j <= theProperty("number of castLibs"); ++j) {
  var tFileName = callNamed("castLib", j).fileName;
  var tFileExtension = tFileName.char.range(lingoBinary("sub", callNamed("length", tFileName), 2), callNamed("length", tFileName));
  if (lingoBinary("and", lingoBinary("and", lingoBinary("neq", callNamed("castLib", j).name, "Internal"), lingoBinary("neq", tFileExtension, "dcr")), lingoBinary("neq", tFileExtension, "dir"))) {
  if (lingoBinary("eq", callNamed("castLib", j).name, tCast)) {
  return callNamed("castLib", tCast)._number;
  break;
  }

  }

  }

  return 0;
}


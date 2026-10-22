// vmk_tutorial.cct / MathMethods / JCStringToUpper

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function JCStringToUpper(_me: LingoMe, t_sString: LingoValue) {
  var tNuString = t_sString;
  for (var i = 1; i <= t_sString.word.count; ++i) {
  var t_word = t_sString.word[i];
  var t_upper = callNamed("JCFirstCharToUpper", t_word);
  tNuString = callNamed("JCreplaceChunks", tNuString, t_word, t_upper);
  }

  return tNuString;
}


// vmk_pirates_minigame.cct / CPiratesComponent / FirstCharToUpper

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FirstCharToUpper(_me: LingoMe, a_cWord: LingoValue) {
  /* global */ var g_profComponent = globalVar("g_profComponent");
  var tNum = callNamed("charToNum", a_cWord.char[1]);
  if (lingoBinary("and", lingoBinary("gte", tNum, 97), lingoBinary("lte", tNum, 122))) {
  return lingoBinary("join", callNamed("string", callNamed("numToChar", lingoBinary("sub", tNum, 32))), callNamed("chars", a_cWord, 2, a_cWord.length));
  } else {
  return a_cWord;
  }

}


// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / SearchAndReplace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SearchAndReplace(_me: LingoMe, input: LingoValue, stringToFind: LingoValue, stringToInsert: LingoValue) {
  var Output = "";
  var findLen = lingoBinary("sub", stringToFind.length, 1);
  while (lingoBinary("contains", input, stringToFind)) {
  var currOffset = callNamed("offset", stringToFind, input);
  Output = lingoBinary("join", Output, input.char.range(1, currOffset));
  Output = deleteStringChunk(Output, "char", -30000, 0);
  Output = lingoBinary("join", Output, stringToInsert);
  input = deleteStringChunk(input, "char", 1, lingoBinary("add", currOffset, findLen));
  }

  Output = lingoBinary("join", Output, input);
  return Output;
}


// 2230483a2e5366aa24e52c1b02d9674c.cct /  / prepareSanitization

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareSanitization(_me: LingoMe) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  setGlobal("pChars", new LingoList(["!", "\"", "E", "$", "%", "^", "&", "*", "(", ")", "{", "}", ":", ";", "@", "~"]));
  setGlobal("pCharsI", callNamed("propList", "!", 0, "\"", 1, "E", 2, "$", 3, "%", 4, "^", 5, "&", 6, "*", 7, "(", 8, ")", 9, "{", 10, "}", 11, ":", 12, ";", 13, "@", 14, "~", 15));
}


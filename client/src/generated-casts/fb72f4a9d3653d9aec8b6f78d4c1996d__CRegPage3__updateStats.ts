// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage3 / updateStats

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateStats(_me: LingoMe, _this: LingoValue) {
  if (callNamed("textExists", "reg.page3.url")) {
  var t_sTrackingURL = callNamed("getText", "reg.page3.url");
  var t_iRandom = callNamed("random", theProperty("milliSeconds"));
  var t_sNetThing = callNamed("replaceChunks", t_sTrackingURL, "randomNumber", t_iRandom);
  if (lingoBinary("eq", callNamed("ilk", t_sTrackingURL), symbol("string"))) {
  var t_ID = callNamed("preloadNetThing", t_sNetThing);
  }

  } else {
  return 0;
  }

}


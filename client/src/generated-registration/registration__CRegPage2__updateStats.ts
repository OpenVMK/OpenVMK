// registration.cct / CRegPage2 / updateStats

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateStats(_me: LingoMe, _this: LingoValue) {
  if (callNamed("textExists", "reg.page2.url")) {
  var t_sTrackingURL = callNamed("getText", "reg.page2.url");
  var t_iRandom = callNamed("random", theProperty("milliSeconds"));
  var t_sNetThing = callNamed("replaceChunks", t_sTrackingURL, "randomNumber", t_iRandom);
  if (lingoBinary("eq", callNamed("ilk", t_sTrackingURL), symbol("string"))) {
  var t_ID = callNamed("preloadNetThing", t_sNetThing);
  }

  } else {
  return 0;
  }

}


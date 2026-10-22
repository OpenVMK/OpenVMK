// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage3 / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  switch (t_dialogEvent) {
case "ok":
  break;
case "cancel":
  if (callNamed("textExists", "game.exit.url")) {
  var t_sURL = callNamed("getText", "game.exit.url");
  } else {
  t_sURL = callNamed("getVariable", "client.reload.url");
  }

  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "_self")
  }

  break;
  }

}


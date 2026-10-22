// registration.cct / CRegPage3 / dialogWindowEvent

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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


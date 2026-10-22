// registration.cct / CRegistrationHandler / dialogWindowEvent

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  switch (a_sDialogName) {
case "PasswordError":
  break;
case "LoginError":
  if (callNamed("textExists", "game.exit.url")) {
  var t_sURL = callNamed("getText", " game.exit.url");
  } else {
  t_sURL = callNamed("getVariable", "client.reload.url");
  }

  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "_self")
  }

  break;
  }

}


// registration.cct / CRegistrationHandler / _EventProcLoginFailed

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProcLoginFailed(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  switch (a_sElem) {
case "mods.ok":
  if (callNamed("textExists", "game.exit.url")) {
  var t_sExitURL = callNamed("getText", "game.exit.url");
  callNamed("gotoNetPage", t_sExitURL, "_self")
  }

  break;
case "vmk_mods_banned":
  if (callNamed("textExists", "game.exit.url")) {
  t_sExitURL = callNamed("getText", "game.exit.url");
  callNamed("gotoNetPage", t_sExitURL, "_self")
  }

  break;
  }

}


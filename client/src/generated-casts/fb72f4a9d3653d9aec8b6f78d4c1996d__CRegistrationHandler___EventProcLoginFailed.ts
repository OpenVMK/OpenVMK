// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / _EventProcLoginFailed

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
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


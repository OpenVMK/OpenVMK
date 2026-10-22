// vmk_tomorrowland_arcade.cct / CArcadeInterface / OpenArcade

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function OpenArcade(_me: LingoMe) {
  if (lingoBinary("and", callNamed("variableExists", "at"), callNamed("textExists", "arcade.url"))) {
  var t_sURL = lingoBinary("join", lingoBinary("join", callNamed("getText", "arcade.url"), "?at="), callNamed("getVariable", "at"));
  } else {
  t_sURL = lingoBinary("join", callNamed("getText", "arcade.url"), "?at=Missing");
  }

  if (callNamed("stringp", t_sURL)) {
  callNamed("gotoNetPage", t_sURL, "arcade")
  }

}


// vmk_dock_handler.cct / CJCPSInterface / eventProcDock

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcDock(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tGameOn = 0;
  var tJCThread = callNamed("getThread", "junglecruise");
  if (lingoBinary("neq", tJCThread, 0)) {
  tGameOn = callMethod("gameOn", callMethod("getComponent", tJCThread));
  }

  if ((lingoTruthy(tGameOn) ? 0 : 1)) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  callNamed("executeMessage", "PlayInterfaceSound", "open-popup")
  callMethod("showSignUpWindow", _me, 1)
  }

  }

}


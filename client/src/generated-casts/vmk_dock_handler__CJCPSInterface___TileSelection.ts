// vmk_dock_handler.cct / CJCPSInterface / _TileSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TileSelection(_me: LingoMe, a_rTile: LingoValue) {
  var tloc = callMethod("GetAbsPos", a_rTile);
  if (lingoBinary("and", lingoBinary("lte", tloc.x, 141), lingoBinary("lte", tloc.y, 213))) {
  var tGameOn = 0;
  var tJCThread = callNamed("getThread", "junglecruise");
  if (lingoBinary("neq", tJCThread, 0)) {
  tGameOn = callMethod("gameOn", callMethod("getComponent", tJCThread));
  }

  if ((lingoTruthy(tGameOn) ? 0 : 1)) {
  callMethod("showSignUpWindow", _me, 1)
  }

  }

}


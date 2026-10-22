// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / HideSubNodeGraphics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideSubNodeGraphics(_me: LingoMe, a_rRoomContext: LingoValue, a_sQuery: LingoValue, a_sParam: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_rRoomContext)) ? 0 : 1)) {
  var tRoot = callMethod("Search", a_rRoomContext, a_sQuery, a_sParam);
  if ((lingoTruthy(callNamed("voidp", tRoot)) ? 0 : 1)) {
  for (var i = 1; i <= callMethod("GetCount", tRoot); ++i) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tRoot[i])), "member", undefined);
  }

  }

  }

}


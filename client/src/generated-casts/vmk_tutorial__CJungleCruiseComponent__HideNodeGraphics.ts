// vmk_tutorial.cct / CJungleCruiseComponent / HideNodeGraphics

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideNodeGraphics(_me: LingoMe, a_rRoomContext: LingoValue, a_sQuery: LingoValue, a_sParam: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", a_rRoomContext)) ? 0 : 1)) {
  var tNode = callMethod("Search", a_rRoomContext, a_sQuery, a_sParam);
  if ((lingoTruthy(callNamed("voidp", tNode)) ? 0 : 1)) {
  var tSprite = callMethod("GetVisual", tNode);
  if ((lingoTruthy(callNamed("voidp", tSprite)) ? 0 : 1)) {
  setThePropOf(callMethod("getSprite", tSprite), "member", undefined);
  }

  }

  }

}


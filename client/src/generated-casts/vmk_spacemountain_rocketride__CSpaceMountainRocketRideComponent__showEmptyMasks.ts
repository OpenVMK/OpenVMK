// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideComponent / showEmptyMasks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showEmptyMasks(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  callMethod("GetRoot", tRoomContext)
  var tNode1 = callMethod("Search", tRoomContext, "NAME", "empty_mask");
  if ((lingoTruthy(callNamed("voidp", tNode1)) ? 0 : 1)) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode1)), "visible", 1);
  }

}


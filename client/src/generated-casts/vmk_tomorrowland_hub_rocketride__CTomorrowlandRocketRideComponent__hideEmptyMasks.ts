// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / hideEmptyMasks

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideEmptyMasks(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  callMethod("GetRoot", tRoomContext)
  var tNode1 = callMethod("Search", tRoomContext, "NAME", "empty_mask_1");
  var tNode2 = callMethod("Search", tRoomContext, "NAME", "empty_mask_2");
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", tNode1)) ? 0 : 1), (lingoTruthy(callNamed("voidp", tNode2)) ? 0 : 1))) {
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode1)), "visible", 0);
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode2)), "visible", 0);
  }

}


// vmk_tomorrowland_hub_rocketride.cct / CTomorrowlandRocketRideComponent / hideSittingAvatars

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideSittingAvatars(_me: LingoMe) {
  var t_ar_tiles = new LingoList([]);
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  callMethod("GetRoot", tRoomContext)
  var tNode1 = callMethod("Search", tRoomContext, "NAME", "sit_rocket_1");
  var tNode2 = callMethod("Search", tRoomContext, "NAME", "sit_rocket_2");
  if (callNamed("objectp", tNode1)) {
  callMethod("append", t_ar_tiles, tNode1)
  }

  if (callNamed("objectp", tNode2)) {
  callMethod("append", t_ar_tiles, tNode2)
  }

  var t_ar_foundAvatars = callNamed("GetAvatarsOnTiles", t_ar_tiles);
  return t_ar_foundAvatars;
}


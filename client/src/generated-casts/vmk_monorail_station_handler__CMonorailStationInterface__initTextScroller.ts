// vmk_monorail_station_handler.cct / CMonorailStationInterface / initTextScroller

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function initTextScroller(_me: LingoMe) {
  var tWidth = 100;
  var tHeight = 50;
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var tNode = callMethod("Search", tRoomContext, "NAME", "display");
  if (lingoBinary("neq", tNode, 0)) {
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  tWidth = tSprite.width;
  tHeight = tSprite.height;
  }

  }

  var t_pTextScroller = callNamed("createTextScroller", " ");
  callMethod("SetRenderer", t_pTextScroller, symbol("isometric"))
  callMethod("Init", callMethod("GetRenderer", t_pTextScroller), callMethod("getID", _me), "Digital_font", tWidth, tHeight)
  callMethod("SetOffset", callMethod("GetRenderer", t_pTextScroller), callNamed("point", 5, 8))
  callMethod("start", t_pTextScroller)
  return t_pTextScroller;
}


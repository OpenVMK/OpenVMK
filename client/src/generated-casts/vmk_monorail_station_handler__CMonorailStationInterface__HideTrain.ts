// vmk_monorail_station_handler.cct / CMonorailStationInterface / HideTrain

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HideTrain(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList(["monorail_start", "monorail_mid", "monorail_end"]);
  for (var nodename of t_Nodes.toArray()) {
  var tNode = callMethod("Search", tRoomContext, "SPRITE", nodename);
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode)), "visible", 0);
  }

  callMethod("hideDoors", _me)
  callMethod("hideMasks", _me)
}


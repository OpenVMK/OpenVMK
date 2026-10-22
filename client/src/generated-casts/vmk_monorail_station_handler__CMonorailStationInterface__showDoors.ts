// vmk_monorail_station_handler.cct / CMonorailStationInterface / showDoors

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showDoors(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList(["door_1", "door_2", "door_3"]);
  for (var nodename of t_Nodes.toArray()) {
  var tNode = callMethod("Search", tRoomContext, "NAME", nodename);
  setThePropOf(callMethod("getSprite", callMethod("GetVisual", tNode)), "visible", 1);
  }

}


// vmk_monorail_station_handler.cct / CMonorailStationInterface / showDoorsOpen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function showDoorsOpen(_me: LingoMe) {
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList(["door_1", "door_2", "door_3"]);
  var t_Mems = new LingoList(["single_traindoor_4", "double_traindoors_4", "double_traindoors_4"]);
  var i = 0;
  for (var nodename of t_Nodes.toArray()) {
  i = lingoBinary("add", i, 1);
  var tNode = callMethod("Search", tRoomContext, "NAME", nodename);
  var tSprite = callMethod("getSprite", callMethod("GetVisual", tNode));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "visible", 1);
  var tMem = callNamed("getMember", t_Mems[i]);
  if (lingoBinary("neq", tMem, 0)) {
  setThePropOf(tSprite, "member", tMem);
  setThePropOf(tSprite, "width", tMem.width);
  setThePropOf(tSprite, "height", tMem.height);
  }

  }

  }

}


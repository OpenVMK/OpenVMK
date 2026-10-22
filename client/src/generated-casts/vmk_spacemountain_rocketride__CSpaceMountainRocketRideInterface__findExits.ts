// vmk_spacemountain_rocketride.cct / CSpaceMountainRocketRideInterface / findExits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findExits(_me: LingoMe) {
  setMeProp(_me, "m_ar_rExits", new LingoList([]));
  setMeProp(_me, "m_ar_rTileExits", new LingoList([]));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList(["4", "5", "6", "7", "10", "11", "12", "13"]);
  for (var nodeID of t_Nodes.toArray()) {
  var tNode = callMethod("Search", tRoomContext, "ID", nodeID);
  if (lingoBinary("neq", tNode, 0)) {
  callMethod("append", meProp(_me, "m_ar_rExits"), tNode)
  }

  }

  t_Nodes = new LingoList([]);
  for (var nodeID of t_Nodes.toArray()) {
  tNode = callMethod("Search", tRoomContext, "ID", nodeID);
  if (lingoBinary("neq", tNode, 0)) {
  callMethod("append", meProp(_me, "m_ar_rTileExits"), tNode)
  }

  }

}


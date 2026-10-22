// vmk_castle_spellroom_handler.cct / CVMKCastleSpellroomInterface / findExits

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function findExits(_me: LingoMe) {
  setMeProp(_me, "m_pExits", new LingoList([]));
  setMeProp(_me, "m_pTileExits", new LingoList([]));
  var tRoomContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_Nodes = new LingoList([]);
  for (var nodeID of t_Nodes.toArray()) {
  var tNode = callMethod("Search", tRoomContext, "ID", nodeID);
  if (lingoBinary("neq", tNode, 0)) {
  callMethod("append", meProp(_me, "m_pExits"), tNode)
  }

  }

  t_Nodes = new LingoList(["6"]);
  for (var nodeID of t_Nodes.toArray()) {
  tNode = callMethod("Search", tRoomContext, "ID", nodeID);
  if (lingoBinary("neq", tNode, 0)) {
  callMethod("append", meProp(_me, "m_pTileExits"), tNode)
  }

  }

}


// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoData / parseHelpXML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseHelpXML(_me: LingoMe, xmlData: LingoValue) {
  setMeProp(_me, "m_pRooms", new LingoPropList([]));
  var objects = callMethod("GetRooms", _me);
  if ((lingoTruthy(callNamed("voidp", objects)) ? 0 : 1)) {
  for (var node of objects.child.toArray()) {
  if (lingoBinary("eq", node._type, "ROOM")) {
  var roomdata = new LingoPropList([]);
  for (var roomdataNode of node.child.toArray()) {
  if (lingoBinary("eq", roomdataNode._type, "NAME")) {
  roomdata[symbol("name")] = roomdataNode.value;
  }

  if (lingoBinary("eq", roomdataNode._type, "DESC")) {
  roomdata[symbol("desc")] = roomdataNode.value;
  }

  }

  meProp(_me, "m_pRooms")[callMethod("getaProp", node.param, "TAG")] = roomdata;
  }

  }

  setMeProp(_me, "bParsed", 1);
  } else {
  callNamed("put", "ERROR while parsing Room Info XML data")
  }

}


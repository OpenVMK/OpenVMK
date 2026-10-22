// 6f0542e8885a8074c087cc89ca510672.cct / CTutorialsData / parseHelpXML

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
  if (lingoBinary("eq", node._type, "TUTORIAL")) {
  var roomdata = new LingoPropList([]);
  roomdata[symbol("name")] = callMethod("getaProp", node.param, "NAME");
  roomdata[symbol("Caption")] = callMethod("getaProp", node.param, "CAPTION");
  for (var roomdataNode of node.child.toArray()) {
  if (lingoBinary("eq", roomdataNode._type, "DESC")) {
  roomdata[symbol("desc")] = roomdataNode.value;
  }

  if (lingoBinary("eq", roomdataNode._type, "LINK")) {
  roomdata[symbol("link")] = roomdataNode.value;
  }

  }

  meProp(_me, "m_pRooms")[callMethod("getaProp", node.param, "NAME")] = roomdata;
  setMeProp(_me, "bParsed", 1);
  }

  }

  setMeProp(_me, "bParsed", 1);
  } else {
  callNamed("put", "ERROR while parsing Tutorials XML data")
  }

}


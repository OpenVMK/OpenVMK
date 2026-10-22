// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / SetActiveMickeyList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetActiveMickeyList(_me: LingoMe, tMsg: LingoValue) {
  var tCount = callMethod("GetIntFrom", tMsg.connection);
  var t_arList = new LingoList([]);
  var t_arColors = new LingoList([]);
  for (var i = 1; i <= tCount; ++i) {
  callMethod("append", t_arList, callMethod("GetIntFrom", tMsg.connection))
  callMethod("append", t_arColors, callMethod("GetIntFrom", tMsg.connection))
  }

  callMethod("SetActiveMickeyList", callMethod("getInterface", _me), t_arList, t_arColors)
}


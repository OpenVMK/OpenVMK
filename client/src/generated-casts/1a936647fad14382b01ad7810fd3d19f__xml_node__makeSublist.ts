// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / makeSublist

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function makeSublist(_me: LingoMe) {
  switch (_me._type) {
case symbol("element"):
  var xmlList = new LingoPropList([]);
  callMethod("addProp", xmlList, _me.name, callMethod("toList", _me))
  break;
case symbol("procinst"):
  xmlList = new LingoPropList([]);
  callMethod("addProp", xmlList, "!PROCINST", callMethod("toList", _me))
  break;
case symbol("chardata"):
  xmlList = new LingoPropList([]);
  callMethod("addProp", xmlList, "!CHARDATA", callMethod("toList", _me))
  break;
  }

  return xmlList;
}


// 1a936647fad14382b01ad7810fd3d19f.cct / xml.node / toList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toList(_me: LingoMe) {
  switch (_me._type) {
case symbol("element"):
  var elemList = new LingoPropList([]);
  var attrList = callNamed("duplicate", meProp(_me, "attributeValue"));
  callMethod("addProp", elemList, "!ATTRIBUTES", attrList)
  for (var i of meProp(_me, "child").toArray()) {
  switch (i._type) {
case symbol("element"):
  callMethod("addProp", elemList, i.name, callMethod("toList", i))
  break;
case symbol("chardata"):
  callMethod("addProp", elemList, "!CHARDATA", callMethod("toList", i))
  break;
case symbol("procinst"):
  callMethod("addProp", elemList, "!PROCINST", callMethod("toList", i))
  break;
  }

  }

  return elemList;
case symbol("chardata"):
  return _me.text;
case symbol("procinst"):
  var piList = new LingoPropList([]);
  callMethod("addProp", piList, "NAME", _me.name)
  callMethod("addProp", piList, "TEXT", _me.text)
  return piList;
  }

}


// 1a936647fad14382b01ad7810fd3d19f.cct / xml.parser / stepFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stepFrame(_me: LingoMe) {
  if (callNamed("netDone", _me._netID)) {
  if (lingoBinary("eq", callNamed("netError", _me._netID), "OK")) {
  var xmlDoc = callNamed("netTextResult", _me._netID);
  callMethod("parseString", _me, xmlDoc)
  } else {
  setThePropOf(_me, "_errorStr", lingoBinary("joinPad", "net error:", callNamed("netError", _me._netID)));
  }

  setThePropOf(_me, "_doneParsing", 1);
  if (lingoBinary("neq", callNamed("ilk", _me._cbMethod), symbol("void"))) {
  if (lingoBinary("eq", callNamed("ilk", _me._cbObject), symbol("void"))) {
  callNamed("do", lingoBinary("joinPad", _me._cbMethod, "me"))
  } else {
  callNamed("call", _me._cbMethod, _me._cbObject, _me)
  }

  }

  }

}


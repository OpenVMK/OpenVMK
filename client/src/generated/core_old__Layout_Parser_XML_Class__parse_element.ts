// core.old.cct / Layout Parser XML Class / parse_element

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parse_element(_me: LingoMe, tFieldName: LingoValue) {
  var tProps = new LingoPropList([]);
  var tdata = callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), tFieldName)).text;
  for (var f = 1; f <= tdata.line.count; ++f) {
  var tLine = tdata.line[f];
  if (lingoBinary("neq", tLine.char[1], "#")) {
  if (lingoBinary("gt", callNamed("length", tLine), 1)) {
  var tvalue = callNamed("value", tLine);
  callMethod("addProp", tProps, tvalue[symbol("state")], tvalue)
  }

  }

  }

  return tProps;
}


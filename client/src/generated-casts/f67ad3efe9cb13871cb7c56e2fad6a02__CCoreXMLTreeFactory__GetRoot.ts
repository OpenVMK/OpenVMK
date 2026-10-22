// f67ad3efe9cb13871cb7c56e2fad6a02.cct / CCoreXMLTreeFactory / GetRoot

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetRoot(_me: LingoMe, _this: LingoValue) {
  var t_rRoot = callMethod("GetNode", _this);
  if (lingoBinary("eq", t_rRoot.child.count, 1)) {
  return t_rRoot.child[1];
  } else {
  return t_rRoot;
  }

}


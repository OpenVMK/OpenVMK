// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Binary Manager Class / thumbnailDataStored

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function thumbnailDataStored(_me: LingoMe, tMsg: LingoValue) {
  var tTask = meProp(_me, "pQueue")[1];
  if (lingoBinary("neq", tTask[symbol("callback")], undefined)) {
  var tObject = callNamed("getObject", tTask[symbol("callback")]);
  if (lingoBinary("eq", callNamed("ilk", tObject), symbol("instance"))) {
  callNamed("call", symbol("thumbnailDataStored"), tObject, callMethod("getaProp", tMsg, symbol("content")))
  }

  }

  callMethod("deleteAt", meProp(_me, "pQueue"), 1)
  callMethod("next", _me)
}


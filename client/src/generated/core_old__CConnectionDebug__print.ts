// core.old.cct / CConnectionDebug / print

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function print(_me: LingoMe) {
  var tStr = "";
  if (callNamed("symbolp", callMethod("getID", _me))) {
  tStr = tStr + "#";
  }

  tStr = tStr + lingoBinary("join", callMethod("getID", _me), "\r");
  tStr = tStr + lingoBinary("join", "-- -- -- -- -- -- -- --", "\r");
  var tMsgsList = callMethod("getaProp", meProp(_me, "pListenersPntr"), symbol("value"));
  if (callNamed("listp", tMsgsList)) {
  for (var i = 1; i <= callNamed("count", tMsgsList); ++i) {
  tStr = tStr + lingoBinary("join", lingoBinary("join", "\t", callMethod("getPropAt", tMsgsList, i)), "\r");
  var tCallbackList = tMsgsList[i];
  for (var tCallback of tCallbackList.toArray()) {
  tStr = tStr + lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", lingoBinary("join", "\t", "\t"), tCallback[1]), "->"), tCallback[2]), "\r");
  }

  tStr = tStr + "\r";
  }

  }

  callNamed("put", lingoBinary("join", tStr, "\r"))
  return 1;
}


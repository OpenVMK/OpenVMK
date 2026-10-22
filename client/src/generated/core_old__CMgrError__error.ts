// core.old.cct / CMgrError / error

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function error(_me: LingoMe, tObject: LingoValue, tMsg: LingoValue, tMethod: LingoValue) {
  if (callNamed("objectp", tObject)) {
  tObject = callNamed("string", tObject);
  tObject = tObject.word.range(2, lingoBinary("sub", tObject.word.count, 2));
  tObject = tObject.char.range(2, callNamed("length", tObject));
  } else {
  tObject = "Unknown";
  }

  if (!lingoTruthy(callNamed("stringp", tMsg))) {
  tMsg = "Unknown";
  }

  if (!lingoTruthy(callNamed("symbolp", tMethod))) {
  tMethod = "Unknown";
  }

  var tError = "\r";
  tError = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tError, "\t"), "Time:   "), theProperty("long time")), "\r");
  tError = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tError, "\t"), "Method: "), tMethod), "\r");
  tError = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tError, "\t"), "Object: "), tObject), "\r");
  tError = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tError, "\t"), "Message:"), tMsg.line[1]), "\r");
  if (lingoBinary("gt", tMsg.line.count, 1)) {
  for (var i = 2; i <= tMsg.line.count; ++i) {
  tError = lingoBinary("join", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("join", tError, "\t"), "        "), tMsg.line[i]), "\r");
  }

  }

  setMeProp(_me, "pErrorCache", lingoBinary("join", meProp(_me, "pErrorCache"), tError));
  if (lingoBinary("gt", meProp(_me, "pErrorCache").line.count, meProp(_me, "pCacheSize"))) {
  setMeProp(_me, "pErrorCache", meProp(_me, "pErrorCache").line.range(lingoBinary("sub", meProp(_me, "pErrorCache").line.count, meProp(_me, "pCacheSize")), meProp(_me, "pErrorCache").line.count));
  }

  switch (meProp(_me, "pDebugLevel")) {
case 1:
  callNamed("put", lingoBinary("join", "Error:", tError))
  break;
case 2:
  callNamed("put", lingoBinary("join", "Error:", tError))
  break;
  default:
  callNamed("put", lingoBinary("join", "Error:", tError))
  }

  return 0;
}


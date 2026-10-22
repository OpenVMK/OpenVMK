// framework.dcr /  / prepareFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepareFrame(_me: LingoMe, objectp: LingoValue) {
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, callMethod("deleteOne", objectp, symbol("symbolp")))) {
  var _ReceiveCredits = callNamed("prepare", objectp.symbolp, safe_add);
  if (callNamed("handler", _ReceiveCredits)) {
  _ReceiveCredits = lingoBinary("join", "#", _ReceiveCredits);
  }

  callNamed("point", lingoBinary("join", lingoBinary("join", _ReceiveCredits, ":"), callMethod("rstr_md5", objectp.symbolp, safe_add)))
  safe_add = lingoBinary("add", safe_add, 1);
  }

  callNamed("session", 1)
}


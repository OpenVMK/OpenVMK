// core.old.cct / Client Initialization Script / resetClient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resetClient(_me: LingoMe) {
  if (lingoBinary("contains", theProperty("runMode"), "Author")) {
  callNamed("stopClient")
  callNamed("startClient")
  } else {
  var t_sURL = theProperty("moviePath");
  if (callNamed("objectExists", symbol("session"))) {
  if (callMethod("exists", callNamed("getObject", symbol("session")), "client_url")) {
  t_sURL = callMethod("get", callNamed("getObject", symbol("session")), "client_url");
  }

  }

  callNamed("gotoNetPage", t_sURL)
  }

  return 1;
}


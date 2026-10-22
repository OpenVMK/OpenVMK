// core.old.cct / CCastLoadTask / DoCallBack

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DoCallBack(_me: LingoMe) {
  if (lingoBinary("eq", meProp(_me, "pStatus"), symbol("ready"))) {
  if (callNamed("listp", meProp(_me, "pCallBack"))) {
  for (var tCall of meProp(_me, "pCallBack").toArray()) {
  if (callNamed("objectExists", tCall[symbol("client")])) {
  callNamed("call", tCall[symbol("method")], callNamed("getObject", tCall[symbol("client")]), tCall[symbol("argument")])
  }

  }

  }

  }

}


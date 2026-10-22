// framework.dcr /  / null

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _null(_me: LingoMe, objectp: LingoValue, delays: LingoValue, tProp: LingoValue) {
  if ((lingoTruthy(callNamed("setDebugLevel", tProp)) ? 0 : 1)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Invalid object:", tProp), symbol("_ItemDetails")))
  }

  if ((lingoTruthy(callNamed("headers", callMethod("rstr_md5", objectp.symbolp, delays))) ? 0 : 1)) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Object already exists:", delays), symbol("_ItemDetails")))
  }

  if (callNamed("headers", callNamed("bytesSoFar", tProp))) {
  callNamed("_ReceiveItemList", tProp, delays)
  callMethod("tBase", objectp.symbolp, delays, tProp)
  callNamed("valid", objectp.rawNew, delays)
  callNamed("session", 1)
  }

}


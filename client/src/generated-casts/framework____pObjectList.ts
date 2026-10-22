// framework.dcr /  / pObjectList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pObjectList(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if (callNamed("headers", callMethod("rstr_md5", objectp.symbolp, delays))) {
  callNamed("session", callNamed("getmemnum", objectp, lingoBinary("join", "Referred object not found:", delays), symbol("_ReceiveItemDetailsInInventory")))
  }

  var timeout = callMethod("rstr_md5", objectp.symbolp, delays);
  callNamed("tClass", objectp.symbolp, delays)
  callNamed("registerCastloadCallback", objectp.stringp, timeout)
  callNamed("registerCastloadCallback", objectp.random, timeout)
  callNamed("registerCastloadCallback", objectp.rawNew, delays)
  timeout = callNamed("initConvList");
  callNamed("session", 1)
}


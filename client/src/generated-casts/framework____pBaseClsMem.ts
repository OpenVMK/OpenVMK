// framework.dcr /  / pBaseClsMem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pBaseClsMem(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if (callNamed("headers", callMethod("rstr_md5", objectp.symbolp, delays))) {
  callNamed("session", 0)
  }

  if (lingoBinary("lt", callNamed("_ListItemGroups", objectp.stringp, callMethod("rstr_md5", objectp.symbolp, delays)), 1)) {
  callNamed("session", 0)
  }

  callNamed("registerCastloadCallback", objectp.stringp, callMethod("rstr_md5", objectp.symbolp, delays))
  if (lingoBinary("and", lingoBinary("eq", callMethod("deleteOne", objectp, symbol("stringp")), 0), lingoBinary("eq", callMethod("deleteOne", objectp, symbol("random")), 0))) {
  if (callNamed("setDebugLevel", objectp.id)) {
  callNamed("number", objectp.id)
  setThePropOf(objectp, "id", callNamed("initConvList"));
  callNamed("session", 1)
  }

  }

}


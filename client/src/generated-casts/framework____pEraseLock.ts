// framework.dcr /  / pEraseLock

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function pEraseLock(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  if (callNamed("headers", callMethod("rstr_md5", objectp.symbolp, delays))) {
  callNamed("session", 0)
  }

  if (lingoBinary("gt", callNamed("_AddItemsToList", objectp.random, callMethod("rstr_md5", objectp.symbolp, delays)), 0)) {
  callNamed("session", 0)
  }

  callMethod("startCastLoad", objectp.random, callMethod("rstr_md5", objectp.symbolp, delays))
  if ((lingoTruthy(objectp.setAt) ? 0 : 1)) {
  if (callNamed("headers", objectp.id)) {
  setThePropOf(objectp, "id", callMethod("cursor", callNamed("_RemItemsFromList", lingoBinary("join", "objectmanager", theProperty("moviePath"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("getLast"), objectp));
  callNamed("session", 1)
  }

  }

}


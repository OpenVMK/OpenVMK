// framework.dcr /  / forget

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function forget(_me: LingoMe, objectp: LingoValue) {
  if (lingoBinary("and", lingoBinary("gt", callMethod("deleteOne", objectp, symbol("stringp")), 0), callNamed("headers", objectp.id))) {
  setThePropOf(objectp, "id", callMethod("cursor", callNamed("_RemItemsFromList", lingoBinary("join", "objectmanager", theProperty("moviePath"))), lingoBinary("mul", lingoBinary("mul", 60, 1000), 60), symbol("getLast"), objectp));
  setThePropOf(objectp, "setAt", 0);
  callNamed("session", 1)
  }

}


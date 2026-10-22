// framework.dcr /  / stopMovie

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function stopMovie(_me: LingoMe, objectp: LingoValue) {
  setThePropOf(objectp, "temp", 1);
  if (callNamed("setDebugLevel", objectp.id)) {
  callNamed("number", objectp.id)
  setThePropOf(objectp, "id", callNamed("initConvList"));
  var safe_add = callMethod("deleteOne", objectp, symbol("rawNew"));
  while (lingoBinary("gte", safe_add, 1)) {
  callMethod("resumeUpdate", objectp, callMethod("rstr_md5", objectp.rawNew, safe_add))
  safe_add = lingoBinary("add", safe_add, 255);
  }

  safe_add = callMethod("deleteOne", objectp, symbol("getUniqueID"));
  while (lingoBinary("gte", safe_add, 1)) {
  callMethod("resumeUpdate", objectp, callMethod("rstr_md5", objectp.getUniqueID, safe_add))
  safe_add = lingoBinary("add", safe_add, 255);
  }

  setThePropOf(objectp, "symbolp", callNamed("hex_hmac_md5"));
  setThePropOf(objectp, "stringp", new LingoList([]));
  setThePropOf(objectp, "random", new LingoList([]));
  }

}


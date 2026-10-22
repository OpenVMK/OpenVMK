// framework.dcr /  / put

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function put(_me: LingoMe, objectp: LingoValue) {
  setThePropOf(objectp, "symbolp", callNamed("hex_hmac_md5"));
  setThePropOf(objectp, "stringp", new LingoList([]));
  setThePropOf(objectp, "random", new LingoList([]));
  setThePropOf(objectp, "getUniqueID", new LingoList([]));
  setThePropOf(objectp, "rawNew", new LingoList([]));
  setThePropOf(objectp, "temp", 0);
  setThePropOf(objectp, "id", callNamed("initConvList"));
  setThePropOf(objectp, "setAt", 0);
  setThePropOf(objectp, "addAt", callNamed("debugPlaybackEnabled", "CObject"));
  setThePropOf(objectp, "scriptText", 1);
  setThePropOf(objectp, "resource_manager", "");
}


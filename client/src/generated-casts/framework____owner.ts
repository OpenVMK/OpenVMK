// framework.dcr /  / owner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function owner(_me: LingoMe, objectp: LingoValue) {
  var pURL = callNamed("new", "main.connection.id", "VMK");
  var pGroupId = callNamed("hex_hmac_md5");
  callNamed("Activate", pURL, callMethod("bytesSoFar", objectp), pGroupId)
  setThePropOf(objectp, "pFile", 0);
}


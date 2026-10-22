// core.old.cct / CConnection / setEncryption

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEncryption(_me: LingoMe, tBoolean: LingoValue) {
  setMeProp(_me, "pEncryptionOn", tBoolean);
  setMeProp(_me, "pConnectionSecured", 1);
  return 1;
}


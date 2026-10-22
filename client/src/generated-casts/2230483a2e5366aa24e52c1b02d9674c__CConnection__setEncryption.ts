// 2230483a2e5366aa24e52c1b02d9674c.cct / CConnection / setEncryption

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEncryption(_me: LingoMe, tBoolean: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  setThePropOf(_me, "pEncryptionOn", tBoolean);
  setThePropOf(_me, "pConnectionSecured", 1);
  return 1;
}


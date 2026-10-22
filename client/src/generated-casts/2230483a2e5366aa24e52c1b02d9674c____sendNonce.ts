// 2230483a2e5366aa24e52c1b02d9674c.cct /  / sendNonce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sendNonce(_me: LingoMe, i_iLength: LingoValue) {
  /* global */ var pChars = globalVar("pChars");
  /* global */ var pCharsI = globalVar("pCharsI");
  /* global */ var pFirst = globalVar("pFirst");
  var tMsg = "";
  for (var i = 1; i <= i_iLength; ++i) {
  var t_sRandom = callNamed("numToChar", callNamed("random", 255));
  tMsg = lingoBinary("join", tMsg, t_sRandom);
  }

  if (lingoBinary("and", callNamed("objectp", _me.pDecoder), _me.pEncryptionOn)) {
  var tEncMsg = callNamed("Encipher", _me.pDecoder, tMsg);
  } else {
  tEncMsg = lingoBinary("join", tMsg, tMsg);
  }

  callNamed("sendNetMessage", _me.pXtra, 0, 0, tEncMsg)
  return 1;
}


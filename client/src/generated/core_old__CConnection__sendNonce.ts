// core.old.cct / CConnection / sendNonce

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sendNonce(_me: LingoMe, i_iLength: LingoValue) {
  var tMsg = "";
  for (var i = 1; i <= i_iLength; ++i) {
  var t_sRandom = callNamed("numToChar", callNamed("random", 255));
  tMsg = lingoBinary("join", tMsg, t_sRandom);
  }

  if (lingoBinary("and", meProp(_me, "pEncryptionOn"), callNamed("objectp", meProp(_me, "pDecoder")))) {
  var tEncMsg = callMethod("Encipher", meProp(_me, "pDecoder"), tMsg);
  } else {
  tEncMsg = lingoBinary("join", tMsg, tMsg);
  }

  callMethod("sendNetMessage", meProp(_me, "pXtra"), 0, 0, tEncMsg)
  return 1;
}


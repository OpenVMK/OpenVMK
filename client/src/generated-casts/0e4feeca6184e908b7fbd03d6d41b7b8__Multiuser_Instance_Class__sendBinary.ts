// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / sendBinary

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function sendBinary(_me: LingoMe, tObject: LingoValue) {
  if (lingoBinary("and", meProp(_me, "pConnectionOk"), callNamed("objectp", meProp(_me, "pXtra")))) {
  return callMethod("sendNetMessage", meProp(_me, "pXtra"), "*", "SAVE_PICTURE", tObject);
  }

}


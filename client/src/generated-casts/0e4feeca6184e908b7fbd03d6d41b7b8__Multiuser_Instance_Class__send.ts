// 0e4feeca6184e908b7fbd03d6d41b7b8.cct / Multiuser Instance Class / send

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function send(_me: LingoMe, tMsg: LingoValue) {
  if (lingoBinary("and", meProp(_me, "pConnectionOk"), callNamed("objectp", meProp(_me, "pXtra")))) {
  if (lingoBinary("gt", meProp(_me, "pLogMode"), 0)) {
  callMethod("log", _me, lingoBinary("joinPad", "<--", tMsg))
  }

  var tLength = callNamed("string", tMsg.length);
  while (lingoBinary("lt", tLength.length, 4)) {
  tLength = lingoBinary("join", tLength, callNamed("space"));
  }

  callMethod("sendNetMessage", meProp(_me, "pXtra"), "*", tMsg.word[1], tMsg.word.range(2, tMsg.word.count))
  } else {
  return callNamed("error", _me, lingoBinary("joinPad", "Connection not ready:", callMethod("getID", _me)), symbol("send"));
  }

  return 1;
}


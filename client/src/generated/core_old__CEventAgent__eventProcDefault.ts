// core.old.cct / CEventAgent / eventProcDefault

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcDefault(_me: LingoMe, _this: LingoValue, tEvent: LingoValue, tSprID: LingoValue, tParam: LingoValue) {
  var tTarget = meProp(_me, "pEventList")[tEvent];
  if (callNamed("voidp", tTarget)) {
  return callMethod("removeProcedure", meProp(_me, "pSprite"), tEvent);
  }

  return callNamed("call", tTarget[2], tTarget[1]);
}


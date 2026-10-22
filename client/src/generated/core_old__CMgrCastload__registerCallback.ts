// core.old.cct / CMgrCastload / registerCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerCallback(_me: LingoMe, _this: LingoValue, tID: LingoValue, tMethod: LingoValue, tClientID: LingoValue, tArgument: LingoValue) {
  if (callNamed("voidp", callMethod("findPos", meProp(_me, "pTaskList"), tID))) {
  return 0;
  } else {
  return callNamed("call", symbol("addCallBack"), meProp(_me, "pTaskList")[tID], tID, tMethod, tClientID, tArgument);
  }

}


// 42c66f7b170484e24189f467fe87b08d.cct / Sound Instance Class / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tMemName: LingoValue, tPriority: LingoValue, tProps: LingoValue) {
  setMeProp(_me, "pMemName", tMemName);
  setMeProp(_me, "pMember", callNamed("member", callNamed("getmemnum", tMemName)));
  if (lingoBinary("neq", meProp(_me, "pMember")._type, symbol("sound"))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Sound member not found or not a sound:", tMemName), symbol("Define"));
  }

  var pPriority = tPriority;
  setMeProp(_me, "pProps", tProps);
  return 1;
}


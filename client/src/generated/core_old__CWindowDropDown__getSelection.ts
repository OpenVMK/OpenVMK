// core.old.cct / CWindowDropDown / getSelection

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getSelection(_me: LingoMe, tReturnType: LingoValue) {
  if (lingoBinary("eq", tReturnType, symbol("text"))) {
  return meProp(_me, "pTextlist")[meProp(_me, "pSelectedItemNum")];
  } else {
  if (lingoBinary("eq", tReturnType, symbol("key"))) {
  return meProp(_me, "pTextKeys")[meProp(_me, "pSelectedItemNum")];
  }

  }

  return meProp(_me, "pTextKeys")[meProp(_me, "pSelectedItemNum")];
}


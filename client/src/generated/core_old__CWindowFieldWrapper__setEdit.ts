// core.old.cct / CWindowFieldWrapper / setEdit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEdit(_me: LingoMe, tBool: LingoValue) {
  if (lingoBinary("and", lingoBinary("neq", tBool, 1), lingoBinary("neq", tBool, 0))) {
  return 0;
  }

  setThePropOf(meProp(_me, "pMember"), "editable", tBool);
  setThePropOf(_me.pSprite, "editable", tBool);
  return 1;
}


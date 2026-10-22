// core.old.cct / CWindowCommonButton / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe) {
  if (lingoBinary("or", lingoBinary("lt", meProp(_me, "pBlend"), 100), lingoBinary("lt", _me.pSprite.blend, 100))) {
  return 0;
  }

  if (lingoBinary("eq", meProp(_me, "pClickPass"), 0)) {
  return 0;
  }

  setMeProp(_me, "pClickPass", 0);
  callMethod("changeState", _me, symbol("up"))
  return 1;
}


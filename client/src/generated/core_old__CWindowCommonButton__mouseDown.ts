// core.old.cct / CWindowCommonButton / mouseDown

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseDown(_me: LingoMe) {
  if (lingoBinary("or", lingoBinary("lt", meProp(_me, "pBlend"), 100), lingoBinary("lt", _me.pSprite.blend, 100))) {
  return 0;
  }

  setMeProp(_me, "pClickPass", 1);
  callMethod("changeState", _me, symbol("down"))
  return 1;
}


// core.old.cct / CWindowScrollbarBACKUP / mouseUp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function mouseUp(_me: LingoMe) {
  callMethod("initEventAgent", _me, 0)
  if (lingoBinary("lt", _me.pSprite.blend, 100)) {
  return 0;
  }

  if (lingoBinary("eq", meProp(_me, "pClickPass"), 0)) {
  return 0;
  }

  setMeProp(_me, "pClickPass", 0);
  callMethod("ScrollBarMouseEvent", _me, symbol("up"))
  setMeProp(_me, "pState", symbol("waitMouseEvent"));
  callMethod("ButtonsStates", _me)
  callMethod("render", _me)
  return 1;
}


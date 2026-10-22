// core.old.cct / CWindowScrollbarBACKUP / buttonOfClickArea

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function buttonOfClickArea(_me: LingoMe, tpoint: LingoValue) {
  tpoint = lingoBinary("sub", tpoint, callNamed("point", _me.pSprite.left, _me.pSprite.top));
  for (var r = 1; r <= callMethod("count", meProp(_me, "pRects")); ++r) {
  if (callMethod("inside", tpoint, meProp(_me, "pRects")[r])) {
  return callMethod("getPropAt", meProp(_me, "pRects"), r);
  break;
  }

  }

}


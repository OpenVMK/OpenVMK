// core.old.cct / CWindow / ResizeBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeBy(_me: LingoMe, _this: LingoValue, a_iOffX: LingoValue, a_iOffY: LingoValue) {
  if (lingoBinary("or", lingoBinary("neq", a_iOffX, 0), lingoBinary("neq", a_iOffY, 0))) {
  setMeProp(_me, "pwidth", lingoBinary("add", meProp(_me, "pwidth"), a_iOffX));
  setMeProp(_me, "pheight", lingoBinary("add", meProp(_me, "pheight"), a_iOffY));
  callNamed("call", symbol("ResizeBy"), meProp(_me, "pElemList"), a_iOffX, a_iOffY)
  }

}


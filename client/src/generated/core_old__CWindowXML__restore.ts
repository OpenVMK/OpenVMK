// core.old.cct / CWindowXML / restore

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function restore(_me: LingoMe, _this: LingoValue, a_rcRect: LingoValue) {
  var t_rcOld = callNamed("rect", 0, 0, meProp(_me, "pwidth"), meProp(_me, "pheight"));
  callNamed("call", symbol("show"), meProp(_me, "pElemList"))
  callMethod("ResizeTo", _this, a_rcRect.width, a_rcRect.height)
  return t_rcOld;
}


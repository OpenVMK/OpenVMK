// core.old.cct / CWindowXML / ResizeTo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeTo(_me: LingoMe, _this: LingoValue, a_iX: LingoValue, a_iY: LingoValue) {
  var t_iOffW = lingoBinary("sub", a_iX, meProp(_me, "pwidth"));
  var t_iOffH = lingoBinary("sub", a_iY, meProp(_me, "pheight"));
  callMethod("ResizeBy", _this, t_iOffW, t_iOffH)
}


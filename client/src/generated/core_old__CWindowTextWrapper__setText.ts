// core.old.cct / CWindowTextWrapper / setText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setText(_me: LingoMe, _this: LingoValue, a_sText: LingoValue) {
  a_sText = callNamed("string", a_sText);
  meProp(_me, "pFontData")[symbol("text")] = a_sText;
  var tRect = callNamed("rect", _this.pOwnX, _this.pOwnY, lingoBinary("add", _this.pOwnX, _this.pOwnW), lingoBinary("add", _this.pOwnY, _this.pOwnH));
  callMethod("fill", _this.pBuffer.image, tRect, callNamed("rgb", 255, 255, 255))
  callMethod("createImgFromTxt", _this)
  callMethod("render", _this)
  callMethod("registerScroll", _this)
  return 1;
}


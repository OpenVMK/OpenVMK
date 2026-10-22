// core.old.cct / CWindowTextWrapper / setFont

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFont(_me: LingoMe, _this: LingoValue, tStruct: LingoValue) {
  setThePropOf(meProp(_me, "pFontData"), "font", callMethod("getaProp", tStruct, symbol("font")));
  setThePropOf(meProp(_me, "pFontData"), "fontStyle", callMethod("getaProp", tStruct, symbol("fontStyle")));
  setThePropOf(meProp(_me, "pFontData"), "fontSize", callMethod("getaProp", tStruct, symbol("fontSize")));
  setThePropOf(meProp(_me, "pFontData"), "color", callMethod("getaProp", tStruct, symbol("color")));
  setThePropOf(meProp(_me, "pFontData"), "fixedLineSpace", callMethod("getaProp", tStruct, symbol("lineHeight")));
  var tRect = callNamed("rect", _this.pOwnX, _this.pOwnY, lingoBinary("add", _this.pOwnX, _this.pOwnW), lingoBinary("add", _this.pOwnY, _this.pOwnH));
  callMethod("fill", _this.pBuffer.image, tRect, callNamed("rgb", 255, 255, 255))
  callMethod("createImgFromTxt", _this)
  callMethod("render", _this)
  callMethod("registerScroll", _this)
  return 1;
}


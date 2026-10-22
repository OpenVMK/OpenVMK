// core.old.cct / CWindowTextWrapper / getFont

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFont(_me: LingoMe, _this: LingoValue) {
  var tStruct = callNamed("getStructVariable", "struct.font.empty");
  callMethod("setaProp", tStruct, symbol("font"), meProp(_me, "pFontData").font)
  callMethod("setaProp", tStruct, symbol("fontStyle"), meProp(_me, "pFontData").fontStyle)
  callMethod("setaProp", tStruct, symbol("fontSize"), meProp(_me, "pFontData").fontSize)
  callMethod("setaProp", tStruct, symbol("color"), meProp(_me, "pFontData").color)
  callMethod("setaProp", tStruct, symbol("lineHeight"), meProp(_me, "pFontData").fixedLineSpace)
  return tStruct;
}


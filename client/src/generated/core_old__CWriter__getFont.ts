// core.old.cct / CWriter / getFont

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getFont(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_rFntStru"))) {
  setMeProp(_me, "m_rFntStru", callNamed("getStructVariable", "struct.font.empty"));
  }

  callMethod("setaProp", meProp(_me, "m_rFntStru"), symbol("font"), meProp(_me, "m_rMember").font)
  callMethod("setaProp", meProp(_me, "m_rFntStru"), symbol("fontStyle"), meProp(_me, "m_rMember").fontStyle)
  callMethod("setaProp", meProp(_me, "m_rFntStru"), symbol("fontSize"), meProp(_me, "m_rMember").fontSize)
  callMethod("setaProp", meProp(_me, "m_rFntStru"), symbol("color"), meProp(_me, "m_rMember").color)
  callMethod("setaProp", meProp(_me, "m_rFntStru"), symbol("lineHeight"), lingoBinary("add", meProp(_me, "m_rMember").fontSize, meProp(_me, "m_rMember").topSpacing))
  return meProp(_me, "m_rFntStru");
}


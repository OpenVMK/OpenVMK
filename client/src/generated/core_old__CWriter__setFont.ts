// core.old.cct / CWriter / setFont

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFont(_me: LingoMe, _this: LingoValue, a_rStruct: LingoValue) {
  if (lingoBinary("neq", callNamed("ilk", a_rStruct), symbol("struct"))) {
  return callNamed("error", _this, "Font struct expected!", symbol("setFont"));
  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").font, callMethod("getaProp", a_rStruct, symbol("font")))) {
  setThePropOf(meProp(_me, "m_rMember"), "font", callMethod("getaProp", a_rStruct, symbol("font")));
  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").fontSize, callMethod("getaProp", a_rStruct, symbol("fontSize")))) {
  setThePropOf(meProp(_me, "m_rMember"), "fontSize", callMethod("getaProp", a_rStruct, symbol("fontSize")));
  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").fontStyle, callMethod("getaProp", a_rStruct, symbol("fontStyle")))) {
  setThePropOf(meProp(_me, "m_rMember"), "fontStyle", callMethod("getaProp", a_rStruct, symbol("fontStyle")));
  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").color, callMethod("getaProp", a_rStruct, symbol("color")))) {
  setThePropOf(meProp(_me, "m_rMember"), "color", callMethod("getaProp", a_rStruct, symbol("color")));
  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").fixedLineSpace, meProp(_me, "m_rMember").fontSize)) {
  setThePropOf(meProp(_me, "m_rMember"), "fixedLineSpace", meProp(_me, "m_rMember").fontSize);
  }

  var t_iLineHeight = lingoBinary("add", meProp(_me, "m_rMember").fontSize, meProp(_me, "m_rMember").topSpacing);
  if (lingoBinary("neq", t_iLineHeight, callMethod("getaProp", a_rStruct, symbol("lineHeight")))) {
  setThePropOf(meProp(_me, "m_rMember"), "topSpacing", lingoBinary("sub", callMethod("getaProp", a_rStruct, symbol("lineHeight")), meProp(_me, "m_rMember").fontSize));
  }

  return 1;
}


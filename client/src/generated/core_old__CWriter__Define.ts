// core.old.cct / CWriter / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, a_rMetrics: LingoValue) {
  if (!lingoTruthy(callNamed("ilk", a_rMetrics, symbol("propList")))) {
  return 0;
  }

  if (callNamed("stringp", a_rMetrics[symbol("font")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").font, a_rMetrics.font)) {
  setThePropOf(meProp(_me, "m_rMember"), "font", a_rMetrics.font);
  }

  }

  if (callNamed("listp", a_rMetrics[symbol("fontStyle")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").fontStyle, a_rMetrics.fontStyle)) {
  setThePropOf(meProp(_me, "m_rMember"), "fontStyle", a_rMetrics.fontStyle);
  }

  }

  if (callNamed("symbolp", a_rMetrics[symbol("alignment")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").alignment, a_rMetrics.alignment)) {
  setThePropOf(meProp(_me, "m_rMember"), "alignment", a_rMetrics.alignment);
  }

  }

  if (callNamed("ilk", a_rMetrics[symbol("color")], symbol("color"))) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").color, a_rMetrics.color)) {
  setThePropOf(meProp(_me, "m_rMember"), "color", a_rMetrics.color);
  }

  }

  if (callNamed("ilk", a_rMetrics[symbol("bgColor")], symbol("color"))) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").bgColor, a_rMetrics.bgColor)) {
  setThePropOf(meProp(_me, "m_rMember"), "bgColor", a_rMetrics.bgColor);
  }

  }

  if (callNamed("integerp", a_rMetrics[symbol("wordWrap")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").wordWrap, a_rMetrics.wordWrap)) {
  setThePropOf(meProp(_me, "m_rMember"), "wordWrap", a_rMetrics.wordWrap);
  }

  }

  if (callNamed("integerp", a_rMetrics[symbol("antialias")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").antialias, a_rMetrics.antialias)) {
  setThePropOf(meProp(_me, "m_rMember"), "antialias", a_rMetrics.antialias);
  }

  }

  if (callNamed("integerp", a_rMetrics[symbol("fontSize")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").fontSize, a_rMetrics.fontSize)) {
  setThePropOf(meProp(_me, "m_rMember"), "fontSize", a_rMetrics.fontSize);
  }

  }

  if (callNamed("integerp", a_rMetrics[symbol("boxType")])) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").boxType, a_rMetrics.boxType)) {
  setThePropOf(meProp(_me, "m_rMember"), "boxType", a_rMetrics.boxType);
  }

  }

  if (callNamed("ilk", a_rMetrics[symbol("rect")], symbol("rect"))) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").width, a_rMetrics.rect.width)) {
  setThePropOf(meProp(_me, "m_rMember"), "rect", a_rMetrics.rect);
  }

  }

  if (lingoBinary("neq", meProp(_me, "m_rMember").fixedLineSpace, meProp(_me, "m_rMember").fontSize)) {
  setThePropOf(meProp(_me, "m_rMember"), "fixedLineSpace", meProp(_me, "m_rMember").fontSize);
  }

  if (callNamed("integerp", a_rMetrics[symbol("fixedLineSpace")])) {
  var t_iTopSpacing = lingoBinary("sub", a_rMetrics.fixedLineSpace, meProp(_me, "m_rMember").fontSize);
  if (lingoBinary("neq", meProp(_me, "m_rMember").topSpacing, t_iTopSpacing)) {
  setThePropOf(meProp(_me, "m_rMember"), "topSpacing", t_iTopSpacing);
  }

  }

  setMeProp(_me, "m_rTxtRect", a_rMetrics[symbol("rect")]);
  return 1;
}


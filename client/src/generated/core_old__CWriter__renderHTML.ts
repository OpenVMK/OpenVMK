// core.old.cct / CWriter / renderHTML

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function renderHTML(_me: LingoMe, _this: LingoValue, a_sHtml: LingoValue, a_rRect: LingoValue) {
  var t_rFont = callMethod("getFont", _this);
  setThePropOf(meProp(_me, "m_rMember"), "html", a_sHtml);
  if (lingoBinary("eq", callNamed("ilk", a_rRect), symbol("rect"))) {
  if (lingoBinary("neq", meProp(_me, "m_rMember").width, a_rRect.width)) {
  setThePropOf(meProp(_me, "m_rMember"), "rect", a_rRect);
  }

  } else {
  if (callNamed("voidp", meProp(_me, "m_rTxtRect"))) {
  var t_iAlignment = meProp(_me, "m_rMember").alignment;
  setThePropOf(meProp(_me, "m_rMember"), "alignment", symbol("left"));
  setThePropOf(meProp(_me, "m_rMember"), "rect", meProp(_me, "m_rDefRect"));
  var t_iTotal = callNamed("length", chunkOf(meProp(_me, "m_rMember").text, "line", 1, 0));
  var t_iWidth = callMethod("charPosToLoc", meProp(_me, "m_rMember"), t_iTotal).locH;
  var t_iLineCount = meProp(_me, "m_rMember").text.line.count;
  if (lingoBinary("gt", t_iLineCount, 1)) {
  for (var i = 2; i <= t_iLineCount; ++i) {
  t_iTotal = lingoBinary("add", lingoBinary("add", t_iTotal, callNamed("length", chunkOf(meProp(_me, "m_rMember").text, "line", i, 0))), 1);
  var t_iNext = callMethod("charPosToLoc", meProp(_me, "m_rMember"), t_iTotal).locH;
  if (lingoBinary("gt", t_iNext, t_iWidth)) {
  t_iWidth = t_iNext;
  }

  }

  }

  t_iWidth = lingoBinary("add", t_iWidth, meProp(_me, "m_rMember").fontSize);
  setThePropOf(meProp(_me, "m_rMember"), "rect", callNamed("rect", 0, 0, t_iWidth, meProp(_me, "m_rMember").height));
  setThePropOf(meProp(_me, "m_rMember"), "alignment", t_iAlignment);
  } else {
  if (lingoBinary("neq", meProp(_me, "m_rMember").width, meProp(_me, "m_rTxtRect").width)) {
  setThePropOf(meProp(_me, "m_rMember"), "rect", meProp(_me, "m_rTxtRect"));
  }

  }

  }

  callMethod("setFont", _this, t_rFont)
  return meProp(_me, "m_rMember").image;
}


// vmk_text_scroller.cct / CTextScroller / updateScroller

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateScroller(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  if (lingoBinary("gt", meProp(_me, "m_iWaitCounter"), 0)) {
  setMeProp(_me, "m_iWaitCounter", lingoBinary("sub", meProp(_me, "m_iWaitCounter"), 1));
  } else {
  setMeProp(_me, "m_iScrollingState", symbol("normal"));
  var t_nextChar = meProp(_me, "m_sContent").char[meProp(_me, "m_Index")];
  switch (t_nextChar) {
case "":
  callMethod("advance", _me, " ")
  if (lingoBinary("gt", meProp(_me, "m_Index"), lingoBinary("add", meProp(_me, "m_sContent").char.count, meProp(_me, "m_ViewQueue").count))) {
  if (meProp(_me, "m_bLoop")) {
  setMeProp(_me, "m_Index", 0);
  } else {
  setMeProp(_me, "m_bActive", 0);
  }

  }

  break;
case "|":
  setMeProp(_me, "m_iWaitCounter", 10);
  break;
case "$":
  setMeProp(_me, "m_iWaitCounter", 10);
  setMeProp(_me, "m_iScrollingState", symbol("blink"));
  break;
case "@":
  setMeProp(_me, "m_iWaitCounter", 14);
  setMeProp(_me, "m_iScrollingState", symbol("scramble"));
  break;
  default:
  callMethod("advance", _me, t_nextChar)
  }

  setMeProp(_me, "m_Index", lingoBinary("add", meProp(_me, "m_Index"), 1));
  }

  callMethod("render", _me)
  }

}


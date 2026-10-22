// vmk_shipwreck_handler.cct / CTextScroller / reset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reset(_me: LingoMe) {
  setMeProp(_me, "m_sContent", "");
  setMeProp(_me, "m_Index", 1);
  setMeProp(_me, "m_ViewQueue", callMethod("getEmptyQueueWithLength", _me, " ", meProp(_me, "m_iVisibleCharCount")));
  setMeProp(_me, "m_bActive", 0);
  setMeProp(_me, "m_bLoop", 1);
  setMeProp(_me, "m_iWaitCounter", 0);
  setMeProp(_me, "m_iScrollingState", symbol("normal"));
  setMeProp(_me, "m_bBlinkState", 0);
  setMeProp(_me, "m_iSpeed", 175);
}


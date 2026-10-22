// vmk_shrinking_room_handler.cct / CTextScroller / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  switch (meProp(_me, "m_iScrollingState")) {
case symbol("normal"):
  var t_s = callMethod("implode", _me, meProp(_me, "m_ViewQueue"), "");
  break;
case symbol("blink"):
  switch (meProp(_me, "m_bBlinkState")) {
case 1:
  var t_queue = callMethod("getEmptyQueueWithLength", _me, " ", meProp(_me, "m_iVisibleCharCount"));
  t_s = callMethod("implode", _me, t_queue, "");
  break;
case 0:
  t_s = callMethod("implode", _me, meProp(_me, "m_ViewQueue"), "");
  break;
  }

  setMeProp(_me, "m_bBlinkState", (lingoTruthy(meProp(_me, "m_bBlinkState")) ? 0 : 1));
  break;
case symbol("random"):
  t_queue = callMethod("getRandomQueueWithLength", _me, meProp(_me, "m_iVisibleCharCount"));
  t_s = callMethod("implode", _me, t_queue, "");
  break;
case symbol("scramble"):
  callMethod("scramble", _me)
  t_s = callMethod("implode", _me, meProp(_me, "m_ViewQueue"), "");
  break;
  }

  if (callNamed("voidp", meProp(_me, "m_pRenderer"))) {
  callNamed("put", t_s)
  } else {
  callMethod("render", meProp(_me, "m_pRenderer"), t_s)
  }

}


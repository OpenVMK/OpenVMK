// vmk_text_scroller.cct / CTextScroller / SetRenderer

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetRenderer(_me: LingoMe, t_renderType: LingoValue, t_renderID: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_pRenderer"))) ? 0 : 1)) {
  callMethod("deconstruct", meProp(_me, "m_pRenderer"))
  }

  switch (t_renderType) {
case symbol("text"):
  setMeProp(_me, "m_pRenderer", callNamed("createObject", lingoBinary("join", callMethod("getID", _me), ".renderer"), "CTextScrollRendererText"));
  break;
case symbol("bitmap"):
  setMeProp(_me, "m_pRenderer", callNamed("createObject", lingoBinary("join", callMethod("getID", _me), ".renderer"), "CTextScrollRendererBitmap"));
  break;
case symbol("isometric"):
case symbol("isometric1"):
  setMeProp(_me, "m_pRenderer", callNamed("createObject", lingoBinary("join", callMethod("getID", _me), ".renderer"), "CTextScrollRendererIsometric"));
  break;
case symbol("isometric2"):
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown scroll-renderer", t_renderType))
  break;
  }

}


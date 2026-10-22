// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iMarginH", 2);
  setMeProp(_me, "m_iMarginV", 2);
  setMeProp(_me, "m_rcItemSize", callNamed("rect", 0, 0, 40, 40));
  setMeProp(_me, "m_iSlotsPerRow", 6);
  setMeProp(_me, "m_mp_iRef_rItem", new LingoPropList([]));
  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_iSelected", 1);
  setMeProp(_me, "m_iHighlighted", 0);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  setMeProp(_me, "m_rSecondaryCol", callNamed("rgb", 190, 190, 255));
  setMeProp(_me, "m_sBlinkTimer", lingoBinary("joinPad", "Highlight Blink Timer", callMethod("getID", _this)));
  setMeProp(_me, "m_ar_NonTradableItems", new LingoList([]));
  if (callNamed("variableExists", "nontradable")) {
  setMeProp(_me, "m_ar_NonTradableItems", callNamed("getVariableValue", "nontradable"));
  }

  setMeProp(_me, "m_bTradeOpen", 0);
  setMeProp(_me, "m_bTradeAnyItem", 0);
  if (callMethod("exists", callNamed("getObject", symbol("session")), "permissions")) {
  var t_iPos = callMethod("findPos", callMethod("get", callNamed("getObject", symbol("session")), "permissions"), "11");
  }

  if (lingoBinary("gt", t_iPos, 0)) {
  setMeProp(_me, "m_bTradeAnyItem", 1);
  }

  return 1;
}


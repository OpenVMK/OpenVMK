// d0e535313898676eb605277339b50f27.cct / CAvatarNameTagWindow / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_ar_rBubbles").count, 0)) {
  if (meProp(_me, "m_ar_rChatQueue").count) {
  setMeProp(_me, "m_kBubbleState", symbol("animate"));
  }

  if (lingoBinary("eq", meProp(_me, "m_kBubbleState"), symbol("animate"))) {
  for (var t_rBubble of meProp(_me, "m_ar_rBubbles").toArray()) {
  if (lingoBinary("eq", callMethod("getProperty", t_rBubble, symbol("locY")), -float(meProp(_me, "m_iBubbleHeight")))) {
  callMethod("moveBy", t_rBubble, 0, lingoBinary("mul", meProp(_me, "m_iNumBubbles"), meProp(_me, "m_iBubbleHeight")))
  setMeProp(_me, "m_iNextFreeBbl", callMethod("getPos", meProp(_me, "m_ar_rBubbles"), t_rBubble));
  if (meProp(_me, "m_ar_rChatQueue").count) {
  callMethod("_RenderChat", _this, meProp(_me, "m_ar_rChatQueue")[1])
  callMethod("deleteAt", meProp(_me, "m_ar_rChatQueue"), 1)
  callMethod("show", t_rBubble)
  } else {
  callMethod("hide", t_rBubble)
  }

  }

  callMethod("moveBy", t_rBubble, 0, -float(2))
  }

  setMeProp(_me, "m_iBubbleScroll", lingoBinary("add", meProp(_me, "m_iBubbleScroll"), 2));
  if (lingoBinary("gte", meProp(_me, "m_iBubbleScroll"), meProp(_me, "m_iBubbleHeight"))) {
  setMeProp(_me, "m_iBubbleScroll", 0);
  if (lingoBinary("lt", meProp(_me, "m_ar_rChatQueue").count, 1)) {
  setMeProp(_me, "m_kBubbleState", symbol("wait"));
  }

  setMeProp(_me, "m_iScrollTimer", 0);
  }

  } else {
  setMeProp(_me, "m_iScrollTimer", lingoBinary("add", meProp(_me, "m_iScrollTimer"), 1));
  if (lingoBinary("eq", meProp(_me, "m_iScrollTimer"), meProp(_me, "m_iScrollDelay"))) {
  setMeProp(_me, "m_iScrollTimer", 0);
  setMeProp(_me, "m_kBubbleState", symbol("animate"));
  }

  }

  }

}


// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / DrawHighlight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawHighlight(_me: LingoMe, _this: LingoValue, a_iSelected: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rImgElement"))) ? 0 : 1)) {
  var t_rBuffer = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("image"));
  if (lingoBinary("lt", a_iSelected, 0)) {
  a_iSelected = 0;
  }

  if (lingoBinary("gt", meProp(_me, "m_iSlotCount"), 0)) {
  callMethod("DrawRectInBuffer", _this, t_rBuffer, meProp(_me, "m_iHighlighted"), meProp(_me, "m_rBorderCol"))
  setMeProp(_me, "m_iHighlighted", a_iSelected);
  if (lingoBinary("gt", meProp(_me, "m_iHighlighted"), 0)) {
  callMethod("DrawRectInBuffer", _this, t_rBuffer, meProp(_me, "m_iHighlighted"), meProp(_me, "m_rSecondaryCol"))
  }

  }

  callMethod("setProperty", meProp(_me, "m_rImgElement"), symbol("image"), t_rBuffer)
  }

  return 1;
}


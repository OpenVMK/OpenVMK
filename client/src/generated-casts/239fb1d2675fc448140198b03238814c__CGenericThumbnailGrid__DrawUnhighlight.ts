// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / DrawUnhighlight

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawUnhighlight(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rImgElement"))) ? 0 : 1)) {
  var t_rBuffer = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("image"));
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iHighlighted")), lingoBinary("gt", meProp(_me, "m_iHighlighted"), 0))) {
  callMethod("DrawRectInBuffer", _this, t_rBuffer, meProp(_me, "m_iHighlighted"), meProp(_me, "m_rBorderCol"))
  callMethod("setProperty", meProp(_me, "m_rImgElement"), symbol("image"), t_rBuffer)
  }

  }

}


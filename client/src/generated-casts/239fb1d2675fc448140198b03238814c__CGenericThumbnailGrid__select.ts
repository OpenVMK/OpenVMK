// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / select

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function select(_me: LingoMe, _this: LingoValue, a_iSelected: LingoValue) {
  for (var t_rGrid of meProp(_me, "m_ar_rLinkedGrids").toArray()) {
  callMethod("Unselect", t_rGrid)
  }

  if (callNamed("voidp", meProp(_me, "m_rImgElement"))) {
  return 0;
  }

  var t_rBuffer = callMethod("getProperty", meProp(_me, "m_rImgElement"), symbol("image"));
  if (lingoBinary("lt", a_iSelected, 1)) {
  a_iSelected = 1;
  }

  if (lingoBinary("gt", meProp(_me, "m_iSlotCount"), 0)) {
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "m_iSlotCount"), meProp(_me, "m_iSelected")), lingoBinary("gt", meProp(_me, "m_iSelected"), 0))) {
  callMethod("DrawRectInBuffer", _this, t_rBuffer, meProp(_me, "m_iSelected"), meProp(_me, "m_rBorderCol"))
  }

  setMeProp(_me, "m_iSelected", a_iSelected);
  if (lingoBinary("gt", meProp(_me, "m_iSelected"), meProp(_me, "m_iSlotCount"))) {
  return callMethod("Unselect", _this);
  }

  if (lingoBinary("gt", meProp(_me, "m_iSelected"), 0)) {
  callMethod("DrawRectInBuffer", _this, t_rBuffer, meProp(_me, "m_iSelected"), meProp(_me, "m_rHiliterCol"))
  }

  }

  callMethod("setProperty", meProp(_me, "m_rImgElement"), symbol("image"), t_rBuffer)
  return 1;
}


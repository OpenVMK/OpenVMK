// 239fb1d2675fc448140198b03238814c.cct / CGenericThumbnailGrid / construct

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
  setMeProp(_me, "m_rBufferImg", undefined);
  setMeProp(_me, "m_iSelected", 1);
  setMeProp(_me, "m_iHighlighted", 0);
  setMeProp(_me, "m_rImgElement", undefined);
  setMeProp(_me, "m_rHiliterCol", callNamed("rgb", 255, 204, 0));
  setMeProp(_me, "m_rBorderCol", callNamed("rgb", 80, 160, 216));
  setMeProp(_me, "m_rSecondaryCol", callNamed("rgb", 190, 190, 255));
  setMeProp(_me, "m_rSolidCol", callNamed("rgb", 39, 86, 146));
  setMeProp(_me, "m_rGridBgCol", callNamed("rgb", 39, 86, 146));
  setMeProp(_me, "m_sBlinkTimer", lingoBinary("joinPad", "Highlight Blink Timer", callMethod("getID", _this)));
  setMeProp(_me, "m_iSlotCount", 0);
  setMeProp(_me, "m_kSlotShapeType", symbol("rect"));
  setMeProp(_me, "m_iSlotLineWidth", 2);
  setMeProp(_me, "m_rcThumbOffset", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_ar_rLinkedGrids", new LingoList([]));
  return 1;
}


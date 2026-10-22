// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectPhoto / reDraw

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function reDraw(_me: LingoMe) {
  callMethod("readthumbs", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))))
  setThePropOf(callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist, "m_dimHorz", 3);
  callMethod("readthumbs", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))))
  var t_rThumbs = callMethod("render", callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_rThumblist);
  var t_iLower = callMethod("getInterface", callNamed("getThread", symbol("PhotoCatalog"))).m_iOffset;
  var t_iUpper = lingoBinary("add", t_iLower, 9);
  var t_rBorderCol = callNamed("rgb", 80, 160, 216);
  var t_iTbSize = callNamed("point", 80, 53);
  if (lingoBinary("and", lingoBinary("gte", meProp(_me, "m_iCurrentSelection"), t_iLower), lingoBinary("lt", meProp(_me, "m_iCurrentSelection"), t_iUpper))) {
  var t_iSelection = lingoBinary("sub", meProp(_me, "m_iCurrentSelection"), t_iLower);
  var t_pIndex = callNamed("point", lingoBinary("mod", t_iSelection, 3), lingoBinary("div", t_iSelection, 3));
  t_pIndex[1] = lingoBinary("add", lingoBinary("mul", t_pIndex[1], t_iTbSize[1]), lingoBinary("mul", t_pIndex[1], 4));
  t_pIndex[2] = lingoBinary("add", lingoBinary("mul", t_pIndex[2], t_iTbSize[2]), lingoBinary("mul", t_pIndex[2], 4));
  var t_rRect = callNamed("rect", t_pIndex, lingoBinary("add", t_pIndex, t_iTbSize));
  callMethod("draw", t_rThumbs, t_rRect, new LingoPropList([symbol("color"), t_rBorderCol, symbol("shapeType"), symbol("rect"), symbol("lineSize"), 2]))
  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "fto.thumbs.grid"), t_rThumbs)
}


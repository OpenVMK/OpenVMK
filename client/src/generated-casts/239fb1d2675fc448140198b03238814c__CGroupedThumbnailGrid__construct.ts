// 239fb1d2675fc448140198b03238814c.cct / CGroupedThumbnailGrid / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  var t_rPlain = callNamed("getStructVariable", "struct.font.plain");
  var t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 255, 255, 255), symbol("fixedLineSpace"), 12, symbol("wordWrap"), 0, symbol("rect"), callNamed("rect", 0, 0, 12, 12)]);
  var t_sWriter = lingoBinary("joinPad", "GroupedThumbnailGrid", theProperty("milliSeconds"));
  if (callNamed("createWriter", t_sWriter, t_rMetrics)) {
  setMeProp(_me, "m_rCountWriter", callNamed("getWriter", t_sWriter));
  }

  setMeProp(_me, "m_rcThumbSize", callNamed("rect", 0, 0, 42, 42));
  setThePropOf(_this, "m_rcItemSize", callNamed("rect", 0, 0, 62, 42));
  setThePropOf(_this, "m_iMarginH", 1);
  setThePropOf(_this, "m_iMarginV", 1);
  return 1;
}


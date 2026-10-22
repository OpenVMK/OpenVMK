// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatPinThumbnailGrid / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mp_iRef_rItem", new LingoList([]));
  var m_ar_SingleUsePins = undefined;
  var m_ar_MarkedSingleUsePins = undefined;
  setMeProp(_me, "m_sWriterID", "VMKS Inventory Pin Level Writer");
  setMeProp(_me, "m_sWriter2Id", "VMKS Inventory Pin Level Writer DropShadow");
  var tPlain = callNamed("getStructVariable", "struct.font.plain");
  var tBold = callNamed("getStructVariable", "struct.font.bold");
  var tLink = callNamed("getStructVariable", "struct.font.link");
  var tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), tMetrics)
  tMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", tPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", tPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 2, 2, 2), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriter2Id"), tMetrics)
  return 1;
}


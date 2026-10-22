// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_kMode", symbol("select"));
  setMeProp(_me, "m_kActive", symbol("pins"));
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_iSelected", -float(1));
  setMeProp(_me, "m_iItemsPerPage", 16);
  setMeProp(_me, "m_iCurrentPage", 1);
  setMeProp(_me, "m_iLoadingRequest", 0);
  if (callNamed("objectExists", "PinThumbGrid")) {
  callNamed("removeObject", "PinThumbGrid")
  }

  if (callNamed("objectExists", "WornPinThumbGrid")) {
  callNamed("removeObject", "WornPinThumbGrid")
  }

  setMeProp(_me, "m_rGridRenderer", callNamed("createObject", "PinThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rWornRenderer", callNamed("createObject", "WornPinThumbGrid", "CGenericThumbnailGrid"));
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", new LingoPropList([symbol("pins"), new LingoPropList([])]));
  if (callNamed("memberExists", "previewbox")) {
  setMeProp(_me, "m_rPrevBackImage", callMethod("duplicate", callNamed("getMember", "previewbox").image));
  } else {
  setMeProp(_me, "m_rPrevBackImage", callNamed("image", 100, 100, 32));
  }

  setMeProp(_me, "m_sWriterID", callNamed("getUniqueID"));
  setMeProp(_me, "m_sWriter2Id", callNamed("getUniqueID"));
  var t_rPlain = callNamed("getStructVariable", "struct.font.plain");
  var t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), t_rMetrics)
  t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 2, 2, 2), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriter2Id"), t_rMetrics)
  return 1;
}


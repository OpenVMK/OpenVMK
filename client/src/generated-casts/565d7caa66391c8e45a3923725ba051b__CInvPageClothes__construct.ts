// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageClothes / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_iSelected", -float(1));
  setMeProp(_me, "m_iItemsPerPage", 12);
  setMeProp(_me, "m_iCurrentPage", 1);
  setMeProp(_me, "m_bLoadingThumbs", 1);
  setMeProp(_me, "m_iLoadingRequest", 0);
  setMeProp(_me, "m_rGridRenderer", callNamed("createObject", "InvClothesThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  setMeProp(_me, "m_rClothAssetManager", callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component));
  setMeProp(_me, "m_rClothPreviewRenderer", callNamed("createObject", "ClothesPreviewsRenderer", "CGenericThumbnailGrid"));
  setMeProp(_me, "m_rGridLoadAnimator", callNamed("createObject", callNamed("getUniqueID"), "CMainThumbGridAnimator"));
  setMeProp(_me, "m_ar_iClothsToBeLoaded", new LingoList([]));
  setMeProp(_me, "m_sWriterID", callNamed("getUniqueID"));
  setMeProp(_me, "m_sWriter2Id", callNamed("getUniqueID"));
  var t_rPlain = callNamed("getStructVariable", "struct.font.plain");
  var t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 250, 250, 250), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriterID"), t_rMetrics)
  t_rMetrics = new LingoPropList([symbol("font"), callMethod("getaProp", t_rPlain, symbol("font")), symbol("fontStyle"), callMethod("getaProp", t_rPlain, symbol("fontStyle")), symbol("color"), callNamed("rgb", 2, 2, 2), symbol("bgColor"), callNamed("rgb", 225, 255, 255), symbol("fixedLineSpace"), 15]);
  callNamed("createWriter", meProp(_me, "m_sWriter2Id"), t_rMetrics)
  return 1;
}


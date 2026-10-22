// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePosters / construct

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
  setMeProp(_me, "m_mp_kType_mp_iRef_rItem", undefined);
  setMeProp(_me, "m_iItemsPerPage", 16);
  setMeProp(_me, "m_iCurrentPage", 1);
  var m_bLoadingThumbs = 1;
  setMeProp(_me, "m_iLoadingRequest", 0);
  setMeProp(_me, "m_rGridRenderer", callNamed("createObject", "PosterThumbGrid", "CGenericThumbnailGrid", "CGroupedThumbnailGrid"));
  return 1;
}


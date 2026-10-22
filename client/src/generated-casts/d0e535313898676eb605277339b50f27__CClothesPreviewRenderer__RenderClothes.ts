// d0e535313898676eb605277339b50f27.cct / CClothesPreviewRenderer / RenderClothes

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenderClothes(_me: LingoMe, a_mp_ClothesList: LingoValue) {
  setMeProp(_me, "m_bAllClothesLoaded", 0);
  setMeProp(_me, "m_ar_ClothesToLoad", new LingoList([]));
  setMeProp(_me, "m_mp_ThumbList", a_mp_ClothesList);
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  for (var i = 1; i <= a_mp_ClothesList.count; ++i) {
  var t_iSetNum = callMethod("getPropAt", a_mp_ClothesList, i);
  var t_sSetName = callMethod("GetSetName", _me, t_iSetNum);
  if (lingoBinary("and", lingoBinary("neq", t_sSetName, "hr"), lingoBinary("neq", t_sSetName, "hd"))) {
  if (lingoBinary("eq", callMethod("findPos", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum), 0)) {
  var t_mp_CachedList = callMethod("GetCachedItem", meProp(_me, "m_objThumbCache"), t_iSetNum);
  if (callNamed("listp", t_mp_CachedList)) {
  if (lingoBinary("eq", meProp(_me, "m_sImageType"), "Preview")) {
  meProp(_me, "m_mp_ThumbList")[callNamed("string", t_iSetNum)] = t_mp_CachedList.preview;
  } else {
  meProp(_me, "m_mp_ThumbList")[callNamed("string", t_iSetNum)] = t_mp_CachedList.thumb;
  }

  continue;
  }

  callMethod("add", meProp(_me, "m_ar_ClothesToLoad"), t_iSetNum)
  callMethod("LoadCastLibsForCloth", t_Obj, _me, t_iSetNum)
  }

  }

  }

  if (lingoBinary("eq", meProp(_me, "m_ar_ClothesToLoad").count, 0)) {
  setMeProp(_me, "m_bAllClothesLoaded", 1);
  }

  callMethod("StartWaiting", _me)
}


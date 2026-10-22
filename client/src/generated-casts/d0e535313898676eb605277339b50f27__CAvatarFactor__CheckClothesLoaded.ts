// d0e535313898676eb605277339b50f27.cct / CAvatarFactor / CheckClothesLoaded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CheckClothesLoaded(_me: LingoMe, _this: LingoValue) {
  if (callNamed("listp", meProp(_me, "m_arClothesSets"))) {
  var t_Obj = callMethod("GetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component);
  var t_ar_ReadyClothes = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_arClothesSets").count; ++i) {
  var t_iSetNum = meProp(_me, "m_arClothesSets")[i];
  if (callMethod("IsClothReady", t_Obj, t_iSetNum)) {
  callMethod("add", t_ar_ReadyClothes, t_iSetNum)
  }

  }

  for (var e = 1; e <= t_ar_ReadyClothes.count; ++e) {
  t_iSetNum = t_ar_ReadyClothes[e];
  var t_iPos = callMethod("findPos", meProp(_me, "m_arClothesSets"), t_iSetNum);
  if (lingoBinary("gt", t_iPos, 0)) {
  callMethod("deleteAt", meProp(_me, "m_arClothesSets"), t_iPos)
  }

  }

  if (lingoBinary("eq", meProp(_me, "m_arClothesSets").count, 0)) {
  setMeProp(_me, "m_bNeededClothesLoaded", 1);
  callMethod("Define", _this, meProp(_me, "m_mp_PartPieces"))
  if (callNamed("listp", meProp(_me, "m_ar_ActionData"))) {
  callMethod("Action", _this, meProp(_me, "m_ar_ActionData"))
  setMeProp(_me, "m_ar_ActionData", undefined);
  }

  }

  }

}


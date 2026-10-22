// 2230483a2e5366aa24e52c1b02d9674c.cct / CMagicFactor_new / DrawCarPants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawCarPants(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  /* global */ var pTemp = globalVar("pTemp");
  var t_iDir = _me.m_arFlipList[lingoBinary("add", _me.m_iDir, 1)];
  if (lingoBinary("eq", _me.m_sCarPantAction, "wlk")) {
  setThePropOf(_me, "m_i_CarPantCounter", lingoBinary("add", _me.m_i_CarPantCounter, 1));
  var t_sCarPantAction = "wlk";
  if (lingoBinary("eq", _me.m_iMagicFx, 115)) {
  if (lingoBinary("gt", _me.m_i_CarPantCounter, 1)) {
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  }

  if (lingoBinary("gt", _me.m_i_CarPantCounter, 3)) {
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  if (lingoBinary("eq", _me.m_sCarPantAction, "std")) {
  t_sCarPantAction = "wlk";
  setThePropOf(_me, "m_i_CarPantCounter", 0);
  }

  var t_ar_Images = new LingoList([]);
  var t_sMemName1 = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_carback_"), _me.m_iMagicFx), "_"), t_iDir), "_"), _me.m_i_CarPantCounter);
  if (callNamed("memberExists", t_sMemName1)) {
  callMethod("add", t_ar_Images, callNamed("getMember", t_sMemName1))
  }

  if (lingoBinary("neq", _me.m_iMagicFx, 110)) {
  if (lingoBinary("neq", _me.m_iMagicFx, 112)) {
  if (lingoBinary("eq", _me.m_iMagicFx, 115)) {
  var t_pnt = a_Mem_AvatImage.regPoint;
  setThePropOf(a_Mem_AvatImage, "regPoint", callNamed("point", t_pnt[1], lingoBinary("sub", t_pnt[2], 9)));
  }

  }

  }

  if (lingoBinary("eq", _me.m_iMagicFx, 114)) {
  t_pnt = a_Mem_AvatImage.regPoint;
  setThePropOf(a_Mem_AvatImage, "regPoint", callNamed("point", t_pnt[1], lingoBinary("sub", t_pnt[2], 14)));
  } else {
  if (lingoBinary("eq", _me.m_iMagicFx, 111)) {
  t_pnt = a_Mem_AvatImage.regPoint;
  setThePropOf(a_Mem_AvatImage, "regPoint", callNamed("point", t_pnt[1], lingoBinary("add", t_pnt[2], 5)));
  }

  }

  callMethod("add", t_ar_Images, a_Mem_AvatImage)
  var t_sMemName2 = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_carfront_"), _me.m_iMagicFx), "_"), t_iDir), "_"), _me.m_i_CarPantCounter);
  if (callNamed("memberExists", t_sMemName2)) {
  callMethod("add", t_ar_Images, callNamed("getMember", t_sMemName2))
  }

  return callNamed("createUnionImageFromMemberList", _me, t_ar_Images, callNamed("point", 0, 0));
}


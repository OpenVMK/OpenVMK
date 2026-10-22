// d0e535313898676eb605277339b50f27.cct / CMagicFactor / DrawCarPants

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawCarPants(_me: LingoMe, a_Mem_AvatImage: LingoValue) {
  var t_iDir = meProp(_me, "m_arFlipList")[lingoBinary("add", meProp(_me, "m_iDir"), 1)];
  if (lingoBinary("eq", meProp(_me, "m_sCarPantAction"), "wlk")) {
  setMeProp(_me, "m_i_CarPantCounter", lingoBinary("add", meProp(_me, "m_i_CarPantCounter"), 1));
  var t_sCarPantAction = "wlk";
  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 115)) {
  if (lingoBinary("gt", meProp(_me, "m_i_CarPantCounter"), 1)) {
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  } else {
  if (lingoBinary("gt", meProp(_me, "m_i_CarPantCounter"), 3)) {
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  }

  } else {
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  if (lingoBinary("eq", meProp(_me, "m_sCarPantAction"), "std")) {
  t_sCarPantAction = "wlk";
  setMeProp(_me, "m_i_CarPantCounter", 0);
  }

  var t_ar_Images = new LingoList([]);
  var t_sMemName1 = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_carback_"), meProp(_me, "m_iMagicFx")), "_"), t_iDir), "_"), meProp(_me, "m_i_CarPantCounter"));
  if (callNamed("memberExists", t_sMemName1)) {
  callMethod("add", t_ar_Images, callNamed("getMember", t_sMemName1))
  }

  if (lingoBinary("eq", meProp(_me, "m_iMagicFx"), 115)) {
  var t_pnt = a_Mem_AvatImage.regPoint;
  setThePropOf(a_Mem_AvatImage, "regPoint", callNamed("point", t_pnt[1], lingoBinary("sub", t_pnt[2], 9)));
  }

  callMethod("add", t_ar_Images, a_Mem_AvatImage)
  var t_sMemName2 = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sCarPantAction, "_carfront_"), meProp(_me, "m_iMagicFx")), "_"), t_iDir), "_"), meProp(_me, "m_i_CarPantCounter"));
  if (callNamed("memberExists", t_sMemName2)) {
  callMethod("add", t_ar_Images, callNamed("getMember", t_sMemName2))
  }

  return callMethod("createUnionImageFromMemberList", _me, t_ar_Images, callNamed("point", 0, 0));
}


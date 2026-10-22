// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / SetAction

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetAction(_me: LingoMe, a_mp_Data: LingoValue) {
  if (lingoBinary("neq", a_mp_Data, undefined)) {
  setMeProp(_me, "m_mp_ActionData", a_mp_Data);
  }

  if (meProp(_me, "m_bAllClothesLoaded")) {
  if (lingoBinary("and", callNamed("objectp", meProp(_me, "m_ObjRenderer")), callNamed("listp", meProp(_me, "m_mp_ActionData")))) {
  var t_mp = meProp(_me, "m_mp_ActionData");
  if (lingoBinary("gt", callMethod("findPos", t_mp, symbol("Weapon")), 0)) {
  var t_iWeapon = t_mp.Weapon;
  } else {
  t_iWeapon = 0;
  }

  if (lingoBinary("gt", callMethod("findPos", t_mp, symbol("onlyhead")), 0)) {
  var t_bOnlyHead = t_mp.onlyhead;
  } else {
  var t_iOnlyHead = 0;
  }

  var t_ar_ActionList = new LingoList([t_mp.head, t_mp.body, t_mp.emoticon, 0, 0, t_mp.LeftHand, t_mp.RightHand, t_mp.legs, 0, t_mp.magic, t_iWeapon]);
  callMethod("Action", meProp(_me, "m_ObjRenderer"), t_ar_ActionList)
  if (t_bOnlyHead) {
  callMethod("DrawOnlyHead", meProp(_me, "m_ObjRenderer"))
  }

  var t_LocH = meProp(_me, "m_rSpr").locH;
  var t_LocV = meProp(_me, "m_rSpr").locV;
  var t_LocZ = meProp(_me, "m_rSpr").locZ;
  var t_vLoc = callNamed("vector", t_LocH, t_LocV, t_LocZ);
  callMethod("update", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_rSpr"), t_vLoc)
  var t_Img = undefined;
  while (lingoBinary("eq", t_Img, undefined)) {
  callMethod("update", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_rSpr"), t_vLoc)
  t_Img = meProp(_me, "m_rSpr").member.image;
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  break;
  }

  }

  if (t_bOnlyHead) {
  var t_img2 = callNamed("image", 80, 100, 32);
  var t_Alpha2 = callNamed("image", 80, 100, 8, symbol("grayscale"));
  callMethod("copyPixels", t_Alpha2, callMethod("extractAlpha", t_Img), t_img2.rect, callNamed("rect", 0, 20, 80, 120), lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_img2, t_Img, t_img2.rect, callNamed("rect", 0, 20, 80, 120), lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_img2, t_Alpha2)
  setThePropOf(t_img2, "useAlpha", 1);
  t_Img = t_img2;
  }

  if (meProp(_me, "m_bJustImage")) {
  if (callNamed("voidp", meProp(_me, "m_mp_CallBackData"))) {
  return t_Img;
  } else {
  var t_Obj = meProp(_me, "m_mp_CallBackData")._object;
  if (callNamed("objectp", t_Obj)) {
  callNamed("call", meProp(_me, "m_mp_CallBackData").method, new LingoList([t_Obj]), t_Img, meProp(_me, "m_mp_CallBackData").data)
  callNamed("unregisterObject", callMethod("getID", _me))
  }

  }

  }

  }

  } else {
  callMethod("delay", _me, 300, symbol("SetAction"))
  }

}


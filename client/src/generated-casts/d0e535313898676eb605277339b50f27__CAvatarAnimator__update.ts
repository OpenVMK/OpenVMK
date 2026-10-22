// d0e535313898676eb605277339b50f27.cct / CAvatarAnimator / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_ObjRenderer"))) {
  var t_vLoc = callNamed("vector", 0, 0, 0);
  callMethod("update", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_rSpr"), t_vLoc)
  var t_Img = undefined;
  while (lingoBinary("eq", t_Img, undefined)) {
  callMethod("update", meProp(_me, "m_ObjRenderer"), meProp(_me, "m_rSpr"), t_vLoc)
  t_Img = meProp(_me, "m_rSpr").member.image;
  if ((lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1)) {
  break;
  }

  }

  if (meProp(_me, "m_bJustImage")) {
  if (callNamed("voidp", meProp(_me, "m_mp_CallBackData"))) {
  return t_Img;
  } else {
  var t_Obj = meProp(_me, "m_mp_CallBackData")._object;
  if (callNamed("objectp", t_Obj)) {
  callNamed("call", meProp(_me, "m_mp_CallBackData").method, t_Obj, t_Img, meProp(_me, "m_mp_CallBackData").data)
  }

  }

  callNamed("unregisterObject", callMethod("getID", _me))
  }

  }

}


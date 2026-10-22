// d0e535313898676eb605277339b50f27.cct / CAvatarImageCache / getImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getImage(_me: LingoMe, _this: LingoValue, a_sImageName: LingoValue) {
  var t_iPos = callMethod("findPos", meProp(_me, "m_mp_rAvatarImages"), a_sImageName);
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_mp_rImageData = meProp(_me, "m_mp_rAvatarImages")[t_iPos];
  } else {
  if (callNamed("memberExists", a_sImageName)) {
  var t_rMem = callNamed("getMember", a_sImageName);
  var t_rImg = callMethod("duplicate", t_rMem.image);
  t_mp_rImageData = new LingoPropList([symbol("image"), t_rImg, symbol("point"), t_rMem.regPoint, symbol("alpha"), callMethod("extractAlpha", t_rImg)]);
  callMethod("setaProp", meProp(_me, "m_mp_rAvatarImages"), a_sImageName, t_mp_rImageData)
  }

  }

  return t_mp_rImageData;
}


// d0e535313898676eb605277339b50f27.cct / CAvatarClothAssetManager / AddCastContentsToImageCache

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddCastContentsToImageCache(_me: LingoMe, _this: LingoValue, a_rCast: LingoValue) {
  if (lingoBinary("eq", callNamed("ilk", a_rCast), symbol("castLib"))) {
  var t_iCount = thePropOf(callNamed("castLib", a_rCast._number), "number of castMembers");
  for (var j = 1; j <= t_iCount; ++j) {
  var t_rMember = callNamed("member", j, a_rCast._number);
  if (lingoBinary("eq", t_rMember._type, symbol("bitmap"))) {
  var t_rImage = callMethod("duplicate", t_rMember.image);
  var t_rPoint = t_rMember.regPoint;
  var t_rAlpha = callMethod("extractAlpha", t_rImage);
  var t_rStruct = new LingoPropList([symbol("image"), t_rImage, symbol("point"), t_rPoint, symbol("alpha"), t_rAlpha]);
  meProp(_me, "m_mp_sName_rStruct")[t_rMember.name] = t_rStruct;
  }

  }

  }

}


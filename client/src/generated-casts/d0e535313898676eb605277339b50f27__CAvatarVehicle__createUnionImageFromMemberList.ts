// d0e535313898676eb605277339b50f27.cct / CAvatarVehicle / createUnionImageFromMemberList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createUnionImageFromMemberList(_me: LingoMe, i_ar_list: LingoValue, _setRegpoint: LingoValue, a_mp_ColorizationList: LingoValue) {
  if (lingoBinary("gt", meProp(_me, "m_iVehicle"), 0)) {
  var tUnionList = new LingoList([]);
  for (var tCheckMem of i_ar_list.toArray()) {
  if ((lingoTruthy(callNamed("voidp", tCheckMem)) ? 0 : 1)) {
  if (callNamed("voidp", tCheckMem.member)) {
  continue;
  }

  callMethod("append", tUnionList, tCheckMem)
  }

  }

  var tMaskList = new LingoList([]);
  var tUnion = callNamed("rect", 0, 0, 0, 0);
  for (var tImage of tUnionList.toArray()) {
  var tMem = tImage.member;
  var tOffsetRect = lingoBinary("sub", tMem.rect, callNamed("rect", tMem.regPoint, tMem.regPoint));
  tUnion = callMethod("union", tUnion, tOffsetRect);
  callMethod("append", tMaskList, callMethod("extractAlpha", tMem.image))
  }

  var tNewRegpoint = lingoBinary("mul", -float(1), callNamed("point", tUnion.left, tUnion.top));
  setThePropOf(_setRegpoint, "locH", tNewRegpoint.locH);
  setThePropOf(_setRegpoint, "locV", tNewRegpoint.locV);
  var tMaskImg = callNamed("image", tUnion.width, tUnion.height, 8, symbol("grayscale"));
  for (var i = 1; i <= tMaskList.count; ++i) {
  var tDeltaRegpoint = lingoBinary("sub", tNewRegpoint, tUnionList[i].member.regPoint);
  var t_ImgAlpha = tMaskList[i];
  callMethod("copyPixels", tMaskImg, t_ImgAlpha, lingoBinary("add", t_ImgAlpha.rect, callNamed("rect", tDeltaRegpoint, tDeltaRegpoint)), t_ImgAlpha.rect, new LingoPropList([symbol("ink"), 39]))
  }

  var tImg = callNamed("image", tUnion.width, tUnion.height, 32);
  for (var i = 1; i <= tUnionList.count; ++i) {
  tDeltaRegpoint = lingoBinary("sub", tNewRegpoint, tUnionList[i].member.regPoint);
  var t_rImg = tUnionList[i].member.image;
  var t_iPos = callMethod("findPos", a_mp_ColorizationList, tUnionList[i].member);
  if (lingoBinary("gt", t_iPos, 0)) {
  var t_rShirtColor = a_mp_ColorizationList[t_iPos];
  callMethod("copyPixels", tImg, t_rImg, lingoBinary("add", t_rImg.rect, callNamed("rect", tDeltaRegpoint, tDeltaRegpoint)), t_rImg.rect, new LingoPropList([symbol("bgColor"), t_rShirtColor, symbol("ink"), 41]))
  continue;
  }

  callMethod("copyPixels", tImg, t_rImg, lingoBinary("add", t_rImg.rect, callNamed("rect", tDeltaRegpoint, tDeltaRegpoint)), t_rImg.rect)
  }

  callMethod("setAlpha", tImg, tMaskImg)
  setThePropOf(tImg, "useAlpha", 1);
  return new LingoList([tImg, tMaskImg]);
  }

}


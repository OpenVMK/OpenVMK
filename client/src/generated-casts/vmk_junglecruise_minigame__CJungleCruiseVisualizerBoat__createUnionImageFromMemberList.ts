// vmk_junglecruise_minigame.cct / CJungleCruiseVisualizerBoat / createUnionImageFromMemberList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createUnionImageFromMemberList(_me: LingoMe, i_ar_list: LingoValue, _setRegpoint: LingoValue, i_ar_props: LingoValue) {
  var tProps = new LingoPropList([symbol("createMask"), 0, symbol("fillColor"), callNamed("rgb", "#000000")]);
  var tCheck = new LingoList([symbol("createMask"), symbol("fillColor")]);
  if (lingoBinary("and", (lingoTruthy(callNamed("voidp", i_ar_props)) ? 0 : 1), callNamed("listp", i_ar_props))) {
  for (var tProp of tCheck.toArray()) {
  if ((lingoTruthy(callNamed("voidp", callMethod("findPos", i_ar_props, tProp))) ? 0 : 1)) {
  tProps[tProp] = i_ar_props[tProp];
  }

  }

  }

  var tUnionList = new LingoList([]);
  for (var tCheckMem of i_ar_list.toArray()) {
  if (callNamed("voidp", tCheckMem.member)) {
  continue;
  }

  callMethod("append", tUnionList, tCheckMem)
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
  var tBlack = callNamed("image", tUnion.width, tUnion.height, 32);
  callMethod("fill", tBlack, tBlack.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), callNamed("rgb", "#000000")]))
  var tMaskImg = callNamed("image", tUnion.width, tUnion.height, 8, symbol("grayscale"));
  for (var i = 1; i <= tMaskList.count; ++i) {
  var tDeltaRegpoint = lingoBinary("sub", tNewRegpoint, tUnionList[i].member.regPoint);
  callMethod("copyPixels", tMaskImg, tBlack, tBlack.rect, tBlack.rect, new LingoPropList([symbol("maskImage"), tMaskList[i], symbol("maskOffset"), tDeltaRegpoint]))
  }

  var tImg = callNamed("image", tUnion.width, tUnion.height, 32);
  if (tProps.createMask) {
  callMethod("fill", tImg, tImg.rect, new LingoPropList([symbol("shapeType"), symbol("rect"), symbol("lineSize"), 0, symbol("color"), tProps.fillColor]))
  } else {
  for (var i = 1; i <= tUnionList.count; ++i) {
  tDeltaRegpoint = lingoBinary("sub", tNewRegpoint, tUnionList[i].member.regPoint);
  callMethod("copyPixels", tImg, tUnionList[i].member.image, lingoBinary("add", tUnionList[i].member.image.rect, callNamed("rect", tDeltaRegpoint, tDeltaRegpoint)), tUnionList[i].member.image.rect, new LingoPropList([symbol("maskImage"), tMaskList[i]]))
  }

  }

  callMethod("setAlpha", tImg, tMaskImg)
  setThePropOf(tImg, "useAlpha", 1);
  return tImg;
}


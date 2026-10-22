// core.old.cct / CWindowCommonButton / createButtonImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createButtonImg(_me: LingoMe, tText: LingoValue, tstate: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pCachedImgs")[tstate]))) {
  return meProp(_me, "pCachedImgs")[tstate];
  }

  var tMemNum = callNamed("getmemnum", "common.button.text");
  if (lingoBinary("eq", tMemNum, 0)) {
  tMemNum = callNamed("createMember", "common.button.text", symbol("text"));
  }

  var tTextMem = callNamed("member", tMemNum);
  var tFontDesc = meProp(_me, "pProp")[tstate][symbol("text")];
  var tFont = tFontDesc[symbol("font")];
  var tFontStyle = callNamed("list", callNamed("symbol", tFontDesc[symbol("fontStyle")]));
  var tFontSize = tFontDesc[symbol("fontSize")];
  var tColor = callNamed("rgb", tFontDesc[symbol("color")]);
  var tBgColor = callNamed("rgb", tFontDesc[symbol("bgColor")]);
  var tBoxType = tFontDesc[symbol("boxType")];
  var tSpace = lingoBinary("add", tFontDesc[symbol("fontSize")], 2);
  var tMarginH = tFontDesc[symbol("marginH")];
  var tMarginV = tFontDesc[symbol("marginV")];
  if (lingoBinary("eq", tTextMem.wordWrap, 1)) {
  setThePropOf(tTextMem, "wordWrap", 0);
  }

  if (lingoBinary("neq", tTextMem.font, tFont)) {
  setThePropOf(tTextMem, "font", tFont);
  }

  if (lingoBinary("neq", tTextMem.fontStyle, tFontStyle)) {
  setThePropOf(tTextMem, "fontStyle", tFontStyle);
  }

  if (lingoBinary("neq", tTextMem.fontSize, tFontSize)) {
  setThePropOf(tTextMem, "fontSize", tFontSize);
  }

  if (lingoBinary("neq", tTextMem.color, tColor)) {
  setThePropOf(tTextMem, "color", tColor);
  }

  if (lingoBinary("neq", tTextMem.bgColor, tBgColor)) {
  setThePropOf(tTextMem, "bgColor", tBgColor);
  }

  if (lingoBinary("neq", tTextMem.boxType, tBoxType)) {
  setThePropOf(tTextMem, "boxType", tBoxType);
  }

  if (lingoBinary("neq", tTextMem.fixedLineSpace, tSpace)) {
  setThePropOf(tTextMem, "fixedLineSpace", tSpace);
  }

  if (lingoBinary("neq", tTextMem.text, tText)) {
  setThePropOf(tTextMem, "text", tText);
  }

  if (lingoBinary("eq", meProp(_me, "pFixedSize"), 1)) {
  var tTextWidth = lingoBinary("add", callMethod("charPosToLoc", tTextMem, tTextMem.char.count).locH, tFontDesc[symbol("fontSize")]);
  if (lingoBinary("gt", lingoBinary("add", tTextWidth, lingoBinary("mul", tMarginH, 2)), meProp(_me, "pOrigWidth"))) {
  tTextWidth = lingoBinary("sub", meProp(_me, "pOrigWidth"), lingoBinary("mul", tMarginH, 2));
  }

  setThePropOf(tTextMem, "rect", callNamed("rect", 0, 0, tTextWidth, tTextMem.height));
  var tTextImg = tTextMem.image;
  var tWidth = meProp(_me, "pOrigWidth");
  } else {
  tTextWidth = lingoBinary("add", callMethod("charPosToLoc", tTextMem, tTextMem.char.count).locH, tFontDesc[symbol("fontSize")]);
  if (lingoBinary("gt", lingoBinary("add", tTextWidth, lingoBinary("mul", tMarginH, 2)), meProp(_me, "pMaxWidth"))) {
  tTextWidth = lingoBinary("sub", meProp(_me, "pMaxWidth"), lingoBinary("mul", tMarginH, 2));
  }

  setThePropOf(tTextMem, "rect", callNamed("rect", 0, 0, tTextWidth, tTextMem.height));
  tTextImg = tTextMem.image;
  tWidth = lingoBinary("add", tTextWidth, lingoBinary("mul", tMarginH, 2));
  }

  var tNewImg = callNamed("image", tWidth, meProp(_me, "pButtonImg")[symbol("left")].height, _me.pDepth, _me.pPalette);
  var tStartPointY = 0;
  var tEndPointY = tNewImg.height;
  var tStartPointX = 0;
  var tEndPointX = 0;
  for (var i of new LingoList([symbol("left"), symbol("middle"), symbol("right")]).toArray()) {
  tStartPointX = tEndPointX;
  switch (i) {
case symbol("left"):
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", meProp(_me, "pButtonImg"), i).width);
  break;
case symbol("middle"):
  tEndPointX = lingoBinary("sub", lingoBinary("sub", lingoBinary("add", tEndPointX, tWidth), callMethod("getProp", meProp(_me, "pButtonImg"), symbol("left")).width), callMethod("getProp", meProp(_me, "pButtonImg"), symbol("right")).width);
  break;
case symbol("right"):
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", meProp(_me, "pButtonImg"), i).width);
  break;
  }

  var tdestrect = callNamed("rect", tStartPointX, tStartPointY, tEndPointX, tEndPointY);
  callMethod("copyPixels", tNewImg, callMethod("getProp", meProp(_me, "pButtonImg"), i), tdestrect, callMethod("getProp", meProp(_me, "pButtonImg"), i).rect)
  }

  var tDstRect = lingoBinary("add", tTextImg.rect, callNamed("rect", 1, tMarginV, 1, tMarginV));
  switch (tFontDesc[symbol("alignment")]) {
case symbol("left"):
  tDstRect = lingoBinary("add", tDstRect, callNamed("rect", callMethod("getProp", meProp(_me, "pButtonImg"), symbol("left")).width, 0, callMethod("getProp", meProp(_me, "pButtonImg"), symbol("left")).width, 0));
  break;
case symbol("center"):
  tDstRect = lingoBinary("sub", lingoBinary("add", tDstRect, callNamed("rect", lingoBinary("div", tNewImg.width, 2), 0, lingoBinary("div", tNewImg.width, 2), 0)), callNamed("rect", lingoBinary("div", tTextWidth, 2), 0, lingoBinary("div", tTextWidth, 2), 0));
  break;
case symbol("right"):
  tDstRect = lingoBinary("sub", lingoBinary("add", tDstRect, callNamed("rect", tNewImg.width, 0, tNewImg.width, 0)), callNamed("rect", lingoBinary("add", tTextWidth, callMethod("getProp", meProp(_me, "pButtonImg"), symbol("right")).width), 0, lingoBinary("add", tTextWidth, callMethod("getProp", meProp(_me, "pButtonImg"), symbol("right")).width), 0));
  break;
  }

  callMethod("copyPixels", tNewImg, tTextImg, tDstRect, tTextImg.rect, new LingoPropList([symbol("ink"), 36]))
  meProp(_me, "pCachedImgs")[tstate] = tNewImg;
  return tNewImg;
}


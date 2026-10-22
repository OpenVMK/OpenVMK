// core.old.cct / CWindowIconButton / createButtonImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createButtonImg(_me: LingoMe, tText: LingoValue, tstate: LingoValue) {
  if (!lingoTruthy(callNamed("voidp", _me.pCachedImgs[tstate]))) {
  return _me.pCachedImgs[tstate];
  }

  var tMemNum = callNamed("getmemnum", "icon.button.text");
  if (lingoBinary("eq", tMemNum, 0)) {
  tMemNum = callNamed("createMember", "icon.button.text", symbol("text"));
  }

  var tTextMem = callNamed("member", tMemNum);
  var tFontDesc = _me.pProp[tstate][symbol("text")];
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

  var tOptImgWidth = 0;
  if (lingoBinary("and", !lingoTruthy(callNamed("voidp", _me.pProp[symbol("icon")])), !lingoTruthy(callNamed("voidp", meProp(_me, "pIconImg"))))) {
  var tAlignment = callMethod("getPropAt", _me.pProp[symbol("icon")][symbol("props")], 1);
  var tOptImgMargH = _me.pProp[symbol("icon")][symbol("props")][tAlignment][symbol("marginH")];
  tOptImgWidth = lingoBinary("add", meProp(_me, "pIconImg").width, tOptImgMargH);
  }

  if (lingoBinary("eq", _me.pFixedSize, 1)) {
  var tCharPosH = callMethod("locToCharPos", tTextMem, callNamed("point", lingoBinary("sub", _me.pOrigWidth, lingoBinary("mul", tMarginH, 2)), 5));
  var tTextWidth = callMethod("charPosToLoc", tTextMem, tCharPosH).locH;
  setThePropOf(tTextMem, "rect", callNamed("rect", 0, 0, tTextWidth, tTextMem.height));
  var tTextImg = tTextMem.image;
  var tWidth = _me.pOrigWidth;
  } else {
  tTextWidth = lingoBinary("add", callMethod("charPosToLoc", tTextMem, tTextMem.char.count).locH, tFontDesc[symbol("fontSize")]);
  if (lingoBinary("gt", lingoBinary("add", tTextWidth, lingoBinary("mul", tMarginH, 2)), _me.pMaxWidth)) {
  tTextWidth = lingoBinary("add", lingoBinary("sub", _me.pMaxWidth, lingoBinary("mul", tMarginH, 2)), tOptImgWidth);
  }

  setThePropOf(tTextMem, "rect", callNamed("rect", 0, 0, tTextWidth, tTextMem.height));
  tTextImg = tTextMem.image;
  tWidth = lingoBinary("add", lingoBinary("add", tTextWidth, lingoBinary("mul", tMarginH, 2)), tOptImgWidth);
  }

  var tNewImg = callNamed("image", tWidth, _me.pButtonImg[symbol("left")].height, 8, callNamed("member", _me.pPalette));
  var tStartPointY = 0;
  var tEndPointY = tNewImg.height;
  var tStartPointX = 0;
  var tEndPointX = 0;
  for (var i of new LingoList([symbol("left"), symbol("middle"), symbol("right")]).toArray()) {
  tStartPointX = tEndPointX;
  switch (i) {
case symbol("left"):
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", _me.pButtonImg, i).width);
  break;
case symbol("middle"):
  tEndPointX = lingoBinary("sub", lingoBinary("sub", lingoBinary("add", tEndPointX, tWidth), callMethod("getProp", _me.pButtonImg, symbol("left")).width), callMethod("getProp", _me.pButtonImg, symbol("right")).width);
  break;
case symbol("right"):
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", _me.pButtonImg, i).width);
  break;
  }

  var tDstRect = callNamed("rect", tStartPointX, tStartPointY, tEndPointX, tEndPointY);
  callMethod("copyPixels", tNewImg, callMethod("getProp", _me.pButtonImg, i), tDstRect, callMethod("getProp", _me.pButtonImg, i).rect)
  }

  if (lingoBinary("and", !lingoTruthy(callNamed("voidp", _me.pProp[symbol("icon")])), !lingoTruthy(callNamed("voidp", meProp(_me, "pIconImg"))))) {
  tAlignment = callMethod("getPropAt", _me.pProp[symbol("icon")][symbol("props")], 1);
  var tOptImgRect = meProp(_me, "pIconImg").rect;
  tOptImgMargH = _me.pProp[symbol("icon")][symbol("props")][tAlignment][symbol("marginH")];
  var tOptImgMargV = lingoBinary("sub", lingoBinary("div", tNewImg.height, 2), lingoBinary("div", tOptImgRect.height, 2));
  switch (tAlignment) {
case symbol("right"):
  tDstRect = lingoBinary("add", tOptImgRect, callNamed("rect", lingoBinary("sub", lingoBinary("sub", _me.pwidth, tOptImgMargH), tOptImgRect.width), tOptImgMargV, lingoBinary("sub", lingoBinary("sub", _me.pwidth, tOptImgMargH), tOptImgRect.width), tOptImgMargV));
  break;
case symbol("left"):
  tDstRect = lingoBinary("add", tOptImgRect, callNamed("rect", tOptImgMargH, tOptImgMargV, tOptImgMargH, tOptImgMargV));
  break;
case symbol("center"):
  tDstRect = lingoBinary("sub", lingoBinary("add", tOptImgRect, callNamed("rect", lingoBinary("div", tNewImg.width, 2), 0, lingoBinary("div", tNewImg.width, 2), 0)), callNamed("rect", lingoBinary("div", meProp(_me, "pIconImg"), 2), 0, lingoBinary("div", meProp(_me, "pIconImg"), 2), 0));
  break;
  }

  var tInk = _me.pProp[symbol("icon")][symbol("props")][tAlignment][symbol("ink")];
  if (callNamed("voidp", tInk)) {
  tInk = 36;
  }

  callMethod("copyPixels", tNewImg, meProp(_me, "pIconImg"), tDstRect, tOptImgRect, new LingoPropList([symbol("ink"), tInk]))
  }

  tDstRect = lingoBinary("add", tTextImg.rect, callNamed("rect", 1, tMarginV, 1, tMarginV));
  switch (tFontDesc[symbol("alignment")]) {
case symbol("left"):
  tDstRect = lingoBinary("add", tDstRect, callNamed("rect", callMethod("getProp", _me.pButtonImg, symbol("left")).width, 0, callMethod("getProp", _me.pButtonImg, symbol("left")).width, 0));
  break;
case symbol("center"):
  tDstRect = lingoBinary("sub", lingoBinary("add", tDstRect, callNamed("rect", lingoBinary("div", tNewImg.width, 2), 0, lingoBinary("div", tNewImg.width, 2), 0)), callNamed("rect", lingoBinary("div", tTextWidth, 2), 0, lingoBinary("div", tTextWidth, 2), 0));
  break;
case symbol("right"):
  tDstRect = lingoBinary("sub", lingoBinary("add", tDstRect, callNamed("rect", tNewImg.width, 0, tNewImg.width, 0)), callNamed("rect", lingoBinary("add", tTextWidth, callMethod("getProp", _me.pButtonImg, symbol("right")).width), 0, lingoBinary("add", tTextWidth, callMethod("getProp", _me.pButtonImg, symbol("right")).width), 0));
  break;
  }

  callMethod("copyPixels", tNewImg, tTextImg, tDstRect, tTextImg.rect)
  _me.pCachedImgs[tstate] = tNewImg;
  return tNewImg;
}


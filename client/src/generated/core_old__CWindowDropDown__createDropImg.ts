// core.old.cct / CWindowDropDown / createDropImg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createDropImg(_me: LingoMe, tItemsList: LingoValue, tListOfAllItemsOrNot: LingoValue, tstate: LingoValue) {
  var tStr = "";
  for (var f = 1; f <= tItemsList.count; ++f) {
  tStr = lingoBinary("join", lingoBinary("join", tStr, tItemsList[f]), "\r");
  }

  var tMemNum = callNamed("getmemnum", "dropdown.button.text");
  if (lingoBinary("eq", tMemNum, 0)) {
  tMemNum = callNamed("createMember", "dropdown.button.text", symbol("text"));
  }

  var tTextMember = callNamed("member", tMemNum);
  var tFontDesc = meProp(_me, "pProp")[tstate][symbol("text")];
  setMeProp(_me, "pMarginTop", tFontDesc[symbol("marginV")]);
  setMeProp(_me, "pMarginLeft", tFontDesc[symbol("marginH")]);
  setMeProp(_me, "pMarginBottom", tFontDesc[symbol("marginbottom")]);
  setThePropOf(tTextMember, "wordWrap", 0);
  setThePropOf(tTextMember, "font", callNamed("string", tFontDesc[symbol("font")]));
  setThePropOf(tTextMember, "fontStyle", callNamed("list", callNamed("symbol", tFontDesc[symbol("fontStyle")])));
  setThePropOf(tTextMember, "fontSize", tFontDesc[symbol("fontSize")]);
  setThePropOf(tTextMember, "color", callNamed("rgb", tFontDesc[symbol("color")]));
  setThePropOf(tTextMember, "text", tStr.line.range(1, lingoBinary("sub", tStr.line.count, 1)));
  setThePropOf(tTextMember, "fixedLineSpace", meProp(_me, "pLineHeight"));
  if (lingoBinary("and", lingoBinary("eq", tListOfAllItemsOrNot, 1), !lingoTruthy(callNamed("voidp", meProp(_me, "pProp")[symbol("optionalimage")])))) {
  var tOptionalImages = meProp(_me, "pProp")[symbol("optionalimage")][symbol("members")];
  var tOptionalImagesWidth = 0;
  for (var i = 1; i <= callMethod("count", tOptionalImages); ++i) {
  tOptionalImagesWidth = lingoBinary("add", tOptionalImagesWidth, meProp(_me, "pDropDownImg")[lingoBinary("join", "optionalimage_", callMethod("getPropAt", tOptionalImages, i))].width);
  }

  } else {
  tOptionalImagesWidth = 0;
  }

  if (lingoBinary("eq", meProp(_me, "pFixedSize"), 1)) {
  setThePropOf(tTextMember, "alignment", tFontDesc[symbol("alignment")]);
  setMeProp(_me, "pTextWidth", lingoBinary("sub", meProp(_me, "pOrigWidth"), lingoBinary("mul", meProp(_me, "pMarginLeft"), 2)));
  setThePropOf(tTextMember, "rect", callNamed("rect", 0, 0, meProp(_me, "pTextWidth"), tTextMember.height));
  var tTextImg = tTextMember.image;
  setThePropOf(_me, "pwidth", meProp(_me, "pOrigWidth"));
  } else {
  setThePropOf(tTextMember, "alignment", symbol("left"));
  if (lingoBinary("eq", tListOfAllItemsOrNot, 1)) {
  var tMaxLengt = 1;
  var tCharNum = 1;
  var tSofarChars = 0;
  for (var tLineN = 1; tLineN <= tStr.line.count; ++tLineN) {
  tSofarChars = lingoBinary("add", tSofarChars, tStr.line[tLineN].char.count);
  if (lingoBinary("gt", tStr.line[tLineN].char.count, tMaxLengt)) {
  tMaxLengt = tSofarChars;
  tCharNum = tSofarChars;
  var tTempline = tLineN;
  }

  }

  setMeProp(_me, "pTextWidth", lingoBinary("add", callMethod("charPosToLoc", tTextMember, tCharNum).locH, lingoBinary("mul", tFontDesc[symbol("fontSize")], 2)));
  setMeProp(_me, "pTextWidth", lingoBinary("sub", lingoBinary("add", meProp(_me, "pTextWidth"), lingoBinary("sub", 10, lingoBinary("mod", meProp(_me, "pTextWidth"), 10))), tOptionalImagesWidth));
  setThePropOf(_me, "pwidth", lingoBinary("add", lingoBinary("add", meProp(_me, "pTextWidth"), lingoBinary("mul", meProp(_me, "pMarginLeft"), 2)), tOptionalImagesWidth));
  }

  setThePropOf(tTextMember, "rect", callNamed("rect", 0, 0, meProp(_me, "pTextWidth"), tTextMember.height));
  setThePropOf(tTextMember, "alignment", tFontDesc[symbol("alignment")]);
  tTextImg = tTextMember.image;
  }

  var tWidth = _me.pwidth;
  var tNewImg = callNamed("image", tWidth, lingoBinary("add", lingoBinary("mul", tItemsList.count, meProp(_me, "pLineHeight")), meProp(_me, "pMarginBottom")), 8, _me.pPalette);
  var tdestrect = callNamed("rect", 0, 0, 0, 0);
  var tEndPointX = 0;
  var tEndPointY = 0;
  var tLastX = 0;
  var tStartPoint = 0;
  for (var f of new LingoList(["top", "middle", "bottom"]).toArray()) {
  tStartPoint = tEndPointY;
  tEndPointX = 0;
  switch (f) {
case "top":
  tEndPointY = lingoBinary("add", tEndPointY, meProp(_me, "pDropDownImg")[1].height);
  break;
case "middle":
  tEndPointY = lingoBinary("add", lingoBinary("sub", lingoBinary("add", tEndPointY, lingoBinary("mul", tItemsList.count, meProp(_me, "pLineHeight"))), lingoBinary("mul", tEndPointY, 2)), meProp(_me, "pMarginBottom"));
  break;
case "bottom":
  tEndPointY = lingoBinary("add", tEndPointY, meProp(_me, "pDropDownImg")[1].height);
  break;
  }

  for (var i of new LingoList(["left", "middle", "right"]).toArray()) {
  tLastX = tEndPointX;
  switch (i) {
case "left":
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", meProp(_me, "pDropDownImg"), lingoBinary("join", lingoBinary("join", f, "_"), i)).width);
  break;
case "middle":
  tEndPointX = lingoBinary("sub", lingoBinary("sub", lingoBinary("add", tEndPointX, tWidth), callMethod("getProp", meProp(_me, "pDropDownImg"), symbol("top_left")).width), callMethod("getProp", meProp(_me, "pDropDownImg"), symbol("top_right")).width);
  break;
case "right":
  tEndPointX = lingoBinary("add", tEndPointX, callMethod("getProp", meProp(_me, "pDropDownImg"), lingoBinary("join", lingoBinary("join", f, "_"), i)).width);
  break;
  }

  tdestrect = callNamed("rect", tLastX, tStartPoint, tEndPointX, tEndPointY);
  callMethod("copyPixels", tNewImg, callMethod("getProp", meProp(_me, "pDropDownImg"), lingoBinary("join", lingoBinary("join", f, "_"), i)), tdestrect, callMethod("getProp", meProp(_me, "pDropDownImg"), lingoBinary("join", lingoBinary("join", f, "_"), i)).rect, new LingoPropList([symbol("useFastQuads"), 1]))
  }

  }

  if (lingoBinary("and", lingoBinary("eq", tListOfAllItemsOrNot, 0), !lingoTruthy(callNamed("voidp", meProp(_me, "pProp")[symbol("optionalimage")])))) {
  tOptionalImages = meProp(_me, "pProp")[symbol("optionalimage")][symbol("members")];
  for (var i = 1; i <= callMethod("count", tOptionalImages); ++i) {
  var tPosition = callMethod("getPropAt", tOptionalImages, i);
  var tOptionalImg = meProp(_me, "pDropDownImg")[lingoBinary("join", "optionalimage_", callMethod("getPropAt", tOptionalImages, i))];
  var tOptionImgRect = tOptionalImg.rect;
  var tOptionImgMargH = tOptionalImages[callMethod("getPropAt", tOptionalImages, i)][symbol("marginH")];
  var tOptionImgMargV = lingoBinary("sub", lingoBinary("div", tNewImg.height, 2), lingoBinary("div", tOptionImgRect.height, 2));
  if (lingoBinary("eq", tPosition, symbol("right"))) {
  tdestrect = lingoBinary("add", tOptionImgRect, callNamed("rect", lingoBinary("sub", lingoBinary("sub", _me.pwidth, tOptionImgMargH), tOptionImgRect.width), tOptionImgMargV, lingoBinary("sub", lingoBinary("sub", _me.pwidth, tOptionImgMargH), tOptionImgRect.width), tOptionImgMargV));
  } else {
  if (lingoBinary("eq", tPosition, symbol("left"))) {
  tdestrect = lingoBinary("add", tOptionImgRect, callNamed("rect", tOptionImgMargH, tOptionImgMargV, tOptionImgMargH, tOptionImgMargV));
  }

  }

  callMethod("copyPixels", tNewImg, tOptionalImg, tdestrect, tOptionImgRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  if (lingoBinary("gt", callMethod("count", tItemsList), 1)) {
  for (var f = 1; f <= lingoBinary("sub", tItemsList.count, 1); ++f) {
  tdestrect = callNamed("rect", 0, lingoBinary("mul", f, meProp(_me, "pLineHeight")), lingoBinary("sub", tWidth, 1), lingoBinary("add", lingoBinary("mul", f, meProp(_me, "pLineHeight")), 1));
  callMethod("copyPixels", tNewImg, meProp(_me, "pDotLineImg"), tdestrect, callNamed("rect", 0, 0, lingoBinary("sub", tWidth, 1), 1), new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  tdestrect = lingoBinary("add", tTextImg.rect, callNamed("rect", 0, meProp(_me, "pMarginTop"), 0, meProp(_me, "pMarginTop")));
  switch (tFontDesc[symbol("alignment")]) {
case symbol("left"):
  tdestrect = lingoBinary("add", tdestrect, callNamed("rect", meProp(_me, "pMarginLeft"), 0, meProp(_me, "pMarginLeft"), 0));
  break;
case symbol("center"):
  tdestrect = lingoBinary("sub", lingoBinary("add", tdestrect, callNamed("rect", lingoBinary("div", tNewImg.width, 2), 0, lingoBinary("div", tNewImg.width, 2), 0)), callNamed("rect", lingoBinary("div", meProp(_me, "pTextWidth"), 2), 0, lingoBinary("div", meProp(_me, "pTextWidth"), 2), 0));
  break;
case symbol("right"):
  tdestrect = lingoBinary("sub", lingoBinary("add", tdestrect, callNamed("rect", tNewImg.width, 0, tNewImg.width, 0)), callNamed("rect", lingoBinary("add", meProp(_me, "pTextWidth"), callMethod("getProp", meProp(_me, "pDropDownImg"), "top_right").width), 0, lingoBinary("add", meProp(_me, "pTextWidth"), callMethod("getProp", meProp(_me, "pDropDownImg"), "top_right").width), 0));
  break;
  }

  callMethod("copyPixels", tNewImg, tTextImg, tdestrect, tTextImg.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  return tNewImg;
}


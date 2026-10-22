// core.old.cct / CWindowTextWrapper / createImgFromTxt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createImgFromTxt(_me: LingoMe) {
  setThePropOf(meProp(_me, "pTextMem"), "rect", callNamed("rect", 0, 0, _me.pOwnW, _me.pOwnH));
  if (!lingoTruthy(callNamed("listp", meProp(_me, "pFontData")[symbol("fontStyle")]))) {
  var tList = new LingoList([]);
  var tDelim = theProperty("itemDelimiter");
  setTheProperty("itemDelimiter", ",");
  for (var i = 1; i <= meProp(_me, "pFontData")[symbol("fontStyle")].item.count; ++i) {
  callMethod("add", tList, callNamed("symbol", meProp(_me, "pFontData")[symbol("fontStyle")].item[i]))
  }

  setTheProperty("itemDelimiter", tDelim);
  meProp(_me, "pFontData")[symbol("fontStyle")] = tList;
  }

  if (!lingoTruthy(callNamed("voidp", meProp(_me, "pFontData")[symbol("text")]))) {
  setThePropOf(meProp(_me, "pTextMem"), "text", meProp(_me, "pFontData")[symbol("text")]);
  meProp(_me, "pFontData")[symbol("text")] = undefined;
  } else {
  if (lingoBinary("eq", meProp(_me, "pFontData")[symbol("key")], "")) {
  setThePropOf(meProp(_me, "pTextMem"), "text", "");
  } else {
  if (lingoBinary("eq", meProp(_me, "pFontData")[symbol("key")].char[1], "%")) {
  var tKey = callNamed("symbol", meProp(_me, "pFontData")[symbol("key")].char.range(2, callNamed("length", meProp(_me, "pFontData")[symbol("key")])));
  setThePropOf(meProp(_me, "pTextMem"), "text", callNamed("string", callMethod("getProperty", callNamed("getObject", _me.pMotherId), tKey)));
  } else {
  if (callNamed("textExists", meProp(_me, "pFontData")[symbol("key")])) {
  setThePropOf(meProp(_me, "pTextMem"), "text", callMethod("get", callNamed("getTextManager"), meProp(_me, "pFontData")[symbol("key")]));
  } else {
  callNamed("error", _me, lingoBinary("joinPad", "Text not found:", meProp(_me, "pFontData")[symbol("key")]), symbol("createImgFromTxt"))
  setThePropOf(meProp(_me, "pTextMem"), "text", meProp(_me, "pFontData")[symbol("key")]);
  }

  }

  }

  }

  meProp(_me, "pFontData")[symbol("text")] = meProp(_me, "pTextMem").text;
  if (lingoBinary("neq", meProp(_me, "pTextMem").fontStyle, meProp(_me, "pFontData")[symbol("fontStyle")])) {
  setThePropOf(meProp(_me, "pTextMem"), "fontStyle", meProp(_me, "pFontData")[symbol("fontStyle")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").wordWrap, meProp(_me, "pFontData")[symbol("wordWrap")])) {
  setThePropOf(meProp(_me, "pTextMem"), "wordWrap", meProp(_me, "pFontData")[symbol("wordWrap")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").alignment, meProp(_me, "pFontData")[symbol("alignment")])) {
  setThePropOf(meProp(_me, "pTextMem"), "alignment", meProp(_me, "pFontData")[symbol("alignment")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").bgColor, meProp(_me, "pFontData")[symbol("bgColor")])) {
  setThePropOf(meProp(_me, "pTextMem"), "bgColor", meProp(_me, "pFontData")[symbol("bgColor")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").font, meProp(_me, "pFontData")[symbol("font")])) {
  setThePropOf(meProp(_me, "pTextMem"), "font", meProp(_me, "pFontData")[symbol("font")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").fontSize, meProp(_me, "pFontData")[symbol("fontSize")])) {
  setThePropOf(meProp(_me, "pTextMem"), "fontSize", meProp(_me, "pFontData")[symbol("fontSize")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").color, meProp(_me, "pFontData")[symbol("color")])) {
  setThePropOf(meProp(_me, "pTextMem"), "color", meProp(_me, "pFontData")[symbol("color")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").fixedLineSpace, meProp(_me, "pFontData")[symbol("fixedLineSpace")])) {
  setThePropOf(meProp(_me, "pTextMem"), "fixedLineSpace", meProp(_me, "pFontData")[symbol("fixedLineSpace")]);
  }

  if (lingoBinary("neq", meProp(_me, "pTextMem").antialias, meProp(_me, "pFontData")[symbol("antialias")])) {
  setThePropOf(meProp(_me, "pTextMem"), "antialias", meProp(_me, "pFontData")[symbol("antialias")]);
  setThePropOf(meProp(_me, "pTextMem"), "antiAliasThreshold", meProp(_me, "pFontData")[symbol("antiAliasThreshold")]);
  }

  if (lingoBinary("eq", _me.pScaleH, symbol("center"))) {
  var tWidth = lingoBinary("add", callMethod("charPosToLoc", meProp(_me, "pTextMem"), meProp(_me, "pTextMem").char.count).locH, 16);
  if (lingoBinary("eq", _me.pProps[symbol("style")], symbol("unique"))) {
  setThePropOf(_me, "pLocX", lingoBinary("add", _me.pLocX, lingoBinary("div", lingoBinary("sub", _me.pwidth, tWidth), 2)));
  setThePropOf(_me, "pwidth", tWidth);
  setThePropOf(_me, "pOwnW", tWidth);
  } else {
  setThePropOf(_me, "pOwnX", lingoBinary("add", _me.pOwnX, lingoBinary("div", lingoBinary("sub", _me.pOwnW, tWidth), 2)));
  setThePropOf(_me, "pOwnW", tWidth);
  }

  setThePropOf(meProp(_me, "pTextMem"), "rect", callNamed("rect", 0, 0, tWidth, meProp(_me, "pTextMem").height));
  } else {
  if (lingoBinary("eq", _me.pProps[symbol("style")], symbol("unique"))) {
  setThePropOf(_me, "pwidth", meProp(_me, "pTextMem").image.width);
  setThePropOf(_me, "pOwnW", _me.pwidth);
  } else {
  setThePropOf(_me, "pOwnW", meProp(_me, "pTextMem").image.width);
  }

  }

  if (lingoBinary("gt", _me.pScrolls.count, 0)) {
  var tHeight = meProp(_me, "pTextMem").rect.height;
  } else {
  tHeight = _me.pOwnH;
  }

  setThePropOf(_me, "pImage", callNamed("image", _me.pOwnW, tHeight, _me.pDepth, _me.pPalette));
  var tTemp = meProp(_me, "pTextMem").image;
  if (!lingoTruthy(callNamed("voidp", _me.pImage))) {
  if (meProp(_me, "pNeedFill")) {
  callMethod("fill", _me.pImage, _me.pImage.rect, _me.pFontData[symbol("bgColor")])
  }

  if (lingoBinary("or", !lingoTruthy(_me.pProps.alpha), lingoBinary("lt", _me.pImage.depth, 32))) {
  callMethod("copyPixels", _me.pImage, tTemp, _me.pImage.rect, _me.pImage.rect, new LingoPropList([symbol("ink"), 8, symbol("useFastQuads"), 1]))
  } else {
  setThePropOf(tTemp, "useAlpha", 1);
  callMethod("copyPixels", _me.pImage, tTemp, _me.pImage.rect, _me.pImage.rect)
  var tAlpha = callNamed("image", _me.pImage.width, _me.pImage.height, 8, symbol("grayscale"));
  callMethod("copyPixels", tAlpha, callMethod("extractAlpha", tTemp), tTemp.rect, tTemp.rect)
  setThePropOf(_me.pImage, "useAlpha", 1);
  callMethod("setAlpha", _me.pImage, tAlpha)
  }

  return 1;
  } else {
  callNamed("error", _me, lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", "Failed to create render output image(", _me.pOwnW), ","), tHeight), ","), _me.pDepth), ")"), symbol("createImgFromTxt"))
  return 0;
  }

}


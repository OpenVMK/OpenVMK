// core.old.cct / CWindowUniqueElement / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, tProps: LingoValue) {
  setMeProp(_me, "pID", tProps[symbol("id")]);
  setMeProp(_me, "pMotherId", tProps[symbol("mother")]);
  setMeProp(_me, "pType", tProps[symbol("type")]);
  setMeProp(_me, "pScaleH", tProps[symbol("scaleH")]);
  setMeProp(_me, "pScaleV", tProps[symbol("scaleV")]);
  setMeProp(_me, "pBuffer", tProps[symbol("buffer")]);
  setMeProp(_me, "pSprite", tProps[symbol("sprite")]);
  setMeProp(_me, "pLocX", tProps[symbol("locH")]);
  setMeProp(_me, "pLocY", tProps[symbol("locV")]);
  setMeProp(_me, "pwidth", tProps[symbol("width")]);
  setMeProp(_me, "pheight", tProps[symbol("height")]);
  setMeProp(_me, "pPalette", tProps[symbol("palette")]);
  setMeProp(_me, "pUseAlpha", tProps[symbol("alpha")]);
  setMeProp(_me, "pProps", tProps);
  setMeProp(_me, "pDepth", theProperty("stage").image.depth);
  setMeProp(_me, "pVisible", 1);
  if (callNamed("voidp", meProp(_me, "pPalette"))) {
  setMeProp(_me, "pPalette", symbol("systemMac"));
  } else {
  if (callNamed("stringp", meProp(_me, "pPalette"))) {
  setMeProp(_me, "pPalette", callNamed("member", callMethod("getmemnum", callNamed("getResourceManager"), meProp(_me, "pPalette"))));
  }

  }

  var tMemNum = callMethod("getmemnum", callNamed("getResourceManager"), meProp(_me, "pProps")[symbol("member")]);
  if (lingoBinary("gt", tMemNum, 0)) {
  var tmember = callNamed("member", tMemNum);
  if (lingoBinary("eq", tmember._type, symbol("bitmap"))) {
  setMeProp(_me, "pImage", callMethod("duplicate", tmember.image));
  setMeProp(_me, "pDepth", tmember.image.depth);
  if (lingoBinary("neq", meProp(_me, "pImage").paletteRef, meProp(_me, "pPalette"))) {
  setThePropOf(meProp(_me, "pImage"), "paletteRef", meProp(_me, "pPalette"));
  }

  if (meProp(_me, "pUseAlpha")) {
  if (lingoBinary("gte", meProp(_me, "pDepth"), 32)) {
  setThePropOf(meProp(_me, "pImage"), "useAlpha", tmember.image.useAlpha);
  }

  }

  }

  }

  if (callNamed("voidp", meProp(_me, "pImage"))) {
  setMeProp(_me, "pDepth", theProperty("stage").image.depth);
  setMeProp(_me, "pImage", callNamed("image", 1, 1, meProp(_me, "pDepth"), meProp(_me, "pPalette")));
  }

  if (meProp(_me, "pProps")[symbol("flipH")]) {
  callMethod("flipH", _me)
  }

  if (meProp(_me, "pProps")[symbol("flipV")]) {
  callMethod("flipV", _me)
  }

  setMeProp(_me, "pParams", new LingoPropList([symbol("useFastQuads"), 1]));
  if (lingoBinary("lt", tProps[symbol("blend")], 100)) {
  meProp(_me, "pParams")[symbol("blend")] = tProps[symbol("blend")];
  }

  if (lingoBinary("neq", tProps[symbol("color")], callNamed("rgb", 0, 0, 0))) {
  meProp(_me, "pParams")[symbol("color")] = tProps[symbol("color")];
  }

  if (lingoBinary("neq", tProps[symbol("bgColor")], callNamed("rgb", 255, 255, 255))) {
  meProp(_me, "pParams")[symbol("bgColor")] = tProps[symbol("bgColor")];
  }

  if (lingoBinary("neq", tProps[symbol("ink")], 0)) {
  meProp(_me, "pParams")[symbol("ink")] = tProps[symbol("ink")];
  }

  return 1;
}


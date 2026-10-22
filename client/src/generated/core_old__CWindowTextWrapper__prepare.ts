// core.old.cct / CWindowTextWrapper / prepare

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function prepare(_me: LingoMe, _this: LingoValue) {
  setThePropOf(_this, "pOffX", 0);
  setThePropOf(_this, "pOffY", 0);
  setThePropOf(_this, "pOwnW", _this.pProps[symbol("width")]);
  setThePropOf(_this, "pOwnH", _this.pProps[symbol("height")]);
  setThePropOf(_this, "pScrolls", new LingoList([]));
  if (lingoBinary("eq", _this.pProps[symbol("style")], symbol("unique"))) {
  setThePropOf(_this, "pOwnX", 0);
  setThePropOf(_this, "pOwnY", 0);
  } else {
  setThePropOf(_this, "pOwnX", _this.pProps[symbol("locH")]);
  setThePropOf(_this, "pOwnY", _this.pProps[symbol("locV")]);
  }

  setMeProp(_me, "pFontData", new LingoPropList([]));
  meProp(_me, "pFontData")[symbol("color")] = _this.pProps[symbol("txtColor")];
  meProp(_me, "pFontData")[symbol("bgColor")] = _this.pProps[symbol("txtBgColor")];
  meProp(_me, "pFontData")[symbol("key")] = _this.pProps[symbol("key")];
  meProp(_me, "pFontData")[symbol("wordWrap")] = _this.pProps[symbol("wordWrap")];
  meProp(_me, "pFontData")[symbol("alignment")] = callNamed("symbol", _this.pProps[symbol("alignment")]);
  meProp(_me, "pFontData")[symbol("font")] = _this.pProps[symbol("font")];
  meProp(_me, "pFontData")[symbol("fontSize")] = _this.pProps[symbol("fontSize")];
  meProp(_me, "pFontData")[symbol("fontStyle")] = _this.pProps[symbol("fontStyle")];
  meProp(_me, "pFontData")[symbol("antialias")] = _this.pProps[symbol("antialias")];
  switch (meProp(_me, "pFontData")[symbol("antialias")]) {
case undefined:
case 0:
  meProp(_me, "pFontData")[symbol("antialias")] = 0;
  meProp(_me, "pFontData")[symbol("antiAliasThreshold")] = 1;
  break;
case 1:
  meProp(_me, "pFontData")[symbol("antialias")] = 1;
  meProp(_me, "pFontData")[symbol("antiAliasThreshold")] = 1;
  break;
  break;
  }

  if (callNamed("integerp", _this.pProps[symbol("fixedLineSpace")])) {
  meProp(_me, "pFontData")[symbol("fixedLineSpace")] = _this.pProps[symbol("fixedLineSpace")];
  } else {
  meProp(_me, "pFontData")[symbol("fixedLineSpace")] = _this.pProps[symbol("fontSize")];
  }

  if (callNamed("voidp", meProp(_me, "pFontData")[symbol("key")])) {
  meProp(_me, "pFontData")[symbol("key")] = "";
  }

  if (lingoBinary("neq", meProp(_me, "pFontData")[symbol("bgColor")], callNamed("rgb", 255, 255, 255))) {
  setMeProp(_me, "pNeedFill", 1);
  } else {
  setMeProp(_me, "pNeedFill", 0);
  }

  callMethod("initResources", _this, meProp(_me, "pFontData"))
  return callMethod("createImgFromTxt", _this);
}


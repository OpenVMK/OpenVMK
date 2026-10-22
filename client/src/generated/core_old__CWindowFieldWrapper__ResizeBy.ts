// core.old.cct / CWindowFieldWrapper / ResizeBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeBy(_me: LingoMe, tOffH: LingoValue, tOffV: LingoValue) {
  if (lingoBinary("or", lingoBinary("neq", tOffH, 0), lingoBinary("neq", tOffV, 0))) {
  if (lingoBinary("eq", _me.pProps[symbol("style")], symbol("unique"))) {
  switch (_me.pScaleH) {
case symbol("move"):
  callMethod("moveBy", _me, tOffH, 0)
  break;
case symbol("scale"):
  setThePropOf(_me, "pwidth", lingoBinary("add", _me.pwidth, tOffH));
  break;
case symbol("center"):
  callMethod("moveBy", _me, lingoBinary("div", tOffH, 2), 0)
  break;
  }

  switch (_me.pScaleV) {
case symbol("move"):
  callMethod("moveBy", _me, 0, tOffV)
  break;
case symbol("scale"):
  setThePropOf(_me, "pheight", lingoBinary("add", _me.pheight, tOffV));
  break;
case symbol("center"):
  callMethod("moveBy", _me, 0, lingoBinary("div", tOffV, 2))
  break;
  }

  if (lingoBinary("lt", _me.pwidth, 1)) {
  setThePropOf(_me, "pwidth", 1);
  }

  if (lingoBinary("lt", _me.pheight, 1)) {
  setThePropOf(_me, "pheight", 1);
  }

  setMeProp(_me, "pOwnW", _me.pwidth);
  setMeProp(_me, "pOwnH", _me.pheight);
  setThePropOf(_me.pBuffer, "image", callNamed("image", meProp(_me, "pOwnW"), meProp(_me, "pOwnH"), _me.pDepth));
  setThePropOf(_me.pBuffer, "regPoint", callNamed("point", 0, 0));
  setThePropOf(_me.pSprite, "width", meProp(_me, "pOwnW"));
  setThePropOf(_me.pSprite, "height", meProp(_me, "pOwnH"));
  } else {
  switch (_me.pScaleH) {
case symbol("move"):
  setMeProp(_me, "pOwnX", lingoBinary("add", meProp(_me, "pOwnX"), tOffH));
  break;
case symbol("scale"):
  setMeProp(_me, "pOwnW", lingoBinary("add", meProp(_me, "pOwnW"), tOffH));
  break;
case symbol("center"):
  setMeProp(_me, "pOwnX", lingoBinary("add", meProp(_me, "pOwnX"), lingoBinary("div", tOffH, 2)));
  break;
  }

  switch (_me.pScaleV) {
case symbol("move"):
  setMeProp(_me, "pOwnY", lingoBinary("add", meProp(_me, "pOwnY"), tOffV));
  break;
case symbol("scale"):
  setMeProp(_me, "pOwnH", lingoBinary("add", meProp(_me, "pOwnH"), tOffV));
  break;
case symbol("center"):
  setMeProp(_me, "pOwnY", lingoBinary("add", meProp(_me, "pOwnY"), lingoBinary("div", tOffV, 2)));
  break;
  }

  }

  callMethod("registerScroll", _me)
  callMethod("render", _me)
  }

}


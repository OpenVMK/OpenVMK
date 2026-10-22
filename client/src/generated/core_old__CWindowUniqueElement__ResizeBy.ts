// core.old.cct / CWindowUniqueElement / ResizeBy

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
  switch (meProp(_me, "pScaleH")) {
case symbol("move"):
  callMethod("moveBy", _me, tOffH, 0)
  break;
case symbol("scale"):
  setThePropOf(meProp(_me, "pSprite"), "width", lingoBinary("add", meProp(_me, "pSprite").width, tOffH));
  break;
case symbol("center"):
  callMethod("moveBy", _me, lingoBinary("div", tOffH, 2), 0)
  break;
  }

  switch (meProp(_me, "pScaleV")) {
case symbol("move"):
  callMethod("moveBy", _me, 0, tOffV)
  break;
case symbol("scale"):
  setThePropOf(meProp(_me, "pSprite"), "height", lingoBinary("add", meProp(_me, "pSprite").height, tOffV));
  break;
case symbol("center"):
  callMethod("moveBy", _me, 0, lingoBinary("div", tOffV, 2))
  break;
  }

  setMeProp(_me, "pwidth", meProp(_me, "pSprite").width);
  setMeProp(_me, "pheight", meProp(_me, "pSprite").height);
  callMethod("render", _me)
  }

}


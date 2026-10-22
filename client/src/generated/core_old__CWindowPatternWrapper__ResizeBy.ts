// core.old.cct / CWindowPatternWrapper / ResizeBy

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
  switch (_me.pScaleH) {
case symbol("move"):
  setThePropOf(_me, "pLocX", lingoBinary("add", _me.pLocX, tOffH));
  break;
case symbol("scale"):
  setThePropOf(_me, "pwidth", lingoBinary("add", _me.pwidth, tOffH));
  break;
case symbol("center"):
  setThePropOf(_me, "pLocX", lingoBinary("add", _me.pLocX, lingoBinary("div", tOffH, 2)));
  break;
  }

  switch (_me.pScaleV) {
case symbol("move"):
  setThePropOf(_me, "pLocY", lingoBinary("add", _me.pLocY, tOffV));
  break;
case symbol("scale"):
  setThePropOf(_me, "pheight", lingoBinary("add", _me.pheight, tOffV));
  break;
case symbol("center"):
  setThePropOf(_me, "pLocY", lingoBinary("add", _me.pLocY, lingoBinary("div", tOffV, 2)));
  break;
  }

  callMethod("render", _me)
  }

}


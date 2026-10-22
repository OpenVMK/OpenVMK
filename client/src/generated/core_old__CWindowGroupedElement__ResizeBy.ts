// core.old.cct / CWindowGroupedElement / ResizeBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeBy(_me: LingoMe, tOffH: LingoValue, tOffV: LingoValue) {
  switch (meProp(_me, "pScaleH")) {
case symbol("move"):
  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), tOffH));
  break;
case symbol("center"):
  setMeProp(_me, "pLocX", lingoBinary("add", meProp(_me, "pLocX"), lingoBinary("div", tOffH, 2)));
  break;
case symbol("scale"):
  setMeProp(_me, "pwidth", lingoBinary("add", meProp(_me, "pwidth"), tOffH));
  break;
  }

  switch (meProp(_me, "pScaleV")) {
case symbol("move"):
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), tOffV));
  break;
case symbol("center"):
  setMeProp(_me, "pLocY", lingoBinary("add", meProp(_me, "pLocY"), lingoBinary("div", tOffV, 2)));
  break;
case symbol("scale"):
  setMeProp(_me, "pheight", lingoBinary("add", meProp(_me, "pheight"), tOffV));
  break;
  }

  callMethod("render", _me)
}


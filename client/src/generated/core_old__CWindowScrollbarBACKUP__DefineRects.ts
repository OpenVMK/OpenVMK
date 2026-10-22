// core.old.cct / CWindowScrollbarBACKUP / DefineRects

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DefineRects(_me: LingoMe, tElementPart: LingoValue) {
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  var tRect = meProp(_me, "pButtonImg")[lingoBinary("join", tElementPart, "_up")].rect;
  switch (tElementPart) {
case symbol("lift"):
  tRect = lingoBinary("add", tRect, callNamed("rect", 0, meProp(_me, "pButtonImg")["top_up"].height, 0, meProp(_me, "pButtonImg")["top_up"].height));
  break;
case symbol("bottom"):
  tRect = lingoBinary("add", tRect, callNamed("rect", 0, lingoBinary("sub", _me.pheight, meProp(_me, "pButtonImg")["bottom_up"].height), 0, lingoBinary("sub", _me.pheight, meProp(_me, "pButtonImg")["bottom_up"].height)));
  break;
case symbol("bar"):
  tRect = lingoBinary("add", tRect, callNamed("rect", 0, meProp(_me, "pButtonImg")[symbol("top_up")].height, 0, lingoBinary("sub", lingoBinary("sub", _me.pheight, meProp(_me, "pButtonImg")[symbol("bottom_up")].height), 1)));
  break;
  }

  callMethod("addProp", meProp(_me, "pRects"), tElementPart, tRect)
  } else {
  tRect = meProp(_me, "pButtonImg")[lingoBinary("join", tElementPart, "_up")].rect;
  switch (tElementPart) {
case symbol("lift"):
  tRect = lingoBinary("add", tRect, callNamed("rect", meProp(_me, "pButtonImg")["top_up"].width, 0, meProp(_me, "pButtonImg")["top_up"].width, 0));
  break;
case symbol("bottom"):
  tRect = lingoBinary("add", tRect, callNamed("rect", lingoBinary("sub", _me.pwidth, meProp(_me, "pButtonImg")["bottom_up"].width), 0, lingoBinary("sub", _me.pwidth, meProp(_me, "pButtonImg")["bottom_up"].width), 0));
  break;
case symbol("bar"):
  tRect = lingoBinary("add", tRect, callNamed("rect", meProp(_me, "pButtonImg")[symbol("top_up")].width, 0, lingoBinary("sub", lingoBinary("sub", _me.pwidth, meProp(_me, "pButtonImg")[symbol("bottom_up")].width), 1), 0));
  break;
  }

  callMethod("addProp", meProp(_me, "pRects"), tElementPart, tRect)
  }

}


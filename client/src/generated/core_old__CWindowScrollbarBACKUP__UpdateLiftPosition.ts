// core.old.cct / CWindowScrollbarBACKUP / UpdateLiftPosition

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateLiftPosition(_me: LingoMe) {
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  var tMoveAreaV = lingoBinary("sub", meProp(_me, "pRects")[symbol("bar")].height, meProp(_me, "pRects")[symbol("lift")].height);
  var tNewOffset = callNamed("integer", lingoBinary("mul", callMethod("ScrollBarPercentV", _me), tMoveAreaV));
  meProp(_me, "pRects")[symbol("lift")] = callNamed("rect", 0, lingoBinary("add", tNewOffset, meProp(_me, "pRects")[symbol("top")].height), meProp(_me, "pRects")[symbol("lift")].width, lingoBinary("add", lingoBinary("add", tNewOffset, meProp(_me, "pRects")[symbol("top")].height), meProp(_me, "pRects")[symbol("lift")].height));
  } else {
  tMoveAreaV = lingoBinary("sub", meProp(_me, "pRects")[symbol("bar")].width, meProp(_me, "pRects")[symbol("lift")].width);
  tNewOffset = callNamed("integer", lingoBinary("mul", callMethod("ScrollBarPercentH", _me), tMoveAreaV));
  meProp(_me, "pRects")[symbol("lift")] = callNamed("rect", lingoBinary("add", tNewOffset, meProp(_me, "pRects")[symbol("top")].width), 0, lingoBinary("add", lingoBinary("add", tNewOffset, meProp(_me, "pRects")[symbol("top")].width), meProp(_me, "pRects")[symbol("lift")].width), meProp(_me, "pRects")[symbol("lift")].height);
  }

}


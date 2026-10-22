// core.old.cct / CWindowScrollbar / ResizeBy

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
  setThePropOf(_me.pSprite, "locH", lingoBinary("add", _me.pSprite.locH, tOffH));
  break;
case symbol("scale"):
  setThePropOf(_me.pSprite, "width", lingoBinary("add", _me.pSprite.width, tOffH));
  break;
case symbol("center"):
  setThePropOf(_me.pSprite, "locH", lingoBinary("add", _me.pSprite.locH, lingoBinary("div", tOffH, 2)));
  break;
  }

  switch (_me.pScaleV) {
case symbol("move"):
  setThePropOf(_me.pSprite, "locV", lingoBinary("add", _me.pSprite.locV, tOffV));
  break;
case symbol("scale"):
  setThePropOf(_me.pSprite, "height", lingoBinary("add", _me.pSprite.height, tOffV));
  break;
case symbol("center"):
  setThePropOf(_me.pSprite, "locV", lingoBinary("add", _me.pSprite.locV, lingoBinary("div", tOffV, 2)));
  break;
  }

  setMeProp(_me, "pRects", new LingoPropList([]));
  setMeProp(_me, "pState", symbol("waitMouseEvent"));
  setMeProp(_me, "pScrollOffset", 0);
  setMeProp(_me, "pButtonStates", new LingoPropList([symbol("top"), symbol("up"), symbol("bottom"), symbol("up"), symbol("bar"), symbol("up"), symbol("lift"), symbol("up")]));
  if (lingoBinary("eq", _me.pType, "scrollbarv")) {
  setThePropOf(_me, "pwidth", meProp(_me, "pButtonImg")["top_up"].width);
  setThePropOf(_me, "pheight", _me.pSprite.height);
  } else {
  setThePropOf(_me, "pwidth", _me.pSprite.width);
  setThePropOf(_me, "pheight", meProp(_me, "pButtonImg")["top_up"].height);
  }

  if (lingoBinary("lt", _me.pwidth, 1)) {
  setThePropOf(_me, "pwidth", 1);
  }

  if (lingoBinary("lt", _me.pheight, 1)) {
  setThePropOf(_me, "pheight", 1);
  }

  callMethod("UpdateImageObjects", _me, undefined, new LingoList([symbol("up"), symbol("down"), symbol("passive")]))
  setThePropOf(_me, "pImage", callNamed("image", _me.pwidth, _me.pheight, 8, _me.pPalette));
  callMethod("UpdateScrollBar", _me, new LingoList([symbol("top"), symbol("bottom"), symbol("bar"), symbol("lift")]), symbol("up"))
  var tTempOffset = _me.pBuffer.regPoint;
  setThePropOf(_me.pBuffer, "image", _me.pImage);
  setThePropOf(_me.pBuffer, "regPoint", tTempOffset);
  }

}


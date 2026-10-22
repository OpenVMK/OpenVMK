// core.old.cct / CWindowElementWrapper / ResizeBy

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResizeBy(_me: LingoMe, _this: LingoValue, tOffW: LingoValue, tOffH: LingoValue) {
  if (lingoBinary("or", lingoBinary("neq", tOffW, 0), lingoBinary("neq", tOffH, 0))) {
  switch (meProp(_me, "pScaleH")) {
case symbol("fixed"):
  tOffW = 0;
  break;
case symbol("scale"):
  setMeProp(_me, "pwidth", lingoBinary("add", meProp(_me, "pwidth"), tOffW));
  break;
case symbol("move"):
  callMethod("moveBy", _this, tOffW, 0)
  break;
case symbol("center"):
  callMethod("moveBy", _this, lingoBinary("div", tOffW, 2), 0)
  break;
  }

  if (lingoBinary("neq", meProp(_me, "pScaleH"), symbol("scale"))) {
  tOffW = 0;
  }

  switch (meProp(_me, "pScaleV")) {
case symbol("fixed"):
  tOffH = 0;
  break;
case symbol("scale"):
  setMeProp(_me, "pheight", lingoBinary("add", meProp(_me, "pheight"), tOffH));
  break;
case symbol("move"):
  callMethod("moveBy", _this, 0, tOffH)
  break;
case symbol("center"):
  callMethod("moveBy", _this, 0, lingoBinary("div", tOffH, 2))
  break;
  }

  if (lingoBinary("neq", meProp(_me, "pScaleV"), symbol("scale"))) {
  tOffH = 0;
  }

  if (lingoBinary("or", lingoBinary("neq", tOffW, 0), lingoBinary("neq", tOffH, 0))) {
  if (lingoBinary("lt", meProp(_me, "pwidth"), 1)) {
  setMeProp(_me, "pwidth", 1);
  }

  if (lingoBinary("lt", meProp(_me, "pheight"), 1)) {
  setMeProp(_me, "pheight", 1);
  }

  setThePropOf(meProp(_me, "pBuffer"), "image", callNamed("image", meProp(_me, "pwidth"), meProp(_me, "pheight"), meProp(_me, "pBuffer").image.depth, meProp(_me, "pPalette")));
  setThePropOf(meProp(_me, "pBuffer"), "regPoint", callNamed("point", 0, 0));
  setThePropOf(meProp(_me, "pSprite"), "width", meProp(_me, "pwidth"));
  setThePropOf(meProp(_me, "pSprite"), "height", meProp(_me, "pheight"));
  setThePropOf(meProp(_me, "pSprite"), "stretch", 0);
  if (meProp(_me, "pUseAlpha")) {
  if (lingoBinary("eq", meProp(_me, "pBuffer").image.depth, 32)) {
  setThePropOf(meProp(_me, "pBuffer").image, "useAlpha", 1);
  var tAlpha = callNamed("image", meProp(_me, "pwidth"), meProp(_me, "pheight"), 8, symbol("grayscale"));
  /*
   * ⚠ HAND-CORRECTED: fill BLACK, not white — the SAME inverted-polarity bug as
   * core_old__CWindow__buildVisual (see the long note there). This is the RESIZE
   * path: whenever a window resizes (a content group is added -> ResizeTo), the
   * element buffer is recreated here and its alpha reset. The original fills the
   * mask white, which in THIS port's inverted level-plane polarity means level 0
   * -> setAlpha alpha 0 = FULLY TRANSPARENT, re-opening the see-through that
   * buildVisual's fix had closed (this is why Settings, which resizes, still
   * showed the room after the build fix). fill(BLACK) -> level 255 -> alpha 255 =
   * OPAQUE, matching the OG intent. See [[window-seethrough-strech]].
   */
  callMethod("fill", tAlpha, tAlpha.rect, callNamed("rgb", 0, 0, 0))
  callMethod("setAlpha", meProp(_me, "pBuffer").image, tAlpha)
  }

  }

  callNamed("call", symbol("ResizeBy"), meProp(_me, "pElemList"), tOffW, tOffH)
  }

  }

}


// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePins / _PinPreviewReady

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PinPreviewReady(_me: LingoMe, _this: LingoValue, a_mp_iType_rThumb: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (a_mp_iType_rThumb.count) {
  var t_rBack = callMethod("duplicate", meProp(_me, "m_rPrevBackImage"));
  var t_rPrev = a_mp_iType_rThumb[1];
  if (callNamed("voidp", t_rPrev)) {
  t_rPrev = callNamed("image", 1, 1, 32);
  }

  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rBack.width, t_rPrev.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rBack.height, t_rPrev.height), 2);
  setThePropOf(t_rBack, "useAlpha", 0);
  /*
   * ⚠ HAND-CORRECTED: the pin bitmap must be composited RESPECTING its alpha, so
   * the card frame shows through the pin's transparent corners. The pin preview
   * is `duplicate(item_<code>.image)`, and our extraction loads that 32-bit art
   * with useAlpha=0 (Director defaults 32-bit alpha art to useAlpha=1). With copy
   * ink and useAlpha=0 the copy takes the opaque-replace branch, which preserved
   * the PNG's own alpha and PUNCHED TRANSPARENT HOLES through the frame — read as
   * a white surround on the panel. Forcing useAlpha=1 takes the source-over
   * branch instead (frame kept where the pin is transparent; MEASURED holes 614→0,
   * corners now show the frame). See copyPixels + [[avatar-arrow-two-render-gaps]].
   */
  setThePropOf(t_rPrev, "useAlpha", 1);
  callMethod("copyPixels", t_rBack, t_rPrev, lingoBinary("add", t_rPrev.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), t_rPrev.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  } else {
  t_rPrev = callNamed("image", 1, 1, 32);
  }

  var t_rSelected = callMethod("GetSelected", _this);
  if (callNamed("integerp", callMethod("getaProp", t_rSelected, symbol("param")))) {
  var t_rStar = callNamed("getMember", "inv.pin.star.prev").image;
  var t_rRect = t_rStar.rect;
  var t_rcOff = new LingoList([20, 115, 20, 115]);
  for (var s = 1; s <= callMethod("getaProp", t_rSelected, symbol("param")); ++s) {
  callMethod("copyPixels", t_rBack, t_rStar, lingoBinary("add", lingoBinary("add", t_rRect, t_rcOff), new LingoList([lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 2)), 3), 0, lingoBinary("add", lingoBinary("mul", lingoBinary("sub", s, 1), lingoBinary("add", t_rRect.width, 2)), 3), 0])), t_rRect, new LingoPropList([symbol("ink"), 36, symbol("useFastQuads"), 1]))
  }

  }

  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  }

}


// 565d7caa66391c8e45a3923725ba051b.cct / CInvPagePosters / _PosterPreviewReadyCbk

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PosterPreviewReadyCbk(_me: LingoMe, _this: LingoValue, a_iRef_rImage: LingoValue) {
  var t_rPrev = a_iRef_rImage[1];
  if ((lingoTruthy(callNamed("voidp", t_rPrev)) ? 0 : 1)) {
  var t_rBack = callMethod("duplicate", callNamed("getMember", "previewbox").image);
  var t_iOffX = lingoBinary("div", lingoBinary("sub", t_rBack.width, t_rPrev.width), 2);
  var t_iOffY = lingoBinary("div", lingoBinary("sub", t_rBack.height, t_rPrev.height), 2);
  setThePropOf(t_rBack, "useAlpha", 0);
  /*
   * ⚠ HAND-CORRECTED: composite the poster RESPECTING its alpha so the previewbox
   * shows through the poster's transparent margins instead of the copy punching
   * transparent holes (read as a white surround). Same fix as CInvPagePins
   * _PinPreviewReady — our extraction loads 32-bit alpha art with useAlpha=0, so
   * copy ink took the opaque-replace branch and preserved the PNG's own alpha.
   * Forcing useAlpha=1 takes the source-over branch. See [[avatar-arrow-two-render-gaps]].
   */
  setThePropOf(t_rPrev, "useAlpha", 1);
  callMethod("copyPixels", t_rBack, t_rPrev, lingoBinary("add", t_rPrev.rect, new LingoList([t_iOffX, t_iOffY, t_iOffX, t_iOffY])), t_rPrev.rect, new LingoPropList([symbol("useFastQuads"), 1]))
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "inv.preview"), t_rBack)
  }

}


// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _ReturnFurniThumbnail

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ReturnFurniThumbnail(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  var t_iCount = a_mp_iType_rOutput.count;
  for (var i = 1; i <= t_iCount; ++i) {
  var t_iTypeCode = callMethod("getPropAt", a_mp_iType_rOutput, i);
  var t_rThumb = callMethod("getaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iTypeCode);
  if (callNamed("voidp", t_rThumb)) {
  var t_rPrev = callMethod("_RenderFurniPreview", _this, t_iTypeCode);
  t_rThumb = callMethod("_ShrinkToThumbnail", _this, t_rPrev);
  /*
   * ⚠ HAND-CORRECTED: do NOT cache a thumbnail built from an EMPTY preview. When
   * the item_<code> art is not yet resident the preview crops to 1x1 and the
   * shrink still yields a blank 38x38 — caching that froze a blank/wrong grid icon
   * forever (missing penny-press, wrong carpet). Gating the cache on the preview's
   * width (> 1 means it actually drew) lets the next GetFurniThumbnail request
   * re-render it once the PNGs arrive. Mirrors the guard in _RenderFurniPreview.
   * See [[grayscale-quad-flip-ignored]].
   */
  if (lingoBinary("gt", t_rPrev.width, 1)) {
  callMethod("setaProp", meProp(_me, "m_iType_rThumbnailCache"), t_iTypeCode, t_rThumb)
  }

  }

  a_mp_iType_rOutput[i] = t_rThumb;
  }

  callNamed("call", a_rCallback.method, new LingoList([callNamed("getObject", a_rCallback.client)]), a_mp_iType_rOutput, a_rCallback)
}


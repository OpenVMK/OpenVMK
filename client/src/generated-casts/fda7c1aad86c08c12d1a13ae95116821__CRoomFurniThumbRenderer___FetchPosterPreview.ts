// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _FetchPosterPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FetchPosterPreview(_me: LingoMe, _this: LingoValue, a_mp_iType_rOutput: LingoValue, a_rCallback: LingoValue) {
  var t_iTypeCode = callMethod("getPropAt", a_mp_iType_rOutput, 1);
  var t_rImage = callMethod("getaProp", meProp(_me, "m_iType_rPreviewCache"), t_iTypeCode);
  if (callNamed("voidp", t_rImage)) {
  var t_rMember = callNamed("getMember", lingoBinary("join", lingoBinary("join", "item_", t_iTypeCode), "_5"));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  t_rImage = callMethod("duplicate", t_rMember.image);
  /*
   * ⚠ HAND-CORRECTED: carry useAlpha=1 on the poster preview so consumers that
   * composite it with copy ink onto a frame (inventory _PosterPreviewReadyCbk and
   * the shared shop CCatalogFurniView._PreviewReadyCbk) source-over instead of
   * punching transparent holes (a white surround). Our extraction loads the 32-bit
   * `item_<code>_5` art with useAlpha=0. Same fix as _RenderPinPreview. See
   * [[pin-poster-preview-usealpha]].
   */
  setThePropOf(t_rImage, "useAlpha", 1);
  callMethod("setaProp", meProp(_me, "m_iType_rPreviewCache"), t_iTypeCode, t_rImage)
  }

  }

  a_mp_iType_rOutput[1] = t_rImage;
  callNamed("call", a_rCallback.method, new LingoList([callNamed("getObject", a_rCallback.client)]), a_mp_iType_rOutput, a_rCallback)
}


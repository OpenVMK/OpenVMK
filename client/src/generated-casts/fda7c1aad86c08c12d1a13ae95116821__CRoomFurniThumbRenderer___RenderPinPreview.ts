// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFurniThumbRenderer / _RenderPinPreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _RenderPinPreview(_me: LingoMe, _this: LingoValue, a_iTypeCode: LingoValue, a_rItem: LingoValue) {
  var t_rImage = callMethod("getaProp", meProp(_me, "m_iType_rPreviewCache"), a_iTypeCode);
  if (callNamed("voidp", t_rImage)) {
  var t_rMember = callNamed("getMember", lingoBinary("join", "item_", a_iTypeCode));
  if (lingoBinary("gt", t_rMember._number, 0)) {
  t_rImage = callMethod("duplicate", t_rMember.image);
  /*
   * ⚠ HAND-CORRECTED: the pin preview must carry useAlpha=1, exactly as
   * _RenderFurniPreview sets on its composited output. Our extraction loads the
   * 32-bit `item_<code>` pin art with useAlpha=0, so every preview consumer that
   * composites it with copy ink onto a card/frame (the inventory _PinPreviewReady
   * AND the shared shop CCatalogFurniView._PreviewReadyCbk) took the opaque-replace
   * branch and PUNCHED TRANSPARENT HOLES through the frame — a white surround.
   * Setting it here fixes every consumer at the source (source-over keeps the
   * frame where the pin is transparent). See [[pin-poster-preview-usealpha]].
   */
  setThePropOf(t_rImage, "useAlpha", 1);
  callMethod("setaProp", meProp(_me, "m_iType_rPreviewCache"), a_iTypeCode, t_rImage)
  }

  }

  return t_rImage;
}


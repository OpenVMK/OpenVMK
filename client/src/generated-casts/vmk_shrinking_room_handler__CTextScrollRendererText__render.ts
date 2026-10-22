// vmk_shrinking_room_handler.cct / CTextScrollRendererText / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe, t_sText: LingoValue) {
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterID"));
  var t_pImage = callMethod("render", tWriter, t_sText);
  callMethod("fill", theProperty("stage").image, lingoBinary("add", t_pImage.rect, callNamed("rect", 0, 0, 20, 5)), new LingoPropList([symbol("color"), callNamed("rgb", "#000000")]))
  callMethod("copyPixels", theProperty("stage").image, t_pImage, callNamed("rect", 5, 2, lingoBinary("add", t_pImage.width, 5), lingoBinary("add", t_pImage.height, 2)), t_pImage.rect)
}


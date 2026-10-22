// vmk_musicmix1.cct / CMusicMixerSongList / getImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getImage(_me: LingoMe) {
  setMeProp(_me, "m_iLineHeight", callNamed("integer", lingoBinary("add", lingoBinary("div", meProp(_me, "m_height"), float(4)), 0.5)));
  var t_Img = callNamed("image", meProp(_me, "m_width"), meProp(_me, "m_height"), 32);
  callMethod("fill", t_Img, t_Img.rect, new LingoPropList([symbol("color"), meProp(_me, "m_fillColor")]))
  var t_rect = callNamed("rect", 0, 0, meProp(_me, "m_width"), meProp(_me, "m_iLineHeight"));
  return t_Img;
}


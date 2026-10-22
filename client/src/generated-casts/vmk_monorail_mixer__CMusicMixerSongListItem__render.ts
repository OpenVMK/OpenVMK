// vmk_monorail_mixer.cct / CMusicMixerSongListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (meProp(_me, "m_bUpdate")) {
  callMethod("ResolveImage", _me)
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterID"));
  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_sText"));
  var t_Img = callMethod("duplicate", meProp(_me, "m_pBgImg").image);
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 5, 2, lingoBinary("add", t_pImage.width, 5), lingoBinary("add", t_pImage.height, 2)), t_pImage.rect)
  setMeProp(_me, "m_pImage", t_Img);
  setMeProp(_me, "m_bUpdate", 0);
  }

}


// vmk_hm_lobby_handler.cct / CRoomInstanceListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if (meProp(_me, "m_bState")) {
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterBoldID"));
  } else {
  tWriter = callNamed("getWriter", meProp(_me, "m_sWriterPlainID"));
  }

  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  var t_Img = callMethod("duplicate", meProp(_me, "m_ImgBg"));
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  setMeProp(_me, "m_Img", t_Img);
}


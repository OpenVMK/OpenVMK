// vmk_pirates2_game_preshow_handler.cct / CRoomInstanceListItem / ResolveImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ResolveImage(_me: LingoMe) {
  setMeProp(_me, "m_ImgBg", callNamed("image", 164, 20, 32));
  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterBoldID"));
  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  var t_Img = callMethod("duplicate", meProp(_me, "m_ImgBg"));
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  setMeProp(_me, "m_imgSelected", t_Img);
  tWriter = callNamed("getWriter", meProp(_me, "m_sWriterPlainID"));
  t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  t_Img = callMethod("duplicate", meProp(_me, "m_ImgBg"));
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  setMeProp(_me, "m_imgUnselected", t_Img);
}


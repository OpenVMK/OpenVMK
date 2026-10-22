// vmk_highscore.cct / CHighscoreListItem / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if ((lingoTruthy(callNamed("writerExists", meProp(_me, "m_sWriterPlainID"))) ? 0 : 1)) {
  var tPlain = callMethod("duplicate", callNamed("getStructVariable", "struct.font.plain"));
  setThePropOf(tPlain, "color", meProp(_me, "m_textColor"));
  callMethod("setaProp", tPlain, symbol("bgColor"), callNamed("rgb", 255, 255, 255))
  callNamed("createWriter", meProp(_me, "m_sWriterPlainID"), tPlain)
  }

  var tWriter = callNamed("getWriter", meProp(_me, "m_sWriterPlainID"));
  var t_pImage = callMethod("render", tWriter, meProp(_me, "m_tText"));
  callMethod("ResolveImage", _me)
  var t_Img = meProp(_me, "m_ImgBg");
  setThePropOf(t_Img, "useAlpha", 0);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", 0, 0, t_pImage.width, t_pImage.height), t_pImage.rect)
  t_pImage = callMethod("render", tWriter, meProp(_me, "m_pLinkedPage").name);
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", meProp(_me, "m_iTab1"), 0, lingoBinary("add", t_pImage.width, meProp(_me, "m_iTab1")), t_pImage.height), t_pImage.rect)
  t_pImage = callMethod("render", tWriter, callNamed("string", meProp(_me, "m_pLinkedPage").score));
  callMethod("copyPixels", t_Img, t_pImage, callNamed("rect", meProp(_me, "m_iTab2"), 0, lingoBinary("add", t_pImage.width, meProp(_me, "m_iTab2")), t_pImage.height), t_pImage.rect)
  setMeProp(_me, "m_Img", t_Img);
}


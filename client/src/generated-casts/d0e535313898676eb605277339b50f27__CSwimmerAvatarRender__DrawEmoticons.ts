// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / DrawEmoticons

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawEmoticons(_me: LingoMe, a_Spr: LingoValue) {
  var t_sEmoticonName = lingoBinary("join", "emoticon_", meProp(_me, "m_iEmoticon"));
  if (callNamed("memberExists", t_sEmoticonName)) {
  var t_ImgEmoticon = callNamed("getMember", t_sEmoticonName).image;
  var t_ImgEmoticonAlpha = callMethod("extractAlpha", t_ImgEmoticon);
  } else {
  return 0;
  }

  setMeProp(_me, "m_iCanvasHeight", meProp(_me, "m_imgBuffer").height);
  var t_iEmoticonHeight = t_ImgEmoticon.height;
  var t_iHeight = lingoBinary("add", t_iEmoticonHeight, 10);
  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), lingoBinary("add", meProp(_me, "m_iCanvasHeight"), t_iHeight), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), lingoBinary("add", meProp(_me, "m_iCanvasHeight"), t_iHeight), 8, symbol("grayscale"));
  var t_iWidthPos = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), t_ImgEmoticon.width), 2);
  var t_i = t_iHeight;
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), callNamed("rect", 0, t_i, t_Img.width, t_Img.height), meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), callNamed("rect", 0, t_i, t_Img.width, t_Img.height), meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_Img, t_ImgEmoticon, callNamed("rect", t_iWidthPos, 0, lingoBinary("add", t_ImgEmoticon.width, t_iWidthPos), t_ImgEmoticon.height), t_ImgEmoticon.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, t_ImgEmoticonAlpha, callNamed("rect", t_iWidthPos, 0, lingoBinary("add", t_ImgEmoticonAlpha.width, t_iWidthPos), t_ImgEmoticonAlpha.height), t_ImgEmoticonAlpha.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  setMeProp(_me, "m_imgBuffer", t_Img);
  setMeProp(_me, "m_rAlpha", t_rAlpha);
  return 1;
}


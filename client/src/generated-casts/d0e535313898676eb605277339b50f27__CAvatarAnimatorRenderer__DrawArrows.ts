// d0e535313898676eb605277339b50f27.cct / CAvatarAnimatorRenderer / DrawArrows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawArrows(_me: LingoMe, a_Spr: LingoValue) {
  var t_iArrowHeight = meProp(_me, "m_rImgArrow").height;
  if (lingoBinary("gt", meProp(_me, "m_iEmoticon"), 0)) {
  var t_sEmoticonName = lingoBinary("join", "emoticon_", meProp(_me, "m_iEmoticon"));
  if (callNamed("memberExists", t_sEmoticonName)) {
  var t_iHeightVariable = lingoBinary("add", callNamed("getMember", "emoticon_1").height, 20);
  }

  } else {
  t_iHeightVariable = 10;
  }

  var t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), lingoBinary("add", meProp(_me, "m_iCanvasHeight"), lingoBinary("add", t_iArrowHeight, t_iHeightVariable)), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), lingoBinary("add", meProp(_me, "m_iCanvasHeight"), lingoBinary("add", t_iArrowHeight, t_iHeightVariable)), 8, symbol("grayscale"));
  var t_iWidthPos = lingoBinary("div", lingoBinary("sub", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_rImgArrow").width), 2);
  var t_iPos = lingoBinary("sub", t_Img.height, meProp(_me, "m_imgBuffer").height);
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), callNamed("rect", 0, t_iPos, t_Img.width, t_Img.height), meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), callNamed("rect", 0, t_iPos, t_Img.width, t_Img.height), meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_Img, meProp(_me, "m_rImgArrow"), callNamed("rect", t_iWidthPos, 0, lingoBinary("add", meProp(_me, "m_rImgArrow").width, t_iWidthPos), meProp(_me, "m_rImgArrow").height), meProp(_me, "m_rImgArrow").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rImgArrowAlpha"), callNamed("rect", t_iWidthPos, 0, lingoBinary("add", meProp(_me, "m_rImgArrowAlpha").width, t_iWidthPos), meProp(_me, "m_rImgArrowAlpha").height), meProp(_me, "m_rImgArrowAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  setMeProp(_me, "m_imgBuffer", t_Img);
  setMeProp(_me, "m_rAlpha", t_rAlpha);
}


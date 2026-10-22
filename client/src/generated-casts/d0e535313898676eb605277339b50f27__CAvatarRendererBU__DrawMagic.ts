// d0e535313898676eb605277339b50f27.cct / CAvatarRendererBU / DrawMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DrawMagic(_me: LingoMe, a_Spr: LingoValue, a_veAvatarLoc: LingoValue) {
  var t_rImg = a_Spr.member.image;
  setThePropOf(a_Spr, "blend", 100);
  switch (meProp(_me, "m_iMagic")) {
case 8:
case 9:
case 10:
case 11:
case 12:
case 14:
case 15:
case 16:
case 17:
case 18:
case 19:
case 22:
case 23:
case 24:
case 25:
case 26:
case 27:
case 28:
// HAND-CORRECTED: Confetti (34) composites onto the avatar, like lightning (27).
case 34:
case 100:
case 101:
case 102:
case 103:
case 104:
case 105:
case 106:
case 107:
case 108:
case 109:
case 110:
case 111:
case 112:
case 113:
case 114:
case 115:
  var t_iRatio = 1;
  var t_Img = callNamed("image", 80, 160, 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  var t_rAlpha = callNamed("image", 80, 160, 8, symbol("grayscale"));
  callMethod("copyPixels", t_Img, meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, meProp(_me, "m_imgBuffer").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rAlpha, meProp(_me, "m_rAlpha"), meProp(_me, "m_rAlpha").rect, meProp(_me, "m_rAlpha").rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("copyPixels", t_rImg, t_Img, t_rImg.rect, t_Img.rect, lingoBinary("eq", symbol("useFastQuads"), 1))
  callMethod("setAlpha", t_rImg, t_rAlpha)
  setThePropOf(t_rImg, "useAlpha", 1);
  var t_ImgAvatar = callMethod("update", meProp(_me, "m_Obj_Magic"), a_veAvatarLoc, a_Spr);
  if (callNamed("listp", t_ImgAvatar)) {
  setMeProp(_me, "m_imgBuffer", t_ImgAvatar[1]);
  setMeProp(_me, "m_rAlpha", t_ImgAvatar[2]);
  setMeProp(_me, "m_PntMagicRegPoint", t_ImgAvatar[3]);
  setMeProp(_me, "m_iCanvasWidth", meProp(_me, "m_imgBuffer").width);
  setMeProp(_me, "m_iCanvasHeight", meProp(_me, "m_imgBuffer").height);
  t_Img = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32);
  callMethod("fill", t_Img, t_Img.rect, callNamed("rgb", 0, 0, 0))
  t_rAlpha = callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale"));
  setThePropOf(a_Spr.member, "image", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  t_rImg = a_Spr.member.image;
  }

  break;
case 1:
case 2:
case 3:
case 13:
// HAND-CORRECTED: Levitation (35) is an overlay sprite, like the pirate sparkles (1).
case 35:
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  callMethod("update", meProp(_me, "m_Obj_Magic"), a_veAvatarLoc, a_Spr)
  }

  break;
case 4:
case 6:
case 7:
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  callMethod("update", meProp(_me, "m_Obj_Magic"), a_veAvatarLoc, a_Spr)
  setThePropOf(a_Spr, "blend", 50);
  }

  break;
case 5:
  if (callNamed("objectp", meProp(_me, "m_Obj_Magic"))) {
  callMethod("update", meProp(_me, "m_Obj_Magic"), a_veAvatarLoc, a_Spr)
  setThePropOf(a_Spr, "blend", 35);
  }

  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  break;
  }

}


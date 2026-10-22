// d0e535313898676eb605277339b50f27.cct / CSwimmerAvatarRender / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, a_mp_AvatarData: LingoValue) {
  setMeProp(_me, "m_arPartList", a_mp_AvatarData.objects);
  setMeProp(_me, "m_iBdDir", a_mp_AvatarData.BodyDir);
  setMeProp(_me, "m_iHeadDir", a_mp_AvatarData.HeadDir);
  setMeProp(_me, "m_iMyRef", a_mp_AvatarData.MyRef);
  setMeProp(_me, "m_bFlipped", a_mp_AvatarData.Flipped);
  setMeProp(_me, "m_iTileSize", a_mp_AvatarData.tilesize);
  var t_sName = a_mp_AvatarData.avatarName;
  callMethod("arrangeParts", _me)
  callMethod("Refresh", _me, meProp(_me, "m_iBdDir"), meProp(_me, "m_iHeadDir"))
  setMeProp(_me, "m_iSync", 0);
  setMeProp(_me, "m_iMagicCounter", 0);
  if (callNamed("memberExists", "avatar.arrow.32.inside")) {
  if (lingoBinary("neq", t_sName, undefined)) {
  var t_Img = callNamed("getMember", "avatar.arrow.32.inside").image;
  var t_ImgArrow = callMethod("duplicate", t_Img);
  var t_ShirtCol = callMethod("GetShirtColor", _me);
  t_Img = callNamed("image", t_ImgArrow.width, t_ImgArrow.height, 32);
  callMethod("copyPixels", t_Img, t_ImgArrow, t_ImgArrow.rect, t_ImgArrow.rect, new LingoPropList([symbol("bgColor"), t_ShirtCol]))
  var t_ImgInside = callNamed("getMember", "avatar.arrow.32").image;
  callMethod("copyPixels", t_Img, t_ImgInside, callNamed("rect", 2, 2, 28, 23), t_ImgInside.rect)
  setMeProp(_me, "m_rImgArrow", t_Img);
  setMeProp(_me, "m_rImgArrowAlpha", callMethod("extractAlpha", t_ImgArrow));
  }

  }

}


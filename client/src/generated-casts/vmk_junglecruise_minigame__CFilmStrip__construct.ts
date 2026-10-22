// vmk_junglecruise_minigame.cct / CFilmStrip / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  var t_filmMember = callNamed("getMember", "filmstrip");
  if (lingoBinary("neq", t_filmMember, 0)) {
  setMeProp(_me, "m_filmMember", callMethod("duplicate", t_filmMember.image));
  } else {
  setMeProp(_me, "m_filmMember", callNamed("image", 45, 36, 32));
  }

  setMeProp(_me, "m_mp_constants", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_constants"), "FrameSize", callNamed("point", 30, 20))
  callMethod("setaProp", meProp(_me, "m_mp_constants"), "FrameSpacing", callNamed("point", lingoBinary("sub", meProp(_me, "m_filmMember").width, 31), 8))
  callMethod("setaProp", meProp(_me, "m_mp_constants"), "ScrollTrigger", 400)
  callMethod("setaProp", meProp(_me, "m_mp_constants"), "ScrollSpeed", 2)
  setMeProp(_me, "m_ar_framemembers", new LingoList([]));
  setMeProp(_me, "m_pixelOffset", 0);
  setMeProp(_me, "m_frameOffset", 0);
  setMeProp(_me, "m_totalFrames", 0);
  setMeProp(_me, "m_iVisibleFrames", 11);
  setMeProp(_me, "m_ar_thumbnails", new LingoList([]));
  setMeProp(_me, "m_rThumbnailBG", callNamed("image", lingoBinary("mul", meProp(_me, "m_filmMember").width, lingoBinary("add", meProp(_me, "m_iVisibleFrames"), 1)), meProp(_me, "m_filmMember").width, 32));
  var tImg = callMethod("duplicate", callNamed("getMember", "jc.ui.bg").image);
  var tInset = callNamed("point", 151, 0);
  callMethod("copyPixels", meProp(_me, "m_rThumbnailBG"), tImg, tImg.rect, lingoBinary("add", tImg.rect, callNamed("rect", tInset, tInset)))
  tImg = callMethod("duplicate", meProp(_me, "m_filmMember"));
  for (var i = 0; i <= meProp(_me, "m_iVisibleFrames"); ++i) {
  var tX = lingoBinary("mul", tImg.width, i);
  var tOffset = callNamed("point", tX, 0);
  callMethod("copyPixels", meProp(_me, "m_rThumbnailBG"), tImg, lingoBinary("add", tImg.rect, callNamed("rect", tOffset, tOffset)), tImg.rect, new LingoPropList([symbol("ink"), 39, symbol("blendLevel"), 150]))
  }

  setMeProp(_me, "m_thumbNailStrip", callMethod("duplicate", meProp(_me, "m_rThumbnailBG")));
  return 1;
}


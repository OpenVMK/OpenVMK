// vmk_junglecruise_minigame.cct / CFilmStrip / AddFrame

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AddFrame(_me: LingoMe, i_image: LingoValue) {
  setMeProp(_me, "m_frameOffset", lingoBinary("add", meProp(_me, "m_frameOffset"), 1));
  callNamed("createMember", lingoBinary("join", "JCFilmFrame:", meProp(_me, "m_frameOffset")), symbol("bitmap"))
  callMethod("append", meProp(_me, "m_ar_framemembers"), callNamed("getMember", lingoBinary("join", "JCFilmFrame:", meProp(_me, "m_frameOffset"))))
  setThePropOf(meProp(_me, "m_ar_framemembers")[meProp(_me, "m_ar_framemembers").count], "image", callMethod("duplicate", i_image));
  setThePropOf(meProp(_me, "m_ar_framemembers")[meProp(_me, "m_ar_framemembers").count], "regPoint", callNamed("point", 0, 0));
  var tWidth = meProp(_me, "m_mp_constants")["FrameSize"].locH;
  var tHeight = meProp(_me, "m_mp_constants")["FrameSize"].locV;
  var tThumbNail = callNamed("image", tWidth, tHeight, 32);
  var tRect = callNamed("rect", 0, 0, tWidth, tHeight);
  callMethod("copyPixels", tThumbNail, i_image, tRect, i_image.rect)
  callMethod("append", meProp(_me, "m_ar_thumbnails"), tThumbNail)
  setMeProp(_me, "m_thumbNailStrip", callMethod("duplicate", meProp(_me, "m_rThumbnailBG")));
  var i_index = callNamed("max", 1, lingoBinary("add", lingoBinary("sub", meProp(_me, "m_ar_thumbnails").count, meProp(_me, "m_iVisibleFrames")), 1));
  for (var i = i_index; i <= meProp(_me, "m_ar_thumbnails").count; ++i) {
  var thumb = meProp(_me, "m_ar_thumbnails")[i];
  var t_frameOffset = callNamed("max", 0, lingoBinary("sub", i, i_index));
  var tX = lingoBinary("sub", lingoBinary("add", lingoBinary("mul", t_frameOffset, meProp(_me, "m_filmMember").width), meProp(_me, "m_mp_constants")["FrameSpacing"].locH), meProp(_me, "m_pixelOffset"));
  var tY = meProp(_me, "m_mp_constants")["FrameSpacing"].locV;
  tRect = callNamed("rect", tX, tY, lingoBinary("add", tX, tWidth), lingoBinary("add", tY, tHeight));
  callMethod("copyPixels", meProp(_me, "m_thumbNailStrip"), thumb, tRect, thumb.rect)
  }

}


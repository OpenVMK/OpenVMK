// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegPage1 / updateFigurePreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateFigurePreview(_me: LingoMe, _this: LingoValue) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1)) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "human.preview.img")) {
  var t_HumanImg = callNamed("image", 120, 300, 32);
  var t_ImgAlpha = callNamed("image", 120, 300, 8, symbol("grayscale"));
  callMethod("fill", t_HumanImg, t_HumanImg.rect, callNamed("rgb", 255, 175, 0))
  var t_mpList = new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]);
  callMethod("getPartImg", _this, t_mpList, t_HumanImg)
  callMethod("getPartAlpha", _this, t_mpList, t_ImgAlpha)
  callMethod("setAlpha", t_HumanImg, t_ImgAlpha)
  var tWidth = t_HumanImg.width;
  var tHeight = t_HumanImg.height;
  var t_PrewImg = callNamed("image", tWidth, tHeight, 32);
  var tdestrect = lingoBinary("sub", t_PrewImg.rect, lingoBinary("mul", t_HumanImg.rect, 2));
  var tMargins = callNamed("rect", 0, -float(15), 0, -float(15));
  tdestrect = lingoBinary("add", callNamed("rect", 0, tdestrect.bottom, lingoBinary("mul", t_HumanImg.width, 2), t_PrewImg.rect.bottom), tMargins);
  // HAND-CORRECTED: fill the preview buffer with the opaque ORANGE panel colour
  // before the figure is copied in — the silhouette mask carves the surround
  // transparent, so the fresh image() white showed around the avatar. Register's
  // preview is ink 0 (opaque), so this puts the avatar on solid orange like the
  // reference. See avatar-preview-white-surround.
  callMethod("fill", t_PrewImg, t_PrewImg.rect, callNamed("rgb", 255, 175, 0))
  callMethod("copyPixels", t_PrewImg, t_HumanImg, tdestrect, t_HumanImg.rect)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "human.preview.img"), t_PrewImg)
  }

  }

}


// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / updateFigurePreview

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateFigurePreview(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_ar_BodyPartObjects"))) ? 0 : 1)) {
  if (callMethod("elementExists", meProp(_me, "m_rWindow"), "human.preview.img")) {
  var t_HumanImg = callNamed("image", 100, 300, 32);
  var t_ImgAlpha = callNamed("image", 100, 300, 8, symbol("grayscale"));
  callMethod("fill", t_HumanImg, t_HumanImg.rect, meProp(_me, "m_rHumanImgBgClr"))
  if (lingoBinary("eq", meProp(_me, "m_ar_PropsToServer")["ht"]["SetID"], -float(1))) {
  var t_mpList = new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr"]);
  } else {
  t_mpList = new LingoList(["tr", "llg", "lsh", "lpn", "rlg", "rsh", "rpn", "lh", "ls", "ch", "ch2", "rh", "rs", "hd", "fc", "ey", "hr", "ht"]);
  }

  callMethod("getPartImg", _this, t_mpList, t_HumanImg)
  callMethod("getPartAlpha", _this, t_mpList, t_ImgAlpha)
  callMethod("setAlpha", t_HumanImg, t_ImgAlpha)
  var tWidth = t_HumanImg.width;
  var tHeight = t_HumanImg.height;
  var t_PrewImg = callNamed("image", tWidth, tHeight, 32);
  var tdestrect = lingoBinary("sub", t_PrewImg.rect, lingoBinary("mul", t_HumanImg.rect, 2));
  if (lingoBinary("eq", meProp(_me, "m_sMiniGameName"), "vmks")) {
  var tMargins = callNamed("rect", 0, -float(33), 0, -float(33));
  } else {
  tMargins = callNamed("rect", 0, -float(15), 0, -float(15));
  }

  tdestrect = lingoBinary("add", callNamed("rect", 0, tdestrect.bottom, lingoBinary("mul", t_HumanImg.width, 2), t_PrewImg.rect.bottom), tMargins);
  // HAND-CORRECTED: give the preview buffer the opaque PANEL colour before the
  // figure is copied in. `updateFigurePreview` fills `t_HumanImg` with the panel
  // blue, but the silhouette mask carves the surround transparent, so the fresh
  // `image()` white showed around the avatar (the "white box/outline"). Filling
  // `t_PrewImg` with the same panel colour reproduces the reference (avatar on
  // solid blue) — equivalent to the engine's documented "mask defaults to opaque"
  // design, scoped here so the shared setAlpha/level-plane code is untouched.
  // See avatar-preview-white-surround.
  callMethod("fill", t_PrewImg, t_PrewImg.rect, meProp(_me, "m_rHumanImgBgClr"))
  callMethod("copyPixels", t_PrewImg, t_HumanImg, tdestrect, t_HumanImg.rect)
  callMethod("feedImage", callMethod("getElement", meProp(_me, "m_rWindow"), "human.preview.img"), t_PrewImg)
  }

  }

  }

}


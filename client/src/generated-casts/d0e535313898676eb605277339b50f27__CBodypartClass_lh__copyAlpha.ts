// d0e535313898676eb605277339b50f27.cct / CBodypartClass_lh / copyAlpha

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function copyAlpha(_me: LingoMe, tImg: LingoValue, tdir: LingoValue, tAction: LingoValue, tAnimFrame: LingoValue) {
  if (callNamed("voidp", tdir)) {
  tdir = "2";
  }

  if (callNamed("voidp", tAction)) {
  tAction = "std";
  }

  if (callNamed("voidp", tAnimFrame)) {
  tAnimFrame = "0";
  }

  var t_sMemName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", tAction, "_"), meProp(_me, "m_sPart")), "_"), meProp(_me, "m_iModel")), "_"), tdir), "_"), tAnimFrame);
  var t_mp_rCacheData = meProp(_me, "m_rImageCache")[t_sMemName];
  if ((lingoTruthy(callNamed("voidp", t_mp_rCacheData)) ? 0 : 1)) {
  var tImage = t_mp_rCacheData.alpha;
  var tRegPnt = t_mp_rCacheData.point;
  var tX = lingoBinary("add", -float(tRegPnt[1]), 25);
  var tY = lingoBinary("sub", lingoBinary("sub", tImg.rect.height, tRegPnt[2]), 15);
  var tRect = callNamed("rect", tX, tY, lingoBinary("add", tX, tImage.width), lingoBinary("add", tY, tImage.height));
  callMethod("copyPixels", tImg, tImage, tRect, tImage.rect, new LingoPropList([symbol("ink"), 39]))
  return 1;
  }

  return 0;
}


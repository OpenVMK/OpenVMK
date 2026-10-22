// 6d033acbf3dd898d07f750a3b0d45da3.cct / CCatalogClothesView / ShowLandLogo

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLandLogo(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWndObj"))) {
  if (callMethod("elementExists", meProp(_me, "m_rWndObj"), "land.logo")) {
  var t_ImgLogo = callMethod("getElement", meProp(_me, "m_rWndObj"), "land.logo");
  if (callNamed("memberExists", "logo.6")) {
  var t_Img = callMethod("duplicate", callNamed("member", callNamed("getmemnum", "logo.6")).image);
  if (lingoBinary("and", lingoBinary("neq", callMethod("getProperty", t_ImgLogo, symbol("image")), t_Img), (lingoTruthy(callNamed("voidp", t_Img)) ? 0 : 1))) {
  callMethod("feedImage", t_ImgLogo, t_Img)
  }

  }

  }

  }

}


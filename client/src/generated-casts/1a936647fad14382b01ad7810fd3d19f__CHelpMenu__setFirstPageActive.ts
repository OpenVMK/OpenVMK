// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / setFirstPageActive

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setFirstPageActive(_me: LingoMe) {
  if (meProp(_me, "bParsed")) {
  var category = meProp(_me, "helpCategories")[1];
  setThePropOf(category, "Active", 1);
  callMethod("update", category)
  var Help = category.helps[1];
  setMeProp(_me, "pActiveTopic", Help);
  callMethod("setActive", meProp(_me, "pActiveTopic"), 1)
  callMethod("setActivePage", meProp(_me, "pActiveTopic"), 1)
  var t_text = callMethod("getText", meProp(_me, "pActiveTopic"));
  callMethod("setTopic", meProp(_me, "pContent"), meProp(_me, "pActiveTopic"))
  callMethod("setText", meProp(_me, "pContent"), t_text)
  callMethod("getVisible", _me)
  setMeProp(_me, "pImg", callNamed("image", 267, lingoBinary("mul", meProp(_me, "pVisibleCount"), meProp(_me, "helpCategories")[1].pLineHeight), 32));
  callMethod("render", _me)
  }

}


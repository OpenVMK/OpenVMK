// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / inactivateAllCategories

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function inactivateAllCategories(_me: LingoMe) {
  for (var category of meProp(_me, "helpCategories").toArray()) {
  setThePropOf(category, "Active", 0);
  callMethod("update", category)
  }

  callMethod("getVisible", _me)
  if (lingoBinary("gt", meProp(_me, "helpCategories").length, 0)) {
  var tHeight = meProp(_me, "helpCategories")[1].pLineHeight;
  } else {
  tHeight = 21;
  }

  setMeProp(_me, "pImg", callNamed("image", 267, lingoBinary("mul", meProp(_me, "pVisibleCount"), tHeight), 32));
  callMethod("render", _me)
}


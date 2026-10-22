// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / getMouseItem

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getMouseItem(_me: LingoMe, locV: LingoValue) {
  if (meProp(_me, "bParsed")) {
  var lineH = meProp(_me, "helpCategories")[1].pLineHeight;
  var tIndex = lingoBinary("add", lingoBinary("div", locV, lineH), 1);
  var t_list = callMethod("getVisible", _me);
  if (lingoBinary("gt", tIndex, t_list.count)) {
  return 0;
  }

  if (lingoBinary("lt", tIndex, 1)) {
  return 0;
  }

  tIndex = callNamed("max", 1, callNamed("min", t_list.count, tIndex));
  var clickItem = t_list[tIndex];
  return clickItem;
  } else {
  return undefined;
  }

}


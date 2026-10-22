// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpMenu / getCurrentOffset

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getCurrentOffset(_me: LingoMe) {
  var visibleItems = callMethod("getVisible", _me);
  var tSelected = 0;
  if (lingoBinary("gt", meProp(_me, "helpCategories").length, 0)) {
  var tHeight = meProp(_me, "helpCategories")[1].pLineHeight;
  } else {
  tHeight = 21;
  }

  for (var i = 1; i <= visibleItems.count; ++i) {
  var tItem = visibleItems[i];
  if (lingoBinary("and", lingoBinary("eq", tItem._type, "help"), lingoBinary("eq", tItem.item.Active, 1))) {
  tSelected = lingoBinary("sub", i, 3);
  break;
  }

  }

  return lingoBinary("mul", tSelected, tHeight);
}


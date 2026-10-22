// core.old.cct / CWindowFieldWrapper / registerScroll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerScroll(_me: LingoMe, tID: LingoValue) {
  if (callNamed("voidp", meProp(_me, "pScrolls"))) {
  callMethod("prepare", _me)
  }

  if (!lingoTruthy(callNamed("voidp", tID))) {
  if (lingoBinary("eq", callMethod("getPos", meProp(_me, "pScrolls"), tID), 0)) {
  callMethod("add", meProp(_me, "pScrolls"), tID)
  }

  } else {
  if (lingoBinary("eq", meProp(_me, "pScrolls").count, 0)) {
  return 0;
  }

  }

  var tSourceRect = callNamed("rect", meProp(_me, "pOffX"), meProp(_me, "pOffY"), lingoBinary("add", meProp(_me, "pOffX"), meProp(_me, "pOwnW")), lingoBinary("add", meProp(_me, "pOffY"), meProp(_me, "pOwnH")));
  var tScrollList = new LingoList([]);
  var tWndObj = callMethod("get", callNamed("getWindowManager"), _me.pMotherId);
  for (var tScrollId of meProp(_me, "pScrolls").toArray()) {
  callMethod("add", tScrollList, callMethod("getElement", tWndObj, tScrollId))
  }

  callNamed("call", symbol("updateData"), tScrollList, tSourceRect, _me.pImage.rect)
}


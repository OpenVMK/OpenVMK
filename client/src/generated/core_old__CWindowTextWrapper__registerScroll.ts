// core.old.cct / CWindowTextWrapper / registerScroll

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function registerScroll(_me: LingoMe, _this: LingoValue, tID: LingoValue) {
  if (callNamed("voidp", _this.pScrolls)) {
  callMethod("prepare", _this)
  }

  if (!lingoTruthy(callNamed("voidp", tID))) {
  if (lingoBinary("eq", callMethod("getPos", _this.pScrolls, tID), 0)) {
  callMethod("add", _this.pScrolls, tID)
  }

  } else {
  if (lingoBinary("eq", _this.pScrolls.count, 0)) {
  return 0;
  }

  }

  var tSourceRect = callNamed("rect", _this.pOffX, _this.pOffY, lingoBinary("add", _this.pOffX, _this.pOwnW), lingoBinary("add", _this.pOffY, _this.pOwnH));
  var tScrollList = new LingoList([]);
  var tWndObj = callMethod("get", callNamed("getWindowManager"), _this.pMotherId);
  for (var tScrollId of _this.pScrolls.toArray()) {
  callMethod("add", tScrollList, callMethod("getElement", tWndObj, tScrollId))
  }

  callMethod("createImgFromTxt", _this)
  callNamed("call", symbol("updateData"), tScrollList, tSourceRect, _this.pImage.rect)
}


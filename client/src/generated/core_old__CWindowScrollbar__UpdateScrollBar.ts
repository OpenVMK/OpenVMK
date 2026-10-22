// core.old.cct / CWindowScrollbar / UpdateScrollBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UpdateScrollBar(_me: LingoMe, tElementPartList: LingoValue, tstate: LingoValue) {
  for (var f of tElementPartList.toArray()) {
  var tDstRect = meProp(_me, "pRects")[f];
  var tImgPropName = lingoBinary("join", lingoBinary("join", f, "_"), tstate);
  callMethod("copyPixels", _me.pImage, callMethod("getProp", meProp(_me, "pButtonImg"), tImgPropName), tDstRect, callMethod("getProp", meProp(_me, "pButtonImg"), tImgPropName).rect, new LingoPropList([symbol("ink"), 36]))
  }

}


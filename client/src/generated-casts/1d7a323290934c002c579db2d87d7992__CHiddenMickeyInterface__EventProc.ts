// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  if (lingoBinary("eq", tEvent, symbol("mouseDown"))) {
  switch (tElemID) {
case "camera.takepicture.button":
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sCameraWindowName"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tRect = callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.picture").pSprite.rect;
  if (lingoBinary("gt", callMethod("showHiddenMickeysInViewFinder", _me, tRect), 0)) {
  callMethod("RequestHiddenMickeyTest", callMethod("getHandler", _me), callNamed("point", tRect.left, tRect.top))
  }

  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Hidden Mickey Quest received proc: ", new LingoList([tEvent, tElemID, tParm])))
  }

  }

}


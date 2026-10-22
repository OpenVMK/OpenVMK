// core.old.cct / CWindowImageWrapper / feedImage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function feedImage(_me: LingoMe, tImage: LingoValue) {
  if (!lingoTruthy(lingoBinary("eq", callNamed("ilk", tImage), symbol("image")))) {
  return callNamed("error", _me, lingoBinary("joinPad", "Image object expected!", tImage), symbol("feedImage"));
  }

  var tTargetRect = callNamed("rect", meProp(_me, "pOwnX"), meProp(_me, "pOwnY"), lingoBinary("add", meProp(_me, "pOwnX"), meProp(_me, "pOwnW")), lingoBinary("add", meProp(_me, "pOwnY"), meProp(_me, "pOwnH")));
  callMethod("fill", _me.pBuffer.image, tTargetRect, _me.pProps[symbol("bgColor")])
  setThePropOf(_me, "pImage", tImage);
  callMethod("render", _me)
  setMeProp(_me, "pUpdateLock", 1);
  callMethod("registerScroll", _me)
  setMeProp(_me, "pUpdateLock", 0);
  return 1;
}


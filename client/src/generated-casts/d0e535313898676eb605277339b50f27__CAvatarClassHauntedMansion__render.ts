// d0e535313898676eb605277339b50f27.cct / CAvatarClassHauntedMansion / render

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function render(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bChanges")) ? 0 : 1)) {
  return;
  }

  setMeProp(_me, "m_bChanges", 0);
  callMethod("arrangeParts", _me)
  setMeProp(_me, "pUpdateRect", callNamed("rect", 0, 0, 0, 0));
  setMeProp(_me, "m_rAlpha", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 8, symbol("grayscale")));
  setMeProp(_me, "m_imgBuffer", callNamed("image", meProp(_me, "m_iCanvasWidth"), meProp(_me, "m_iCanvasHeight"), 32));
  callMethod("fill", meProp(_me, "m_imgBuffer"), meProp(_me, "m_imgBuffer").rect, callNamed("rgb", 0, 0, 0))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 0);
  callNamed("call", symbol("update"), meProp(_me, "m_mpSortedParts"))
  callMethod("setAlpha", meProp(_me, "m_imgBuffer"), meProp(_me, "m_rAlpha"))
  setThePropOf(meProp(_me, "m_imgBuffer"), "useAlpha", 1);
  return meProp(_me, "m_imgBuffer");
}


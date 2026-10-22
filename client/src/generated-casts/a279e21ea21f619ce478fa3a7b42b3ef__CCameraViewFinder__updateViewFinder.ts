// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraViewFinder / updateViewFinder

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateViewFinder(_me: LingoMe) {
  if (meProp(_me, "m_bActive")) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sCameraWindowName"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, meProp(_me, "m_sViewFinderName"));
  if (lingoBinary("neq", tElem, 0)) {
  setMeProp(_me, "pOffset", tElem.pSprite.rect);
  callMethod("liveFeed", _me)
  callMethod("copyPixels", _movie.stage.image, meProp(_me, "greyCamera"), meProp(_me, "pOffset"), meProp(_me, "greyCamera").rect)
  }

  }

  }

}


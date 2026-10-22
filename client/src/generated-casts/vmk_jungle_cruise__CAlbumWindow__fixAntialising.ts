// vmk_jungle_cruise.cct / CAlbumWindow / fixAntialising

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function fixAntialising(_me: LingoMe, tElemName: LingoValue, forceupdate: LingoValue, setText: LingoValue, bDebug: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_sWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var tElem = callMethod("getElement", tWndObj, tElemName);
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("deleteProp", tElem.pParams, symbol("ink"))
  callMethod("deleteProp", tElem.pParams, symbol("color"))
  callMethod("deleteProp", tElem.pParams, symbol("bgColor"))
  var tSprite = callMethod("getProperty", tElem, symbol("sprite"));
  if (lingoBinary("neq", tSprite, 0)) {
  setThePropOf(tSprite, "foreColor", 255);
  setThePropOf(tSprite, "bgColor", tElem.pFontData[symbol("bgColor")]);
  setThePropOf(tSprite, "ink", 36);
  }

  if ((lingoTruthy(callNamed("voidp", setText)) ? 0 : 1)) {
  callMethod("setText", tElem, setText)
  }

  if (forceupdate) {
  callMethod("render", tElem)
  }

  }

  }

}


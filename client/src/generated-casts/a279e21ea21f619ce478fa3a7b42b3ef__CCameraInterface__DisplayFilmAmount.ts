// a279e21ea21f619ce478fa3a7b42b3ef.cct / CCameraInterface / DisplayFilmAmount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DisplayFilmAmount(_me: LingoMe, i_iAmount: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sCameraWindowName"))) {
  callMethod("setText", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "film"), callNamed("string", i_iAmount))
  if (lingoBinary("lte", i_iAmount, 0)) {
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.takepicture.button"))
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.outoffilm"))
  } else {
  callMethod("show", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.takepicture.button"))
  callMethod("hide", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sCameraWindowName")), "camera.outoffilm"))
  }

  }

}


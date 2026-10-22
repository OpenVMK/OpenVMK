// d0e535313898676eb605277339b50f27.cct / CAvatarFigureSetLoader / _FileLoadCallback

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FileLoadCallback(_me: LingoMe, _this: LingoValue, a_sMember: LingoValue) {
  if (callMethod("exists", callNamed("getObjectManager"), "FigureSetLoadingDialog")) {
  callNamed("removeObject", "FigureSetLoadingDialog", "CLoadingWindow")
  }

  if (callNamed("memberExists", "figureTexts1")) {
  callNamed("dumpVariableField", callNamed("member", callNamed("getmemnum", "figureTexts1")))
  }

  setMeProp(_me, "m_bReady", 1);
  callMethod("ProcessReadyCallback", callMethod("GetProcessManager", callNamed("getThread", symbol("main")).component), meProp(_me, "m_iProcessNumber"))
  callMethod("CreatetClothAssetManager", callNamed("getThread", symbol("AvatarFactory")).component)
}


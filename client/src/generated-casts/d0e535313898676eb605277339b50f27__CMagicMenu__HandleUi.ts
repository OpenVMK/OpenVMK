// d0e535313898676eb605277339b50f27.cct / CMagicMenu / HandleUi

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleUi(_me: LingoMe, _this: LingoValue) {
  if (lingoBinary("and", lingoBinary("and", callNamed("windowExists", meProp(_me, "m_sWindowID")), callNamed("integerp", meProp(_me, "m_iActiveFx"))), lingoBinary("neq", meProp(_me, "m_iActiveFx"), meProp(_me, "m_iSelectedFx")))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 1)
  }

}


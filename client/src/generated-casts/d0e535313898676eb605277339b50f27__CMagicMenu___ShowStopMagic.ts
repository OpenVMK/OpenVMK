// d0e535313898676eb605277339b50f27.cct / CMagicMenu / _ShowStopMagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ShowStopMagic(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  if (callMethod("elementExists", t_rWnd, "magics.name")) {
  var t_sName = callMethod("GetSelected", _this).name;
  callMethod("setText", callMethod("getElement", t_rWnd, "magics.name"), t_sName)
  }

  if (lingoBinary("and", callNamed("integerp", meProp(_me, "m_iActiveFx")), lingoBinary("eq", meProp(_me, "m_iActiveFx"), meProp(_me, "m_iSelectedFx")))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.stop.button"), symbol("visible"), 1)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.timeout.hd"), symbol("visible"), 0)
  callMethod("setProperty", callMethod("getElement", t_rWnd, "magics.word.hd"), symbol("visible"), 0)
  } else {
  callMethod("HandleUi", _this)
  }

  }

}


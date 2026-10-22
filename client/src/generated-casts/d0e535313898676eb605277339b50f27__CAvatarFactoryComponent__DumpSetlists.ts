// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryComponent / DumpSetlists

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DumpSetlists(_me: LingoMe, _this: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_objFigureSetLoader"))) {
  var t_bISready = callMethod("IsReady", meProp(_me, "m_objFigureSetLoader"));
  if (t_bISready) {
  var t = theProperty("milliSeconds");
  if (callNamed("timeoutExists", "AvatarSetTimer")) {
  callNamed("removeTimeout", "AvatarSetTimer")
  }

  setMeProp(_me, "m_ar_FigureColorList", callNamed("getVariableValue", "ColorList"));
  setMeProp(_me, "m_ar_FigureSetNumbers", callNamed("getVariableValue", "SetNumbers"));
  callMethod("parseAllFigureData", _this)
  t = lingoBinary("sub", theProperty("milliSeconds"), t);
  callNamed("put", lingoBinary("joinPad", "Avatar data parsed:", t))
  }

  }

}


// registration.cct / CRegPage1 / DumpSetlists

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DumpSetlists(_me: LingoMe, _this: LingoValue) {
  var t_objFigureSetLoader = callNamed("getObject", "figsetLoader");
  if (callNamed("objectp", t_objFigureSetLoader)) {
  var t_bISready = callMethod("IsReady", t_objFigureSetLoader);
  if (t_bISready) {
  if (callNamed("timeoutExists", "RegAvatarSetTimer")) {
  callNamed("removeTimeout", "RegAvatarSetTimer")
  }

  setMeProp(_me, "m_ar_FigureColorList", callNamed("getVariableValue", "ColorList"));
  setMeProp(_me, "m_ar_FigureSetNumbers", callNamed("getVariableValue", "SetNumbers"));
  callMethod("parseAllFigureData", _this)
  callMethod("updateStats", _this)
  } else {
  if (!lingoTruthy(callNamed("timeoutExists", "RegAvatarSetTimer"))) {
  callNamed("createTimeout", "RegAvatarSetTimer", 500, symbol("DumpSetlists"), callMethod("getID", _this), undefined, 0)
  }

  }

  }

}


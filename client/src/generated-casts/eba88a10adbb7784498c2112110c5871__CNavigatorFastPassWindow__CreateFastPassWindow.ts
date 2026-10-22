// eba88a10adbb7784498c2112110c5871.cct / CNavigatorFastPassWindow / CreateFastPassWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateFastPassWindow(_me: LingoMe, _this: LingoValue) {
  if (callNamed("windowExists", meProp(_me, "m_sWindowID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindowID"))
  }

  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sWindowID"))) ? 0 : 1)) {
  callNamed("createWindow", meProp(_me, "m_sWindowID"), "vmk_fastpass.window", 0, 0)
  var t_rWndObj = callNamed("getWindow", meProp(_me, "m_sWindowID"));
  var tElem = callMethod("getElement", t_rWndObj, "basic.window.title");
  if (lingoBinary("neq", tElem, 0)) {
  callMethod("setText", tElem, callNamed("getText", "faspass.window.hd"))
  }

  callMethod("registerClient", t_rWndObj, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWndObj, symbol("eventProcFastPass"), callMethod("getID", _this), symbol("mouseDown"))
  callMethod("setProperty", callMethod("getElement", t_rWndObj, "fastpass.enter"), symbol("blend"), 50)
  }

}


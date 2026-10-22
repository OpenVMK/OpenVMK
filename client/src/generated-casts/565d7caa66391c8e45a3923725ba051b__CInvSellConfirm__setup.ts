// 565d7caa66391c8e45a3923725ba051b.cct / CInvSellConfirm / setup

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setup(_me: LingoMe, _this: LingoValue, a_iRef: LingoValue, a_iType: LingoValue, a_iPrice: LingoValue) {
  setMeProp(_me, "m_iRef", a_iRef);
  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sWnd"))) ? 0 : 1)) {
  callNamed("createWindow", meProp(_me, "m_sWnd"), "vmk_basic.window", 0, 0, symbol("modal"))
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWnd"));
  callMethod("center", t_rWnd)
  callMethod("merge", t_rWnd, "vmk_basic_1.window")
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  var t_sTxt = callNamed("getText", "inv.ok", "OK");
  setThePropOf(callMethod("getElement", t_rWnd, "basic.dialog1.button1"), "pButtonText", t_sTxt);
  setThePropOf(callMethod("getElement", t_rWnd, "basic.dialog1.button1"), "pCachedImgs", new LingoPropList([]));
  callMethod("createButtonImg", callMethod("getElement", t_rWnd, "basic.dialog1.button1"), t_sTxt, symbol("up"))
  callMethod("createButtonImg", callMethod("getElement", t_rWnd, "basic.dialog1.button1"), t_sTxt, symbol("down"))
  callMethod("changeState", callMethod("getElement", t_rWnd, "basic.dialog1.button1"), symbol("up"))
  } else {
  t_rWnd = callNamed("getWindow", meProp(_me, "m_sWnd"));
  }

  t_sTxt = callNamed("replaceChunks", callNamed("getText", "inv.sell.confirm"), "$", callNamed("string", a_iPrice));
  callMethod("setText", callMethod("getElement", t_rWnd, "basic.content.text"), t_sTxt)
}


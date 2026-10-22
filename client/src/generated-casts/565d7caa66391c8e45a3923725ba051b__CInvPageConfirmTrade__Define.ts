// 565d7caa66391c8e45a3923725ba051b.cct / CInvPageConfirmTrade / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue, a_sPartner: LingoValue) {
  setMeProp(_me, "m_sWndID", "TradeConfirmation");
  if (callNamed("windowExists", meProp(_me, "m_sWndID"))) {
  callNamed("removeWindow", meProp(_me, "m_sWndID"))
  }

  setMeProp(_me, "m_sPartner", a_sPartner);
  if (callNamed("createWindow", meProp(_me, "m_sWndID"), "vmk_tra_confirm.window", 0, 0, symbol("modal"))) {
  setMeProp(_me, "m_rWindow", callNamed("getWindow", meProp(_me, "m_sWndID")));
  callMethod("registerClient", meProp(_me, "m_rWindow"), callMethod("getID", _this))
  callMethod("registerProcedure", meProp(_me, "m_rWindow"), symbol("_EventProc"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "tra.heoffers.hd"), callNamed("replaceChunks", callNamed("getText", "tra.heoffers"), "\\$", meProp(_me, "m_sPartner")))
  return 1;
  } else {
  return callNamed("error", _this, "Failed to open trade confirm dialog!", symbol("Define"));
  }

}


// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / _Open

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _Open(_me: LingoMe, _this: LingoValue, a_rContext: LingoValue) {
  setMeProp(_me, "m_rContext", a_rContext);
  if ((lingoTruthy(callNamed("createObject", "room_chat_out", "CRoomChatOutputMgr")) ? 0 : 1)) {
  callNamed("error", _this, "Failed to construct chat output!", symbol("construct"))
  }

  if ((lingoTruthy(callNamed("windowExists", meProp(_me, "m_sWindow"))) ? 0 : 1)) {
  if (callNamed("createWindow", meProp(_me, "m_sWindow"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindow"));
  callMethod("registerClient", t_rWnd, callMethod("getID", _this))
  callMethod("registerProcedure", t_rWnd, symbol("_Events"), callMethod("getID", _this), symbol("mouseUp"))
  callMethod("registerProcedure", t_rWnd, symbol("_Events"), callMethod("getID", _this), symbol("keyUp"))
  }

  }

}


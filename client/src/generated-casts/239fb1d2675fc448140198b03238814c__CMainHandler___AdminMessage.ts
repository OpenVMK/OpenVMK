// 239fb1d2675fc448140198b03238814c.cct / CMainHandler / _AdminMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AdminMessage(_me: LingoMe, _this: LingoValue, a_arMsg: LingoValue) {
  var t_sMsg = callMethod("GetStrFrom", a_arMsg.connection);
  var t_iTarget = callMethod("GetIntFrom", a_arMsg.connection);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "AdminMessage", 1, 1);
  callMethod("show", t)
  switch (t_iTarget) {
case 0:
  var t_sTxt = callNamed("getText", "admin.message.user.hd");
  break;
case 1:
  t_sTxt = callNamed("getText", "admin.message.room.hd");
  break;
case 2:
  t_sTxt = callNamed("getText", "admin.message.queue.hd");
  break;
case 3:
  t_sTxt = callNamed("getText", "admin.message.global.hd");
  break;
  }

  callMethod("setText", t, t_sMsg, t_sTxt, "OK")
}


// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / _EntranceDenied

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EntranceDenied(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iCheckID = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iExplanationCode = callMethod("GetIntFrom", a_rMsg.connection);
  switch (t_iExplanationCode) {
case 1000:
  var tThread = callNamed("getThread", "room");
  if (lingoBinary("neq", tThread, 0)) {
  callMethod("_CancelRoom", callMethod("getComponent", tThread))
  }

  callMethod("ShowNavigator", callMethod("getInterface", _this))
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "NavUserKicked", 1, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, callNamed("getText", "nav.kicked.title"), callNamed("getText", "nav.kicked.desc"), callNamed("getText", "nav.kicked.ok"))
  break;
case 1001:
  tThread = callNamed("getThread", "room");
  if (lingoBinary("neq", tThread, 0)) {
  callMethod("_CancelRoom", callMethod("getComponent", tThread))
  }

  callMethod("ShowNavigator", callMethod("getInterface", _this))
  t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "NavUserTicketing", 1, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, callNamed("getText", "nav.ticketing.title"), callNamed("getText", "nav.ticketing.desc"), callNamed("getText", "nav.ticketing.ok"))
  break;
  }

}


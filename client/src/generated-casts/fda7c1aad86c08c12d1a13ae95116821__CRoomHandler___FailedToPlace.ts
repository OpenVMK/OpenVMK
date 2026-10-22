// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _FailedToPlace

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _FailedToPlace(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_iMsg = callMethod("GetIntFrom", a_rMsg.connection);
  switch (t_iMsg) {
case 0:
  var t_sMsg = callNamed("getText", "error.failedtoplace.0");
  break;
case 1:
  t_sMsg = callNamed("getText", "error.failedtoplace.1");
  break;
  default:
  t_sMsg = callNamed("getText", "error.failedtoplace.0");
  }

  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "Room.place.furni.failed", 1, 1);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, t_sMsg, callNamed("getText", "room.placefurni.failed.title"), "OK")
}


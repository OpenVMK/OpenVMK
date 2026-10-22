// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / PrivateRoomIsClosing

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrivateRoomIsClosing(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callMethod("ShowNavigator", _this._interface)
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "NavOwnerNotPresent", 1, 0);
  callMethod("show", t_rDialog)
  callMethod("setText", t_rDialog, callNamed("getText", "nav.closing.title"), callNamed("getText", "nav.closing.desc"), callNamed("getText", "nav.closing.ok"))
}


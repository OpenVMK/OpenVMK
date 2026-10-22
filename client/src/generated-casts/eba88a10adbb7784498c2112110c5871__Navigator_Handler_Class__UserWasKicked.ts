// eba88a10adbb7784498c2112110c5871.cct / Navigator Handler Class / UserWasKicked

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function UserWasKicked(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  callMethod("ShowNavigator", _this._interface)
  var t_rDialog = callNamed("createDialogWindow", callMethod("getID", _this), "NavUserKicked", 1, 0);
  callMethod("show", t_rDialog)
  if (lingoBinary("eq", callMethod("get", callNamed("getObject", symbol("session")), "RoomType"), "private")) {
  callMethod("setText", t_rDialog, callNamed("getText", "nav.kicked.title"), callNamed("getText", "nav.kicked.desc"), callNamed("getText", "nav.kicked.ok"))
  } else {
  callMethod("setText", t_rDialog, callNamed("getText", "nav.kicked.public.title"), callNamed("getText", "nav.kicked.desc"), callNamed("getText", "nav.kicked.ok"))
  }

}


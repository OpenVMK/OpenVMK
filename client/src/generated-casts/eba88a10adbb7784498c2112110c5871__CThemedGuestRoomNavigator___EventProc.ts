// eba88a10adbb7784498c2112110c5871.cct / CThemedGuestRoomNavigator / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElem: LingoValue, a_vParam: LingoValue) {
  var t_rWindow = callNamed("getWindow", "RoomNameWnd");
  if (lingoBinary("eq", a_kEvent, symbol("mouseDown"))) {
  switch (a_sElem) {
case "edit.cancel.button":
  callMethod("close", t_rWindow)
  break;
case "cat.rooms.nextstep.button":
  callMethod("_NextStep", _this)
  break;
case "cat.rooms.goto.button":
  callMethod("_GoToNewRoom", _this)
  break;
  }

  }

}


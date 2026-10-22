// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomInterface / hideLoadBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideLoadBar(_me: LingoMe, _this: LingoValue) {
  callMethod("unlock", callNamed("getWindowManager"))
  if (callNamed("objectExists", "room_status_bar")) {
  callNamed("removeObject", "room_status_bar")
  }

  if (callNamed("windowExists", "room_load_wnd")) {
  callNamed("removeWindow", "room_load_wnd")
  }

  if ((lingoTruthy(callNamed("voidp", callNamed("GetCustomLoadingScreenObject"))) ? 0 : 1)) {
  callNamed("RemoveCustomLoadingScreen")
  }

  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 1]))
}


// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / hideLoadBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function hideLoadBar(_me: LingoMe) {
  callMethod("unlock", callNamed("getWindowManager"))
  if ((lingoTruthy(callNamed("voidp", callNamed("GetCustomLoadingScreenObject"))) ? 0 : 1)) {
  callNamed("RemoveCustomLoadingScreen")
  }

  if (callNamed("objectExists", "room_status_bar")) {
  callNamed("removeObject", "room_status_bar")
  }

  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  callNamed("removeWindow", meProp(_me, "m_sWindow"))
  callNamed("executeMessage", "SetButtonStates", new LingoPropList([symbol("all"), 1]))
  }

  callMethod("StopPinging", _me)
}


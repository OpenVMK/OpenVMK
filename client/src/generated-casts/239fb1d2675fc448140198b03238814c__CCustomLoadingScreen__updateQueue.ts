// 239fb1d2675fc448140198b03238814c.cct / CCustomLoadingScreen / updateQueue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateQueue(_me: LingoMe, _this: LingoValue, a_iPeopleInQueue: LingoValue, a_iQueueLength: LingoValue, a_bFastPass: LingoValue, a_iPos: LingoValue, a_sRoom: LingoValue) {
  if (callNamed("windowExists", "room_custom_load_wnd")) {
  var t_rWnd = callNamed("getWindow", "room_custom_load_wnd");
  if (lingoBinary("and", lingoBinary("gt", a_iPeopleInQueue, a_iQueueLength), (lingoTruthy(a_bFastPass) ? 0 : 1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 1)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 0)
  }

  callMethod("setText", callMethod("getElement", t_rWnd, "roomqueue.destination"), a_sRoom)
  callMethod("setText", callMethod("getElement", t_rWnd, "fastpass.queue"), lingoBinary("add", a_iPos, 1))
  }

}


// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / FastPassRemoved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function FastPassRemoved(_me: LingoMe) {
  var t_iQueueLength = callNamed("getVariable", "queue.legnth", 5);
  var t_bFastPass = callNamed("objectExists", "FastPassWindow");
  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindow"));
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "m_iPeopleInQueue"), t_iQueueLength), (lingoTruthy(t_bFastPass) ? 0 : 1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 1)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 0)
  }

  }

}


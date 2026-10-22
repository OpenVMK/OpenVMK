// eba88a10adbb7784498c2112110c5871.cct / CNavigatorQueueInterface / ShowQueue

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowQueue(_me: LingoMe, a_sRoom: LingoValue, a_iPos: LingoValue) {
  if (lingoBinary("lt", a_iPos, 0)) {
  callMethod("hideLoadBar", _me)
  setMeProp(_me, "m_iPeopleInQueue", 0);
  return 1;
  }

  if (lingoBinary("eq", meProp(_me, "m_iPeopleInQueue"), 0)) {
  setMeProp(_me, "m_fPercent", 0);
  setMeProp(_me, "m_iPeopleInQueue", lingoBinary("add", a_iPos, 1));
  }

  setMeProp(_me, "m_fPercent", lingoBinary("div", lingoBinary("mul", lingoBinary("sub", meProp(_me, "m_iPeopleInQueue"), lingoBinary("add", a_iPos, 1)), float(1)), meProp(_me, "m_iPeopleInQueue")));
  var t_iQueueLength = callNamed("getVariable", "queue.legnth", 5);
  var t_bFastPass = callNamed("objectExists", "FastPassWindow");
  if (callNamed("voidp", callNamed("GetCustomLoadingScreenObject"))) {
  callMethod("ShowLoadBar", _me, a_sRoom, 0)
  }

  if (callNamed("windowExists", meProp(_me, "m_sWindow"))) {
  var t_rWnd = callNamed("getWindow", meProp(_me, "m_sWindow"));
  if (lingoBinary("and", lingoBinary("gt", meProp(_me, "m_iPeopleInQueue"), t_iQueueLength), (lingoTruthy(t_bFastPass) ? 0 : 1))) {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 1)
  } else {
  callMethod("setProperty", callMethod("getElement", t_rWnd, "nav.fastpass.button"), symbol("visible"), 0)
  }

  callMethod("setText", callMethod("getElement", t_rWnd, "roomqueue.destination"), a_sRoom)
  callMethod("setText", callMethod("getElement", t_rWnd, "fastpass.queue"), lingoBinary("add", a_iPos, 1))
  }

  callMethod("StartPinging", _me)
  callMethod("lock", callNamed("getWindowManager"))
}


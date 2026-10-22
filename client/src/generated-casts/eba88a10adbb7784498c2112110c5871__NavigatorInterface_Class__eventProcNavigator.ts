// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / eventProcNavigator

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function eventProcNavigator(_me: LingoMe, tEvent: LingoValue, tElemID: LingoValue, tParm: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  if (lingoBinary("eq", tEvent, symbol("mouseUp"))) {
  callMethod("click", _me, tElemID)
  } else {
  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseEnter")), (lingoTruthy(lingoBinary("contains", tElemID, "tab")) ? 0 : 1))) {
  if ((lingoTruthy(lingoBinary("contains", tElemID, ".active")) ? 0 : 1)) {
  var tHighLighter = callMethod("getElement", tWndObj, lingoBinary("join", tElemID, ".active"));
  } else {
  tHighLighter = callMethod("getElement", tWndObj, tElemID);
  }

  if (callNamed("objectp", tHighLighter)) {
  setThePropOf(callMethod("getProperty", tHighLighter, symbol("sprite")), "ink", 33);
  callMethod("show", tHighLighter)
  }

  } else {
  if (lingoBinary("and", lingoBinary("eq", tEvent, symbol("mouseLeave")), (lingoTruthy(lingoBinary("contains", tElemID, "tab")) ? 0 : 1))) {
  if ((lingoTruthy(lingoBinary("contains", tElemID, ".active")) ? 0 : 1)) {
  tHighLighter = callMethod("getElement", tWndObj, lingoBinary("join", tElemID, ".active"));
  } else {
  tHighLighter = callMethod("getElement", tWndObj, tElemID);
  }

  if (callNamed("objectp", tHighLighter)) {
  callMethod("hide", tHighLighter)
  }

  }

  }

  }

}


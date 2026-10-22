// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpInterface / checkActivateCallforhelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkActivateCallforhelp(_me: LingoMe, _this: LingoValue) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var t_txt2 = callMethod("getText", callMethod("getElement", tWndObj, "hlp.describe.input"));
  if (lingoBinary("and", lingoBinary("gte", callMethod("getActiveElementID", meProp(_me, "m_pRadioButtons")), 0), lingoBinary("gt", t_txt2.char.count, 0))) {
  callMethod("Activate", callMethod("getElement", tWndObj, "hlp.alertmod.button"))
  } else {
  callMethod("deactivate", callMethod("getElement", tWndObj, "hlp.alertmod.button"))
  }

}


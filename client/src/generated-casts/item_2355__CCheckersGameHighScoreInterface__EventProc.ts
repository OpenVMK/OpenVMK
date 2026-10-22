// item_2355.cct / CCheckersGameHighScoreInterface / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sElement: LingoValue, a_ptOffset: LingoValue, a_sWindow: LingoValue) {
  var t_rEvent = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  if ((lingoTruthy(callNamed("voidp", meProp(_me, "m_rComponent"))) ? 0 : 1)) {
  if (callMethod("EventProc", meProp(_me, "m_rComponent"), a_ptOffset, t_rEvent)) {
  callMethod("render", _this)
  var t_iIndex = callMethod("getComponentID", meProp(_me, "m_rComponent"), t_rEvent.route[1]);
  setThePropOf(_this, "m_iSelected", t_iIndex);
  }

  }

}


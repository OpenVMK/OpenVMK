// d1ee027a52e24196484455ed8484679f.cct / CTryComponents / _EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _EventProc(_me: LingoMe, a_kEvent: LingoValue, a_sElemID: LingoValue, a_vParam: LingoValue) {
  if (lingoBinary("eq", a_kEvent, symbol("mouseUp"))) {
  switch (a_sElemID) {
case "nav.roomlist":
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  callNamed("executeMessage", "PlayInterfaceSound", "UI-click")
  var t_rComponentPage = meProp(_me, "m_ar_components")[a_sElemID];
  callMethod("EventProc", t_rComponentPage, a_vParam, t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  switch (t_ar_event.event) {
case "quest.delete":
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "[Component.event]", t_ar_event.event))
  }

  t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), a_sElemID);
  var t_rImg = callMethod("render", t_rComponentPage);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  break;
case "close":
  callNamed("removeObject", callMethod("getID", _me))
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Window-elem not found ", a_sElemID))
  }

  }

}


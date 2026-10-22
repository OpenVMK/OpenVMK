// 3f02613936ba018480acffaf92dd883a.cct / CFactorVmkAnimation / setEvents

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setEvents(_me: LingoMe, t_ar_Events: LingoValue) {
  setMeProp(_me, "m_ar_rMarkers", new LingoPropList([]));
  setMeProp(_me, "m_ar_rEvents", new LingoPropList([]));
  for (var i = 1; i <= t_ar_Events.count; ++i) {
  var t_sFrame = callMethod("getPropAt", t_ar_Events, i);
  var t_sEvent = t_ar_Events[i];
  var t_sCurrentEvent = t_sEvent.word[1];
  var t_iEventNameLength = lingoBinary("add", t_sCurrentEvent.length, 2);
  switch (t_sCurrentEvent) {
case "marker":
case "Marker":
case "MARKER":
  var t_sName = t_sEvent.char.range(t_iEventNameLength, t_sEvent.length);
  meProp(_me, "m_ar_rMarkers")[t_sName] = callNamed("integer", t_sFrame);
  break;
  default:
  meProp(_me, "m_ar_rEvents")[t_sFrame] = t_sEvent;
  break;
  break;
  }

  }

}


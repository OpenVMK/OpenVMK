// 38365562899c7799eeaea4a99041ea57.cct / CUIComponent / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tParm: LingoValue, t_ar_event: LingoValue) {
  for (var t_rLayout of meProp(_me, "m_ar_layouts").toArray()) {
  var t_pForward = lingoBinary("sub", tParm, meProp(_me, "m_pOffset"));
  if (callMethod("inside", t_pForward, callMethod("getRect", t_rLayout))) {
  var t_sEvent = callMethod("getEvent", t_rLayout);
  switch (t_sEvent) {
case "":
  callNamed("nothing")
  break;
  default:
  t_ar_event[symbol("found")] = 1;
  t_ar_event[symbol("event")] = t_sEvent;
  t_ar_event[symbol("client")] = t_rLayout;
  t_ar_event[symbol("route")][symbol("layout")] = t_rLayout;
  }

  return 1;
  }

  }

  return 0;
}


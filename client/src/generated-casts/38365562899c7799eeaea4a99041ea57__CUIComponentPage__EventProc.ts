// 38365562899c7799eeaea4a99041ea57.cct / CUIComponentPage / EventProc

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EventProc(_me: LingoMe, tParm: LingoValue, t_ar_event: LingoValue) {
  var t_ar_visible = callMethod("getVisible", _me);
  var t_pOffset = callNamed("point", 0, 0);
  for (var t_rComponent of t_ar_visible.toArray()) {
  var t_pLoc = lingoBinary("add", callMethod("getPos", t_rComponent), t_pOffset);
  var t_pForward = lingoBinary("sub", tParm, callNamed("point", 0, t_pLoc.locV));
  if (callMethod("inside", t_pForward, callMethod("getRect", t_rComponent))) {
  t_ar_event[symbol("route")][symbol("component")] = t_rComponent;
  var t_bReturnvalue = callMethod("EventProc", t_rComponent, t_pForward, t_ar_event);
  if (t_ar_event.found) {
  if (callNamed("objectp", meProp(_me, "m_rActiveComponent"))) {
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 0)
  callMethod("render", meProp(_me, "m_rActiveComponent"), meProp(_me, "m_rWriter"))
  }

  setMeProp(_me, "m_rActiveComponent", t_rComponent);
  callMethod("showAsActive", meProp(_me, "m_rActiveComponent"), 1)
  var t_rLayout = t_ar_event[symbol("route")][symbol("layout")];
  if (callNamed("objectp", meProp(_me, "m_rActive"))) {
  callMethod("inActivate", meProp(_me, "m_rActive"))
  callMethod("render", meProp(_me, "m_rActive"), meProp(_me, "m_rWriter"))
  }

  callMethod("Activate", t_rLayout)
  setMeProp(_me, "m_rActive", t_rLayout);
  }

  return t_bReturnvalue;
  }

  t_pOffset = lingoBinary("add", t_pOffset, callNamed("point", 0, lingoBinary("add", t_rComponent.m_iHeight, callMethod("GetPadding", t_rComponent))));
  }

  return 0;
}


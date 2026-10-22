// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / _PopulateNameList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PopulateNameList(_me: LingoMe, _this: LingoValue, a_ar_Names: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "reg.namelist");
  var t_rComponentsPage = callNamed("createObject", callNamed("getUniqueID"), "CUIComponentPage");
  callMethod("setSize", t_rComponentsPage, t_rClientElement.pOwnW, t_rClientElement.pOwnH)
  callMethod("setColor", t_rComponentsPage, callNamed("rgb", "#ffc513"))
  for (var i = 1; i <= a_ar_Names.count; ++i) {
  var t_rComponent = callMethod("addComponent", t_rComponentsPage, "component.registration.xml");
  callMethod("setEvent", callMethod("GetLayout", t_rComponent, 1), callNamed("string", a_ar_Names[i]))
  callMethod("setText", callMethod("GetLayout", t_rComponent, 1), a_ar_Names[i])
  callMethod("SetTextColor", callMethod("GetLayout", t_rComponent, 1), callNamed("rgb", 250, 250, 250))
  }

  setMeProp(_me, "m_rComponentsPage", t_rComponentsPage);
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

}


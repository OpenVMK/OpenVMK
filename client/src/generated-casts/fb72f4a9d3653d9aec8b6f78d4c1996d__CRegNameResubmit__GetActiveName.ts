// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegNameResubmit / GetActiveName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetActiveName(_me: LingoMe, _this: LingoValue, a_sName: LingoValue) {
  setMeProp(_me, "m_sActiveName", a_sName);
  if (callNamed("objectp", meProp(_me, "m_rComponentsPage"))) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  callMethod("setActive", meProp(_me, "m_rComponentsPage"), meProp(_me, "m_sActiveName"))
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "reg.namelist");
  var t_rImg = callMethod("render", meProp(_me, "m_rComponentsPage"));
  callMethod("feedImage", t_rClientElement, t_rImg)
  callMethod("setText", callMethod("getElement", meProp(_me, "m_rWindow"), "reg.username.input"), "")
  }

  }

}


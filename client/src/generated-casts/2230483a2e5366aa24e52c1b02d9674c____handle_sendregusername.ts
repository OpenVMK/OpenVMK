// 2230483a2e5366aa24e52c1b02d9674c.cct /  / handle_sendregusername

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_sendregusername(_me: LingoMe, tMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_sName = callMethod("getText", callMethod("getElement", callNamed("getObject", symbol("registration_interface")).m_rCurPageObj.m_rCurPageObj.m_rWindow, "reg.username.input"));
  if (lingoBinary("eq", t_sName, "")) {
  t_sName = callNamed("getObject", symbol("registration_interface")).m_rCurPageObj.m_rCurPageObj.m_sActiveName;
  }

  if (lingoBinary("eq", t_sName, "")) {
  return;
  }

  callMethod("send", callNamed("getObject", "VMK"), "RegUsername", callNamed("propList", symbol("str"), t_sName))
}


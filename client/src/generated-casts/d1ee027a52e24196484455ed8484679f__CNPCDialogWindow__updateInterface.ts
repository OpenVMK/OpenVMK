// d1ee027a52e24196484455ed8484679f.cct / CNPCDialogWindow / updateInterface

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function updateInterface(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_wWindowTitle"));
  if (lingoBinary("neq", tWndObj, 0)) {
  var t_Elem = callMethod("getElement", tWndObj, "npc.greeting.text");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("desc")))
  }

  t_Elem = callMethod("getElement", tWndObj, "npc.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("title")))
  }

  t_Elem = callMethod("getElement", tWndObj, "npc.greeting");
  if (lingoBinary("neq", t_Elem, 0)) {
  var t_iMemNum = callNamed("getmemnum", lingoBinary("join", "npc.", callMethod("getaProp", meProp(_me, "m_pTexts"), symbol("NPCName"))));
  if (lingoBinary("neq", t_iMemNum, 0)) {
  callMethod("feedImage", t_Elem, callMethod("duplicate", callNamed("member", t_iMemNum).image))
  }

  }

  }

}


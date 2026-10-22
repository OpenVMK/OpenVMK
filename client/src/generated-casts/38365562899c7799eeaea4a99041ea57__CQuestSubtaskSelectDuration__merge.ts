// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskSelectDuration / merge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function merge(_me: LingoMe, a_rWindow: LingoValue) {
  setMeProp(_me, "m_rWindow", a_rWindow);
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_setduration.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.selectduration"))
  }

  callMethod("createRadioButton", _me)
  return t_bSuccess;
}


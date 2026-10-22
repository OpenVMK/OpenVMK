// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskAcquireItem / Purge

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Purge(_me: LingoMe, a_rWindow: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  setMeProp(_me, "m_rWindow", undefined);
  var t_bSuccess = callMethod("unmerge", a_rWindow);
  callMethod("merge", a_rWindow, "vmk_quest_dialog.window")
  return t_bSuccess;
  } else {
  return 1;
  }

}


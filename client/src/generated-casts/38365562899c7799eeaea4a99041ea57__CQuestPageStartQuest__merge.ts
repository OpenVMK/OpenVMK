// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStartQuest / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_test.window");
  callMethod("changeImageInElement", _me, meProp(_me, "m_rWindow"), "quest.main.label", callNamed("member", "quest.label.start"))
  callMethod("createComponentWindow", _me, meProp(_me, "m_rWindow"), meProp(_me, "m_ar_components"), new LingoPropList(["quest.tasklist", new LingoList([]), "quest.prizes", new LingoList([])]))
  return t_bSuccess;
}


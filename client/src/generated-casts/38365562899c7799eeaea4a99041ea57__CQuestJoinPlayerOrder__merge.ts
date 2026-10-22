// 38365562899c7799eeaea4a99041ea57.cct / CQuestJoinPlayerOrder / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_join_player_order.window");
  callMethod("changeImageInElement", _me, meProp(_me, "m_rWindow"), "quest.main.label", callNamed("member", "quest.label.join"))
  callMethod("setButtonTxt", _me, meProp(_me, "m_rWindow"), "quest.next", callNamed("getText", "quest.next"))
  callMethod("createComponentWindow", _me, meProp(_me, "m_rWindow"), meProp(_me, "m_ar_components"), new LingoPropList(["quest.ratingstars", new LingoList([]), "quest.prizes", new LingoList([]), "quest.halloffame", new LingoList([])]))
  return t_bSuccess;
}


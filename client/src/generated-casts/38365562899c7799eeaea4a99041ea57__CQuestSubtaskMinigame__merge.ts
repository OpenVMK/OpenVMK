// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskMinigame / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_minigame.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.minigame"))
  }

  callMethod("createComponentWindow", _me, meProp(_me, "m_rWindow"), meProp(_me, "m_ar_components"), new LingoPropList(["quest.gamelist", new LingoList([])]))
  callMethod("AddContentFromXML", _me, meProp(_me, "m_rWindow"), meProp(_me, "m_ar_components"), "quest.content.selectminigame.xml")
  callMethod("setAmount", _me, 0)
  var t_ar_event = new LingoPropList([symbol("found"), 0, symbol("event"), "", symbol("client"), undefined, symbol("route"), new LingoPropList([])]);
  var t_rComponents = meProp(_me, "m_ar_components")["quest.gamelist"];
  callMethod("EventProc", t_rComponents, callNamed("point", 1, 1), t_ar_event)
  if (t_ar_event.found) {
  var t_rClientElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.gamelist");
  var t_rImg = callMethod("render", t_rComponents);
  callMethod("feedImage", t_rClientElement, t_rImg)
  }

  callMethod("updateDefaults", _me)
  return t_bSuccess;
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_create_step_2.window");
  callMethod("HideTabs", _me)
  callMethod("createComponentWindow", _me)
  callMethod("changeImageInElement", _me, meProp(_me, "m_rWindow"), "quest.main.label", callNamed("member", "quest.label.create"))
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.start.button", 0)
  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.main.hd", callNamed("getText", "quest.step2.title"))
  callMethod("hidePageTabs", _me)
  callMethod("creditsState", _me, 0)
  return t_bSuccess;
}


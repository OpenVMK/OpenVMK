// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep1 / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_create_step_1.window");
  callMethod("changeImageInElement", _me, meProp(_me, "m_rWindow"), "quest.main.label", callNamed("member", "quest.label.create"))
  if ((lingoTruthy(callNamed("objectp", meProp(_me, "m_rComponentsPage"))) ? 0 : 1)) {
  callMethod("createComponentWindow", _me)
  }

  callMethod("setField", _me, meProp(_me, "m_rWindow"), "quest.main.hd", callNamed("getText", "quest.step1.title"))
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.previousstep.button", 0)
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.start.button", 0)
  callMethod("hidePageTabs", _me)
  callMethod("reDraw", _me)
  callNamed("updateStage")
  return t_bSuccess;
}


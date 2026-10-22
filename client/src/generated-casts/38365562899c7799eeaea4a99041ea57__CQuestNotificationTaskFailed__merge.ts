// 38365562899c7799eeaea4a99041ea57.cct / CQuestNotificationTaskFailed / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_ingame_taskfailed.window");
  callMethod("setButtonTxt", _me, meProp(_me, "m_rWindow"), "quest.continue", callNamed("getText", "quest.task.tryagain"))
  return t_bSuccess;
}


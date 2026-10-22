// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskEmote / merge

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
  var t_bSuccess = callMethod("merge", meProp(_me, "m_rWindow"), "vmk_quest_emote.window");
  var t_rTitleElem = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.dialog.hd");
  if (lingoBinary("neq", t_rTitleElem, 0)) {
  callMethod("setText", t_rTitleElem, callNamed("getText", "quest.dialog.hd.emote"))
  }

  if (lingoBinary("neq", callNamed("getObject", "EmoticonMenu"), 0)) {
  callMethod("render", meProp(_me, "m_rGrid"), callNamed("getObject", "EmoticonMenu").m_ar_EmotList, callMethod("getElement", meProp(_me, "m_rWindow"), "quest.emoticons"))
  }

  return t_bSuccess;
}


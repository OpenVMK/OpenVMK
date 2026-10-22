// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / setDescription

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDescription(_me: LingoMe, a_sText: LingoValue) {
  var t_sNewLine = callNamed("numToChar", 10);
  var t_sReturn = callNamed("numToChar", 13);
  var t_sDesc = callNamed("replaceChunks", a_sText, t_sNewLine, t_sReturn);
  var t_rElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.description.input");
  if (lingoBinary("neq", t_rElement, 0)) {
  callMethod("setText", t_rElement, t_sDesc)
  }

}


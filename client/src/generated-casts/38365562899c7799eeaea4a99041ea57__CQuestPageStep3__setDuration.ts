// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / setDuration

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setDuration(_me: LingoMe, a_iSeconds: LingoValue) {
  var t_sTime = callNamed("seconds2time", a_iSeconds);
  var t_rElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.timetotal");
  if (lingoBinary("neq", t_rElement, 0)) {
  callMethod("setText", t_rElement, t_sTime)
  }

}


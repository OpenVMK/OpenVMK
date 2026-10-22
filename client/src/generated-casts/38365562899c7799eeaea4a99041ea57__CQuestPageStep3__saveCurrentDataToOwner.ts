// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / saveCurrentDataToOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function saveCurrentDataToOwner(_me: LingoMe) {
  var t_rManager = callMethod("getManager", _me);
  if (callNamed("objectp", t_rManager)) {
  var t_rOwner = callMethod("GetOwner", t_rManager);
  }

  if (callNamed("objectp", t_rOwner)) {
  var tElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.questname.input");
  var t_sText = callMethod("getText", tElement);
  var tDescElement = callMethod("getElement", meProp(_me, "m_rWindow"), "quest.description.input");
  var t_sDesc = callMethod("getText", tDescElement);
  var t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("questName")] = t_sText;
  t_ar_data[symbol("description")] = t_sDesc;
  t_ar_data[symbol("prizingMode")] = callMethod("getValue", meProp(_me, "m_rRadioButton"));
  t_ar_data[symbol("questDurationInSecs")] = callNamed("time2seconds", callMethod("getText", callMethod("getElement", meProp(_me, "m_rWindow"), "quest.timetotal")));
  callMethod("setData", t_rOwner, t_ar_data)
  }

}


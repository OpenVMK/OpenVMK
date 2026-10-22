// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / setPrizingMode

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setPrizingMode(_me: LingoMe, a_iMode: LingoValue) {
  switch (a_iMode) {
case 0:
  var a_sElemID = "quest.type1.button";
  break;
case 1:
  a_sElemID = "quest.type2.button";
  break;
  default:
  a_sElemID = "quest.type1.button";
  }

  callMethod("clickElement", meProp(_me, "m_rRadioButton"), a_sElemID)
  callMethod("updateMenu", meProp(_me, "m_rRadioButton"))
}


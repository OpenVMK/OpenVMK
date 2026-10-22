// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep2 / setTestingStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setTestingStatus(_me: LingoMe, a_bStatus: LingoValue) {
  if (a_bStatus) {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.start.button", 1)
  } else {
  callMethod("setButtonState", _me, meProp(_me, "m_rWindow"), "quest.start.button", 0)
  }

}


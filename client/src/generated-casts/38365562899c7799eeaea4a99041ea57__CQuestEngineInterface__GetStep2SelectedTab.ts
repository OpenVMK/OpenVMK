// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineInterface / GetStep2SelectedTab

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetStep2SelectedTab(_me: LingoMe) {
  return meProp(_me, "m_sStep2SelectedTab");
}


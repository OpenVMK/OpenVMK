// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineInterface / SetStep2SelectedTab

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetStep2SelectedTab(_me: LingoMe, a_sTab: LingoValue) {
  setMeProp(_me, "m_sStep2SelectedTab", a_sTab);
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestCannedField / setCharacterLimit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setCharacterLimit(_me: LingoMe, a_iLimit: LingoValue) {
  setMeProp(_me, "m_iCharacterLimit", a_iLimit);
}


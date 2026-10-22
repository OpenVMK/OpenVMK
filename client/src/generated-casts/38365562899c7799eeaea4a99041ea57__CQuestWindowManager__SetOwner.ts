// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / SetOwner

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SetOwner(_me: LingoMe, t_rOwner: LingoValue) {
  if (callNamed("objectp", t_rOwner)) {
  setMeProp(_me, "m_rOwner", t_rOwner);
  }

}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestPage / GetSelected

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetSelected(_me: LingoMe) {
  callNamed("error", _me, "Callin virtual method!", symbol("GetSelected"))
  return new LingoPropList([symbol("ref"), -float(1), symbol("code"), -float(1), symbol("state"), symbol("invalid")]);
}


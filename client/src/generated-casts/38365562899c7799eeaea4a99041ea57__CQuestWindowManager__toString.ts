// 38365562899c7799eeaea4a99041ea57.cct / CQuestWindowManager / toString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function toString(_me: LingoMe) {
  var t_s = lingoBinary("join", "Subtasks status:", "\r");
  t_s = lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", t_s, "  Todo"), callMethod("toString", meProp(_me, "m_st_todo"))), "\r");
  t_s = lingoBinary("join", lingoBinary("joinPad", lingoBinary("join", t_s, "  Done"), callMethod("toString", meProp(_me, "m_st_done"))), "\r");
  return t_s;
}


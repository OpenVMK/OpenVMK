// 38365562899c7799eeaea4a99041ea57.cct / testSubtaskInterface / runSubTaskTest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function runSubTaskTest(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "QuestTaskDefinition"), 0)) {
  callNamed("removeObject", "QuestTaskDefinition")
  }

  var t = callNamed("createObject", "QuestTaskDefinition", "CQuestWindowManager");
  callMethod("populate", t, new LingoList(["addtask"]))
  callMethod("Activate", t)
}


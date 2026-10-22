// 38365562899c7799eeaea4a99041ea57.cct / testSubtaskInterface / runInQuestTest

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function runInQuestTest(_me: LingoMe) {
  if (lingoBinary("neq", callNamed("getObject", "InQuestDialogs"), 0)) {
  callNamed("removeObject", "InQuestDialogs")
  }

  var t = callNamed("createObject", "InQuestDialogs", "CQuestWindowManager");
  callMethod("populate", t, new LingoList(["taskcompleted", "taskfailed", "questcancelled", "questcompleted"]))
  callMethod("Activate", t)
}


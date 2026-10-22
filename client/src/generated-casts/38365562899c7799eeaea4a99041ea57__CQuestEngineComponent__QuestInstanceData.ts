// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / QuestInstanceData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestInstanceData(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rQuestInstance"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rQuestInstance")))
  }

  setMeProp(_me, "m_rQuestInstance", callNamed("createObject", callNamed("getUniqueID"), "CQuestInstanceDataContainer"));
  callMethod("QuestInstanceData", meProp(_me, "m_rQuestInstance"), t_ar_data)
  callNamed("executeMessage", "PlayInterfaceSound", "QE_quest_launched")
}


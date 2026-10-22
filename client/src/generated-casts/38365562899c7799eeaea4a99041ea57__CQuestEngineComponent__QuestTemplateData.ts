// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineComponent / QuestTemplateData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestTemplateData(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("objectp", meProp(_me, "m_rQuestTemplate"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rQuestTemplate")))
  }

  setMeProp(_me, "m_rQuestTemplate", callNamed("createObject", callNamed("getUniqueID"), "CQuestTemplateDataContainer"));
  callMethod("QuestTemplateData", meProp(_me, "m_rQuestTemplate"), t_ar_data)
}


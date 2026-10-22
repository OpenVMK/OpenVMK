// 38365562899c7799eeaea4a99041ea57.cct / CQuestTemplateDataContainer / QuestTemplateData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestTemplateData(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("listp", t_ar_data)) {
  setMeProp(_me, "m_ar_data", t_ar_data);
  }

  switch (t_ar_data[symbol("status")]) {
case 1:
  callMethod("SetType", callMethod("getInterface", meProp(_me, "m_rInterface")), "steps")
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList(["step1", "step2", "step3"]))
  break;
case 2:
  callMethod("SetType", callMethod("getInterface", meProp(_me, "m_rInterface")), "normal")
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList(["startquest"]))
  break;
case 3:
  callMethod("SetType", callMethod("getInterface", meProp(_me, "m_rInterface")), "normal")
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList(["startquest"]))
  break;
  default:
  callMethod("SetType", callMethod("getInterface", meProp(_me, "m_rInterface")), "steps")
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList(["step1", "step2", "step3"]))
  }

  callMethod("Activate", meProp(_me, "m_rInterface"))
}


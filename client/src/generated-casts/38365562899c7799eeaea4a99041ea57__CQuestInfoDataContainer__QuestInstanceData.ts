// 38365562899c7799eeaea4a99041ea57.cct / CQuestInfoDataContainer / QuestInstanceData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestInstanceData(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("listp", t_ar_data)) {
  setMeProp(_me, "m_ar_dataContainer", t_ar_data);
  switch (t_ar_data[symbol("official")]) {
case 1:
  var t_sOwnerType = "staff";
  break;
case 0:
  t_sOwnerType = "staff";
  break;
  default:
  t_sOwnerType = "staff";
  }

  switch (t_ar_data[symbol("prizingMode")]) {
case 0:
  var t_sQuestType = "order";
  break;
case 1:
  t_sQuestType = "timerace";
  break;
case 2:
  t_sQuestType = "order";
  break;
  default:
  t_sQuestType = "order";
  }

  var t_sWindowName = lingoBinary("join", lingoBinary("join", lingoBinary("join", "info.", t_sOwnerType), "."), t_sQuestType);
  callNamed("put", lingoBinary("joinPad", "INFO type", t_sWindowName))
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList([t_sWindowName]))
  callMethod("Activate", meProp(_me, "m_rInterface"))
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("QuestInstanceData", t_rCurrentPage, t_ar_data)
  }

}


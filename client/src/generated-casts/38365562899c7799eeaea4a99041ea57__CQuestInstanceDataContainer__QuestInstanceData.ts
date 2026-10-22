// 38365562899c7799eeaea4a99041ea57.cct / CQuestInstanceDataContainer / QuestInstanceData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function QuestInstanceData(_me: LingoMe, t_ar_data: LingoValue) {
  callNamed("put", lingoBinary("joinPad", "QuestInstanceData ", t_ar_data))
  if (callNamed("listp", t_ar_data)) {
  setMeProp(_me, "m_ar_data", t_ar_data);
  switch (t_ar_data[symbol("official")]) {
case 1:
  var t_sOwnerType = "staff";
  break;
case 0:
  t_sOwnerType = "player";
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

  if (lingoBinary("eq", t_ar_data[symbol("officialQuestCount")], 0)) {
  var t_sWindowType = "info";
  if (lingoBinary("and", lingoBinary("and", lingoBinary("eq", t_sOwnerType, "player"), lingoBinary("eq", t_ar_data[symbol("owner")], 0)), lingoBinary("eq", t_ar_data[symbol("expired")], 0))) {
  switch (t_ar_data[symbol("avatarOnQuest")]) {
case 0:
  t_sWindowType = "join";
  break;
case 1:
  t_sWindowType = "info";
  break;
  default:
  t_sWindowType = "join";
  }

  }

  } else {
  t_sWindowType = "join";
  }

  var t_sWindowName = lingoBinary("join", lingoBinary("join", lingoBinary("join", lingoBinary("join", t_sWindowType, "."), t_sOwnerType), "."), t_sQuestType);
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList([t_sWindowName]))
  callMethod("Activate", meProp(_me, "m_rInterface"))
  }

}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestStartDataContainer / CurrenTaskData

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CurrenTaskData(_me: LingoMe, t_ar_data: LingoValue) {
  if (callNamed("listp", t_ar_data)) {
  setMeProp(_me, "m_ar_dataContainer", t_ar_data);
  callMethod("populate", meProp(_me, "m_rInterface"), new LingoList(["info"]))
  callMethod("Activate", meProp(_me, "m_rInterface"))
  var t_rCurrentPage = callMethod("getPage", callMethod("GetBase", callMethod("getInterface", meProp(_me, "m_rInterface"))));
  callMethod("CurrenTaskData", t_rCurrentPage, t_ar_data)
  }

}


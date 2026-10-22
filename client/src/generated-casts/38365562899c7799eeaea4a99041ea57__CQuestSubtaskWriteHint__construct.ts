// 38365562899c7799eeaea4a99041ea57.cct / CQuestSubtaskWriteHint / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  setMeProp(_me, "m_ar_components", new LingoPropList([]));
  setMeProp(_me, "m_iCurrentID", -float(1));
  callMethod("sort", meProp(_me, "m_ar_components"))
  setMeProp(_me, "m_rWindow", undefined);
  setMeProp(_me, "m_ar_data", new LingoList([]));
  setMeProp(_me, "m_ar_CannedFields", new LingoPropList([]));
  callNamed("registerMessage", symbol("photo_catalog_redraw"), callMethod("getID", _me), symbol("reDraw"))
  return 1;
}


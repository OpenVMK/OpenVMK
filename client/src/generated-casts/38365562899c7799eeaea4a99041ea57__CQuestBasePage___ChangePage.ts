// 38365562899c7799eeaea4a99041ea57.cct / CQuestBasePage / _ChangePage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ChangePage(_me: LingoMe, a_kPage: LingoValue) {
  if ((lingoTruthy(meProp(_me, "m_bReady")) ? 0 : 1)) {
  callMethod("update", _me, new LingoList([]), a_kPage)
  return;
  }

  setMeProp(_me, "m_sCurPageName", a_kPage);
  if (callNamed("objectp", meProp(_me, "m_rWindow"))) {
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("Purge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_rCurPageObj")))
  }

  var t_ar_kCategories = new LingoList([a_kPage]);
  var t_sCls = callNamed("GetClsVariable", lingoBinary("join", "quest.class.window.", meProp(_me, "m_sCurPageName")));
  if (lingoBinary("eq", t_sCls, 0)) {
  return callNamed("error", _me, lingoBinary("joinPad", "Unknown Quest Engine page! Subtask: ", meProp(_me, "m_sCurPageName")), symbol("_ChangePage"));
  }

  setMeProp(_me, "m_rCurPageObj", callNamed("createObject", callNamed("getUniqueID"), t_sCls));
  if (callNamed("objectp", meProp(_me, "m_rCurPageObj"))) {
  callMethod("setManager", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rManager"))
  callMethod("merge", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_rWindow"))
  for (var t_kCategory of t_ar_kCategories.toArray()) {
  callMethod("update", meProp(_me, "m_rCurPageObj"), meProp(_me, "m_mp_kType_mp_iRef_rItem"), t_kCategory)
  }

  } else {
  return callNamed("error", _me, "Failed to initialize Quest Engine page!", symbol("_ChangePage"));
  }

  }

}


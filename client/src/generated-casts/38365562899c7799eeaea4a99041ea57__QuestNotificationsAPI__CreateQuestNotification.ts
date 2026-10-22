// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / CreateQuestNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateQuestNotification(_me: LingoMe, t_sID: LingoValue, t_rOwner: LingoValue, t_ar_populate: LingoValue, t_sType: LingoValue, t_ar_data: LingoValue) {
  if (lingoBinary("neq", callNamed("getObject", t_sID), 0)) {
  callNamed("removeObject", t_sID)
  }

  var t = callNamed("createObject", t_sID, "CQuestWindowManager");
  if (callNamed("objectp", t)) {
  callMethod("SetOwner", t, t_rOwner)
  if ((lingoTruthy(callNamed("voidp", t_sType)) ? 0 : 1)) {
  callMethod("SetType", callMethod("getInterface", t), t_sType)
  }

  if ((lingoTruthy(callNamed("voidp", t_ar_populate)) ? 0 : 1)) {
  callMethod("populate", t, t_ar_populate)
  callMethod("Activate", t)
  }

  if ((lingoTruthy(callNamed("voidp", t_ar_data)) ? 0 : 1)) {
  if (callNamed("listp", t_ar_data)) {
  if (callNamed("objectp", callMethod("getInterface", t))) {
  if (callNamed("objectp", callMethod("GetBase", callMethod("getInterface", t)))) {
  if (callNamed("objectp", callMethod("getPage", callMethod("GetBase", callMethod("getInterface", t))))) {
  callMethod("rawData", callMethod("getPage", callMethod("GetBase", callMethod("getInterface", t))), t_ar_data)
  }

  }

  }

  }

  }

  }

  return t;
}


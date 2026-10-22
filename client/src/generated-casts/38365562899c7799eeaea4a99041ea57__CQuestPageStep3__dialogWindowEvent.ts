// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStep3 / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, t_dialogName: LingoValue, t_dialogEvent: LingoValue) {
  var t_rManager = callMethod("getManager", _me);
  var t_rOwner = callMethod("GetOwner", t_rManager);
  switch (t_dialogName) {
case "quest.dialog.testconfirmation":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  var t_ar_data = new LingoPropList([]);
  t_ar_data[symbol("StartQuest")] = 1;
  t_ar_data[symbol("releaseQuest")] = 0;
  if (callNamed("objectp", t_rManager)) {
  callMethod("appendSubResult", t_rManager, t_ar_data)
  callMethod("resolveSubtask", t_rManager)
  callMethod("Activate", t_rManager)
  }

  break;
case symbol("dialogCancel"):
  break;
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown Dialog Window", t_dialogName))
  }

}


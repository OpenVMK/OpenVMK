// 38365562899c7799eeaea4a99041ea57.cct / CQuestPageStartQuest / dialogWindowEvent

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
case "quest.dialog.editquestconfirmation":
  switch (t_dialogEvent) {
case symbol("dialogOK"):
  callMethod("StopQuestTesting", callMethod("getHandler", callNamed("getThread", symbol("QuestEngine"))), new LingoList([meProp(_me, "m_ar_data")[symbol("questTemplateId")], 1]))
  if (callNamed("objectp", t_rManager)) {
  callNamed("removeObject", callMethod("getID", t_rManager))
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


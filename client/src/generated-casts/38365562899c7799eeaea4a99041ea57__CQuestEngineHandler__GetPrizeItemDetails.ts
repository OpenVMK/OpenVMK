// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / GetPrizeItemDetails

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function GetPrizeItemDetails(_me: LingoMe, t_arg: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("questTemplateId"), symbol("int"), symbol("rank"), symbol("int"), symbol("prizeIndex")]);
  var t_ar_Msg = callMethod("createClientCommand", _me, t_arg, t_ar_msgDesc);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 868, t_ar_Msg)
  if (meProp(_me, "m_bDebug")) {
  callNamed("put", lingoBinary("joinPad", "QuestEngine<-GetPrizeItemDetails", t_ar_Msg))
  }

}


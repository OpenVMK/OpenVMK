// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / TaskAdded

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TaskAdded(_me: LingoMe, tMsgStruct: LingoValue) {
  var t_ar_msgDesc = new LingoPropList([symbol("int"), symbol("taskNumber"), symbol("int"), symbol("taskType"), symbol("int"), symbol("photoId"), symbol("str"), symbol("description"), symbol("tasksettings"), symbol("undefined")]);
  var t_ar_out = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_msgDesc);
  callMethod("TaskAdded", callMethod("getComponent", _me), t_ar_out)
}


// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / parseServerMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseServerMessage(_me: LingoMe, tMsgStruct: LingoValue, t_ar_msgDesc: LingoValue) {
  var t_ar_out = new LingoPropList([]);
  for (var t = 1; t <= t_ar_msgDesc.count; ++t) {
  var t_symProp = callMethod("getPropAt", t_ar_msgDesc, t);
  var t_symValue = t_ar_msgDesc[t];
  switch (t_symProp) {
case symbol("bool"):
  t_ar_out[t_symValue] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case symbol("int"):
  t_ar_out[t_symValue] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case symbol("str"):
  t_ar_out[t_symValue] = callMethod("GetStrFrom", tMsgStruct.connection);
  break;
case symbol("canned"):
  t_ar_out[t_symValue] = callNamed("TransformCannedMsgToString", tMsgStruct);
  break;
case symbol("Array"):
  var t_iArrayCount = t_ar_out[t_ar_out.count];
  var t_sArrayParam = callMethod("getPropAt", t_ar_out, t_ar_out.count)._string;
  t_sArrayParam = callNamed("symbol", lingoBinary("join", callNamed("replaceChunks", t_sArrayParam, "count", ""), "array"));
  t_ar_out[t_sArrayParam] = new LingoList([]);
  for (var t_iCounter = 1; t_iCounter <= t_iArrayCount; ++t_iCounter) {
  callMethod("append", t_ar_out[t_sArrayParam], callMethod("parseServerMessage", _me, tMsgStruct, t_symValue))
  }

  break;
case symbol("tasksettings"):
  var t_iTaskPos = callMethod("getPos", t_ar_msgDesc, symbol("taskType"));
  if (lingoBinary("gt", t_iTaskPos, 0)) {
  var t_iTaskType = t_ar_out[t_iTaskPos];
  switch (t_iTaskType) {
case 1:
  t_ar_out[symbol("entitytypeID")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 2:
  t_ar_out[symbol("required")] = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[symbol("item_count")] = callMethod("GetIntFrom", tMsgStruct.connection);
  var t_ar_items = new LingoList([]);
  t_ar_out[symbol("item_array")] = t_ar_items;
  break;
case 3:
  t_ar_out[symbol("spaceTag")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 4:
  t_ar_out[symbol("GameID")] = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[symbol("score")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 5:
  t_ar_out[symbol("magicEffectCode")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 6:
  break;
case 7:
  t_ar_out[symbol("phrase")] = callMethod("GetStrFrom", tMsgStruct.connection);
  break;
case 8:
  t_ar_out[symbol("amount")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 9:
  t_ar_out[symbol("amount")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 10:
  break;
case 11:
  break;
case 12:
  t_ar_out[symbol("emoticon")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 13:
  break;
case 14:
  break;
case 15:
  t_ar_out[symbol("itemCode")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 16:
  break;
case 17:
  t_ar_out[symbol("correctAnswerID")] = callMethod("GetIntFrom", tMsgStruct.connection);
  var t_iAnswerCount = callMethod("GetIntFrom", tMsgStruct.connection);
  var t_ar_answers = new LingoList([]);
  for (var i = 1; i <= t_iAnswerCount; ++i) {
  callMethod("append", t_ar_answers, callMethod("GetStrFrom", tMsgStruct.connection))
  }

  t_ar_out[symbol("answers")] = t_ar_answers;
  break;
case 18:
  t_ar_out[symbol("itemCode")] = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[symbol("amount")] = callMethod("GetIntFrom", tMsgStruct.connection);
  break;
case 19:
  t_ar_out[symbol("required")] = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[symbol("item_count")] = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_items = new LingoList([]);
  t_ar_out[symbol("item_array")] = t_ar_items;
  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown server task-type (can discard) ", t_iTaskType))
  }

  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown property", t_symProp))
  }

  }

  return t_ar_out;
}


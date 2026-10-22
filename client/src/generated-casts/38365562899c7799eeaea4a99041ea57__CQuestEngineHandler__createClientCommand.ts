// 38365562899c7799eeaea4a99041ea57.cct / CQuestEngineHandler / createClientCommand

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createClientCommand(_me: LingoMe, t_ar_Params: LingoValue, t_ar_msgDesc: LingoValue) {
  var t_ar_out = new LingoPropList([]);
  for (var t = 1; t <= t_ar_msgDesc.count; ++t) {
  var t_symProp = callMethod("getPropAt", t_ar_msgDesc, t);
  var t_symValue = t_ar_msgDesc[t];
  switch (t_symProp) {
case symbol("int"):
  callMethod("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  break;
case symbol("str"):
  callMethod("addProp", t_ar_out, t_symProp, t_ar_Params[t])
  break;
case symbol("canned"):
  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_Params[t], 0);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tValue = tCannedBlock[i];
  callMethod("addProp", t_ar_out, tKey, tValue)
  }

  break;
case symbol("tasksettings"):
  var t_iTaskPos = callMethod("getPos", t_ar_msgDesc, symbol("taskType"));
  if (lingoBinary("gt", t_iTaskPos, 0)) {
  var t_iTaskType = t_ar_out[t_iTaskPos];
  switch (t_iTaskType) {
case 1:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 2:
  callMethod("addProp", t_ar_out, symbol("int"), 1)
  callMethod("addProp", t_ar_out, symbol("int"), 1)
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[lingoBinary("add", t, 1)])
  break;
case 3:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 4:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[lingoBinary("add", t, 1)])
  break;
case 5:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 6:
  break;
case 7:
  tCannedBlock = callNamed("TransformCannedToMsg", t_ar_Params[t], 0);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  tKey = callMethod("getPropAt", tCannedBlock, i);
  tValue = tCannedBlock[i];
  callMethod("addProp", t_ar_out, tKey, tValue)
  }

  break;
case 8:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 9:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 10:
  break;
case 11:
  break;
case 12:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 13:
  break;
case 14:
  break;
case 15:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  break;
case 16:
  break;
case 17:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[lingoBinary("add", t, 1)].count)
  for (var t_ar_CannedContent of t_ar_Params[lingoBinary("add", t, 1)].toArray()) {
  tCannedBlock = callNamed("TransformCannedToMsg", t_ar_CannedContent, 0);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  tKey = callMethod("getPropAt", tCannedBlock, i);
  tValue = tCannedBlock[i];
  callMethod("addProp", t_ar_out, tKey, tValue)
  }

  }

  break;
case 18:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[lingoBinary("add", t, 1)])
  break;
case 19:
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[t])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_Params[lingoBinary("add", t, 1)].count)
  for (var t_ar_pair of t_ar_Params[lingoBinary("add", t, 1)].toArray()) {
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_pair[1])
  callMethod("addProp", t_ar_out, symbol("int"), t_ar_pair[2])
  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Unknown clien task-type", t_iTaskType))
  }

  }

  break;
  default:
  callNamed("put", lingoBinary("joinPad", "Could not append unknown prop-type", t_symProp))
  }

  }

  return t_ar_out;
}


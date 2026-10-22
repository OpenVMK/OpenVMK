// 2230483a2e5366aa24e52c1b02d9674c.cct / CMessengerHandler / parseServerMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parseServerMessage(_me: LingoMe, tMsgStruct: LingoValue, t_ar_msgDesc: LingoValue) {
  var t_ar_out = callNamed("propList");
  for (var t = 1; t <= t_ar_msgDesc.count; ++t) {
  var t_symProp = callMethod("getPropAt", t_ar_msgDesc, t);
  var t_symValue = t_ar_msgDesc[t];
  if (lingoBinary("eq", t_symProp, symbol("bool"))) {
  t_ar_out[t_symValue] = callMethod("GetIntFrom", tMsgStruct.connection);
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("int"))) {
  var t_iValue = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[t_symValue] = t_iValue;
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("str"))) {
  t_ar_out[t_symValue] = callMethod("GetStrFrom", tMsgStruct.connection);
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("canned"))) {
  t_ar_out[t_symValue] = callMethod("GetStrFrom", tMsgStruct.connection);
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("condition"))) {
  t_iValue = callMethod("GetIntFrom", tMsgStruct.connection);
  t_ar_out[t_symValue] = t_iValue;
  if (t_iValue) {
  var t_ar_chosen = t_ar_msgDesc[lingoBinary("add", t, 1)];
  } else {
  t_ar_chosen = t_ar_msgDesc[lingoBinary("add", t, 2)];
  }

  var t_ar_temp = callMethod("parseServerMessage", _me, tMsgStruct, t_ar_chosen);
  for (var t_iTemp = 1; t_iTemp <= t_ar_temp.count; ++t_iTemp) {
  t_ar_out[callMethod("getPropAt", t_ar_temp, t_iTemp)] = t_ar_temp[t_iTemp];
  }

  t = lingoBinary("add", t, 2);
  continue;
  }

  if (lingoBinary("eq", t_symProp, symbol("Array"))) {
  var t_iArrayCount = t_ar_out[t_ar_out.count];
  var t_sArrayParam = callMethod("getPropAt", t_ar_out, t_ar_out.count)._string;
  t_sArrayParam = callNamed("symbol", lingoBinary("join", callNamed("replaceChunks", t_sArrayParam, "count", ""), "array"));
  t_ar_out[t_sArrayParam] = new LingoList([]);
  for (var t_iCounter = 1; t_iCounter <= t_iArrayCount; ++t_iCounter) {
  callMethod("append", t_ar_out[t_sArrayParam], callMethod("parseServerMessage", _me, tMsgStruct, t_symValue))
  }

  continue;
  }

  callNamed("put", lingoBinary("joinPad", "Unknown property", t_symProp))
  }

  return t_ar_out;
}


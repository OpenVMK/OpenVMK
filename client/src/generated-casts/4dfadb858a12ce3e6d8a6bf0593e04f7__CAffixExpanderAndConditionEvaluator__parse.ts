// 4dfadb858a12ce3e6d8a6bf0593e04f7.cct / CAffixExpanderAndConditionEvaluator / parse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function parse(_me: LingoMe, i_sCondition: LingoValue) {
  var tWriteIndex = 1;
  var tReadIndex = 1;
  var t_iLen = callNamed("length", i_sCondition);
  while (lingoBinary("lte", tReadIndex, t_iLen)) {
  var tChar = callNamed("chars", i_sCondition, tReadIndex, tReadIndex);
  switch (tChar) {
case "[":
  if (lingoBinary("eq", callNamed("chars", i_sCondition, lingoBinary("add", tReadIndex, 1), lingoBinary("add", tReadIndex, 1)), "^")) {
  var tLastReadIndex = lingoBinary("sub", callNamed("offset", "]", callNamed("chars", i_sCondition, tReadIndex, t_iLen)), 1);
  if (lingoBinary("eq", tLastReadIndex, 0)) {
  callNamed("error", _me, "range field not closed!", symbol("ExpandCondition"))
  return;
  }

  for (var i = lingoBinary("add", tReadIndex, 2); i <= tLastReadIndex; ++i) {
  callMethod("AddNoChar", _me, callNamed("chars", i_sCondition, i, i), tWriteIndex)
  }

  tReadIndex = lingoBinary("add", tLastReadIndex, 2);
  tWriteIndex = lingoBinary("add", tWriteIndex, 1);
  } else {
  tLastReadIndex = lingoBinary("sub", callNamed("offset", "]", callNamed("chars", i_sCondition, tReadIndex, t_iLen)), 1);
  if (lingoBinary("eq", tLastReadIndex, 0)) {
  callNamed("error", _me, "range field not closed!", symbol("parse"))
  return;
  }

  for (var i = lingoBinary("add", tReadIndex, 1); i <= tLastReadIndex; ++i) {
  callMethod("AddYesChar", _me, callNamed("chars", i_sCondition, i, i), tWriteIndex)
  }

  tReadIndex = lingoBinary("add", tLastReadIndex, 2);
  tWriteIndex = lingoBinary("add", tWriteIndex, 1);
  }

  break;
case "]":
  callNamed("error", _me, "range field error!", symbol("parse"))
  tReadIndex = lingoBinary("add", tReadIndex, 1);
  break;
  default:
  callMethod("AddYesChar", _me, chunkOf(i_sCondition, "char", tReadIndex, 0), tWriteIndex)
  tReadIndex = lingoBinary("add", tReadIndex, 1);
  tWriteIndex = lingoBinary("add", tWriteIndex, 1);
  }

  }

}


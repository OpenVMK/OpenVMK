// 24e5d5f4c8c8b7ba3f03a21ec75b8a91.cct / CCannedField / CreateCannedField

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateCannedField(_me: LingoMe) {
  if (lingoBinary("lt", theProperty("paramCount"), 2)) {
  callNamed("put", "CreateCannedField(t_sWindowTitle, t_sFieldElement) called with incorrect parameters")
  return 0;
  }

  var t_sWindowTitle = callNamed("param", 1);
  var t_sFieldElement = callNamed("param", 2);
  if (lingoBinary("gt", theProperty("paramCount"), 2)) {
  var t_pNormalColor = callNamed("param", 3);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 3)) {
  var t_pErrorColor = callNamed("param", 4);
  }

  return callMethod("createNewCannedField", callMethod("getComponent", callNamed("getThread", "CannedField")), t_sWindowTitle, t_sFieldElement, t_pNormalColor, t_pErrorColor);
}


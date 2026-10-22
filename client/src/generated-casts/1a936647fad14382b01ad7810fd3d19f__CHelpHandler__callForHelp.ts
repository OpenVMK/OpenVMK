// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpHandler / callForHelp

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function callForHelp(_me: LingoMe, categoryId: LingoValue, t_ar_cWords: LingoValue, harasserName: LingoValue) {
  if (callNamed("stringp", t_ar_cWords)) {
  t_ar_cWords = callNamed("ParseCannedText", t_ar_cWords);
  }

  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_cWords);
  var tMsg = new LingoPropList([symbol("int"), categoryId]);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  callMethod("addProp", tMsg, symbol("str"), harasserName)
  callNamed("put", lingoBinary("joinPad", "CFH", tMsg))
  callMethod("send", callNamed("getConnection", "VMK"), "CallForHelp", tMsg)
}


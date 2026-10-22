// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / array_slice

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function array_slice(_me: LingoMe, t_ar_array: LingoValue, t_iOffset: LingoValue, t_iLength: LingoValue) {
  var t_ar_out = callMethod("duplicate", t_ar_array);
  for (var i = lingoBinary("sub", t_iOffset, 1); i >= 1; --i) {
  callMethod("deleteAt", t_ar_out, i)
  }

  while (lingoBinary("gt", t_ar_out.count, t_iLength)) {
  callMethod("deleteAt", t_ar_out, t_ar_out.count)
  }

  return t_ar_out;
}


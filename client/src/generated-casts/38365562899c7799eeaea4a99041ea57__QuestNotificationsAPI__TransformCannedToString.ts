// 38365562899c7799eeaea4a99041ea57.cct / QuestNotificationsAPI / TransformCannedToString

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TransformCannedToString(_me: LingoMe, t_ar_Canned: LingoValue) {
  var t_sWords = "";
  if (callNamed("listp", t_ar_Canned)) {
  for (var t_ar_word of t_ar_Canned.toArray()) {
  t_sWords = t_sWords + t_ar_word[symbol("word")];
  }

  }

  return t_sWords;
}


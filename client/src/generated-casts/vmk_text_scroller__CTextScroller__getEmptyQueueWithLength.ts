// vmk_text_scroller.cct / CTextScroller / getEmptyQueueWithLength

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getEmptyQueueWithLength(_me: LingoMe, resetChar: LingoValue, resetLen: LingoValue) {
  var t_queue = new LingoList([]);
  if (callNamed("voidp", resetChar)) {
  resetChar = " ";
  }

  if (callNamed("voidp", resetLen)) {
  resetLen = meProp(_me, "m_iVisibleCharCount");
  }

  for (var i = 1; i <= resetLen; ++i) {
  t_queue[i] = resetChar;
  }

  return t_queue;
}


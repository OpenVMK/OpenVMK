// vmk_text_scroller.cct / CTextScroller / getRandomQueueWithLength

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRandomQueueWithLength(_me: LingoMe, resetLen: LingoValue) {
  var t_allowedChars = "ACDMNQRTUWXYZ0123456789!";
  var t_queue = new LingoList([]);
  if (callNamed("voidp", resetLen)) {
  resetLen = meProp(_me, "m_iVisibleCharCount");
  }

  for (var i = 1; i <= resetLen; ++i) {
  t_queue[i] = t_allowedChars.char[callNamed("random", t_allowedChars.char.count)];
  }

  return t_queue;
}


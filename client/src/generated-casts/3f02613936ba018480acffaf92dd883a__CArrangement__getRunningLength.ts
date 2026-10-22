// 3f02613936ba018480acffaf92dd883a.cct / CArrangement / getRunningLength

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getRunningLength(_me: LingoMe) {
  var t_totalLengths = new LingoList([]);
  for (var i = 1; i <= meProp(_me, "m_ar_animContainers").count; ++i) {
  var t_len = lingoBinary("mul", lingoBinary("add", meProp(_me, "m_ar_animContainers")[i].offset, meProp(_me, "m_ar_pAnimations")[i].m_ar_framelist.count), meProp(_me, "m_ar_animContainers")[i].fpsdivider);
  var t_loopLen = 0;
  if (lingoBinary("gt", meProp(_me, "m_ar_pAnimations")[i].m_iLoopCount, 1)) {
  t_loopLen = lingoBinary("mul", lingoBinary("mul", lingoBinary("add", lingoBinary("sub", meProp(_me, "m_ar_pAnimations")[i].m_iLoopEnd, meProp(_me, "m_ar_pAnimations")[i].m_iLoopStart), 1), lingoBinary("add", meProp(_me, "m_ar_pAnimations")[i].m_iLoopCount, 1)), meProp(_me, "m_ar_animContainers")[i].fpsdivider);
  t_len = lingoBinary("add", t_len, t_loopLen);
  }

  callMethod("append", t_totalLengths, t_len)
  }

  setMeProp(_me, "m_iRunningLength", callMethod("max", t_totalLengths));
  return callMethod("max", t_totalLengths);
}


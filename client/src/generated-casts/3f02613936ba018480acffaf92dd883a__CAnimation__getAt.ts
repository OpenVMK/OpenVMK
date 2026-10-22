// 3f02613936ba018480acffaf92dd883a.cct / CAnimation / getAt

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getAt(_me: LingoMe, i_iframe: LingoValue) {
  var tFrameNum = 1;
  if (lingoBinary("and", lingoBinary("gt", i_iframe, meProp(_me, "m_iLoopEnd")), lingoBinary("neq", meProp(_me, "m_iLoopCount"), 0))) {
  var tLoopLength = lingoBinary("add", callNamed("integer", lingoBinary("sub", meProp(_me, "m_iLoopEnd"), meProp(_me, "m_iLoopStart"))), 1);
  var tTimesOver = lingoBinary("div", lingoBinary("sub", i_iframe, meProp(_me, "m_iLoopEnd")), tLoopLength);
  if (lingoBinary("gt", tTimesOver, meProp(_me, "m_iLoopCount"))) {
  tFrameNum = lingoBinary("sub", i_iframe, lingoBinary("mul", lingoBinary("add", meProp(_me, "m_iLoopCount"), 1), tLoopLength));
  } else {
  if (lingoBinary("neq", tTimesOver, 0)) {
  tFrameNum = lingoBinary("add", meProp(_me, "m_iLoopStart"), lingoBinary("sub", lingoBinary("sub", i_iframe, meProp(_me, "m_iLoopEnd")), lingoBinary("mul", tLoopLength, tTimesOver)));
  } else {
  tFrameNum = lingoBinary("add", meProp(_me, "m_iLoopStart"), lingoBinary("sub", i_iframe, meProp(_me, "m_iLoopEnd")));
  }

  }

  } else {
  tFrameNum = i_iframe;
  }

  if ((lingoTruthy(callNamed("voidp", callMethod("getaProp", meProp(_me, "m_ar_soundList"), callNamed("string", tFrameNum)))) ? 0 : 1)) {
  var snd = meProp(_me, "m_ar_soundList")[callNamed("string", tFrameNum)];
  setThePropOf(snd, "playcount", lingoBinary("add", snd.playcount, 1));
  if (lingoBinary("lte", snd.playcount, 1)) {
  callNamed("executeMessage", "PlayFxSound", snd.name)
  }

  }

  if (lingoBinary("gt", tFrameNum, meProp(_me, "m_ar_framelist").count)) {
  if (meProp(_me, "m_bFreeze")) {
  tFrameNum = meProp(_me, "m_ar_framelist").count;
  } else {
  return "";
  }

  setMeProp(_me, "m_bStopped", 1);
  } else {
  setMeProp(_me, "m_bStopped", 0);
  }

  return meProp(_me, "m_ar_framelist")[tFrameNum];
}


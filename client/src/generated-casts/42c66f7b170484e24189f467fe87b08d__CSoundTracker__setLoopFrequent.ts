// 42c66f7b170484e24189f467fe87b08d.cct / CSoundTracker / setLoopFrequent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setLoopFrequent(_me: LingoMe, a_SndName: LingoValue, a_ichannelNo: LingoValue, a_iFrequent: LingoValue, a_sType: LingoValue) {
  var t_FloatPre = theProperty("floatPrecision");
  setTheProperty("floatPrecision", 1);
  var t_SndDuration = lingoBinary("div", callNamed("member", callNamed("getmemnum", a_SndName)).duration, 1000);
  var t_iNewTime = lingoBinary("add", lingoBinary("add", meProp(_me, "m_CurrentTime"), a_iFrequent), t_SndDuration);
  for (var i = 1; i <= 50; ++i) {
  if (callMethod("findPos", meProp(_me, "m_mpSoundData"), callNamed("string", t_iNewTime))) {
  callMethod("add", meProp(_me, "m_mpSoundData")[callNamed("string", t_iNewTime)], new LingoList([a_SndName, a_ichannelNo, a_sType, undefined]))
  } else {
  meProp(_me, "m_mpSoundData")[callNamed("string", t_iNewTime)] = new LingoList([]);
  callMethod("add", meProp(_me, "m_mpSoundData")[callNamed("string", t_iNewTime)], new LingoList([a_SndName, a_ichannelNo, a_sType, undefined]))
  }

  t_iNewTime = lingoBinary("add", t_iNewTime, a_iFrequent);
  }

  setTheProperty("floatPrecision", t_FloatPre);
}


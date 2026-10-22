// 239fb1d2675fc448140198b03238814c.cct / CMainThumbGridAnimator / update

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function update(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iIndex", lingoBinary("add", meProp(_me, "m_iIndex"), 1));
  var t_rFrame = meProp(_me, "m_ar_rImage")[meProp(_me, "m_iIndex")];
  var t_rcTarget = callNamed("rect", lingoBinary("sub", lingoBinary("div", meProp(_me, "m_rBuffer").width, 2), lingoBinary("div", t_rFrame.width, 2)), lingoBinary("sub", lingoBinary("div", meProp(_me, "m_rBuffer").height, 2), lingoBinary("div", t_rFrame.height, 2)), lingoBinary("add", lingoBinary("div", meProp(_me, "m_rBuffer").width, 2), lingoBinary("div", t_rFrame.width, 2)), lingoBinary("add", lingoBinary("div", meProp(_me, "m_rBuffer").height, 2), lingoBinary("div", t_rFrame.height, 2)));
  callMethod("copyPixels", meProp(_me, "m_rBuffer"), t_rFrame, t_rcTarget, t_rFrame.rect)
  if (lingoBinary("neq", meProp(_me, "m_rElement"), undefined)) {
  callMethod("feedImage", meProp(_me, "m_rElement"), meProp(_me, "m_rBuffer"))
  }

  if (lingoBinary("eq", meProp(_me, "m_iIndex"), meProp(_me, "m_iLength"))) {
  setMeProp(_me, "m_iIndex", 0);
  }

}


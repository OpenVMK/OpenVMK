// 239fb1d2675fc448140198b03238814c.cct / CMainThumbGridAnimator / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_iIndex", 0);
  setMeProp(_me, "m_iLength", 0);
  callMethod("SetBufferElement", _this, undefined)
  var t_ar_rImages = new LingoList([]);
  for (var i = 1; i <= 8; ++i) {
  callMethod("add", t_ar_rImages, callNamed("getMember", lingoBinary("join", "thumbload_", i)).image)
  }

  callMethod("LoadAnimation", _this, t_ar_rImages)
  return 1;
}


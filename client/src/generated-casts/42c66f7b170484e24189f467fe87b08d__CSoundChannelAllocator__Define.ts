// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelAllocator / Define

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function Define(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mpSndChannels", new LingoList([]));
  for (var i = 1; i <= 3; ++i) {
  var t_Obj = callNamed("createObject", callNamed("getUniqueID"), "CSoundChannelObject");
  callMethod("add", meProp(_me, "m_mpSndChannels"), t_Obj)
  callMethod("DefineChannel", t_Obj, i)
  }

  callNamed("registerMessage", "GetSndChannel", callMethod("getID", _this), symbol("PlaySound"))
  return 1;
}


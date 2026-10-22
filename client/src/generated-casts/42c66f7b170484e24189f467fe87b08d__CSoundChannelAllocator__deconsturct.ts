// 42c66f7b170484e24189f467fe87b08d.cct / CSoundChannelAllocator / deconsturct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconsturct(_me: LingoMe, _this: LingoValue) {
  setMeProp(_me, "m_mpSndChannels", new LingoList([]));
  callNamed("unregisterMessage", "GetSndChannel")
  return 1;
}


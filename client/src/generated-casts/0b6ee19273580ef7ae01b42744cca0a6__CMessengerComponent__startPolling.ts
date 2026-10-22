// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / startPolling

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function startPolling(_me: LingoMe) {
  if ((lingoTruthy(meProp(_me, "m_bPolling")) ? 0 : 1)) {
  callMethod("poll", _me)
  callNamed("createTimeout", symbol("messenger_poller"), meProp(_me, "m_iPollingDelay"), symbol("poll"), callMethod("getID", _me), undefined, 0)
  setMeProp(_me, "m_bPolling", 1);
  }

}


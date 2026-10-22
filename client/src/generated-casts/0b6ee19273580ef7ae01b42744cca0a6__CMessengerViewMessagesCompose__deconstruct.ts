// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerViewMessagesCompose / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  if (callNamed("objectp", meProp(_me, "m_pComposeMessage"))) {
  callNamed("removeObject", callMethod("getID", meProp(_me, "m_pComposeMessage")))
  }

  callMethod("Purge", _me)
  return 1;
}


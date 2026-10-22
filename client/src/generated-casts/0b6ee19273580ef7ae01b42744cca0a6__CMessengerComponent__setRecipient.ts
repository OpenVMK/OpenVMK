// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerComponent / setRecipient

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setRecipient(_me: LingoMe, a_rRecipientData: LingoValue) {
  setMeProp(_me, "m_rRecipient", a_rRecipientData);
}


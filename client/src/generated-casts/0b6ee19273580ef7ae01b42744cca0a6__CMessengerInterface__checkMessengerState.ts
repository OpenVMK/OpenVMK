// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerInterface / checkMessengerState

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function checkMessengerState(_me: LingoMe) {
  switch (meProp(_me, "m_iMessengerState")) {
case symbol("released"):
  setMeProp(_me, "m_iMessengerState", symbol("normal"));
  if ((lingoTruthy(meProp(_me, "m_bVisible")) ? 0 : 1)) {
  callMethod("show", _me)
  callMethod("changeView", _me, "messagesnew")
  }

  break;
  }

}


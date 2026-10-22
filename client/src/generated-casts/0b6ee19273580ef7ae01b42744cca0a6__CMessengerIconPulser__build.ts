// 0b6ee19273580ef7ae01b42744cca0a6.cct / CMessengerIconPulser / build

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function build(_me: LingoMe) {
  setMeProp(_me, "m_gNormal", callNamed("member", callNamed("getmemnum", "button.messenger.active")).image);
  setMeProp(_me, "m_gPressed", callNamed("member", callNamed("getmemnum", "button.messenger.pressed")).image);
  setMeProp(_me, "m_gComposite", callNamed("image", meProp(_me, "m_gNormal").rect.width, meProp(_me, "m_gNormal").rect.height, 32));
}


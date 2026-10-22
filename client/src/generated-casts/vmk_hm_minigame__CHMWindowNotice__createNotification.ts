// vmk_hm_minigame.cct / CHMWindowNotice / createNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createNotification(_me: LingoMe) {
  setMeProp(_me, "m_rNotification", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_rNotification"), "visible", 0);
  setThePropOf(meProp(_me, "m_rNotification"), "member", undefined);
  setThePropOf(meProp(_me, "m_rNotification"), "ink", 33);
  setThePropOf(meProp(_me, "m_rNotification"), "locZ", 10000);
}


// vmk_hm_minigame.cct / CHMWindowUI / setChattable

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function setChattable(_me: LingoMe, t_bChatMode: LingoValue) {
  callMethod("setEdit", callMethod("getElement", callNamed("getWindow", meProp(_me, "m_sWindowName")), "pirates.chat.field"), t_bChatMode)
  callMethod("setButtonState", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "pirates.exitgame.button", t_bChatMode)
  callMethod("setButtonState", meProp(_me, "m_rClient"), meProp(_me, "m_sWindowName"), "hm.keyoptions.button", t_bChatMode)
}


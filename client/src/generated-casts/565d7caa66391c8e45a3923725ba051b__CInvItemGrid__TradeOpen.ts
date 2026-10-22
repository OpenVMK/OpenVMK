// 565d7caa66391c8e45a3923725ba051b.cct / CInvItemGrid / TradeOpen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function TradeOpen(_me: LingoMe, _this: LingoValue, a_bState: LingoValue) {
  setMeProp(_me, "m_bTradeOpen", a_bState);
  setMeProp(_me, "m_sBlinkTimer", lingoBinary("joinPad", "Highlight Blink Timer", callMethod("getID", _this)));
}


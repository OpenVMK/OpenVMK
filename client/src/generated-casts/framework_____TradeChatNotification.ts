// framework.dcr /  / _TradeChatNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeChatNotification(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  callNamed("ShowSellConfirm", callMethod("removeObject", ref))
}


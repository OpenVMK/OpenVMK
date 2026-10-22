// vmk_3.dcr / test / _TradeChatNotification

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeChatNotification(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_sMsg = callMethod("GetStrFrom", a_rMsg.connection);
  var t_chatMsg = callNamed("propList", symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), "VMK Administration");
}


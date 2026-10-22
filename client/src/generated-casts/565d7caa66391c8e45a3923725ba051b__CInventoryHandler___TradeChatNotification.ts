// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryHandler / _TradeChatNotification

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
  var t_chatMsg = new LingoPropList([symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), "VMK Administration"]);
  callNamed("executeMessage", symbol("tradechat"), t_chatMsg)
}


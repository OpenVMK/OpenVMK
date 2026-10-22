// vmk_3.dcr /  / _TradeChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _TradeChat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sMsg = callNamed("TransformCannedMsgToString", a_rMsg);
  var t_rCon = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rCon, t_iRef, "avatar");
  if (callNamed("voidp", t_rAvatar)) {
  callNamed("error", _this, lingoBinary("join", "Trade Avatar not found:", t_iRef), symbol("_AvatarChat"))
  }

  var t_chatMsg = callNamed("propList", symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), callNamed("GetParam", t_rAvatar, "NAME"), symbol("ref"), t_rAvatar);
  }

}


// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _AvatarChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _AvatarChat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sMsg = callNamed("TransformCannedMsgToString", a_rMsg);
  var t_rCon = callMethod("_AccessRoom", _this.component);
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rCon, t_iRef, "avatar");
  if (callNamed("voidp", t_rAvatar)) {
  callNamed("error", _this, lingoBinary("joinPad", "Avatar not found:", t_iRef), symbol("_AvatarChat"))
  } else {
  var t_sName = callMethod("GetParam", t_rAvatar, "NAME");
  var t_rColor = callMethod("GetShirtColor", callMethod("GetRenderer", callMethod("GetVisual", t_rAvatar)));
  var t_veLoc = callMethod("GetScrPos", t_rAvatar);
  callNamed("executeMessage", symbol("chat"), new LingoPropList([symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("color"), t_rColor, symbol("loc"), t_veLoc]))
  }

  }

}


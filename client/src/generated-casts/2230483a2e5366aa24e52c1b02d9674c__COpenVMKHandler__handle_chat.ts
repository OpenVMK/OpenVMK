// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_chat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_chat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sMsg = callMethod("GetStrFrom", a_rMsg.connection);
  var t_rCon = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rAvatar = callMethod("_AccessIndexed", t_rCon, t_iRef, "avatar");
  if (callNamed("voidp", t_rAvatar)) {
  callNamed("error", _this, lingoBinary("joinPad", "Avatar not found:", t_iRef), symbol("_AvatarChat"))
  } else {
  var t_sName = callMethod("GetParam", t_rAvatar, "NAME");
  var t_rColor = callMethod("GetShirtColor", callMethod("GetRenderer", callMethod("GetVisual", t_rAvatar)));
  var t_veLoc = callMethod("GetScrPos", t_rAvatar);
  callNamed("executeMessage", symbol("chat"), callNamed("propList", symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("color"), t_rColor, symbol("loc"), t_veLoc))
  }

  }

}


// 2230483a2e5366aa24e52c1b02d9674c.cct / COpenVMKHandler / handle_falsechat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_falsechat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  /* global */ var g_rCore = globalVar("g_rCore");
  var t_sMsg = callMethod("GetStrFrom", a_rMsg.connection);
  var t_rCon = callMethod("_AccessRoom", callNamed("getObject", symbol("room_component")));
  var t_sName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_rColor = callNamed("rgb", 253, 215, 228);
  var t_veLoc = callNamed("vector", float(400), float(410), -float(float(4997800)));
  callNamed("executeMessage", symbol("chat"), callNamed("propList", symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("color"), t_rColor, symbol("loc"), t_veLoc))
}


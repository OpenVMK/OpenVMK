// vmk_domestic.cct /  / handle_petchat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_petchat(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var tCon = tMsg.connection;
  var t_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", "room")));
  var t_iRef = callMethod("GetIntFrom", tCon);
  var t_sMsg = callMethod("GetStrFrom", tCon);
  var t_rObj = callMethod("_AccessIndexed", t_rContext, t_iRef, "domestic");
  if (callNamed("objectp", t_rObj)) {
  var t_rColor = callNamed("rgb", 255, 90, 183);
  var t_sName = callMethod("GetParam", t_rObj, "NAME");
  var t_veLoc = callMethod("GetScrPos", t_rObj);
  callNamed("executeMessage", symbol("chat"), new LingoPropList([symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("color"), t_rColor, symbol("loc"), t_veLoc]))
  }

}


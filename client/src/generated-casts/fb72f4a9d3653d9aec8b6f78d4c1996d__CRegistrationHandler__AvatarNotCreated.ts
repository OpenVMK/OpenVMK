// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / AvatarNotCreated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvatarNotCreated(_me: LingoMe, _this: LingoValue, tMsg: LingoValue) {
  var t_iCount = callMethod("GetIntFrom", tMsg.connection);
  var t_sNameSuggestions = lingoBinary("join", lingoBinary("join", callNamed("getText", "reg.username.taken.hd"), "\r"), "\r");
  var t_sNameList = "";
  for (var i = 1; i <= t_iCount; ++i) {
  t_sNameList = lingoBinary("joinPad", t_sNameList, callMethod("GetStrFrom", tMsg.connection));
  }

  t_sNameSuggestions = lingoBinary("join", t_sNameSuggestions, t_sNameList);
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "NameSuggestions", 1, 1);
  callMethod("show", t)
  var t_sMsg = t_sNameSuggestions;
  callMethod("setText", t, t_sMsg, "Name Suggestion", "OK")
}


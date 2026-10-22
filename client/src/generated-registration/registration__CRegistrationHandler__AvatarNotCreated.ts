// registration.cct / CRegistrationHandler / AvatarNotCreated

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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


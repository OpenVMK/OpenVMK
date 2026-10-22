// registration.cct / CRegistrationInterface / CreateAvatar

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAvatar(_me: LingoMe, _this: LingoValue) {
  if (callNamed("variableExists", "AllAvailableSets")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetNewAvatarSets", new LingoPropList([symbol("int"), 0]))
  if (callNamed("timeoutExists", "WaitAvatarParse")) {
  callNamed("removeTimeout", "WaitAvatarParse")
  }

  } else {
  if (!lingoTruthy(callNamed("timeoutExists", "WaitAvatarParse"))) {
  callNamed("createTimeout", "WaitAvatarParse", 1000, symbol("CreateAvatar"), callMethod("getID", _this), undefined, 0)
  }

  }

}


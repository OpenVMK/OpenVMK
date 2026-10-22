// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationInterface / CreateAvatar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateAvatar(_me: LingoMe, _this: LingoValue) {
  if (callNamed("variableExists", "AllAvailableSets")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetNewAvatarSets", new LingoPropList([symbol("int"), 0]))
  if (callNamed("timeoutExists", "WaitAvatarParse")) {
  callNamed("removeTimeout", "WaitAvatarParse")
  }

  } else {
  if ((lingoTruthy(callNamed("timeoutExists", "WaitAvatarParse")) ? 0 : 1)) {
  callNamed("createTimeout", "WaitAvatarParse", 1000, symbol("CreateAvatar"), callMethod("getID", _this), undefined, 0)
  }

  }

}


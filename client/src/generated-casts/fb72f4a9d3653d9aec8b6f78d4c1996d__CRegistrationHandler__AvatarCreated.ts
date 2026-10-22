// fb72f4a9d3653d9aec8b6f78d4c1996d.cct / CRegistrationHandler / AvatarCreated

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function AvatarCreated(_me: LingoMe, _this: LingoValue) {
  if (meProp(_me, "m_bRegistrationGoingOn")) {
  return callMethod("_UpdateRegData", callMethod("getComponent", _this), undefined, "AvatarCreated");
  } else {
  if (meProp(_me, "m_bContinueRegistrationAfterAcceptedName")) {
  if (callNamed("objectExists", "NameRejection")) {
  callNamed("removeObject", "NameRejection")
  }

  callNamed("executeMessage", "init_messenger")
  callMethod("_RefreshRegList", _this._interface, undefined, "RegistrationContinued")
  } else {
  if (meProp(_me, "m_bNameRejected")) {
  callMethod("send", callNamed("getConnection", "VMK"), "GetName")
  }

  if (callNamed("windowExists", "NameRejected")) {
  callNamed("removeWindow", "NameRejected")
  }

  callNamed("executeMessage", "init_messenger")
  callNamed("executeMessage", symbol("login_hide"))
  }

  }

}


// registration.cct / CRegistrationHandler / AvatarCreated

import {
  callMethod, callNamed, chunkOf, float, globalVar, lingoBinary, lingoTruthy,
  meProp, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player,
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


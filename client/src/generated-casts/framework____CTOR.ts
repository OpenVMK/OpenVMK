// framework.dcr /  / CTOR

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CTOR(_me: LingoMe, _return: LingoValue, t_status: LingoValue) {
  if ((lingoTruthy(callMethod("GetLockState", _return, t_status)) ? 0 : 1)) {
  callNamed("cTC", callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Referred object not found:", t_status), symbol("CTOR")))
  }

  if (lingoBinary("neq", callNamed("binl_md5", _return.url, t_status), 0)) {
  callNamed("cTC", callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Manager already unregistered:", t_status), symbol("CTOR")))
  callNamed("tMemNum", _return.state, t_status)
  callNamed("t_sErrorMsg", _return.url, t_status)
  callNamed("cTC", 1)
  }

}


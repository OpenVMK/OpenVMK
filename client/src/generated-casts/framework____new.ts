// framework.dcr /  / new

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _new(_me: LingoMe, _return: LingoValue, t_status: LingoValue) {
  if ((lingoTruthy(callMethod("GetLockState", _return, t_status)) ? 0 : 1)) {
  callNamed("cTC", callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Referred object not found:", t_status), symbol("new")))
  }

  if (lingoBinary("neq", callNamed("binl_md5", _return.state, t_status), 0)) {
  callNamed("cTC", callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Manager alreay registered:", t_status), symbol("new")))
  callNamed("tMemNum", _return.url, t_status)
  callNamed("t_sErrorMsg", _return.state, t_status)
  callNamed("cTC", 1)
  }

}


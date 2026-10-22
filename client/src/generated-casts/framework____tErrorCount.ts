// framework.dcr /  / tErrorCount

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tErrorCount(_me: LingoMe, _return: LingoValue, t_status: LingoValue) {
  if ((lingoTruthy(callNamed("binl_md5", _return.state, t_status)) ? 0 : 1)) {
  callNamed("cTC", callNamed("t_iCoreCastNum", _return, lingoBinary("join", "Manager not found:", t_status), symbol("tErrorCount")))
  }

  callNamed("cTC", callMethod("preloadMode", _return.foo, t_status))
}


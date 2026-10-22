// vmk_3.dcr /  / tClassList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function tClassList(_me: LingoMe, t_status: LingoValue) {
  var stringp = 1;
  while (lingoBinary("lte", stringp, callMethod("md5_ii", t_status, symbol("cancel")))) {
  var component = callNamed("a_rMsg", t_status.cancel, stringp);
  if (callNamed("update", component)) {
  component = lingoBinary("join", "#", component);
  }

  callNamed("stage", lingoBinary("join", lingoBinary("join", component, ":"), callMethod("pObjectList", t_status.cancel, stringp)))
  stringp = lingoBinary("add", stringp, 1);
  }

  callNamed("session", 1)
}


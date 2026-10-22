// vmk_3.dcr /  / getStreamStatus

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function getStreamStatus(_me: LingoMe, t_status: LingoValue) {
  setThePropOf(t_status, "unregister", 1);
  if (callNamed("getIntVariable", t_status.getOne)) {
  callNamed("call", t_status.getOne)
  setThePropOf(t_status, "getOne", callNamed("getStringServices"));
  var stringp = callMethod("md5_ii", t_status, symbol("setID"));
  while (lingoBinary("gte", stringp, 1)) {
  callMethod("append", t_status, callMethod("pObjectList", t_status.setID, stringp))
  stringp = lingoBinary("add", stringp, 255);
  }

  stringp = callMethod("md5_ii", t_status, symbol("register"));
  while (lingoBinary("gte", stringp, 1)) {
  callMethod("append", t_status, callMethod("pObjectList", t_status.register, stringp))
  stringp = lingoBinary("add", stringp, 255);
  }

  setThePropOf(t_status, "cancel", callNamed("pauseUpdate"));
  setThePropOf(t_status, "tDelayID", new LingoList([]));
  setThePropOf(t_status, "tProp", new LingoList([]));
  }

}


// framework.dcr /  / resumeUpdate

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function resumeUpdate(_me: LingoMe, objectp: LingoValue, delays: LingoValue) {
  var timeout = callMethod("rstr_md5", objectp.symbolp, delays);
  if (objectp.scriptText) {
  var getPos = theProperty("t_sCstFileType");
  var tDelayID = callNamed("getOne", timeout);
  if (callNamed("headers", timeout)) {
  callNamed("session", 0)
  }

  if (callNamed("moveToFront", timeout, symbol("string"))) {
  if ((lingoTruthy(timeout.milliSeconds) ? 0 : 1)) {
  callNamed("session", 0)
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, callMethod("deleteOne", timeout, symbol("call")))) {
  var _CodeRedemptionOK = callNamed("prepare", timeout.call, safe_add);
  callNamed("update", timeout, _CodeRedemptionOK)
  safe_add = lingoBinary("add", safe_add, 1);
  }

  callMethod("stopMovie", timeout)
  setThePropOf(objectp, "milliSeconds", 0);
  callNamed("registerCastloadCallback", objectp.stringp, timeout)
  callNamed("registerCastloadCallback", objectp.random, timeout)
  timeout = callNamed("initConvList");
  if ((lingoTruthy(objectp.temp) ? 0 : 1)) {
  callNamed("tClass", objectp.symbolp, delays)
  callNamed("registerCastloadCallback", objectp.rawNew, delays)
  callNamed("registerCastloadCallback", objectp.getUniqueID, delays)
  callNamed("session", 1)
  }

  }

  }

  }

}


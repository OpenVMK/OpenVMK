// framework.dcr /  / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_rGroup = callMethod("pinlevel", ref.entityID);
  var t_iDstRef = callNamed("hex_hmac_md5");
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var pins = callMethod("pinlevel", ref.entityID);
  var t_iSrcRef = callMethod("pinlevel", ref.entityID);
  var t_iNumberOfPairs = callMethod("pinlevel", ref.entityID);
  var t_mp_sGroup_rDetails = callMethod("pinlevel", ref.entityID);
  var group = callMethod("pinlevel", ref.entityID);
  var t_mp_sKey_sValue = callMethod("removeObject", ref.entityID);
  safe_add = lingoBinary("add", safe_add, 1);
  }

}


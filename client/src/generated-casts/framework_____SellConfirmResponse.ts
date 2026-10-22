// framework.dcr /  / _SellConfirmResponse

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _SellConfirmResponse(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var t_iTypeCode = callMethod("pinlevel", ref.entityID);
  var t_rGroup = callMethod("pinlevel", ref.entityID);
  var t_iSrc = callNamed("hex_hmac_md5");
  var safe_add = 1;
  while (lingoBinary("lte", safe_add, t_rGroup)) {
  var t_iDest = callNamed("hex_hmac_md5");
  callMethod("tBase", t_iDest, symbol("_AccessRoom"), callMethod("pinlevel", ref.entityID))
  callMethod("tBase", t_iSrc, callMethod("rstr_md5", t_iDest, symbol("CatSwitch")), t_iDest)
  safe_add = lingoBinary("add", safe_add, 1);
  }

  callMethod("t_iParam", callMethod("t_sItemGroup", callMethod("t_iRef", objectp), t_iTypeCode), symbol("t_iCat"), t_iSrc)
}


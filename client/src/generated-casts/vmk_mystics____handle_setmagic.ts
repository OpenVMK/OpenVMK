// vmk_mystics.cct /  / handle_setmagic

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function handle_setmagic(_me: LingoMe, _this: LingoValue, t_rMsg: LingoValue) {
  var t_rCon = t_rMsg.connection;
  var t_iAvatar = callMethod("GetIntFrom", t_rCon);
  var t_iMagicFX = callMethod("GetIntFrom", t_rCon);
  var t_aParams = new LingoList([]);
  var t_iParamCount = callMethod("GetIntFrom", t_rCon);
  if (lingoBinary("gt", t_iParamCount, 0)) {
  for (var i = 1; i <= t_iParamCount; ++i) {
  callMethod("add", t_aParams, callMethod("GetIntFrom", t_rCon))
  }

  }

  callMethod("ActivateMysticsEffect", callMethod("getComponent", _this), t_iAvatar, t_iMagicFX, t_aParams)
}


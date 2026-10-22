// vmk_musicmix1.cct / CMusicMixerHandler / RenameSong

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RenameSong(_me: LingoMe, t_ID: LingoValue, t_ar_name: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), t_ID]);
  var tCannedBlock = callNamed("TransformCannedToMsg", t_ar_name, 1);
  for (var i = 1; i <= tCannedBlock.count; ++i) {
  var tKey = callMethod("getPropAt", tCannedBlock, i);
  var tvalue = tCannedBlock[i];
  callMethod("addProp", tMsg, tKey, tvalue)
  }

  callMethod("send", callNamed("getConnection", "VMK"), "RenameSong", tMsg)
}


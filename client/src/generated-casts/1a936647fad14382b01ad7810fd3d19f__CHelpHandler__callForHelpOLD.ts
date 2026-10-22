// 1a936647fad14382b01ad7810fd3d19f.cct / CHelpHandler / callForHelpOLD

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function callForHelpOLD(_me: LingoMe, categoryId: LingoValue, message: LingoValue, harasserName: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), categoryId, symbol("str"), message, symbol("str"), harasserName]);
  callMethod("send", callNamed("getConnection", "VMK"), "CallForHelp", tMsg)
}


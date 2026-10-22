// framework.dcr /  / EnableLevelReqMsg

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function EnableLevelReqMsg(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var data = callMethod("pinlevel", ref.entityID);
  var show = callMethod("pinlevel", ref.entityID);
  var getaProp = callNamed("stageBottom", callNamed("setaProp"), "CInvTradeConfirm");
  callMethod("dialogOK", getaProp, data, show)
}


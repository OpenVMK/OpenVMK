// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / ChangeCaption

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ChangeCaption(_me: LingoMe, a_iID: LingoValue, a_mp_cannedText: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), a_iID]);
  for (var i = 1; i <= a_mp_cannedText.count; ++i) {
  callMethod("addProp", tMsg, callMethod("getPropAt", a_mp_cannedText, i), a_mp_cannedText[i])
  }

  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 766, tMsg)
}


// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / DeletePhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function DeletePhoto(_me: LingoMe, a_iID: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 763, new LingoPropList([symbol("int"), a_iID]))
}


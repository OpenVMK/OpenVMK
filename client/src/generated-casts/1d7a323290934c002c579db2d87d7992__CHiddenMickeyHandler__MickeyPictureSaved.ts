// 1d7a323290934c002c579db2d87d7992.cct / CHiddenMickeyHandler / MickeyPictureSaved

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function MickeyPictureSaved(_me: LingoMe, t_ID: LingoValue, t_rect: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 771, new LingoPropList([symbol("int"), callNamed("integer", t_ID), symbol("int"), t_rect.left, symbol("int"), t_rect.top]))
}


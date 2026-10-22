// aca6270bdaa8e5cb4cb1dbde797fa88d.cct / CPhotoAlbumViewer / PublishPhoto

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PublishPhoto(_me: LingoMe, a_iID: LingoValue, a_iAction: LingoValue) {
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 762, new LingoPropList([symbol("int"), a_iAction, symbol("int"), a_iID]))
}


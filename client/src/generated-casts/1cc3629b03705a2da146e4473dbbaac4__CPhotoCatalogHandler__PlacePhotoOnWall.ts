// 1cc3629b03705a2da146e4473dbbaac4.cct / CPhotoCatalogHandler / PlacePhotoOnWall

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlacePhotoOnWall(_me: LingoMe, a_iID: LingoValue, a_iWall: LingoValue, a_iX: LingoValue, a_iY: LingoValue, a_iZ: LingoValue) {
  var tMsg = new LingoPropList([symbol("int"), a_iID, symbol("int"), a_iWall, symbol("int"), a_iX, symbol("int"), a_iY, symbol("int"), a_iZ]);
  callMethod("send", callNamed("getConnection", callNamed("getVariable", "main.connection.id", "VMK")), 764, tMsg)
}


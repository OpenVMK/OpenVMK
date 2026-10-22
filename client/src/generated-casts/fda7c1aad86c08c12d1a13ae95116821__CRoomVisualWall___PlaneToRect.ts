// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomVisualWall / _PlaneToRect

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _PlaneToRect(_me: LingoMe, _this: LingoValue, a_rObj: LingoValue) {
  var t_rObj = a_rObj;
  var t_vePos = callMethod("GetAbsPos", t_rObj);
  var t_iXD = callNamed("integer", callMethod("GetParam", t_rObj, "XD"));
  var t_iYD = callNamed("integer", callMethod("GetParam", t_rObj, "YD"));
  var t_iZD = callNamed("integer", callMethod("GetParam", t_rObj, "ZD"));
  // HAND-CORRECTED: a missing extent is 0. Every poster's furnimap block names
  // only the extents it has — dir 3 `YD ZD`, dir 5 `XD ZD` — so on a dir-5
  // (x-running) wall the poster's YD is VOID. Director orders VOID as 0
  // (LibreShockwave's `gt` does `toDouble` on both sides), so `30 > VOID` takes
  // the x branch. Our runtime answers every order test against VOID with 0 —
  // kept on purpose, see lingo-runtime.ts ("ORDER COMPARISON AGAINST VOID"),
  // room ambience depends on it — which sent the poster down the y branch as a
  // zero-width rect nowhere near the wall: 0 of 920 positions on Tron's right
  // wall fit, and every dir-5 wall in every guest room refused posters.
  if (t_iXD === undefined || t_iXD === null) t_iXD = 0;
  if (t_iYD === undefined || t_iYD === null) t_iYD = 0;
  if (t_iZD === undefined || t_iZD === null) t_iZD = 0;
  var t_rcRect = callNamed("rect", 0, 0, 0, 0);
  if (lingoBinary("gt", t_iXD, t_iYD)) {
  setThePropOf(t_rcRect, "left", callNamed("integer", t_vePos.x));
  setThePropOf(t_rcRect, "top", callNamed("integer", t_vePos.z));
  setThePropOf(t_rcRect, "right", callNamed("integer", lingoBinary("add", t_vePos.x, t_iXD)));
  setThePropOf(t_rcRect, "bottom", callNamed("integer", lingoBinary("add", t_vePos.z, t_iZD)));
  } else {
  setThePropOf(t_rcRect, "left", callNamed("integer", t_vePos.y));
  setThePropOf(t_rcRect, "top", callNamed("integer", t_vePos.z));
  setThePropOf(t_rcRect, "right", callNamed("integer", lingoBinary("add", t_vePos.y, t_iYD)));
  setThePropOf(t_rcRect, "bottom", callNamed("integer", lingoBinary("add", t_vePos.z, t_iZD)));
  }

  return t_rcRect;
}


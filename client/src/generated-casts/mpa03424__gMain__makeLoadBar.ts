// mpa03424.dcr / gMain / makeLoadBar

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function makeLoadBar(_me: LingoMe, inPercent: LingoValue) {
  /* global */ var gGlobal = globalVar("gGlobal");
  var timg = callNamed("image", 211, 49, 32);
  var tAdd = callNamed("member", "loadbar").image;
  callNamed("addImage", timg, tAdd)
  var TH = lingoBinary("mul", 171, inPercent);
  var tV1 = lingoBinary("mul", 3, inPercent);
  var tV2 = lingoBinary("sub", 21, lingoBinary("mul", 4, inPercent));
  var tBorderRect = new LingoList([new LingoList([0, 3]), new LingoList([TH, lingoBinary("sub", 3, tV1)]), new LingoList([lingoBinary("add", TH, 2), tV2]), new LingoList([0, 21])]);
  var tRect = lingoBinary("add", tBorderRect, new LingoList([new LingoList([1, 1]), new LingoList([-float(1), 1]), new LingoList([-float(1), -float(1)]), new LingoList([1, -float(1)])]));
  callMethod("addWonkyLine", _me, timg, callNamed("rgb", "8ab043"), callNamed("point", 27, 7), tBorderRect)
  callMethod("addWonkyLine", _me, timg, callNamed("rgb", "9bcc4e"), callNamed("point", 27, 7), tRect)
  setThePropOf(meProp(_me, "pLoader"), "image", timg);
}


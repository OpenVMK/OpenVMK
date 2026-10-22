// 14790ca22f20dbaf7b09f23f7338bb25.cct / CVMKPackageManagerComponent / ParsePackage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ParsePackage(_me: LingoMe, _this: LingoValue, a_sPackageName: LingoValue, o_mpPackageDetails: LingoValue) {
  callMethod("setaProp", o_mpPackageDetails, symbol("Init"), undefined)
  callMethod("setaProp", o_mpPackageDetails, symbol("casts"), new LingoList([]))
  var t_sVariable = lingoBinary("join", lingoBinary("join", "package.", a_sPackageName), ".cast.init");
  if (callNamed("variableExists", t_sVariable)) {
  var t_sCast = callNamed("getVariable", t_sVariable);
  o_mpPackageDetails[symbol("Init")] = t_sCast;
  callMethod("append", o_mpPackageDetails[symbol("casts")], t_sCast)
  }

  var i = 1;
  while (1) {
  t_sVariable = lingoBinary("join", lingoBinary("join", lingoBinary("join", "package.", a_sPackageName), ".cast."), i);
  if ((lingoTruthy(callNamed("variableExists", t_sVariable)) ? 0 : 1)) {
  break;
  } else {
  t_sCast = callNamed("getVariable", t_sVariable);
  callMethod("append", o_mpPackageDetails[symbol("casts")], t_sCast)
  }

  i = lingoBinary("add", i, 1);
  }

  if (lingoBinary("and", lingoBinary("eq", o_mpPackageDetails[symbol("Init")], undefined), lingoBinary("eq", o_mpPackageDetails[symbol("casts")].count, 0))) {
  return 0;
  } else {
  return 1;
  }

}


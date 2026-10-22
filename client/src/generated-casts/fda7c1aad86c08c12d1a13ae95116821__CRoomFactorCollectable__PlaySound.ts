// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomFactorCollectable / PlaySound

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySound(_me: LingoMe, _this: LingoValue, a_kEvent: LingoValue, a_sParam: LingoValue) {
  var t_sItemType = callMethod("GetParam", callMethod("getObject", _this), "TYPE");
  var t_sSound = "";
  switch (a_kEvent) {
case symbol("state"):
  t_sSound = callNamed("getVariable", lingoBinary("join", lingoBinary("join", lingoBinary("join", "item.", t_sItemType), ".state."), a_sParam));
  break;
case symbol("Appear"):
  t_sSound = callNamed("getVariable", lingoBinary("join", lingoBinary("join", "item.", t_sItemType), ".appear"));
  break;
case symbol("DisAppear"):
  t_sSound = callNamed("getVariable", lingoBinary("join", lingoBinary("join", "item.", t_sItemType), ".disappear"));
  break;
  }

  if ((lingoTruthy(lingoBinary("or", callNamed("voidp", t_sSound), lingoBinary("eq", t_sSound, 0))) ? 0 : 1)) {
  callNamed("executeMessage", "PlayInterfaceSound", t_sSound)
  }

}


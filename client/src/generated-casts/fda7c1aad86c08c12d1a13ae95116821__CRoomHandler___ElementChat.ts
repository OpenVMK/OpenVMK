// fda7c1aad86c08c12d1a13ae95116821.cct / CRoomHandler / _ElementChat

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function _ElementChat(_me: LingoMe, _this: LingoValue, a_rMsg: LingoValue) {
  var t_iRef = callMethod("GetIntFrom", a_rMsg.connection);
  var t_sMsg = callMethod("GetStrFrom", a_rMsg.connection);
  var t_sName = callMethod("GetStrFrom", a_rMsg.connection);
  var t_rCon = callMethod("_AccessRoom", _this.component);
  if ((lingoTruthy(callNamed("voidp", t_rCon)) ? 0 : 1)) {
  var t_rElement = callMethod("_AccessIndexed", t_rCon, t_iRef, "element");
  if (callNamed("voidp", t_rElement)) {
  callNamed("error", _this, lingoBinary("joinPad", "element not found:", t_iRef), symbol("_ElementChat"))
  } else {
  if (lingoBinary("eq", t_sName, "")) {
  t_sName = callNamed("getText", lingoBinary("join", "item.", callMethod("GetParam", t_rElement, "TYPE")), "NPC");
  }

  switch (lingoBinary("join", callMethod("GetParam", t_rElement, "TYPE"), "")) {
case "4001":
  var t_rColor = callNamed("rgb", "#7C4A1C");
  break;
case "4002":
  t_rColor = callNamed("rgb", "#7C4A1C");
  break;
case "4003":
  t_rColor = callNamed("rgb", "#004FE2");
  break;
case "4004":
  t_rColor = callNamed("rgb", "#BC0000");
  break;
case "4005":
  t_rColor = callNamed("rgb", "#B500BC");
  break;
case "4009":
  t_rColor = callNamed("rgb", 31, 65, 47);
  break;
  default:
  t_rColor = callNamed("rgb", callNamed("random", 255), callNamed("random", 255), callNamed("random", 255));
  }

  var t_veLoc = callMethod("GetScrPos", t_rElement);
  callNamed("executeMessage", symbol("chat"), new LingoPropList([symbol("message"), t_sMsg, symbol("mode"), symbol("say"), symbol("name"), t_sName, symbol("loc"), t_veLoc, symbol("color"), t_rColor]))
  }

  }

}


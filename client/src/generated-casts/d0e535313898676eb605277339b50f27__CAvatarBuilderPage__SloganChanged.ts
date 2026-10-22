// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / SloganChanged

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function SloganChanged(_me: LingoMe, _this: LingoValue) {
  var t_sMsg = callNamed("getText", "set.slogan.changed");
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "SloganChanged", 1, 0);
  callMethod("show", t)
  callMethod("setText", t, t_sMsg, "Slogan changed", "OK")
}


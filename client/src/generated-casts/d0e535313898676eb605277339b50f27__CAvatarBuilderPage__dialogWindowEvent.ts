// d0e535313898676eb605277339b50f27.cct / CAvatarBuilderPage / dialogWindowEvent

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function dialogWindowEvent(_me: LingoMe, _this: LingoValue, a_sDialogName: LingoValue, a_sDialogEvent: LingoValue) {
  switch (a_sDialogName) {
case "SloganChanged":
  callNamed("executeMessage", "close_AvatarBuilder")
  callNamed("removeDialogWindow", "SloganChanged")
  break;
case "CheckSlogan":
  callMethod("CheckWord", meProp(_me, "m_rSloganField"))
  callNamed("removeDialogWindow", "CheckSlogan")
  break;
  }

}


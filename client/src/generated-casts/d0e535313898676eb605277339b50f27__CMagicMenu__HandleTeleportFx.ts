// d0e535313898676eb605277339b50f27.cct / CMagicMenu / HandleTeleportFx

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleTeleportFx(_me: LingoMe, _this: LingoValue) {
  if (callNamed("voidp", meProp(_me, "m_EventAgent_obj"))) {
  setMeProp(_me, "m_EventAgent_obj", callNamed("createObject", "MagicTeleporter", "CEventAgent"));
  callMethod("registerEvent", meProp(_me, "m_EventAgent_obj"), _this, symbol("mouseDown"), symbol("CatchLoc"))
  }

}


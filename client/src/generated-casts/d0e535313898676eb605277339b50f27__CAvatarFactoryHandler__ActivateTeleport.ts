// d0e535313898676eb605277339b50f27.cct / CAvatarFactoryHandler / ActivateTeleport

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ActivateTeleport(_me: LingoMe, tMsg: LingoValue) {
  if ((lingoTruthy(callNamed("objectExists", "TeleportObj")) ? 0 : 1)) {
  var t_iMagic = callMethod("GetIntFrom", tMsg.connection);
  var t_Teleport_Obj = callNamed("createObject", "TeleportObj", "CMagicTeleportMove");
  callMethod("SetFxNum", t_Teleport_Obj, t_iMagic)
  }

}


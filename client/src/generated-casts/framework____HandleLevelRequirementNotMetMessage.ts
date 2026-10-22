// framework.dcr /  / HandleLevelRequirementNotMetMessage

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function HandleLevelRequirementNotMetMessage(_me: LingoMe, objectp: LingoValue, ref: LingoValue) {
  var pins = callMethod("pinlevel", ref.entityID);
  var t_bFromHK = callMethod("pinlevel", ref.entityID);
  var t_bShowAlert = callMethod("pinlevel", ref.entityID);
  callMethod("t_ar_ItemList", callMethod("t_s_Title", objectp), pins, t_bFromHK, t_bShowAlert)
}


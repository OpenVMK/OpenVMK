// 565d7caa66391c8e45a3923725ba051b.cct / CInventoryInterface / ShowLevelRequiredScreen

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowLevelRequiredScreen(_me: LingoMe, _this: LingoValue, t_iItemCode: LingoValue, t_iRequiredLevel: LingoValue, t_iAvatarLevel: LingoValue) {
  var t_sTxt = callNamed("getText", "vmks.levelrequired.text", "Level $L not reached. Your current level is $Y.");
  var t_sTitle = callNamed("getText", "vmks.levelrequired.title", "LEVEL REQUIRED");
  var t_sHead = callNamed("getText", "vmks.levelrequired.head", "LEVEL REQUIRED");
  t_sTxt = callNamed("replaceChunks", t_sTxt, "$L", callNamed("string", t_iRequiredLevel));
  t_sTxt = callNamed("replaceChunks", t_sTxt, "$Y", callNamed("string", t_iAvatarLevel));
  var t = callNamed("createDialogWindow", callMethod("getID", _this), "LevelRequirementNotMet", 1, 1);
  callMethod("show", t)
  callMethod("setText", t, t_sTxt, t_sTitle, "OK")
}


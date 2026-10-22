// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / createTutorialWindow

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function createTutorialWindow(_me: LingoMe) {
  if (lingoBinary("lt", theProperty("paramCount"), 2)) {
  return 0;
  }

  var t_iObjID = callNamed("param", 1);
  var t_sDialogID = callNamed("param", 2);
  if (lingoBinary("gt", theProperty("paramCount"), 2)) {
  var t_iType = callNamed("param", 3);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 3)) {
  var t_bModal = callNamed("param", 4);
  }

  if (callNamed("TutorialWindowExists", t_sDialogID)) {
  callNamed("removeTutorialWindow", t_sDialogID)
  }

  return callMethod("createTutorialWindow", callMethod("getComponent", callNamed("getThread", "DialogWindow")), t_iObjID, t_sDialogID, t_iType, t_bModal);
}


// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / RemoveAllNPCDialogWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function RemoveAllNPCDialogWindows(_me: LingoMe) {
  return callMethod("RemoveAllNPCDialogWindows", callMethod("getComponent", callNamed("getThread", "DialogWindow")));
}


// d1ee027a52e24196484455ed8484679f.cct / CDialogWindow / ShowDialogWindows

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowDialogWindows(_me: LingoMe) {
  return callMethod("ShowDialogWindows", callMethod("getComponent", callNamed("getThread", "DialogWindow")));
}


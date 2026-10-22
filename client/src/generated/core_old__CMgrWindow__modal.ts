// core.old.cct / CMgrWindow / modal

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function modal(_me: LingoMe, tID: LingoValue, tLayout: LingoValue) {
  if (!lingoTruthy(callMethod("create", _me, tID, tLayout))) {
  return 0;
  }

  var tWndObj = callMethod("get", _me, tID);
  callMethod("center", tWndObj)
  callMethod("lock", tWndObj)
  callMethod("setProperty", tWndObj, symbol("modal"), 1)
  if (!lingoTruthy(callMethod("exists", _me, meProp(_me, "pModalID")))) {
  if (callMethod("create", _me, meProp(_me, "pModalID"), "modal.window")) {
  var tModal = callMethod("get", _me, meProp(_me, "pModalID"));
  callMethod("moveTo", tModal, 0, 0)
  callMethod("ResizeTo", tModal, theProperty("stage").rect.width, theProperty("stage").rect.height)
  callMethod("lock", tModal)
  callMethod("setProperty", callMethod("getElement", tModal, "modal"), symbol("blend"), 40)
  } else {
  callNamed("error", _me, "Failed to create modal window layer!", symbol("modal"))
  }

  }

  setThePropOf(_me, "pActiveItem", tID);
  callMethod("Activate", _me, tID)
  return 1;
}


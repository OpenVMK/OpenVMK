// 02a651b7c670fb161ce1a3e4d28713a1.cct / CMessageBar / ConfirmExit

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ConfirmExit(_me: LingoMe) {
  var t_rDialogWnd = callNamed("createDialogWindow", callMethod("getID", _me), "ConfirmExit", 2, 1);
  callMethod("show", t_rDialogWnd)
  var t_sMsg = callNamed("getText", "exit.vmk.confirm");
  var t_sBtn1 = callNamed("getText", "exit.ok");
  var t_sBtn2 = callNamed("getText", "exit.cancel");
  callMethod("setText", t_rDialogWnd, t_sMsg, callNamed("getText", "exit.vmk.confirm.hd"), t_sBtn2, t_sBtn1)
}


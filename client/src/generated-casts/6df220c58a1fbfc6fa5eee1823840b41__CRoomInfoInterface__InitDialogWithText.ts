// 6df220c58a1fbfc6fa5eee1823840b41.cct / CRoomInfoInterface / InitDialogWithText

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InitDialogWithText(_me: LingoMe) {
  var tWndObj = callNamed("getWindow", meProp(_me, "m_windowTitle"));
  var txt_content = "";
  var txt_title = "";
  var txt_btn1 = "";
  var txt_btn2 = "";
  if (lingoBinary("gt", theProperty("paramCount"), 1)) {
  txt_content = callNamed("param", 2);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 2)) {
  txt_title = callNamed("param", 3);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 3)) {
  txt_btn1 = callNamed("param", 4);
  }

  if (lingoBinary("gt", theProperty("paramCount"), 4)) {
  txt_btn2 = callNamed("param", 5);
  }

  if (lingoBinary("neq", tWndObj, 0)) {
  var t_Elem = callMethod("getElement", tWndObj, "basic.content.text");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, txt_content)
  }

  t_Elem = callMethod("getElement", tWndObj, "basic.window.title");
  if (lingoBinary("neq", t_Elem, 0)) {
  callMethod("setText", t_Elem, txt_title)
  }

  callMethod("setButtonText", _me, "basic.dialog.button1", txt_btn1)
  callMethod("setButtonText", _me, "basic.dialog.button2", txt_btn2)
  }

}


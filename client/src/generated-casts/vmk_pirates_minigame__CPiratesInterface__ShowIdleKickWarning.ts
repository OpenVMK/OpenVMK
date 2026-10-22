// vmk_pirates_minigame.cct / CPiratesInterface / ShowIdleKickWarning

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function ShowIdleKickWarning(_me: LingoMe, a_iTime: LingoValue) {
  /* global */ var g_profInterface = globalVar("g_profInterface");
  /* global */ var g_gfxCbNormal = globalVar("g_gfxCbNormal");
  /* global */ var g_gfxCbRed = globalVar("g_gfxCbRed");
  /* global */ var g_gfxCbWhite = globalVar("g_gfxCbWhite");
  /* global */ var g_gfxCbFire = globalVar("g_gfxCbFire");
  /* global */ var g_gfxPickupAmmo = globalVar("g_gfxPickupAmmo");
  /* global */ var g_gfxPickupHealth = globalVar("g_gfxPickupHealth");
  if ((lingoTruthy(callNamed("DialogWindowExists", meProp(_me, "m_sKickWarningDlg"))) ? 0 : 1)) {
  callNamed("createDialogWindow", callMethod("getID", _me), meProp(_me, "m_sKickWarningDlg"), 1)
  }

  var tDialog = callNamed("getObject", meProp(_me, "m_sKickWarningDlg"));
  callMethod("show", tDialog)
  callMethod("setText", tDialog, lingoBinary("joinPad", lingoBinary("joinPad", callNamed("getText", "pirates.kickouttimer_text_1"), a_iTime), callNamed("getText", "pirates.kickouttimer_text_2")), callNamed("getText", "pirates.kickouttimer_title"), callNamed("getText", "pirates.kickouttimer_btnOK"))
}


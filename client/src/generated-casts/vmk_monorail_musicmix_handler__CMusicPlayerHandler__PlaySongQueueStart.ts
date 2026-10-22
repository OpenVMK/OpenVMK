// vmk_monorail_musicmix_handler.cct / CMusicPlayerHandler / PlaySongQueueStart

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PlaySongQueueStart(_me: LingoMe, tMsg: LingoValue) {
  var t_iGotSongs = callMethod("GetIntFrom", tMsg.connection);
  switch (t_iGotSongs) {
case 1:
  callMethod("openMusicPlayer", callMethod("getInterface", _me))
  break;
case 0:
  var t_pSongPerformingDialog = callNamed("createDialogWindow", callMethod("getID", _me), "NoSongsDialog", 1, 1);
  callMethod("show", t_pSongPerformingDialog)
  var t_txt = callNamed("getText", "musicmix.dialog.performSong.nosongs.text");
  var t_title = callNamed("getText", "musicmix.dialog.performSong.nosongs.title");
  var t_btn = callNamed("getText", "musicmix.dialog.performSong.nosongs.btnConfirm");
  callMethod("setText", t_pSongPerformingDialog, t_txt, t_title, t_btn)
  break;
case 2:
  callMethod("hide", callMethod("getInterface", _me).m_pPlayerPopup)
  break;
  }

}


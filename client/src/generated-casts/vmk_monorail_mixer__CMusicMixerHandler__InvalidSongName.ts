// vmk_monorail_mixer.cct / CMusicMixerHandler / InvalidSongName

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function InvalidSongName(_me: LingoMe, tMsg: LingoValue) {
  var t_pMusicMixDialog = callNamed("createDialogWindow", callMethod("getID", _me), "InvalidSongNameErrorDialog", 1, 1);
  callMethod("show", t_pMusicMixDialog)
  callMethod("setText", t_pMusicMixDialog, callNamed("getText", "musicmix.dialog.SongNameError.text"), callNamed("getText", "musicmix.dialog.SongNameError.title"), callNamed("getText", "musicmix.dialog.SongNameError.btnConfirm"))
}


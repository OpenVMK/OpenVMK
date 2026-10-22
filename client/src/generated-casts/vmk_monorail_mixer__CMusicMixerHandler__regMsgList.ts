// vmk_monorail_mixer.cct / CMusicMixerHandler / regMsgList

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function regMsgList(_me: LingoMe, tBool: LingoValue) {
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2750, symbol("OpenMixer"))
  callMethod("setaProp", tMsgs, 2751, symbol("SongList"))
  callMethod("setaProp", tMsgs, 2752, symbol("SongData"))
  callMethod("setaProp", tMsgs, 2753, symbol("CreateSongResult"))
  callMethod("setaProp", tMsgs, 2754, symbol("SaveSongResult"))
  callMethod("setaProp", tMsgs, 2755, symbol("DeleteSongResult"))
  callMethod("setaProp", tMsgs, 2756, symbol("PlaySongResult"))
  callMethod("setaProp", tMsgs, 2758, symbol("InvalidSongName"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "CloseMixer", 750)
  callMethod("setaProp", tCmds, "GetSongs", 751)
  callMethod("setaProp", tCmds, "LoadSong", 752)
  callMethod("setaProp", tCmds, "CreateSong", 753)
  callMethod("setaProp", tCmds, "SaveSong", 754)
  callMethod("setaProp", tCmds, "DeleteSong", 755)
  callMethod("setaProp", tCmds, "PlaySong", 756)
  callMethod("setaProp", tCmds, "RenameSong", 757)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}


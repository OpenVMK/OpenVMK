// vmk_monorail_musicmix_handler.cct / CMusicPlayerHandler / regMsgList

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
  callMethod("setaProp", tMsgs, 2751, symbol("SongList"))
  callMethod("setaProp", tMsgs, 2756, symbol("PlaySongResult"))
  callMethod("setaProp", tMsgs, 2757, symbol("PlaySongQueueStart"))
  callMethod("setaProp", tMsgs, 2758, symbol("PlaySongNotFound"))
  callMethod("setaProp", tMsgs, 2759, symbol("PlaySongQueueEnd"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "GetSongs", 751)
  callMethod("setaProp", tCmds, "LoadSong", 752)
  callMethod("setaProp", tCmds, "PlaySong", 756)
  callMethod("setaProp", tCmds, "CancelPlay", 758)
  if (tBool) {
  callNamed("registerListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("registerCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  } else {
  callNamed("unregisterListener", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", callNamed("getVariable", "main.connection.id", "VMK"), callMethod("getID", _me), tCmds)
  }

}


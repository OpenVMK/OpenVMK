// minigame_lobby.cct / CLobbyHandler / deconstruct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function deconstruct(_me: LingoMe) {
  var t_sID = callNamed("getVariable", "main.connection.id", "VMK");
  var tMsgs = new LingoPropList([]);
  callMethod("setaProp", tMsgs, 2640, symbol("HandleGameRemoved"))
  callMethod("setaProp", tMsgs, 2641, symbol("HandleGameList"))
  callMethod("setaProp", tMsgs, 2642, symbol("HandleGameData"))
  callMethod("setaProp", tMsgs, 2643, symbol("HandleGameJoined"))
  callMethod("setaProp", tMsgs, 2644, symbol("HandleAvatarKicked"))
  callMethod("setaProp", tMsgs, 2645, symbol("HandleCreateFailed"))
  callMethod("setaProp", tMsgs, 2646, symbol("HandleReadyToPlay"))
  callMethod("setaProp", tMsgs, 2647, symbol("HandleJoinFailed"))
  callMethod("setaProp", tMsgs, 2648, symbol("HandleAvatarLeft"))
  callMethod("setaProp", tMsgs, 2650, symbol("HandleSetParticipantData"))
  callMethod("setaProp", tMsgs, 2651, symbol("HandleGameConditions"))
  callMethod("setaProp", tMsgs, 2652, symbol("HandleStartFailed"))
  var tCmds = new LingoPropList([]);
  callMethod("setaProp", tCmds, "create_game", 640)
  callMethod("setaProp", tCmds, "remove_game", 641)
  callMethod("setaProp", tCmds, "list_games", 642)
  callMethod("setaProp", tCmds, "get_game_data", 643)
  callMethod("setaProp", tCmds, "set_game_data", 644)
  callMethod("setaProp", tCmds, "join_game", 645)
  callMethod("setaProp", tCmds, "leave_game", 646)
  callMethod("setaProp", tCmds, "kick_from_game", 647)
  callMethod("setaProp", tCmds, "start_game", 648)
  callMethod("setaProp", tCmds, "set_ready_to_play", 649)
  callMethod("setaProp", tCmds, "send_participant_data", 650)
  callMethod("setaProp", tCmds, "request_game_conditions", 651)
  callNamed("unregisterListener", t_sID, callMethod("getID", _me), tMsgs)
  callNamed("unregisterCommands", t_sID, callMethod("getID", _me), tCmds)
  return 1;
}


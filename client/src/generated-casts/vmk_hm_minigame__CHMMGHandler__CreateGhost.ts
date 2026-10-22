// vmk_hm_minigame.cct / CHMMGHandler / CreateGhost

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function CreateGhost(_me: LingoMe, i_iRef: LingoValue, i_iTeam: LingoValue, t_iPlaceRef: LingoValue, t_iMoveDelay: LingoValue, t_iCoffinRef: LingoValue) {
  var tParams = new LingoPropList([]);
  callMethod("setaProp", tParams, symbol("ref"), i_iRef)
  callMethod("setaProp", tParams, symbol("type"), 1)
  callMethod("setaProp", tParams, symbol("owner"), -float(1))
  callMethod("setaProp", tParams, symbol("team"), i_iTeam)
  var a_rContext = callMethod("_AccessRoom", callMethod("getComponent", callNamed("getThread", symbol("room"))));
  var t_rTile = callMethod("_AccessIndexed", a_rContext, t_iPlaceRef, "tile");
  if (callNamed("objectp", t_rTile)) {
  var t_TilePos = callMethod("GetAbsPos", t_rTile);
  var x = t_TilePos.x;
  var y = t_TilePos.y;
  var z = t_TilePos.z;
  } else {
  x = 0;
  y = 0;
  z = 0;
  }

  if (meProp(_me, "m_bDebugOut")) {
  callNamed("put", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", lingoBinary("joinPad", "[HMDBG] Create ghost", i_iRef), "color"), i_iTeam), "at"), callNamed("vector", x, y, z)))
  }

  var tNewPos = callNamed("intvector", x, y, z);
  callMethod("setaProp", tParams, symbol("worldpos"), tNewPos)
  callMethod("setaProp", tParams, symbol("Dir"), 0)
  callMethod("setaProp", tParams, symbol("extra"), new LingoList([t_iMoveDelay]))
  callMethod("_CreateObject", meProp(_me, "m_rGameEngine"), lingoBinary("join", "Ghost", theProperty("milliSeconds")), tParams)
  callNamed("executeMessage", "PlayInterfaceSound", "ghost-is-created")
}


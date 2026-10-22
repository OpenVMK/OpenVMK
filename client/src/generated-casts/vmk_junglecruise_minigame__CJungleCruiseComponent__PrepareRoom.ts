// vmk_junglecruise_minigame.cct / CJungleCruiseComponent / PrepareRoom

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function PrepareRoom(_me: LingoMe) {
  callNamed("put", "CJungleCruiseComponent::PrepareRoom - begin")
  setMeProp(_me, "m_bInitializedFully", 0);
  callNamed("put", "Disable messenger")
  callNamed("executeMessage", symbol("MinigameState"), symbol("running"), "jungle_cruise")
  callNamed("put", "remove albumview if any")
  callNamed("removeObject", "JCAlbumView")
  callNamed("put", "prepare interface")
  callMethod("PrepareRoom", callMethod("getInterface", _me))
  callNamed("put", "init variables")
  setMeProp(_me, "m_idCounter", 0);
  setMeProp(_me, "m_score", 0);
  setMeProp(_me, "m_Color", callNamed("random", 4));
  setMeProp(_me, "m_deviation", float(0));
  var tFuel = callNamed("getVariableValue", "junglecruise.powerUp.fuel.startAmount");
  if (lingoBinary("eq", tFuel, 0)) {
  tFuel = 180;
  }

  setMeProp(_me, "m_fuel", tFuel);
  var tFilm = callNamed("getVariableValue", "junglecruise.powerUp.film.startAmount");
  if (lingoBinary("eq", tFilm, 0)) {
  tFilm = 25;
  }

  setMeProp(_me, "m_film", tFilm);
  setMeProp(_me, "m_throttle", float(0));
  setMeProp(_me, "m_ar_photoAlbum", new LingoList([]));
  var m_lastPhotoID = -float(1);
  var m_lastPhotoScore = 0;
  setMeProp(_me, "m_gameOn", 1);
  setMeProp(_me, "m_rSoundPlayer", callNamed("createObject", "JCSoundFX", "CJungleCruiseGameSoundPlayer"));
  setMeProp(_me, "m_hostCharacter", callNamed("createObject", "DrunkenNed", "CGuideCharacter"));
  callMethod("SetSoundPlayer", meProp(_me, "m_hostCharacter"), meProp(_me, "m_rSoundPlayer"))
  setMeProp(_me, "m_filmstrip", callNamed("createObject", "FilmStrip", "CFilmStrip"));
  callMethod("setFilmAmount", meProp(_me, "m_filmstrip"), meProp(_me, "m_film"))
  setMeProp(_me, "m_tutorial", callNamed("createObject", "Tutorial", "CTutorial"));
  var m_myAvatar = undefined;
  var m_myAvatarXML = undefined;
  setMeProp(_me, "m_spriteHider", callNamed("createObject", "SpriteHider", "CSpriteHider"));
  setMeProp(_me, "m_avatarInBoat", 0);
  setMeProp(_me, "m_gameend", 0);
  callMethod("showGuide", meProp(_me, "m_hostCharacter"))
  callNamed("put", "Init last photo")
  callNamed("createMember", "lastPhoto", symbol("bitmap"))
  callNamed("put", "Start managers")
  setMeProp(_me, "m_animalMgr", callNamed("createObject", "JCAnimalMgr", "CAnimalManager"));
  setMeProp(_me, "m_powerupMgr", callNamed("createObject", "JCPowerupMgr", "CPowerupManager"));
  setMeProp(_me, "m_hazardMgr", callNamed("createObject", "JCHazardMgr", "CHazardManager"));
  callNamed("put", "Create Sound objects")
  setMeProp(_me, "m_rMotorSound", callNamed("createObject", symbol("random"), "CSoundObject"));
  callNamed("put", "Avatar placeholder sprite")
  setMeProp(_me, "m_avatarOnDock", callNamed("sprite", callNamed("reserveSprite", callMethod("getID", _me))));
  setThePropOf(meProp(_me, "m_avatarOnDock"), "member", undefined);
  callNamed("put", "Start update")
  callNamed("receiveUpdate", callMethod("getID", _me))
  callMethod("StartMinigameEngine", callMethod("getComponent", callNamed("getThread", "minigame")))
  callNamed("executeMessage", "StopRoomSound")
  setMeProp(_me, "m_prepared", 1);
  callNamed("put", "CJungleCruiseComponent::PrepareRoom - end")
}


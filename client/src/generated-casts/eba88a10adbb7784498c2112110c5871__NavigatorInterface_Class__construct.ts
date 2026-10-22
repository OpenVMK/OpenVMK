// eba88a10adbb7784498c2112110c5871.cct / NavigatorInterface Class / construct

import {
  callMethod, callNamed, chunkCount, chunkOf, deleteStringChunk, float,
  globalVar, lastChunk,
  lingoBinary, lingoTruthy,
  meProp, setGlobal, setMeProp, setTheProperty, setThePropOf, symbol, theProperty,
  thePropOf, LingoList, LingoPropList, _player, _key, _sound,
  type LingoMe, type LingoValue,
} from "../lingo/lingo-runtime.js";

export function construct(_me: LingoMe) {
  callNamed("registerMessage", symbol("Initialize"), callMethod("getID", _me), symbol("AllCastsDone"))
  callNamed("registerMessage", symbol("LandingOnRoom"), callMethod("getID", _me), symbol("DisableWelcomesound"))
  callNamed("registerMessage", symbol("ui_StopWelcomeSound"), callMethod("getID", _me), symbol("StopWelcomeSnd"))
  setMeProp(_me, "m_ar_MinigameNavNodes", undefined);
  setMeProp(_me, "m_ar_instanceTitles", new LingoList(["North", "East", "South", "West", "North-East", "South-East", "South-West", "North-West", "North-North-East", "North-East-East", "North-East-North", "South-East-East", "South-South-East", "South-East-South", "South-South-West", "South-West-West", "South-West-South", "North-West-West", "North-North-West", "North-West-North", "North-North-North-East", "North-North-East-East", "North-North-East-North", "North-South-East-East", "North-South-South-East", "North-South-East-South", "North-South-South-West", "North-South-West-West", "North-South-West-South", "North-North-West-West", "North-North-North-West", "North-North-West-North", "South-North-North-East", "South-North-East-East", "South-North-East-North", "South-South-East-East", "South-South-South-East", "South-South-East-South", "South-South-South-West", "South-South-West-West", "South-South-West-South", "South-North-West-West", "South-North-North-West", "South-North-West-North"]));
  var t_ar_instanceTitles2 = new LingoList([]);
  var t_ar_DirList = new LingoList([undefined, "North-", "East-", "South-", "West-"]);
  for (var e = 1; e <= 5; ++e) {
  for (var i = 1; i <= meProp(_me, "m_ar_instanceTitles").count; ++i) {
  var t_sTitle = lingoBinary("join", t_ar_DirList[e], meProp(_me, "m_ar_instanceTitles")[i]);
  callMethod("add", t_ar_instanceTitles2, t_sTitle)
  }

  }

  setMeProp(_me, "m_ar_instanceTitles", t_ar_instanceTitles2);
  setMeProp(_me, "m_mp_ar_sHighlighters", new LingoPropList([]));
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("parkmap"), new LingoList(["nav.frontierland.active", "nav.guestrooms.active", "nav.fantasyland.active", "nav.adventureland.active", "nav.mainstreet.active", "nav.tomorrowland.active", "nav.neworleans.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("whatsnew"), new LingoList(["nav.frontierland.active", "nav.guestrooms.active", "nav.fantasyland.active", "nav.adventureland.active", "nav.mainstreet.active", "nav.tomorrowland.active", "nav.neworleans.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("adventureland"), new LingoList(["nav.shrunkennedsshop.active", "nav.tiki.active", "nav.bazaar.active", "nav.treehouse.active", "nav.cambodian.active", "nav.safari.active", "nav.tent.active", "nav.indy.active", "nav.piratesgame.active", "nav.dock.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("frontierland"), new LingoList(["nav.splashmountain.active", "nav.tomsawyer.active", "nav.thundermountain.active", "nav.steamboat.active", "nav.pier.active", "nav.goldenhorseshoe.active", "nav.frontierland_hub.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("fantasyland"), new LingoList(["nav.fireworks.active", "nav.castlebanquet.active", "nav.snowwhite.active", "nav.matterhorn.active", "nav.castleentrance.active", "nav.castlespellroom.active", "nav.smallworld.active", "nav.inthesky.active", "nav.castlemoneyshot.active", "nav.castledungeon.active", "nav.storybookland.active", "nav.fantasycourtyard.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("tomorrowland"), new LingoList(["nav.qalaxyimports.active", "nav.tomorrowlandhub.active", "nav.autopia.active", "nav.mars.active", "nav.speedway.active", "nav.shipwreck.active", "nav.nautilus.active", "nav.nautilusgrotto.active", "nav.spacemountain.active", "nav.shrinkingmachine.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("mainstreet"), new LingoList(["nav.castlecourtyard.active", "nav.hub2.active", "nav.vmkcentral.active", "nav.musicjam.active", "nav.musicalmainstreet.active", "nav.emporium.active", "nav.mainstreetsquare.active", "nav.esplanade.active", "nav.buenavista.active", "nav.pennyarcade.active", "nav.magicshopcheckers.active"]))
  callMethod("setaProp", meProp(_me, "m_mp_ar_sHighlighters"), symbol("neworleans"), new LingoList(["nav.gallery.active", "nav.neworleanssquare.active", "nav.bluebayou.active", "nav.hauntedmansion.active"]))
  setMeProp(_me, "m_windowTitle", "Navigator Window");
  setMeProp(_me, "m_sWindowID", "vmk_nav.window");
  setMeProp(_me, "m_sAdvancedModeWindowTitle", "Navigator Advanced Mode Window");
  setMeProp(_me, "m_mp_advancedModeInstanceInfo", new LingoPropList([]));
  setMeProp(_me, "m_mp_advancedSelectedData", new LingoPropList([]));
  setMeProp(_me, "m_page", symbol("whatsnew"));
  setMeProp(_me, "m_activeRoomID", undefined);
  setMeProp(_me, "m_pGuestRoomNavigator", undefined);
  setMeProp(_me, "m_pThemedGuestRoomNavigator", undefined);
  callMethod("set", callNamed("getObject", symbol("session")), "AdvNavigation", 0)
  setMeProp(_me, "m_objSnd", undefined);
  setMeProp(_me, "m_bSoundPlayed", 0);
}


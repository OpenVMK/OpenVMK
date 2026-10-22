-- Script
property m_rSndFX
property m_pTrainMusic
property m_pTextScroller
property m_pTextScrollerHolder
property m_animIDs
property m_pStarField
property m_bInited
property m_bAllowMusic
property m_pExits
property m_pTileExits
property m_rOscillator
property m_pLCD

on construct me
  registerMessage(#room_ready, me.getID(), #enterRoom)
  registerMessage(#room_leave, me.getID(), #leaveRoom)
  registerMessage("TrainStartSong", me.getID(), #TrainStartSong)
  registerMessage("TrainEndSong", me.getID(), #trainEndSong)
  m_rSndFX = createObject(#random, "CSoundObject")
  m_rSndFX.SetSoundType("fx")
  m_pTrainMusic = createObject(#random, "CSoundObject")
  m_pTrainMusic.SetSoundType("music")
  m_rOscillator = createObject(#random, "COscillatorLCD")
  m_rOscillator.SetPics([member("oscillator_01"), member("oscillator_02"), member("oscillator_03"), member("oscillator_04"), member("oscillator_05")])
  m_rOscillator.SetFps(10)
  m_pTextScroller = 0
  m_pTextScrollerHolder = 0
  m_pStarField = 0
  m_animIDs = []
  m_pExits = []
  m_pTileExits = []
  m_bInited = 0
  m_bAllowMusic = 1
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready)
  unregisterMessage(#room_leave)
  unregisterMessage("TrainStartSong")
  unregisterMessage("TrainEndSong")
  me.StopTrainMusic()
  if getObject("StarField") <> 0 then
    removeObject("StarField")
  end if
  removeObject(m_rSndFX.getID())
  if m_pTextScroller <> 0 then
    removeObject(m_pTextScroller.getID())
  end if
  if objectp(m_rOscillator) then
    removeObject(m_rOscillator.getID())
  end if
  return 1
end
on StopTrainMusic me
  if objectp(m_pTrainMusic) then
    m_pTrainMusic.StopSound()
    removeObject(m_pTrainMusic)
    m_pTrainMusic = VOID
  end if
end
on playMusic me, _song
  t_bOn = getObject(#session).get("music")
  if t_bOn and m_bAllowMusic then
    if objectp(m_pTrainMusic) then
      m_pTrainMusic.StopSound()
      m_pTrainMusic.Define(_song)
      m_pTrainMusic.setLoopCount(10)
      m_pTrainMusic.SetFadeIn(2)
      m_pTrainMusic.PlaySound()
    end if
  end if
end
on displayNextStop me, _station
  if m_bAllowMusic then
    case _station of
      "Main Street":
        executeMessage("PlayInterfaceSound", "MRVO-nextstop-mainstreet")
      "Adventureland":
        executeMessage("PlayInterfaceSound", "MRVO-nextstop-adventureland")
      "Frontierland":
        executeMessage("PlayInterfaceSound", "MRVO-nextstop-frontierland")
      "Fantasyland":
        executeMessage("PlayInterfaceSound", "MRVO-nextstop-fantasyland")
      "Tomorrowland":
        executeMessage("PlayInterfaceSound", "MRVO-nextstop-tomorroland")

    end case
  end if
  t_sText = "Next stop:" && _station
  me.displayText(t_sText)
end
on displayText me, t_sText
  if m_pTextScroller <> 0 then
    m_pTextScroller.resetQueue()
    m_pTextScroller.setText(t_sText)
  end if
end
on leaveRoom me
  m_rSndFX.StopSound()
end
on enterRoom me
  t_bOn = getObject(#session).get("fx")
  if getIntVariable("MonorailState") = 1 and t_bOn and m_bAllowMusic then
    m_rSndFX.StopSound()
    m_rSndFX.Define("MR-monorail-VO-mono")
    m_rSndFX.PlaySound()
  end if
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  m_pLCD = tRoomContext.Search("NAME", "lcd")
  if m_pTextScroller = 0 then
    m_pTextScroller = me.initTextScroller()
  end if
  if m_pTextScrollerHolder = 0 then
    m_pTextScrollerHolder = me.initTextScrollerHolder()
  end if
  me.LoadAnim()
  m_pStarField = me.initStarField()
  t_iState = getIntVariable("MonorailState")
  if t_iState = 1 or t_iState = 0 then
    me.OpenDoors()
  end if
  m_rOscillator.setNode(m_pLCD)
  m_bAllowMusic = 1
end
on OpenDoors me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["frontdoors_1", "frontdoors_2", "frontdoor", "backdoors_1", "backdoors_2", "backdoor"]
  t_Mems = ["double_frontdoors_04", "double_frontdoors_04", "frontdoor_04", "double_backdoors_04", "double_backdoors_04", "backdoor_04"]
  repeat with i = 1 to t_Nodes.count
    tNode = tRoomContext.Search("NAME", t_Nodes[i])
    tSprite = tNode.GetVisual().getSprite()
    tmember = member(t_Mems[i])
    tSprite.member = tmember
    tSprite.width = tmember.image.width
    tSprite.height = tmember.image.height
  end repeat
end
on CloseDoors me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["frontdoors_1", "frontdoors_2", "frontdoor", "backdoors_1", "backdoors_2", "backdoor"]
  t_Mems = ["double_frontdoors_01", "double_frontdoors_01", "frontdoor_01", "double_backdoors_01", "double_backdoors_01", "backdoor_01"]
  repeat with i = 1 to t_Nodes.count
    tNode = tRoomContext.Search("NAME", t_Nodes[i])
    tSprite = tNode.GetVisual().getSprite()
    tmember = member(t_Mems[i])
    tSprite.member = tmember
    tSprite.width = tmember.image.width
    tSprite.height = tmember.image.height
  end repeat
end
on findExits me
  m_pExits = []
  m_pTileExits = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["7", "8", "9", "10", "11", "12", "13", "14", "15", "16", "17", "18", "19"]
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_pExits.append(tNode)
    end if
  end repeat
  t_Nodes = []
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_pTileExits.append(tNode)
    end if
  end repeat
end
on hideExits me
  if m_pExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_pExits
    t_exit.SetParam("CLASS", "hide")
  end repeat
  repeat with t_exit in m_pTileExits
    t_exit.SetParam("CLASS", "tile")
  end repeat
end
on showExits me
  if m_pExits.count = 0 then
    me.findExits()
  end if
  repeat with t_exit in m_pExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
  repeat with t_exit in m_pTileExits
    t_exit.SetParam("CLASS", "exit")
  end repeat
end
on LoadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    m_animIDs[1] = tAnimEngine.LoadAnim("monorail_train_doors_open_arrangement")
    m_animIDs[2] = tAnimEngine.LoadAnim("monorail_train_doors_close_arrangement")
    m_animIDs[3] = tAnimEngine.LoadAnim("monorail_train_lcd_arrangement")
    m_animIDs[4] = tAnimEngine.LoadAnim("monorail_train_rails_arrangement")
    m_animIDs[5] = tAnimEngine.LoadAnim("monorail_train_doors_closed_arrangement")
  end if
end
on UnloadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine = getThread(#animation).getComponent()
    repeat with tAnim in m_animIDs
      tAnimEngine.RemoveAnim(tAnim)
    end repeat
  end if
end
on stopAnimations me, tAnimEngine
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    repeat with tAnim in m_animIDs
      tAnimEngine.StopAnim(tAnim)
    end repeat
  end if
end
on initStarField me
  t_pStarField = createObject("StarField", "CStarField")
  return t_pStarField
end
on initTextScroller me
  tWidth = 100
  tHeight = 50
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      tWidth = tSprite.width
      tHeight = tSprite.height
    end if
  end if
  t_pTextScroller = createTextScroller(EMPTY)
  t_pTextScroller.SetRenderer(#isometric)
  t_pTextScroller.GetRenderer().Init(me.getID(), "Digital_font", tWidth, tHeight)
  t_pTextScroller.GetRenderer().SetOffset(point(0, 0))
  t_pTextScroller.setVisibleCharCount(tWidth / 10)
  t_pTextScroller.start()
  return t_pTextScroller
end
on initTextScrollerHolder me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      put "Found sprite" && [tSprite, tSprite.blend, tSprite.ink, tSprite.width, tSprite.height]
      t_Img = image(tSprite.width, tSprite.height, 32)
      t_Img.fill(t_Img.rect, [#color: rgb("#000000")])
      tSprite.member.image = t_Img
      tSprite.blend = 100
      tSprite.member.regPoint = point(-10, 0)
      tSprite.bgColor = rgb("#000000")
      tSprite.ink = 33
      return the member of tSprite
    end if
  end if
  return 0
end
on scrollerUpdate me, t_Img
  if m_pTextScrollerHolder <> 0 then
    m_pTextScrollerHolder.image = t_Img
    m_pTextScrollerHolder.regPoint = point(0, 0)
  end if
end
on TrainLeave me
  me.hideExits()
  t_bOn = getObject(#session).get("fx")
  if t_bOn and m_bAllowMusic then
    executeMessage("PlayInterfaceSound", "MR-doors-close")
  end if
  if threadExists(#animation) then
    me.stopAnimations()
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.PlayAnim(m_animIDs[2])
    if m_bAllowMusic then
      tAnimEngine.PlayAnim(m_animIDs[3])
    end if
    tAnimEngine.PlayAnim(m_animIDs[4])
  end if
  m_pStarField.setState(#accelerate)
end
on TrainStop me
  t_bOn = getObject(#session).get("fx")
  if t_bOn and m_bAllowMusic then
    executeMessage("PlayInterfaceSound", "MR-doors-open")
  end if
  me.showExits()
  if m_bInited then
    if threadExists(#animation) then
      me.stopAnimations()
      tAnimEngine = getThread(#animation).getComponent()
      tAnimEngine.PlayAnim(m_animIDs[1])
    end if
  else
    m_bInited = 1
  end if
  if m_bAllowMusic and objectp(m_pTrainMusic) then
    m_pTrainMusic.SetFadeOut(3)
  end if
  m_pStarField.setState(#stopped)
end
on TrainArrive me
  m_pStarField.setState(#slowspeed)
end
on TrainBetweenStations me
  me.hideExits()
  if threadExists(#animation) then
    me.stopAnimations()
    tAnimEngine = getThread(#animation).getComponent()
    if m_bAllowMusic then
      tAnimEngine.PlayAnim(m_animIDs[3])
    end if
    tAnimEngine.PlayAnim(m_animIDs[4])
  end if
  me.CloseDoors()
  m_pStarField.setState(#accelerate)
end
on TrainStartSong me
  put "Train Start Song"
  getThread(#animation).getComponent().StopAnim(m_animIDs[3])
  m_rOscillator.Run()
  if objectp(m_pTrainMusic) then
    m_pTrainMusic.StopSound()
  end if
  if objectp(m_rSndFX) then
    m_rSndFX.StopSound()
  end if
  m_bAllowMusic = 0
end
on trainEndSong me
  put "Train End Song"
  m_rOscillator.stop()
  m_bAllowMusic = 1
  getThread(#animation).getComponent().PlayAnim(m_animIDs[3])
end
on GetTrainMusicAllowed me
  return m_bAllowMusic
end
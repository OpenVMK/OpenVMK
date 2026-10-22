-- Script
property m_monorailAnimator
property m_animIDs
property m_pExits
property m_pTileExits
property m_pTextScroller
property m_pTextScrollerHolder
property m_bMonorailReady
property m_iLastMsgReceived

on construct me
  registerMessage(#MonorailStatus, me.getID(), #MonorailInit)
  registerMessage(#room_ready, me.getID(), #LoadAnim)
  registerMessage(#room_leave, me.getID(), #UnloadAnim)
  registerMessage(#animation_ready, me.getID(), #animationReady)
  m_pExits = []
  m_pTileExits = []
  m_animIDs = []
  m_pTextScroller = 0
  m_pTextScrollerHolder = 0
  m_bMonorailReady = 0
  m_iLastMsgReceived = the milliSeconds - 10000
  return 1
end
on deconstruct me
  unregisterMessage(#room_ready, me.getID(), #LoadAnim)
  unregisterMessage(#room_leave, me.getID(), #UnloadAnim)
  if not voidp(m_monorailAnimator) then
    removeObject(m_monorailAnimator.getID())
  end if
  if m_pTextScroller <> 0 then
    m_pTextScroller.stop()
  end if
  repeat with i = 1 to 8
    sound(i).stop()
  end repeat
  return 1
end
on displayText me, t_sText
  if m_pTextScroller <> 0 then
    m_pTextScroller.resetQueue()
    m_pTextScroller.setText(t_sText)
  end if
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
  t_pTextScroller = createTextScroller(" ")
  t_pTextScroller.SetRenderer(#isometric)
  t_pTextScroller.GetRenderer().Init(me.getID(), "Digital_font", tWidth, tHeight)
  t_pTextScroller.GetRenderer().SetOffset(point(5, 8))
  t_pTextScroller.start()
  return t_pTextScroller
end
on initTextScrollerHolder me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  tNode = tRoomContext.Search("NAME", "display")
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      t_Img = image(tSprite.width, tSprite.height, 32)
      t_Img.fill(t_Img.rect, [#color: rgb("#000000")])
      tSprite.member.image = t_Img
      tSprite.blend = 100
      tSprite.member.regPoint = point(0, 0)
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
on resetTrainRegPoints me
  t_parts = ["monorail_start", "monorail_mid", "monorail_end"]
  t_regpoints = [point(761, 504), point(96, 203), point(-507, -101)]
  i = 1
  repeat with part in t_parts
    tMem = getMember(part)
    tMem.regPoint = t_regpoints[i]
    i = i + 1
  end repeat
end
on MonorailInit me, iMsg
  if not variableExists("MonorailState") then
    createVariable("MonorailState", iMsg)
  else
    setVariable("MonorailState", iMsg)
  end if
  t_iMsgDeltaTime = the milliSeconds - m_iLastMsgReceived
  if t_iMsgDeltaTime > 1000 then
    m_iLastMsgReceived = the milliSeconds
  else
    exit
  end if
  put "MonorailAction" && m_bMonorailReady && iMsg
  if not m_bMonorailReady then
    case iMsg of
      0:
        put "Monorail Init: Train Leaves {Close Doors, leave station}"
        me.leaveStationFast()
      1:
        put "Monorail Init: Train Stopped {Hide Masks, Open Doors}"
        me.showTrainWithDoorsOpen()
        me.showExits()
      2:
        put "Monorail Init: Train Hidden {Hide All}"
      10:
        put "Monorail Init: Train Approaches {Hide Doors+Masks, start train animation}"
        me.TrainApproaches()

    end case
    m_bMonorailReady = 1
  else
    case iMsg of
      0:
        put "train moves out"
        me.getInterface().resetTrainRegPoints()
        me.getInterface().TrainLeave()
      1:
        me.getInterface().TrainStops()
        put "train stops"
      10:
        put "train pulls in"
        me.getInterface().TrainApproaches()

    end case
  end if
end
on LoadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    m_animIDs[1] = tAnimEngine.LoadAnim("monorail_open_arrangement")
    m_animIDs[2] = tAnimEngine.LoadAnim("monorail_close_arrangement")
  end if
  me.resetTrainRegPoints()
  me.HideTrain()
  me.hideDoors()
  me.hideMasks()
  me.hideExits()
  m_pTextScroller = me.initTextScroller()
  m_pTextScrollerHolder = me.initTextScrollerHolder()
end
on findExits me
  m_pExits = []
  m_pTileExits = []
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["9", "10", "11", "12", "13", "14", "15"]
  repeat with nodeID in t_Nodes
    tNode = tRoomContext.Search("ID", nodeID)
    if tNode <> 0 then
      m_pExits.append(tNode)
    end if
  end repeat
  t_Nodes = ["7", "8", "16", "17", "18", "19", "20", "21", "22", "23"]
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
on UnloadAnim me
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.RemoveAnim(m_animIDs[1])
  end if
end
on stopAnimations me, tAnimEngine
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.StopAnim(m_animIDs[1])
    tAnimEngine.StopAnim(m_animIDs[2])
  end if
end
on animationReady me, arrangement
  case arrangement of
    "monorail_open_arrangement":
      me.showExits()
      me.showMasks()
    "monorail_close_arrangement":
      me.leaveStation()
    otherwise:
      put "Arrengement ready received!" && arrangement

  end case
end
on createMonorailAnimator me
  m_monorailAnimator = createObject("Monorail Animation", "CAnimateMonorail")
  t_parts = ["monorail_start", "monorail_mid", "monorail_end"]
  t_regpoints = [point(761, 504), point(96, 203), point(-507, -104)]
  i = 1
  repeat with part in t_parts
    tMem = getMember(part)
    m_monorailAnimator.addAnimationMember(tMem)
    i = i + 1
  end repeat
end
on HideTrain me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["monorail_start", "monorail_mid", "monorail_end"]
  repeat with nodename in t_Nodes
    tNode = tRoomContext.Search("SPRITE", nodename)
    tNode.GetVisual().getSprite().visible = 0
  end repeat
  me.hideDoors()
  me.hideMasks()
end
on ShowTrain me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["monorail_start", "monorail_mid", "monorail_end"]
  repeat with nodename in t_Nodes
    tNode = tRoomContext.Search("SPRITE", nodename)
    tNode.GetVisual().getSprite().visible = 1
  end repeat
end
on hideDoors me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["door_1", "door_2", "door_3"]
  repeat with nodename in t_Nodes
    tNode = tRoomContext.Search("NAME", nodename)
    tNode.GetVisual().getSprite().visible = 0
  end repeat
end
on showDoors me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["door_1", "door_2", "door_3"]
  repeat with nodename in t_Nodes
    tNode = tRoomContext.Search("NAME", nodename)
    tNode.GetVisual().getSprite().visible = 1
  end repeat
end
on showDoorsOpen me
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  t_Nodes = ["door_1", "door_2", "door_3"]
  t_Mems = ["single_traindoor_4", "double_traindoors_4", "double_traindoors_4"]
  i = 0
  repeat with nodename in t_Nodes
    i = i + 1
    tNode = tRoomContext.Search("NAME", nodename)
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      tSprite.visible = 1
      tMem = getMember(t_Mems[i])
      if tMem <> 0 then
        tSprite.member = tMem
        tSprite.width = tMem.width
        tSprite.height = tMem.height
      end if
    end if
  end repeat
end
on showMasks me
end
on hideMasks me
end
on TrainMusic me
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    executeMessage("PlayInterfaceSound", "MS-train-music-FX")
  end if
end
on TrainApproaches me
  me.ShowTrain()
  if voidp(m_monorailAnimator) then
    me.createMonorailAnimator()
  end if
  m_monorailAnimator.approachStation()
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    executeMessage("PlayInterfaceSound", "MRVO-stand-clear")
    me.displayText("Train approaching. Stand clear of the doors!")
    executeMessage("PlayInterfaceSound", "MR-train-arrive")
  end if
end
on showTrainWithDoorsOpen me
  me.stopAnimations()
  if not voidp(m_monorailAnimator) then
    m_monorailAnimator.stopAnimating()
  end if
  me.resetTrainRegPoints()
  me.ShowTrain()
  me.showDoorsOpen()
end
on TrainStops me
  me.stopAnimations()
  if not voidp(m_monorailAnimator) then
    m_monorailAnimator.stopAnimating()
  end if
  me.resetTrainRegPoints()
  me.ShowTrain()
  me.showDoors()
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.PlayAnim(m_animIDs[1])
  end if
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    executeMessage("PlayInterfaceSound", "MR-doors-open")
  end if
  createTimeout("TrainLeave", 2000, #TrainMusic, me.getID(), VOID, 1)
  createTimeout(#executeOnce & the milliSeconds, 3000, #displayText, me.getID(), "Please enter the train", 1)
end
on leaveStationFast me
  me.hideDoors()
  if voidp(m_monorailAnimator) then
    me.createMonorailAnimator()
  end if
  m_monorailAnimator.leaveStationFast()
end
on leaveStation me
  me.hideMasks()
  me.hideDoors()
  if voidp(m_monorailAnimator) then
    me.createMonorailAnimator()
  end if
  m_monorailAnimator.leaveStation()
  me.displayText("Next monorail arrives in a few moments")
end
on TrainLeave me
  me.hideExits()
  me.hideMasks()
  if threadExists(#animation) then
    tAnimEngine = getThread(#animation).getComponent()
    tAnimEngine.PlayAnim(m_animIDs[2])
  end if
  t_bOn = getObject(#session).get("fx")
  if t_bOn then
    executeMessage("PlayInterfaceSound", "MR-doors-close")
    executeMessage("PlayInterfaceSound", "MR-train-leave")
    executeMessage("PlayInterfaceSound", "MRVO-allaboard")
  end if
  me.displayText("Next monorail arrives in a few moments")
end
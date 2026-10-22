-- Score Script
property m_rMGE
property m_rSoundPlayer
property m_rStage
property m_bPrepared
property m_bLeaveCalled
property m_rTimer
property m_bGameOn
property m_ar_rDoors
property m_iRound
property m_ar_roundResults
property m_bGhostDebug
property m_rOwnPlayer
property m_rMyAvatarMover
property m_ar_GhostPuffs
property m_iPuffCounter

on construct me
  put "CHMGameComponent::Construct - begin"
  m_iRound = 0
  m_ar_roundResults = []
  m_bPrepared = 0
  m_rSoundPlayer = VOID
  m_ar_rDoors = [:]
  executeMessage(#SetMinigameHandler, "CHMMGHandler")
  put "CHMGameComponent::Construct - end"
  m_bGhostDebug = 0
  m_rOwnPlayer = VOID
  m_ar_GhostPuffs = []
  m_iPuffCounter = 0
  return 1
end
on deconstruct me
  put "CHMGameComponent::Deconstruct - begin"
  getObject(#session).set("tileSelectMode", #bsp)
  if m_bPrepared then
    me.UnprepareRoom()
  end if
  repeat with t_rPuff in m_ar_GhostPuffs
    me.RemovePuff(t_rPuff)
  end repeat
  m_ar_GhostPuffs = []
  me.removeAllDoors()
  put "CHMGameComponent::Deconstruct - end"
  return 1
end
on CreatePuff me, t_iGhostRef, t_iAvatarRef
  m_iPuffCounter = m_iPuffCounter + 1
  t_rGhost = getThread("minigame").getComponent().GetMGObject(t_iGhostRef)
  t_iDirection = 0
  t_iTeam = 1
  t_vPos = vector(0, 0, 0)
  if objectp(t_rGhost) then
    t_vPos = t_rGhost.GetAbsPos()
    t_iDirection = t_rGhost.GetVisual().m_iDirection
    t_iTeam = t_rGhost.GetParam("Team")
  end if
  tProps = [:]
  tProps["Reference"] = m_iPuffCounter
  tProps["Avatar"] = t_iAvatarRef
  tProps["Ghost"] = t_iGhostRef
  tProps["Direction"] = t_iDirection
  tProps["Team"] = t_iTeam
  tProps["WorldPosition"] = t_vPos
  t_rObj = me.CreateRoomObject("hm_puff", m_iPuffCounter, tProps)
  t_rObj.SetAbsPos(t_vPos)
  t_rObj.GetFactor().Init()
  m_ar_GhostPuffs.append(t_rObj)
end
on RemovePuff me, t_rPuff
  me.RemoveRoomObject("hm_puff", t_rPuff.GetParam("Reference"))
  m_ar_GhostPuffs.deleteOne(t_rPuff)
end
on CreateRoomObject me, a_sClass, a_iRef, a_mp_params
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  t_rXML = CreateXML()
  if getMember("empty.node.xml") = 0 then
    put "Animation Manager has trouble finding the empty-node xml member"
  end if
  t_rXML.open(member("empty.node.xml").text)
  t_rXML.Search("type", "NODE")
  t_rXML.SetParam("REF", a_iRef)
  t_rXML.SetParam("CLASS", a_sClass)
  t_rRoomContext._CreateIndexed(a_iRef, a_sClass, t_rXML)
  tNewObject = t_rRoomContext._AccessIndexed(a_iRef, a_sClass)
  tNewObject.SetParam("Reference", a_iRef)
  repeat with i = 1 to a_mp_params.count
    tKey = a_mp_params.getPropAt(i)
    tvalue = a_mp_params.getaProp(tKey)
    tNewObject.SetParam(tKey, tvalue)
  end repeat
  return tNewObject
end
on RemoveRoomObject me, a_sClass, a_iRef
  t_rRoomContext = getThread("room").getComponent()._AccessRoom()
  if not voidp(t_rRoomContext) then
    t_rRoomContext._RemoveIndexed(a_iRef, a_sClass)
  end if
end
on createTileMover me, t_iAvatarRef
  m_rMyAvatarMover = createObject("HMCollider", "CCollisionEngineControlledTile")
  m_rMyAvatarMover.Init(t_iAvatarRef)
end
on removeTileMover me
  if objectp(m_rMyAvatarMover) then
    removeObject(m_rMyAvatarMover.getID())
  end if
end
on setOwnPlayer me, a_rPlayer
  m_rOwnPlayer = a_rPlayer
end
on getOwnPlayer me
  return m_rOwnPlayer
end
on removeAllDoors me
  repeat with t_rDoor in m_ar_rDoors
    removeObject(t_rDoor.getID())
  end repeat
  m_ar_rDoors = [:]
end
on createDoor me, i_iFurniRef, i_sRoomDoorRef, i_rLinkObj
  t_rDoor = createObject(#random, "CHMDoor")
  t_rDoor.Init(i_sRoomDoorRef, i_rLinkObj)
  m_ar_rDoors[string(i_iFurniRef)] = t_rDoor
end
on openAllDoors me
  repeat with t_rDoor in m_ar_rDoors
    t_rDoor.openDoor()
  end repeat
end
on openDoor me, i_iFurniRef
  t_rDoor = m_ar_rDoors[string(i_iFurniRef)]
  if not voidp(t_rDoor) then
    t_rDoor.openDoor()
  end if
end
on closeDoor me, i_iFurniRef
  t_rDoor = m_ar_rDoors[string(i_iFurniRef)]
  if not voidp(t_rDoor) then
    t_rDoor.closeDoor()
  end if
end
on SwingDoor me, i_iFurniRef
  t_rDoor = m_ar_rDoors[string(i_iFurniRef)]
  if not voidp(t_rDoor) then
    t_rDoor.SwingDoor()
  end if
end
on activateDoorVortex me, i_iFurniRef, a_iType
  t_rDoor = m_ar_rDoors[string(i_iFurniRef)]
  if not voidp(t_rDoor) then
    t_rDoor.activateVortex(a_iType)
  end if
end
on showmessage me, tstate, tGame
end
on createTimer me
end
on PrepareRoom me
  put "CHMGameComponent::PrepareRoom - begin"
  m_iRound = 0
  executeMessage(#ui_hide)
  executeMessage(#MinigameState, #running, "hauntedmansion")
  getObject(#session).set("minigame", "hauntedmansion")
  put "Get Minigame Engine object"
  initIntVector()
  m_rMGE = getThread("minigame").getComponent()
  m_rMGE._SetTurnPulse(1.64999997615814)
  registerMessage(#room_ready, me.getID(), #InitGameEngine)
  registerMessage(#room_leave, me.getID(), #StopGameEngine)
  m_rStage = VOID
  executeMessage("StopRoomSound")
  receiveUpdate(me.getID())
  me.getInterface().PrepareInterface()
  m_bPrepared = 1
  m_bGameOn = 0
  if m_bLeaveCalled then
    if connectionExists(getVariable("main.connection.id", "VMK")) then
      getConnection(getVariable("main.connection.id", "VMK")).send(580)
    end if
  else
    put "Avatar has not left the room yet, did not send 'start'"
  end if
  put "CHMGameComponent::PrepareRoom - end"
end
on SetLeaveRoomCalled me
  if m_bPrepared and not m_bLeaveCalled then
    if connectionExists(getVariable("main.connection.id", "VMK")) then
      getConnection(getVariable("main.connection.id", "VMK")).send(580)
    end if
  end if
  m_bLeaveCalled = 1
end
on UnprepareRoom me
  put "CHMGameComponent::UnprepareRoom - begin"
  me.removeTileMover()
  executeMessage(#ui_show)
  removeUpdate(me.getID())
  if not voidp(m_rStage) then
    removeObject(m_rStage.getID())
  end if
  unregisterMessage(#room_ready, me.getID())
  unregisterMessage(#room_leave, me.getID())
  m_rStage = VOID
  m_prepared = 0
  m_rMGE.StopMinigameEngine()
  executeMessage(#MinigameState, #idle, "hauntedmansion")
  getObject(#session).set("minigame", VOID)
  m_bGameOn = 0
end
on LoadStage me, i_sName, i_iVersion
  getObject(#session).set("tileSelectMode", #old)
  t_sTimer = the milliSeconds
  me.removeTileMover()
  m_iRound = m_iRound + 1
  if voidp(m_rStage) then
    m_rStage = createObject(#random, "CHMStage")
  end if
  t_sTimer = the milliSeconds
  m_rStage.load(i_sName, i_iVersion)
  t_sTimer = the milliSeconds
  m_rStage.SwitchToRoom()
  t_sTimer = the milliSeconds
  m_rStage.DumpFurni(getThread("room").getComponent()._AccessRoom())
  if m_iRound = 1 then
    me.getInterface().ShowWindow("UI")
  end if
  me.getInterface().ShowWindow("Waiting")
  t_rPointer = getThread("room").getComponent()._AccessRoom().Search("CLASS", "pointer")
  t_rSprite = t_rPointer.GetVisual().m_rSprite
  if t_rSprite <> sprite(0) then
    t_rSprite.blend = 0
  end if
  t_rPointer.m_bRunning = 0
end
on getCollisionEngine me
  m_rStage.getCollisionEngine()
end
on getRounds me
  return m_iRound
end
on InitGameEngine me
  put "CHMGameComponent::InitGameEngine() - begin"
  m_rMGE.StartMinigameEngine()
  executeMessage(#RegisterMinigameObject, 1, "hauntedmansionghost")
  executeMessage(#RegisterMinigameObject, 2, "hauntedmansionsuperghost")
  executeMessage(#RegisterMinigameObject, 3, "hauntedmansionplayerobject")
  executeMessage(#RegisterMinigameObject, 4, "hauntedmansioncoffin")
  executeMessage(#RegisterMinigameObject, 5, "hauntedmansionscoreboard")
  m_bGameOn = 1
  getThread("minigame").getHandler()._SendStageLoaded()
end
on StopGameEngine me
  m_rMGE.StopMinigameEngine()
  m_bGameOn = 0
end
on GameActive me
  return m_bGameOn
end
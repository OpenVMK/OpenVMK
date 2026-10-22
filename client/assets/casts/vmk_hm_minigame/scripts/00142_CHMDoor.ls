-- Script
property m_rSprites
property m_rBlocks
property m_rVortex
property m_ar_vortexanimation
property m_iCurrentVortex
property m_iCounter
property m_iSpeed
property m_sDoorName
property m_iState
property m_rObj

on construct me
  m_rBlocks = []
  m_rSprites = []
  m_ar_vortexanimation = []
  m_rVortex = sprite(0)
  m_iCounter = 0
  m_iCurrentVortex = 0
  m_iSpeed = 3
  m_sDoorName = EMPTY
  m_rObj = VOID
  m_iState = #normal
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  return 1
end
on Init me, i_sDoorName, a_rObject
  if voidp(i_sDoorName) then
    return 0
  end if
  if not objectp(a_rObject) then
    return 0
  end if
  m_sDoorName = i_sDoorName
  tRoomContext = getThread(#room).getComponent()._AccessRoom()
  m_rObj = a_rObject
  repeat with t_sKey in m_rObj.GetFactor().m_ar_sKey
    tBlock = m_rObj.GetContext().GetObjByKey(t_sKey)
    if not voidp(tBlock) then
      tSprites = tBlock.GetVisual().GetSprites()
      if tSprites.count <> 0 then
        m_rBlocks.append(tBlock)
        m_rSprites.append(tSprites[1])
      end if
    end if
  end repeat
  tVortexName = "hm_vortex_" & m_sDoorName.char[m_sDoorName.length]
  tNode = tRoomContext.Search("NAME", tVortexName)
  if tNode <> 0 then
    tSprite = tNode.GetVisual().getSprite()
    if tSprite <> 0 then
      m_rVortex = tSprite
    end if
  end if
  m_iCurrentVortex = 0
  m_ar_vortexanimation = []
  repeat with i = 0 to 7
    tmember = member("hm_vortex0" & i)
    if tmember.number > 0 then
      m_ar_vortexanimation.append(tmember)
    end if
  end repeat
end
on activateVortex me, a_iType
  if m_rVortex <> sprite(0) then
    m_rVortex.blend = 80
    case a_iType of
      1:
        m_rVortex.color = rgb("#40FF31")
      2:
        m_rVortex.color = rgb("#FF5AB7")
      otherwise:
        m_rVortex.color = rgb("#000000")

    end case
  end if
end
on openDoor me
  repeat with tSprite in m_rSprites
    if tSprite <> sprite(0) then
      tSprite.visible = 0
    end if
  end repeat
  if m_rVortex <> sprite(0) then
    m_rVortex.visible = 1
  end if
  m_iState = #animating
end
on closeDoor me
  repeat with tSprite in m_rSprites
    if tSprite <> sprite(0) then
      tSprite.visible = 1
    end if
  end repeat
  if m_rVortex <> sprite(0) then
    m_rVortex.visible = 0
  end if
  m_iState = #normal
end
on SwingDoor me
  me.openDoor()
  createTimeout(symbol("swingdoor" & m_sDoorName), 1000, #closeDoor, me.getID(), VOID, 1)
end
on update me
  if m_iState = #animating then
    if m_rVortex <> sprite(0) then
      m_iCounter = m_iCounter + 1
      if m_iSpeed mod m_iSpeed = 0 then
        m_iCounter = 0
        m_iCurrentVortex = (m_iCurrentVortex + 1) mod m_ar_vortexanimation.count
        m_rVortex.member = m_ar_vortexanimation[m_iCurrentVortex + 1]
        m_rVortex.width = m_rVortex.member.width
        m_rVortex.height = m_rVortex.member.height
      end if
    end if
  end if
end
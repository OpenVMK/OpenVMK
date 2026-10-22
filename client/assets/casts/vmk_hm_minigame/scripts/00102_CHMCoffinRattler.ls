-- Script
property m_rObj
property m_rBlocks
property m_rSprites
property m_iState
property m_iCounter
property m_iOpenState

on construct me
  m_rObj = VOID
  m_rBlocks = []
  m_rSprites = []
  m_iCounter = 0
  m_iOpenState = 0
  m_iState = #normal
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  return 1
end
on LinkTo me, a_rObject, a_rTile
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
end
on setState me, a_iState, i_action
  m_iCounter = 0
  case a_iState of
    #tremble:
      m_iState = a_iState
    #rattle:
      m_iState = a_iState
    otherwise:
      put "Unknown coffin state"

  end case
end
on updatepos me, t_deltaPos
  repeat with i = 1 to m_rBlocks.count
    t_vOrgPos = m_rBlocks[i].GetScrPos()
    t_pOrgPos = point(t_vOrgPos.x, t_vOrgPos.y)
    tSprite = m_rSprites[i]
    tSprite.loc = t_pOrgPos + t_deltaPos
  end repeat
  me.updateCounter()
end
on openCoffin me
  t_iStates = 3
  t_iSpeed = 2
  t_iMax = t_iStates * t_iSpeed
  m_iOpenState = m_iOpenState + 1
  if m_iOpenState = t_iMax then
    m_iState = #closing
  end if
  me.animateCoffin()
end
on closeCoffin me
  m_iOpenState = m_iOpenState - 1
  if m_iOpenState = 0 then
    m_iState = #normal
  end if
  me.animateCoffin()
end
on animateCoffin me
  repeat with tSprite in m_rSprites
    if tSprite <> sprite(0) then
      t_len = tSprite.member.name.length
      t_sName = tSprite.member.name.char[1..t_len - 1]
      tSprite.member = member(t_sName & m_iOpenState / 2)
      tSprite.width = tSprite.member.width
      tSprite.height = tSprite.member.height
    end if
  end repeat
end
on updateCounter me
  m_iCounter = m_iCounter + 1
  if m_iCounter > 10 then
    m_iCounter = 0
    if m_iState = #rattle then
      m_iOpenState = 0
      m_iState = #opening
    else
      m_iState = #normal
    end if
  end if
end
on rattle me
  t_deltaPos = point(random(5), random(5))
  me.updatepos(t_deltaPos)
end
on tremble me
  t_deltaPos = point(random(3), random(3))
  me.updatepos(t_deltaPos)
end
on trottle me
  me.updateCounter()
end
on GetState me
  return m_iState
end
on update me
  case m_iState of
    #tremble:
      me.tremble()
    #rattle:
      me.rattle()
    #opening:
      me.openCoffin()
    #closing:
      me.closeCoffin()

  end case
end
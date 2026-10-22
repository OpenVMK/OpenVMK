-- Parent Script
property m_rSprite
property m_rAction
property m_rID
property m_rDirection
property m_rAnimFrame
property m_rCurrentFrame
property m_rWalkSpeed
property m_iAction
property m_bDirty
property m_sType
global gDebugMode

on construct this
end
on deconstruct this
end
on Init this, t_rSprite
  if voidp(t_rSprite) and gDebugMode then
    t_rSprite = sprite(100)
    puppetSprite(100, 1)
    sprite(100).loc = point(150, 150)
  end if
  this.m_rSprite = t_rSprite
  this.m_rAction = "std"
  this.m_rID = 333
  this.m_rDirection = 3
  this.m_rAnimFrame = 0
  this.m_rCurrentFrame = 0
  this.m_rWalkSpeed = 4
  this.m_bDirty = 1
  this.m_sType = "ironcan"
  if gDebugMode then
    registerFrameHandler(this, #update)
  end if
end
on render this
  t_iDirection = this.m_rDirection
  if t_iDirection > 4 then
    t_iDirection = 4 - t_iDirection mod 4
    this.m_rSprite.flipH = 1
  else
    this.m_rSprite.flipH = 0
  end if
  t_rRenderMember = member(this.m_rAction & "_npc_" & this.m_rID & "_" & t_iDirection & "_" & this.m_rAnimFrame)
  this.m_rSprite.member = t_rRenderMember
  this.m_rSprite.width = t_rRenderMember.width
  this.m_rSprite.height = t_rRenderMember.height
end
on update this
  if this.m_rAction = "std" then
    this.m_rAnimFrame = 0
  end if
  if this.m_rAction = "wlk" and this.m_rCurrentFrame mod this.m_rWalkSpeed = 0 then
    this.m_rAnimFrame = (this.m_rAnimFrame + 1) mod 4
    this.m_bDirty = 1
  end if
  this.m_rCurrentFrame = this.m_rCurrentFrame + 1
  if this.m_bDirty then
    this.render()
  end if
end
on setAction this, a_sAction
  if this.m_rAction = a_sAction then
    exit
  end if
  this.m_rAnimFrame = 0
  this.m_rAction = a_sAction
  this.m_bDirty = 1
end
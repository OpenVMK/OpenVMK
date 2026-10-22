-- Parent Script
property m_rSprite
property m_rAction
property m_rID
property m_rDirection
property #219
property #220
property #221
property m_iAction
property m_bDirty
property #222
global #216

on construct this
end
on deconstruct this
end
on Init this, #224
  if voidp(#224) and #216 then
    #224 = sprite(100)
    #217(100, 1)
    sprite(100).loc = #218(150, 150)
  end if
  this.m_rSprite = #224
  this.m_rAction = "std"
  this.m_rID = 333
  this.m_rDirection = 3
  this.#219 = 0
  this.#220 = 0
  this.#221 = 4
  this.m_bDirty = 1
  this.#222 = "ironcan"
  if #216 then
    #223(this, #update)
  end if
end
on #215 this
  #230 = this.m_rDirection
  if #230 > 4 then
    #230 = 4 - #230 mod 4
    this.m_rSprite.#225 = 1
  else
    this.m_rSprite.#225 = 0
  end if
  #229 = #226(this.m_rAction & "_npc_" & this.m_rID & "_" & #230 & "_" & this.#219)
  this.m_rSprite.#226 = #229
  this.m_rSprite.#227 = #229.#227
  this.m_rSprite.#228 = #229.#228
end
on update this
  if this.m_rAction = "std" then
    this.#219 = 0
  end if
  if this.m_rAction = "wlk" and this.#220 mod this.#221 = 0 then
    this.#219 = (this.#219 + 1) mod 4
    this.m_bDirty = 1
  end if
  this.#220 = this.#220 + 1
  if this.m_bDirty then
    this.#215()
  end if
end
on setAction this, #231
  if this.m_rAction = #231 then
    exit
  end if
  this.#219 = 0
  this.m_rAction = #231
  this.m_bDirty = 1
end
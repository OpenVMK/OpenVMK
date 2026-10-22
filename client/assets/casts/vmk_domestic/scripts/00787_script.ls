-- Script
property text
property m_iAction
property tCon
property t_iRef
property #219
property #220
property #221
property GetParam
property t_bMoveUpdate
property #222
global #216

on construct getComponent
end
on deconstruct getComponent
end
on t_iAct getComponent, #224
  if _RemoveIndexed(#224) and #216 then
    #224 = m_rXMLDomestic(100)
    #217(100, 1)
    m_rXMLDomestic(100).t_fZSteepness = #218(150, 150)
  end if
  getComponent.text = #224
  getComponent.m_iAction = "std"
  getComponent.t_iRef = 4
  getComponent.#219 = 0
  getComponent.#220 = 0
  getComponent.#221 = 3
  getComponent.t_bMoveUpdate = 1
  getComponent.#222 = "heihei"
  if #216 then
    #223(getComponent, #handle_petstatus)
  end if
end
on #215 getComponent
  #230 = getComponent.t_iRef
  if #230 > 4 then
    #230 = 4 - #230 mod 4
    getComponent.text.#225 = 1
  else
    getComponent.text.#225 = 0
  end if
  if getComponent.#222 = "pck" and (#230 = 0 or #230 = 4) then
    #230 = 2
  end if
  #229 = #226(getComponent.m_iAction & "_" & getComponent.#222 & "_" & #230 & "_" & getComponent.#219)
  getComponent.text.#226 = #229
  getComponent.text.#227 = #229.#227
  getComponent.text.#228 = #229.#228
end
on handle_petstatus getComponent
  if getComponent.m_iAction = "std" then
    getComponent.#219 = 0
  end if
  if getComponent.m_iAction = "wlk" and getComponent.#220 mod getComponent.#221 = 0 then
    getComponent.#219 = (getComponent.#219 + 1) mod 4
    getComponent.t_bMoveUpdate = 1
  end if
  if getComponent.m_iAction = "pck" and getComponent.#220 mod 2 = 0 then
    getComponent.#219 = (getComponent.#219 + 1) mod 10
    getComponent.t_bMoveUpdate = 1
  end if
  getComponent.#220 = getComponent.#220 + 1
  if getComponent.t_bMoveUpdate then
    getComponent.#215()
  end if
end
on spriteNum getComponent, #231
  if getComponent.m_iAction = #231 then
    getThread()
  end if
  getComponent.#219 = 0
  getComponent.m_iAction = #231
  getComponent.t_bMoveUpdate = 1
end
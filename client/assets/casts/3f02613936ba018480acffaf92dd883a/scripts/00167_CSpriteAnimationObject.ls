-- Script
property m_ar_params
property m_rVisual
property m_rFactor
property m_vPos

on construct me
  m_ar_params = [:]
  m_rVisual = createObject(#random, GetClsVariable("room.class.visual.vmkanimation"))
  m_rFactor = createObject(#random, GetClsVariable("room.class.factor.vmkanimation"))
  m_rVisual.SetObject(me)
  m_rFactor.SetObject(me)
  m_vPos = vector(0, 0, 0)
  receiveUpdate(me.getID())
  return 1
end
on deconstruct me
  removeUpdate(me.getID())
  m_ar_params = [:]
  removeObject(m_rVisual.getID())
  removeObject(m_rFactor.getID())
  return 1
end
on update me
  m_rVisual.update()
  m_rFactor.update()
end
on GetVisual me
  return m_rVisual
end
on GetFactor me
  return m_rFactor
end
on GetParam me, a_sParamName
  return m_ar_params[a_sParamName]
end
on SetParam me, a_sParamName, a_kParamValue
  m_ar_params[a_sParamName] = a_kParamValue
end
on SetAbsPos me, a_vPos
  m_vPos = a_vPos
end
on GetAbsPos me
  return m_vPos
end
on SetScrPos me, a_vPos
  m_vPos = a_vPos
end
on GetScrPos me
  return m_vPos
end
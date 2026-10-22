-- Parent Script
property m_rObject

on construct this
  m_rObject = VOID
  return 1
end
on Deonstruct this
  m_rObject = VOID
  return 1
end
on SetObject this, a_rObj
  m_rObject = a_rObj
end
on getObject this
  return m_rObject
end
on update this
end
on select this
  return 0
end
on Unselect this
  return 0
end
on setState this, a_iState
  m_rObject.SetParam("STATE", string(a_iState))
end
on GetState this
  return integer(m_rObject.GetParam("STATE"))
end
on _Close this
end
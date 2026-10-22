-- Movie Script
property m_rModule

on construct this
  return 1
end
on deconstruct this
  callAncestor(#deconstruct, this)
  return 1
end
on SetModule this, a_rModule
  m_rModule = a_rModule
end
on GetModule this
  return m_rModule
end
-- Script
on construct this
  return 1
end
on deconstruct this
  return 1
end
on merge this, a_rWindow
  return error(this, "Callin virtual method!", #merge)
end
on Purge this, a_rWindow
  return error(this, "Callin virtual method!", #Purge)
end
on update this, a_mp_kType_mp_iRef_rItem, a_kAlteredCategory
  return error(this, "Callin virtual method!", #update)
end
on GetSelected this
  error(this, "Callin virtual method!", #GetSelected)
  return -1
end
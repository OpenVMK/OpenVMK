-- Score Script
on construct this
  t_Obj = getThread(#AvatarFactory).component.GetClothAssetManager()
  if objectp(t_Obj) then
    if variableExists("hm_clothes_cast") then
      t_sBodyPartCastName = getVariable("hm_clothes_cast")
      if castExists(t_sBodyPartCastName) then
        t_Obj.AddCastContentsToImageCache(castLib(t_sBodyPartCastName))
      end if
    else
      put "hm_clothe_cast not configured!!"
    end if
  end if
  return 1
end
on deconstruct this
  return 1
end
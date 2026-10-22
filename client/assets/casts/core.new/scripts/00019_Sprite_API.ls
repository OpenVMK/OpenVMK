-- Behavior
on CreateSpriteManager
  return createManager(#sprite_manager, GetClsVariable("sprite.manager.class"))
end
on RemoveSpriteManager
  return removeManager(#sprite_manager)
end
on getSpriteManager
  t_rMgr = getObjectManager()
  if t_rMgr.managerExists(#sprite_manager) then
    return t_rMgr.getManager(#sprite_manager)
  else
    return CreateSpriteManager()
  end if
end
on reserveSprite tClientID
  return getSpriteManager().reserveSprite(tClientID)
end
on releaseSprite tSprNum
  return getSpriteManager().releaseSprite(tSprNum)
end
on setEventBroker tSprNum, tID
  return getSpriteManager().setEventBroker(tSprNum, tID)
end
on removeEventBroker tSprNum
  return getSpriteManager().removeEventBroker(tSprNum)
end
on printSprites tCount
  return getSpriteManager().print(tCount)
end
export type StorageKey = 'user' | 'token'

export type StorageType = 'local' | 'session'

export const setStorage = (
  key: StorageKey,
  value: string,
  type: StorageType = 'local'
) => {
  const storage = type === 'local' ? localStorage : sessionStorage
  storage.setItem(key, value)
}

export const getStorage = (key: StorageKey, type: StorageType = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  return storage.getItem(key)
}

export const removeStorage = (key: StorageKey, type: StorageType = 'local') => {
  const storage = type === 'local' ? localStorage : sessionStorage
  return storage.removeItem(key)
}

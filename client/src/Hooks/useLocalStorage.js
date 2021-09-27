import { useEffect, useState } from 'react'

//unique key for localstorage
const PREFIX = "gapshap-app-";

export default function useLocalStorage(key,initialValue) {
  const prefixedKey = PREFIX + key;
  
  const [value, setValue] = useState(() => {
    const jsonValue = localStorage.getItem(prefixedKey)
    if (jsonValue != null) return JSON.parse(jsonValue)
    //if we are accessing a stored fun then inkove it.
    if (typeof initialValue === 'function') {
      return initialValue() //
    } else {
      return initialValue
    }
  })

  useEffect(() => {
    localStorage.setItem(prefixedKey, JSON.stringify(value))
  }, [prefixedKey, value])

  return [value, setValue];

}

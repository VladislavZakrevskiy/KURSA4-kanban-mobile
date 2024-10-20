import { useState, useRef, useEffect } from 'react'

export function useThrottledState<T>(initialValue: T, delay: number = 300): [T, (value: T) => void] {
    const [state, setState] = useState<T>(initialValue)
    const lastUpdate = useRef<number>(0)
    const timeoutId = useRef<ReturnType<typeof setTimeout> | null>(null)

    const setThrottledState = (newValue: T) => {
        const now = Date.now()
        const timeSinceLastUpdate = now - lastUpdate.current

        if (timeSinceLastUpdate >= delay) {
            // Обновляем состояние сразу, если прошло достаточно времени
            lastUpdate.current = now
            setState(newValue)
        } else if (!timeoutId.current) {
            // Устанавливаем таймер, если он еще не запущен
            timeoutId.current = setTimeout(() => {
                lastUpdate.current = Date.now()
                setState(newValue)
                timeoutId.current = null
            }, delay - timeSinceLastUpdate)
        }
    }

    // Очищаем таймер при размонтировании компонента
    useEffect(() => {
        return () => {
            if (timeoutId.current) {
                clearTimeout(timeoutId.current)
            }
        }
    }, [])

    return [state, setThrottledState]
}

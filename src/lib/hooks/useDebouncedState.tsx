import { useState, useEffect } from 'react'

export function useDebouncedState<T>(initialValue: T, delay: number = 300) {
    const [value, setValue] = useState<T>(initialValue)
    const [debouncedValue, setDebouncedValue] = useState<T>(initialValue)

    useEffect(() => {
        const handler = setTimeout(() => {
            setDebouncedValue(value)
        }, delay)

        return () => {
            clearTimeout(handler)
        }
    }, [value, delay])

    return [debouncedValue, setValue] as const
}

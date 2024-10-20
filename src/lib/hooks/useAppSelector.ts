import { RootState } from '@/src/stores/store'
import { TypedUseSelectorHook, useSelector } from 'react-redux'

export const useAppSelector: TypedUseSelectorHook<RootState> = useSelector

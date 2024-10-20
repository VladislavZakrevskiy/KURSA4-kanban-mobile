import { AppDispatch } from '@/src/stores/store'
import { useDispatch } from 'react-redux'

export const useAppDispatch = () => useDispatch<AppDispatch>()

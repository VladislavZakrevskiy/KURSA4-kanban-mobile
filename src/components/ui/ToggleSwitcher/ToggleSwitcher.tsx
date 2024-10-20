import { useAppSelector } from '@/src/lib/hooks/useAppSelector'
import { FC } from 'react'
import ToggleSwitch from 'toggle-switch-react-native'

interface ToggleSwitcherProps {
    checked?: boolean
    onChange?: (newValue: boolean) => void
    variant?: 'primary' | 'secondary'
    disabled?: boolean
}

export const ToggleSwitcher: FC<ToggleSwitcherProps> = ({ checked = false, disabled, onChange, variant }) => {
    const { theme } = useAppSelector((state) => state.theme)

    return (
        <ToggleSwitch
            onColor={theme.background.button.primary.default}
            offColor={theme.background.button.primary.default}
            isOn={checked}
            disabled={disabled}
            onToggle={onChange}
        />
    )
}

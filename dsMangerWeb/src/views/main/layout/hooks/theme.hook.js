import { darkTheme } from 'naive-ui'
import { useSystemSettingStore } from '@/store'
import { storeToRefs } from 'pinia'

export const useThemeHook = () => {
    const systemSettingStore = useSystemSettingStore()
    const { theme, active } = storeToRefs(systemSettingStore)

    const handleChange = () => {
        // window['$message'].info(`Update value: ${active.value}`)
        active.value = !active.value
        if (active.value) {
            theme.value = darkTheme
        } else {
            theme.value = null
        }
    }


    return {
        theme,
        active,
        handleChange
    }
}
import { getLocales } from 'expo-localization'
import { I18n } from 'i18n-js'
import es from '../locales/es'
import en from '../locales/en'

const i18n = new I18n({ es, en })

// Choose device language automatically
i18n.locale = getLocales()[0]?.languageCode ?? 'es'

// If language not supported, use Spanish
i18n.enableFallback = true
i18n.defaultLocale = 'es'

export default i18n
import i18n from 'i18next'
import _ from 'lodash'
import Backend from 'i18next-http-backend'
import LanguageDetector from 'i18next-browser-languagedetector'
import { initReactI18next } from 'react-i18next'

const languageDetector = new LanguageDetector(null, {
  order: ['navigator']
})

function getLanguageCode(i18nObject) {
  const locales = Object.keys(_.get(i18nObject, ['store', 'data'], []))

  return (
    i18nObject.languages &&
    i18nObject.languages.find(lng => locales.indexOf(lng) !== -1)
  )
}

function getActiveLanguage() {
  return new Promise(resolve => {
    if (!i18n.isInitialized) {
      i18n.on('initialized', () => {
        const locales = Object.keys(_.get(i18n, ['store', 'data'], []))

        return resolve(
          i18n.languages &&
            i18n.languages.find(lng => locales.indexOf(lng) !== -1)
        )
      })
      return
    }

    return resolve(getLanguageCode(i18n))
  })
}

i18n
  .use(Backend)
  .use(languageDetector)
  .use(initReactI18next) // passes i18n down to react-i18next
  .init({
    fallbackLng: 'en',
    keySeparator: false, // we do not use keys in form messages.welcome

    interpolation: {
      escapeValue: false // react already safes from xss
    }
  })

export { i18n as default, getActiveLanguage, getLanguageCode }

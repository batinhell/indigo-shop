import {
  formatAuthPhone,
  formatCompactPhone,
  formatPhone,
  getIdentifierError,
  getRegistrationEmailError,
  isPhoneLike,
  normalizePhoneDigits,
  unmaskPhoneToEmail
} from '~~/shared/utils/auth-identifier.js'
import { authClient } from '~/utils/auth-client.js'

export function useAuthEntryFlow({
  onRequestCode,
  onCompleteLogin,
  onCompleteRegistration
} = {}) {
  const step = ref('entry')
  const identifier = ref('')
  const isFieldTouched = ref(false)
  const isSubmitted = ref(false)
  const isLoginSubmitted = ref(false)
  const isRegistrationSubmitted = ref(false)
  const fullName = ref('')
  const registrationEmail = ref('')
  const registrationPhone = ref('')
  const password = ref('')
  const passwordRecoveryEmail = ref('')
  const isPasswordRecoverySubmitted = ref(false)
  const isPasswordRecoveryRequestPending = ref(false)
  const passwordRecoveryRequestError = ref('')
  const passwordRecoveryRequestMessage = ref('')
  const organizationInn = ref('')
  const isPasswordVisible = ref(false)
  const smsCode = ref('')
  const isLegalRepresentative = ref(false)
  const isPersonalDataAccepted = ref(false)
  const isUserAgreementAccepted = ref(false)
  const isCodeRequestPending = ref(false)
  const codeRequestError = ref('')
  const isCodeRequestSent = ref(false)
  const codeAuthenticationId = ref('')
  const isCodeVerifyPending = ref(false)
  const codeVerifyError = ref('')
  const isPhoneConfirmed = ref(false)
  const resendSeconds = ref(0)
  const isEntryRequestPending = ref(false)
  const entryRequestError = ref('')
  const isLoginRequestPending = ref(false)
  const loginRequestError = ref('')
  const isRegistrationRequestPending = ref(false)
  const registrationRequestError = ref('')
  const successMode = ref('registration')
  const organizationSuggestions = ref([])
  const selectedOrganization = ref(null)
  const isOrganizationSuggestPending = ref(false)
  const organizationSuggestError = ref('')
  const isOrganizationSuggestionsOpen = ref(false)
  const isOrganizationSavePending = ref(false)
  const organizationSaveError = ref('')

  const SMS_CODE_LENGTH = 5
  const MIN_PASSWORD_LENGTH = 8
  const ORGANIZATION_SUGGEST_DELAY = 350

  let resendTimerId
  let organizationSuggestTimerId
  let organizationSuggestRequestId = 0

  const hasIdentifier = computed(() => identifier.value.trim().length > 0)
  const isPhoneMode = computed(() => isPhoneLike(identifier.value))
  const identifierError = computed(() => getIdentifierError(identifier.value))
  const visibleError = computed(() => (
    (isFieldTouched.value || isSubmitted.value) ? identifierError.value : ''
  ))
  const registrationEmailError = computed(() => getRegistrationEmailError(registrationEmail.value))
  const visibleRegistrationEmailError = computed(() => (
    isRegistrationSubmitted.value ? registrationEmailError.value : ''
  ))
  const passwordError = computed(() => getPasswordError(password.value))
  const visibleLoginPasswordError = computed(() => (
    isLoginSubmitted.value ? passwordError.value : ''
  ))
  const visiblePasswordError = computed(() => (
    isRegistrationSubmitted.value ? passwordError.value : ''
  ))
  const passwordRecoveryIdentifierError = computed(() => getIdentifierError(passwordRecoveryEmail.value))
  const visiblePasswordRecoveryEmailError = computed(() => (
    isPasswordRecoverySubmitted.value ? passwordRecoveryIdentifierError.value : ''
  ))
  const inputMode = computed(() => (isPhoneMode.value ? 'tel' : 'email'))
  const canRequestCode = computed(() => (
    normalizePhoneDigits(registrationPhone.value).length === 11
    && isPersonalDataAccepted.value
    && isUserAgreementAccepted.value
  ))
  const canResendCode = computed(() => (
    resendSeconds.value === 0
    && !isCodeRequestPending.value
    && !isCodeVerifyPending.value
  ))
  const isSmsCodeConfirmed = computed(() => isPhoneConfirmed.value)
  const isSmsCodeInvalid = computed(() => Boolean(codeVerifyError.value))
  const smsCodePlaceholder = computed(() => Array.from({ length: SMS_CODE_LENGTH }, () => '—').join(' '))
  const shouldShowOrganizationSuggestions = computed(() => (
    isOrganizationSuggestionsOpen.value
    && (
      isOrganizationSuggestPending.value
      || Boolean(organizationSuggestError.value)
      || organizationSuggestions.value.length > 0
    )
  ))
  const isLegalRegistrationStep = computed(() => (
    step.value === 'legal-details' || step.value === 'legal-confirmation'
  ))
  const passwordInputType = computed(() => (isPasswordVisible.value ? 'text' : 'password'))
  const codeButtonText = computed(() => {
    if (isCodeRequestPending.value) {
      return 'Получить код'
    }
    return 'Получить код'
  })
  const resendCountdownText = computed(() => (
    `Получить повторно можно через ${resendSeconds.value} ${getSecondsWord(resendSeconds.value)}`
  ))
  const resendButtonText = computed(() => {
    if (isCodeRequestPending.value) {
      return 'Отправляем код'
    }
    return canResendCode.value ? 'Отправить повторно' : resendCountdownText.value
  })
  const successTitle = computed(() => (
    successMode.value === 'login' ? 'Готово, вы вошли!' : 'Ура, зарегистрировались!'
  ))
  const successDescription = 'Теперь у вас есть доступ к личному кабинету, избранному, отслеживанию заказов и безналичной оплате.'
  const passwordRecoveryDescription = 'Введите адрес электронной почты или\u00A0телефон, мы отправим вам инструкцию по\u00A0восстановлению пароля.'
  const isPasswordRecoveryPhone = computed(() => isPhoneLike(passwordRecoveryEmail.value))
  const passwordRecoverySentDescription = computed(() => {
    const destination = passwordRecoveryEmail.value.trim() || (isPasswordRecoveryPhone.value ? '+7 (000) 000 00 00' : 'Почта@домен.ру')

    if (isPasswordRecoveryPhone.value) {
      return 'Мы отправили СМС\nсо ссылкой для сброса пароля.'
    }

    return `Мы отправили письмо со ссылкой для\u00A0сброса пароля на почту ${destination}.`
  })
  const passwordRecoverySentHint = computed(() => (
    isPasswordRecoveryPhone.value
      ? 'Если вы его не получили, повторите попытку через 10 минут или напишите нам\u00A0адрес почты'
      : 'Если вы его не получили, проверьте папку Спам или напишите нам адрес почты'
  ))
  const modalTitle = computed(() => {
    if (step.value === 'entry') {
      return 'Вход или регистрация'
    }
    if (step.value === 'login') {
      return 'Вход'
    }
    if (step.value === 'password-recovery') {
      return 'Восстановление пароля'
    }
    if (step.value === 'password-recovery-sent') {
      return isPasswordRecoveryPhone.value ? 'Проверьте телефон' : 'Проверьте почту'
    }
    return 'Регистрация'
  })

  function getPasswordError(value) {
    if (!value) {
      return 'Введите пароль'
    }
    return value.length >= MIN_PASSWORD_LENGTH ? '' : `Минимум ${MIN_PASSWORD_LENGTH} символов`
  }

  function getSecondsWord(value) {
    const absoluteValue = Math.abs(value)
    const lastTwo = absoluteValue % 100

    if (lastTwo >= 11 && lastTwo <= 14) {
      return 'секунд'
    }

    const lastDigit = absoluteValue % 10

    if (lastDigit === 1) {
      return 'секунду'
    }
    if (lastDigit >= 2 && lastDigit <= 4) {
      return 'секунды'
    }
    return 'секунд'
  }

  function onIdentifierInput(event) {
    const value = event.target.value
    isSubmitted.value = false
    entryRequestError.value = ''
    loginRequestError.value = ''

    if (isPhoneLike(value)) {
      identifier.value = formatPhone(value)
      return
    }
    identifier.value = isPhoneMode.value ? unmaskPhoneToEmail(value) : value
  }

  function onIdentifierBlur() {
    isFieldTouched.value = true
  }

  function resetIdentifier() {
    identifier.value = ''
    isFieldTouched.value = false
    isSubmitted.value = false
    entryRequestError.value = ''
    loginRequestError.value = ''
  }

  function onRegistrationPhoneInput(event) {
    registrationPhone.value = formatCompactPhone(event.target.value)
    codeRequestError.value = ''
    codeAuthenticationId.value = ''
    codeVerifyError.value = ''
    isPhoneConfirmed.value = false
    isCodeRequestSent.value = false
    smsCode.value = ''
  }

  function onFullNameInput(event) {
    const rawValue = String(event?.target?.value ?? '')
    fullName.value = rawValue
      .replace(/[^\p{L}\s]/gu, '')
      .replace(/\s{2,}/g, ' ')
      .replace(/^\s+/, '')
  }

  function onRegistrationEmailInput() {
    isRegistrationSubmitted.value = false
    registrationRequestError.value = ''
  }

  function onPasswordInput() {
    isLoginSubmitted.value = false
    isRegistrationSubmitted.value = false
    loginRequestError.value = ''
    registrationRequestError.value = ''
  }

  function onPasswordRecoveryEmailInput(event) {
    const value = event.target.value
    isPasswordRecoverySubmitted.value = false
    passwordRecoveryRequestError.value = ''
    passwordRecoveryRequestMessage.value = ''

    if (isPhoneLike(value)) {
      passwordRecoveryEmail.value = formatPhone(value)
      return
    }
    passwordRecoveryEmail.value = isPhoneLike(passwordRecoveryEmail.value) ? unmaskPhoneToEmail(value) : value
  }

  function onSmsCodeInput(event) {
    smsCode.value = event.target.value.replace(/\D/g, '').slice(0, SMS_CODE_LENGTH)
    codeVerifyError.value = ''
    registrationRequestError.value = ''
  }

  function onOrganizationInnInput(event) {
    organizationInn.value = event.target.value.replace(/\D/g, '').slice(0, 12)
    selectedOrganization.value = null
    organizationSuggestError.value = ''
    isOrganizationSuggestionsOpen.value = true
    scheduleOrganizationSuggest()
  }

  function onOrganizationInnFocus() {
    if (organizationSuggestions.value.length > 0 || organizationInn.value.length >= 3) {
      isOrganizationSuggestionsOpen.value = true
    }
  }

  function onOrganizationInnBlur() {
    setTimeout(() => {
      isOrganizationSuggestionsOpen.value = false
    }, 120)
  }

  function resetCodeRequestStatus() {
    codeRequestError.value = ''
    codeAuthenticationId.value = ''
    codeVerifyError.value = ''
    isPhoneConfirmed.value = false
    isCodeRequestSent.value = false
    smsCode.value = ''
  }

  watch([isPersonalDataAccepted, isUserAgreementAccepted], resetCodeRequestStatus)

  function stopResendTimer() {
    if (resendTimerId) {
      clearInterval(resendTimerId)
      resendTimerId = undefined
    }
  }

  function stopOrganizationSuggestTimer() {
    if (organizationSuggestTimerId) {
      clearTimeout(organizationSuggestTimerId)
      organizationSuggestTimerId = undefined
    }
  }

  function startResendTimer() {
    stopResendTimer()
    resendSeconds.value = 60

    resendTimerId = setInterval(() => {
      if (resendSeconds.value <= 1) {
        stopResendTimer()
        resendSeconds.value = 0
        return
      }
      resendSeconds.value -= 1
    }, 1000)
  }

  function scheduleOrganizationSuggest() {
    stopOrganizationSuggestTimer()

    if (organizationInn.value.length < 3) {
      organizationSuggestions.value = []
      isOrganizationSuggestPending.value = false
      return
    }

    organizationSuggestTimerId = setTimeout(fetchOrganizationSuggestions, ORGANIZATION_SUGGEST_DELAY)
  }

  function resetAuthFlow() {
    step.value = 'entry'
    identifier.value = ''
    isFieldTouched.value = false
    isSubmitted.value = false
    isLoginSubmitted.value = false
    isRegistrationSubmitted.value = false
    fullName.value = ''
    registrationEmail.value = ''
    registrationPhone.value = ''
    password.value = ''
    passwordRecoveryEmail.value = ''
    isPasswordRecoverySubmitted.value = false
    isPasswordRecoveryRequestPending.value = false
    passwordRecoveryRequestError.value = ''
    passwordRecoveryRequestMessage.value = ''
    organizationInn.value = ''
    organizationSuggestions.value = []
    selectedOrganization.value = null
    isOrganizationSuggestPending.value = false
    organizationSuggestError.value = ''
    isOrganizationSuggestionsOpen.value = false
    isOrganizationSavePending.value = false
    organizationSaveError.value = ''
    isPasswordVisible.value = false
    smsCode.value = ''
    isLegalRepresentative.value = false
    isPersonalDataAccepted.value = false
    isUserAgreementAccepted.value = false
    isCodeRequestPending.value = false
    codeRequestError.value = ''
    isCodeRequestSent.value = false
    codeAuthenticationId.value = ''
    isCodeVerifyPending.value = false
    codeVerifyError.value = ''
    isPhoneConfirmed.value = false
    resendSeconds.value = 0
    isEntryRequestPending.value = false
    entryRequestError.value = ''
    isLoginRequestPending.value = false
    loginRequestError.value = ''
    isRegistrationRequestPending.value = false
    registrationRequestError.value = ''
    successMode.value = 'registration'
  }

  function getEntryRequestErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.message) {
      return error.message
    }
    return 'Не удалось проверить почту или телефон'
  }

  async function continueFromEntry() {
    if (isEntryRequestPending.value) {
      return
    }

    isSubmitted.value = true
    isFieldTouched.value = true
    entryRequestError.value = ''

    if (!identifier.value.trim()) {
      return
    }

    if (identifierError.value) {
      return
    }

    isEntryRequestPending.value = true

    try {
      const result = await $fetch('/api/auth-identifier', {
        method: 'POST',
        timeout: 6000,
        body: {
          identifier: isPhoneLike(identifier.value) ? formatAuthPhone(identifier.value) : identifier.value.trim()
        }
      })

      if (!result.exists) {
        startRegistration()
        return
      }

      isLoginSubmitted.value = false
      loginRequestError.value = ''
      password.value = ''
      step.value = 'login'

      nextTick(() => {
        document.getElementById('auth-entry-login-password')?.focus()
      })
    } catch (error) {
      entryRequestError.value = getEntryRequestErrorMessage(error)
    } finally {
      isEntryRequestPending.value = false
    }
  }

  function startRegistration() {
    const currentIdentifier = identifierError.value ? '' : identifier.value

    isLoginSubmitted.value = false
    isSubmitted.value = false
    isFieldTouched.value = false
    loginRequestError.value = ''
    password.value = ''
    registrationPhone.value = isPhoneLike(currentIdentifier) ? formatCompactPhone(currentIdentifier) : ''
    registrationEmail.value = isPhoneLike(currentIdentifier) ? '' : currentIdentifier.trim()
    step.value = 'registration'

    nextTick(() => {
      if (!registrationPhone.value) {
        document.getElementById('auth-entry-phone')?.focus()
      }
    })
  }

  function onFormSubmit() {
    if (step.value === 'entry') {
      continueFromEntry()
      return
    }
    if (step.value === 'login') {
      completeLogin()
      return
    }
    if (step.value === 'password-recovery') {
      requestPasswordRecovery()
      return
    }
    if (step.value === 'registration') {
      requestCode()
      return
    }
    if (step.value === 'legal-details') {
      return
    }
    if (step.value === 'legal-confirmation') {
      completeOrganizationRegistration()
      return
    }
    if (!isSmsCodeConfirmed.value) {
      verifyCode()
      return
    }
    if (step.value === 'code') {
      completeRegistration()
    }
  }

  function getAuthErrorMessage(error, fallbackMessage = 'Не удалось зарегистрироваться') {
    const message = [
      error?.message,
      error?.statusText,
      error?.data?.message,
      error?.error?.message,
      error?.cause?.message
    ].find(value => typeof value === 'string' && value.trim()) || ''

    if (message === 'Invalid email or password') {
      return 'Неверная почта или пароль'
    }
    if (message === 'Invalid phone number or password') {
      return 'Неверный телефон или пароль'
    }
    if (message === 'Invalid phone number') {
      return 'Введите корректный номер телефона'
    }
    if (message === 'Password too short') {
      return `Пароль должен быть не короче ${MIN_PASSWORD_LENGTH} символов`
    }
    if (message === 'Failed to create user') {
      return 'Не удалось создать аккаунт. Возможно, этот телефон уже используется.'
    }
    return message || fallbackMessage
  }

  function startPasswordRecovery() {
    passwordRecoveryEmail.value = isPhoneLike(identifier.value) ? '' : identifier.value.trim()
    isPasswordRecoverySubmitted.value = false
    passwordRecoveryRequestError.value = ''
    passwordRecoveryRequestMessage.value = ''
    step.value = 'password-recovery'

    nextTick(() => {
      document.getElementById('auth-entry-password-recovery-email')?.focus()
    })
  }

  function backToLoginFromPasswordRecovery() {
    isPasswordRecoverySubmitted.value = false
    passwordRecoveryRequestError.value = ''
    passwordRecoveryRequestMessage.value = ''
    step.value = 'login'

    nextTick(() => {
      document.getElementById('auth-entry-login-password')?.focus()
    })
  }

  async function requestPasswordRecovery() {
    if (isPasswordRecoveryRequestPending.value) {
      return
    }

    isPasswordRecoverySubmitted.value = true
    passwordRecoveryRequestError.value = ''
    passwordRecoveryRequestMessage.value = ''

    if (passwordRecoveryIdentifierError.value) {
      return
    }

    isPasswordRecoveryRequestPending.value = true

    try {
      if (!isPhoneLike(passwordRecoveryEmail.value) && typeof authClient.forgetPassword === 'function') {
        const result = await authClient.forgetPassword({
          email: passwordRecoveryEmail.value.trim()
        })

        if (result?.error) {
          passwordRecoveryRequestError.value = getAuthErrorMessage(result.error, 'Не удалось отправить ссылку')
          return
        }
      }

      passwordRecoveryRequestMessage.value = ''
      step.value = 'password-recovery-sent'
    } catch (error) {
      passwordRecoveryRequestError.value = getAuthErrorMessage(error, 'Не удалось отправить ссылку')
    } finally {
      isPasswordRecoveryRequestPending.value = false
    }
  }

  async function completeLogin() {
    if (isLoginRequestPending.value) {
      return
    }

    isLoginSubmitted.value = true
    isSubmitted.value = true
    isFieldTouched.value = true
    loginRequestError.value = ''

    if (!identifier.value.trim()) {
      return
    }

    if (identifierError.value) {
      return
    }
    if (passwordError.value) {
      return
    }

    const currentIdentifier = identifier.value
    const isPhoneLogin = isPhoneLike(currentIdentifier)

    isLoginRequestPending.value = true

    try {
      const authResult = isPhoneLogin
        ? await authClient.signIn.phoneNumber({
            phoneNumber: formatAuthPhone(currentIdentifier),
            password: password.value
          })
        : await authClient.signIn.email({
            email: currentIdentifier.trim(),
            password: password.value
          })

      if (authResult.error) {
        loginRequestError.value = getAuthErrorMessage(authResult.error, 'Не удалось войти')
        return
      }

      successMode.value = 'login'
      onCompleteLogin?.({
        identifier: isPhoneLogin ? formatCompactPhone(currentIdentifier) : currentIdentifier.trim(),
        result: authResult.data
      })

      step.value = 'success'
    } catch (error) {
      loginRequestError.value = getAuthErrorMessage(error, 'Не удалось войти')
    } finally {
      isLoginRequestPending.value = false
    }
  }

  async function completeRegistration() {
    if (isRegistrationRequestPending.value) {
      return
    }

    isRegistrationSubmitted.value = true
    registrationRequestError.value = ''

    if (registrationEmailError.value) {
      return
    }
    if (passwordError.value) {
      return
    }

    const payload = {
      fullName: fullName.value.trim(),
      email: registrationEmail.value.trim(),
      phone: registrationPhone.value.trim(),
      authPhone: formatAuthPhone(registrationPhone.value),
      password: password.value,
      isLegalRepresentative: isLegalRepresentative.value
    }

    isRegistrationRequestPending.value = true

    try {
      const authResult = await authClient.signUp.email({
        name: payload.fullName || payload.email,
        email: payload.email,
        password: payload.password,
        phoneNumber: payload.authPhone
      })

      if (authResult.error) {
        registrationRequestError.value = getAuthErrorMessage(authResult.error)
        return
      }

      onCompleteRegistration?.({
        ...payload,
        result: authResult.data
      })

      successMode.value = 'registration'

      if (payload.isLegalRepresentative) {
        step.value = 'legal-details'

        nextTick(() => {
          document.getElementById('auth-entry-organization-inn')?.focus()
        })

        return
      }

      step.value = 'success'
    } catch (error) {
      registrationRequestError.value = getAuthErrorMessage(error)
    } finally {
      isRegistrationRequestPending.value = false
    }
  }

  function getRequestErrorMessage(error) {
    if (isTimeoutError(error)) {
      return 'Сервис СМС не ответил вовремя. Попробуйте отправить код ещё раз.'
    }
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.message) {
      return error.message
    }
    return 'Не удалось отправить код подтверждения'
  }

  function getVerifyErrorMessage(error) {
    if (isTimeoutError(error)) {
      return 'Сервис СМС не ответил вовремя. Попробуйте проверить код ещё раз.'
    }
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.message) {
      return error.message
    }
    return 'Неверный код из СМС'
  }

  function isTimeoutError(error) {
    const message = String(error?.message ?? '')
    const causeMessage = String(error?.cause?.message ?? '')

    return error?.name === 'TimeoutError'
      || error?.code === 23
      || error?.cause?.name === 'TimeoutError'
      || error?.cause?.code === 23
      || message.includes('timeout')
      || message.includes('no response')
      || causeMessage.includes('timeout')
  }

  function getOrganizationSuggestErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.message) {
      return error.message
    }
    return 'Не удалось получить данные организации'
  }

  async function fetchOrganizationSuggestions() {
    const query = organizationInn.value

    if (query.length < 3) {
      organizationSuggestions.value = []
      return
    }

    const requestId = organizationSuggestRequestId + 1
    organizationSuggestRequestId = requestId
    isOrganizationSuggestPending.value = true
    organizationSuggestError.value = ''

    try {
      const result = await $fetch('/api/dadata/party-suggest', {
        method: 'POST',
        timeout: 10000,
        body: { query }
      })

      if (requestId !== organizationSuggestRequestId) {
        return
      }

      organizationSuggestions.value = result.suggestions ?? []
      isOrganizationSuggestionsOpen.value = true
    } catch (error) {
      if (requestId !== organizationSuggestRequestId) {
        return
      }
      organizationSuggestions.value = []
      organizationSuggestError.value = getOrganizationSuggestErrorMessage(error)
    } finally {
      if (requestId === organizationSuggestRequestId) {
        isOrganizationSuggestPending.value = false
      }
    }
  }

  function selectOrganization(suggestion) {
    selectedOrganization.value = suggestion
    organizationInn.value = suggestion.inn
    organizationSuggestions.value = []
    organizationSuggestError.value = ''
    organizationSaveError.value = ''
    isOrganizationSuggestionsOpen.value = false
    step.value = 'legal-confirmation'
  }

  function getOrganizationSaveErrorMessage(error) {
    if (error?.data?.message) {
      return error.data.message
    }
    if (error?.message) {
      return error.message
    }
    return 'Не удалось сохранить организацию'
  }

  async function completeOrganizationRegistration() {
    if (isOrganizationSavePending.value) {
      return
    }

    if (!selectedOrganization.value) {
      step.value = 'legal-details'
      return
    }

    isOrganizationSavePending.value = true
    organizationSaveError.value = ''

    try {
      await $fetch('/api/organizations', {
        method: 'POST',
        timeout: 10000,
        body: {
          organization: selectedOrganization.value
        }
      })

      step.value = 'success'
    } catch (error) {
      organizationSaveError.value = getOrganizationSaveErrorMessage(error)
    } finally {
      isOrganizationSavePending.value = false
    }
  }

  async function requestCode() {
    if (!canRequestCode.value || isCodeRequestPending.value) {
      return
    }

    const payload = {
      fullName: fullName.value.trim(),
      email: registrationEmail.value || null,
      phone: registrationPhone.value.trim(),
      isLegalRepresentative: isLegalRepresentative.value,
      isPersonalDataAccepted: isPersonalDataAccepted.value,
      isUserAgreementAccepted: isUserAgreementAccepted.value
    }

    isCodeRequestPending.value = true
    codeRequestError.value = ''
    codeAuthenticationId.value = ''
    codeVerifyError.value = ''
    isPhoneConfirmed.value = false
    isCodeRequestSent.value = false
    smsCode.value = ''

    try {
      const result = await $fetch('/api/auth/request-code', {
        method: 'POST',
        timeout: 40000,
        body: {
          phone: payload.phone,
          isPersonalDataAccepted: payload.isPersonalDataAccepted,
          isUserAgreementAccepted: payload.isUserAgreementAccepted
        }
      })

      if (!result.authenticationId) {
        throw new Error('Не удалось получить код подтверждения')
      }

      codeAuthenticationId.value = result.authenticationId
      isCodeRequestSent.value = true
      startResendTimer()
      step.value = 'code'
      onRequestCode?.({ ...payload, result })

      nextTick(() => {
        document.getElementById('auth-entry-sms-code')?.focus()
      })
    } catch (error) {
      codeRequestError.value = getRequestErrorMessage(error)
    } finally {
      isCodeRequestPending.value = false
    }
  }

  async function verifyCode() {
    if (isCodeVerifyPending.value || isSmsCodeConfirmed.value) {
      return
    }

    if (smsCode.value.length !== SMS_CODE_LENGTH) {
      return
    }

    if (!codeAuthenticationId.value) {
      codeVerifyError.value = 'Отправьте код повторно'
      return
    }

    isCodeVerifyPending.value = true
    codeVerifyError.value = ''
    registrationRequestError.value = ''

    try {
      await $fetch('/api/auth/verify-code', {
        method: 'POST',
        timeout: 30000,
        body: {
          authenticationId: codeAuthenticationId.value,
          code: smsCode.value
        }
      })

      isPhoneConfirmed.value = true
    } catch (error) {
      codeVerifyError.value = getVerifyErrorMessage(error)
    } finally {
      isCodeVerifyPending.value = false
    }
  }

  return {
    // state
    step,
    identifier,
    isFieldTouched,
    isSubmitted,
    isLoginSubmitted,
    isRegistrationSubmitted,
    fullName,
    registrationEmail,
    registrationPhone,
    password,
    passwordRecoveryEmail,
    isPasswordRecoverySubmitted,
    isPasswordRecoveryRequestPending,
    passwordRecoveryRequestError,
    passwordRecoveryRequestMessage,
    organizationInn,
    isPasswordVisible,
    smsCode,
    isLegalRepresentative,
    isPersonalDataAccepted,
    isUserAgreementAccepted,
    isCodeRequestPending,
    codeRequestError,
    isCodeRequestSent,
    codeAuthenticationId,
    isCodeVerifyPending,
    codeVerifyError,
    isPhoneConfirmed,
    resendSeconds,
    isEntryRequestPending,
    entryRequestError,
    isLoginRequestPending,
    loginRequestError,
    isRegistrationRequestPending,
    registrationRequestError,
    successMode,
    organizationSuggestions,
    selectedOrganization,
    isOrganizationSuggestPending,
    organizationSuggestError,
    isOrganizationSuggestionsOpen,
    isOrganizationSavePending,
    organizationSaveError,

    // constants
    SMS_CODE_LENGTH,
    MIN_PASSWORD_LENGTH,
    ORGANIZATION_SUGGEST_DELAY,

    // computed
    hasIdentifier,
    isPhoneMode,
    identifierError,
    visibleError,
    registrationEmailError,
    visibleRegistrationEmailError,
    passwordError,
    visibleLoginPasswordError,
    visiblePasswordError,
    passwordRecoveryEmailError: passwordRecoveryIdentifierError,
    visiblePasswordRecoveryEmailError,
    inputMode,
    canRequestCode,
    canResendCode,
    isSmsCodeConfirmed,
    isSmsCodeInvalid,
    smsCodePlaceholder,
    shouldShowOrganizationSuggestions,
    isLegalRegistrationStep,
    passwordInputType,
    codeButtonText,
    resendCountdownText,
    resendButtonText,
    successTitle,
    successDescription,
    passwordRecoveryDescription,
    isPasswordRecoveryPhone,
    passwordRecoverySentDescription,
    passwordRecoverySentHint,
    modalTitle,

    // methods
    getPasswordError,
    onIdentifierInput,
    onIdentifierBlur,
    resetIdentifier,
    onFullNameInput,
    onRegistrationPhoneInput,
    onRegistrationEmailInput,
    onPasswordInput,
    onPasswordRecoveryEmailInput,
    onSmsCodeInput,
    onOrganizationInnInput,
    onOrganizationInnFocus,
    onOrganizationInnBlur,
    resetCodeRequestStatus,
    stopResendTimer,
    stopOrganizationSuggestTimer,
    startResendTimer,
    scheduleOrganizationSuggest,
    resetAuthFlow,
    continueFromEntry,
    startRegistration,
    onFormSubmit,
    getAuthErrorMessage,
    startPasswordRecovery,
    backToLoginFromPasswordRecovery,
    requestPasswordRecovery,
    completeLogin,
    completeRegistration,
    getRequestErrorMessage,
    getVerifyErrorMessage,
    getOrganizationSuggestErrorMessage,
    fetchOrganizationSuggestions,
    selectOrganization,
    getOrganizationSaveErrorMessage,
    completeOrganizationRegistration,
    requestCode,
    verifyCode
  }
}

import { _ as __nuxt_component_0$1 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, m as useRequestHeaders, k as __nuxt_component_0$1$1, e as __nuxt_component_0$2, b as _sfc_main$h, s as setInterval } from './server.mjs';
import { withAsyncContext, computed, ref, mergeProps, unref, isRef, useModel, watch, withCtx, createVNode, mergeModels, nextTick, openBlock, createBlock, Fragment, createCommentVNode, toDisplayString, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrRenderAttr, ssrIncludeBooleanAttr } from 'vue/server-renderer';
import { a2 as formatCompactPhone, b as normalizePhoneDigits } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_0$3 } from './AppSwitch-B6KdDVqJ.mjs';
import { u as useFetch } from './fetch-DBsx_jy2.mjs';
import 'vue-router';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import 'perfect-debounce';
import 'better-auth/vue';
import 'better-auth/client/plugins';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'better-auth';
import 'better-auth/plugins';
import 'kysely';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:path';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import '@vue/shared';

const _sfc_main$8 = {
  __name: "ProfileSidebar",
  __ssrInlineRender: true,
  props: {
    activeItem: {
      type: String,
      default: "data"
    }
  },
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const navItems = [
      { key: "orders", label: "Мои заказы", badge: "Заказ готов", badgeType: "positive" },
      { key: "data", label: "Данные", badge: "Подтвердите почту", badgeType: "warning" },
      { key: "favorites", label: "Избранное", badge: "Пока ничего :(", badgeType: "empty" }
    ];
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_0$1$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "profile-sidebar" }, _attrs))} data-v-2fc2cee4><nav class="profile-sidebar__nav" data-v-2fc2cee4><!--[-->`);
      ssrRenderList(navItems, (item) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "profile-sidebar__link--active": __props.activeItem === item.key }, "profile-sidebar__link"])}" data-v-2fc2cee4><span class="profile-sidebar__label" data-v-2fc2cee4>${ssrInterpolate(item.label)}</span>`);
        if (item.badge) {
          _push(`<span class="${ssrRenderClass([`profile-sidebar__badge--${item.badgeType}`, "profile-sidebar__badge"])}" data-v-2fc2cee4>${ssrInterpolate(item.badge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><button type="button" class="profile-sidebar__logout" data-v-2fc2cee4><span class="profile-sidebar__logout-label" data-v-2fc2cee4>Выйти</span>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "header-sign-out-authorized",
        class: "profile-sidebar__logout-icon"
      }, null, _parent));
      _push(`</button></aside>`);
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileSidebar.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-2fc2cee4"]]);
const phoneInputId = "profile-phone-edit-phone";
const smsCodeInputId = "profile-phone-edit-code";
const SMS_CODE_LENGTH = 5;
const _sfc_main$7 = {
  __name: "ProfilePhoneEditModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    currentPhone: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["saved"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const props = __props;
    const emit = __emit;
    const phone = ref("");
    const smsCode = ref("");
    const authenticationId = ref("");
    const isCodeRequestPending = ref(false);
    const codeRequestError = ref("");
    const isCodeRequestSent = ref(false);
    const isCodeVerifyPending = ref(false);
    const codeVerifyError = ref("");
    const isPhoneConfirmed = ref(false);
    const resendSeconds = ref(0);
    const phoneInputRef = ref(null);
    const smsCodeInputRef = ref(null);
    let resendTimerId;
    const canRequestCode = computed(() => normalizePhoneDigits(phone.value).length === 11 && !isCodeRequestPending.value);
    const canResendCode = computed(() => resendSeconds.value === 0 && !isCodeRequestPending.value && !isCodeVerifyPending.value);
    const isSmsCodeInvalid = computed(() => Boolean(codeVerifyError.value));
    const smsCodePlaceholder = computed(() => Array.from({ length: SMS_CODE_LENGTH }, () => "—").join(" "));
    const resendCountdownText = computed(() => `Получить повторно можно через ${resendSeconds.value} ${getSecondsWord(resendSeconds.value)}`);
    const resendButtonText = computed(() => canResendCode.value ? "Отправить повторно" : resendCountdownText.value);
    const resetState = () => {
      phone.value = props.currentPhone || "";
      smsCode.value = "";
      authenticationId.value = "";
      isCodeRequestPending.value = false;
      codeRequestError.value = "";
      isCodeRequestSent.value = false;
      isCodeVerifyPending.value = false;
      codeVerifyError.value = "";
      isPhoneConfirmed.value = false;
      resendSeconds.value = 0;
    };
    const stopResendTimer = () => {
      if (resendTimerId) {
        clearInterval(resendTimerId);
        resendTimerId = void 0;
      }
    };
    const startResendTimer = () => {
      stopResendTimer();
      resendSeconds.value = 60;
      resendTimerId = setInterval();
    };
    const getSecondsWord = (value) => {
      const absoluteValue = Math.abs(value);
      const lastTwo = absoluteValue % 100;
      if (lastTwo >= 11 && lastTwo <= 14) {
        return "секунд";
      }
      const lastDigit = absoluteValue % 10;
      if (lastDigit === 1) {
        return "секунду";
      }
      if (lastDigit >= 2 && lastDigit <= 4) {
        return "секунды";
      }
      return "секунд";
    };
    const onPhoneInput = (event) => {
      phone.value = formatCompactPhone(event.target.value);
      codeRequestError.value = "";
      codeVerifyError.value = "";
      isCodeRequestSent.value = false;
      authenticationId.value = "";
      smsCode.value = "";
      isPhoneConfirmed.value = false;
      stopResendTimer();
      resendSeconds.value = 0;
    };
    const onSmsCodeInput = (event) => {
      smsCode.value = event.target.value.replace(/\D/g, "").slice(0, SMS_CODE_LENGTH);
      codeVerifyError.value = "";
    };
    const requestCode = async () => {
      if (!canRequestCode.value) {
        return;
      }
      isCodeRequestPending.value = true;
      codeRequestError.value = "";
      codeVerifyError.value = "";
      authenticationId.value = "";
      smsCode.value = "";
      isCodeRequestSent.value = false;
      try {
        const result = await $fetch("/api/profile/phone/request-code", {
          method: "POST",
          timeout: 6e3,
          body: {
            phone: phone.value.trim()
          }
        });
        authenticationId.value = result.authenticationId ?? "";
        isCodeRequestSent.value = true;
        startResendTimer();
        await nextTick();
        smsCodeInputRef.value?.focus();
      } catch (error) {
        codeRequestError.value = error?.data?.message || error?.message || "Не удалось отправить код подтверждения";
      } finally {
        isCodeRequestPending.value = false;
      }
    };
    const savePhone = async () => {
      if (isCodeVerifyPending.value || isPhoneConfirmed.value || !authenticationId.value || smsCode.value.length !== SMS_CODE_LENGTH) {
        return;
      }
      isCodeVerifyPending.value = true;
      codeVerifyError.value = "";
      try {
        const result = await $fetch("/api/profile/phone", {
          method: "PATCH",
          timeout: 1e4,
          body: {
            phone: phone.value.trim(),
            authenticationId: authenticationId.value,
            code: smsCode.value
          }
        });
        const savedUser = result?.user;
        if (!savedUser?.phoneNumber) {
          throw new Error("Не удалось сохранить номер телефона");
        }
        phone.value = formatCompactPhone(savedUser.phoneNumber);
        isPhoneConfirmed.value = true;
        stopResendTimer();
        resendSeconds.value = 0;
        emit("saved", savedUser);
      } catch (error) {
        codeVerifyError.value = error?.data?.message || error?.message || "Неверный код из СМС";
      } finally {
        isCodeVerifyPending.value = false;
      }
    };
    watch(isOpen, async (open) => {
      if (!open) {
        stopResendTimer();
        return;
      }
      resetState();
      await nextTick();
      phoneInputRef.value?.$el?.querySelector("input")?.focus();
    });
    watch(smsCode, (value) => {
      if (value.length === SMS_CODE_LENGTH && !isPhoneConfirmed.value) {
        savePhone();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_AppIcon = __nuxt_component_0$1$1;
      const _component_AppInput = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_UModal, mergeProps({
        open: isOpen.value,
        "onUpdate:open": ($event) => isOpen.value = $event,
        overlay: true,
        close: false,
        scrollable: true,
        ui: {
          content: "w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none",
          overlay: "bg-[rgba(4,18,27,0.74)]"
        }
      }, _attrs), {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="auth-entry auth-entry--profile-phone" data-v-6286836c${_scopeId}><header class="auth-entry__header" data-v-6286836c${_scopeId}><div class="auth-entry__title-block" data-v-6286836c${_scopeId}><h2 class="auth-entry__title" data-v-6286836c${_scopeId}> Изменение номера </h2></div><button type="button" class="auth-entry__close" aria-label="Закрыть изменение номера" data-v-6286836c${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "auth-entry__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header><div class="auth-entry__code-fields" data-v-6286836c${_scopeId}>`);
            if (unref(isPhoneConfirmed)) {
              _push2(`<div class="auth-entry__registration-phone auth-entry__registration-phone--confirmed" data-v-6286836c${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed" data-v-6286836c${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-6286836c${_scopeId}> Номер телефона </label>`);
              _push2(ssrRenderComponent(_component_AppInput, {
                id: phoneInputId,
                modelValue: unref(phone),
                "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed",
                type: "tel",
                autocomplete: "tel",
                readonly: ""
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="auth-entry__confirmed-badge" data-v-6286836c${_scopeId}> Сохранен </div></div>`);
            } else if (unref(isCodeRequestSent)) {
              _push2(`<!--[--><div class="auth-entry__registration-phone auth-entry__registration-phone--code" data-v-6286836c${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-6286836c${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-6286836c${_scopeId}> Номер телефона </label>`);
              _push2(ssrRenderComponent(_component_AppInput, {
                id: phoneInputId,
                modelValue: unref(phone),
                "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone",
                type: "tel",
                autocomplete: "tel",
                inputmode: "tel",
                readonly: ""
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="${ssrRenderClass([{ "auth-entry__sms-code-field--invalid": unref(isSmsCodeInvalid) }, "auth-entry__field auth-entry__field--compact auth-entry__sms-code-field"])}" data-v-6286836c${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", smsCodeInputId)} data-v-6286836c${_scopeId}> Код из СМС </label><span class="auth-entry__sms-code-box" data-v-6286836c${_scopeId}><input${ssrRenderAttr("id", smsCodeInputId)}${ssrRenderAttr("value", unref(smsCode))} class="auth-entry__input auth-entry__input--compact auth-entry__input--sms-code" type="text"${ssrRenderAttr("placeholder", unref(smsCodePlaceholder))} autocomplete="one-time-code" inputmode="numeric"${ssrRenderAttr("maxlength", SMS_CODE_LENGTH)}${ssrRenderAttr("aria-invalid", unref(isSmsCodeInvalid))} data-v-6286836c${_scopeId}>`);
              if (unref(isSmsCodeInvalid)) {
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "reset",
                  size: 16,
                  class: "auth-entry__sms-code-error-icon"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span></div></div><button type="button" class="${ssrRenderClass([{ "auth-entry__resend--active": unref(canResendCode) }, "auth-entry__resend"])}"${ssrIncludeBooleanAttr(!unref(canResendCode)) ? " disabled" : ""} data-v-6286836c${_scopeId}>${ssrInterpolate(unref(resendButtonText))}</button><!--]-->`);
            } else {
              _push2(`<!--[--><div class="auth-entry__registration-phone" data-v-6286836c${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-6286836c${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-6286836c${_scopeId}> Номер телефона </label>`);
              _push2(ssrRenderComponent(_component_AppInput, {
                id: phoneInputId,
                ref_key: "phoneInputRef",
                ref: phoneInputRef,
                modelValue: unref(phone),
                "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone",
                type: "tel",
                placeholder: "+7(999)-999-99-99",
                autocomplete: "tel",
                inputmode: "tel",
                mask: "+7(###)-###-##-##",
                onInput: onPhoneInput
              }, null, _parent2, _scopeId));
              _push2(`</div><button type="button" class="auth-entry__code-button"${ssrIncludeBooleanAttr(!unref(canRequestCode) || unref(isCodeRequestPending)) ? " disabled" : ""} data-v-6286836c${_scopeId}>${ssrInterpolate(unref(isCodeRequestPending) ? "Отправляем" : "Получить код")}</button></div><p class="auth-entry__hint" data-v-6286836c${_scopeId}> Отправим вам смс с кодом подтверждения </p><!--]-->`);
            }
            if (unref(codeRequestError) || unref(codeVerifyError)) {
              _push2(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-6286836c${_scopeId}>${ssrInterpolate(unref(codeRequestError) || unref(codeVerifyError))}</p>`);
            } else if (unref(isCodeRequestSent) && !unref(isPhoneConfirmed)) {
              _push2(`<p class="auth-entry__request-status" data-v-6286836c${_scopeId}> Код отправлен </p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "auth-entry auth-entry--profile-phone" }, [
                createVNode("header", { class: "auth-entry__header" }, [
                  createVNode("div", { class: "auth-entry__title-block" }, [
                    createVNode("h2", { class: "auth-entry__title" }, " Изменение номера ")
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "auth-entry__close",
                    "aria-label": "Закрыть изменение номера",
                    onClick: ($event) => isOpen.value = false
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "close",
                      size: 16,
                      class: "auth-entry__close-icon"
                    })
                  ], 8, ["onClick"])
                ]),
                createVNode("div", { class: "auth-entry__code-fields" }, [
                  unref(isPhoneConfirmed) ? (openBlock(), createBlock("div", {
                    key: 0,
                    class: "auth-entry__registration-phone auth-entry__registration-phone--confirmed"
                  }, [
                    createVNode("div", { class: "auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed" }, [
                      createVNode("label", {
                        class: "auth-entry__label",
                        for: phoneInputId
                      }, " Номер телефона "),
                      createVNode(_component_AppInput, {
                        id: phoneInputId,
                        modelValue: unref(phone),
                        "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                        class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed",
                        type: "tel",
                        autocomplete: "tel",
                        readonly: ""
                      }, null, 8, ["modelValue", "onUpdate:modelValue"])
                    ]),
                    createVNode("div", { class: "auth-entry__confirmed-badge" }, " Сохранен ")
                  ])) : unref(isCodeRequestSent) ? (openBlock(), createBlock(Fragment, { key: 1 }, [
                    createVNode("div", { class: "auth-entry__registration-phone auth-entry__registration-phone--code" }, [
                      createVNode("div", { class: "auth-entry__field auth-entry__field--compact auth-entry__phone-field" }, [
                        createVNode("label", {
                          class: "auth-entry__label",
                          for: phoneInputId
                        }, " Номер телефона "),
                        createVNode(_component_AppInput, {
                          id: phoneInputId,
                          modelValue: unref(phone),
                          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                          class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone",
                          type: "tel",
                          autocomplete: "tel",
                          inputmode: "tel",
                          readonly: ""
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("div", {
                        class: ["auth-entry__field auth-entry__field--compact auth-entry__sms-code-field", { "auth-entry__sms-code-field--invalid": unref(isSmsCodeInvalid) }]
                      }, [
                        createVNode("label", {
                          class: "auth-entry__label",
                          for: smsCodeInputId
                        }, " Код из СМС "),
                        createVNode("span", { class: "auth-entry__sms-code-box" }, [
                          createVNode("input", {
                            id: smsCodeInputId,
                            ref_key: "smsCodeInputRef",
                            ref: smsCodeInputRef,
                            value: unref(smsCode),
                            class: "auth-entry__input auth-entry__input--compact auth-entry__input--sms-code",
                            type: "text",
                            placeholder: unref(smsCodePlaceholder),
                            autocomplete: "one-time-code",
                            inputmode: "numeric",
                            maxlength: SMS_CODE_LENGTH,
                            "aria-invalid": unref(isSmsCodeInvalid),
                            onInput: onSmsCodeInput
                          }, null, 40, ["value", "placeholder", "aria-invalid"]),
                          unref(isSmsCodeInvalid) ? (openBlock(), createBlock(_component_AppIcon, {
                            key: 0,
                            name: "reset",
                            size: 16,
                            class: "auth-entry__sms-code-error-icon"
                          })) : createCommentVNode("", true)
                        ])
                      ], 2)
                    ]),
                    createVNode("button", {
                      type: "button",
                      class: ["auth-entry__resend", { "auth-entry__resend--active": unref(canResendCode) }],
                      disabled: !unref(canResendCode),
                      onClick: requestCode
                    }, toDisplayString(unref(resendButtonText)), 11, ["disabled"])
                  ], 64)) : (openBlock(), createBlock(Fragment, { key: 2 }, [
                    createVNode("div", { class: "auth-entry__registration-phone" }, [
                      createVNode("div", { class: "auth-entry__field auth-entry__field--compact auth-entry__phone-field" }, [
                        createVNode("label", {
                          class: "auth-entry__label",
                          for: phoneInputId
                        }, " Номер телефона "),
                        createVNode(_component_AppInput, {
                          id: phoneInputId,
                          ref_key: "phoneInputRef",
                          ref: phoneInputRef,
                          modelValue: unref(phone),
                          "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                          class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone",
                          type: "tel",
                          placeholder: "+7(999)-999-99-99",
                          autocomplete: "tel",
                          inputmode: "tel",
                          mask: "+7(###)-###-##-##",
                          onInput: onPhoneInput
                        }, null, 8, ["modelValue", "onUpdate:modelValue"])
                      ]),
                      createVNode("button", {
                        type: "button",
                        class: "auth-entry__code-button",
                        disabled: !unref(canRequestCode) || unref(isCodeRequestPending),
                        onClick: requestCode
                      }, toDisplayString(unref(isCodeRequestPending) ? "Отправляем" : "Получить код"), 9, ["disabled"])
                    ]),
                    createVNode("p", { class: "auth-entry__hint" }, " Отправим вам смс с кодом подтверждения ")
                  ], 64)),
                  unref(codeRequestError) || unref(codeVerifyError) ? (openBlock(), createBlock("p", {
                    key: 3,
                    class: "auth-entry__request-status auth-entry__request-status--error"
                  }, toDisplayString(unref(codeRequestError) || unref(codeVerifyError)), 1)) : unref(isCodeRequestSent) && !unref(isPhoneConfirmed) ? (openBlock(), createBlock("p", {
                    key: 4,
                    class: "auth-entry__request-status"
                  }, " Код отправлен ")) : createCommentVNode("", true)
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$7 = _sfc_main$7.setup;
_sfc_main$7.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePhoneEditModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-6286836c"]]);
const phoneMask = "+7(###)-###-##-##";
const _sfc_main$6 = {
  __name: "ProfilePersonalData",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    isEmailVerified: { type: Boolean, default: false },
    isPhoneVerified: { type: Boolean, default: false },
    recipients: {
      type: Array,
      default: () => []
    }
  }, {
    "name": { type: String, default: "" },
    "nameModifiers": {},
    "phone": { type: String, default: "" },
    "phoneModifiers": {},
    "email": { type: String, default: "" },
    "emailModifiers": {},
    "additionalContact": { type: String, default: "" },
    "additionalContactModifiers": {},
    "recipientName": { type: String, default: "" },
    "recipientNameModifiers": {},
    "recipientPhone": { type: String, default: "" },
    "recipientPhoneModifiers": {},
    "showRecipient": { type: Boolean, default: true },
    "showRecipientModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["updated"], ["update:name", "update:phone", "update:email", "update:additionalContact", "update:recipientName", "update:recipientPhone", "update:showRecipient"]),
  setup(__props, { emit: __emit }) {
    const props = __props;
    const name = useModel(__props, "name");
    const phone = useModel(__props, "phone");
    const email = useModel(__props, "email");
    const additionalContact = useModel(__props, "additionalContact");
    const recipientName = useModel(__props, "recipientName");
    const recipientPhone = useModel(__props, "recipientPhone");
    const showRecipient = useModel(__props, "showRecipient");
    const emit = __emit;
    const isPhoneModalOpen = ref(false);
    let nextRecipientId = 0;
    const recipientTimers = /* @__PURE__ */ new Map();
    const createRecipientForm = (initialValue = {}) => ({
      id: ++nextRecipientId,
      serverId: initialValue.id || null,
      name: initialValue.name || "",
      phone: formatCompactPhone(initialValue.phoneNumber || initialValue.phone || ""),
      lastSavedName: initialValue.name || "",
      lastSavedPhone: formatCompactPhone(initialValue.phoneNumber || initialValue.phone || ""),
      isSaveNoticeVisible: false,
      isSaving: false,
      isDeleting: false
    });
    const recipientForms = ref([]);
    const buildRecipientForms = (recipients = []) => {
      if (recipients.length > 0) {
        return recipients.map(createRecipientForm);
      }
      if (showRecipient.value || recipientName.value || recipientPhone.value) {
        return [createRecipientForm({
          name: recipientName.value,
          phone: recipientPhone.value
        })];
      }
      return [];
    };
    const onIconClick = () => {
    };
    const onPhoneEditClick = () => {
      isPhoneModalOpen.value = true;
    };
    const onPhoneSaved = (user) => {
      if (!user?.phoneNumber) {
        return;
      }
      phone.value = formatCompactPhone(user.phoneNumber);
      isPhoneModalOpen.value = false;
      emit("updated", user);
    };
    const isRecipientDirty = (recipient) => recipient.name !== recipient.lastSavedName || recipient.phone !== recipient.lastSavedPhone;
    const canSaveRecipient = (recipient) => recipient.name.trim().length > 0 && isRecipientDirty(recipient) && !recipient.isSaveNoticeVisible && !recipient.isSaving && !recipient.isDeleting;
    const clearRecipientTimer = (recipientId) => {
      const timerId = recipientTimers.get(recipientId);
      if (timerId) {
        clearTimeout(timerId);
        recipientTimers.delete(recipientId);
      }
    };
    const syncPrimaryRecipient = () => {
      recipientForms.value.forEach((recipient) => {
        if (recipient.isSaveNoticeVisible && isRecipientDirty(recipient)) {
          clearRecipientTimer(recipient.id);
          recipient.isSaveNoticeVisible = false;
        }
      });
      const [firstRecipient] = recipientForms.value;
      recipientName.value = firstRecipient?.name || "";
      recipientPhone.value = firstRecipient?.phone || "";
      showRecipient.value = recipientForms.value.length > 0;
    };
    watch(
      () => props.recipients,
      (recipients) => {
        recipientTimers.forEach((timerId) => clearTimeout(timerId));
        recipientTimers.clear();
        recipientForms.value = buildRecipientForms(recipients);
        syncPrimaryRecipient();
      },
      { immediate: true }
    );
    watch(recipientForms, syncPrimaryRecipient, { deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProfilePhoneEditModal = __nuxt_component_0;
      const _component_AppInput = __nuxt_component_0$2;
      const _component_AppIcon = __nuxt_component_0$1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-personal" }, _attrs))} data-v-e52a5703>`);
      _push(ssrRenderComponent(_component_ProfilePhoneEditModal, {
        modelValue: unref(isPhoneModalOpen),
        "onUpdate:modelValue": ($event) => isRef(isPhoneModalOpen) ? isPhoneModalOpen.value = $event : null,
        "current-phone": phone.value,
        onSaved: onPhoneSaved
      }, null, _parent));
      _push(`<h2 class="profile-personal__title" data-v-e52a5703> Данные пользователя </h2><div class="profile-personal__body" data-v-e52a5703><div class="profile-personal__fields" data-v-e52a5703><div class="profile-field" data-v-e52a5703><label class="profile-field__label" for="profile-name" data-v-e52a5703> Имя </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-name",
        modelValue: name.value,
        "onUpdate:modelValue": ($event) => name.value = $event,
        class: "profile-field__control",
        type: "text",
        autocomplete: "name"
      }, null, _parent));
      _push(`</div><div class="profile-field profile-field--phone" data-v-e52a5703><label class="profile-field__label" for="profile-phone" data-v-e52a5703> Номер телефона </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-phone",
        modelValue: phone.value,
        "onUpdate:modelValue": ($event) => phone.value = $event,
        class: "profile-field__control profile-field__control--phone",
        type: "tel",
        placeholder: "+7(___)-___-__-__",
        mask: "+7(###)-###-##-##",
        autocomplete: "tel",
        inputmode: "tel"
      }, {
        suffix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать номер телефона" data-v-e52a5703${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "profile-edit",
              size: "12",
              class: "profile-field__icon"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                class: "profile-field__icon-button",
                "aria-label": "Редактировать номер телефона",
                onClick: onPhoneEditClick
              }, [
                createVNode(_component_AppIcon, {
                  name: "profile-edit",
                  size: "12",
                  class: "profile-field__icon"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div><div class="profile-personal__email-row" data-v-e52a5703><div class="profile-field" data-v-e52a5703><label class="profile-field__label" for="profile-email" data-v-e52a5703> Электронная почта </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-email",
        modelValue: email.value,
        "onUpdate:modelValue": ($event) => email.value = $event,
        class: "profile-field__control",
        type: "email",
        autocomplete: "email"
      }, {
        suffix: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать почту" data-v-e52a5703${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "profile-edit",
              size: "12",
              class: "profile-field__icon"
            }, null, _parent2, _scopeId));
            _push2(`</button>`);
          } else {
            return [
              createVNode("button", {
                type: "button",
                class: "profile-field__icon-button",
                "aria-label": "Редактировать почту",
                onClick: onIconClick
              }, [
                createVNode(_component_AppIcon, {
                  name: "profile-edit",
                  size: "12",
                  class: "profile-field__icon"
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</div>`);
      if (email.value && !__props.isEmailVerified) {
        _push(`<button type="button" class="profile-personal__confirm" data-v-e52a5703> Подтвердить </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="profile-field" data-v-e52a5703><label class="profile-field__label" for="profile-additional-contact" data-v-e52a5703> Дополнительный контакт </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-additional-contact",
        modelValue: additionalContact.value,
        "onUpdate:modelValue": ($event) => additionalContact.value = $event,
        class: "profile-field__control",
        type: "text",
        placeholder: "Телеграм, ВКонтакте...",
        autocomplete: "off"
      }, null, _parent));
      _push(`</div></div><div class="profile-recipient" data-v-e52a5703><div class="profile-recipient__header" data-v-e52a5703><h3 class="profile-recipient__title" data-v-e52a5703> Получатель </h3><p class="profile-recipient__subtitle" data-v-e52a5703> Человек, который получит заказ </p></div>`);
      if (unref(recipientForms).length) {
        _push(`<div class="profile-recipient__forms" data-v-e52a5703><!--[-->`);
        ssrRenderList(unref(recipientForms), (recipient) => {
          _push(`<article class="profile-recipient-form" data-v-e52a5703><div class="profile-field" data-v-e52a5703><label class="profile-field__label"${ssrRenderAttr("for", `profile-recipient-name-${recipient.id}`)} data-v-e52a5703> Имя </label>`);
          _push(ssrRenderComponent(_component_AppInput, {
            id: `profile-recipient-name-${recipient.id}`,
            modelValue: recipient.name,
            "onUpdate:modelValue": ($event) => recipient.name = $event,
            class: "profile-field__control",
            type: "text",
            autocomplete: "off"
          }, {
            suffix: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать имя получателя" data-v-e52a5703${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "profile-edit",
                  size: "12",
                  class: "profile-field__icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    type: "button",
                    class: "profile-field__icon-button",
                    "aria-label": "Редактировать имя получателя",
                    onClick: onIconClick
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "profile-edit",
                      size: "12",
                      class: "profile-field__icon"
                    })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="profile-field profile-field--phone" data-v-e52a5703><label class="profile-field__label"${ssrRenderAttr("for", `profile-recipient-phone-${recipient.id}`)} data-v-e52a5703> Номер телефона </label>`);
          _push(ssrRenderComponent(_component_AppInput, {
            id: `profile-recipient-phone-${recipient.id}`,
            modelValue: recipient.phone,
            "onUpdate:modelValue": ($event) => recipient.phone = $event,
            class: "profile-field__control profile-field__control--phone",
            type: "tel",
            placeholder: "+7(___)-___-__-__",
            mask: phoneMask,
            autocomplete: "off",
            inputmode: "tel"
          }, {
            suffix: withCtx((_, _push2, _parent2, _scopeId) => {
              if (_push2) {
                _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать номер получателя" data-v-e52a5703${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "profile-edit",
                  size: "12",
                  class: "profile-field__icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                return [
                  createVNode("button", {
                    type: "button",
                    class: "profile-field__icon-button",
                    "aria-label": "Редактировать номер получателя",
                    onClick: onIconClick
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "profile-edit",
                      size: "12",
                      class: "profile-field__icon"
                    })
                  ])
                ];
              }
            }),
            _: 2
          }, _parent));
          _push(`</div><div class="profile-recipient-form__actions" data-v-e52a5703><button type="button" class="profile-recipient-form__remove" data-v-e52a5703>`);
          _push(ssrRenderComponent(_component_AppIcon, {
            name: "profile-trash",
            size: "12",
            class: "profile-recipient-form__action-icon"
          }, null, _parent));
          _push(`<span data-v-e52a5703>Удалить</span></button>`);
          if (canSaveRecipient(recipient)) {
            _push(`<button type="button" class="profile-recipient-form__save" data-v-e52a5703> Сохранить </button>`);
          } else if (recipient.isSaveNoticeVisible) {
            _push(`<span class="profile-recipient-form__saved" data-v-e52a5703> Сохранен </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="profile-recipient__toggle" data-v-e52a5703><div class="profile-recipient__toggle-copy" data-v-e52a5703><span class="profile-recipient__toggle-title" data-v-e52a5703>Добавить получателя</span><span class="profile-recipient__toggle-text" data-v-e52a5703> Добавьте людей, которые могут получить заказ за вас </span></div><button type="button" class="profile-recipient__add" data-v-e52a5703>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "profile-plus",
        size: "10",
        class: "profile-recipient__button-icon"
      }, null, _parent));
      _push(`<span data-v-e52a5703>Добавить</span></button></div></div></div></section>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePersonalData.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-e52a5703"]]);
const ORGANIZATION_SUGGEST_DELAY = 350;
const _sfc_main$5 = {
  __name: "ProfileOrganizations",
  __ssrInlineRender: true,
  props: {
    organizations: {
      type: Array,
      default: () => []
    }
  },
  emits: ["updated"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const organizationInn = ref("");
    const organizationSuggestions = ref([]);
    const organizationSuggestError = ref("");
    const isOrganizationSuggestPending = ref(false);
    const isOrganizationSuggestionsOpen = ref(false);
    const isAddMode = ref(false);
    ref(false);
    const pendingDeleteId = ref("");
    const pendingActiveId = ref("");
    const addInput = ref(null);
    let organizationSuggestTimerId;
    let organizationSuggestRequestId = 0;
    const displayOrganizations = computed(() => {
      const hasExplicitActive = props.organizations.some((organization) => organization.isActive);
      return props.organizations.map((organization, index) => ({
        ...organization,
        active: hasExplicitActive ? Boolean(organization.isActive) : index === 0,
        innLabel: organization.inn ? `ИНН ${organization.inn}` : ""
      }));
    });
    const shouldShowOrganizationSuggestions = computed(() => isOrganizationSuggestionsOpen.value && (isOrganizationSuggestPending.value || Boolean(organizationSuggestError.value) || organizationSuggestions.value.length > 0));
    const stopOrganizationSuggestTimer = () => {
      if (organizationSuggestTimerId) {
        clearTimeout(organizationSuggestTimerId);
        organizationSuggestTimerId = void 0;
      }
    };
    const getOrganizationSuggestErrorMessage = (error) => {
      if (error?.data?.message) {
        return error.data.message;
      }
      if (error?.message) {
        return error.message;
      }
      return "Не удалось получить данные организации";
    };
    const fetchOrganizationSuggestions = async () => {
      const query = organizationInn.value;
      if (query.length < 3) {
        organizationSuggestions.value = [];
        return;
      }
      const requestId = organizationSuggestRequestId + 1;
      organizationSuggestRequestId = requestId;
      isOrganizationSuggestPending.value = true;
      organizationSuggestError.value = "";
      try {
        const result = await $fetch("/api/dadata/party-suggest", {
          method: "POST",
          timeout: 1e4,
          body: { query }
        });
        if (requestId !== organizationSuggestRequestId) {
          return;
        }
        organizationSuggestions.value = result.suggestions ?? [];
        isOrganizationSuggestionsOpen.value = true;
      } catch (error) {
        if (requestId !== organizationSuggestRequestId) {
          return;
        }
        organizationSuggestions.value = [];
        organizationSuggestError.value = getOrganizationSuggestErrorMessage(error);
      } finally {
        if (requestId === organizationSuggestRequestId) {
          isOrganizationSuggestPending.value = false;
        }
      }
    };
    const scheduleOrganizationSuggest = () => {
      stopOrganizationSuggestTimer();
      if (organizationInn.value.length < 3) {
        organizationSuggestions.value = [];
        isOrganizationSuggestPending.value = false;
        return;
      }
      organizationSuggestTimerId = setTimeout(fetchOrganizationSuggestions, ORGANIZATION_SUGGEST_DELAY);
    };
    const onOrganizationInnInput = (value) => {
      organizationInn.value = String(value ?? "").replace(/\D/g, "").slice(0, 12);
      organizationSuggestError.value = "";
      isOrganizationSuggestionsOpen.value = true;
      scheduleOrganizationSuggest();
    };
    const onOrganizationInnFocus = () => {
      if (organizationSuggestions.value.length > 0 || organizationInn.value.length >= 3) {
        isOrganizationSuggestionsOpen.value = true;
      }
    };
    const onOrganizationInnBlur = () => {
      setTimeout(() => {
        isOrganizationSuggestionsOpen.value = false;
      }, 120);
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_0$1$1;
      const _component_AppInput = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-organizations" }, _attrs))} data-v-807a1b06><h2 class="profile-organizations__title" data-v-807a1b06> Организации </h2><div class="profile-organizations__body" data-v-807a1b06>`);
      if (unref(displayOrganizations).length) {
        _push(`<div class="profile-organizations__list" data-v-807a1b06><!--[-->`);
        ssrRenderList(unref(displayOrganizations), (organization) => {
          _push(`<article class="${ssrRenderClass([{ "profile-organization--active": organization.active }, "profile-organization"])}" data-v-807a1b06><div class="profile-organization__top" data-v-807a1b06><span class="profile-organization__radio-wrap" data-v-807a1b06><button type="button" class="${ssrRenderClass([{ "profile-organization__radio--active": organization.active }, "profile-organization__radio"])}"${ssrIncludeBooleanAttr(unref(pendingActiveId) === organization.id) ? " disabled" : ""}${ssrRenderAttr("aria-pressed", organization.active)}${ssrRenderAttr("aria-label", organization.active ? "Активная организация" : "Сделать организацию активной")} data-v-807a1b06></button></span><button type="button" class="profile-organization__delete"${ssrIncludeBooleanAttr(unref(pendingDeleteId) === organization.id) ? " disabled" : ""} data-v-807a1b06>${ssrInterpolate(unref(pendingDeleteId) === organization.id ? "Удаляем" : "Удалить")}</button></div><div class="profile-organization__content" data-v-807a1b06><h3 class="profile-organization__name" data-v-807a1b06>${ssrInterpolate(organization.name)}</h3>`);
          if (organization.innLabel) {
            _push(`<p class="profile-organization__meta" data-v-807a1b06>${ssrInterpolate(organization.innLabel)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (organization.address) {
            _push(`<p class="profile-organization__meta" data-v-807a1b06>${ssrInterpolate(organization.address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="profile-organizations__add-row" data-v-807a1b06><div class="profile-organizations__add-copy" data-v-807a1b06><span class="profile-organizations__add-title" data-v-807a1b06>Добавить организацию</span><span class="profile-organizations__add-text" data-v-807a1b06> Чтобы платить безналом и пользоваться ЭДО </span></div><div class="profile-organizations__add-control" data-v-807a1b06>`);
      if (!unref(isAddMode)) {
        _push(`<button type="button" class="profile-organizations__add" data-v-807a1b06>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "profile-plus",
          size: "10",
          class: "profile-organizations__add-icon"
        }, null, _parent));
        _push(`<span data-v-807a1b06>Добавить</span></button>`);
      } else {
        _push(`<div class="profile-organizations__add-input-wrap" data-v-807a1b06>`);
        _push(ssrRenderComponent(_component_AppInput, {
          ref_key: "addInput",
          ref: addInput,
          "model-value": unref(organizationInn),
          class: "profile-organizations__input",
          type: "text",
          placeholder: "Введите ИНН компании",
          autocomplete: "off",
          inputmode: "numeric",
          maxlength: "12",
          "onUpdate:modelValue": onOrganizationInnInput,
          onFocus: onOrganizationInnFocus,
          onBlur: onOrganizationInnBlur
        }, null, _parent));
        if (unref(shouldShowOrganizationSuggestions)) {
          _push(`<div class="profile-organizations__options" data-v-807a1b06>`);
          if (unref(isOrganizationSuggestPending)) {
            _push(`<p class="profile-organizations__status" data-v-807a1b06> Ищем организацию </p>`);
          } else if (unref(organizationSuggestError)) {
            _push(`<p class="profile-organizations__status profile-organizations__status--error" data-v-807a1b06>${ssrInterpolate(unref(organizationSuggestError))}</p>`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(unref(organizationSuggestions), (suggestion) => {
              _push(`<button type="button" class="profile-organizations__option" data-v-807a1b06><span class="profile-organizations__option-name" data-v-807a1b06>${ssrInterpolate(suggestion.name)}</span>`);
              if (suggestion.inn) {
                _push(`<span class="profile-organizations__option-meta" data-v-807a1b06><span class="profile-organizations__option-prefix" data-v-807a1b06>ИНН</span> ${ssrInterpolate(suggestion.inn)}</span>`);
              } else {
                _push(`<!---->`);
              }
              if (suggestion.address) {
                _push(`<span class="profile-organizations__option-meta" data-v-807a1b06>${ssrInterpolate(suggestion.address)}</span>`);
              } else {
                _push(`<!---->`);
              }
              _push(`</button>`);
            });
            _push(`<!--]-->`);
          }
          _push(`</div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileOrganizations.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-807a1b06"]]);
const _sfc_main$4 = {
  __name: "ProfileNotificationSettings",
  __ssrInlineRender: true,
  setup(__props) {
    const emailNotifications = ref(false);
    const smsNotifications = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppSwitch = __nuxt_component_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-notifications" }, _attrs))} data-v-147f4ba0><h2 class="profile-notifications__title" data-v-147f4ba0> Настройка уведомлений </h2><div class="profile-notifications__body" data-v-147f4ba0><div class="profile-notifications__items" data-v-147f4ba0><div class="profile-notification" data-v-147f4ba0><div class="profile-notification__copy" data-v-147f4ba0><span class="profile-notification__title" data-v-147f4ba0>Email-уведомления</span><span class="profile-notification__text" data-v-147f4ba0> Будем сообщать<br data-v-147f4ba0> об изменении статуса заказа </span></div>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(emailNotifications),
        "onUpdate:modelValue": ($event) => isRef(emailNotifications) ? emailNotifications.value = $event : null,
        class: "profile-notification__switch",
        disabled: ""
      }, null, _parent));
      _push(`</div><div class="profile-notification" data-v-147f4ba0><div class="profile-notification__copy" data-v-147f4ba0><span class="profile-notification__title" data-v-147f4ba0>СМС-уведомления</span><span class="profile-notification__text" data-v-147f4ba0> Будем сообщать<br data-v-147f4ba0> о готовности заказа </span></div>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(smsNotifications),
        "onUpdate:modelValue": ($event) => isRef(smsNotifications) ? smsNotifications.value = $event : null,
        class: "profile-notification__switch",
        disabled: ""
      }, null, _parent));
      _push(`</div></div></div></section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileNotificationSettings.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-147f4ba0"]]);
const _sfc_main$3 = {
  __name: "ProfilePasswordSettings",
  __ssrInlineRender: true,
  setup(__props) {
    const currentPassword = ref("");
    const newPassword = ref("");
    const repeatedPassword = ref("");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0$2;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-password" }, _attrs))} data-v-ad5c089b><h2 class="profile-password__title" data-v-ad5c089b> Смена пароля </h2><div class="profile-password__form" data-v-ad5c089b><label class="profile-password-field" data-v-ad5c089b><span class="profile-password-field__label" data-v-ad5c089b>Текущий пароль</span>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(currentPassword),
        "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
        class: "profile-password-field__control",
        type: "password",
        placeholder: "Введите пароль",
        autocomplete: "current-password"
      }, null, _parent));
      _push(`</label><label class="profile-password-field profile-password-field--disabled" data-v-ad5c089b><span class="profile-password-field__label" data-v-ad5c089b>Новый пароль</span>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(newPassword),
        "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
        class: "profile-password-field__control",
        type: "password",
        placeholder: "Введите новый пароль",
        autocomplete: "new-password",
        disabled: ""
      }, null, _parent));
      _push(`</label><label class="profile-password-field profile-password-field--disabled" data-v-ad5c089b><span class="profile-password-field__label profile-password-field__label--empty" data-v-ad5c089b></span>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(repeatedPassword),
        "onUpdate:modelValue": ($event) => isRef(repeatedPassword) ? repeatedPassword.value = $event : null,
        class: "profile-password-field__control",
        type: "password",
        placeholder: "Повторите пароль",
        autocomplete: "new-password",
        disabled: ""
      }, null, _parent));
      _push(`</label><div class="profile-password__actions" data-v-ad5c089b><button type="button" class="profile-password__save" disabled data-v-ad5c089b> Сохранить </button></div></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePasswordSettings.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-ad5c089b"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender$1(_ctx, _push, _parent, _attrs) {
  const _component_AppIcon = __nuxt_component_0$1$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-danger" }, _attrs))} data-v-6e0f5841><h2 class="profile-danger__title" data-v-6e0f5841> Опасная зона </h2><div class="profile-danger__body" data-v-6e0f5841><div class="profile-danger__copy" data-v-6e0f5841><span class="profile-danger__action-title" data-v-6e0f5841>Удалить аккаунт</span><span class="profile-danger__text" data-v-6e0f5841> Все данные и история заказов будут удалены безвозвратно </span></div><button type="button" class="profile-danger__delete" data-v-6e0f5841>`);
  _push(ssrRenderComponent(_component_AppIcon, {
    name: "profile-trash",
    size: "12",
    class: "profile-danger__delete-icon"
  }, null, _parent));
  _push(`<span data-v-6e0f5841>Удалить</span></button></div></section>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileDangerZone.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender$1], ["__scopeId", "data-v-6e0f5841"]]), { __name: "ProfileDangerZone" });
const _sfc_main$1 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  const _component_AppIcon = __nuxt_component_0$1$1;
  _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-save-bar" }, _attrs))} data-v-54504822><p class="profile-save-bar__status" data-v-54504822> Изменения не сохранены </p><div class="profile-save-bar__actions" data-v-54504822><button type="button" class="profile-save-bar__cancel" data-v-54504822> Отмена </button><button type="button" class="profile-save-bar__save" data-v-54504822>`);
  _push(ssrRenderComponent(_component_AppIcon, {
    name: "profile-check",
    size: "10",
    class: "profile-save-bar__save-icon"
  }, null, _parent));
  _push(`<span data-v-54504822>Сохранить изменения</span></button></div></section>`);
}
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileSaveChangesBar.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$1, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-54504822"]]), { __name: "ProfileSaveChangesBar" });
const _sfc_main = {
  __name: "profile",
  __ssrInlineRender: true,
  async setup(__props) {
    let __temp, __restore;
    const { data: profileData, refresh: refreshProfile } = ([__temp, __restore] = withAsyncContext(() => useFetch(
      "/api/profile",
      {
        headers: useRequestHeaders(["cookie"])
      },
      "$AamnZ8eSWa"
      /* nuxt-injected */
    )), __temp = await __temp, __restore(), __temp);
    const user = computed(() => profileData.value?.profile?.user ?? null);
    const organizations = computed(() => profileData.value?.profile?.organizations ?? []);
    const recipients = computed(() => profileData.value?.profile?.recipients ?? []);
    const userName = ref(user.value?.name || "");
    const userPhone = ref(formatCompactPhone(user.value?.phoneNumber || ""));
    const userEmail = ref(user.value?.email || "");
    const isEmailVerified = ref(Boolean(user.value?.emailVerified));
    const additionalContact = ref("");
    const recipientName = ref("");
    const recipientPhone = ref("");
    const isPhoneVerified = ref(Boolean(user.value?.phoneNumberVerified));
    const showRecipient = ref(false);
    const onProfileUpdated = async (updatedUser) => {
      if (updatedUser?.phoneNumber) {
        userPhone.value = formatCompactPhone(updatedUser.phoneNumber);
      }
      if (typeof updatedUser?.phoneNumberVerified === "boolean") {
        isPhoneVerified.value = updatedUser.phoneNumberVerified;
      }
      await refreshProfile();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0$1;
      const _component_ProfileSidebar = __nuxt_component_1;
      const _component_ProfilePersonalData = __nuxt_component_2;
      const _component_ProfileOrganizations = __nuxt_component_3;
      const _component_ProfileNotificationSettings = __nuxt_component_4;
      const _component_ProfilePasswordSettings = __nuxt_component_5;
      const _component_ProfileDangerZone = __nuxt_component_6;
      const _component_ProfileSaveChangesBar = __nuxt_component_7;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-85a2bb3c><div class="profile-page__container" data-v-85a2bb3c>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, { items: [
        { label: "Главная", to: "/" },
        { label: "Личный кабинет", to: "/profile" }
      ] }, null, _parent));
      _push(`<h1 class="profile-page__title" data-v-85a2bb3c> Личный кабинет </h1><div class="profile-page__layout" data-v-85a2bb3c>`);
      _push(ssrRenderComponent(_component_ProfileSidebar, { class: "profile-page__sidebar" }, null, _parent));
      _push(`<div class="profile-page__content" data-v-85a2bb3c>`);
      _push(ssrRenderComponent(_component_ProfilePersonalData, {
        name: unref(userName),
        "onUpdate:name": ($event) => isRef(userName) ? userName.value = $event : null,
        phone: unref(userPhone),
        "onUpdate:phone": ($event) => isRef(userPhone) ? userPhone.value = $event : null,
        email: unref(userEmail),
        "onUpdate:email": ($event) => isRef(userEmail) ? userEmail.value = $event : null,
        "additional-contact": unref(additionalContact),
        "onUpdate:additionalContact": ($event) => isRef(additionalContact) ? additionalContact.value = $event : null,
        "recipient-name": unref(recipientName),
        "onUpdate:recipientName": ($event) => isRef(recipientName) ? recipientName.value = $event : null,
        "recipient-phone": unref(recipientPhone),
        "onUpdate:recipientPhone": ($event) => isRef(recipientPhone) ? recipientPhone.value = $event : null,
        "show-recipient": unref(showRecipient),
        "onUpdate:showRecipient": ($event) => isRef(showRecipient) ? showRecipient.value = $event : null,
        "is-email-verified": unref(isEmailVerified),
        "is-phone-verified": unref(isPhoneVerified),
        recipients: unref(recipients),
        onUpdated: onProfileUpdated
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProfileOrganizations, {
        organizations: unref(organizations),
        onUpdated: unref(refreshProfile)
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProfileNotificationSettings, null, null, _parent));
      _push(ssrRenderComponent(_component_ProfilePasswordSettings, null, null, _parent));
      _push(ssrRenderComponent(_component_ProfileDangerZone, null, null, _parent));
      _push(ssrRenderComponent(_component_ProfileSaveChangesBar, null, null, _parent));
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const profile = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-85a2bb3c"]]);

export { profile as default };
//# sourceMappingURL=profile-DZdmrubS.mjs.map

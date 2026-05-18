import { _ as __nuxt_component_0$2 } from './AppBreadcrumbs-CDv8EEOG.mjs';
import { _ as _export_sfc, b as useRoute, k as useProfileStore, aI as navigateTo, aG as useFavorites, c as __nuxt_component_1$1$1, l as __nuxt_component_0$3, q as _sfc_main$h, a as __nuxt_component_0$3$1, aH as setInterval, n as authClient, e as _sfc_main$u } from './server.mjs';
import { ref, computed, watch, mergeProps, unref, isRef, useModel, withCtx, createVNode, mergeModels, openBlock, createBlock, createTextVNode, createCommentVNode, toDisplayString, nextTick, Fragment, withModifiers, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderComponent, ssrRenderList, ssrRenderClass, ssrInterpolate, ssrIncludeBooleanAttr, ssrRenderAttr } from 'vue/server-renderer';
import { ac as formatCompactPhone, ab as getRussianSecondsWord, b as normalizePhoneDigits } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_0$4 } from './AppSwitch-B6KdDVqJ.mjs';
import { _ as __nuxt_component_0$5 } from './AppButton-D6iSYne7.mjs';
import { a as catalogProducts, _ as __nuxt_component_1$2 } from './catalog-products-PEOD3epg.mjs';
import { storeToRefs } from 'pinia';
import 'vue-router';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
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

const _sfc_main$e = {
  __name: "ProfileSidebar",
  __ssrInlineRender: true,
  props: {
    activeItem: {
      type: String,
      default: "data"
    },
    isEmailVerified: {
      type: Boolean,
      default: false
    }
  },
  emits: ["navigate"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const { totalItems: favoriteTotalItems } = useFavorites();
    useProfileStore();
    const navItems = computed(() => [
      {
        key: "data",
        label: "Данные",
        badge: props.isEmailVerified ? "" : "Подтвердите почту",
        badgeType: "warning"
      },
      {
        key: "favorites",
        label: "Избранное",
        badge: favoriteTotalItems.value ? String(favoriteTotalItems.value) : "Пока ничего :(",
        badgeType: favoriteTotalItems.value ? "favorite-count" : "empty"
      }
    ]);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$1$1;
      _push(`<aside${ssrRenderAttrs(mergeProps({ class: "profile-sidebar app-card" }, _attrs))} data-v-b90a7036><nav class="profile-sidebar__nav" data-v-b90a7036><!--[-->`);
      ssrRenderList(unref(navItems), (item) => {
        _push(`<button type="button" class="${ssrRenderClass([{ "profile-sidebar__link--active": __props.activeItem === item.key }, "profile-sidebar__link"])}" data-v-b90a7036><span class="profile-sidebar__label" data-v-b90a7036>${ssrInterpolate(item.label)}</span>`);
        if (item.badge) {
          _push(`<span class="${ssrRenderClass([`profile-sidebar__badge--${item.badgeType}`, "profile-sidebar__badge"])}" data-v-b90a7036>${ssrInterpolate(item.badge)}</span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</button>`);
      });
      _push(`<!--]--></nav><button type="button" class="profile-sidebar__logout" data-v-b90a7036><span class="profile-sidebar__logout-label" data-v-b90a7036>Выйти</span>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "header-sign-out-authorized",
        class: "profile-sidebar__logout-icon"
      }, null, _parent));
      _push(`</button></aside>`);
    };
  }
};
const _sfc_setup$e = _sfc_main$e.setup;
_sfc_main$e.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileSidebar.vue");
  return _sfc_setup$e ? _sfc_setup$e(props, ctx) : void 0;
};
const __nuxt_component_1$1 = /* @__PURE__ */ _export_sfc(_sfc_main$e, [["__scopeId", "data-v-b90a7036"]]);
const phoneInputId = "profile-phone-edit-phone";
const smsCodeInputId = "profile-phone-edit-code";
const SMS_CODE_LENGTH = 5;
const _sfc_main$d = {
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
          timeout: 4e4,
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
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_AppInput = __nuxt_component_0$3;
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
            _push2(`<section class="auth-entry auth-entry--profile-phone" data-v-e269c041${_scopeId}><header class="auth-entry__header" data-v-e269c041${_scopeId}><div class="auth-entry__title-block" data-v-e269c041${_scopeId}><h2 class="auth-entry__title" data-v-e269c041${_scopeId}> Изменение номера </h2></div><button type="button" class="auth-entry__close" aria-label="Закрыть изменение номера" data-v-e269c041${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "auth-entry__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header><div class="auth-entry__code-fields" data-v-e269c041${_scopeId}>`);
            if (unref(isPhoneConfirmed)) {
              _push2(`<div class="auth-entry__registration-phone auth-entry__registration-phone--confirmed" data-v-e269c041${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field auth-entry__phone-field--confirmed" data-v-e269c041${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-e269c041${_scopeId}> Номер телефона </label>`);
              _push2(ssrRenderComponent(_component_AppInput, {
                id: phoneInputId,
                modelValue: unref(phone),
                "onUpdate:modelValue": ($event) => isRef(phone) ? phone.value = $event : null,
                class: "auth-entry__input auth-entry__input--compact auth-entry__input--phone auth-entry__input--confirmed",
                type: "tel",
                autocomplete: "tel",
                readonly: ""
              }, null, _parent2, _scopeId));
              _push2(`</div><div class="auth-entry__confirmed-badge" data-v-e269c041${_scopeId}> Сохранен </div></div>`);
            } else if (unref(isCodeRequestSent)) {
              _push2(`<!--[--><div class="auth-entry__registration-phone auth-entry__registration-phone--code" data-v-e269c041${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-e269c041${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-e269c041${_scopeId}> Номер телефона </label>`);
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
              _push2(`</div><div class="${ssrRenderClass([{ "auth-entry__sms-code-field--invalid": unref(isSmsCodeInvalid) }, "auth-entry__field auth-entry__field--compact auth-entry__sms-code-field"])}" data-v-e269c041${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", smsCodeInputId)} data-v-e269c041${_scopeId}> Код из СМС </label><span class="auth-entry__sms-code-box" data-v-e269c041${_scopeId}><input${ssrRenderAttr("id", smsCodeInputId)}${ssrRenderAttr("value", unref(smsCode))} class="auth-entry__input auth-entry__input--compact auth-entry__input--sms-code" type="text"${ssrRenderAttr("placeholder", unref(smsCodePlaceholder))} autocomplete="one-time-code" inputmode="numeric"${ssrRenderAttr("maxlength", SMS_CODE_LENGTH)}${ssrRenderAttr("aria-invalid", unref(isSmsCodeInvalid))} data-v-e269c041${_scopeId}>`);
              if (unref(isSmsCodeInvalid)) {
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "reset",
                  size: 16,
                  class: "auth-entry__sms-code-error-icon"
                }, null, _parent2, _scopeId));
              } else {
                _push2(`<!---->`);
              }
              _push2(`</span></div></div><button type="button" class="${ssrRenderClass([{ "auth-entry__resend--active": unref(canResendCode) }, "auth-entry__resend"])}"${ssrIncludeBooleanAttr(!unref(canResendCode)) ? " disabled" : ""} data-v-e269c041${_scopeId}>${ssrInterpolate(unref(resendButtonText))}</button><!--]-->`);
            } else {
              _push2(`<!--[--><div class="auth-entry__registration-phone" data-v-e269c041${_scopeId}><div class="auth-entry__field auth-entry__field--compact auth-entry__phone-field" data-v-e269c041${_scopeId}><label class="auth-entry__label"${ssrRenderAttr("for", phoneInputId)} data-v-e269c041${_scopeId}> Номер телефона </label>`);
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
              _push2(`</div><button type="button" class="auth-entry__code-button"${ssrIncludeBooleanAttr(!unref(canRequestCode) || unref(isCodeRequestPending)) ? " disabled" : ""} data-v-e269c041${_scopeId}>${ssrInterpolate(unref(isCodeRequestPending) ? "Отправляем" : "Получить код")}</button></div><p class="auth-entry__hint" data-v-e269c041${_scopeId}> Отправим вам смс с кодом подтверждения </p><!--]-->`);
            }
            if (unref(codeRequestError) || unref(codeVerifyError)) {
              _push2(`<p class="auth-entry__request-status auth-entry__request-status--error" data-v-e269c041${_scopeId}>${ssrInterpolate(unref(codeRequestError) || unref(codeVerifyError))}</p>`);
            } else if (unref(isCodeRequestSent) && !unref(isPhoneConfirmed)) {
              _push2(`<p class="auth-entry__request-status" data-v-e269c041${_scopeId}> Код отправлен </p>`);
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
const _sfc_setup$d = _sfc_main$d.setup;
_sfc_main$d.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePhoneEditModal.vue");
  return _sfc_setup$d ? _sfc_setup$d(props, ctx) : void 0;
};
const __nuxt_component_0$1 = /* @__PURE__ */ _export_sfc(_sfc_main$d, [["__scopeId", "data-v-e269c041"]]);
const supportEmail$1 = "Info@indigo-mail.ru";
const _sfc_main$c = {
  __name: "ProfileEmailConfirmModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    email: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const isOpen = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_AppIcon = __nuxt_component_1$1$1;
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
            _push2(`<section class="email-confirm-modal" data-v-c7d6d1ab${_scopeId}><header class="email-confirm-modal__header" data-v-c7d6d1ab${_scopeId}><div class="email-confirm-modal__title-block" data-v-c7d6d1ab${_scopeId}><h2 class="email-confirm-modal__title" data-v-c7d6d1ab${_scopeId}> Проверьте почту </h2><div class="email-confirm-modal__text" data-v-c7d6d1ab${_scopeId}><p data-v-c7d6d1ab${_scopeId}> Мы отправили письмо со ссылкой для подтверждения на почту ${ssrInterpolate(__props.email)}. </p><p data-v-c7d6d1ab${_scopeId}> Если вы его не получили,<br data-v-c7d6d1ab${_scopeId}> проверьте папку Спам или<br data-v-c7d6d1ab${_scopeId}> напишите нам <a class="email-confirm-modal__link"${ssrRenderAttr("href", `mailto:${supportEmail$1}`)} target="_blank" rel="noopener noreferrer" data-v-c7d6d1ab${_scopeId}>на ${ssrInterpolate(supportEmail$1)}</a></p></div></div><button type="button" class="email-confirm-modal__close" aria-label="Закрыть подтверждение почты" data-v-c7d6d1ab${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "email-confirm-modal__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header><button type="button" class="email-confirm-modal__button" data-v-c7d6d1ab${_scopeId}> Хорошо </button></section>`);
          } else {
            return [
              createVNode("section", { class: "email-confirm-modal" }, [
                createVNode("header", { class: "email-confirm-modal__header" }, [
                  createVNode("div", { class: "email-confirm-modal__title-block" }, [
                    createVNode("h2", { class: "email-confirm-modal__title" }, " Проверьте почту "),
                    createVNode("div", { class: "email-confirm-modal__text" }, [
                      createVNode("p", null, " Мы отправили письмо со ссылкой для подтверждения на почту " + toDisplayString(__props.email) + ". ", 1),
                      createVNode("p", null, [
                        createTextVNode(" Если вы его не получили,"),
                        createVNode("br"),
                        createTextVNode(" проверьте папку Спам или"),
                        createVNode("br"),
                        createTextVNode(" напишите нам "),
                        createVNode("a", {
                          class: "email-confirm-modal__link",
                          href: `mailto:${supportEmail$1}`,
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }, "на " + toDisplayString(supportEmail$1), 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "email-confirm-modal__close",
                    "aria-label": "Закрыть подтверждение почты",
                    onClick: ($event) => isOpen.value = false
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "close",
                      size: 16,
                      class: "email-confirm-modal__close-icon"
                    })
                  ], 8, ["onClick"])
                ]),
                createVNode("button", {
                  type: "button",
                  class: "email-confirm-modal__button",
                  onClick: ($event) => isOpen.value = false
                }, " Хорошо ", 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$c = _sfc_main$c.setup;
_sfc_main$c.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileEmailConfirmModal.vue");
  return _sfc_setup$c ? _sfc_setup$c(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ _export_sfc(_sfc_main$c, [["__scopeId", "data-v-c7d6d1ab"]]);
const phoneMask = "+7(###)-###-##-##";
const _sfc_main$b = {
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
  setup(__props, { expose: __expose, emit: __emit }) {
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
    const isEmailConfirmModalOpen = ref(false);
    const savedEmail = ref(email.value);
    const isEmailEditing = ref(false);
    const isEmailSaving = ref(false);
    const isEmailConfirmationSending = ref(false);
    const emailConfirmationError = ref("");
    const isEmailModelSyncing = ref(false);
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
    const isEmailDirty = computed(() => email.value.trim() !== savedEmail.value.trim());
    const showEmailActions = computed(() => isEmailEditing.value || isEmailDirty.value);
    function syncSavedEmail(value) {
      isEmailModelSyncing.value = true;
      savedEmail.value = value || "";
      isEmailEditing.value = false;
      nextTick(() => {
        isEmailModelSyncing.value = false;
      });
    }
    const onEmailEdit = () => {
      isEmailEditing.value = true;
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
    watch(email, (value) => {
      if (isEmailModelSyncing.value) {
        return;
      }
      if (value.trim() !== savedEmail.value.trim()) {
        isEmailEditing.value = true;
      }
    });
    watch(
      () => props.isEmailVerified,
      (value) => {
        if (value) {
          isEmailEditing.value = false;
        }
      }
    );
    __expose({
      syncSavedEmail
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProfilePhoneEditModal = __nuxt_component_0$1;
      const _component_ProfileEmailConfirmModal = __nuxt_component_1;
      const _component_AppInput = __nuxt_component_0$3;
      const _component_AppIcon = __nuxt_component_1$1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-personal app-card" }, _attrs))} data-v-037f5a47>`);
      _push(ssrRenderComponent(_component_ProfilePhoneEditModal, {
        modelValue: unref(isPhoneModalOpen),
        "onUpdate:modelValue": ($event) => isRef(isPhoneModalOpen) ? isPhoneModalOpen.value = $event : null,
        "current-phone": phone.value,
        onSaved: onPhoneSaved
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProfileEmailConfirmModal, {
        modelValue: unref(isEmailConfirmModalOpen),
        "onUpdate:modelValue": ($event) => isRef(isEmailConfirmModalOpen) ? isEmailConfirmModalOpen.value = $event : null,
        email: email.value
      }, null, _parent));
      _push(`<h2 class="profile-personal__title" data-v-037f5a47> Данные пользователя </h2><div class="profile-personal__body" data-v-037f5a47><div class="profile-personal__fields" data-v-037f5a47><div class="profile-field" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Имя </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-name",
        modelValue: name.value,
        "onUpdate:modelValue": ($event) => name.value = $event,
        class: "profile-field__control",
        type: "text",
        autocomplete: "name"
      }, null, _parent));
      _push(`</div><div class="profile-field profile-field--phone" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Номер телефона </label>`);
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
            _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать номер телефона" data-v-037f5a47${_scopeId}>`);
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
      _push(`</div><div class="profile-personal__email-row" data-v-037f5a47><div class="profile-field" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Электронная почта </label>`);
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
            _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать почту" data-v-037f5a47${_scopeId}>`);
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
                onClick: onEmailEdit
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
      if (unref(showEmailActions)) {
        _push(`<div class="profile-personal__email-actions" data-v-037f5a47><button type="button" class="profile-personal__email-save"${ssrIncludeBooleanAttr(unref(isEmailSaving)) ? " disabled" : ""} data-v-037f5a47> Сохранить </button><button type="button" class="profile-personal__email-cancel"${ssrIncludeBooleanAttr(unref(isEmailSaving)) ? " disabled" : ""} data-v-037f5a47> Отменить </button></div>`);
      } else if (email.value && !__props.isEmailVerified) {
        _push(`<button type="button" class="profile-personal__confirm"${ssrIncludeBooleanAttr(unref(isEmailConfirmationSending)) ? " disabled" : ""} data-v-037f5a47>${ssrInterpolate(unref(isEmailConfirmationSending) ? "Отправляем" : "Подтвердить")}</button>`);
      } else if (email.value && __props.isEmailVerified) {
        _push(`<span class="profile-personal__verified" data-v-037f5a47> Подтверждена </span>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(emailConfirmationError)) {
        _push(`<p class="profile-personal__email-error" data-v-037f5a47>${ssrInterpolate(unref(emailConfirmationError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="profile-field" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Дополнительный контакт </label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        id: "profile-additional-contact",
        modelValue: additionalContact.value,
        "onUpdate:modelValue": ($event) => additionalContact.value = $event,
        class: "profile-field__control",
        type: "text",
        placeholder: "Телеграм, ВКонтакте...",
        autocomplete: "off"
      }, null, _parent));
      _push(`</div></div><div class="profile-recipient" data-v-037f5a47><div class="profile-recipient__header" data-v-037f5a47><h3 class="profile-recipient__title" data-v-037f5a47> Получатель </h3><p class="profile-recipient__subtitle" data-v-037f5a47> Человек, который получит заказ </p></div>`);
      if (unref(recipientForms).length) {
        _push(`<div class="profile-recipient__forms" data-v-037f5a47><!--[-->`);
        ssrRenderList(unref(recipientForms), (recipient) => {
          _push(`<article class="profile-recipient-form" data-v-037f5a47><div class="profile-field" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Имя </label>`);
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
                _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать имя получателя" data-v-037f5a47${_scopeId}>`);
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
          _push(`</div><div class="profile-field profile-field--phone" data-v-037f5a47><label class="profile-field__label" data-v-037f5a47> Номер телефона </label>`);
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
                _push2(`<button type="button" class="profile-field__icon-button" aria-label="Редактировать номер получателя" data-v-037f5a47${_scopeId}>`);
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
          _push(`</div><div class="profile-recipient-form__actions" data-v-037f5a47><button type="button" class="profile-recipient-form__remove" data-v-037f5a47>`);
          _push(ssrRenderComponent(_component_AppIcon, {
            name: "profile-trash",
            size: "12",
            class: "profile-recipient-form__action-icon"
          }, null, _parent));
          _push(`<span data-v-037f5a47>Удалить</span></button>`);
          if (canSaveRecipient(recipient)) {
            _push(`<button type="button" class="profile-recipient-form__save" data-v-037f5a47> Сохранить </button>`);
          } else if (recipient.isSaveNoticeVisible) {
            _push(`<span class="profile-recipient-form__saved" data-v-037f5a47> Сохранен </span>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="profile-recipient__toggle" data-v-037f5a47><div class="profile-recipient__toggle-copy" data-v-037f5a47><span class="profile-recipient__toggle-title" data-v-037f5a47>Добавить получателя</span><span class="profile-recipient__toggle-text" data-v-037f5a47> Добавьте людей, которые могут получить заказ за вас </span></div><button type="button" class="profile-recipient__add" data-v-037f5a47>`);
      _push(ssrRenderComponent(_component_AppIcon, {
        name: "profile-plus",
        size: "10",
        class: "profile-recipient__button-icon"
      }, null, _parent));
      _push(`<span data-v-037f5a47>Добавить</span></button></div></div></div></section>`);
    };
  }
};
const _sfc_setup$b = _sfc_main$b.setup;
_sfc_main$b.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePersonalData.vue");
  return _sfc_setup$b ? _sfc_setup$b(props, ctx) : void 0;
};
const __nuxt_component_2$1 = /* @__PURE__ */ _export_sfc(_sfc_main$b, [["__scopeId", "data-v-037f5a47"]]);
const ORGANIZATION_SUGGEST_DELAY = 350;
const _sfc_main$a = {
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
      return props.organizations.map((organization, index2) => ({
        ...organization,
        active: hasExplicitActive ? Boolean(organization.isActive) : index2 === 0,
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
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_AppInput = __nuxt_component_0$3;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-organizations app-card" }, _attrs))} data-v-05744d24><h2 class="profile-organizations__title" data-v-05744d24> Организации </h2><div class="profile-organizations__body" data-v-05744d24>`);
      if (unref(displayOrganizations).length) {
        _push(`<div class="profile-organizations__list" data-v-05744d24><!--[-->`);
        ssrRenderList(unref(displayOrganizations), (organization) => {
          _push(`<article class="${ssrRenderClass([{ "profile-organization--active": organization.active }, "profile-organization"])}" data-v-05744d24><div class="profile-organization__top" data-v-05744d24><span class="profile-organization__radio-wrap" data-v-05744d24><button type="button" class="${ssrRenderClass([{ "profile-organization__radio--active": organization.active }, "profile-organization__radio"])}"${ssrIncludeBooleanAttr(unref(pendingActiveId) === organization.id) ? " disabled" : ""}${ssrRenderAttr("aria-pressed", organization.active)}${ssrRenderAttr("aria-label", organization.active ? "Активная организация" : "Сделать организацию активной")} data-v-05744d24></button></span><button type="button" class="profile-organization__delete"${ssrIncludeBooleanAttr(unref(pendingDeleteId) === organization.id) ? " disabled" : ""} data-v-05744d24>${ssrInterpolate(unref(pendingDeleteId) === organization.id ? "Удаляем" : "Удалить")}</button></div><div class="profile-organization__content" data-v-05744d24><h3 class="profile-organization__name" data-v-05744d24>${ssrInterpolate(organization.name)}</h3>`);
          if (organization.innLabel) {
            _push(`<p class="profile-organization__meta" data-v-05744d24>${ssrInterpolate(organization.innLabel)}</p>`);
          } else {
            _push(`<!---->`);
          }
          if (organization.address) {
            _push(`<p class="profile-organization__meta" data-v-05744d24>${ssrInterpolate(organization.address)}</p>`);
          } else {
            _push(`<!---->`);
          }
          _push(`</div></article>`);
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="profile-organizations__add-row" data-v-05744d24><div class="profile-organizations__add-copy" data-v-05744d24><span class="profile-organizations__add-title" data-v-05744d24>Добавить организацию</span><span class="profile-organizations__add-text" data-v-05744d24> Чтобы платить безналом и пользоваться ЭДО </span></div><div class="profile-organizations__add-control" data-v-05744d24>`);
      if (!unref(isAddMode)) {
        _push(`<button type="button" class="profile-organizations__add" data-v-05744d24>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "profile-plus",
          size: "10",
          class: "profile-organizations__add-icon"
        }, null, _parent));
        _push(`<span data-v-05744d24>Добавить</span></button>`);
      } else {
        _push(`<div class="profile-organizations__add-input-wrap" data-v-05744d24>`);
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
          _push(`<div class="profile-organizations__options" data-v-05744d24>`);
          if (unref(isOrganizationSuggestPending)) {
            _push(`<p class="profile-organizations__status" data-v-05744d24> Ищем организацию </p>`);
          } else if (unref(organizationSuggestError)) {
            _push(`<p class="profile-organizations__status profile-organizations__status--error" data-v-05744d24>${ssrInterpolate(unref(organizationSuggestError))}</p>`);
          } else {
            _push(`<!--[-->`);
            ssrRenderList(unref(organizationSuggestions), (suggestion) => {
              _push(`<button type="button" class="profile-organizations__option" data-v-05744d24><span class="profile-organizations__option-name" data-v-05744d24>${ssrInterpolate(suggestion.name)}</span>`);
              if (suggestion.inn) {
                _push(`<span class="profile-organizations__option-meta" data-v-05744d24><span class="profile-organizations__option-prefix" data-v-05744d24>ИНН</span> ${ssrInterpolate(suggestion.inn)}</span>`);
              } else {
                _push(`<!---->`);
              }
              if (suggestion.address) {
                _push(`<span class="profile-organizations__option-meta" data-v-05744d24>${ssrInterpolate(suggestion.address)}</span>`);
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
const _sfc_setup$a = _sfc_main$a.setup;
_sfc_main$a.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileOrganizations.vue");
  return _sfc_setup$a ? _sfc_setup$a(props, ctx) : void 0;
};
const __nuxt_component_3$1 = /* @__PURE__ */ _export_sfc(_sfc_main$a, [["__scopeId", "data-v-05744d24"]]);
const _sfc_main$9 = {
  __name: "ProfileNotificationSettings",
  __ssrInlineRender: true,
  setup(__props) {
    const emailNotifications = ref(false);
    const smsNotifications = ref(false);
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppSwitch = __nuxt_component_0$4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-notifications app-card" }, _attrs))} data-v-bee4ae71><h2 class="profile-notifications__title" data-v-bee4ae71> Настройка уведомлений </h2><div class="profile-notifications__body" data-v-bee4ae71><div class="profile-notifications__items" data-v-bee4ae71><div class="profile-notification" data-v-bee4ae71><div class="profile-notification__copy" data-v-bee4ae71><span class="profile-notification__title" data-v-bee4ae71>Email-уведомления</span><span class="profile-notification__text" data-v-bee4ae71> Будем сообщать<br data-v-bee4ae71> об изменении статуса заказа </span></div>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(emailNotifications),
        "onUpdate:modelValue": ($event) => isRef(emailNotifications) ? emailNotifications.value = $event : null,
        class: "profile-notification__switch",
        disabled: ""
      }, null, _parent));
      _push(`</div><div class="profile-notification" data-v-bee4ae71><div class="profile-notification__copy" data-v-bee4ae71><span class="profile-notification__title" data-v-bee4ae71>СМС-уведомления</span><span class="profile-notification__text" data-v-bee4ae71> Будем сообщать<br data-v-bee4ae71> о готовности заказа </span></div>`);
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
const _sfc_setup$9 = _sfc_main$9.setup;
_sfc_main$9.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileNotificationSettings.vue");
  return _sfc_setup$9 ? _sfc_setup$9(props, ctx) : void 0;
};
const __nuxt_component_4$1 = /* @__PURE__ */ _export_sfc(_sfc_main$9, [["__scopeId", "data-v-bee4ae71"]]);
const supportEmail = "Info@indigo-mail.ru";
const _sfc_main$8 = {
  __name: "ProfilePasswordRecoverySentModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    email: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: ["update:modelValue"],
  setup(__props) {
    const isOpen = useModel(__props, "modelValue");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_AppButton = __nuxt_component_0$5;
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
            _push2(`<section class="password-recovery-sent-modal" data-v-6ce011a8${_scopeId}><header class="password-recovery-sent-modal__header" data-v-6ce011a8${_scopeId}><div class="password-recovery-sent-modal__title-block" data-v-6ce011a8${_scopeId}><h2 class="password-recovery-sent-modal__title" data-v-6ce011a8${_scopeId}> Проверьте почту </h2><div class="password-recovery-sent-modal__text" data-v-6ce011a8${_scopeId}><p data-v-6ce011a8${_scopeId}> Мы отправили письмо со ссылкой для сброса пароля на почту ${ssrInterpolate(__props.email)}. </p><p data-v-6ce011a8${_scopeId}> Если вы его не получили,<br data-v-6ce011a8${_scopeId}> проверьте папку Спам или<br data-v-6ce011a8${_scopeId}> напишите нам <a class="password-recovery-sent-modal__link"${ssrRenderAttr("href", `mailto:${supportEmail}`)} target="_blank" rel="noopener noreferrer" data-v-6ce011a8${_scopeId}>на ${ssrInterpolate(supportEmail)}</a></p></div></div><button type="button" class="password-recovery-sent-modal__close" aria-label="Закрыть уведомление о восстановлении пароля" data-v-6ce011a8${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "password-recovery-sent-modal__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header>`);
            _push2(ssrRenderComponent(_component_AppButton, {
              onClick: ($event) => isOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Хорошо `);
                } else {
                  return [
                    createTextVNode(" Хорошо ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "password-recovery-sent-modal" }, [
                createVNode("header", { class: "password-recovery-sent-modal__header" }, [
                  createVNode("div", { class: "password-recovery-sent-modal__title-block" }, [
                    createVNode("h2", { class: "password-recovery-sent-modal__title" }, " Проверьте почту "),
                    createVNode("div", { class: "password-recovery-sent-modal__text" }, [
                      createVNode("p", null, " Мы отправили письмо со ссылкой для сброса пароля на почту " + toDisplayString(__props.email) + ". ", 1),
                      createVNode("p", null, [
                        createTextVNode(" Если вы его не получили,"),
                        createVNode("br"),
                        createTextVNode(" проверьте папку Спам или"),
                        createVNode("br"),
                        createTextVNode(" напишите нам "),
                        createVNode("a", {
                          class: "password-recovery-sent-modal__link",
                          href: `mailto:${supportEmail}`,
                          target: "_blank",
                          rel: "noopener noreferrer"
                        }, "на " + toDisplayString(supportEmail), 8, ["href"])
                      ])
                    ])
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "password-recovery-sent-modal__close",
                    "aria-label": "Закрыть уведомление о восстановлении пароля",
                    onClick: ($event) => isOpen.value = false
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "close",
                      size: 16,
                      class: "password-recovery-sent-modal__close-icon"
                    })
                  ], 8, ["onClick"])
                ]),
                createVNode(_component_AppButton, {
                  onClick: ($event) => isOpen.value = false
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Хорошо ")
                  ]),
                  _: 1
                }, 8, ["onClick"])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$8 = _sfc_main$8.setup;
_sfc_main$8.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePasswordRecoverySentModal.vue");
  return _sfc_setup$8 ? _sfc_setup$8(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$8, [["__scopeId", "data-v-6ce011a8"]]);
const _sfc_main$7 = {
  __name: "ProfilePasswordResetModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    token: {
      type: String,
      default: ""
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["saved", "close"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const props = __props;
    const emit = __emit;
    const password = ref("");
    const repeatedPassword = ref("");
    const submitted = ref(false);
    const pending = ref(false);
    const errorMessage = ref("");
    const isPasswordVisible = ref(false);
    const isRepeatedPasswordVisible = ref(false);
    const passwordType = computed(() => isPasswordVisible.value ? "text" : "password");
    const repeatedPasswordType = computed(() => isRepeatedPasswordVisible.value ? "text" : "password");
    const isPasswordMatchSuccess = computed(() => Boolean(password.value) && Boolean(repeatedPassword.value) && password.value === repeatedPassword.value);
    const passwordError = computed(() => submitted.value && !password.value.trim());
    const repeatedPasswordError = computed(() => {
      if (!submitted.value) return false;
      return !repeatedPassword.value.trim() || password.value !== repeatedPassword.value;
    });
    const passwordDescription = computed(() => passwordError.value ? "Заполните поле" : "");
    const repeatedPasswordDescription = computed(() => {
      if (!repeatedPasswordError.value) return "";
      return !repeatedPassword.value.trim() ? "Заполните поле" : "Пароли не совпадают :(\nПроверьте их, и попробуйте еще раз";
    });
    function resetState() {
      password.value = "";
      repeatedPassword.value = "";
      submitted.value = false;
      pending.value = false;
      errorMessage.value = "";
      isPasswordVisible.value = false;
      isRepeatedPasswordVisible.value = false;
    }
    function closeModal() {
      isOpen.value = false;
      emit("close");
    }
    function getResetErrorMessage(error) {
      const message = error?.message || error?.data?.message || error?.statusMessage || "";
      const code = error?.code || error?.data?.code || error?.status || "";
      const errorText = `${code} ${message}`;
      if (/password.*too.*short|too.*short|PASSWORD_TOO_SHORT/i.test(errorText)) {
        return "Пароль слишком короткий";
      }
      if (/invalid.*token|expired|INVALID_TOKEN/i.test(errorText)) {
        return "Ссылка недействительна или устарела";
      }
      if (/network|fetch|failed to fetch/i.test(errorText)) {
        return "Ошибка соединения. Попробуйте ещё раз";
      }
      return "Не удалось сохранить пароль";
    }
    async function savePassword() {
      if (pending.value) {
        return;
      }
      submitted.value = true;
      errorMessage.value = "";
      if (passwordError.value || repeatedPasswordError.value) {
        return;
      }
      pending.value = true;
      try {
        const payload = {
          newPassword: password.value,
          token: props.token
        };
        const result = typeof authClient.resetPassword === "function" ? await authClient.resetPassword(payload) : await $fetch("/api/auth/reset-password", {
          method: "POST",
          body: payload
        });
        if (result?.error) {
          throw result.error;
        }
        emit("saved");
        isOpen.value = false;
      } catch (error) {
        errorMessage.value = getResetErrorMessage(error);
      } finally {
        pending.value = false;
      }
    }
    watch(isOpen, (value) => {
      if (!value) {
        resetState();
      }
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_AppInput = __nuxt_component_0$3;
      const _component_AppButton = __nuxt_component_0$5;
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
            _push2(`<form class="password-reset-modal" data-v-e521c523${_scopeId}><header class="password-reset-modal__header" data-v-e521c523${_scopeId}><div class="password-reset-modal__title-block" data-v-e521c523${_scopeId}><h2 class="password-reset-modal__title" data-v-e521c523${_scopeId}> Восстановление<br data-v-e521c523${_scopeId}> пароля </h2><p class="password-reset-modal__subtitle" data-v-e521c523${_scopeId}> Введите новый пароль для учётной записи </p></div><button type="button" class="password-reset-modal__close" aria-label="Закрыть восстановление пароля" data-v-e521c523${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "password-reset-modal__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header><div class="password-reset-modal__fields" data-v-e521c523${_scopeId}><div class="password-reset-modal__field" data-v-e521c523${_scopeId}><label class="${ssrRenderClass([{ "password-reset-modal__label--success": unref(isPasswordMatchSuccess) }, "password-reset-modal__label"])}" for="profile-password-reset-password" data-v-e521c523${_scopeId}> Пароль </label>`);
            _push2(ssrRenderComponent(_component_AppInput, {
              id: "profile-password-reset-password",
              modelValue: unref(password),
              "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
              class: ["password-reset-modal__input", {
                "password-reset-modal__input--error": unref(passwordError),
                "password-reset-modal__input--success": unref(isPasswordMatchSuccess)
              }],
              type: unref(passwordType),
              placeholder: "Введите пароль",
              autocomplete: "new-password",
              disabled: unref(pending),
              description: unref(passwordDescription)
            }, {
              suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(isPasswordMatchSuccess)) {
                    _push3(`<button type="button" class="password-reset-modal__password-toggle"${ssrRenderAttr("aria-label", unref(isPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-e521c523${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_AppIcon, {
                      name: unref(isPasswordVisible) ? "password-hide" : "password-show",
                      size: 16,
                      class: "password-reset-modal__password-toggle-icon"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(ssrRenderComponent(_component_AppIcon, {
                      name: "check",
                      width: 9.75,
                      height: 7.55,
                      class: "password-reset-modal__check-icon"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    !unref(isPasswordMatchSuccess) ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "password-reset-modal__password-toggle",
                      "aria-label": unref(isPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                      onClick: ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                    }, [
                      createVNode(_component_AppIcon, {
                        name: unref(isPasswordVisible) ? "password-hide" : "password-show",
                        size: 16,
                        class: "password-reset-modal__password-toggle-icon"
                      }, null, 8, ["name"])
                    ], 8, ["aria-label", "onClick"])) : (openBlock(), createBlock(_component_AppIcon, {
                      key: 1,
                      name: "check",
                      width: 9.75,
                      height: 7.55,
                      class: "password-reset-modal__check-icon"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            _push2(ssrRenderComponent(_component_AppInput, {
              id: "profile-password-reset-repeat",
              modelValue: unref(repeatedPassword),
              "onUpdate:modelValue": ($event) => isRef(repeatedPassword) ? repeatedPassword.value = $event : null,
              class: ["password-reset-modal__input", {
                "password-reset-modal__input--error": unref(repeatedPasswordError),
                "password-reset-modal__input--success": unref(isPasswordMatchSuccess)
              }],
              type: unref(repeatedPasswordType),
              placeholder: "Повторите пароль",
              autocomplete: "new-password",
              disabled: unref(pending),
              description: unref(repeatedPasswordDescription)
            }, {
              suffix: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(isPasswordMatchSuccess)) {
                    _push3(`<button type="button" class="password-reset-modal__password-toggle"${ssrRenderAttr("aria-label", unref(isRepeatedPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-e521c523${_scopeId2}>`);
                    _push3(ssrRenderComponent(_component_AppIcon, {
                      name: unref(isRepeatedPasswordVisible) ? "password-hide" : "password-show",
                      size: 16,
                      class: "password-reset-modal__password-toggle-icon"
                    }, null, _parent3, _scopeId2));
                    _push3(`</button>`);
                  } else {
                    _push3(ssrRenderComponent(_component_AppIcon, {
                      name: "check",
                      width: 9.75,
                      height: 7.55,
                      class: "password-reset-modal__check-icon"
                    }, null, _parent3, _scopeId2));
                  }
                } else {
                  return [
                    !unref(isPasswordMatchSuccess) ? (openBlock(), createBlock("button", {
                      key: 0,
                      type: "button",
                      class: "password-reset-modal__password-toggle",
                      "aria-label": unref(isRepeatedPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                      onClick: ($event) => isRepeatedPasswordVisible.value = !unref(isRepeatedPasswordVisible)
                    }, [
                      createVNode(_component_AppIcon, {
                        name: unref(isRepeatedPasswordVisible) ? "password-hide" : "password-show",
                        size: 16,
                        class: "password-reset-modal__password-toggle-icon"
                      }, null, 8, ["name"])
                    ], 8, ["aria-label", "onClick"])) : (openBlock(), createBlock(_component_AppIcon, {
                      key: 1,
                      name: "check",
                      width: 9.75,
                      height: 7.55,
                      class: "password-reset-modal__check-icon"
                    }))
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div>`);
            if (unref(errorMessage)) {
              _push2(`<p class="password-reset-modal__error" data-v-e521c523${_scopeId}>${ssrInterpolate(unref(errorMessage))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(ssrRenderComponent(_component_AppButton, {
              type: "submit",
              disabled: unref(pending)
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(`${ssrInterpolate(unref(pending) ? "Сохраняем" : "Сохранить")}`);
                } else {
                  return [
                    createTextVNode(toDisplayString(unref(pending) ? "Сохраняем" : "Сохранить"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</form>`);
          } else {
            return [
              createVNode("form", {
                class: "password-reset-modal",
                onSubmit: withModifiers(savePassword, ["prevent"])
              }, [
                createVNode("header", { class: "password-reset-modal__header" }, [
                  createVNode("div", { class: "password-reset-modal__title-block" }, [
                    createVNode("h2", { class: "password-reset-modal__title" }, [
                      createTextVNode(" Восстановление"),
                      createVNode("br"),
                      createTextVNode(" пароля ")
                    ]),
                    createVNode("p", { class: "password-reset-modal__subtitle" }, " Введите новый пароль для учётной записи ")
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "password-reset-modal__close",
                    "aria-label": "Закрыть восстановление пароля",
                    onClick: closeModal
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "close",
                      size: 16,
                      class: "password-reset-modal__close-icon"
                    })
                  ])
                ]),
                createVNode("div", { class: "password-reset-modal__fields" }, [
                  createVNode("div", { class: "password-reset-modal__field" }, [
                    createVNode("label", {
                      class: ["password-reset-modal__label", { "password-reset-modal__label--success": unref(isPasswordMatchSuccess) }],
                      for: "profile-password-reset-password"
                    }, " Пароль ", 2),
                    createVNode(_component_AppInput, {
                      id: "profile-password-reset-password",
                      modelValue: unref(password),
                      "onUpdate:modelValue": ($event) => isRef(password) ? password.value = $event : null,
                      class: ["password-reset-modal__input", {
                        "password-reset-modal__input--error": unref(passwordError),
                        "password-reset-modal__input--success": unref(isPasswordMatchSuccess)
                      }],
                      type: unref(passwordType),
                      placeholder: "Введите пароль",
                      autocomplete: "new-password",
                      disabled: unref(pending),
                      description: unref(passwordDescription)
                    }, {
                      suffix: withCtx(() => [
                        !unref(isPasswordMatchSuccess) ? (openBlock(), createBlock("button", {
                          key: 0,
                          type: "button",
                          class: "password-reset-modal__password-toggle",
                          "aria-label": unref(isPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                          onClick: ($event) => isPasswordVisible.value = !unref(isPasswordVisible)
                        }, [
                          createVNode(_component_AppIcon, {
                            name: unref(isPasswordVisible) ? "password-hide" : "password-show",
                            size: 16,
                            class: "password-reset-modal__password-toggle-icon"
                          }, null, 8, ["name"])
                        ], 8, ["aria-label", "onClick"])) : (openBlock(), createBlock(_component_AppIcon, {
                          key: 1,
                          name: "check",
                          width: 9.75,
                          height: 7.55,
                          class: "password-reset-modal__check-icon"
                        }))
                      ]),
                      _: 1
                    }, 8, ["modelValue", "onUpdate:modelValue", "class", "type", "disabled", "description"])
                  ]),
                  createVNode(_component_AppInput, {
                    id: "profile-password-reset-repeat",
                    modelValue: unref(repeatedPassword),
                    "onUpdate:modelValue": ($event) => isRef(repeatedPassword) ? repeatedPassword.value = $event : null,
                    class: ["password-reset-modal__input", {
                      "password-reset-modal__input--error": unref(repeatedPasswordError),
                      "password-reset-modal__input--success": unref(isPasswordMatchSuccess)
                    }],
                    type: unref(repeatedPasswordType),
                    placeholder: "Повторите пароль",
                    autocomplete: "new-password",
                    disabled: unref(pending),
                    description: unref(repeatedPasswordDescription)
                  }, {
                    suffix: withCtx(() => [
                      !unref(isPasswordMatchSuccess) ? (openBlock(), createBlock("button", {
                        key: 0,
                        type: "button",
                        class: "password-reset-modal__password-toggle",
                        "aria-label": unref(isRepeatedPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                        onClick: ($event) => isRepeatedPasswordVisible.value = !unref(isRepeatedPasswordVisible)
                      }, [
                        createVNode(_component_AppIcon, {
                          name: unref(isRepeatedPasswordVisible) ? "password-hide" : "password-show",
                          size: 16,
                          class: "password-reset-modal__password-toggle-icon"
                        }, null, 8, ["name"])
                      ], 8, ["aria-label", "onClick"])) : (openBlock(), createBlock(_component_AppIcon, {
                        key: 1,
                        name: "check",
                        width: 9.75,
                        height: 7.55,
                        class: "password-reset-modal__check-icon"
                      }))
                    ]),
                    _: 1
                  }, 8, ["modelValue", "onUpdate:modelValue", "class", "type", "disabled", "description"])
                ]),
                unref(errorMessage) ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "password-reset-modal__error"
                }, toDisplayString(unref(errorMessage)), 1)) : createCommentVNode("", true),
                createVNode(_component_AppButton, {
                  type: "submit",
                  disabled: unref(pending)
                }, {
                  default: withCtx(() => [
                    createTextVNode(toDisplayString(unref(pending) ? "Сохраняем" : "Сохранить"), 1)
                  ]),
                  _: 1
                }, 8, ["disabled"])
              ], 32)
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
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePasswordResetModal.vue");
  return _sfc_setup$7 ? _sfc_setup$7(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ _export_sfc(_sfc_main$7, [["__scopeId", "data-v-e521c523"]]);
const _sfc_main$6 = {
  __name: "ProfilePasswordResetSuccessModal",
  __ssrInlineRender: true,
  props: {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  },
  emits: ["update:modelValue"],
  setup(__props) {
    const isOpen = useModel(__props, "modelValue");
    function closeModal() {
      isOpen.value = false;
    }
    function goShopping() {
      isOpen.value = false;
      navigateTo("/catalog");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UModal = _sfc_main$h;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_AppButton = __nuxt_component_0$5;
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
            _push2(`<section class="password-reset-success-modal" data-v-ddcc7a47${_scopeId}><button type="button" class="password-reset-success-modal__close" aria-label="Закрыть сообщение об успешном сохранении пароля" data-v-ddcc7a47${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "password-reset-success-modal__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button><div class="password-reset-success-modal__content" data-v-ddcc7a47${_scopeId}><div class="password-reset-success-modal__icon" aria-hidden="true" data-v-ddcc7a47${_scopeId}></div><div class="password-reset-success-modal__text-block" data-v-ddcc7a47${_scopeId}><h2 class="password-reset-success-modal__title" data-v-ddcc7a47${_scopeId}> Ура, мы сохранили<br data-v-ddcc7a47${_scopeId}> новый пароль! </h2><p class="password-reset-success-modal__text" data-v-ddcc7a47${_scopeId}> Теперь самое время отправиться<br data-v-ddcc7a47${_scopeId}> за покупками! </p></div></div>`);
            _push2(ssrRenderComponent(_component_AppButton, {
              size: "m",
              onClick: goShopping
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` К покупкам `);
                } else {
                  return [
                    createTextVNode(" К покупкам ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</section>`);
          } else {
            return [
              createVNode("section", { class: "password-reset-success-modal" }, [
                createVNode("button", {
                  type: "button",
                  class: "password-reset-success-modal__close",
                  "aria-label": "Закрыть сообщение об успешном сохранении пароля",
                  onClick: closeModal
                }, [
                  createVNode(_component_AppIcon, {
                    name: "close",
                    size: 16,
                    class: "password-reset-success-modal__close-icon"
                  })
                ]),
                createVNode("div", { class: "password-reset-success-modal__content" }, [
                  createVNode("div", {
                    class: "password-reset-success-modal__icon",
                    "aria-hidden": "true"
                  }),
                  createVNode("div", { class: "password-reset-success-modal__text-block" }, [
                    createVNode("h2", { class: "password-reset-success-modal__title" }, [
                      createTextVNode(" Ура, мы сохранили"),
                      createVNode("br"),
                      createTextVNode(" новый пароль! ")
                    ]),
                    createVNode("p", { class: "password-reset-success-modal__text" }, [
                      createTextVNode(" Теперь самое время отправиться"),
                      createVNode("br"),
                      createTextVNode(" за покупками! ")
                    ])
                  ])
                ]),
                createVNode(_component_AppButton, {
                  size: "m",
                  onClick: goShopping
                }, {
                  default: withCtx(() => [
                    createTextVNode(" К покупкам ")
                  ]),
                  _: 1
                })
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePasswordResetSuccessModal.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$6, [["__scopeId", "data-v-ddcc7a47"]]);
const _sfc_main$5 = {
  __name: "ProfilePasswordSettings",
  __ssrInlineRender: true,
  props: {
    email: {
      type: String,
      default: ""
    },
    resetToken: {
      type: String,
      default: ""
    }
  },
  emits: ["reset-token-handled"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const isChangingPassword = ref(false);
    const currentPassword = ref("");
    const newPassword = ref("");
    const submittedPasswordChange = ref(false);
    const passwordChangePending = ref(false);
    const passwordChangeError = ref("");
    const currentPasswordServerError = ref("");
    const newPasswordServerError = ref("");
    const passwordChangeMessage = ref("");
    const isCurrentPasswordVisible = ref(false);
    const isNewPasswordVisible = ref(false);
    const arePasswordFieldsReadonly = ref(false);
    const isPasswordRecoveryPending = ref(false);
    const isPasswordRecoverySentOpen = ref(false);
    const passwordRecoveryError = ref("");
    const isPasswordResetOpen = ref(false);
    const isPasswordResetSuccessOpen = ref(false);
    const currentPasswordError = computed(() => Boolean(currentPasswordServerError.value) || submittedPasswordChange.value && !currentPassword.value.trim());
    const newPasswordError = computed(() => Boolean(newPasswordServerError.value) || submittedPasswordChange.value && !newPassword.value.trim());
    const currentPasswordDescription = computed(() => currentPasswordServerError.value || (submittedPasswordChange.value && !currentPassword.value.trim() ? "Заполните поле" : ""));
    const newPasswordDescription = computed(() => newPasswordServerError.value || (submittedPasswordChange.value && !newPassword.value.trim() ? "Заполните поле" : ""));
    const currentPasswordInputType = computed(() => isCurrentPasswordVisible.value ? "text" : "password");
    const newPasswordInputType = computed(() => isNewPasswordVisible.value ? "text" : "password");
    const normalizedEmail = computed(() => props.email.trim().toLowerCase());
    watch(
      () => props.resetToken,
      (token) => {
        isPasswordResetOpen.value = Boolean(token);
      },
      { immediate: true }
    );
    function unlockPasswordFields() {
      arePasswordFieldsReadonly.value = false;
    }
    function clearCurrentPassword() {
      currentPassword.value = "";
      currentPasswordServerError.value = "";
      passwordChangeError.value = "";
    }
    function clearNewPassword() {
      newPassword.value = "";
      newPasswordServerError.value = "";
      passwordChangeError.value = "";
    }
    function handlePasswordResetClose() {
      emit("reset-token-handled");
    }
    function handlePasswordResetSaved() {
      passwordChangeMessage.value = "Сохранено";
      isPasswordResetSuccessOpen.value = true;
      emit("reset-token-handled");
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0$3;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_ProfilePasswordRecoverySentModal = __nuxt_component_2;
      const _component_ProfilePasswordResetModal = __nuxt_component_3;
      const _component_ProfilePasswordResetSuccessModal = __nuxt_component_4;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-password app-card" }, _attrs))} data-v-4e4d6ef9><h2 class="profile-password__title" data-v-4e4d6ef9> Пароль </h2><div class="profile-password__content" data-v-4e4d6ef9>`);
      if (unref(isChangingPassword)) {
        _push(`<div class="profile-password-change" data-v-4e4d6ef9><div class="profile-password-change__field-group" data-v-4e4d6ef9><div class="profile-password-row__label-wrap" data-v-4e4d6ef9><span class="profile-password-row__label" data-v-4e4d6ef9>Изменение пароля</span></div>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(currentPassword),
          "onUpdate:modelValue": ($event) => isRef(currentPassword) ? currentPassword.value = $event : null,
          class: ["profile-password-change__input", { "profile-password-change__input--error": unref(currentPasswordError) }],
          type: unref(currentPasswordInputType),
          placeholder: "Текущий пароль",
          autocomplete: "off",
          readonly: unref(arePasswordFieldsReadonly),
          disabled: unref(passwordChangePending),
          description: unref(currentPasswordDescription),
          onFocus: unlockPasswordFields
        }, {
          suffix: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(currentPasswordError) && unref(currentPassword)) {
                _push2(`<button type="button" class="profile-password-change__password-toggle profile-password-change__password-toggle--clear" aria-label="Очистить текущий пароль" data-v-4e4d6ef9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "reset",
                  size: 16,
                  class: "profile-password-change__password-toggle-icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<button type="button" class="profile-password-change__password-toggle"${ssrRenderAttr("aria-label", unref(isCurrentPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-4e4d6ef9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: unref(isCurrentPasswordVisible) ? "password-hide" : "password-show",
                  size: 16,
                  class: "profile-password-change__password-toggle-icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              }
            } else {
              return [
                unref(currentPasswordError) && unref(currentPassword) ? (openBlock(), createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "profile-password-change__password-toggle profile-password-change__password-toggle--clear",
                  "aria-label": "Очистить текущий пароль",
                  onClick: clearCurrentPassword
                }, [
                  createVNode(_component_AppIcon, {
                    name: "reset",
                    size: 16,
                    class: "profile-password-change__password-toggle-icon"
                  })
                ])) : (openBlock(), createBlock("button", {
                  key: 1,
                  type: "button",
                  class: "profile-password-change__password-toggle",
                  "aria-label": unref(isCurrentPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                  onClick: ($event) => isCurrentPasswordVisible.value = !unref(isCurrentPasswordVisible)
                }, [
                  createVNode(_component_AppIcon, {
                    name: unref(isCurrentPasswordVisible) ? "password-hide" : "password-show",
                    size: 16,
                    class: "profile-password-change__password-toggle-icon"
                  }, null, 8, ["name"])
                ], 8, ["aria-label", "onClick"]))
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(newPassword),
          "onUpdate:modelValue": ($event) => isRef(newPassword) ? newPassword.value = $event : null,
          class: ["profile-password-change__input", { "profile-password-change__input--error": unref(newPasswordError) }],
          type: unref(newPasswordInputType),
          placeholder: "Новый пароль",
          autocomplete: "off",
          readonly: unref(arePasswordFieldsReadonly),
          disabled: unref(passwordChangePending),
          description: unref(newPasswordDescription),
          onFocus: unlockPasswordFields
        }, {
          suffix: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              if (unref(newPasswordError) && unref(newPassword)) {
                _push2(`<button type="button" class="profile-password-change__password-toggle profile-password-change__password-toggle--clear" aria-label="Очистить новый пароль" data-v-4e4d6ef9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: "reset",
                  size: 16,
                  class: "profile-password-change__password-toggle-icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              } else {
                _push2(`<button type="button" class="profile-password-change__password-toggle"${ssrRenderAttr("aria-label", unref(isNewPasswordVisible) ? "Скрыть пароль" : "Показать пароль")} data-v-4e4d6ef9${_scopeId}>`);
                _push2(ssrRenderComponent(_component_AppIcon, {
                  name: unref(isNewPasswordVisible) ? "password-hide" : "password-show",
                  size: 16,
                  class: "profile-password-change__password-toggle-icon"
                }, null, _parent2, _scopeId));
                _push2(`</button>`);
              }
            } else {
              return [
                unref(newPasswordError) && unref(newPassword) ? (openBlock(), createBlock("button", {
                  key: 0,
                  type: "button",
                  class: "profile-password-change__password-toggle profile-password-change__password-toggle--clear",
                  "aria-label": "Очистить новый пароль",
                  onClick: clearNewPassword
                }, [
                  createVNode(_component_AppIcon, {
                    name: "reset",
                    size: 16,
                    class: "profile-password-change__password-toggle-icon"
                  })
                ])) : (openBlock(), createBlock("button", {
                  key: 1,
                  type: "button",
                  class: "profile-password-change__password-toggle",
                  "aria-label": unref(isNewPasswordVisible) ? "Скрыть пароль" : "Показать пароль",
                  onClick: ($event) => isNewPasswordVisible.value = !unref(isNewPasswordVisible)
                }, [
                  createVNode(_component_AppIcon, {
                    name: unref(isNewPasswordVisible) ? "password-hide" : "password-show",
                    size: 16,
                    class: "profile-password-change__password-toggle-icon"
                  }, null, 8, ["name"])
                ], 8, ["aria-label", "onClick"]))
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(passwordChangeMessage)) {
          _push(`<div class="profile-password__saved" data-v-4e4d6ef9>${ssrInterpolate(unref(passwordChangeMessage))}</div>`);
        } else {
          _push(`<button type="button" class="profile-password__button profile-password__button--save"${ssrIncludeBooleanAttr(unref(passwordChangePending)) ? " disabled" : ""} data-v-4e4d6ef9>${ssrInterpolate(unref(passwordChangePending) ? "Сохраняем" : "Сохранить")}</button>`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="profile-password-row profile-password-row--current" data-v-4e4d6ef9><div class="profile-password-row__label-wrap" data-v-4e4d6ef9><span class="profile-password-row__label" data-v-4e4d6ef9>Текущий пароль</span></div><button type="button" class="profile-password__button" data-v-4e4d6ef9> Изменить </button></div>`);
      }
      if (unref(passwordChangeError)) {
        _push(`<p class="profile-password__status profile-password__status--error" data-v-4e4d6ef9>${ssrInterpolate(unref(passwordChangeError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="profile-password-row profile-password-row--recovery" data-v-4e4d6ef9><div class="profile-password-row__label-wrap" data-v-4e4d6ef9><span class="profile-password-row__label" data-v-4e4d6ef9>Забыли пароль?</span></div><button type="button" class="profile-password__button"${ssrIncludeBooleanAttr(unref(isPasswordRecoveryPending)) ? " disabled" : ""} data-v-4e4d6ef9>${ssrInterpolate(unref(isPasswordRecoveryPending) ? "Отправляем" : "Восстановить")}</button></div>`);
      if (unref(passwordRecoveryError)) {
        _push(`<p class="profile-password__status profile-password__status--error" data-v-4e4d6ef9>${ssrInterpolate(unref(passwordRecoveryError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_ProfilePasswordRecoverySentModal, {
        modelValue: unref(isPasswordRecoverySentOpen),
        "onUpdate:modelValue": ($event) => isRef(isPasswordRecoverySentOpen) ? isPasswordRecoverySentOpen.value = $event : null,
        email: unref(normalizedEmail)
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProfilePasswordResetModal, {
        modelValue: unref(isPasswordResetOpen),
        "onUpdate:modelValue": ($event) => isRef(isPasswordResetOpen) ? isPasswordResetOpen.value = $event : null,
        token: __props.resetToken,
        onClose: handlePasswordResetClose,
        onSaved: handlePasswordResetSaved
      }, null, _parent));
      _push(ssrRenderComponent(_component_ProfilePasswordResetSuccessModal, {
        modelValue: unref(isPasswordResetSuccessOpen),
        "onUpdate:modelValue": ($event) => isRef(isPasswordResetSuccessOpen) ? isPasswordResetSuccessOpen.value = $event : null
      }, null, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfilePasswordSettings.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_5 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$5, [["__scopeId", "data-v-4e4d6ef9"]]), { __name: "ProfilePasswordSettings" });
const CONFIRM_DELAY_SECONDS = 10;
const _sfc_main$4 = {
  __name: "ProfileDangerZone",
  __ssrInlineRender: true,
  setup(__props) {
    const step = ref("idle");
    const secondsLeft = ref(0);
    const isDeleteModalOpen = ref(false);
    const isDeleting = ref(false);
    const deleteError = ref("");
    let countdownTimer = null;
    const isCountdown = computed(() => step.value === "countdown");
    const isConfirming = computed(() => step.value === "confirm");
    const isDeleteButtonDisabled = computed(() => isCountdown.value || isDeleting.value);
    const secondsWord = computed(() => getRussianSecondsWord(secondsLeft.value));
    function clearCountdown() {
      if (countdownTimer) {
        clearInterval(countdownTimer);
        countdownTimer = null;
      }
    }
    function startDeleteCountdown() {
      clearCountdown();
      deleteError.value = "";
      step.value = "countdown";
      secondsLeft.value = CONFIRM_DELAY_SECONDS;
      countdownTimer = setInterval();
    }
    function cancelDelete() {
      clearCountdown();
      step.value = "idle";
      secondsLeft.value = 0;
      deleteError.value = "";
      isDeleteModalOpen.value = false;
    }
    function openDeleteModal() {
      deleteError.value = "";
      isDeleteModalOpen.value = true;
    }
    function getDeleteErrorMessage(error) {
      const message = error?.message || error?.data?.message || error?.statusMessage || "";
      const code = error?.code || error?.data?.code || error?.status || "";
      const errorText = `${code} ${message}`;
      if (/SESSION_EXPIRED|session.*expired/i.test(errorText)) {
        return "Сессия устарела. Войдите заново и повторите удаление";
      }
      if (/network|fetch|failed to fetch/i.test(errorText)) {
        return "Ошибка соединения. Попробуйте ещё раз";
      }
      return "Не удалось удалить аккаунт";
    }
    async function deleteAccount() {
      if (isDeleting.value) {
        return;
      }
      isDeleting.value = true;
      deleteError.value = "";
      try {
        const result = typeof authClient.deleteUser === "function" ? await authClient.deleteUser() : await $fetch("/api/auth/delete-user", {
          method: "POST",
          body: {}
        });
        if (result?.error) {
          throw result.error;
        }
        await navigateTo("/");
      } catch (error) {
        deleteError.value = getDeleteErrorMessage(error);
      } finally {
        isDeleting.value = false;
      }
    }
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppButton = __nuxt_component_0$5;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_UModal = _sfc_main$h;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-danger app-card" }, _attrs))} data-v-ade481c4><h2 class="profile-danger__title" data-v-ade481c4> Опасная зона </h2><div class="profile-danger__body" data-v-ade481c4><div class="profile-danger__copy" data-v-ade481c4><span class="profile-danger__action-title" data-v-ade481c4>Удалить аккаунт</span><span class="profile-danger__text" data-v-ade481c4> Все данные и история заказов будут удалены безвозвратно </span></div>`);
      if (unref(isConfirming)) {
        _push(`<div class="profile-danger__confirm-actions" data-v-ade481c4>`);
        _push(ssrRenderComponent(_component_AppButton, {
          variant: "negative",
          size: "sm",
          onClick: cancelDelete
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Отмена `);
            } else {
              return [
                createTextVNode(" Отмена ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(ssrRenderComponent(_component_AppButton, {
          variant: "negative",
          size: "sm",
          onClick: openDeleteModal
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AppIcon, {
                name: "profile-trash",
                size: "12",
                class: "profile-danger__button-icon"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-ade481c4${_scopeId}>Удалить</span>`);
            } else {
              return [
                createVNode(_component_AppIcon, {
                  name: "profile-trash",
                  size: "12",
                  class: "profile-danger__button-icon"
                }),
                createVNode("span", null, "Удалить")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      } else {
        _push(`<div class="profile-danger__pending" data-v-ade481c4>`);
        _push(ssrRenderComponent(_component_AppButton, {
          variant: "negative",
          size: "sm",
          disabled: unref(isDeleteButtonDisabled),
          onClick: startDeleteCountdown
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(ssrRenderComponent(_component_AppIcon, {
                name: "profile-trash",
                size: "12",
                class: "profile-danger__button-icon"
              }, null, _parent2, _scopeId));
              _push2(`<span data-v-ade481c4${_scopeId}>Удалить</span>`);
            } else {
              return [
                createVNode(_component_AppIcon, {
                  name: "profile-trash",
                  size: "12",
                  class: "profile-danger__button-icon"
                }),
                createVNode("span", null, "Удалить")
              ];
            }
          }),
          _: 1
        }, _parent));
        if (unref(isCountdown)) {
          _push(`<p class="profile-danger__hint" data-v-ade481c4> Подтвердить удаление аккаунта<br data-v-ade481c4> можно будет через ${ssrInterpolate(unref(secondsLeft))} ${ssrInterpolate(unref(secondsWord))}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      }
      _push(`</div>`);
      _push(ssrRenderComponent(_component_UModal, {
        open: unref(isDeleteModalOpen),
        "onUpdate:open": ($event) => isRef(isDeleteModalOpen) ? isDeleteModalOpen.value = $event : null,
        overlay: true,
        close: false,
        scrollable: true,
        ui: {
          content: "w-auto max-w-none bg-transparent ring-0 shadow-none p-0 rounded-none",
          overlay: "bg-[rgba(4,18,27,0.74)]"
        }
      }, {
        content: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="delete-account-modal" data-v-ade481c4${_scopeId}><header class="delete-account-modal__header" data-v-ade481c4${_scopeId}><div class="delete-account-modal__title-block" data-v-ade481c4${_scopeId}><h2 class="delete-account-modal__title" data-v-ade481c4${_scopeId}> Удаление аккаунта </h2><p class="delete-account-modal__text" data-v-ade481c4${_scopeId}> Вы уверены, что хотите удалить Ваш аккаунт? Все данные и история заказов будут удалены безвозвратно. Вам будет необходимо регистрироваться заново. </p></div><button type="button" class="delete-account-modal__close" aria-label="Закрыть удаление аккаунта" data-v-ade481c4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppIcon, {
              name: "close",
              size: 16,
              class: "delete-account-modal__close-icon"
            }, null, _parent2, _scopeId));
            _push2(`</button></header>`);
            if (unref(deleteError)) {
              _push2(`<p class="delete-account-modal__error" data-v-ade481c4${_scopeId}>${ssrInterpolate(unref(deleteError))}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`<div class="delete-account-modal__actions" data-v-ade481c4${_scopeId}>`);
            _push2(ssrRenderComponent(_component_AppButton, {
              variant: "secondary",
              size: "sm",
              disabled: unref(isDeleting),
              onClick: ($event) => isDeleteModalOpen.value = false
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  _push3(` Отмена `);
                } else {
                  return [
                    createTextVNode(" Отмена ")
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(ssrRenderComponent(_component_AppButton, {
              variant: "negative",
              size: "sm",
              disabled: unref(isDeleting),
              onClick: deleteAccount
            }, {
              default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                if (_push3) {
                  if (!unref(isDeleting)) {
                    _push3(ssrRenderComponent(_component_AppIcon, {
                      name: "profile-trash",
                      size: "12",
                      class: "delete-account-modal__button-icon"
                    }, null, _parent3, _scopeId2));
                  } else {
                    _push3(`<!---->`);
                  }
                  _push3(`<span data-v-ade481c4${_scopeId2}>${ssrInterpolate(unref(isDeleting) ? "Удаляем" : "Удалить")}</span>`);
                } else {
                  return [
                    !unref(isDeleting) ? (openBlock(), createBlock(_component_AppIcon, {
                      key: 0,
                      name: "profile-trash",
                      size: "12",
                      class: "delete-account-modal__button-icon"
                    })) : createCommentVNode("", true),
                    createVNode("span", null, toDisplayString(unref(isDeleting) ? "Удаляем" : "Удалить"), 1)
                  ];
                }
              }),
              _: 1
            }, _parent2, _scopeId));
            _push2(`</div></section>`);
          } else {
            return [
              createVNode("section", { class: "delete-account-modal" }, [
                createVNode("header", { class: "delete-account-modal__header" }, [
                  createVNode("div", { class: "delete-account-modal__title-block" }, [
                    createVNode("h2", { class: "delete-account-modal__title" }, " Удаление аккаунта "),
                    createVNode("p", { class: "delete-account-modal__text" }, " Вы уверены, что хотите удалить Ваш аккаунт? Все данные и история заказов будут удалены безвозвратно. Вам будет необходимо регистрироваться заново. ")
                  ]),
                  createVNode("button", {
                    type: "button",
                    class: "delete-account-modal__close",
                    "aria-label": "Закрыть удаление аккаунта",
                    onClick: ($event) => isDeleteModalOpen.value = false
                  }, [
                    createVNode(_component_AppIcon, {
                      name: "close",
                      size: 16,
                      class: "delete-account-modal__close-icon"
                    })
                  ], 8, ["onClick"])
                ]),
                unref(deleteError) ? (openBlock(), createBlock("p", {
                  key: 0,
                  class: "delete-account-modal__error"
                }, toDisplayString(unref(deleteError)), 1)) : createCommentVNode("", true),
                createVNode("div", { class: "delete-account-modal__actions" }, [
                  createVNode(_component_AppButton, {
                    variant: "secondary",
                    size: "sm",
                    disabled: unref(isDeleting),
                    onClick: ($event) => isDeleteModalOpen.value = false
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" Отмена ")
                    ]),
                    _: 1
                  }, 8, ["disabled", "onClick"]),
                  createVNode(_component_AppButton, {
                    variant: "negative",
                    size: "sm",
                    disabled: unref(isDeleting),
                    onClick: deleteAccount
                  }, {
                    default: withCtx(() => [
                      !unref(isDeleting) ? (openBlock(), createBlock(_component_AppIcon, {
                        key: 0,
                        name: "profile-trash",
                        size: "12",
                        class: "delete-account-modal__button-icon"
                      })) : createCommentVNode("", true),
                      createVNode("span", null, toDisplayString(unref(isDeleting) ? "Удаляем" : "Удалить"), 1)
                    ]),
                    _: 1
                  }, 8, ["disabled"])
                ])
              ])
            ];
          }
        }),
        _: 1
      }, _parent));
      _push(`</section>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileDangerZone.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$4, [["__scopeId", "data-v-ade481c4"]]);
const _sfc_main$3 = {
  __name: "ProfileSaveChangesBar",
  __ssrInlineRender: true,
  props: {
    pending: {
      type: Boolean,
      default: false
    },
    error: {
      type: String,
      default: ""
    }
  },
  emits: ["cancel", "save"],
  setup(__props) {
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppIcon = __nuxt_component_1$1$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-save-bar" }, _attrs))} data-v-61d9fb40><p class="${ssrRenderClass([{ "profile-save-bar__status--error": __props.error }, "profile-save-bar__status"])}" data-v-61d9fb40>${ssrInterpolate(__props.error || "Изменения не сохранены")}</p><div class="profile-save-bar__actions" data-v-61d9fb40><button type="button" class="profile-save-bar__cancel"${ssrIncludeBooleanAttr(__props.pending) ? " disabled" : ""} data-v-61d9fb40> Отмена </button><button type="button" class="profile-save-bar__save"${ssrIncludeBooleanAttr(__props.pending) ? " disabled" : ""} data-v-61d9fb40>`);
      if (!__props.pending) {
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "profile-check",
          size: "10",
          class: "profile-save-bar__save-icon"
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`<span data-v-61d9fb40>${ssrInterpolate(__props.pending ? "Сохраняем" : "Сохранить изменения")}</span></button></div></section>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileSaveChangesBar.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-61d9fb40"]]);
const _sfc_main$2 = {
  __name: "ProfileFavoriteCard",
  __ssrInlineRender: true,
  props: {
    image: {
      type: String,
      default: ""
    },
    images: {
      type: Array,
      default: () => []
    },
    title: {
      type: String,
      default: "Название товара в две-три строки, две-три строки"
    }
  },
  emits: ["remove"],
  setup(__props) {
    const props = __props;
    const activeImage = computed(() => props.images.find(Boolean) || props.image || "");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_UIcon = _sfc_main$u;
      const _component_AppFavoriteButton = __nuxt_component_1$2;
      _push(`<article${ssrRenderAttrs(mergeProps({ class: "profile-favorite-card app-card" }, _attrs))} data-v-1d3625dc><div class="profile-favorite-card__media" data-v-1d3625dc>`);
      if (unref(activeImage)) {
        _push(`<img${ssrRenderAttr("src", unref(activeImage))}${ssrRenderAttr("alt", __props.title)} class="profile-favorite-card__image" data-v-1d3625dc>`);
      } else {
        _push(`<div class="profile-favorite-card__image profile-favorite-card__image--empty" data-v-1d3625dc>`);
        _push(ssrRenderComponent(_component_UIcon, { name: "i-lucide-image" }, null, _parent));
        _push(`</div>`);
      }
      _push(`<div class="profile-favorite-card__overlay" data-v-1d3625dc>`);
      _push(ssrRenderComponent(_component_AppFavoriteButton, {
        active: "",
        onChange: ($event) => _ctx.$emit("remove")
      }, null, _parent));
      _push(`</div></div><div class="profile-favorite-card__content" data-v-1d3625dc><h3 class="profile-favorite-card__title" data-v-1d3625dc>${ssrInterpolate(__props.title)}</h3></div></article>`);
    };
  }
};
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileFavoriteCard.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_0 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-1d3625dc"]]);
const _sfc_main$1 = {
  __name: "ProfileFavorites",
  __ssrInlineRender: true,
  setup(__props) {
    const { items, removeItem } = useFavorites();
    const currentCatalogProductsById = new Map(catalogProducts.map((product) => [product.id, product]));
    const favoriteProducts = computed(() => items.value.map((item) => ({
      ...item,
      ...currentCatalogProductsById.get(item.id)
    })));
    return (_ctx, _push, _parent, _attrs) => {
      const _component_ProfileFavoriteCard = __nuxt_component_0;
      const _component_AppIcon = __nuxt_component_1$1$1;
      const _component_NuxtLink = __nuxt_component_0$3$1;
      _push(`<section${ssrRenderAttrs(mergeProps({ class: "profile-favorites app-card" }, _attrs))} data-v-3ff51a27><div class="profile-favorites__header" data-v-3ff51a27><h2 class="profile-favorites__title" data-v-3ff51a27> Избранное </h2>`);
      if (unref(items).length) {
        _push(`<button type="button" class="profile-favorites__clear" data-v-3ff51a27> Очистить </button>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div>`);
      if (unref(favoriteProducts).length) {
        _push(`<div class="profile-favorites__grid" data-v-3ff51a27><!--[-->`);
        ssrRenderList(unref(favoriteProducts), (item) => {
          _push(ssrRenderComponent(_component_ProfileFavoriteCard, {
            key: item.id,
            images: item.images,
            title: item.title,
            onRemove: ($event) => unref(removeItem)(item.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else if (unref(items).length) {
        _push(`<div class="profile-favorites__grid" data-v-3ff51a27><!--[-->`);
        ssrRenderList(unref(items), (item) => {
          _push(ssrRenderComponent(_component_ProfileFavoriteCard, {
            key: item.id,
            images: item.images,
            title: item.title,
            onRemove: ($event) => unref(removeItem)(item.id)
          }, null, _parent));
        });
        _push(`<!--]--></div>`);
      } else {
        _push(`<div class="profile-favorites__empty" data-v-3ff51a27>`);
        _push(ssrRenderComponent(_component_AppIcon, {
          name: "favorite",
          class: "profile-favorites__empty-icon"
        }, null, _parent));
        _push(`<div class="profile-favorites__empty-copy" data-v-3ff51a27><h3 class="profile-favorites__empty-title" data-v-3ff51a27> Пока ничего нет </h3><p class="profile-favorites__empty-text" data-v-3ff51a27> Добавляйте товары из каталога, чтобы быстро вернуться к ним позже. </p></div>`);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/catalog",
          class: "profile-favorites__empty-link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` Перейти в каталог `);
            } else {
              return [
                createTextVNode(" Перейти в каталог ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</div>`);
      }
      _push(`</section>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/profile/ProfileFavorites.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_8 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-3ff51a27"]]);
const _sfc_main = {
  __name: "index",
  __ssrInlineRender: true,
  setup(__props) {
    const route = useRoute();
    const availableProfileTabs = ["data", "favorites"];
    function normalizeProfileTab(tab) {
      const value = Array.isArray(tab) ? tab[0] : tab;
      return availableProfileTabs.includes(value) ? value : "data";
    }
    const activeProfileTab = ref(normalizeProfileTab(route.query.tab));
    const profileStore = useProfileStore();
    const {
      profileData,
      user,
      organizations,
      recipients
    } = storeToRefs(profileStore);
    const userName = ref("");
    const userPhone = ref("");
    const userEmail = ref("");
    const isEmailVerified = ref(false);
    const additionalContact = ref("");
    const savedUserName = ref("");
    const savedAdditionalContact = ref("");
    const isProfileSaving = ref(false);
    const profileSaveError = ref("");
    const recipientName = ref("");
    const recipientPhone = ref("");
    const isPhoneVerified = ref(false);
    const showRecipient = ref(false);
    const personalDataRef = ref(null);
    computed(() => {
      const value = route.query.emailConfirmed;
      return Array.isArray(value) ? value[0] : value;
    });
    const passwordResetToken = computed(() => {
      const value = route.query.token;
      return typeof value === "string" && route.query.passwordReset ? value : "";
    });
    function setActiveProfileTab(tab) {
      const nextTab = normalizeProfileTab(tab);
      navigateTo({
        path: "/profile",
        query: nextTab === "data" ? {} : { tab: nextTab }
      });
    }
    watch(
      () => route.query.tab,
      (tab) => {
        activeProfileTab.value = normalizeProfileTab(tab);
      }
    );
    function ensureProfileLoaded() {
      if (activeProfileTab.value !== "data" || profileData.value) {
        return;
      }
      profileStore.fetchProfileOnce().catch(() => {
      });
    }
    watch(activeProfileTab, ensureProfileLoaded, { immediate: true });
    watch(user, (value) => {
      const nextSavedName = value?.name || "";
      if (userName.value.trim() === savedUserName.value.trim()) {
        userName.value = nextSavedName;
      }
      savedUserName.value = nextSavedName;
      userPhone.value = formatCompactPhone(value?.phoneNumber || "");
      userEmail.value = value?.email || "";
      additionalContact.value = value?.additionalContact || "";
      savedAdditionalContact.value = value?.additionalContact || "";
      isEmailVerified.value = Boolean(value?.emailVerified);
      isPhoneVerified.value = Boolean(value?.phoneNumberVerified);
      personalDataRef.value?.syncSavedEmail?.(value?.email || "");
    }, { immediate: true });
    const hasProfileChanges = computed(() => userName.value.trim() !== savedUserName.value.trim() || additionalContact.value.trim() !== savedAdditionalContact.value.trim());
    function cancelProfileChanges() {
      userName.value = savedUserName.value;
      additionalContact.value = savedAdditionalContact.value;
      profileSaveError.value = "";
    }
    async function saveProfileChanges() {
      if (!hasProfileChanges.value || isProfileSaving.value) {
        return;
      }
      profileSaveError.value = "";
      if (!userName.value.trim()) {
        profileSaveError.value = "Введите имя";
        return;
      }
      isProfileSaving.value = true;
      try {
        const response = await $fetch("/api/profile", {
          method: "PATCH",
          body: {
            name: userName.value,
            additionalContact: additionalContact.value
          }
        });
        const updatedUser = response?.user;
        if (updatedUser?.name) {
          userName.value = updatedUser.name;
          savedUserName.value = updatedUser.name;
        }
        additionalContact.value = updatedUser?.additionalContact || "";
        savedAdditionalContact.value = updatedUser?.additionalContact || "";
        await profileStore.refreshProfile();
      } catch (error) {
        profileSaveError.value = error?.data?.message || error?.message || "Не удалось сохранить изменения";
      } finally {
        isProfileSaving.value = false;
      }
    }
    async function clearPasswordResetQuery() {
      await navigateTo({
        path: "/profile",
        query: {}
      }, { replace: true });
    }
    const onProfileUpdated = async (updatedUser) => {
      if (updatedUser?.phoneNumber) {
        userPhone.value = formatCompactPhone(updatedUser.phoneNumber);
      }
      if (updatedUser?.email) {
        userEmail.value = updatedUser.email;
      }
      if (typeof updatedUser?.emailVerified === "boolean") {
        isEmailVerified.value = updatedUser.emailVerified;
      }
      if (typeof updatedUser?.phoneNumberVerified === "boolean") {
        isPhoneVerified.value = updatedUser.phoneNumberVerified;
      }
      await profileStore.refreshProfile();
    };
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppBreadcrumbs = __nuxt_component_0$2;
      const _component_ProfileSidebar = __nuxt_component_1$1;
      const _component_ProfilePersonalData = __nuxt_component_2$1;
      const _component_ProfileOrganizations = __nuxt_component_3$1;
      const _component_ProfileNotificationSettings = __nuxt_component_4$1;
      const _component_ProfilePasswordSettings = __nuxt_component_5;
      const _component_ProfileDangerZone = __nuxt_component_6;
      const _component_ProfileSaveChangesBar = __nuxt_component_7;
      const _component_ProfileFavorites = __nuxt_component_8;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "profile-page" }, _attrs))} data-v-7be83251><div class="profile-page__container" data-v-7be83251>`);
      _push(ssrRenderComponent(_component_AppBreadcrumbs, { items: [
        { label: "Главная", to: "/" },
        { label: "Личный кабинет", to: "/profile" }
      ] }, null, _parent));
      _push(`<h1 class="profile-page__title" data-v-7be83251> Личный кабинет </h1><div class="profile-page__layout" data-v-7be83251>`);
      _push(ssrRenderComponent(_component_ProfileSidebar, {
        class: "profile-page__sidebar",
        "active-item": unref(activeProfileTab),
        "is-email-verified": unref(isEmailVerified),
        onNavigate: setActiveProfileTab
      }, null, _parent));
      _push(`<div class="profile-page__content" data-v-7be83251>`);
      if (unref(activeProfileTab) === "data") {
        _push(`<!--[-->`);
        _push(ssrRenderComponent(_component_ProfilePersonalData, {
          ref_key: "personalDataRef",
          ref: personalDataRef,
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
          onUpdated: unref(profileStore).refreshProfile
        }, null, _parent));
        _push(ssrRenderComponent(_component_ProfileNotificationSettings, null, null, _parent));
        _push(ssrRenderComponent(_component_ProfilePasswordSettings, {
          email: unref(userEmail),
          "reset-token": unref(passwordResetToken),
          onResetTokenHandled: clearPasswordResetQuery
        }, null, _parent));
        _push(ssrRenderComponent(_component_ProfileDangerZone, null, null, _parent));
        if (unref(hasProfileChanges)) {
          _push(ssrRenderComponent(_component_ProfileSaveChangesBar, {
            pending: unref(isProfileSaving),
            error: unref(profileSaveError),
            onCancel: cancelProfileChanges,
            onSave: saveProfileChanges
          }, null, _parent));
        } else {
          _push(`<!---->`);
        }
        _push(`<!--]-->`);
      } else if (unref(activeProfileTab) === "favorites") {
        _push(ssrRenderComponent(_component_ProfileFavorites, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div></div>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/profile/index.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const index = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-7be83251"]]);

export { index as default };
//# sourceMappingURL=index-Dr7vejDk.mjs.map

import { _ as _export_sfc, m as useCart, n as authClient, o as useSeoMeta, i as __nuxt_component_3$1, p as __nuxt_component_5$1, g as getFabricLabel, f as calcUnitPrice, h as calcDesignPrice, F as FABRICS, M as MOUNTINGS, S as SIZES, j as formatPriceRaw, k as useProfileStore, l as __nuxt_component_0, a as __nuxt_component_0$3 } from './server.mjs';
import { _ as __nuxt_component_2$1 } from './QuantityInput-BYipMCdR.mjs';
import { computed, ref, mergeProps, unref, isRef, watch, useModel, withCtx, createTextVNode, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { _ as __nuxt_component_0$1 } from './AppSwitch-B6KdDVqJ.mjs';
import { storeToRefs } from 'pinia';
import { K as getRegistrationEmailError } from '../nitro/nitro.mjs';
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

const _sfc_main$4 = {
  __name: "CartItemRow",
  __ssrInlineRender: true,
  props: {
    item: { type: Object, required: true },
    editing: { type: Boolean, default: false }
  },
  emits: [
    "toggle",
    "start-edit",
    "cancel-edit",
    "confirm-edit",
    "update-quantity"
  ],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const emit = __emit;
    const editDraft = ref(null);
    const openDropdown = ref(null);
    watch(() => props.editing, (val) => {
      if (val) {
        editDraft.value = { ...props.item.config };
        (void 0).addEventListener("click", closeDropdowns);
      } else {
        editDraft.value = null;
        openDropdown.value = null;
        (void 0).removeEventListener("click", closeDropdowns);
      }
    });
    function labelFor(options, value) {
      return options.find((o) => o.value === value)?.label ?? value;
    }
    function closeDropdowns() {
      openDropdown.value = null;
    }
    const previewPrice = computed(() => {
      if (!editDraft.value) return null;
      const fabricLabel = getFabricLabel(editDraft.value.fabric);
      const unitPrice = calcUnitPrice(
        fabricLabel,
        editDraft.value.size,
        props.item.quantity,
        editDraft.value.hasFringe,
        editDraft.value.doubleSided
      );
      const designPrice = calcDesignPrice(editDraft.value.orderDesign);
      return {
        total: unitPrice * props.item.quantity + designPrice,
        unit: unitPrice
      };
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppCheckbox = __nuxt_component_3$1;
      const _component_QuantityInput = __nuxt_component_2$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "item-row" }, _attrs))} data-v-0c8b6daa>`);
      _push(ssrRenderComponent(_component_AppCheckbox, {
        "model-value": __props.item.selected,
        "onUpdate:modelValue": ($event) => emit("toggle")
      }, null, _parent));
      _push(`<div class="item-row__product" data-v-0c8b6daa><div class="item-row__image-wrap" data-v-0c8b6daa><img${ssrRenderAttr("src", __props.item.image)}${ssrRenderAttr("alt", __props.item.name)} class="item-row__image" data-v-0c8b6daa></div><div class="item-row__details" data-v-0c8b6daa><div class="item-row__top" data-v-0c8b6daa><div class="item-row__info" data-v-0c8b6daa><p class="item-row__name" data-v-0c8b6daa>${ssrInterpolate(__props.item.name)}</p>`);
      if (!__props.editing) {
        _push(`<div class="item-row__meta" data-v-0c8b6daa><p class="item-row__desc" data-v-0c8b6daa>${ssrInterpolate(__props.item.description)}</p>`);
        if (__props.item.customerComment) {
          _push(`<p class="item-row__note" data-v-0c8b6daa>${ssrInterpolate(__props.item.customerComment)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="item-row__edit-options" data-v-0c8b6daa><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(FABRICS), unref(editDraft).fabric))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "fabric")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "fabric") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(FABRICS), (f) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", f.value === unref(editDraft).fabric)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": f.value === unref(editDraft).fabric }])}" data-v-0c8b6daa>${ssrInterpolate(f.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(MOUNTINGS), unref(editDraft).mounting))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "mounting")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "mounting") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(MOUNTINGS), (m) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", m.value === unref(editDraft).mounting)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": m.value === unref(editDraft).mounting }])}" data-v-0c8b6daa>${ssrInterpolate(m.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-0c8b6daa><span class="inline-select__text" data-v-0c8b6daa>${ssrInterpolate(labelFor(unref(SIZES), unref(editDraft).size))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "size")} data-v-0c8b6daa><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-0c8b6daa></path></svg>`);
        if (unref(openDropdown) === "size") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-0c8b6daa><!--[-->`);
          ssrRenderList(unref(SIZES), (s) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", s.value === unref(editDraft).size)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": s.value === unref(editDraft).size }])}" data-v-0c8b6daa>${ssrInterpolate(s.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).hasFringe }])}" data-v-0c8b6daa>бахрома</span><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).doubleSided }])}" data-v-0c8b6daa>печать с двух сторон</span></div>`);
      }
      _push(`</div>`);
      if (!__props.editing) {
        _push(`<button class="item-edit-badge" data-v-0c8b6daa>Изменить</button>`);
      } else {
        _push(`<div class="item-row__edit-actions" data-v-0c8b6daa><button class="edit-action edit-action--cancel" aria-label="Отменить редактирование" data-v-0c8b6daa><svg viewBox="0 0 8.56 8.56" fill="none" data-v-0c8b6daa><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z" fill="#E12E3C" data-v-0c8b6daa></path></svg></button><button class="edit-action edit-action--confirm" aria-label="Подтвердить изменения" data-v-0c8b6daa><svg viewBox="0 0 9.75 7.55" fill="none" data-v-0c8b6daa><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z" fill="#008A0B" data-v-0c8b6daa></path></svg></button></div>`);
      }
      _push(`</div><div class="item-row__bottom" data-v-0c8b6daa>`);
      _push(ssrRenderComponent(_component_QuantityInput, {
        "model-value": __props.item.quantity,
        "onUpdate:modelValue": (qty) => emit("update-quantity", qty)
      }, null, _parent));
      _push(`<div class="item-row__price" data-v-0c8b6daa>`);
      if (__props.editing && unref(previewPrice)) {
        _push(`<!--[--><p class="item-row__total" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).total))} ₽</p><p class="item-row__unit-price" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).unit))} ₽ / шт</p><!--]-->`);
      } else {
        _push(`<!--[--><p class="item-row__total" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice * __props.item.quantity + __props.item.designPrice))} ₽</p><p class="item-row__unit-price" data-v-0c8b6daa>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice))} ₽ / шт</p><!--]-->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartItemRow.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["__scopeId", "data-v-0c8b6daa"]]), { __name: "CartItemRow" });
const ORGANIZATION_SUGGEST_DELAY = 350;
const _sfc_main$3 = {
  __name: "CartRecipient",
  __ssrInlineRender: true,
  props: {
    "payAsLegal": { type: Boolean, default: false },
    "payAsLegalModifiers": {}
  },
  emits: ["update:payAsLegal"],
  setup(__props) {
    const profileStore = useProfileStore();
    const { user, organizations } = storeToRefs(profileStore);
    const userName = ref("");
    const userPhone = ref("");
    const userEmail = ref("");
    const isUserEmailTouched = ref(false);
    const userContact = ref("");
    const anotherPerson = ref(false);
    const anotherName = ref("");
    const anotherPhone = ref("");
    const payAsLegal = useModel(__props, "payAsLegal");
    const selectedOrganizationId = ref("");
    const organizationInn = ref("");
    const organizationSuggestions = ref([]);
    const organizationSuggestError = ref("");
    const isOrganizationSuggestPending = ref(false);
    const isOrganizationSuggestionsOpen = ref(false);
    const isAddOrganizationMode = ref(false);
    ref(false);
    const addOrganizationInput = ref(null);
    let organizationSuggestTimerId;
    let organizationSuggestRequestId = 0;
    const isAuthenticated = computed(() => Boolean(user.value));
    const userEmailError = computed(() => {
      if (!isUserEmailTouched.value || !userEmail.value.trim()) {
        return "";
      }
      return getRegistrationEmailError(userEmail.value);
    });
    const displayOrganizations = computed(() => {
      const hasExplicitActive = organizations.value.some((organization) => organization.isActive);
      return organizations.value.map((organization, index) => ({
        ...organization,
        active: hasExplicitActive ? Boolean(organization.isActive) : index === 0,
        innLabel: organization.inn ? `ИНН ${organization.inn}` : ""
      }));
    });
    const shouldShowOrganizationList = computed(() => isAuthenticated.value && displayOrganizations.value.length > 0);
    const shouldShowOrganizationSuggestions = computed(() => isOrganizationSuggestionsOpen.value && (isOrganizationSuggestPending.value || Boolean(organizationSuggestError.value) || organizationSuggestions.value.length > 0));
    watch(
      displayOrganizations,
      (items) => {
        if (!items.length) {
          selectedOrganizationId.value = "";
          return;
        }
        if (!items.some((organization) => organization.id === selectedOrganizationId.value)) {
          selectedOrganizationId.value = items.find((organization) => organization.active)?.id ?? items[0].id;
        }
      },
      { immediate: true }
    );
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
      const _component_AppInput = __nuxt_component_0;
      const _component_AppSwitch = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal-data-card app-card" }, _attrs))} data-v-b0daf537><div class="personal-data-card__inner" data-v-b0daf537><p class="section-title" data-v-b0daf537> Данные пользователя </p><div class="personal-data-form" data-v-b0daf537><div class="field-list" data-v-b0daf537><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Имя</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userName),
        "onUpdate:modelValue": ($event) => isRef(userName) ? userName.value = $event : null
      }, null, _parent));
      _push(`</div><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Номер телефона</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userPhone),
        "onUpdate:modelValue": ($event) => isRef(userPhone) ? userPhone.value = $event : null,
        class: "field-input field-input--phone",
        mask: "+7(###)-###-##-##"
      }, null, _parent));
      _push(`</div><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Электронная почта</label><div class="field-control" data-v-b0daf537>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userEmail),
        "onUpdate:modelValue": ($event) => isRef(userEmail) ? userEmail.value = $event : null,
        type: "text",
        placeholder: "mail@example.com",
        autocomplete: "email",
        inputmode: "email",
        "aria-invalid": Boolean(unref(userEmailError)),
        "aria-describedby": unref(userEmailError) ? "cart-user-email-error" : void 0,
        onBlur: ($event) => isUserEmailTouched.value = true
      }, null, _parent));
      if (unref(userEmailError)) {
        _push(`<p id="cart-user-email-error" class="field-error" data-v-b0daf537>${ssrInterpolate(unref(userEmailError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Дополнительный контакт</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userContact),
        "onUpdate:modelValue": ($event) => isRef(userContact) ? userContact.value = $event : null
      }, null, _parent));
      _push(`</div></div><div class="switch-row" data-v-b0daf537><span class="switch-row__label" data-v-b0daf537>Заберёт другой человек</span>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(anotherPerson),
        "onUpdate:modelValue": ($event) => isRef(anotherPerson) ? anotherPerson.value = $event : null
      }, null, _parent));
      _push(`</div>`);
      if (unref(anotherPerson)) {
        _push(`<div class="field-list" data-v-b0daf537><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Имя</label>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(anotherName),
          "onUpdate:modelValue": ($event) => isRef(anotherName) ? anotherName.value = $event : null
        }, null, _parent));
        _push(`</div><div class="field-row" data-v-b0daf537><label class="field-label" data-v-b0daf537>Номер телефона</label>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(anotherPhone),
          "onUpdate:modelValue": ($event) => isRef(anotherPhone) ? anotherPhone.value = $event : null,
          class: "field-input field-input--phone",
          mask: "+7(###)-###-##-##"
        }, null, _parent));
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`<div class="switch-row" data-v-b0daf537><span class="switch-row__label" data-v-b0daf537>Оплатить как Юрлицо</span>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: payAsLegal.value,
        "onUpdate:modelValue": ($event) => payAsLegal.value = $event
      }, null, _parent));
      _push(`</div>`);
      if (payAsLegal.value) {
        _push(`<div class="legal-section" data-v-b0daf537>`);
        if (unref(shouldShowOrganizationList)) {
          _push(`<div class="organization-row" data-v-b0daf537><p class="field-label organization-row__label" data-v-b0daf537> Выбрать организацию </p><div class="organization-list" data-v-b0daf537><!--[-->`);
          ssrRenderList(unref(displayOrganizations), (organization) => {
            _push(`<label class="${ssrRenderClass([{ "organization-option--active": unref(selectedOrganizationId) === organization.id }, "organization-option"])}" data-v-b0daf537><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedOrganizationId), organization.id)) ? " checked" : ""} class="organization-option__input" type="radio"${ssrRenderAttr("value", organization.id)} data-v-b0daf537><span class="organization-option__top" data-v-b0daf537><span class="organization-option__radio" data-v-b0daf537></span><button class="organization-option__remove" type="button" data-v-b0daf537> Удалить </button></span><span class="organization-option__content" data-v-b0daf537><span class="organization-option__name" data-v-b0daf537>${ssrInterpolate(organization.name)}</span><span class="organization-option__meta" data-v-b0daf537>${ssrInterpolate(organization.innLabel)}</span>`);
            if (organization.address) {
              _push(`<span class="organization-option__meta" data-v-b0daf537>${ssrInterpolate(organization.address)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span></label>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="add-organization" data-v-b0daf537><div class="add-organization__text" data-v-b0daf537><p class="add-organization__title" data-v-b0daf537> Добавить организацию </p><p class="add-organization__subtitle" data-v-b0daf537> Чтобы платить безналом<br data-v-b0daf537> и пользоваться ЭДО </p></div>`);
        if (!unref(isAddOrganizationMode)) {
          _push(`<button class="add-button" type="button" data-v-b0daf537><span class="add-button__icon" data-v-b0daf537>+</span><span data-v-b0daf537>Добавить</span></button>`);
        } else {
          _push(`<div class="add-organization__control" data-v-b0daf537>`);
          _push(ssrRenderComponent(_component_AppInput, {
            ref_key: "addOrganizationInput",
            ref: addOrganizationInput,
            "model-value": unref(organizationInn),
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
            _push(`<div class="add-organization__options" data-v-b0daf537>`);
            if (unref(isOrganizationSuggestPending)) {
              _push(`<p class="add-organization__status" data-v-b0daf537> Ищем организацию </p>`);
            } else if (unref(organizationSuggestError)) {
              _push(`<p class="add-organization__status add-organization__status--error" data-v-b0daf537>${ssrInterpolate(unref(organizationSuggestError))}</p>`);
            } else {
              _push(`<!--[-->`);
              ssrRenderList(unref(organizationSuggestions), (suggestion) => {
                _push(`<button type="button" class="add-organization__option" data-v-b0daf537><span class="add-organization__option-name" data-v-b0daf537>${ssrInterpolate(suggestion.name)}</span>`);
                if (suggestion.inn) {
                  _push(`<span class="add-organization__option-meta" data-v-b0daf537> ИНН ${ssrInterpolate(suggestion.inn)}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (suggestion.address) {
                  _push(`<span class="add-organization__option-meta" data-v-b0daf537>${ssrInterpolate(suggestion.address)}</span>`);
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
        _push(`</div></div>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartRecipient.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-b0daf537"]]);
const _sfc_main$2 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card--bottom app-card" }, _attrs))} data-v-4eceec81><div class="card__inner" data-v-4eceec81><div class="pickup-header" data-v-4eceec81><p class="section-title" data-v-4eceec81> Откуда забрать заказ </p><div class="pickup-address" data-v-4eceec81><a href="https://yandex.ru/maps/-/CHEbFD2T" target="_blank" rel="noopener noreferrer" class="ext-link" data-v-4eceec81> ДНР, Донецк, ул. Постышева, дом 60 <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none" data-v-4eceec81><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" data-v-4eceec81></path></svg></a><p class="pickup-schedule" data-v-4eceec81> Пн–Пт 9:00–18:00, Сб 10:00–15:00 </p></div></div><div class="map-container" data-v-4eceec81><iframe src="https://yandex.ru/map-widget/v1/?ll=37.802556%2C48.002076&amp;z=12&amp;pt=37.802556%2C48.002076%2Cpm2rdm" class="map-iframe" sandbox="allow-scripts allow-same-origin" allowfullscreen title="Карта с адресом самовывоза" data-v-4eceec81></iframe></div><p class="pickup-note" data-v-4eceec81> Для онлайн заказов доступна только доставка самовывозом. Мы работаем над тем чтобы организовать курьерскую доставку. </p></div></div>`);
}
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartPickup.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$2, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4eceec81"]]), { __name: "CartPickup" });
const helpMailIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2013.9999'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Icon'%3e%3cpath%20d='M0%205.85492C0%205.47251%200.411829%205.23165%200.745131%205.41914L7.01948%208.94846C7.6283%209.29092%208.3717%209.29092%208.98052%208.94846L15.2549%205.41914C15.5882%205.23165%2016%205.47251%2016%205.85492V10.9999C16%2012.6568%2014.6569%2013.9999%2013%2013.9999H3C1.34315%2013.9999%200%2012.6568%200%2010.9999V5.85492Z'%20fill='%23DE7AFF'/%3e%3cpath%20d='M1.93435%200H14.0656C15.134%200%2016%200.866038%2016%201.93435C16%202.28376%2015.8115%202.60601%2015.507%202.77732L8.49026%206.72423C8.18585%206.89546%207.81415%206.89546%207.50974%206.72423L0.493007%202.77732C0.188465%202.60601%200%202.28376%200%201.93435C0%200.866038%200.866038%200%201.93435%200Z'%20fill='%23DE7AFF'/%3e%3c/g%3e%3c/svg%3e";
const helpPhoneIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2014.8414%2014.8414'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20d='M13.1029%209.37002L13.8779%2010.145C14.1105%2010.3776%2014.2269%2010.494%2014.3102%2010.598C15.1072%2011.593%2014.9955%2013.0358%2014.0547%2013.8962C13.9564%2013.9861%2013.8235%2014.0832%2013.5578%2014.2772C13.4575%2014.3505%2013.7083%2014.1673%2013.5565%2014.2618C12.5073%2014.9151%209.98721%2015.045%208.87646%2014.503C8.71575%2014.4246%209.5612%2014.9175%209.22302%2014.7204C7.94449%2013.975%206.1978%2012.7305%204.15432%2010.6871C2.11085%208.64359%200.866399%206.8969%200.121036%205.61837C-0.0761173%205.28019%200.416766%206.12564%200.33835%205.96493C-0.203614%204.85418%20-0.073733%202.33405%200.579545%201.28491C0.674066%201.13311%200.490888%201.38392%200.564159%201.2836C0.758227%201.01787%200.855262%200.885011%200.945172%200.786703C1.8056%20-0.154097%203.24841%20-0.265849%204.24344%200.531237C4.34741%200.614528%204.46375%200.730864%204.69642%200.963535L5.47137%201.73849C6.18343%202.45054%206.35167%203.54203%205.88709%204.43546C5.42251%205.32888%205.59076%206.42037%206.30281%207.13243L7.70896%208.53858C8.42102%209.25063%209.51251%209.41888%2010.4059%208.9543C11.2994%208.48972%2012.3908%208.65796%2013.1029%209.37002Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const _sfc_main$1 = {
  __name: "CartSummary",
  __ssrInlineRender: true,
  props: {
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    payDisabled: { type: Boolean, default: false },
    payAsLegal: { type: Boolean, default: false }
  },
  emits: ["pay"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const payButtonLabel = computed(() => props.payAsLegal ? "Оплатить по счету" : "Оплатить по СБП");
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$3;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-sticky" }, _attrs))} data-v-652fd92e>`);
      if (__props.totalItems === 0) {
        _push(`<div class="summary-card summary-card--empty app-card" data-v-652fd92e><p class="section-title" data-v-652fd92e> Пусто </p><button class="pay-btn pay-btn--empty" type="button" disabled data-v-652fd92e> Оплатить заказ </button></div>`);
      } else {
        _push(`<div class="summary-card app-card" data-v-652fd92e><p class="section-title" data-v-652fd92e> Товары </p><div class="summary-rows" data-v-652fd92e><div class="summary-row" data-v-652fd92e><span class="summary-row__label" data-v-652fd92e>Товары (${ssrInterpolate(__props.totalItems)})</span><span class="summary-row__value" data-v-652fd92e>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><div class="summary-row" data-v-652fd92e><span class="summary-row__label" data-v-652fd92e>Доставка</span><span class="summary-row__value" data-v-652fd92e>Самовывоз</span></div></div><div class="summary-divider" data-v-652fd92e></div><div class="summary-total" data-v-652fd92e><span class="summary-total__label" data-v-652fd92e>К оплате</span><span class="summary-total__value" data-v-652fd92e>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><button class="pay-btn"${ssrIncludeBooleanAttr(__props.payDisabled) ? " disabled" : ""} data-v-652fd92e>${ssrInterpolate(unref(payButtonLabel))}</button><p class="summary-consent" data-v-652fd92e> Нажимая на кнопку, вы соглашаетесь `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/privacy-policy",
          class: "summary-consent__link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` с Условиями обработки персональных данных, `);
            } else {
              return [
                createTextVNode(" с Условиями обработки персональных данных, ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(` а также `);
        _push(ssrRenderComponent(_component_NuxtLink, {
          to: "/user-agreement",
          class: "summary-consent__link"
        }, {
          default: withCtx((_, _push2, _parent2, _scopeId) => {
            if (_push2) {
              _push2(` с Пользовательским соглашением `);
            } else {
              return [
                createTextVNode(" с Пользовательским соглашением ")
              ];
            }
          }),
          _: 1
        }, _parent));
        _push(`</p></div>`);
      }
      _push(`<div class="help-card app-card" data-v-652fd92e><div class="help-card__info" data-v-652fd92e><div class="help-card__text" data-v-652fd92e><p class="help-card__title" data-v-652fd92e> Нужна помощь с заказом? </p><p class="help-card__subtitle" data-v-652fd92e> Напишите нам на почту или позвоните администратору </p></div></div><div class="help-card__actions" data-v-652fd92e><a href="mailto:info@indigo-mail.ru" class="help-card__action help-card__action--mail" aria-label="Написать на почту" data-v-652fd92e><img${ssrRenderAttr("src", unref(helpMailIcon))} class="help-card__icon" alt="" aria-hidden="true" data-v-652fd92e></a><a href="tel:+79491314544" class="help-card__action help-card__action--phone" aria-label="Позвонить администратору" data-v-652fd92e><img${ssrRenderAttr("src", unref(helpPhoneIcon))} class="help-card__icon" alt="" aria-hidden="true" data-v-652fd92e></a></div></div></div>`);
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartSummary.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-652fd92e"]]);
const title = "Корзина — Indigo";
const description = "Корзина заказов типографии Indigo.";
const _sfc_main = {
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { items: cartItems, updateQuantity, updateItem } = useCart();
    const session = authClient.useSession();
    const selectedItems = computed(() => cartItems.value.filter((item) => item.selected));
    const sessionUser = computed(() => session.value?.data?.user ?? null);
    const isSessionPending = computed(() => session.value?.isPending ?? true);
    const isAuthEntryOpen = ref(false);
    const payAsLegal = ref(false);
    const allSelected = computed({
      get: () => cartItems.value.length > 0 && cartItems.value.every((i) => i.selected),
      set: (val) => {
        cartItems.value = cartItems.value.map((i) => ({ ...i, selected: val }));
      }
    });
    const selectedTotalItems = computed(
      () => selectedItems.value.reduce((sum, item) => sum + item.quantity, 0)
    );
    const selectedTotalPrice = computed(
      () => selectedItems.value.reduce((sum, item) => sum + item.unitPrice * item.quantity + item.designPrice, 0)
    );
    function toggleItem(item) {
      cartItems.value = cartItems.value.map(
        (i) => i.id === item.id ? { ...i, selected: !i.selected } : i
      );
    }
    const editingId = ref(null);
    function startEdit(itemId) {
      editingId.value = itemId;
    }
    function cancelEdit() {
      editingId.value = null;
    }
    function confirmEdit(itemId, config) {
      updateItem(itemId, config);
      editingId.value = null;
    }
    function pluralItems(n) {
      const mod100 = n % 100;
      const mod10 = n % 10;
      if (mod100 >= 11 && mod100 <= 19) return "тиражей";
      if (mod10 === 1) return "тираж";
      if (mod10 >= 2 && mod10 <= 4) return "тиража";
      return "тиражей";
    }
    function onPay() {
      if (selectedItems.value.length === 0) return;
    }
    async function refreshSession() {
      await session.value?.refetch?.();
    }
    useSeoMeta({
      title,
      description,
      ogTitle: title,
      ogDescription: description
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppCheckbox = __nuxt_component_3$1;
      const _component_CartItemRow = __nuxt_component_1;
      const _component_CartRecipient = __nuxt_component_2;
      const _component_CartPickup = __nuxt_component_3;
      const _component_CartSummary = __nuxt_component_4;
      const _component_AuthEntryModal = __nuxt_component_5$1;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "cart-page" }, _attrs))} data-v-cebca9af><div class="cart-page__container" data-v-cebca9af><div class="cart-page__header" data-v-cebca9af><button class="back-link" type="button" data-v-cebca9af><svg class="back-link__icon" viewBox="0 0 16 16" fill="none" data-v-cebca9af><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-cebca9af></path></svg><span class="back-link__text" data-v-cebca9af>Продолжить покупки</span></button><h1 class="cart-page__title" data-v-cebca9af> Корзина </h1></div><div class="cart-page__content" data-v-cebca9af><div class="left-column" data-v-cebca9af>`);
      if (!unref(sessionUser) && !unref(isSessionPending)) {
        _push(`<div class="auth-prompt app-card" data-v-cebca9af><p class="auth-prompt__title" data-v-cebca9af> Войдите или зарегистрируйтесь </p><p class="auth-prompt__text" data-v-cebca9af> Вы сможете отслеживать статус заказа<br data-v-cebca9af> и пользоваться преимуществами личного кабинета </p><button class="auth-prompt__button" type="button" data-v-cebca9af> Вход или регистрация </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(cartItems).length === 0) {
        _push(`<div class="${ssrRenderClass([!unref(sessionUser) && !unref(isSessionPending) ? "card--mid" : "card--top", "card app-card"])}" data-v-cebca9af><div class="card__inner empty-state" data-v-cebca9af><p class="empty-state__title" data-v-cebca9af> Корзина пуста </p><p class="empty-state__subtitle" data-v-cebca9af> Воспользуйтесь каталогом, чтобы найти всё что нужно </p><button class="empty-state__btn" type="button" data-v-cebca9af> Начать покупки </button></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([!unref(sessionUser) && !unref(isSessionPending) ? "card--mid" : "card--top", "card app-card"])}" data-v-cebca9af><div class="card__inner" data-v-cebca9af><p class="section-title" data-v-cebca9af> Товары </p><div class="items-header" data-v-cebca9af><div class="items-header__left" data-v-cebca9af>`);
        _push(ssrRenderComponent(_component_AppCheckbox, {
          modelValue: unref(allSelected),
          "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null
        }, null, _parent));
        _push(`<span class="items-header__count" data-v-cebca9af>${ssrInterpolate(unref(cartItems).length)} ${ssrInterpolate(pluralItems(unref(cartItems).length))}</span></div><button class="items-header__delete" aria-label="Удалить выбранные тиражи" data-v-cebca9af><svg class="items-header__delete-icon" viewBox="0 0 16 16" fill="none" data-v-cebca9af><path d="M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z" fill="currentColor" fill-opacity="0.64" data-v-cebca9af></path><path d="M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z" fill="currentColor" fill-opacity="0.64" data-v-cebca9af></path></svg><span data-v-cebca9af>Удалить</span></button></div><div class="items-list" data-v-cebca9af><!--[-->`);
        ssrRenderList(unref(cartItems), (item) => {
          _push(ssrRenderComponent(_component_CartItemRow, {
            key: item.id,
            item,
            editing: unref(editingId) === item.id,
            onToggle: ($event) => toggleItem(item),
            onStartEdit: ($event) => startEdit(item.id),
            onCancelEdit: cancelEdit,
            onConfirmEdit: (config) => confirmEdit(item.id, config),
            onUpdateQuantity: (qty) => unref(updateQuantity)(item.id, qty)
          }, null, _parent));
        });
        _push(`<!--]--></div></div></div>`);
      }
      if (unref(cartItems).length > 0) {
        _push(ssrRenderComponent(_component_CartRecipient, {
          "pay-as-legal": unref(payAsLegal),
          "onUpdate:payAsLegal": ($event) => isRef(payAsLegal) ? payAsLegal.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(cartItems).length > 0) {
        _push(ssrRenderComponent(_component_CartPickup, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right-column" data-v-cebca9af>`);
      _push(ssrRenderComponent(_component_CartSummary, {
        "total-items": unref(selectedTotalItems),
        "total-price": unref(selectedTotalPrice),
        "pay-as-legal": unref(payAsLegal),
        "pay-disabled": unref(selectedItems).length === 0,
        onPay
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_AuthEntryModal, {
        modelValue: unref(isAuthEntryOpen),
        "onUpdate:modelValue": ($event) => isRef(isAuthEntryOpen) ? isAuthEntryOpen.value = $event : null,
        onCompleteLogin: refreshSession,
        onCompleteRegistration: refreshSession
      }, null, _parent));
      _push(`</main>`);
    };
  }
};
const _sfc_setup = _sfc_main.setup;
_sfc_main.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("pages/cart.vue");
  return _sfc_setup ? _sfc_setup(props, ctx) : void 0;
};
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-cebca9af"]]);

export { cart as default };
//# sourceMappingURL=cart-2jLYjMjY.mjs.map

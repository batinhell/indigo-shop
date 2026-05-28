import { _ as __nuxt_component_3$1, a as __nuxt_component_2$1 } from './QuantityInput-B4TIyuzV.mjs';
import { computed, ref, mergeProps, unref, isRef, watch, useModel, withCtx, createTextVNode, createVNode, toDisplayString, openBlock, createBlock, createCommentVNode, mergeModels, useSSRContext } from 'vue';
import { ssrRenderAttrs, ssrRenderClass, ssrRenderComponent, ssrInterpolate, ssrRenderList, ssrRenderAttr, ssrIncludeBooleanAttr, ssrLooseEqual } from 'vue/server-renderer';
import { _ as _export_sfc, d as useCart, v as useClientAuthSession, e as useSeoMeta, w as __nuxt_component_5$1, h as __vite_glob_0_37, n as getFabricLabel, o as calcUnitPrice, p as calcDesignPrice, F as FABRICS, M as MOUNTINGS, S as SIZES, q as formatPriceRaw, s as useProfileStore, a as __nuxt_component_0$2, f as __nuxt_component_1$1 } from './server.mjs';
import { _ as __nuxt_component_0 } from './AppInput-BaFx_Bai.mjs';
import { _ as __nuxt_component_0$1 } from './AppSwitch-B6KdDVqJ.mjs';
import { storeToRefs } from 'pinia';
import { Z as getRegistrationEmailError, aE as isInvoiceEmailPending } from '../nitro/nitro.mjs';
import { _ as __nuxt_component_0$3 } from './BaseModal-BftXcfSw.mjs';
import { _ as __nuxt_component_0$4 } from './AppButton-nx9v3pel.mjs';
import 'perfect-debounce';
import '@vue/shared';
import 'tailwindcss/colors';
import '@iconify/vue';
import 'reka-ui';
import '@vueuse/core';
import 'tailwind-variants';
import '@iconify/utils/lib/css/icon';
import '../routes/renderer.mjs';
import 'vue-bundle-renderer/runtime';
import 'unhead/server';
import 'devalue';
import 'unhead/plugins';
import 'unhead/utils';
import 'node:fs/promises';
import 'kysely';
import 'node:child_process';
import 'node:path';
import 'better-auth';
import 'better-auth/plugins';
import 'mysql2';
import 'node:http';
import 'node:https';
import 'node:events';
import 'node:buffer';
import 'node:fs';
import 'node:crypto';
import 'node:url';
import '@iconify/utils';
import 'consola';
import './Modal-iOm1f04o.mjs';

const _sfc_main$6 = {
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
    const itemImage = computed(() => props.item.image || __vite_glob_0_37);
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
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "item-row" }, _attrs))} data-v-e04f9a42>`);
      _push(ssrRenderComponent(_component_AppCheckbox, {
        "model-value": __props.item.selected,
        "onUpdate:modelValue": ($event) => emit("toggle")
      }, null, _parent));
      _push(`<div class="item-row__product" data-v-e04f9a42><div class="item-row__image-wrap" data-v-e04f9a42><img${ssrRenderAttr("src", unref(itemImage))}${ssrRenderAttr("alt", __props.item.name)} class="item-row__image" data-v-e04f9a42></div><div class="item-row__details" data-v-e04f9a42><div class="item-row__top" data-v-e04f9a42><div class="item-row__info" data-v-e04f9a42><p class="item-row__name" data-v-e04f9a42>${ssrInterpolate(__props.item.name)}</p>`);
      if (!__props.editing) {
        _push(`<div class="item-row__meta" data-v-e04f9a42><p class="item-row__desc" data-v-e04f9a42>${ssrInterpolate(__props.item.description)}</p>`);
        if (__props.item.customerComment) {
          _push(`<p class="item-row__note" data-v-e04f9a42>${ssrInterpolate(__props.item.customerComment)}</p>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div>`);
      } else {
        _push(`<div class="item-row__edit-options" data-v-e04f9a42><div class="inline-select" role="listbox" data-v-e04f9a42><span class="inline-select__text" data-v-e04f9a42>${ssrInterpolate(labelFor(unref(FABRICS), unref(editDraft).fabric))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "fabric")} data-v-e04f9a42><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-e04f9a42></path></svg>`);
        if (unref(openDropdown) === "fabric") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-e04f9a42><!--[-->`);
          ssrRenderList(unref(FABRICS), (f) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", f.value === unref(editDraft).fabric)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": f.value === unref(editDraft).fabric }])}" data-v-e04f9a42>${ssrInterpolate(f.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-e04f9a42><span class="inline-select__text" data-v-e04f9a42>${ssrInterpolate(labelFor(unref(MOUNTINGS), unref(editDraft).mounting))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "mounting")} data-v-e04f9a42><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-e04f9a42></path></svg>`);
        if (unref(openDropdown) === "mounting") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-e04f9a42><!--[-->`);
          ssrRenderList(unref(MOUNTINGS), (m) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", m.value === unref(editDraft).mounting)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": m.value === unref(editDraft).mounting }])}" data-v-e04f9a42>${ssrInterpolate(m.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><div class="inline-select" role="listbox" data-v-e04f9a42><span class="inline-select__text" data-v-e04f9a42>${ssrInterpolate(labelFor(unref(SIZES), unref(editDraft).size))}</span><svg class="inline-select__chevron" viewBox="0 0 9 5" fill="none"${ssrRenderAttr("aria-expanded", unref(openDropdown) === "size")} data-v-e04f9a42><path d="M1 1l3.28 3.28L7.56 1" stroke="currentColor" stroke-width="1.2" stroke-linecap="round" stroke-linejoin="round" data-v-e04f9a42></path></svg>`);
        if (unref(openDropdown) === "size") {
          _push(`<div class="inline-select__dropdown" role="listbox" data-v-e04f9a42><!--[-->`);
          ssrRenderList(unref(SIZES), (s) => {
            _push(`<button role="option"${ssrRenderAttr("aria-selected", s.value === unref(editDraft).size)} class="${ssrRenderClass(["inline-select__option", { "inline-select__option--active": s.value === unref(editDraft).size }])}" data-v-e04f9a42>${ssrInterpolate(s.label)}</button>`);
          });
          _push(`<!--]--></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`</div><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).hasFringe }])}" data-v-e04f9a42>бахрома</span><span class="${ssrRenderClass(["inline-toggle", { "inline-toggle--off": !unref(editDraft).doubleSided }])}" data-v-e04f9a42>печать с двух сторон</span></div>`);
      }
      _push(`</div>`);
      if (!__props.editing) {
        _push(`<button class="item-edit-badge" data-v-e04f9a42>Изменить</button>`);
      } else {
        _push(`<div class="item-row__edit-actions" data-v-e04f9a42><button class="edit-action edit-action--cancel" aria-label="Отменить редактирование" data-v-e04f9a42><svg viewBox="0 0 8.56 8.56" fill="none" data-v-e04f9a42><path fill-rule="evenodd" clip-rule="evenodd" d="M4.28 5.34L7.5 8.56l1.06-1.06L5.34 4.28 8.56 1.06 7.5 0 4.28 3.22 1.06 0 0 1.06l3.22 3.22L0 7.5l1.06 1.06L4.28 5.34Z" fill="#E12E3C" data-v-e04f9a42></path></svg></button><button class="edit-action edit-action--confirm" aria-label="Подтвердить изменения" data-v-e04f9a42><svg viewBox="0 0 9.75 7.55" fill="none" data-v-e04f9a42><path fill-rule="evenodd" clip-rule="evenodd" d="M9.75 1.2L4.65 7.22a1 1 0 0 1-.7.33 1 1 0 0 1-.71-.32L0 3.53l1.4-1.22 2.53 2.9L8.33 0 9.75 1.2Z" fill="#008A0B" data-v-e04f9a42></path></svg></button></div>`);
      }
      _push(`</div><div class="item-row__bottom" data-v-e04f9a42>`);
      _push(ssrRenderComponent(_component_QuantityInput, {
        "model-value": __props.item.quantity,
        "onUpdate:modelValue": (qty) => emit("update-quantity", qty)
      }, null, _parent));
      _push(`<div class="item-row__price" data-v-e04f9a42>`);
      if (__props.editing && unref(previewPrice)) {
        _push(`<!--[--><p class="item-row__total" data-v-e04f9a42>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).total))} ₽</p><p class="item-row__unit-price" data-v-e04f9a42>${ssrInterpolate(unref(formatPriceRaw)(unref(previewPrice).unit))} ₽ / шт</p><!--]-->`);
      } else {
        _push(`<!--[--><p class="item-row__total" data-v-e04f9a42>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice * __props.item.quantity + __props.item.designPrice))} ₽</p><p class="item-row__unit-price" data-v-e04f9a42>${ssrInterpolate(unref(formatPriceRaw)(__props.item.unitPrice))} ₽ / шт</p><!--]-->`);
      }
      _push(`</div></div></div></div></div>`);
    };
  }
};
const _sfc_setup$6 = _sfc_main$6.setup;
_sfc_main$6.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartItemRow.vue");
  return _sfc_setup$6 ? _sfc_setup$6(props, ctx) : void 0;
};
const __nuxt_component_1 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$6, [["__scopeId", "data-v-e04f9a42"]]), { __name: "CartItemRow" });
const ORGANIZATION_SUGGEST_DELAY = 350;
const _sfc_main$5 = {
  __name: "CartRecipient",
  __ssrInlineRender: true,
  props: {
    "payAsLegal": { type: Boolean, default: false },
    "payAsLegalModifiers": {},
    "checkoutData": { type: Object, default: () => ({}) },
    "checkoutDataModifiers": {}
  },
  emits: ["update:payAsLegal", "update:checkoutData"],
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
    const checkoutData = useModel(__props, "checkoutData");
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
    const selectedOrganization = computed(() => displayOrganizations.value.find((organization) => organization.id === selectedOrganizationId.value) || null);
    const shouldShowOrganizationSuggestions = computed(() => isOrganizationSuggestionsOpen.value && (isOrganizationSuggestPending.value || Boolean(organizationSuggestError.value) || organizationSuggestions.value.length > 0));
    watch(user, (value) => {
      userName.value = value?.name || "";
      userPhone.value = value?.phoneNumber || "";
      userEmail.value = value?.email || "";
      userContact.value = value?.additionalContact || "";
    }, { immediate: true });
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
    watch([
      userName,
      userPhone,
      userEmail,
      userContact,
      anotherPerson,
      anotherName,
      anotherPhone,
      payAsLegal,
      selectedOrganization
    ], () => {
      checkoutData.value = {
        customer: {
          name: userName.value.trim(),
          phone: userPhone.value.trim(),
          email: userEmail.value.trim(),
          additionalContact: userContact.value.trim()
        },
        recipient: {
          type: anotherPerson.value ? "another" : "self",
          name: anotherPerson.value ? anotherName.value.trim() : userName.value.trim(),
          phone: anotherPerson.value ? anotherPhone.value.trim() : userPhone.value.trim()
        },
        organization: payAsLegal.value && selectedOrganization.value ? {
          id: selectedOrganization.value.id,
          name: selectedOrganization.value.name,
          inn: selectedOrganization.value.inn,
          kpp: selectedOrganization.value.kpp,
          address: selectedOrganization.value.address
        } : null,
        payment: {
          payerType: payAsLegal.value ? "legal" : "person"
        }
      };
    }, { immediate: true, deep: true });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_AppInput = __nuxt_component_0;
      const _component_AppSwitch = __nuxt_component_0$1;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "personal-data-card app-card" }, _attrs))} data-v-60324590><div class="personal-data-card__inner" data-v-60324590><p class="section-title" data-v-60324590> Данные пользователя </p><div class="personal-data-form" data-v-60324590><div class="field-list" data-v-60324590><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Имя</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userName),
        "onUpdate:modelValue": ($event) => isRef(userName) ? userName.value = $event : null
      }, null, _parent));
      _push(`</div><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Номер телефона</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userPhone),
        "onUpdate:modelValue": ($event) => isRef(userPhone) ? userPhone.value = $event : null,
        class: "field-input field-input--phone",
        mask: "+7(###)-###-##-##"
      }, null, _parent));
      _push(`</div><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Электронная почта</label><div class="field-control" data-v-60324590>`);
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
        _push(`<p id="cart-user-email-error" class="field-error" data-v-60324590>${ssrInterpolate(unref(userEmailError))}</p>`);
      } else {
        _push(`<!---->`);
      }
      _push(`</div></div><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Дополнительный контакт</label>`);
      _push(ssrRenderComponent(_component_AppInput, {
        modelValue: unref(userContact),
        "onUpdate:modelValue": ($event) => isRef(userContact) ? userContact.value = $event : null
      }, null, _parent));
      _push(`</div></div><div class="switch-row" data-v-60324590><span class="switch-row__label" data-v-60324590>Заберёт другой человек</span>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: unref(anotherPerson),
        "onUpdate:modelValue": ($event) => isRef(anotherPerson) ? anotherPerson.value = $event : null
      }, null, _parent));
      _push(`</div>`);
      if (unref(anotherPerson)) {
        _push(`<div class="field-list" data-v-60324590><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Имя</label>`);
        _push(ssrRenderComponent(_component_AppInput, {
          modelValue: unref(anotherName),
          "onUpdate:modelValue": ($event) => isRef(anotherName) ? anotherName.value = $event : null
        }, null, _parent));
        _push(`</div><div class="field-row" data-v-60324590><label class="field-label" data-v-60324590>Номер телефона</label>`);
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
      _push(`<div class="switch-row" data-v-60324590><span class="switch-row__label" data-v-60324590>Оплатить как Юрлицо</span>`);
      _push(ssrRenderComponent(_component_AppSwitch, {
        modelValue: payAsLegal.value,
        "onUpdate:modelValue": ($event) => payAsLegal.value = $event
      }, null, _parent));
      _push(`</div>`);
      if (payAsLegal.value) {
        _push(`<div class="legal-section" data-v-60324590>`);
        if (unref(shouldShowOrganizationList)) {
          _push(`<div class="organization-row" data-v-60324590><p class="field-label organization-row__label" data-v-60324590> Выбрать организацию </p><div class="organization-list" data-v-60324590><!--[-->`);
          ssrRenderList(unref(displayOrganizations), (organization) => {
            _push(`<label class="${ssrRenderClass([{ "organization-option--active": unref(selectedOrganizationId) === organization.id }, "organization-option"])}" data-v-60324590><input${ssrIncludeBooleanAttr(ssrLooseEqual(unref(selectedOrganizationId), organization.id)) ? " checked" : ""} class="organization-option__input" type="radio"${ssrRenderAttr("value", organization.id)} data-v-60324590><span class="organization-option__top" data-v-60324590><span class="organization-option__radio" data-v-60324590></span><button class="organization-option__remove" type="button" data-v-60324590> Удалить </button></span><span class="organization-option__content" data-v-60324590><span class="organization-option__name" data-v-60324590>${ssrInterpolate(organization.name)}</span><span class="organization-option__meta" data-v-60324590>${ssrInterpolate(organization.innLabel)}</span>`);
            if (organization.address) {
              _push(`<span class="organization-option__meta" data-v-60324590>${ssrInterpolate(organization.address)}</span>`);
            } else {
              _push(`<!---->`);
            }
            _push(`</span></label>`);
          });
          _push(`<!--]--></div></div>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<div class="add-organization" data-v-60324590><div class="add-organization__text" data-v-60324590><p class="add-organization__title" data-v-60324590> Добавить организацию </p><p class="add-organization__subtitle" data-v-60324590> Чтобы платить безналом<br data-v-60324590> и пользоваться ЭДО </p></div>`);
        if (!unref(isAddOrganizationMode)) {
          _push(`<button class="add-button" type="button" data-v-60324590><span class="add-button__icon" data-v-60324590>+</span><span data-v-60324590>Добавить</span></button>`);
        } else {
          _push(`<div class="add-organization__control" data-v-60324590>`);
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
            _push(`<div class="add-organization__options" data-v-60324590>`);
            if (unref(isOrganizationSuggestPending)) {
              _push(`<p class="add-organization__status" data-v-60324590> Ищем организацию </p>`);
            } else if (unref(organizationSuggestError)) {
              _push(`<p class="add-organization__status add-organization__status--error" data-v-60324590>${ssrInterpolate(unref(organizationSuggestError))}</p>`);
            } else {
              _push(`<!--[-->`);
              ssrRenderList(unref(organizationSuggestions), (suggestion) => {
                _push(`<button type="button" class="add-organization__option" data-v-60324590><span class="add-organization__option-name" data-v-60324590>${ssrInterpolate(suggestion.name)}</span>`);
                if (suggestion.inn) {
                  _push(`<span class="add-organization__option-meta" data-v-60324590> ИНН ${ssrInterpolate(suggestion.inn)}</span>`);
                } else {
                  _push(`<!---->`);
                }
                if (suggestion.address) {
                  _push(`<span class="add-organization__option-meta" data-v-60324590>${ssrInterpolate(suggestion.address)}</span>`);
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
const _sfc_setup$5 = _sfc_main$5.setup;
_sfc_main$5.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartRecipient.vue");
  return _sfc_setup$5 ? _sfc_setup$5(props, ctx) : void 0;
};
const __nuxt_component_2 = /* @__PURE__ */ _export_sfc(_sfc_main$5, [["__scopeId", "data-v-60324590"]]);
const _sfc_main$4 = {};
function _sfc_ssrRender(_ctx, _push, _parent, _attrs) {
  _push(`<div${ssrRenderAttrs(mergeProps({ class: "card card--bottom app-card" }, _attrs))} data-v-4eceec81><div class="card__inner" data-v-4eceec81><div class="pickup-header" data-v-4eceec81><p class="section-title" data-v-4eceec81> Откуда забрать заказ </p><div class="pickup-address" data-v-4eceec81><a href="https://yandex.ru/maps/-/CHEbFD2T" target="_blank" rel="noopener noreferrer" class="ext-link" data-v-4eceec81> ДНР, Донецк, ул. Постышева, дом 60 <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none" data-v-4eceec81><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" data-v-4eceec81></path></svg></a><p class="pickup-schedule" data-v-4eceec81> Пн–Пт 9:00–18:00, Сб 10:00–15:00 </p></div></div><div class="map-container" data-v-4eceec81><iframe src="https://yandex.ru/map-widget/v1/?ll=37.802556%2C48.002076&amp;z=12&amp;pt=37.802556%2C48.002076%2Cpm2rdm" class="map-iframe" sandbox="allow-scripts allow-same-origin" allowfullscreen title="Карта с адресом самовывоза" data-v-4eceec81></iframe></div><p class="pickup-note" data-v-4eceec81> Для онлайн заказов доступна только доставка самовывозом. Мы работаем над тем чтобы организовать курьерскую доставку. </p></div></div>`);
}
const _sfc_setup$4 = _sfc_main$4.setup;
_sfc_main$4.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartPickup.vue");
  return _sfc_setup$4 ? _sfc_setup$4(props, ctx) : void 0;
};
const __nuxt_component_3 = /* @__PURE__ */ Object.assign(_export_sfc(_sfc_main$4, [["ssrRender", _sfc_ssrRender], ["__scopeId", "data-v-4eceec81"]]), { __name: "CartPickup" });
const helpMailIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2016%2013.9999'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Icon'%3e%3cpath%20d='M0%205.85492C0%205.47251%200.411829%205.23165%200.745131%205.41914L7.01948%208.94846C7.6283%209.29092%208.3717%209.29092%208.98052%208.94846L15.2549%205.41914C15.5882%205.23165%2016%205.47251%2016%205.85492V10.9999C16%2012.6568%2014.6569%2013.9999%2013%2013.9999H3C1.34315%2013.9999%200%2012.6568%200%2010.9999V5.85492Z'%20fill='%23DE7AFF'/%3e%3cpath%20d='M1.93435%200H14.0656C15.134%200%2016%200.866038%2016%201.93435C16%202.28376%2015.8115%202.60601%2015.507%202.77732L8.49026%206.72423C8.18585%206.89546%207.81415%206.89546%207.50974%206.72423L0.493007%202.77732C0.188465%202.60601%200%202.28376%200%201.93435C0%200.866038%200.866038%200%201.93435%200Z'%20fill='%23DE7AFF'/%3e%3c/g%3e%3c/svg%3e";
const helpPhoneIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2014.8414%2014.8414'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cpath%20id='Icon'%20d='M13.1029%209.37002L13.8779%2010.145C14.1105%2010.3776%2014.2269%2010.494%2014.3102%2010.598C15.1072%2011.593%2014.9955%2013.0358%2014.0547%2013.8962C13.9564%2013.9861%2013.8235%2014.0832%2013.5578%2014.2772C13.4575%2014.3505%2013.7083%2014.1673%2013.5565%2014.2618C12.5073%2014.9151%209.98721%2015.045%208.87646%2014.503C8.71575%2014.4246%209.5612%2014.9175%209.22302%2014.7204C7.94449%2013.975%206.1978%2012.7305%204.15432%2010.6871C2.11085%208.64359%200.866399%206.8969%200.121036%205.61837C-0.0761173%205.28019%200.416766%206.12564%200.33835%205.96493C-0.203614%204.85418%20-0.073733%202.33405%200.579545%201.28491C0.674066%201.13311%200.490888%201.38392%200.564159%201.2836C0.758227%201.01787%200.855262%200.885011%200.945172%200.786703C1.8056%20-0.154097%203.24841%20-0.265849%204.24344%200.531237C4.34741%200.614528%204.46375%200.730864%204.69642%200.963535L5.47137%201.73849C6.18343%202.45054%206.35167%203.54203%205.88709%204.43546C5.42251%205.32888%205.59076%206.42037%206.30281%207.13243L7.70896%208.53858C8.42102%209.25063%209.51251%209.41888%2010.4059%208.9543C11.2994%208.48972%2012.3908%208.65796%2013.1029%209.37002Z'%20fill='var(--fill-0,%20white)'/%3e%3c/svg%3e";
const _sfc_main$3 = {
  __name: "CartSummary",
  __ssrInlineRender: true,
  props: {
    totalItems: { type: Number, default: 0 },
    totalPrice: { type: Number, default: 0 },
    payDisabled: { type: Boolean, default: false },
    payAsLegal: { type: Boolean, default: false },
    payPending: { type: Boolean, default: false }
  },
  emits: ["pay"],
  setup(__props, { emit: __emit }) {
    const props = __props;
    const payButtonLabel = computed(() => {
      if (props.payPending) return props.payAsLegal ? "Формируем счёт" : "Создаём оплату";
      return props.payAsLegal ? "Оплатить по счету" : "Оплатить по СБП";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(`<div${ssrRenderAttrs(mergeProps({ class: "sidebar-sticky" }, _attrs))} data-v-94c0558c>`);
      if (__props.totalItems === 0) {
        _push(`<div class="summary-card summary-card--empty app-card" data-v-94c0558c><p class="section-title" data-v-94c0558c> Пусто </p><button class="pay-btn pay-btn--empty" type="button" disabled data-v-94c0558c> Оплатить заказ </button></div>`);
      } else {
        _push(`<div class="summary-card app-card" data-v-94c0558c><p class="section-title" data-v-94c0558c> Товары </p><div class="summary-rows" data-v-94c0558c><div class="summary-row" data-v-94c0558c><span class="summary-row__label" data-v-94c0558c>Товары (${ssrInterpolate(__props.totalItems)})</span><span class="summary-row__value" data-v-94c0558c>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><div class="summary-row" data-v-94c0558c><span class="summary-row__label" data-v-94c0558c>Доставка</span><span class="summary-row__value" data-v-94c0558c>Самовывоз</span></div></div><div class="summary-divider" data-v-94c0558c></div><div class="summary-total" data-v-94c0558c><span class="summary-total__label" data-v-94c0558c>К оплате</span><span class="summary-total__value" data-v-94c0558c>${ssrInterpolate(unref(formatPriceRaw)(__props.totalPrice))} ₽</span></div><button class="${ssrRenderClass([{ "pay-btn--pending": __props.payPending }, "pay-btn"])}"${ssrIncludeBooleanAttr(__props.payDisabled || __props.payPending) ? " disabled" : ""} data-v-94c0558c>`);
        if (__props.payPending) {
          _push(`<span class="pay-btn__spinner" aria-hidden="true" data-v-94c0558c></span>`);
        } else {
          _push(`<!---->`);
        }
        _push(`<span data-v-94c0558c>${ssrInterpolate(unref(payButtonLabel))}</span></button><p class="summary-consent" data-v-94c0558c> Нажимая на кнопку, вы соглашаетесь `);
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
      _push(`<div class="help-card app-card" data-v-94c0558c><div class="help-card__info" data-v-94c0558c><div class="help-card__text" data-v-94c0558c><p class="help-card__title" data-v-94c0558c> Нужна помощь с заказом? </p><p class="help-card__subtitle" data-v-94c0558c> Напишите нам на почту или позвоните администратору </p></div></div><div class="help-card__actions" data-v-94c0558c><a href="mailto:info@indigo-mail.ru" class="help-card__action help-card__action--mail" aria-label="Написать на почту" data-v-94c0558c><img${ssrRenderAttr("src", unref(helpMailIcon))} class="help-card__icon" alt="" aria-hidden="true" data-v-94c0558c></a><a href="tel:+79491314544" class="help-card__action help-card__action--phone" aria-label="Позвонить администратору" data-v-94c0558c><img${ssrRenderAttr("src", unref(helpPhoneIcon))} class="help-card__icon" alt="" aria-hidden="true" data-v-94c0558c></a></div></div></div>`);
    };
  }
};
const _sfc_setup$3 = _sfc_main$3.setup;
_sfc_main$3.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/cart/CartSummary.vue");
  return _sfc_setup$3 ? _sfc_setup$3(props, ctx) : void 0;
};
const __nuxt_component_4 = /* @__PURE__ */ _export_sfc(_sfc_main$3, [["__scopeId", "data-v-94c0558c"]]);
const lockIcon = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2012%2016'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='Icon'%3e%3cpath%20d='M0%209C0%207.34315%201.34315%206%203%206H9C10.6569%206%2012%207.34315%2012%209V13C12%2014.6569%2010.6569%2016%209%2016H3C1.34315%2016%200%2014.6569%200%2013V9Z'%20fill='var(--fill-0,%20%230ABD5D)'/%3e%3cpath%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6%202C4.89543%202%204%202.89543%204%204V7H2V4C2%201.79086%203.79086%200%206%200C8.20914%200%2010%201.79086%2010%204V7H8V4C8%202.89543%207.10457%202%206%202Z'%20fill='%230ABD5D'/%3e%3c/g%3e%3c/svg%3e";
const qrPlaceholder = "" + __buildAssetsURL("qr-base.CKZU5BqH.svg");
const vtbLogo = "data:image/svg+xml,%3csvg%20preserveAspectRatio='none'%20width='100%25'%20height='100%25'%20overflow='visible'%20style='display:%20block;'%20viewBox='0%200%2080%2028.9655'%20fill='none'%20xmlns='http://www.w3.org/2000/svg'%3e%3cg%20id='vtb_logo'%20clip-path='url(%23clip0_5022_16816)'%3e%3cpath%20id='Vector'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M6.0271%200.698074L4.69191%204.36134H23.1947L24.5299%200.698074H6.0271ZM4.02389%206.19213L2.6887%209.85456H21.1915L22.5267%206.19213H4.02389ZM2.02485%2011.6862L0.689655%2015.3486H19.1925L20.5268%2011.6862H2.02485Z'%20fill='var(--fill-0,%20%2300AAFF)'/%3e%3cpath%20id='Vector_2'%20fill-rule='evenodd'%20clip-rule='evenodd'%20d='M40.0249%2016.7447V16.822C40.8704%2017.1329%2041.6781%2017.6765%2042.1014%2018.0256C43.4089%2019.1128%2043.9861%2020.549%2043.9861%2022.4126C43.9861%2025.4805%2042.3706%2027.6931%2039.7169%2028.3921C38.9092%2028.6248%2038.0637%2028.703%2036.4861%2028.703H28.4492V6.2627H35.5639C37.0255%206.2627%2038.025%206.33999%2038.9092%206.57269C41.4864%207.27173%2043.1784%209.05797%2043.1784%2011.8914C43.1784%2013.4059%2042.6399%2014.6876%2041.7557%2015.5412C41.3712%2015.9293%2040.8327%2016.3956%2040.0249%2016.7447ZM32.9102%2019.1128V25.0142H35.9871C36.9092%2025.0142%2037.7557%2024.9369%2038.3718%2024.3542C38.9867%2023.7716%2039.256%2023.0343%2039.256%2022.0635C39.256%2021.3262%2039.0632%2020.6272%2038.6787%2020.1227C38.025%2019.3073%2037.2172%2019.1128%2035.8332%2019.1128H32.9102ZM32.8715%2015.2303H35.3713C36.1403%2015.2303%2036.5248%2015.2303%2036.9092%2015.1139C37.9485%2014.8031%2038.6022%2013.8722%2038.6022%2012.5905C38.6022%2011.0769%2037.9097%2010.4161%2036.9092%2010.1061C36.4861%209.98971%2036.0637%209.95065%2035.2173%209.95065H32.8715V15.2303ZM50.6775%2028.703V10.0279H44.2554V6.2627H62.1001L60.8314%2010.0279H55.1388V28.703H50.6775ZM63.4841%2028.703V6.2627H77.9449L76.6762%2010.0279H67.9073V14.9976H71.484C74.3682%2014.9976%2075.8684%2015.6966%2076.9067%2016.5893C77.7144%2017.2883%2079.0987%2018.841%2079.0987%2021.9089C79.0987%2024.9369%2077.6756%2026.6059%2076.4834%2027.4603C75.0995%2028.4303%2073.638%2028.703%2070.6762%2028.703H63.4841ZM67.9073%2024.9369H71.2535C72.5222%2024.9369%2073.2912%2024.626%2073.8297%2023.927C74.0989%2023.5779%2074.4834%2022.9562%2074.4834%2021.7917C74.4834%2020.6272%2074.0989%2019.8118%2073.33%2019.2291C72.869%2018.88%2072.253%2018.6864%2071.2147%2018.6864H67.9073V24.9369Z'%20fill='var(--fill-0,%20%230A2896)'/%3e%3c/g%3e%3cdefs%3e%3cclipPath%20id='clip0_5022_16816'%3e%3crect%20width='80'%20height='28.9655'%20fill='white'/%3e%3c/clipPath%3e%3c/defs%3e%3c/svg%3e";
const _sfc_main$2 = {
  __name: "PaymentQrModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    amount: {
      type: Number,
      default: 13900
    },
    expiresIn: {
      type: String,
      default: "14:32"
    },
    qrImage: {
      type: String,
      default: ""
    },
    qrPayload: {
      type: String,
      default: ""
    },
    status: {
      type: String,
      default: "idle"
    },
    error: {
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
    const props = __props;
    const formattedAmount = computed(() => `${new Intl.NumberFormat("ru-RU").format(props.amount)} ₽`);
    const isLoading = computed(() => props.status === "loading");
    const isPaid = computed(() => props.status === "paid");
    const isFailed = computed(() => ["failed", "expired"].includes(props.status));
    const qrSource = computed(() => {
      const value = props.qrImage.trim();
      if (!value) return qrPlaceholder;
      if (value.startsWith("data:image") || value.startsWith("http")) return value;
      if (value.startsWith("<svg")) return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(value)}`;
      return `data:image/png;base64,${value}`;
    });
    const statusText = computed(() => {
      if (isLoading.value) return "Готовим QR-код";
      if (isPaid.value) return "Оплата получена";
      if (props.status === "expired") return "QR-код истёк";
      if (props.status === "failed") return "Оплата не прошла";
      return "Наведите камеру телефона на QR-код";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0$3;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        "show-header": false,
        "max-width": "22.125rem",
        "wrapper-class": "modal-wrapper--fit payment-modal-wrapper"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            _push2(`<section class="payment-qr-card" data-v-08826ce4${_scopeId}><div class="payment-qr-card__top" data-v-08826ce4${_scopeId}><div class="payment-qr-card__amount" data-v-08826ce4${_scopeId}><p class="payment-qr-card__label" data-v-08826ce4${_scopeId}> Итого к оплате: </p><p class="payment-qr-card__price" data-v-08826ce4${_scopeId}>${ssrInterpolate(unref(formattedAmount))}</p></div><p class="payment-qr-card__timer" data-v-08826ce4${_scopeId}> Осталось ${ssrInterpolate(__props.expiresIn)}</p></div><div class="payment-qr-card__qr-block" data-v-08826ce4${_scopeId}><p class="payment-qr-card__hint" data-v-08826ce4${_scopeId}>${ssrInterpolate(unref(statusText))}</p><div class="payment-qr-card__qr-frame" data-v-08826ce4${_scopeId}>`);
            if (unref(isLoading)) {
              _push2(`<div class="payment-qr-card__loader" data-v-08826ce4${_scopeId}></div>`);
            } else {
              _push2(`<img${ssrRenderAttr("src", unref(qrSource))} alt="QR-код для оплаты" class="payment-qr-card__qr" data-v-08826ce4${_scopeId}>`);
            }
            _push2(`</div>`);
            if (__props.qrPayload && !unref(isPaid) && !unref(isFailed)) {
              _push2(`<a${ssrRenderAttr("href", __props.qrPayload)} class="payment-qr-card__pay-link" target="_blank" rel="noopener noreferrer" data-v-08826ce4${_scopeId}> Открыть в банковском приложении </a>`);
            } else {
              _push2(`<!---->`);
            }
            if (__props.error) {
              _push2(`<p class="payment-qr-card__error" data-v-08826ce4${_scopeId}>${ssrInterpolate(__props.error)}</p>`);
            } else {
              _push2(`<!---->`);
            }
            _push2(`</div><div class="payment-qr-card__footer" data-v-08826ce4${_scopeId}><div class="payment-qr-card__lock" aria-hidden="true" data-v-08826ce4${_scopeId}><img${ssrRenderAttr("src", unref(lockIcon))} alt="" data-v-08826ce4${_scopeId}></div><p class="payment-qr-card__secure-text" data-v-08826ce4${_scopeId}> Платежи обрабатывает ВТБ.<br data-v-08826ce4${_scopeId}> Мы не получаем и не храним ваши банковские данные. </p><img${ssrRenderAttr("src", unref(vtbLogo))} alt="ВТБ" class="payment-qr-card__vtb" data-v-08826ce4${_scopeId}></div></section>`);
          } else {
            return [
              createVNode("section", { class: "payment-qr-card" }, [
                createVNode("div", { class: "payment-qr-card__top" }, [
                  createVNode("div", { class: "payment-qr-card__amount" }, [
                    createVNode("p", { class: "payment-qr-card__label" }, " Итого к оплате: "),
                    createVNode("p", { class: "payment-qr-card__price" }, toDisplayString(unref(formattedAmount)), 1)
                  ]),
                  createVNode("p", { class: "payment-qr-card__timer" }, " Осталось " + toDisplayString(__props.expiresIn), 1)
                ]),
                createVNode("div", { class: "payment-qr-card__qr-block" }, [
                  createVNode("p", { class: "payment-qr-card__hint" }, toDisplayString(unref(statusText)), 1),
                  createVNode("div", { class: "payment-qr-card__qr-frame" }, [
                    unref(isLoading) ? (openBlock(), createBlock("div", {
                      key: 0,
                      class: "payment-qr-card__loader"
                    })) : (openBlock(), createBlock("img", {
                      key: 1,
                      src: unref(qrSource),
                      alt: "QR-код для оплаты",
                      class: "payment-qr-card__qr"
                    }, null, 8, ["src"]))
                  ]),
                  __props.qrPayload && !unref(isPaid) && !unref(isFailed) ? (openBlock(), createBlock("a", {
                    key: 0,
                    href: __props.qrPayload,
                    class: "payment-qr-card__pay-link",
                    target: "_blank",
                    rel: "noopener noreferrer"
                  }, " Открыть в банковском приложении ", 8, ["href"])) : createCommentVNode("", true),
                  __props.error ? (openBlock(), createBlock("p", {
                    key: 1,
                    class: "payment-qr-card__error"
                  }, toDisplayString(__props.error), 1)) : createCommentVNode("", true)
                ]),
                createVNode("div", { class: "payment-qr-card__footer" }, [
                  createVNode("div", {
                    class: "payment-qr-card__lock",
                    "aria-hidden": "true"
                  }, [
                    createVNode("img", {
                      src: unref(lockIcon),
                      alt: ""
                    }, null, 8, ["src"])
                  ]),
                  createVNode("p", { class: "payment-qr-card__secure-text" }, [
                    createTextVNode(" Платежи обрабатывает ВТБ."),
                    createVNode("br"),
                    createTextVNode(" Мы не получаем и не храним ваши банковские данные. ")
                  ]),
                  createVNode("img", {
                    src: unref(vtbLogo),
                    alt: "ВТБ",
                    class: "payment-qr-card__vtb"
                  }, null, 8, ["src"])
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
const _sfc_setup$2 = _sfc_main$2.setup;
_sfc_main$2.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/PaymentQrModal.vue");
  return _sfc_setup$2 ? _sfc_setup$2(props, ctx) : void 0;
};
const __nuxt_component_6 = /* @__PURE__ */ _export_sfc(_sfc_main$2, [["__scopeId", "data-v-08826ce4"]]);
const _sfc_main$1 = {
  __name: "InvoiceSuccessModal",
  __ssrInlineRender: true,
  props: /* @__PURE__ */ mergeModels({
    invoice: {
      type: Object,
      default: null
    }
  }, {
    "modelValue": { type: Boolean, required: true },
    "modelModifiers": {}
  }),
  emits: /* @__PURE__ */ mergeModels(["download"], ["update:modelValue"]),
  setup(__props, { emit: __emit }) {
    const isOpen = useModel(__props, "modelValue");
    const props = __props;
    const emit = __emit;
    const seller = computed(() => props.invoice?.seller || {});
    const payer = computed(() => props.invoice?.payer || {});
    const emailStatusPrefix = computed(() => {
      if (!props.invoice) return "";
      if (props.invoice.emailSent) {
        return `Счёт отправлен на ${props.invoice.customerEmail || "email"} и доступен `;
      }
      if (isInvoiceEmailPending(props.invoice.emailStatus)) {
        return `Счёт отправляем на ${props.invoice.customerEmail || "email"}. Он уже доступен `;
      }
      return "Счёт не удалось отправить на почту, скачайте PDF вручную. Он также доступен ";
    });
    return (_ctx, _push, _parent, _attrs) => {
      const _component_BaseModal = __nuxt_component_0$3;
      const _component_AppIcon = __nuxt_component_1$1;
      const _component_AppButton = __nuxt_component_0$4;
      const _component_NuxtLink = __nuxt_component_0$2;
      _push(ssrRenderComponent(_component_BaseModal, mergeProps({
        modelValue: isOpen.value,
        "onUpdate:modelValue": ($event) => isOpen.value = $event,
        "show-header": false,
        "max-width": "22.125rem",
        "wrapper-class": "modal-wrapper--fit invoice-modal-wrapper",
        "overlay-class": "bg-[rgba(4,18,27,0.74)]"
      }, _attrs), {
        default: withCtx((_, _push2, _parent2, _scopeId) => {
          if (_push2) {
            if (__props.invoice) {
              _push2(`<section class="invoice-card" data-v-c88301fe${_scopeId}><div class="invoice-card__top" data-v-c88301fe${_scopeId}><div class="invoice-card__icon" data-v-c88301fe${_scopeId}>`);
              _push2(ssrRenderComponent(_component_AppIcon, {
                name: "invoice-time",
                size: "24",
                class: "invoice-card__icon-svg"
              }, null, _parent2, _scopeId));
              _push2(`</div><p class="invoice-card__term" data-v-c88301fe${_scopeId}> Срок поступления средств 1-3 дня </p></div><h2 class="invoice-card__title" data-v-c88301fe${_scopeId}> Счёт <span data-v-c88301fe${_scopeId}>№${ssrInterpolate(__props.invoice.number)}</span> сформирован и ожидает оплаты </h2><div class="invoice-card__preview" data-v-c88301fe${_scopeId}><div class="invoice-card__row" data-v-c88301fe${_scopeId}><p class="invoice-card__label" data-v-c88301fe${_scopeId}> Поставщик: </p><p class="invoice-card__value" data-v-c88301fe${_scopeId}>${ssrInterpolate(unref(seller).name)}<br data-v-c88301fe${_scopeId}> ИНН ${ssrInterpolate(unref(seller).inn)}</p></div><div class="invoice-card__row" data-v-c88301fe${_scopeId}><p class="invoice-card__label" data-v-c88301fe${_scopeId}> Покупатель: </p><p class="invoice-card__value" data-v-c88301fe${_scopeId}>${ssrInterpolate(unref(payer).name)}<br data-v-c88301fe${_scopeId}> ИНН ${ssrInterpolate(unref(payer).inn)}</p></div><div class="invoice-card__divider" data-v-c88301fe${_scopeId}></div><div class="invoice-card__row" data-v-c88301fe${_scopeId}><p class="invoice-card__label" data-v-c88301fe${_scopeId}> К оплате: </p><p class="invoice-card__value" data-v-c88301fe${_scopeId}>${ssrInterpolate(Number(__props.invoice.amount || 0).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 }))} ₽,<br data-v-c88301fe${_scopeId}> без НДС </p></div></div>`);
              _push2(ssrRenderComponent(_component_AppButton, {
                class: "invoice-card__button",
                size: "m",
                onClick: ($event) => emit("download")
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` Скачать счёт в PDF `);
                  } else {
                    return [
                      createTextVNode(" Скачать счёт в PDF ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`<p class="invoice-card__note" data-v-c88301fe${_scopeId}>${ssrInterpolate(unref(emailStatusPrefix))} `);
              _push2(ssrRenderComponent(_component_NuxtLink, {
                to: "/profile?tab=orders",
                class: "invoice-card__note-link"
              }, {
                default: withCtx((_2, _push3, _parent3, _scopeId2) => {
                  if (_push3) {
                    _push3(` в Личном кабинете `);
                  } else {
                    return [
                      createTextVNode(" в Личном кабинете ")
                    ];
                  }
                }),
                _: 1
              }, _parent2, _scopeId));
              _push2(`</p></section>`);
            } else {
              _push2(`<!---->`);
            }
          } else {
            return [
              __props.invoice ? (openBlock(), createBlock("section", {
                key: 0,
                class: "invoice-card"
              }, [
                createVNode("div", { class: "invoice-card__top" }, [
                  createVNode("div", { class: "invoice-card__icon" }, [
                    createVNode(_component_AppIcon, {
                      name: "invoice-time",
                      size: "24",
                      class: "invoice-card__icon-svg"
                    })
                  ]),
                  createVNode("p", { class: "invoice-card__term" }, " Срок поступления средств 1-3 дня ")
                ]),
                createVNode("h2", { class: "invoice-card__title" }, [
                  createTextVNode(" Счёт "),
                  createVNode("span", null, "№" + toDisplayString(__props.invoice.number), 1),
                  createTextVNode(" сформирован и ожидает оплаты ")
                ]),
                createVNode("div", { class: "invoice-card__preview" }, [
                  createVNode("div", { class: "invoice-card__row" }, [
                    createVNode("p", { class: "invoice-card__label" }, " Поставщик: "),
                    createVNode("p", { class: "invoice-card__value" }, [
                      createTextVNode(toDisplayString(unref(seller).name), 1),
                      createVNode("br"),
                      createTextVNode(" ИНН " + toDisplayString(unref(seller).inn), 1)
                    ])
                  ]),
                  createVNode("div", { class: "invoice-card__row" }, [
                    createVNode("p", { class: "invoice-card__label" }, " Покупатель: "),
                    createVNode("p", { class: "invoice-card__value" }, [
                      createTextVNode(toDisplayString(unref(payer).name), 1),
                      createVNode("br"),
                      createTextVNode(" ИНН " + toDisplayString(unref(payer).inn), 1)
                    ])
                  ]),
                  createVNode("div", { class: "invoice-card__divider" }),
                  createVNode("div", { class: "invoice-card__row" }, [
                    createVNode("p", { class: "invoice-card__label" }, " К оплате: "),
                    createVNode("p", { class: "invoice-card__value" }, [
                      createTextVNode(toDisplayString(Number(__props.invoice.amount || 0).toLocaleString("ru-RU", { minimumFractionDigits: 2, maximumFractionDigits: 2 })) + " ₽,", 1),
                      createVNode("br"),
                      createTextVNode(" без НДС ")
                    ])
                  ])
                ]),
                createVNode(_component_AppButton, {
                  class: "invoice-card__button",
                  size: "m",
                  onClick: ($event) => emit("download")
                }, {
                  default: withCtx(() => [
                    createTextVNode(" Скачать счёт в PDF ")
                  ]),
                  _: 1
                }, 8, ["onClick"]),
                createVNode("p", { class: "invoice-card__note" }, [
                  createTextVNode(toDisplayString(unref(emailStatusPrefix)) + " ", 1),
                  createVNode(_component_NuxtLink, {
                    to: "/profile?tab=orders",
                    class: "invoice-card__note-link"
                  }, {
                    default: withCtx(() => [
                      createTextVNode(" в Личном кабинете ")
                    ]),
                    _: 1
                  })
                ])
              ])) : createCommentVNode("", true)
            ];
          }
        }),
        _: 1
      }, _parent));
    };
  }
};
const _sfc_setup$1 = _sfc_main$1.setup;
_sfc_main$1.setup = (props, ctx) => {
  const ssrContext = useSSRContext();
  (ssrContext.modules || (ssrContext.modules = /* @__PURE__ */ new Set())).add("components/InvoiceSuccessModal.vue");
  return _sfc_setup$1 ? _sfc_setup$1(props, ctx) : void 0;
};
const __nuxt_component_7 = /* @__PURE__ */ _export_sfc(_sfc_main$1, [["__scopeId", "data-v-c88301fe"]]);
const title = "Корзина — Indigo";
const description = "Корзина заказов типографии Indigo.";
const _sfc_main = {
  __name: "cart",
  __ssrInlineRender: true,
  setup(__props) {
    const { items: cartItems, updateQuantity, updateItem, clearCart } = useCart();
    const session = useClientAuthSession();
    const selectedItems = computed(() => cartItems.value.filter((item) => item.selected));
    const sessionUser = computed(() => session.value?.data?.user ?? null);
    const isSessionPending = computed(() => session.value?.isPending ?? true);
    ref(false);
    const payAsLegal = ref(false);
    const isPaymentQrOpen = ref(false);
    const payment = ref(null);
    const paymentStatus = ref("idle");
    const paymentError = ref("");
    const checkoutData = ref({});
    const isPayPending = ref(false);
    const isInvoiceSuccessOpen = ref(false);
    const invoice = ref(null);
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
    async function uploadOrderFiles(order) {
      const files = selectedItems.value.flatMap((item) => Array.isArray(item.uploadedFiles) ? item.uploadedFiles : []);
      if (!files.length) return;
      const formData = new FormData();
      formData.append("accessToken", order.accessToken || "");
      files.forEach((file) => {
        formData.append("files", file);
      });
      await $fetch(`/api/orders/${order.id}/files`, {
        method: "POST",
        body: formData
      });
    }
    async function createCheckoutOrder() {
      const result = await $fetch("/api/orders", {
        method: "POST",
        body: {
          items: selectedItems.value,
          amount: selectedTotalPrice.value,
          checkout: checkoutData.value
        }
      });
      await uploadOrderFiles(result.order);
      return result.order;
    }
    async function startInvoicePayment(order) {
      const result = await $fetch("/api/payments/invoice/start", {
        method: "POST",
        body: {
          orderId: order.id,
          accessToken: order.accessToken
        }
      });
      invoice.value = result.invoice;
      isInvoiceSuccessOpen.value = true;
      paymentStatus.value = "pending";
    }
    async function startSbpPayment(order) {
      isPaymentQrOpen.value = true;
      const result = await $fetch("/api/payments/vtb-sbp/start", {
        method: "POST",
        body: {
          orderId: order.id,
          accessToken: order.accessToken,
          amount: order.amount
        }
      });
      payment.value = result.payment;
      paymentStatus.value = result.payment?.status ?? "pending";
    }
    async function startPayment(order) {
      if (payAsLegal.value) {
        await startInvoicePayment(order);
        return;
      }
      await startSbpPayment(order);
    }
    async function onPay() {
      if (selectedItems.value.length === 0 || isPayPending.value) return;
      isPayPending.value = true;
      paymentStatus.value = "loading";
      paymentError.value = "";
      try {
        const order = await createCheckoutOrder();
        await startPayment(order);
        clearCart();
      } catch (error) {
        paymentStatus.value = "failed";
        paymentError.value = error?.data?.message || error?.message || "Не удалось создать оплату";
      } finally {
        isPayPending.value = false;
      }
    }
    function downloadInvoice() {
      if (!invoice.value?.downloadUrl) return;
      (void 0).open(invoice.value.downloadUrl, "_blank", "noopener");
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
      const _component_ClientOnly = __nuxt_component_5$1;
      const _component_PaymentQrModal = __nuxt_component_6;
      const _component_InvoiceSuccessModal = __nuxt_component_7;
      _push(`<main${ssrRenderAttrs(mergeProps({ class: "cart-page" }, _attrs))} data-v-12ce4f5f><div class="cart-page__container" data-v-12ce4f5f><div class="cart-page__header" data-v-12ce4f5f><button class="back-link" type="button" data-v-12ce4f5f><svg class="back-link__icon" viewBox="0 0 16 16" fill="none" data-v-12ce4f5f><path d="M10 12L6 8L10 4" stroke="currentColor" stroke-width="1.5" stroke-linecap="round" stroke-linejoin="round" data-v-12ce4f5f></path></svg><span class="back-link__text" data-v-12ce4f5f>Продолжить покупки</span></button><h1 class="cart-page__title" data-v-12ce4f5f> Корзина </h1></div><div class="cart-page__content" data-v-12ce4f5f><div class="left-column" data-v-12ce4f5f>`);
      if (!unref(sessionUser) && !unref(isSessionPending)) {
        _push(`<div class="auth-prompt app-card" data-v-12ce4f5f><p class="auth-prompt__title" data-v-12ce4f5f> Войдите или зарегистрируйтесь </p><p class="auth-prompt__text" data-v-12ce4f5f> Вы сможете отслеживать статус заказа<br data-v-12ce4f5f> и пользоваться преимуществами личного кабинета </p><button class="auth-prompt__button" type="button" data-v-12ce4f5f> Вход или регистрация </button></div>`);
      } else {
        _push(`<!---->`);
      }
      if (unref(cartItems).length === 0) {
        _push(`<div class="${ssrRenderClass([!unref(sessionUser) && !unref(isSessionPending) ? "card--mid" : "card--top", "card app-card"])}" data-v-12ce4f5f><div class="card__inner empty-state" data-v-12ce4f5f><p class="empty-state__title" data-v-12ce4f5f> Корзина пуста </p><p class="empty-state__subtitle" data-v-12ce4f5f> Воспользуйтесь каталогом, чтобы найти всё что нужно </p><button class="empty-state__btn" type="button" data-v-12ce4f5f> Начать покупки </button></div></div>`);
      } else {
        _push(`<div class="${ssrRenderClass([!unref(sessionUser) && !unref(isSessionPending) ? "card--mid" : "card--top", "card app-card"])}" data-v-12ce4f5f><div class="card__inner" data-v-12ce4f5f><p class="section-title" data-v-12ce4f5f> Товары </p><div class="items-header" data-v-12ce4f5f><div class="items-header__left" data-v-12ce4f5f>`);
        _push(ssrRenderComponent(_component_AppCheckbox, {
          modelValue: unref(allSelected),
          "onUpdate:modelValue": ($event) => isRef(allSelected) ? allSelected.value = $event : null
        }, null, _parent));
        _push(`<span class="items-header__count" data-v-12ce4f5f>${ssrInterpolate(unref(cartItems).length)} ${ssrInterpolate(pluralItems(unref(cartItems).length))}</span></div><button class="items-header__delete" aria-label="Удалить выбранные тиражи" data-v-12ce4f5f><svg class="items-header__delete-icon" viewBox="0 0 16 16" fill="none" data-v-12ce4f5f><path d="M2 7H14L13.4744 11.7301C13.3067 13.24 13.2228 13.995 12.8745 14.5647C12.5677 15.0666 12.1201 15.4672 11.5874 15.7168C10.9826 16 10.223 16 8.70379 16H7.29621C5.77697 16 5.01735 16 4.41263 15.7168C3.87993 15.4672 3.43233 15.0666 3.12552 14.5647C2.77722 13.995 2.69333 13.24 2.52556 11.7301L2 7Z" fill="currentColor" fill-opacity="0.64" data-v-12ce4f5f></path><path d="M1 3.5C1 2.67157 1.67157 2 2.5 2C3.32843 2 3.97177 1.24281 4.53657 0.636766C4.90168 0.244995 5.42223 0 6 0H10C10.5778 0 11.0983 0.244995 11.4634 0.636766C12.0282 1.24281 12.6716 2 13.5 2C14.3284 2 15 2.67157 15 3.5C15 4.32843 14.3284 5 13.5 5H2.5C1.67157 5 1 4.32843 1 3.5Z" fill="currentColor" fill-opacity="0.64" data-v-12ce4f5f></path></svg><span data-v-12ce4f5f>Удалить</span></button></div><div class="items-list" data-v-12ce4f5f><!--[-->`);
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
          "onUpdate:payAsLegal": ($event) => isRef(payAsLegal) ? payAsLegal.value = $event : null,
          "checkout-data": unref(checkoutData),
          "onUpdate:checkoutData": ($event) => isRef(checkoutData) ? checkoutData.value = $event : null
        }, null, _parent));
      } else {
        _push(`<!---->`);
      }
      if (unref(cartItems).length > 0) {
        _push(ssrRenderComponent(_component_CartPickup, null, null, _parent));
      } else {
        _push(`<!---->`);
      }
      _push(`</div><div class="right-column" data-v-12ce4f5f>`);
      _push(ssrRenderComponent(_component_CartSummary, {
        "total-items": unref(selectedTotalItems),
        "total-price": unref(selectedTotalPrice),
        "pay-as-legal": unref(payAsLegal),
        "pay-disabled": unref(selectedItems).length === 0,
        "pay-pending": unref(isPayPending),
        onPay
      }, null, _parent));
      _push(`</div></div></div>`);
      _push(ssrRenderComponent(_component_ClientOnly, null, {}, _parent));
      _push(ssrRenderComponent(_component_PaymentQrModal, {
        modelValue: unref(isPaymentQrOpen),
        "onUpdate:modelValue": ($event) => isRef(isPaymentQrOpen) ? isPaymentQrOpen.value = $event : null,
        amount: unref(payment)?.amount ?? unref(selectedTotalPrice),
        "qr-image": unref(payment)?.qrImage ?? "",
        "qr-payload": unref(payment)?.qrPayload ?? "",
        status: unref(paymentStatus),
        error: unref(paymentError)
      }, null, _parent));
      _push(ssrRenderComponent(_component_InvoiceSuccessModal, {
        modelValue: unref(isInvoiceSuccessOpen),
        "onUpdate:modelValue": ($event) => isRef(isInvoiceSuccessOpen) ? isInvoiceSuccessOpen.value = $event : null,
        invoice: unref(invoice),
        onDownload: downloadInvoice
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
const cart = /* @__PURE__ */ _export_sfc(_sfc_main, [["__scopeId", "data-v-12ce4f5f"]]);

export { cart as default };
//# sourceMappingURL=cart-HHWjWpjM.mjs.map

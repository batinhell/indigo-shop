<script setup>
const props = defineProps({
  image: {
    type: String,
    default: ''
  },
  images: {
    type: Array,
    default: () => []
  },
  title: {
    type: String,
    default: 'Название товара в две-три строки, две-три строки'
  }
})

defineEmits(['remove'])

const activeImage = computed(() => props.images.find(Boolean) || props.image || '')
</script>

<template>
  <article class="profile-favorite-card app-card">
    <div class="profile-favorite-card__media">
      <img
        v-if="activeImage"
        :src="activeImage"
        :alt="title"
        class="profile-favorite-card__image"
      >
      <div
        v-else
        class="profile-favorite-card__image profile-favorite-card__image--empty"
      >
        <UIcon name="i-lucide-image" />
      </div>

      <div class="profile-favorite-card__overlay">
        <AppFavoriteButton
          active
          @change="$emit('remove')"
        />
      </div>
    </div>

    <div class="profile-favorite-card__content">
      <h3 class="profile-favorite-card__title">
        {{ title }}
      </h3>
    </div>
  </article>
</template>

<style scoped>
.profile-favorite-card {
  display: flex;
  flex-direction: column;
  min-width: 0;
  overflow: hidden;
  width: 100%;
}

.profile-favorite-card__media {
  aspect-ratio: 1 / 1;
  border-radius: 1rem;
  overflow: hidden;
  position: relative;
  width: 100%;
}

.profile-favorite-card__image {
  display: block;
  height: 100%;
  object-fit: cover;
  width: 100%;
}

.profile-favorite-card__image--empty {
  align-items: center;
  background: rgba(4, 18, 27, 0.08);
  color: rgba(4, 18, 27, 0.3);
  display: flex;
  justify-content: center;
}

.profile-favorite-card__overlay {
  display: flex;
  inset: 0;
  justify-content: flex-end;
  padding: 0.75rem;
  position: absolute;
}

.profile-favorite-card__content {
  background: #ffffff;
  padding: 0.5rem 0.5rem 1rem;
}

.profile-favorite-card__title {
  color: #04121b;
  font-size: 0.875rem;
  font-weight: 700;
  line-height: 1.125rem;
  margin: 0;
}
</style>

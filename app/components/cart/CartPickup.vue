<template>
  <div class="card card--bottom">
    <div class="card__inner">
      <div class="pickup-header">
        <p class="section-title">Откуда забрать заказ</p>
        <div class="pickup-address">
          <a
            href="https://yandex.ru/maps/-/CHEbFD2T"
            target="_blank"
            rel="noopener noreferrer"
            class="ext-link"
          >
            ДНР, Донецк, ул. Постышева, дом 60
            <svg class="ext-link__icon" viewBox="0 0 12 12" fill="none"><path d="M2.619 6.261a.804.804 0 0 1-1.17 0 .805.805 0 0 1-.001-.826L5.526 1.698H2.95a.569.569 0 0 1-.568-.572c.002-.312.256-.564.568-.564h4.288c.138 0 .25.112.25.25v4.285a.571.571 0 0 1-1.142 0l.007-2.572L2.619 6.26Z" fill="currentColor" /></svg>
          </a>
          <p class="pickup-schedule">Пн–Пт 9:00–18:00, Сб 10:00–15:00</p>
        </div>
      </div>

      <div class="map-container">
        <iframe
          src="https://yandex.ru/map-widget/v1/?ll=37.802556%2C48.002076&z=12&pt=37.802556%2C48.002076%2Cpm2rdm"
          class="map-iframe"
          sandbox="allow-scripts allow-same-origin"
          allowfullscreen
          title="Карта с адресом самовывоза"
        />
      </div>

      <p class="pickup-note">
        Для онлайн заказов доступна только доставка самовывозом. Мы работаем над тем чтобы организовать курьерскую доставку.
      </p>
    </div>
  </div>
</template>

<style lang="scss" scoped>
.card--bottom {
  background: white;
  border-radius: $radius-card $radius-card $radius-main $radius-main;
}

.card__inner {
  display: flex;
  flex-direction: column;
  gap: 1rem;
  padding: 2rem 1.5rem;
}

.section-title {
  font-size: 1.625rem;
  font-weight: 700;
  line-height: 1.75rem;
  letter-spacing: -0.02em;
  color: $color-base;
}

.pickup-header {
  display: flex;
  flex-direction: column;
  gap: 0.75rem;
}

.pickup-address {
  display: flex;
  flex-direction: column;
  gap: 0.25rem;
}

.ext-link {
  display: flex;
  align-items: flex-start;
  gap: 0.125rem;
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;
  color: $color-primary;
  padding-left: 0.125rem;

  &__icon {
    width: 0.75rem;
    height: 0.75rem;
    flex-shrink: 0;
    margin-top: 0.125rem;
  }
}

.pickup-schedule {
  font-size: 1rem;
  font-weight: 600;
  line-height: 1.5rem;
  letter-spacing: -0.01em;
  color: $color-base-secondary;
}

.map-container {
  width: 100%;
  aspect-ratio: 16 / 10;
  border-radius: $radius-card;
  overflow: hidden;
}

.map-iframe {
  width: 100%;
  height: 100%;
  border: none;
}

.pickup-note {
  font-size: 0.75rem;
  font-weight: 600;
  line-height: 1rem;
  color: $color-base-secondary;
  opacity: 0.8;
  font-feature-settings: 'lnum' 1, 'pnum' 1;
}
</style>

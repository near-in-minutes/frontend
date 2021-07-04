<template>
  <h1>{{ t('navbar.authors') }}</h1>
</template>

<script>
import { useI18n } from 'vue-i18n';

export default {
  setup() {
    const { t } = useI18n({ useScope: 'global' });

    return { t };
  }
};
</script>

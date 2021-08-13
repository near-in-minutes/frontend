<template>
  <div class="relative pt-64 pb-10 rounded-2xl shadow-xl overflow-hidden">
    <div>{{ CookieConsent }}</div>
  </div>
</template>

<script>
import CookieConsent from 'js-cookie-consent';
import 'js-cookie-consent/dist/css/styles.css';
export default {
  name: 'CookieLaw',
  setup() {
    const options = {
      cookieName: 'cookiesGDPR',
      message: 'This website uses 🍪 to ensure you get the best experience on our website.',
      options: [
        {
          title: 'Essential cookies',
          description: 'These cookies are strictly necessary to provide you with the best experience on our website.',
          key: 'essential',
          disabled: true,
          checked: true
        }
      ],
      learnMore: 'https://gdpr.eu/cookies/',
      expiration: 7,
      color: '#00C08B'
    };
    CookieConsent(options);
    return { CookieConsent };
  }
};
</script>

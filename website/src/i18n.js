import i18n from 'i18next'
import { initReactI18next } from 'react-i18next'

const resources = {
  en: {
    translation: {
      title: 'moonlightOS',
      subtitle: 'v7.0 — "The Return"',
      tagline: 'Arch-based KDE Plasma. Rolling release. NO HANDHOLDING.',
      features: {
        kde: 'KDE Plasma',
        kdeDesc: 'Rice is life. Deal with it.',
        rolling: 'Rolling Release',
        rollingDesc: 'Always broken, always updated.',
        noHand: 'NO HANDHOLDING',
        noHandDesc: 'Figure it out yourself.',
        lucifer: 'Lucifer',
        luciferDesc: 'Disapproves silently.',
      },
      download: 'Download ISO',
      viewGithub: 'View on GitHub',
      requirements: 'Requirements',
      building: 'Building',
      reqItems: {
        cpu: 'x86_64 CPU',
        ram: '4GB RAM (8GB recommended)',
        storage: '20GB storage',
        suffering: 'A tolerance for suffering',
      },
      buildCode: `sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`,
      footer: 'moonlightOS v7.0 — "The Return"',
      footerSub: 'We went back to Arch. We regret everything.',
    }
  },
  ja: {
    translation: {
      title: 'moonlightOS',
      subtitle: 'v7.0 — "帰還"',
      tagline: 'Archベース KDE Plasma。ローリングリリース。 手を出さない。',
      features: {
        kde: 'KDE Plasma',
        kdeDesc: '人生はライス。受け入れろ。',
        rolling: 'ローリングリリース',
        rollingDesc: '常に壊れて、常に更新。',
        noHand: '手を出さない',
        noHandDesc: '自分で解決しろ。',
        lucifer: 'ルシファー',
        luciferDesc: '静かに反対している。',
      },
      download: 'ISOをダウンロード',
      viewGithub: 'GitHubで見る',
      requirements: '必要環境',
      building: 'ビルド',
      reqItems: {
        cpu: 'x86_64 CPU',
        ram: '4GB RAM (8GB推奨)',
        storage: '20GB ストレージ',
        suffering: '辛抱強さ',
      },
      buildCode: `sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`,
      footer: 'moonlightOS v7.0 — "帰還"',
      footerSub: 'Archに戻った。全てを後悔している。',
    }
  },
  de: {
    translation: {
      title: 'moonlightOS',
      subtitle: 'v7.0 — "Die Rückkehr"',
      tagline: 'Arch-basiert mit KDE Plasma. Rolling Release. KEINE HILFE.',
      features: {
        kde: 'KDE Plasma',
        kdeDesc: 'Rice ist Leben. Deal with it.',
        rolling: 'Rolling Release',
        rollingDesc: 'Immer kaputt, immer aktualisiert.',
        noHand: 'KEINE HILFE',
        noHandDesc: 'Figure it out yourself.',
        lucifer: 'Lucifer',
        luciferDesc: 'Missbilligt stillschweigend.',
      },
      download: 'ISO herunterladen',
      viewGithub: 'Auf GitHub ansehen',
      requirements: 'Anforderungen',
      building: 'Build',
      reqItems: {
        cpu: 'x86_64 CPU',
        ram: '4GB RAM (8GB empfohlen)',
        storage: '20GB Speicher',
        suffering: 'Toleranz für Leiden',
      },
      buildCode: `sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`,
      footer: 'moonlightOS v7.0 — "Die Rückkehr"',
      footerSub: 'Wir sind zu Arch zurückgekehrt. Wir bereuen alles.',
    }
  },
  pl: {
    translation: {
      title: 'moonlightOS',
      subtitle: 'v7.0 — "Powrót"',
      tagline: 'Arch + KDE Plasma. Release ciągły. BRAK POMOCY.',
      features: {
        kde: 'KDE Plasma',
        kdeDesc: 'Rice to życie. Zaakceptuj to.',
        rolling: 'Rolling Release',
        rollingDesc: 'Zawsze zepsute, zawsze aktualne.',
        noHand: 'BRAK POMOCY',
        noHandDesc: 'Rozwiąż to sam.',
        lucifer: 'Lucifer',
        luciferDesc: 'Milcząco disapproval.',
      },
      download: 'Pobierz ISO',
      viewGithub: 'Zobacz na GitHub',
      requirements: 'Wymagania',
      building: 'Build',
      reqItems: {
        cpu: 'Procesor x86_64',
        ram: '4GB RAM (8GB zalecane)',
        storage: '20GB dysku',
        suffering: 'Tolerancja na cierpienie',
      },
      buildCode: `sudo pacman -S archiso
git clone https://github.com/moonlightOS-Meow/moonlightos-meow
cd moonlightos-meow
sudo mkarchiso -v -w /tmp/iso -o ./out releng`,
      footer: 'moonlightOS v7.0 — "Powrót"',
      footerSub: 'Wróciliśmy do Archa. Żałujemy wszystkiego.',
    }
  }
}

i18n
  .use(initReactI18next)
  .init({
    resources,
    lng: 'en',
    fallbackLng: 'en',
    interpolation: {
      escapeValue: false
    }
  })

export default i18n
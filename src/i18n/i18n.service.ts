import { Injectable } from '@nestjs/common';

const translations = {
  fa: {
    app: {
      title: 'ژنراتور رنگ از شعر',
      description: 'شعر فارسی خود را وارد کنید و پالت رنگی منحصر به فرد بگیرید',
    },
    emotions: {
      detected: 'احساس شناسایی شده',
      confidence: 'اطمینان',
    },
    actions: {
      analyze: 'تحلیل شعر',
      copyAll: 'کپی همه رنگ‌ها',
      download: 'دانلود پالت',
      save: 'ذخیره',
    },
  },
  en: {
    app: {
      title: 'Poetry Color Palette Generator',
      description: 'Enter your poetry and get a unique color palette',
    },
    emotions: {
      detected: 'Detected Emotion',
      confidence: 'Confidence',
    },
    actions: {
      analyze: 'Analyze Poetry',
      copyAll: 'Copy All Colors',
      download: 'Download Palette',
      save: 'Save',
    },
  },
};

@Injectable()
export class I18nService {
  translate(key: string, lang: string = 'en'): string {
    const keys = key.split('.');
    let value: any = translations[lang] || translations['en'];

    for (const k of keys) {
      value = value?.[k];
      if (!value) break;
    }

    return value || key;
  }

  getTranslations(lang: string = 'en') {
    return translations[lang] || translations['en'];
  }
}

import { useState } from 'react';
import { Button } from '@/components/ui/button';
import { Select, SelectContent, SelectItem, SelectTrigger, SelectValue } from '@/components/ui/select';
import { Globe } from 'lucide-react';

// Language configuration
export const languages = {
  en: {
    code: 'en',
    name: 'English',
    flag: '🇬🇧'
  },
  el: {
    code: 'el',
    name: 'Ελληνικά',
    flag: '🇬🇷'
  },
  tr: {
    code: 'tr',
    name: 'Türkçe',
    flag: '🇹🇷'
  }
};

// Translation hook (simplified for now)
export const useTranslation = () => {
  const [currentLanguage, setCurrentLanguage] = useState('en');

  const translations: Record<string, Record<string, string>> = {
    en: {
      'nav.home': 'Home',
      'nav.inventory': 'Inventory',
      'nav.finance': 'Finance',
      'nav.order': 'Order Car',
      'nav.contact': 'Contact',
      'hero.title': 'Find Your Perfect Car',
      'hero.subtitle': 'Premium vehicles with direct finance and import services',
      'cta.call': 'Call Now',
      'cta.whatsapp': 'WhatsApp',
      'footer.description': 'Your trusted car dealership in Ayia Napa, Cyprus. We offer direct finance, long-term leasing, and can import any car you desire.'
    },
    el: {
      'nav.home': 'Αρχική',
      'nav.inventory': 'Στόλος',
      'nav.finance': 'Χρηματοδότηση',
      'nav.order': 'Παραγγελία',
      'nav.contact': 'Επικοινωνία',
      'hero.title': 'Βρείτε το Τέλειο Αυτοκίνητο',
      'hero.subtitle': 'Αυτοκίνητα υψηλής ποιότητας με άμεση χρηματοδότηση',
      'cta.call': 'Καλέστε Τώρα',
      'cta.whatsapp': 'WhatsApp',
      'footer.description': 'Η αξιόπιστη αντιπροσωπεία αυτοκινήτων στην Αγία Νάπα, Κύπρος.'
    },
    tr: {
      'nav.home': 'Ana Sayfa',
      'nav.inventory': 'Araçlar',
      'nav.finance': 'Finansman',
      'nav.order': 'Araç Sipariş',
      'nav.contact': 'İletişim',
      'hero.title': 'Mükemmel Aracınızı Bulun',
      'hero.subtitle': 'Doğrudan finansman ve ithalat hizmetleri ile premium araçlar',
      'cta.call': 'Şimdi Ara',
      'cta.whatsapp': 'WhatsApp',
      'footer.description': 'Kıbrıs Ayia Napa\'da güvenilir araç bayiniz.'
    }
  };

  const t = (key: string): string => {
    return translations[currentLanguage]?.[key] || translations.en[key] || key;
  };

  return {
    t,
    currentLanguage,
    setLanguage: setCurrentLanguage,
    availableLanguages: languages
  };
};

const LanguageSwitcher = () => {
  const { currentLanguage, setLanguage, availableLanguages } = useTranslation();

  return (
    <Select value={currentLanguage} onValueChange={setLanguage}>
      <SelectTrigger className="w-auto bg-transparent border-gray-700 text-white">
        <div className="flex items-center space-x-2">
          <Globe size={16} />
          <span>{availableLanguages[currentLanguage as keyof typeof availableLanguages]?.flag}</span>
        </div>
      </SelectTrigger>
      <SelectContent>
        {Object.entries(availableLanguages).map(([code, lang]) => (
          <SelectItem key={code} value={code}>
            <div className="flex items-center space-x-2">
              <span>{lang.flag}</span>
              <span>{lang.name}</span>
            </div>
          </SelectItem>
        ))}
      </SelectContent>
    </Select>
  );
};

export default LanguageSwitcher;

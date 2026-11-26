import React, { useEffect, useMemo, useRef, useState } from 'react';
import {
  Coffee,
  Sparkles,
  CheckCircle2,
  ArrowRight,
  ArrowLeft,
  Upload,
  QrCode,
  Eye,
  Maximize2,
  X,
  ShieldCheck,
  Award,
  Layers,
  Clock,
  Phone,
  Mail,
  MapPin,
  Instagram,
  Globe,
  Building2,
  Utensils,
  Hotel,
  Heart,
  GraduationCap,
  Home as HomeIcon,
  ShoppingBag,
  CupSoda,
  Sliders,
  Lock,
  Unlock,
  FileText,
  Download,
  ExternalLink,
  Trash2,
  Palette,
  MessageSquare,
  Check,
  Menu,
} from 'lucide-react';

const STUDIO_PHONES = ['+91 89553 50925', '+91 78508 65397'];
const PRIMARY_WA = '918955350925';
const ADMIN_PIN = '2026';

const STORAGE_KEYS = {
  DRAFT: 'brandmycup_draft_v2',
  ENQUIRIES: 'brandmycup_enquiries_v2',
  ADMIN_AUTH: 'brandmycup_admin_auth_v2',
};

const CATEGORIES = [
  {
    id: 'cafe',
    title: 'Cafe & Coffee Shop',
    shortDesc: 'Espresso bars, roasteries & specialty cafes with menu QR and ordering links.',
    exampleBrand: 'Kaveri Roast House',
    tagline: 'Small-Batch Pour Over',
    accent: '#20372D',
    secondary: '#C5A46D',
    iconName: 'coffee',
    badge: 'Popular',
  },
  {
    id: 'tea',
    title: 'Tea & Chai Shop',
    shortDesc: 'Kulhad-inspired modern chai lounges, masala chai stalls & instant WhatsApp ordering.',
    exampleBrand: 'Adrak & Elaichi Chai Co.',
    tagline: 'Kadak Cutting & Kulhad Brew',
    accent: '#7C4A21',
    secondary: '#F4EFE5',
    iconName: 'cup',
    badge: 'High Volume',
  },
  {
    id: 'bakery',
    title: 'Bakery',
    shortDesc: 'Artisanal patisseries, sourdough studios & dessert counters with digital catalogues.',
    exampleBrand: 'Crumb & Butter Patisserie',
    tagline: 'Baked Fresh Every Dawn',
    accent: '#4A2C2A',
    secondary: '#E8D5B5',
    iconName: 'utensils',
    badge: 'Artisanal',
  },
  {
    id: 'restaurant',
    title: 'Restaurant',
    shortDesc: 'Fine dining takeaways, cloud kitchens & casual dining with live table/delivery QR.',
    exampleBrand: 'Saffron Courtyard Kitchen',
    tagline: 'Signature Culinary House',
    accent: '#242722',
    secondary: '#C5A46D',
    iconName: 'utensils',
    badge: 'Full Service',
  },
  {
    id: 'hotel',
    title: 'Hotel',
    shortDesc: 'Boutique hotels, luxury resorts & business stays with room service & concierge cups.',
    exampleBrand: 'The Aravalli Palace Hotel',
    tagline: 'Five-Star Hospitality',
    accent: '#1B2E26',
    secondary: '#D4B475',
    iconName: 'hotel',
    badge: 'Hospitality',
  },
  {
    id: 'wedding',
    title: 'Wedding & Events',
    shortDesc: 'Royal baraats, mehendi mornings, reception lounges & bespoke couple monograms.',
    exampleBrand: 'Aarav & Meera',
    tagline: 'Royal Wedding Celebrations',
    accent: '#5B1E2D',
    secondary: '#E7C888',
    iconName: 'heart',
    badge: 'Bespoke',
  },
  {
    id: 'coaching',
    title: 'Coaching & Education',
    shortDesc: 'Competitive exam institutes, universities & learning hubs with admission QR portals.',
    exampleBrand: 'Apex Scholars Academy',
    tagline: 'Excellence & Mentorship',
    accent: '#1E3A5F',
    secondary: '#E2C07D',
    iconName: 'grad',
    badge: 'Campus Ready',
  },
  {
    id: 'realestate',
    title: 'Real Estate & Construction',
    shortDesc: 'Luxury residences, townships & site offices with project brochures and site visit QR.',
    exampleBrand: 'Vardhman Greens Residency',
    tagline: 'Signature Living Spaces',
    accent: '#23312B',
    secondary: '#C5A46D',
    iconName: 'home',
    badge: 'Project Showcase',
  },
  {
    id: 'retail',
    title: 'Retail & Other Businesses',
    shortDesc: 'Fashion studios, salons, automotive lounges & lifestyle brands with catalogue QR.',
    exampleBrand: 'Noor Looms & Studio',
    tagline: 'Curated Lifestyle Experience',
    accent: '#242722',
    secondary: '#C5A46D',
    iconName: 'bag',
    badge: 'Versatile',
  },
];

const DESIGN_STYLES = [
  { id: 1, name: 'Minimal Editorial', tag: 'Clean & Airy' },
  { id: 2, name: 'Royal Champagne Luxury', tag: 'Gold & Crest' },
  { id: 3, name: 'Modern Geometric', tag: 'Crisp Lines' },
  { id: 4, name: 'Botanical & Nature', tag: 'Organic Leaf' },
  { id: 5, name: 'Heritage Arch & Crest', tag: 'Classic Frame' },
  { id: 6, name: 'Bold Typography Band', tag: 'High Impact' },
  { id: 7, name: 'Artisanal Monogram Stamp', tag: 'Seal & Emblem' },
  { id: 8, name: 'Skyline & Pillar Frame', tag: 'Architectural' },
  { id: 9, name: 'Festive & Celebration', tag: 'Occasion Rich' },
  { id: 10, name: 'Contemporary Studio Grid', tag: 'Editorial Block' },
];

const CUP_SIZES = [
  {
    ml: 65,
    label: '65 ml',
    title: 'Espresso & Cutting Chai',
    desc: 'Ideal for shot espressos, cutting chai, tasting pours & welcome shots.',
    heightPx: 112,
    topW: 78,
    botW: 54,
  },
  {
    ml: 110,
    label: '110 ml',
    title: 'Classic Tea, Coffee & Tasting',
    desc: 'Most popular for masala chai, cortados, hotel rooms & event hospitality.',
    heightPx: 136,
    topW: 88,
    botW: 60,
  },
  {
    ml: 150,
    label: '150 ml',
    title: 'Signature Hot Beverage & Lounge',
    desc: 'Generous wrap area for cappuccinos, lattes, hot chocolate & brand storytelling.',
    heightPx: 162,
    topW: 98,
    botW: 66,
  },
];

const COLOR_PRESETS = [
  { name: 'Forest Green', hex: '#20372D' },
  { name: 'Champagne Gold', hex: '#C5A46D' },
  { name: 'Royal Crimson', hex: '#6E1D2B' },
  { name: 'Midnight Navy', hex: '#182B49' },
  { name: 'Espresso Roast', hex: '#3D2314' },
  { name: 'Obsidian Charcoal', hex: '#242722' },
];

const LOGO_SYMBOLS = [
  'crown',
  'lotus',
  'cup',
  'leaf',
  'star',
  'arch',
  'diamond',
  'building',
  'sparkles',
  'heart',
  'award',
  'compass',
];

const DEFAULT_DRAFT = {
  categoryId: 'cafe',
  businessName: 'Kaveri Roast House',
  logoDataUrl: '',
  logoMeta: null,
  logoScale: 100,
  logoOffsetY: 0,
  logoBacking: true,
  primaryColor: '#20372D',
  secondaryColor: '#C5A46D',
  phone: '+91 89553 50925',
  instagram: '@kaveriroasthouse',
  website: 'https://kaveriroast.in',
  location: 'Vaishali Nagar, Jaipur',
  categoryDetails: {
    menuPdfName: '',
    menuUrl: 'https://kaveriroast.in/menu',
    orderingUrl: 'https://kaveriroast.in/order',
    whatsappNumber: '+91 89553 50925',
    catalogueUrl: 'https://kaveriroast.in/catalogue',
    bookingUrl: 'https://aravallipalace.in/book',
    hotelStars: '5-Star Luxury Resort',
    roomServiceExt: 'Dial 0 for In-Room Dining & Concierge',
    coupleNames: 'Aarav & Meera',
    eventName: 'Royal Wedding & Reception',
    eventDate: '14 Dec 2026',
    weddingHashtag: '#AaravKiMeera',
    ritualTag: 'Mehendi • Baraat • Sangeet',
    instituteName: 'Apex Scholars Academy',
    courseInfo: 'IIT-JEE, NEET & Foundation Batches',
    admissionUrl: 'https://apexscholars.in/admissions',
    projectName: 'Vardhman Greens Residency',
    propertyDetails: '3 & 4 BHK Sky Villas • Agra Road',
    enquiryUrl: 'https://vardhmangreens.in/visit',
    brandName: 'Noor Looms & Studio',
  },
  qrDestination: 'https://kaveriroast.in/menu',
  qrLabel: 'Scan for Menu & Offers',
  cupSize: 110,
  selectedDesignId: 2,
};

const INITIAL_ENQUIRIES = [
  {
    id: 'BMC-2026-104',
    createdAt: '2026-11-24 16:20',
    fullName: 'Rohan Malhotra',
    businessName: 'The Aravalli Palace Hotel',
    categoryId: 'hotel',
    phone: '+91 98290 44112',
    email: 'concierge@aravallipalace.in',
    deliveryCity: 'Jaipur',
    cupSize: 110,
    quantity: '10,000',
    selectedDesignId: 2,
    notes: 'Need golden foil look on warm cream cups for suite welcome trays and morning tea service.',
    enquiryStatus: 'Quoted',
    productionStatus: 'Artwork Proofing',
    deliveryStatus: 'Scheduled',
    snapshot: {
      ...DEFAULT_DRAFT,
      categoryId: 'hotel',
      businessName: 'The Aravalli Palace Hotel',
      primaryColor: '#20372D',
      secondaryColor: '#C5A46D',
      instagram: '@aravallipalacejaipur',
      location: 'Amer Road, Jaipur',
      cupSize: 110,
      selectedDesignId: 2,
      qrDestination: 'https://aravallipalace.in/concierge',
      categoryDetails: {
        ...DEFAULT_DRAFT.categoryDetails,
        hotelStars: '5-Star Heritage & Spa',
        roomServiceExt: 'Dial 9 for Suite Butler & Tea Lounge',
        bookingUrl: 'https://aravallipalace.in/book',
      },
    },
  },
  {
    id: 'BMC-2026-105',
    createdAt: '2026-11-25 11:05',
    fullName: 'Kavita Rathore',
    businessName: 'Aarav & Meera',
    categoryId: 'wedding',
    phone: '+91 97821 33908',
    email: 'kavita.events@gmail.com',
    deliveryCity: 'Udaipur',
    cupSize: 65,
    quantity: '5,000',
    selectedDesignId: 9,
    notes: 'For Haldi, Mehendi and Baraat welcome chai counters. Please keep couple names and hashtag prominent.',
    enquiryStatus: 'Confirmed',
    productionStatus: 'In Production',
    deliveryStatus: 'Packed',
    snapshot: {
      ...DEFAULT_DRAFT,
      categoryId: 'wedding',
      businessName: 'Aarav & Meera',
      primaryColor: '#5B1E2D',
      secondaryColor: '#E7C888',
      instagram: '@aaravkimeera2026',
      location: 'Fateh Sagar, Udaipur',
      cupSize: 65,
      selectedDesignId: 9,
      qrDestination: 'https://aaravkimeera.in/invite',
      categoryDetails: {
        ...DEFAULT_DRAFT.categoryDetails,
        coupleNames: 'Aarav & Meera',
        eventName: 'Royal Udaipur Wedding',
        eventDate: '12 Dec 2026',
        weddingHashtag: '#AaravKiMeera',
        ritualTag: 'Haldi • Mehendi • Baraat',
      },
    },
  },
  {
    id: 'BMC-2026-106',
    createdAt: '2026-11-26 09:45',
    fullName: 'Siddharth Jain',
    businessName: 'Kaveri Roast House',
    categoryId: 'cafe',
    phone: '+91 94140 88210',
    email: 'hello@kaveriroast.in',
    deliveryCity: 'Jaipur',
    cupSize: 150,
    quantity: '20,000',
    selectedDesignId: 4,
    notes: 'Botanical theme with QR pointing to our digital cafe menu and loyalty pass.',
    enquiryStatus: 'New',
    productionStatus: 'Pending Approval',
    deliveryStatus: 'Not Started',
    snapshot: {
      ...DEFAULT_DRAFT,
      categoryId: 'cafe',
      businessName: 'Kaveri Roast House',
      primaryColor: '#20372D',
      secondaryColor: '#C5A46D',
      cupSize: 150,
      selectedDesignId: 4,
    },
  },
];

function getContrastText(hex) {
  if (!hex || !hex.startsWith('#')) return '#FFFFFF';
  const clean = hex.replace('#', '');
  const full =
    clean.length === 3
      ? clean
          .split('')
          .map((c) => c + c)
          .join('')
      : clean.padEnd(6, '0').slice(0, 6);
  const r = parseInt(full.slice(0, 2), 16);
  const g = parseInt(full.slice(2, 4), 16);
  const b = parseInt(full.slice(4, 6), 16);
  const yiq = (r * 299 + g * 587 + b * 114) / 1000;
  return yiq >= 150 ? '#242722' : '#FFFFFF';
}

function fitHeadlineLines(text, maxCharsPerLine = 16, maxLines = 2) {
  const clean = (text || 'Your Brand').trim();
  const words = clean.split(/\s+/);
  const lines = [];
  let current = '';

  for (const word of words) {
    if (word.length > maxCharsPerLine) {
      if (current) {
        lines.push(current);
        current = '';
      }
      for (let i = 0; i < word.length; i += maxCharsPerLine) {
        lines.push(word.slice(i, i + maxCharsPerLine));
      }
      continue;
    }
    const candidate = current ? `${current} ${word}` : word;
    if (candidate.length <= maxCharsPerLine) {
      current = candidate;
    } else {
      lines.push(current);
      current = word;
    }
  }
  if (current) lines.push(current);

  if (lines.length <= maxLines) return lines;
  const sliced = lines.slice(0, maxLines);
  const last = sliced[maxLines - 1];
  sliced[maxLines - 1] = last.length > 3 ? `${last.slice(0, Math.max(1, maxCharsPerLine - 1))}…` : `${last}…`;
  return sliced;
}

function renderSymbolPath(symbol, strokeColor, fillColor) {
  switch (symbol) {
    case 'crown':
      return (
        <path
          d="M-13 6 L-16 -7 L-7 0 L0 -11 L7 0 L16 -7 L13 6 Z M-13 10 H13"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="2"
          strokeLinejoin="round"
        />
      );
    case 'lotus':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="1.8" strokeLinejoin="round">
          <path d="M0 -12 C5 -4, 5 5, 0 11 C-5 5, -5 -4, 0 -12 Z" />
          <path d="M-2 -9 C-11 -6, -15 3, -8 10 C-3 6, -2 0, -2 -9 Z" />
          <path d="M2 -9 C11 -6, 15 3, 8 10 C3 6, 2 0, 2 -9 Z" />
          <path d="M-14 12 Q0 15 14 12" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'cup':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round">
          <path d="M-11 -5 H9 V6 C9 11, 5 14, 0 14 C-5 14, -11 11, -11 6 Z" />
          <path d="M9 -2 H13 C15.5 -2, 16.5 4, 13 6 H9" fill="none" strokeLinecap="round" />
          <path d="M-5 -10 Q-3 -13 -5 -16 M2 -10 Q4 -13 2 -16" fill="none" strokeLinecap="round" />
        </g>
      );
    case 'leaf':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinecap="round" strokeLinejoin="round">
          <path d="M-12 9 C-12 -6, 2 -13, 13 -12 C13 0, 5 12, -12 9 Z" />
          <path d="M-13 11 L6 -5" fill="none" />
        </g>
      );
    case 'star':
      return (
        <polygon
          points="0,-14 4.2,-4.5 14.5,-3.6 6.7,3.2 9.1,13.3 0,7.9 -9.1,13.3 -6.7,3.2 -14.5,-3.6 -4.2,-4.5"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.8"
          strokeLinejoin="round"
        />
      );
    case 'arch':
      return (
        <g fill="none" stroke={strokeColor} strokeWidth="2.2">
          <path d="M-11 12 V-2 A11 11 0 0 1 11 -2 V12" />
          <path d="M-6 12 V-1 A6 6 0 0 1 6 -1 V12" strokeWidth="1.4" />
        </g>
      );
    case 'diamond':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="2" strokeLinejoin="round">
          <polygon points="0,-13 13,0 0,13 -13,0" />
          <circle cx="0" cy="0" r="3" fill={strokeColor} />
        </g>
      );
    case 'building':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="1.8" strokeLinejoin="round">
          <rect x="-11" y="-11" width="11" height="22" />
          <rect x="0" y="-5" width="11" height="16" />
          <line x1="-7" y1="-6" x2="-4" y2="-6" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="-7" y1="0" x2="-4" y2="0" stroke={strokeColor} strokeWidth="1.5" />
          <line x1="4" y1="0" x2="7" y2="0" stroke={strokeColor} strokeWidth="1.5" />
        </g>
      );
    case 'sparkles':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="1.6" strokeLinejoin="round">
          <path d="M0 -14 L3.5 -3.5 L14 0 L3.5 3.5 L0 14 L-3.5 3.5 L-14 0 L-3.5 -3.5 Z" />
          <circle cx="11" cy="-10" r="2.2" />
        </g>
      );
    case 'heart':
      return (
        <path
          d="M0 12 C-12 4, -15 -6, -8 -11 C-3 -14, 0 -9, 0 -7 C0 -9, 3 -14, 8 -11 C15 -6, 12 4, 0 12 Z"
          fill={fillColor}
          stroke={strokeColor}
          strokeWidth="1.9"
          strokeLinejoin="round"
        />
      );
    case 'award':
      return (
        <g fill={fillColor} stroke={strokeColor} strokeWidth="1.9" strokeLinejoin="round">
          <circle cx="0" cy="-4" r="9" />
          <path d="M-5 4 L-8 14 L0 10 L8 14 L5 4" />
        </g>
      );
    default:
      return (
        <g fill="none" stroke={strokeColor} strokeWidth="2">
          <circle cx="0" cy="0" r="12" />
          <polygon points="0,-8 3,-1 8,0 3,1 0,8 -3,1 -8,0 -3,-1" fill={fillColor} />
        </g>
      );
  }
}

function LogoMakerModal({ isOpen, onClose, initialBrandName, initialPrimary, initialSecondary, onApplyLogo }) {
  const [monogram, setMonogram] = useState('');
  const [symbol, setSymbol] = useState('crown');
  const [frameStyle, setFrameStyle] = useState('circle');
  const [bgHex, setBgHex] = useState(initialPrimary || '#20372D');
  const [fgHex, setFgHex] = useState(initialSecondary || '#C5A46D');

  useEffect(() => {
    if (isOpen) {
      const words = (initialBrandName || 'BM').trim().split(/\s+/);
      const initials =
        words.length >= 2
          ? `${words[0][0] || ''}${words[1][0] || ''}`.toUpperCase()
          : (initialBrandName || 'BM').slice(0, 2).toUpperCase();
      setMonogram(initials || 'BM');
      setBgHex(initialPrimary || '#20372D');
      setFgHex(initialSecondary || '#C5A46D');
    }
  }, [isOpen, initialBrandName, initialPrimary, initialSecondary]);

  if (!isOpen) return null;

  const buildSvgDataUrl = () => {
    const cleanMono = (monogram || 'BM').slice(0, 3).toUpperCase();
    const svgString = `<svg xmlns="http://www.w3.org/2000/svg" width="320" height="320" viewBox="0 0 320 320">
      <rect width="320" height="320" rx="48" fill="${bgHex}" />
      ${
        frameStyle === 'circle'
          ? `<circle cx="160" cy="160" r="118" fill="none" stroke="${fgHex}" stroke-width="5" />`
          : frameStyle === 'square'
          ? `<rect x="44" y="44" width="232" height="232" rx="28" fill="none" stroke="${fgHex}" stroke-width="5" />`
          : frameStyle === 'double'
          ? `<circle cx="160" cy="160" r="122" fill="none" stroke="${fgHex}" stroke-width="4" /><circle cx="160" cy="160" r="110" fill="none" stroke="${fgHex}" stroke-width="2" stroke-dasharray="6 6" />`
          : `<polygon points="160,28 292,160 160,292 28,160" fill="none" stroke="${fgHex}" stroke-width="5" />`
      }
      <g transform="translate(160, 118) scale(2.1)">
        ${
          symbol === 'crown'
            ? `<path d="M-13 6 L-16 -7 L-7 0 L0 -11 L7 0 L16 -7 L13 6 Z M-13 10 H13" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.5" stroke-linejoin="round" />`
            : symbol === 'lotus'
            ? `<path d="M0 -12 C5 -4, 5 5, 0 11 C-5 5, -5 -4, 0 -12 Z M-2 -9 C-11 -6, -15 3, -8 10 C-3 6, -2 0, -2 -9 Z M2 -9 C11 -6, 15 3, 8 10 C3 6, 2 0, 2 -9 Z" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.4" />`
            : symbol === 'cup'
            ? `<path d="M-11 -5 H9 V6 C9 11, 5 14, 0 14 C-5 14, -11 11, -11 6 Z" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.5" /><path d="M9 -2 H13 C15.5 -2, 16.5 4, 13 6 H9" fill="none" stroke="${fgHex}" stroke-width="2" />`
            : symbol === 'leaf'
            ? `<path d="M-12 9 C-12 -6, 2 -13, 13 -12 C13 0, 5 12, -12 9 Z" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.5" />`
            : symbol === 'heart'
            ? `<path d="M0 12 C-12 4, -15 -6, -8 -11 C-3 -14, 0 -9, 0 -7 C0 -9, 3 -14, 8 -11 C15 -6, 12 4, 0 12 Z" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.5" />`
            : `<polygon points="0,-14 4.2,-4.5 14.5,-3.6 6.7,3.2 9.1,13.3 0,7.9 -9.1,13.3 -6.7,3.2 -14.5,-3.6 -4.2,-4.5" fill="${fgHex}" stroke="${fgHex}" stroke-width="1.5" />`
        }
      </g>
      <text x="160" y="212" text-anchor="middle" fill="#FFFFFF" font-family="Playfair Display, Georgia, serif" font-weight="700" font-size="52" letter-spacing="4">${cleanMono}</text>
      <line x1="96" y1="230" x2="224" y2="230" stroke="${fgHex}" stroke-width="2.5" />
    </svg>`;
    return `data:image/svg+xml;charset=utf-8,${encodeURIComponent(svgString)}`;
  };

  const handleSave = () => {
    const dataUrl = buildSvgDataUrl();
    onApplyLogo(dataUrl, {
      source: 'Studio Logo Maker',
      monogram: (monogram || 'BM').slice(0, 3).toUpperCase(),
      symbol,
      frameStyle,
      bgHex,
      fgHex,
    });
    onClose();
  };

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/70 p-4 backdrop-blur-xs">
      <div className="w-full max-w-2xl rounded-3xl border border-[#C5A46D]/40 bg-[#F4EFE5] p-6 text-[#242722] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#20372D]/15 pb-4">
          <div className="flex items-center gap-3">
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#20372D] text-[#C5A46D]">
              <Sparkles className="h-5 w-5" />
            </div>
            <div>
              <h3 className="font-serif text-xl font-bold text-[#20372D]">
                BrandMyCup Instant Logo Studio
              </h3>
              <p className="text-xs text-[#242722]/70">
                No logo yet? Craft a clean crest logo right here and place it directly on your cup.
              </p>
            </div>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#242722]/70 hover:bg-[#20372D]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-5 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center justify-center rounded-2xl border border-[#20372D]/15 bg-white p-6">
            <img
              src={buildSvgDataUrl()}
              alt="Generated Logo Preview"
              className="h-44 w-44 rounded-3xl object-contain shadow-md"
            />
            <span className="mt-3 rounded-full bg-[#F4EFE5] px-3 py-1 text-[11px] font-semibold uppercase tracking-wider text-[#20372D]">
              Live Vector Crest Preview
            </span>
          </div>

          <div className="space-y-4">
            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#20372D]">
                Monogram / Initials (Max 3 Letters)
              </label>
              <input
                type="text"
                maxLength={3}
                value={monogram}
                onChange={(e) => setMonogram(e.target.value.toUpperCase())}
                placeholder="e.g. KR or AM"
                className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-white px-3.5 py-2 text-sm font-semibold tracking-widest text-[#242722] focus:border-[#20372D] focus:outline-none"
              />
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#20372D]">
                Icon Symbol
              </label>
              <div className="mt-1.5 grid grid-cols-6 gap-1.5">
                {LOGO_SYMBOLS.map((sym) => (
                  <button
                    key={sym}
                    type="button"
                    onClick={() => setSymbol(sym)}
                    className={`flex h-9 items-center justify-center rounded-lg border text-xs font-medium capitalize transition ${
                      symbol === sym
                        ? 'border-[#20372D] bg-[#20372D] text-[#C5A46D]'
                        : 'border-[#20372D]/15 bg-white text-[#242722] hover:border-[#C5A46D]'
                    }`}
                  >
                    {sym.slice(0, 3)}
                  </button>
                ))}
              </div>
            </div>

            <div>
              <label className="block text-xs font-semibold uppercase tracking-wider text-[#20372D]">
                Badge Frame
              </label>
              <div className="mt-1.5 grid grid-cols-4 gap-1.5">
                {['circle', 'square', 'double', 'diamond'].map((fr) => (
                  <button
                    key={fr}
                    type="button"
                    onClick={() => setFrameStyle(fr)}
                    className={`rounded-lg border px-2 py-1.5 text-xs font-medium capitalize transition ${
                      frameStyle === fr
                        ? 'border-[#20372D] bg-[#20372D] text-[#C5A46D]'
                        : 'border-[#20372D]/15 bg-white text-[#242722]'
                    }`}
                  >
                    {fr}
                  </button>
                ))}
              </div>
            </div>

            <div className="grid grid-cols-2 gap-3">
              <div>
                <label className="block text-xs font-semibold text-[#20372D]">Crest Base</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#20372D]/20 bg-white px-2.5 py-1.5">
                  <input
                    type="color"
                    value={bgHex}
                    onChange={(e) => setBgHex(e.target.value)}
                    className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono">{bgHex}</span>
                </div>
              </div>
              <div>
                <label className="block text-xs font-semibold text-[#20372D]">Accent & Trim</label>
                <div className="mt-1 flex items-center gap-2 rounded-xl border border-[#20372D]/20 bg-white px-2.5 py-1.5">
                  <input
                    type="color"
                    value={fgHex}
                    onChange={(e) => setFgHex(e.target.value)}
                    className="h-6 w-8 cursor-pointer rounded border-0 bg-transparent"
                  />
                  <span className="text-xs font-mono">{fgHex}</span>
                </div>
              </div>
            </div>
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-end gap-3 border-t border-[#20372D]/15 pt-4">
          <button
            type="button"
            onClick={onClose}
            className="rounded-full border border-[#20372D]/25 px-5 py-2.5 text-sm font-medium text-[#242722] hover:bg-[#20372D]/5"
          >
            Cancel
          </button>
          <button
            type="button"
            onClick={handleSave}
            className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-6 py-2.5 text-sm font-semibold text-[#F4EFE5] shadow-md hover:bg-[#172821]"
          >
            <Check className="h-4 w-4 text-[#C5A46D]" />
            Use This Logo on My Cup
          </button>
        </div>
      </div>
    </div>
  );
}

function QrPreviewBox({ value, size = 64, fg = '#20372D', bg = '#FFFFFF' }) {
  const cells = useMemo(() => {
    const str = (value || 'https://brandmycup.in').trim();
    let hash = 2166136261;
    for (let i = 0; i < str.length; i++) {
      hash ^= str.charCodeAt(i);
      hash = Math.imul(hash, 16777619);
    }
    const grid = Array.from({ length: 9 }, () => Array(9).fill(false));

    const placeFinder = (r0, c0) => {
      for (let r = 0; r < 3; r++) {
        for (let c = 0; c < 3; c++) {
          const isBorder = r === 0 || r === 2 || c === 0 || c === 2;
          const isCenter = r === 1 && c === 1;
          grid[r0 + r][c0 + c] = isBorder || isCenter;
        }
      }
    };
    placeFinder(0, 0);
    placeFinder(0, 6);
    placeFinder(6, 0);

    for (let r = 0; r < 9; r++) {
      for (let c = 0; c < 9; c++) {
        const inFinder =
          (r < 3 && c < 3) || (r < 3 && c > 5) || (r > 5 && c < 3);
        if (!inFinder) {
          const bit = ((hash >>> ((r * 9 + c) % 28)) ^ (r * 7 + c * 3)) & 1;
          grid[r][c] = bit === 1;
        }
      }
    }
    return grid;
  }, [value]);

  return (
    <div
      style={{ backgroundColor: bg, width: size, height: size }}
      className="inline-flex shrink-0 items-center justify-center rounded-md border border-black/15 p-1 shadow-xs"
      title={value || 'QR Link'}
    >
      <svg viewBox="0 0 9 9" className="h-full w-full">
        {cells.map((row, rIdx) =>
          row.map((on, cIdx) =>
            on ? (
              <rect
                key={`${rIdx}-${cIdx}`}
                x={cIdx}
                y={rIdx}
                width="1.04"
                height="1.04"
                fill={fg}
              />
            ) : null
          )
        )}
      </svg>
    </div>
  );
}

function getCupPalette(designId, data) {
  const primary = data.primaryColor || '#20372D';
  const gold = data.secondaryColor || '#C5A46D';
  const cream = '#F4EFE5';
  const charcoal = '#242722';

  if (data.categoryId === 'wedding') {
    const weddingMap = {
      1: { cupBase: cream, band: '#FFFFFF', ink: charcoal, accent: gold, rim: gold },
      2: { cupBase: '#4A1525', band: '#360D19', ink: '#FFF8EC', accent: '#E8C684', rim: '#E8C684' },
      3: { cupBase: '#FAF6EE', band: primary, ink: primary, accent: gold, rim: gold },
      4: { cupBase: '#EEF3EE', band: '#20372D', ink: '#20372D', accent: '#6B8E6E', rim: gold },
      5: { cupBase: '#FFF9F0', band: '#6E1D2B', ink: '#4A1525', accent: gold, rim: gold },
      6: { cupBase: '#6E1D2B', band: '#FFF6E5', ink: '#FFF8EC', accent: '#E8C684', rim: gold },
      7: { cupBase: cream, band: '#20372D', ink: '#242722', accent: gold, rim: gold },
      8: { cupBase: '#241B29', band: '#3A2842', ink: '#FFF7EB', accent: gold, rim: gold },
      9: { cupBase: '#7A1C2E', band: '#53101D', ink: '#FFF9EE', accent: '#F2CE85', rim: '#F2CE85' },
      10: { cupBase: '#FBF8F3', band: '#242722', ink: '#242722', accent: '#8C2D3C', rim: gold },
    };
    return weddingMap[designId] || weddingMap[2];
  }

  if (data.categoryId === 'hotel') {
    const hotelMap = {
      1: { cupBase: '#FFFFFF', band: cream, ink: charcoal, accent: gold, rim: gold },
      2: { cupBase: '#1B2E26', band: '#12201A', ink: '#F4EFE5', accent: '#D4B475', rim: '#D4B475' },
      3: { cupBase: cream, band: primary, ink: primary, accent: gold, rim: gold },
      4: { cupBase: '#E9EFEA', band: '#20372D', ink: '#20372D', accent: '#4C735C', rim: gold },
      5: { cupBase: '#242722', band: '#171916', ink: '#F4EFE5', accent: '#C5A46D', rim: '#C5A46D' },
      6: { cupBase: '#20372D', band: '#C5A46D', ink: '#FFFFFF', accent: '#C5A46D', rim: '#C5A46D' },
      7: { cupBase: '#FBF8F2', band: '#20372D', ink: '#242722', accent: '#C5A46D', rim: gold },
      8: { cupBase: '#182638', band: '#101B29', ink: '#F4EFE5', accent: '#D4B475', rim: '#D4B475' },
      9: { cupBase: cream, band: '#8A6934', ink: '#242722', accent: '#C5A46D', rim: gold },
      10: { cupBase: '#FFFFFF', band: '#242722', ink: '#242722', accent: '#C5A46D', rim: gold },
    };
    return hotelMap[designId] || hotelMap[2];
  }

  const standardMap = {
    1: { cupBase: '#FFFFFF', band: cream, ink: charcoal, accent: primary, rim: gold },
    2: { cupBase: primary, band: '#162720', ink: '#FFFFFF', accent: gold, rim: gold },
    3: { cupBase: cream, band: primary, ink: charcoal, accent: primary, rim: gold },
    4: { cupBase: '#EBF2EC', band: '#20372D', ink: '#20372D', accent: '#3E6B48', rim: gold },
    5: { cupBase: '#FAF6EE', band: primary, ink: primary, accent: gold, rim: gold },
    6: { cupBase: primary, band: gold, ink: '#FFFFFF', accent: gold, rim: gold },
    7: { cupBase: cream, band: '#242722', ink: charcoal, accent: primary, rim: gold },
    8: { cupBase: '#242722', band: primary, ink: '#FFFFFF', accent: gold, rim: gold },
    9: { cupBase: '#FFF8EC', band: primary, ink: charcoal, accent: gold, rim: gold },
    10: { cupBase: '#FFFFFF', band: '#242722', ink: charcoal, accent: primary, rim: gold },
  };
  return standardMap[designId] || standardMap[1];
}

function PaperCup3D({
  data,
  designId = 1,
  side = 'front',
  scaleFactor = 1,
  showMetaBadge = true,
}) {
  const uid = useMemo(
    () => `cup_${designId}_${side}_${Math.random().toString(36).slice(2, 7)}`,
    [designId, side]
  );

  const pal = getCupPalette(designId, data);
  const cat = CATEGORIES.find((c) => c.id === data.categoryId) || CATEGORIES[0];
  const cd = data.categoryDetails || {};

  // Conical geometry in SVG viewBox 0 0 280 310
  // Top rim y=34 (x: 42 to 238), Bottom base y=282 (x: 78 to 202)
  const topY = 34;
  const botY = 282;
  const xAtY = (y, inset = 0) => {
    const t = (y - topY) / (botY - topY);
    const left = 42 + inset + t * (78 - 42);
    const right = 238 - inset - t * (202 - 238);
    return { left, right, center: (left + right) / 2, width: right - left };
  };

  const mainTitle =
    data.categoryId === 'wedding'
      ? cd.coupleNames || data.businessName || 'Aarav & Meera'
      : data.categoryId === 'hotel'
      ? data.businessName || 'Grand Residency Hotel'
      : data.businessName || 'Your Brand';

  const subLine =
    data.categoryId === 'wedding'
      ? cd.weddingHashtag || cd.eventName || 'Royal Wedding Celebration'
      : data.categoryId === 'hotel'
      ? cd.hotelStars || 'Luxury Hospitality'
      : cat.title;

  const lines = fitHeadlineLines(mainTitle, mainTitle.length > 18 ? 17 : 15, 2);
  const headlineFontSize =
    lines.some((l) => l.length > 14) || mainTitle.length > 17 ? 16.5 : 20;

  const logoScaleNorm = (data.logoScale || 100) / 100;
  const logoShiftY = Number(data.logoOffsetY || 0);
  const hasLogo = Boolean(data.logoDataUrl);
  const symbolToRender = data.logoMeta?.symbol || (data.categoryId === 'wedding' ? 'lotus' : data.categoryId === 'hotel' ? 'crown' : 'cup');

  const qrTarget =
    data.qrDestination ||
    cd.menuUrl ||
    cd.bookingUrl ||
    cd.admissionUrl ||
    cd.enquiryUrl ||
    cd.catalogueUrl ||
    data.website ||
    'https://brandmycup.in';

  const contactLine = [data.phone, data.instagram].filter(Boolean).join(' • ') || '+91 89553 50925';

  return (
    <div
      style={{ transform: `scale(${scaleFactor})`, transformOrigin: 'top center' }}
      className="relative flex flex-col items-center select-none"
    >
      <svg
        viewBox="0 0 280 310"
        className="h-auto w-full max-w-[270px] drop-shadow-[0_18px_28px_rgba(20,26,22,0.22)]"
        role="img"
        aria-label={`${mainTitle} Design ${designId} ${side} view`}
      >
        <defs>
          {/* Strict inner cup wall clipPath so text & graphics never spill outside */}
          <clipPath id={`${uid}_wallClip`}>
            <polygon points="44,39 236,39 201,280 79,280" />
          </clipPath>

          {/* Realistic 3D cylindrical shading */}
          <linearGradient id={`${uid}_cylShade`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#000000" stopOpacity="0.34" />
            <stop offset="18%" stopColor="#000000" stopOpacity="0.06" />
            <stop offset="38%" stopColor="#FFFFFF" stopOpacity="0.22" />
            <stop offset="52%" stopColor="#FFFFFF" stopOpacity="0.04" />
            <stop offset="82%" stopColor="#000000" stopOpacity="0.14" />
            <stop offset="100%" stopColor="#000000" stopOpacity="0.38" />
          </linearGradient>

          <linearGradient id={`${uid}_rimGrad`} x1="0%" y1="0%" x2="100%" y2="0%">
            <stop offset="0%" stopColor="#B8965A" />
            <stop offset="35%" stopColor="#F5E4BE" />
            <stop offset="70%" stopColor="#C5A46D" />
            <stop offset="100%" stopColor="#8C6D3B" />
          </linearGradient>

          <radialGradient id={`${uid}_shadow`} cx="50%" cy="50%" r="50%">
            <stop offset="0%" stopColor="#141A16" stopOpacity="0.35" />
            <stop offset="100%" stopColor="#141A16" stopOpacity="0" />
          </radialGradient>
        </defs>

        {/* Ground Shadow */}
        <ellipse cx="140" cy="288" rx="74" ry="11" fill={`url(#${uid}_shadow)`} />

        {/* Base Cup Body */}
        <polygon points="43,38 237,38 202,281 78,281" fill={pal.cupBase} />

        {/* Clipped Design Artwork Layer */}
        <g clipPath={`url(#${uid}_wallClip)`}>
          {side === 'front' ? (
            <>
              {/* Style-Specific Decorative Backgrounds */}
              {designId === 2 && (
                <>
                  <rect x="40" y="38" width="200" height="245" fill={pal.cupBase} />
                  <polygon points="40,112 240,94 240,214 40,232" fill={pal.band} />
                  <line x1="56" y1="114" x2="224" y2="98" stroke={pal.accent} strokeWidth="1.2" />
                  <line x1="56" y1="224" x2="224" y2="208" stroke={pal.accent} strokeWidth="1.2" />
                </>
              )}

              {designId === 3 && (
                <>
                  <polygon points="40,145 240,120 240,282 40,282" fill={pal.band} />
                  <polygon points="40,145 240,120 240,132 40,157" fill={pal.accent} />
                </>
              )}

              {designId === 4 && (
                <>
                  <path
                    d="M40 245 Q95 215 140 242 T240 225 L240 284 L40 284 Z"
                    fill={pal.accent}
                    fillOpacity="0.22"
                  />
                  <path
                    d="M62 268 C78 242, 105 245, 118 265"
                    fill="none"
                    stroke={pal.accent}
                    strokeWidth="2"
                  />
                  <path
                    d="M218 268 C202 242, 175 245, 162 265"
                    fill="none"
                    stroke={pal.accent}
                    strokeWidth="2"
                  />
                </>
              )}

              {designId === 5 && (
                <path
                  d="M84 268 V116 A56 56 0 0 1 196 116 V268"
                  fill="none"
                  stroke={pal.accent}
                  strokeWidth="2"
                />
              )}

              {designId === 6 && (
                <rect x="40" y="104" width="200" height="92" fill={pal.band} />
              )}

              {designId === 7 && (
                <circle
                  cx="140"
                  cy="152"
                  r="64"
                  fill="none"
                  stroke={pal.accent}
                  strokeWidth="1.5"
                  strokeDasharray="4 4"
                />
              )}

              {designId === 8 && (
                <>
                  <rect x="74" y="92" width="132" height="145" fill="none" stroke={pal.accent} strokeWidth="1.5" />
                  <line x1="94" y1="92" x2="94" y2="237" stroke={pal.accent} strokeOpacity="0.35" strokeWidth="1" />
                  <line x1="186" y1="92" x2="186" y2="237" stroke={pal.accent} strokeOpacity="0.35" strokeWidth="1" />
                </>
              )}

              {designId === 9 && (
                <>
                  <rect x="40" y="38" width="200" height="18" fill={pal.accent} fillOpacity="0.25" />
                  <rect x="40" y="256" width="200" height="26" fill={pal.band} />
                  <circle cx="96" cy="70" r="2.2" fill={pal.accent} />
                  <circle cx="184" cy="70" r="2.2" fill={pal.accent} />
                </>
              )}

              {designId === 10 && (
                <>
                  <rect x="76" y="88" width="128" height="148" rx="8" fill={pal.cupBase} stroke={pal.accent} strokeWidth="1.5" />
                </>
              )}

              {/* Logo / Crest Block */}
              <g transform={`translate(140, ${96 + logoShiftY}) scale(${logoScaleNorm})`}>
                {hasLogo ? (
                  <>
                    {data.logoBacking && (
                      <circle cx="0" cy="0" r="25" fill="#FFFFFF" stroke={pal.accent} strokeWidth="1.5" />
                    )}
                    <image
                      href={data.logoDataUrl}
                      x="-20"
                      y="-20"
                      width="40"
                      height="40"
                      preserveAspectRatio="xMidYMid meet"
                    />
                  </>
                ) : (
                  <>
                    <circle
                      cx="0"
                      cy="0"
                      r="22"
                      fill={designId === 2 || designId === 6 || designId === 9 ? pal.accent : pal.cupBase}
                      stroke={pal.accent}
                      strokeWidth="1.8"
                    />
                    <g transform="scale(0.85)">
                      {renderSymbolPath(
                        symbolToRender,
                        designId === 2 || designId === 6 || designId === 9 ? '#242722' : pal.accent,
                        'none'
                      )}
                    </g>
                  </>
                )}
              </g>

              {/* Main Headline (Auto-wrapped & strictly inside cup walls) */}
              <g>
                {lines.map((line, idx) => {
                  const yPos = 148 + idx * (headlineFontSize + 3);
                  const onDarkBand =
                    (designId === 2 && yPos >= 96 && yPos <= 214) ||
                    (designId === 6 && yPos >= 104 && yPos <= 196);
                  const fillCol = onDarkBand
                    ? designId === 6
                      ? '#242722'
                      : '#FFFFFF'
                    : pal.ink;

                  return (
                    <text
                      key={idx}
                      x="140"
                      y={yPos}
                      textAnchor="middle"
                      fill={fillCol}
                      fontFamily="Playfair Display, Georgia, serif"
                      fontWeight="700"
                      fontSize={headlineFontSize}
                    >
                      {line}
                    </text>
                  );
                })}
              </g>

              {/* Category / Occasion Subtitle */}
              <text
                x="140"
                y={148 + lines.length * (headlineFontSize + 3) + 6}
                textAnchor="middle"
                fill={designId === 6 ? '#242722' : pal.accent}
                fontFamily="Inter, sans-serif"
                fontWeight="600"
                fontSize="8.5"
                letterSpacing="1.2"
              >
                {subLine.slice(0, 26).toUpperCase()}
              </text>

              {/* Category-Specific Highlight Line */}
              {data.categoryId === 'wedding' && cd.ritualTag && (
                <text
                  x="140"
                  y="236"
                  textAnchor="middle"
                  fill={designId === 9 ? '#FFF4DC' : pal.ink}
                  fontFamily="Inter, sans-serif"
                  fontSize="8"
                  fontWeight="500"
                >
                  {cd.ritualTag.slice(0, 28)}
                </text>
              )}

              {data.categoryId === 'hotel' && cd.roomServiceExt && (
                <text
                  x="140"
                  y="236"
                  textAnchor="middle"
                  fill={pal.ink}
                  fontFamily="Inter, sans-serif"
                  fontSize="7.8"
                  fontWeight="500"
                >
                  {cd.roomServiceExt.slice(0, 30)}
                </text>
              )}

              {/* Bottom Footer Strip on Cup */}
              <rect x="65" y="246" width="150" height="24" rx="4" fill={pal.band} fillOpacity="0.92" />
              <text
                x="140"
                y="261"
                textAnchor="middle"
                fill={designId === 6 ? '#242722' : '#FFFFFF'}
                fontFamily="Inter, sans-serif"
                fontSize="7.8"
                fontWeight="600"
              >
                {contactLine.slice(0, 28)}
              </text>
            </>
          ) : (
            /* BACK SIDE OF CUP — QR + Contact & Location */
            <>
              <rect x="55" y="64" width="170" height="184" rx="14" fill="#FFFFFF" fillOpacity="0.94" stroke={pal.accent} strokeWidth="1.2" />

              <text
                x="140"
                y="86"
                textAnchor="middle"
                fill="#20372D"
                fontFamily="Playfair Display, Georgia, serif"
                fontWeight="700"
                fontSize="12.5"
              >
                {mainTitle.slice(0, 22)}
              </text>

              <text
                x="140"
                y="101"
                textAnchor="middle"
                fill="#5A5E58"
                fontFamily="Inter, sans-serif"
                fontSize="7.8"
                fontWeight="600"
              >
                {(data.qrLabel || 'SCAN FOR DIGITAL MENU').slice(0, 28).toUpperCase()}
              </text>

              {/* Embedded QR Matrix inside SVG */}
              <foreignObject x="102" y="109" width="76" height="76">
                <div className="flex h-full w-full items-center justify-center">
                  <QrPreviewBox value={qrTarget} size={68} fg="#20372D" bg="#FFFFFF" />
                </div>
              </foreignObject>

              <text
                x="140"
                y="200"
                textAnchor="middle"
                fill="#242722"
                fontFamily="Inter, sans-serif"
                fontSize="7.6"
                fontWeight="600"
              >
                {data.instagram ? data.instagram : ''}
              </text>
              <text
                x="140"
                y="214"
                textAnchor="middle"
                fill="#20372D"
                fontFamily="Inter, sans-serif"
                fontSize="8"
                fontWeight="700"
              >
                {data.phone || '+91 89553 50925'}
              </text>
              <text
                x="140"
                y="228"
                textAnchor="middle"
                fill="#5A5E58"
                fontFamily="Inter, sans-serif"
                fontSize="7.4"
              >
                {(data.location || 'India').slice(0, 26)}
              </text>

              <text
                x="140"
                y="262"
                textAnchor="middle"
                fill={pal.ink}
                fontFamily="Inter, sans-serif"
                fontSize="7.5"
                fontWeight="600"
                opacity="0.85"
              >
                Crafted by BrandMyCup Studio
              </text>
            </>
          )}
        </g>

        {/* Cylindrical 3D Shading Overlay */}
        <polygon
          points="43,38 237,38 202,281 78,281"
          fill={`url(#${uid}_cylShade)`}
          pointerEvents="none"
        />

        {/* Top Rolled Rim */}
        <ellipse cx="140" cy="36" rx="99" ry="9" fill={`url(#${uid}_rimGrad)`} />
        <ellipse
          cx="140"
          cy="35"
          rx="91"
          ry="5.5"
          fill="#1B1E1A"
          fillOpacity="0.72"
        />

        {/* Bottom Base Lip */}
        <path
          d="M78 280 Q140 288 202 280"
          fill="none"
          stroke={pal.rim}
          strokeWidth="3"
          strokeLinecap="round"
        />
      </svg>

      {showMetaBadge && (
        <div className="mt-1.5 flex items-center gap-2 text-[11px] font-medium text-[#242722]/75">
          <span className="rounded-full bg-[#20372D]/10 px-2.5 py-0.5 font-semibold text-[#20372D]">
            {side === 'front' ? 'Front View' : 'Back & QR View'}
          </span>
          <span>{data.cupSize || 110} ml</span>
        </div>
      )}
    </div>
  );
}

function DesignInspectionModal({ isOpen, onClose, data, designId, onSelectDesign }) {
  if (!isOpen) return null;
  const styleObj = DESIGN_STYLES.find((d) => d.id === designId) || DESIGN_STYLES[0];

  return (
    <div className="fixed inset-0 z-50 flex items-center justify-center bg-black/75 p-4 backdrop-blur-xs">
      <div className="w-full max-w-4xl rounded-3xl border border-[#C5A46D]/40 bg-[#F4EFE5] p-6 text-[#242722] shadow-2xl">
        <div className="flex items-center justify-between border-b border-[#20372D]/15 pb-4">
          <div>
            <span className="text-xs font-semibold uppercase tracking-widest text-[#C5A46D]">
              Design #{styleObj.id} of 10 • {styleObj.tag}
            </span>
            <h3 className="font-serif text-2xl font-bold text-[#20372D]">{styleObj.name}</h3>
          </div>
          <button
            type="button"
            onClick={onClose}
            className="rounded-full p-2 text-[#242722]/70 hover:bg-[#20372D]/10"
          >
            <X className="h-5 w-5" />
          </button>
        </div>

        <div className="mt-6 grid gap-6 md:grid-cols-2">
          <div className="flex flex-col items-center rounded-2xl border border-[#20372D]/10 bg-white p-5">
            <PaperCup3D data={data} designId={designId} side="front" scaleFactor={1.05} />
          </div>
          <div className="flex flex-col items-center rounded-2xl border border-[#20372D]/10 bg-white p-5">
            <PaperCup3D data={data} designId={designId} side="back" scaleFactor={1.05} />
          </div>
        </div>

        <div className="mt-6 flex flex-wrap items-center justify-between gap-4 border-t border-[#20372D]/15 pt-4">
          <p className="text-xs text-[#242722]/70">
            Conceptual preview only. Final print dielines and ink proofs are shared for approval before production.
          </p>
          <div className="flex items-center gap-3">
            <button
              type="button"
              onClick={onClose}
              className="rounded-full border border-[#20372D]/25 px-5 py-2.5 text-sm font-medium text-[#242722]"
            >
              Close
            </button>
            <button
              type="button"
              onClick={() => {
                onSelectDesign(designId);
                onClose();
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-6 py-2.5 text-sm font-semibold text-[#F4EFE5] hover:bg-[#162720]"
            >
              <CheckCircle2 className="h-4 w-4 text-[#C5A46D]" />
              Select Design #{styleObj.id}
            </button>
          </div>
        </div>
      </div>
    </div>
  );
}

export default function App() {
  const [route, setRoute] = useState(() => {
    if (typeof window !== 'undefined' && window.location.pathname === '/admin') {
      return '/admin';
    }
    return '/';
  });
  const [mobileMenuOpen, setMobileMenuOpen] = useState(false);

  const [draft, setDraft] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.DRAFT);
      if (saved) {
        const parsed = JSON.parse(saved);
        return {
          ...DEFAULT_DRAFT,
          ...parsed,
          categoryDetails: {
            ...DEFAULT_DRAFT.categoryDetails,
            ...(parsed.categoryDetails || {}),
          },
        };
      }
    } catch {
      // ignore storage errors
    }
    return DEFAULT_DRAFT;
  });

  const [enquiries, setEnquiries] = useState(() => {
    try {
      const saved = localStorage.getItem(STORAGE_KEYS.ENQUIRIES);
      if (saved) {
        const parsed = JSON.parse(saved);
        if (Array.isArray(parsed) && parsed.length > 0) return parsed;
      }
    } catch {
      // ignore
    }
    return INITIAL_ENQUIRIES;
  });

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.DRAFT, JSON.stringify(draft));
    } catch {
      // ignore quota errors for large logos
    }
  }, [draft]);

  useEffect(() => {
    try {
      localStorage.setItem(STORAGE_KEYS.ENQUIRIES, JSON.stringify(enquiries));
    } catch {
      // ignore
    }
  }, [enquiries]);

  const navigate = (nextRoute) => {
    setRoute(nextRoute);
    setMobileMenuOpen(false);
    try {
      if (window.location.pathname !== nextRoute && nextRoute.startsWith('/')) {
        window.history.pushState({}, '', nextRoute);
      }
    } catch {
      // ignore history errors in sandboxed frames
    }
    window.scrollTo({ top: 0, behavior: 'smooth' });
  };

  useEffect(() => {
    const onPop = () => {
      setRoute(window.location.pathname || '/');
    };
    window.addEventListener('popstate', onPop);
    return () => window.removeEventListener('popstate', onPop);
  }, []);

  // Wizard step state (1 to 5)
  const [wizardStep, setWizardStep] = useState(1);
  const [logoMakerOpen, setLogoMakerOpen] = useState(false);
  const [inspectDesignId, setInspectDesignId] = useState(null);
  const [cardSides, setCardSides] = useState({});

  const toggleCardSide = (id) => {
    setCardSides((prev) => ({
      ...prev,
      [id]: prev[id] === 'back' ? 'front' : 'back',
    }));
  };

  const handleLogoUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    const reader = new FileReader();
    reader.onload = () => {
      setDraft((prev) => ({
        ...prev,
        logoDataUrl: String(reader.result || ''),
        logoMeta: { source: file.name, uploadedAt: new Date().toLocaleTimeString() },
      }));
    };
    reader.readAsDataURL(file);
  };

  const handlePdfUpload = (e) => {
    const file = e.target.files?.[0];
    if (!file) return;
    setDraft((prev) => ({
      ...prev,
      categoryDetails: {
        ...prev.categoryDetails,
        menuPdfName: file.name,
      },
    }));
  };

  // Quotation form state
  const [quoteForm, setQuoteForm] = useState({
    quantity: '5,000',
    customQuantity: '',
    deliveryCity: draft.location || 'Jaipur',
    fullName: '',
    businessName: draft.businessName || '',
    phone: draft.phone || '',
    email: '',
    notes: '',
  });
  const [quoteError, setQuoteError] = useState('');
  const [submittedQuote, setSubmittedQuote] = useState(null);

  useEffect(() => {
    setQuoteForm((prev) => ({
      ...prev,
      businessName: draft.businessName || prev.businessName,
      phone: draft.phone || prev.phone,
      deliveryCity: draft.location || prev.deliveryCity,
    }));
  }, [draft.businessName, draft.phone, draft.location]);

  // Admin auth & selection state
  const [adminUnlocked, setAdminUnlocked] = useState(() => {
    try {
      return sessionStorage.getItem(STORAGE_KEYS.ADMIN_AUTH) === 'true';
    } catch {
      return false;
    }
  });
  const [pinInput, setPinInput] = useState('');
  const [pinError, setPinError] = useState('');
  const [selectedEnquiryId, setSelectedEnquiryId] = useState(
    () => INITIAL_ENQUIRIES[0]?.id || null
  );
  const [adminTab, setAdminTab] = useState('all');

  const unlockAdmin = (pin) => {
    if (String(pin).trim() === ADMIN_PIN) {
      setAdminUnlocked(true);
      setPinError('');
      try {
        sessionStorage.setItem(STORAGE_KEYS.ADMIN_AUTH, 'true');
      } catch {
        // ignore
      }
    } else {
      setPinError('Incorrect PIN. Use studio PIN 2026 or click Owner Quick Access.');
    }
  };

  const handleQuoteSubmit = (e) => {
    e.preventDefault();
    if (!quoteForm.fullName.trim() || !quoteForm.businessName.trim() || !quoteForm.phone.trim()) {
      setQuoteError('Please enter Full Name, Business/Event Name, and Contact Phone Number.');
      return;
    }
    const finalQty =
      quoteForm.quantity === 'Custom'
        ? `${quoteForm.customQuantity || '2,500'} (Custom)`
        : quoteForm.quantity;

    const newRecord = {
      id: `BMC-2026-${Math.floor(107 + Math.random() * 890)}`,
      createdAt: new Date().toLocaleString('en-IN', {
        year: 'numeric',
        month: '2-digit',
        day: '2-digit',
        hour: '2-digit',
        minute: '2-digit',
      }),
      fullName: quoteForm.fullName.trim(),
      businessName: quoteForm.businessName.trim(),
      categoryId: draft.categoryId,
      phone: quoteForm.phone.trim(),
      email: quoteForm.email.trim(),
      deliveryCity: quoteForm.deliveryCity.trim() || 'Jaipur',
      cupSize: draft.cupSize || 110,
      quantity: finalQty,
      selectedDesignId: draft.selectedDesignId || 1,
      notes: quoteForm.notes.trim(),
      enquiryStatus: 'New',
      productionStatus: 'Pending Approval',
      deliveryStatus: 'Not Started',
      snapshot: {
        ...draft,
        businessName: quoteForm.businessName.trim(),
        phone: quoteForm.phone.trim(),
        location: quoteForm.deliveryCity.trim() || draft.location,
      },
    };

    setEnquiries((prev) => [newRecord, ...prev]);
    setSelectedEnquiryId(newRecord.id);
    setSubmittedQuote(newRecord);
    setQuoteError('');
  };

  const updateEnquiryField = (id, field, value) => {
    setEnquiries((prev) =>
      prev.map((item) => (item.id === id ? { ...item, [field]: value } : item))
    );
  };

  const deleteEnquiry = (id) => {
    setEnquiries((prev) => prev.filter((item) => item.id !== id));
    if (selectedEnquiryId === id) {
      setSelectedEnquiryId(null);
    }
  };

  const renderCategoryIcon = (iconName, className = 'h-5 w-5') => {
    switch (iconName) {
      case 'coffee':
        return <Coffee className={className} />;
      case 'cup':
        return <CupSoda className={className} />;
      case 'utensils':
        return <Utensils className={className} />;
      case 'hotel':
        return <Hotel className={className} />;
      case 'heart':
        return <Heart className={className} />;
      case 'grad':
        return <GraduationCap className={className} />;
      case 'home':
        return <HomeIcon className={className} />;
      case 'bag':
        return <ShoppingBag className={className} />;
      default:
        return <Building2 className={className} />;
    }
  };

  const activeCategory =
    CATEGORIES.find((c) => c.id === draft.categoryId) || CATEGORIES[0];
  const activeDesign =
    DESIGN_STYLES.find((d) => d.id === draft.selectedDesignId) || DESIGN_STYLES[0];
  const activeEnquiry =
    enquiries.find((e) => e.id === selectedEnquiryId) || enquiries[0] || null;

  return (
    <div className="min-h-screen flex flex-col bg-[#F4EFE5] text-[#242722] font-sans">
      {/* Top Studio Helpline Bar */}
      <div className="bg-[#20372D] text-[#F4EFE5] text-xs border-b border-[#C5A46D]/25">
        <div className="mx-auto flex max-w-7xl flex-wrap items-center justify-between gap-2 px-4 py-2 sm:px-6 lg:px-8">
          <div className="flex flex-wrap items-center gap-4">
            <span className="font-medium text-[#C5A46D]">
              Direct Print & Design Desk:
            </span>
            <a
              href="tel:+918955350925"
              className="inline-flex items-center gap-1 hover:text-[#C5A46D] transition"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A46D]" />
              +91 89553 50925
            </a>
            <a
              href="tel:+917850865397"
              className="inline-flex items-center gap-1 hover:text-[#C5A46D] transition"
            >
              <Phone className="h-3.5 w-3.5 text-[#C5A46D]" />
              +91 78508 65397
            </a>
          </div>
          <div className="flex items-center gap-3">
            <span className="hidden sm:inline text-[#F4EFE5]/75">
              10 Designs / Category • 65 / 110 / 150 ml
            </span>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="inline-flex items-center gap-1 rounded-full bg-[#C5A46D]/20 px-3 py-0.5 font-semibold text-[#F4EFE5] hover:bg-[#C5A46D]/35 transition"
            >
              <Lock className="h-3 w-3 text-[#C5A46D]" />
              Admin Panel ({enquiries.length})
            </button>
          </div>
        </div>
      </div>

      {/* Main Sticky Header */}
      <header className="sticky top-0 z-40 border-b border-[#20372D]/12 bg-[#F4EFE5]/95 backdrop-blur-md">
        <div className="mx-auto flex max-w-7xl items-center justify-between px-4 py-3.5 sm:px-6 lg:px-8">
          <button
            type="button"
            onClick={() => navigate('/')}
            className="flex items-center gap-2.5 text-left group"
          >
            <div className="flex h-10 w-10 items-center justify-center rounded-xl bg-[#20372D] text-[#C5A46D] shadow-sm group-hover:scale-105 transition">
              <Coffee className="h-5 w-5" />
            </div>
            <div>
              <span className="font-serif text-xl font-bold tracking-tight text-[#20372D]">
                Brand<span className="text-[#C5A46D]">My</span>Cup
              </span>
              <span className="block text-[10px] font-semibold uppercase tracking-[0.2em] text-[#242722]/60">
                Packaging & Cup Studio
              </span>
            </div>
          </button>

          <nav className="hidden lg:flex items-center gap-6 text-sm font-medium text-[#242722]/85">
            {[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: 'How It Works', path: '/how-it-works' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
              { label: 'Create Your Cup', path: '/create' },
            ].map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`transition hover:text-[#20372D] ${
                  route === item.path
                    ? 'font-semibold text-[#20372D] underline decoration-[#C5A46D] decoration-2 underline-offset-8'
                    : ''
                }`}
              >
                {item.label}
              </button>
            ))}
          </nav>

          <div className="hidden md:flex items-center gap-3">
            <button
              type="button"
              onClick={() => navigate('/preview')}
              className="rounded-full border border-[#20372D]/25 px-4 py-2 text-xs font-semibold text-[#20372D] hover:bg-[#20372D]/5 transition"
            >
              10 Designs Studio
            </button>
            <button
              type="button"
              onClick={() => {
                setWizardStep(1);
                navigate('/create');
              }}
              className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-5 py-2.5 text-xs font-semibold text-[#F4EFE5] shadow-sm hover:bg-[#162720] transition"
            >
              <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
              Design Your Cup
            </button>
          </div>

          <button
            type="button"
            onClick={() => setMobileMenuOpen((v) => !v)}
            className="lg:hidden rounded-xl border border-[#20372D]/20 p-2 text-[#20372D]"
            aria-label="Toggle Menu"
          >
            {mobileMenuOpen ? <X className="h-5 w-5" /> : <Menu className="h-5 w-5" />}
          </button>
        </div>

        {/* Mobile Nav Drawer */}
        {mobileMenuOpen && (
          <div className="lg:hidden border-t border-[#20372D]/15 bg-[#F4EFE5] px-4 py-4 space-y-2">
            {[
              { label: 'Home', path: '/' },
              { label: 'Categories (9)', path: '/categories' },
              { label: 'How It Works', path: '/how-it-works' },
              { label: 'About Us', path: '/about' },
              { label: 'Contact', path: '/contact' },
              { label: 'Create Your Cup Wizard', path: '/create' },
              { label: 'Preview & 10 Designs', path: '/preview' },
              { label: 'Quotation Request', path: '/quote' },
              { label: 'Owner Admin Panel (/admin)', path: '/admin' },
            ].map((item) => (
              <button
                key={item.path}
                type="button"
                onClick={() => navigate(item.path)}
                className={`block w-full rounded-xl px-3.5 py-2.5 text-left text-sm font-medium ${
                  route === item.path
                    ? 'bg-[#20372D] text-[#F4EFE5]'
                    : 'text-[#242722] hover:bg-[#20372D]/10'
                }`}
              >
                {item.label}
              </button>
            ))}
          </div>
        )}
      </header>

      {/* Main Content */}
      <main className="flex-1">
        {/* ================= HOME PAGE ================= */}
        {route === '/' && (
          <div>
            {/* 1. Hero Section */}
            <section className="relative overflow-hidden bg-[#20372D] text-[#F4EFE5]">
              <div className="mx-auto grid max-w-7xl items-center gap-12 px-4 py-14 sm:px-6 lg:grid-cols-12 lg:px-8 lg:py-20">
                <div className="lg:col-span-7 space-y-6">
                  <div className="inline-flex items-center gap-2 rounded-full border border-[#C5A46D]/40 bg-[#C5A46D]/12 px-4 py-1.5 text-xs font-semibold tracking-wider text-[#E5C68B] uppercase">
                    <Sparkles className="h-3.5 w-3.5" />
                    10 Custom Cup Designs Per Category + Built-In Logo Studio
                  </div>

                  <h1 className="font-serif text-4xl font-bold leading-[1.12] tracking-tight text-white sm:text-5xl lg:text-6xl">
                    Your Brand. Your Cup.{' '}
                    <span className="text-[#C5A46D] italic">Your Identity.</span>
                  </h1>

                  <p className="max-w-xl text-base leading-relaxed text-[#F4EFE5]/85 sm:text-lg">
                    Turn ordinary paper cups into extraordinary brand experiences. Preview{' '}
                    <strong className="text-white">10 tailored 3D front & back designs</strong>{' '}
                    with your live logo, brand colors, and QR code—or create a logo directly on our studio if you don&apos;t have one yet.
                  </p>

                  <div className="flex flex-wrap items-center gap-4 pt-2">
                    <button
                      type="button"
                      onClick={() => {
                        setWizardStep(1);
                        navigate('/create');
                      }}
                      className="inline-flex items-center gap-2.5 rounded-full bg-[#C5A46D] px-7 py-3.5 text-sm font-bold text-[#20372D] shadow-lg hover:bg-[#d3b682] transition"
                    >
                      Create Your Custom Cup
                      <ArrowRight className="h-4 w-4" />
                    </button>
                    <button
                      type="button"
                      onClick={() => navigate('/preview')}
                      className="inline-flex items-center gap-2 rounded-full border border-[#F4EFE5]/30 px-6 py-3.5 text-sm font-semibold text-[#F4EFE5] hover:bg-white/10 transition"
                    >
                      <Eye className="h-4 w-4 text-[#C5A46D]" />
                      Explore 10 Designs
                    </button>
                  </div>

                  <div className="grid grid-cols-3 gap-4 border-t border-white/12 pt-6 max-w-lg">
                    <div>
                      <p className="font-serif text-2xl font-bold text-[#C5A46D]">10 / Cat</p>
                      <p className="text-xs text-[#F4EFE5]/70">90 Cup Variations</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-white">65–150 ml</p>
                      <p className="text-xs text-[#F4EFE5]/70">Food-Grade Cups</p>
                    </div>
                    <div>
                      <p className="font-serif text-2xl font-bold text-[#C5A46D]">Logo Maker</p>
                      <p className="text-xs text-[#F4EFE5]/70">Built-In Crest Tool</p>
                    </div>
                  </div>
                </div>

                {/* Hero Live 3D Showcase */}
                <div className="lg:col-span-5">
                  <div className="rounded-3xl border border-[#C5A46D]/30 bg-[#F4EFE5] p-6 text-[#242722] shadow-2xl">
                    <div className="flex items-center justify-between border-b border-[#20372D]/12 pb-3">
                      <div>
                        <span className="text-[11px] font-bold uppercase tracking-widest text-[#C5A46D]">
                          Live Client Preview
                        </span>
                        <p className="font-serif text-lg font-bold text-[#20372D]">
                          {draft.businessName || activeCategory.exampleBrand}
                        </p>
                      </div>
                      <span className="rounded-full bg-[#20372D] px-3 py-1 text-xs font-semibold text-[#F4EFE5]">
                        Design #{draft.selectedDesignId}
                      </span>
                    </div>

                    <div className="my-4 flex items-center justify-center rounded-2xl bg-white py-5 px-3 border border-[#20372D]/10">
                      <PaperCup3D
                        data={draft}
                        designId={draft.selectedDesignId || 2}
                        side="front"
                        scaleFactor={0.95}
                      />
                    </div>

                    <div className="flex items-center justify-between gap-2 pt-1">
                      <div className="flex gap-1.5">
                        {[1, 2, 4, 5, 9].map((id) => (
                          <button
                            key={id}
                            type="button"
                            onClick={() => setDraft((prev) => ({ ...prev, selectedDesignId: id }))}
                            className={`h-8 w-8 rounded-full text-xs font-bold transition ${
                              draft.selectedDesignId === id
                                ? 'bg-[#20372D] text-[#C5A46D]'
                                : 'bg-[#20372D]/10 text-[#20372D] hover:bg-[#20372D]/20'
                            }`}
                          >
                            #{id}
                          </button>
                        ))}
                      </div>
                      <button
                        type="button"
                        onClick={() => navigate('/preview')}
                        className="inline-flex items-center gap-1 text-xs font-bold text-[#20372D] hover:text-[#C5A46D]"
                      >
                        View All 10
                        <ArrowRight className="h-3.5 w-3.5" />
                      </button>
                    </div>
                  </div>
                </div>
              </div>
            </section>

            {/* 2. Showcase Section with 3 Branded Mockups */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                <div>
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                    Signature Cup Showcase
                  </span>
                  <h2 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                    Tailored for Every Occasion & Business
                  </h2>
                </div>
                <button
                  type="button"
                  onClick={() => {
                    setWizardStep(1);
                    navigate('/create');
                  }}
                  className="inline-flex items-center gap-1.5 text-sm font-semibold text-[#20372D] hover:text-[#C5A46D]"
                >
                  Customize Yours Now <ArrowRight className="h-4 w-4" />
                </button>
              </div>

              <div className="grid gap-6 md:grid-cols-3">
                {[
                  {
                    title: 'Cafe & Specialty Roast',
                    design: 2,
                    data: {
                      ...DEFAULT_DRAFT,
                      categoryId: 'cafe',
                      businessName: 'Kaveri Roast House',
                      primaryColor: '#20372D',
                      secondaryColor: '#C5A46D',
                      cupSize: 150,
                    },
                  },
                  {
                    title: 'Royal Wedding Celebrations',
                    design: 9,
                    data: {
                      ...DEFAULT_DRAFT,
                      categoryId: 'wedding',
                      businessName: 'Aarav & Meera',
                      primaryColor: '#5B1E2D',
                      secondaryColor: '#E7C888',
                      cupSize: 65,
                      categoryDetails: {
                        ...DEFAULT_DRAFT.categoryDetails,
                        coupleNames: 'Aarav & Meera',
                        weddingHashtag: '#AaravKiMeera',
                        ritualTag: 'Mehendi • Baraat • Reception',
                      },
                    },
                  },
                  {
                    title: '5-Star Hotel Hospitality',
                    design: 5,
                    data: {
                      ...DEFAULT_DRAFT,
                      categoryId: 'hotel',
                      businessName: 'The Aravalli Palace',
                      primaryColor: '#1B2E26',
                      secondaryColor: '#C5A46D',
                      cupSize: 110,
                      categoryDetails: {
                        ...DEFAULT_DRAFT.categoryDetails,
                        hotelStars: 'Luxury Heritage Hotel',
                        roomServiceExt: 'Dial 0 for In-Room Tea Lounge',
                      },
                    },
                  },
                ].map((sample, i) => (
                  <div
                    key={i}
                    className="rounded-3xl border border-[#20372D]/12 bg-white p-6 shadow-xs hover:shadow-lg transition flex flex-col items-center text-center"
                  >
                    <PaperCup3D data={sample.data} designId={sample.design} side="front" />
                    <h3 className="mt-4 font-serif text-xl font-bold text-[#20372D]">
                      {sample.title}
                    </h3>
                    <p className="mt-1 text-xs text-[#242722]/70">
                      Front & QR back layout • {sample.data.cupSize} ml cup
                    </p>
                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => ({
                          ...prev,
                          categoryId: sample.data.categoryId,
                          businessName: sample.data.businessName,
                          primaryColor: sample.data.primaryColor,
                          secondaryColor: sample.data.secondaryColor,
                          cupSize: sample.data.cupSize,
                          selectedDesignId: sample.design,
                          categoryDetails: {
                            ...prev.categoryDetails,
                            ...sample.data.categoryDetails,
                          },
                        }));
                        navigate('/preview');
                      }}
                      className="mt-4 rounded-full border border-[#20372D] px-4 py-1.5 text-xs font-semibold text-[#20372D] hover:bg-[#20372D] hover:text-[#F4EFE5] transition"
                    >
                      Open in Design Studio
                    </button>
                  </div>
                ))}
              </div>
            </section>

            {/* 3. Business Categories (9 Categories) */}
            <section className="bg-white/70 border-y border-[#20372D]/10 py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="max-w-2xl mb-10">
                  <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                    9 Specialized Industries
                  </span>
                  <h2 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                    Select Your Business Category
                  </h2>
                  <p className="mt-2 text-sm text-[#242722]/75">
                    Every category unlocks dedicated fields, authentic layouts, and 10 custom designs.
                  </p>
                </div>

                <div className="grid gap-5 sm:grid-cols-2 lg:grid-cols-3">
                  {CATEGORIES.map((cat) => (
                    <div
                      key={cat.id}
                      className="group rounded-2xl border border-[#20372D]/12 bg-[#F4EFE5] p-5 hover:border-[#C5A46D] hover:shadow-md transition flex flex-col justify-between"
                    >
                      <div>
                        <div className="flex items-center justify-between gap-2">
                          <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20372D] text-[#C5A46D]">
                            {renderCategoryIcon(cat.iconName)}
                          </div>
                          <span className="rounded-full bg-white px-3 py-1 text-[11px] font-semibold text-[#20372D] border border-[#20372D]/10">
                            {cat.badge}
                          </span>
                        </div>
                        <h3 className="mt-4 font-serif text-xl font-bold text-[#20372D]">
                          {cat.title}
                        </h3>
                        <p className="mt-1.5 text-xs leading-relaxed text-[#242722]/75">
                          {cat.shortDesc}
                        </p>
                      </div>

                      <div className="mt-5 flex items-center justify-between border-t border-[#20372D]/10 pt-3.5">
                        <span className="text-[11px] font-medium text-[#242722]/60">
                          Sample: {cat.exampleBrand}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setDraft((prev) => ({
                              ...prev,
                              categoryId: cat.id,
                              businessName:
                                cat.id === 'wedding'
                                  ? prev.categoryDetails?.coupleNames || 'Aarav & Meera'
                                  : cat.exampleBrand,
                            }));
                            setWizardStep(2);
                            navigate('/create');
                          }}
                          className="inline-flex items-center gap-1 text-xs font-bold text-[#20372D] group-hover:text-[#9C7A3C]"
                        >
                          Select <ArrowRight className="h-3.5 w-3.5" />
                        </button>
                      </div>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 4. How It Works (4 Steps) */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="text-center max-w-2xl mx-auto mb-12">
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                  Simple 4-Step Workflow
                </span>
                <h2 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                  From Idea to Branded Cups
                </h2>
              </div>

              <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-4">
                {[
                  {
                    step: '01',
                    title: 'Category & Brand Info',
                    desc: 'Choose your category, upload your logo (or build one in our Logo Studio), and add contact details.',
                  },
                  {
                    step: '02',
                    title: 'QR & Cup Size',
                    desc: 'Add your menu, booking, or wedding link for the QR code and select 65 ml, 110 ml, or 150 ml.',
                  },
                  {
                    step: '03',
                    title: 'Compare 10 Designs',
                    desc: 'Inspect 10 distinct front & back 3D cup mockups with your real details and tune logo placement.',
                  },
                  {
                    step: '04',
                    title: 'Request Quotation',
                    desc: 'Pick quantity (1,000 to 20,000+ or custom) and submit your enquiry directly to our team.',
                  },
                ].map((item) => (
                  <div
                    key={item.step}
                    className="rounded-2xl border border-[#20372D]/12 bg-white p-6"
                  >
                    <span className="font-serif text-3xl font-bold text-[#C5A46D]">
                      {item.step}
                    </span>
                    <h3 className="mt-2 font-serif text-lg font-bold text-[#20372D]">
                      {item.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#242722]/75">
                      {item.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 5. 10 Design Styles Showcase */}
            <section className="bg-[#20372D] text-[#F4EFE5] py-16">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <div className="flex flex-wrap items-end justify-between gap-4 mb-10">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                      10 Signature Templates
                    </span>
                    <h2 className="mt-1 font-serif text-3xl font-bold text-white sm:text-4xl">
                      Give Clients 10 Distinct Looks to Choose From
                    </h2>
                  </div>
                  <button
                    type="button"
                    onClick={() => navigate('/preview')}
                    className="rounded-full bg-[#C5A46D] px-5 py-2.5 text-xs font-bold text-[#20372D] hover:bg-[#d5b884]"
                  >
                    Open Full 10-Design Studio
                  </button>
                </div>

                <div className="grid gap-4 sm:grid-cols-2 md:grid-cols-5">
                  {DESIGN_STYLES.map((st) => (
                    <button
                      key={st.id}
                      type="button"
                      onClick={() => {
                        setDraft((prev) => ({ ...prev, selectedDesignId: st.id }));
                        navigate('/preview');
                      }}
                      className="rounded-2xl border border-[#C5A46D]/25 bg-[#162720] p-4 text-left hover:border-[#C5A46D] transition"
                    >
                      <span className="text-xs font-bold text-[#C5A46D]">
                        Design #{st.id}
                      </span>
                      <p className="mt-1 font-serif text-base font-bold text-white">
                        {st.name}
                      </p>
                      <p className="mt-1 text-[11px] text-[#F4EFE5]/70">{st.tag}</p>
                    </button>
                  ))}
                </div>
              </div>
            </section>

            {/* 6. Why Choose BrandMyCup */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="grid gap-8 lg:grid-cols-3">
                {[
                  {
                    icon: <Palette className="h-5 w-5 text-[#C5A46D]" />,
                    title: 'Instant Logo Creator & Placement Controls',
                    desc: 'Clients without a logo can generate a monogram emblem on the spot, while logo size, vertical offset, and white backing keep marks crisp on every cup.',
                  },
                  {
                    icon: <ShieldCheck className="h-5 w-5 text-[#C5A46D]" />,
                    title: 'Boundary-Safe Cup Mockups',
                    desc: 'Every cup mockup clips artwork strictly inside the conical cup wall and auto-wraps long titles so text never spills outside.',
                  },
                  {
                    icon: <Award className="h-5 w-5 text-[#C5A46D]" />,
                    title: 'Dedicated Wedding & Hotel Layouts',
                    desc: 'Purpose-built layouts for Indian weddings (couple names, hashtag, rituals) and luxury hotels (room service & concierge QR).',
                  },
                ].map((feat, idx) => (
                  <div
                    key={idx}
                    className="rounded-2xl border border-[#20372D]/12 bg-white p-6"
                  >
                    <div className="flex h-11 w-11 items-center justify-center rounded-xl bg-[#20372D]">
                      {feat.icon}
                    </div>
                    <h3 className="mt-4 font-serif text-xl font-bold text-[#20372D]">
                      {feat.title}
                    </h3>
                    <p className="mt-2 text-xs leading-relaxed text-[#242722]/75">
                      {feat.desc}
                    </p>
                  </div>
                ))}
              </div>
            </section>

            {/* 7. Featured Cup Sizes */}
            <section className="bg-white/75 border-y border-[#20372D]/10 py-14">
              <div className="mx-auto max-w-7xl px-4 sm:px-6 lg:px-8">
                <h2 className="font-serif text-3xl font-bold text-[#20372D] mb-8">
                  Featured Cup Sizes
                </h2>
                <div className="grid gap-6 md:grid-cols-3">
                  {CUP_SIZES.map((sz) => (
                    <div
                      key={sz.ml}
                      className={`rounded-2xl border p-6 transition ${
                        draft.cupSize === sz.ml
                          ? 'border-[#20372D] bg-white shadow-md'
                          : 'border-[#20372D]/12 bg-[#F4EFE5]'
                      }`}
                    >
                      <div className="flex items-center justify-between">
                        <span className="font-serif text-2xl font-bold text-[#20372D]">
                          {sz.label}
                        </span>
                        <button
                          type="button"
                          onClick={() => {
                            setDraft((prev) => ({ ...prev, cupSize: sz.ml }));
                            navigate('/preview');
                          }}
                          className="rounded-full bg-[#20372D] px-3.5 py-1 text-xs font-semibold text-[#F4EFE5]"
                        >
                          Use {sz.label}
                        </button>
                      </div>
                      <p className="mt-2 font-semibold text-sm text-[#242722]">{sz.title}</p>
                      <p className="mt-1 text-xs text-[#242722]/75">{sz.desc}</p>
                    </div>
                  ))}
                </div>
              </div>
            </section>

            {/* 8. Customer Enquiry CTA */}
            <section className="mx-auto max-w-7xl px-4 py-16 sm:px-6 lg:px-8">
              <div className="rounded-3xl bg-[#20372D] px-6 py-12 text-center text-[#F4EFE5] sm:px-12 shadow-xl">
                <h2 className="font-serif text-3xl font-bold text-white sm:text-4xl">
                  Ready to Put Your Brand in Every Hand?
                </h2>
                <p className="mx-auto mt-3 max-w-xl text-sm text-[#F4EFE5]/80">
                  Start customizing your cup now or call our direct studio desk at{' '}
                  <strong className="text-[#C5A46D]">+91 89553 50925</strong> /{' '}
                  <strong className="text-[#C5A46D]">+91 78508 65397</strong>.
                </p>
                <div className="mt-7 flex flex-wrap items-center justify-center gap-4">
                  <button
                    type="button"
                    onClick={() => {
                      setWizardStep(1);
                      navigate('/create');
                    }}
                    className="inline-flex items-center gap-2 rounded-full bg-[#C5A46D] px-7 py-3.5 text-sm font-bold text-[#20372D] hover:bg-[#d4b680]"
                  >
                    Start Custom Cup Wizard
                    <ArrowRight className="h-4 w-4" />
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/quote')}
                    className="rounded-full border border-[#F4EFE5]/35 px-6 py-3.5 text-sm font-semibold text-white hover:bg-white/10"
                  >
                    Direct Quotation Request
                  </button>
                </div>
              </div>
            </section>
          </div>
        )}

        {/* ================= CATEGORIES PAGE ================= */}
        {route === '/categories' && (
          <section className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8">
            <div className="mb-10">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                9 Business & Event Categories
              </span>
              <h1 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                Choose Your Category & Preview Sample Cup
              </h1>
            </div>

            <div className="grid gap-6 md:grid-cols-2 lg:grid-cols-3">
              {CATEGORIES.map((cat) => {
                const sampleData = {
                  ...draft,
                  categoryId: cat.id,
                  businessName:
                    cat.id === 'wedding'
                      ? 'Aarav & Meera'
                      : cat.id === 'hotel'
                      ? 'The Aravalli Palace'
                      : cat.exampleBrand,
                  categoryDetails: {
                    ...draft.categoryDetails,
                    coupleNames: 'Aarav & Meera',
                    weddingHashtag: '#AaravKiMeera',
                    ritualTag: 'Mehendi • Baraat • Reception',
                    hotelStars: '5-Star Hospitality',
                    roomServiceExt: 'Dial 0 for In-Room Service',
                  },
                };

                return (
                  <div
                    key={cat.id}
                    className="rounded-3xl border border-[#20372D]/15 bg-white p-6 shadow-xs flex flex-col justify-between"
                  >
                    <div>
                      <div className="flex items-center justify-between mb-3">
                        <span className="inline-flex items-center gap-2 text-xs font-bold uppercase tracking-wider text-[#20372D]">
                          {renderCategoryIcon(cat.iconName, 'h-4 w-4 text-[#C5A46D]')}
                          {cat.badge}
                        </span>
                        <span className="text-xs text-[#242722]/60">10 Designs</span>
                      </div>

                      <div className="flex justify-center rounded-2xl bg-[#F4EFE5] py-4 px-2 border border-[#20372D]/10">
                        <PaperCup3D
                          data={sampleData}
                          designId={cat.id === 'wedding' ? 9 : cat.id === 'hotel' ? 2 : 1}
                          side="front"
                          scaleFactor={0.85}
                          showMetaBadge={false}
                        />
                      </div>

                      <h2 className="mt-4 font-serif text-xl font-bold text-[#20372D]">
                        {cat.title}
                      </h2>
                      <p className="mt-1.5 text-xs leading-relaxed text-[#242722]/75">
                        {cat.shortDesc}
                      </p>
                    </div>

                    <button
                      type="button"
                      onClick={() => {
                        setDraft((prev) => ({
                          ...prev,
                          categoryId: cat.id,
                          businessName: sampleData.businessName,
                          categoryDetails: {
                            ...prev.categoryDetails,
                            ...sampleData.categoryDetails,
                          },
                        }));
                        setWizardStep(2);
                        navigate('/create');
                      }}
                      className="mt-5 inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#20372D] px-5 py-2.5 text-xs font-semibold text-[#F4EFE5] hover:bg-[#162720]"
                    >
                      Select {cat.title}
                      <ArrowRight className="h-3.5 w-3.5 text-[#C5A46D]" />
                    </button>
                  </div>
                );
              })}
            </div>
          </section>
        )}

        {/* ================= WIZARD PAGE (/create) ================= */}
        {route === '/create' && (
          <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8 flex flex-wrap items-center justify-between gap-4">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                  Custom Cup Creation Wizard
                </span>
                <h1 className="mt-1 font-serif text-3xl font-bold text-[#20372D]">
                  Step {wizardStep} of 5:{' '}
                  {wizardStep === 1 && 'Select Business Category'}
                  {wizardStep === 2 && 'Business & Event Details + Logo'}
                  {wizardStep === 3 && 'QR Code & Menu / Link Setup'}
                  {wizardStep === 4 && 'Choose Cup Size (65 / 110 / 150 ml)'}
                  {wizardStep === 5 && '10 Personalized Cup Designs'}
                </h1>
              </div>

              <button
                type="button"
                onClick={() => navigate('/preview')}
                className="inline-flex items-center gap-1.5 rounded-full border border-[#20372D] px-4 py-2 text-xs font-semibold text-[#20372D] hover:bg-[#20372D] hover:text-[#F4EFE5]"
              >
                <Eye className="h-3.5 w-3.5" />
                Jump to 10-Design Studio
              </button>
            </div>

            {/* Step Progress Indicator */}
            <div className="mb-8 grid grid-cols-5 gap-2">
              {[
                { n: 1, label: 'Category' },
                { n: 2, label: 'Brand & Logo' },
                { n: 3, label: 'QR Setup' },
                { n: 4, label: 'Cup Size' },
                { n: 5, label: '10 Designs' },
              ].map((s) => (
                <button
                  key={s.n}
                  type="button"
                  onClick={() => setWizardStep(s.n)}
                  className={`rounded-xl border px-3 py-2.5 text-left transition ${
                    wizardStep === s.n
                      ? 'border-[#20372D] bg-[#20372D] text-[#F4EFE5]'
                      : wizardStep > s.n
                      ? 'border-[#C5A46D] bg-white text-[#20372D]'
                      : 'border-[#20372D]/15 bg-white/60 text-[#242722]/60'
                  }`}
                >
                  <span className="block text-[10px] font-bold uppercase tracking-wider opacity-75">
                    Step {s.n}
                  </span>
                  <span className="text-xs font-semibold">{s.label}</span>
                </button>
              ))}
            </div>

            <div className="grid gap-8 lg:grid-cols-12">
              {/* Left Form Area */}
              <div className="lg:col-span-8 rounded-3xl border border-[#20372D]/15 bg-white p-6 sm:p-8 shadow-xs">
                {/* STEP 1 */}
                {wizardStep === 1 && (
                  <div className="grid gap-4 sm:grid-cols-2">
                    {CATEGORIES.map((cat) => {
                      const selected = draft.categoryId === cat.id;
                      return (
                        <button
                          key={cat.id}
                          type="button"
                          onClick={() =>
                            setDraft((prev) => ({
                              ...prev,
                              categoryId: cat.id,
                              businessName:
                                prev.businessName === DEFAULT_DRAFT.businessName ||
                                CATEGORIES.some((c) => c.exampleBrand === prev.businessName)
                                  ? cat.id === 'wedding'
                                    ? prev.categoryDetails?.coupleNames || 'Aarav & Meera'
                                    : cat.exampleBrand
                                  : prev.businessName,
                            }))
                          }
                          className={`rounded-2xl border p-4 text-left transition ${
                            selected
                              ? 'border-[#20372D] bg-[#20372D] text-[#F4EFE5] shadow-md'
                              : 'border-[#20372D]/15 bg-[#F4EFE5]/60 text-[#242722] hover:border-[#C5A46D]'
                          }`}
                        >
                          <div className="flex items-center justify-between">
                            <span className={selected ? 'text-[#C5A46D]' : 'text-[#20372D]'}>
                              {renderCategoryIcon(cat.iconName)}
                            </span>
                            {selected && (
                              <span className="rounded-full bg-[#C5A46D] px-2.5 py-0.5 text-[10px] font-bold text-[#20372D]">
                                Selected
                              </span>
                            )}
                          </div>
                          <h3 className="mt-3 font-serif text-lg font-bold">{cat.title}</h3>
                          <p
                            className={`mt-1 text-xs ${
                              selected ? 'text-[#F4EFE5]/80' : 'text-[#242722]/70'
                            }`}
                          >
                            {cat.shortDesc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 2: Business Info + Logo Upload + Logo Maker + Placement */}
                {wizardStep === 2 && (
                  <div className="space-y-6">
                    <div className="grid gap-4 sm:grid-cols-2">
                      <div>
                        <label className="block text-xs font-semibold text-[#20372D]">
                          {draft.categoryId === 'wedding'
                            ? 'Event / Couple Display Title *'
                            : 'Business / Brand Name *'}
                        </label>
                        <input
                          type="text"
                          value={draft.businessName}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, businessName: e.target.value }))
                          }
                          placeholder={
                            draft.categoryId === 'wedding'
                              ? 'e.g. Aarav & Meera'
                              : 'e.g. Kaveri Roast House'
                          }
                          className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#20372D]">
                          Contact Number *
                        </label>
                        <input
                          type="text"
                          value={draft.phone}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, phone: e.target.value }))
                          }
                          placeholder="+91 89553 50925"
                          className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#20372D]">
                          Instagram Username
                        </label>
                        <input
                          type="text"
                          value={draft.instagram}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, instagram: e.target.value }))
                          }
                          placeholder="@yourbrand"
                          className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                        />
                      </div>

                      <div>
                        <label className="block text-xs font-semibold text-[#20372D]">
                          Website URL
                        </label>
                        <input
                          type="text"
                          value={draft.website}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, website: e.target.value }))
                          }
                          placeholder="https://yourbrand.in"
                          className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                        />
                      </div>

                      <div className="sm:col-span-2">
                        <label className="block text-xs font-semibold text-[#20372D]">
                          Business / Event Location
                        </label>
                        <input
                          type="text"
                          value={draft.location}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, location: e.target.value }))
                          }
                          placeholder="e.g. Vaishali Nagar, Jaipur"
                          className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                        />
                      </div>
                    </div>

                    {/* Brand Primary & Secondary Colors */}
                    <div className="rounded-2xl border border-[#20372D]/12 bg-[#F4EFE5]/60 p-4">
                      <label className="block text-xs font-bold uppercase tracking-wider text-[#20372D]">
                        Brand Primary & Accent Colors
                      </label>
                      <div className="mt-2.5 flex flex-wrap items-center gap-2">
                        {COLOR_PRESETS.map((p) => (
                          <button
                            key={p.hex}
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({ ...prev, primaryColor: p.hex }))
                            }
                            className={`inline-flex items-center gap-1.5 rounded-full border px-3 py-1 text-xs font-medium ${
                              draft.primaryColor === p.hex
                                ? 'border-[#20372D] bg-[#20372D] text-white'
                                : 'border-[#20372D]/15 bg-white text-[#242722]'
                            }`}
                          >
                            <span
                              style={{ backgroundColor: p.hex }}
                              className="h-3 w-3 rounded-full border border-black/20"
                            />
                            {p.name}
                          </button>
                        ))}
                        <input
                          type="color"
                          value={draft.primaryColor}
                          onChange={(e) =>
                            setDraft((prev) => ({ ...prev, primaryColor: e.target.value }))
                          }
                          className="h-7 w-10 cursor-pointer rounded border border-[#20372D]/20 bg-white"
                          title="Custom Primary Color"
                        />
                      </div>
                    </div>

                    {/* Logo Upload + Built-In Logo Maker + Live Size/Position Adjuster */}
                    <div className="rounded-2xl border border-[#C5A46D]/40 bg-[#F4EFE5] p-5 space-y-4">
                      <div className="flex flex-wrap items-center justify-between gap-3">
                        <div>
                          <h3 className="font-serif text-base font-bold text-[#20372D]">
                            Logo Upload, Instant Logo Creator & Cup Placement
                          </h3>
                          <p className="text-xs text-[#242722]/70">
                            Upload a PNG/JPG/SVG logo or create one right here, then adjust how it sits on the cup.
                          </p>
                        </div>
                        <div className="flex flex-wrap gap-2">
                          <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#20372D] bg-white px-4 py-2 text-xs font-semibold text-[#20372D] hover:bg-[#20372D]/5">
                            <Upload className="h-3.5 w-3.5" />
                            Upload Logo
                            <input
                              type="file"
                              accept="image/*"
                              onChange={handleLogoUpload}
                              className="hidden"
                            />
                          </label>
                          <button
                            type="button"
                            onClick={() => setLogoMakerOpen(true)}
                            className="inline-flex items-center gap-1.5 rounded-full bg-[#20372D] px-4 py-2 text-xs font-semibold text-[#F4EFE5] hover:bg-[#162720]"
                          >
                            <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                            Create Logo on Website
                          </button>
                        </div>
                      </div>

                      {draft.logoDataUrl && (
                        <div className="flex flex-wrap items-center justify-between gap-4 rounded-xl border border-[#20372D]/15 bg-white p-3">
                          <div className="flex items-center gap-3">
                            <img
                              src={draft.logoDataUrl}
                              alt="Uploaded Logo"
                              className="h-12 w-12 rounded-lg object-contain border border-black/10 p-1"
                            />
                            <div>
                              <p className="text-xs font-bold text-[#20372D]">
                                Active Cup Logo Ready
                              </p>
                              <p className="text-[11px] text-[#242722]/65">
                                {draft.logoMeta?.source || 'Custom Logo'}
                              </p>
                            </div>
                          </div>
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                logoDataUrl: '',
                                logoMeta: null,
                              }))
                            }
                            className="text-xs font-semibold text-red-700 hover:underline"
                          >
                            Remove Logo
                          </button>
                        </div>
                      )}

                      {/* Live Logo Size, Vertical Offset & Crest Backing Controls */}
                      <div className="grid gap-4 sm:grid-cols-3 pt-1">
                        <div>
                          <div className="flex justify-between text-xs font-semibold text-[#20372D]">
                            <span>Logo Size</span>
                            <span>{draft.logoScale || 100}%</span>
                          </div>
                          <input
                            type="range"
                            min={70}
                            max={135}
                            value={draft.logoScale || 100}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                logoScale: Number(e.target.value),
                              }))
                            }
                            className="mt-1.5 w-full accent-[#20372D]"
                          />
                        </div>

                        <div>
                          <div className="flex justify-between text-xs font-semibold text-[#20372D]">
                            <span>Vertical Position</span>
                            <span>{draft.logoOffsetY || 0}px</span>
                          </div>
                          <input
                            type="range"
                            min={-14}
                            max={14}
                            value={draft.logoOffsetY || 0}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                logoOffsetY: Number(e.target.value),
                              }))
                            }
                            className="mt-1.5 w-full accent-[#20372D]"
                          />
                        </div>

                        <div className="flex items-end">
                          <button
                            type="button"
                            onClick={() =>
                              setDraft((prev) => ({
                                ...prev,
                                logoBacking: !prev.logoBacking,
                              }))
                            }
                            className={`w-full rounded-xl border px-3 py-2 text-xs font-semibold transition ${
                              draft.logoBacking
                                ? 'border-[#20372D] bg-[#20372D] text-[#F4EFE5]'
                                : 'border-[#20372D]/20 bg-white text-[#242722]'
                            }`}
                          >
                            {draft.logoBacking
                              ? 'Light Crest Backing: ON'
                              : 'Light Crest Backing: OFF'}
                          </button>
                        </div>
                      </div>
                    </div>

                    {/* Category-Specific Fields */}
                    <div className="rounded-2xl border border-[#20372D]/15 bg-[#F4EFE5]/40 p-5 space-y-4">
                      <h3 className="font-serif text-base font-bold text-[#20372D]">
                        {activeCategory.title} Specific Details
                      </h3>

                      {draft.categoryId === 'cafe' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold">Menu URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.menuUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    menuUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Ordering URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.orderingUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    orderingUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'restaurant' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold">Menu URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.menuUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    menuUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Ordering URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.orderingUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    orderingUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'tea' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold">WhatsApp Ordering Number</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.whatsappNumber}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    whatsappNumber: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Instagram Handle</label>
                            <input
                              type="text"
                              value={draft.instagram}
                              onChange={(e) =>
                                setDraft((prev) => ({ ...prev, instagram: e.target.value }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'bakery' && (
                        <div>
                          <label className="block text-xs font-semibold">Product Catalogue URL</label>
                          <input
                            type="text"
                            value={draft.categoryDetails.catalogueUrl}
                            onChange={(e) =>
                              setDraft((prev) => ({
                                ...prev,
                                qrDestination: e.target.value,
                                categoryDetails: {
                                  ...prev.categoryDetails,
                                  catalogueUrl: e.target.value,
                                },
                              }))
                            }
                            className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                          />
                        </div>
                      )}

                      {draft.categoryId === 'hotel' && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="block text-xs font-semibold">Hotel Category / Tier</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.hotelStars}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    hotelStars: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Room Service / Concierge Note</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.roomServiceExt}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    roomServiceExt: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Booking / Concierge URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.bookingUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    bookingUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'wedding' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold">Couple Names</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.coupleNames}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  businessName: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    coupleNames: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Wedding Hashtag</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.weddingHashtag}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    weddingHashtag: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Event / Function Name</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.eventName}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    eventName: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Rituals & Event Date</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.ritualTag}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    ritualTag: e.target.value,
                                  },
                                }))
                              }
                              placeholder="Mehendi • Baraat • Reception • 14 Dec"
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'coaching' && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="block text-xs font-semibold">Institute Name</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.instituteName}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  businessName: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    instituteName: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Courses / Batches</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.courseInfo}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    courseInfo: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Admission URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.admissionUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    admissionUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'realestate' && (
                        <div className="grid gap-3 sm:grid-cols-3">
                          <div>
                            <label className="block text-xs font-semibold">Project Name</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.projectName}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  businessName: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    projectName: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Property Highlights</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.propertyDetails}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    propertyDetails: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Site Visit / Enquiry URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.enquiryUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    enquiryUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}

                      {draft.categoryId === 'retail' && (
                        <div className="grid gap-3 sm:grid-cols-2">
                          <div>
                            <label className="block text-xs font-semibold">Retail Brand Name</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.brandName}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  businessName: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    brandName: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                          <div>
                            <label className="block text-xs font-semibold">Product Catalogue URL</label>
                            <input
                              type="text"
                              value={draft.categoryDetails.catalogueUrl}
                              onChange={(e) =>
                                setDraft((prev) => ({
                                  ...prev,
                                  qrDestination: e.target.value,
                                  categoryDetails: {
                                    ...prev.categoryDetails,
                                    catalogueUrl: e.target.value,
                                  },
                                }))
                              }
                              className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-white px-3 py-2 text-xs"
                            />
                          </div>
                        </div>
                      )}
                    </div>
                  </div>
                )}

                {/* STEP 3: QR Configuration */}
                {wizardStep === 3 && (
                  <div className="space-y-6">
                    <div className="grid gap-5 md:grid-cols-12 items-center">
                      <div className="md:col-span-8 space-y-4">
                        <div>
                          <label className="block text-xs font-semibold text-[#20372D]">
                            QR Destination URL (Menu, Booking, Catalogue, Wedding Invite or Offer)
                          </label>
                          <input
                            type="text"
                            value={draft.qrDestination}
                            onChange={(e) =>
                              setDraft((prev) => ({ ...prev, qrDestination: e.target.value }))
                            }
                            placeholder="https://yourbrand.in/menu"
                            className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                          />
                        </div>

                        <div>
                          <label className="block text-xs font-semibold text-[#20372D]">
                            QR Caption on Cup Back
                          </label>
                          <input
                            type="text"
                            value={draft.qrLabel}
                            onChange={(e) =>
                              setDraft((prev) => ({ ...prev, qrLabel: e.target.value }))
                            }
                            placeholder="Scan for Menu & Offers"
                            className="mt-1.5 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/50 px-3.5 py-2.5 text-sm focus:border-[#20372D] focus:outline-none"
                          />
                        </div>

                        <div className="rounded-2xl border border-dashed border-[#20372D]/30 bg-[#F4EFE5]/60 p-4">
                          <div className="flex flex-wrap items-center justify-between gap-2">
                            <span className="text-xs font-semibold text-[#20372D]">
                              Optional Menu / Brochure PDF Placeholder
                            </span>
                            <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full bg-white px-3.5 py-1.5 text-xs font-semibold text-[#20372D] border border-[#20372D]/20">
                              <Upload className="h-3.5 w-3.5" />
                              Choose PDF
                              <input
                                type="file"
                                accept="application/pdf"
                                onChange={handlePdfUpload}
                                className="hidden"
                              />
                            </label>
                          </div>
                          <p className="mt-2 text-[11px] text-[#242722]/70">
                            {draft.categoryDetails.menuPdfName
                              ? `Selected PDF: ${draft.categoryDetails.menuPdfName} — Provide a hosted URL above once uploaded so the QR code resolves live in print.`
                              : 'No PDF selected yet. Paste a hosted menu/catalogue link above for live QR scanning.'}
                          </p>
                        </div>
                      </div>

                      <div className="md:col-span-4 flex flex-col items-center rounded-2xl border border-[#20372D]/15 bg-[#F4EFE5] p-5">
                        <QrPreviewBox value={draft.qrDestination} size={112} />
                        <span className="mt-3 text-xs font-bold text-[#20372D]">
                          Back-of-Cup QR Preview
                        </span>
                        <span className="mt-0.5 max-w-[160px] truncate text-[11px] text-[#242722]/65">
                          {draft.qrDestination || 'https://brandmycup.in'}
                        </span>
                      </div>
                    </div>
                  </div>
                )}

                {/* STEP 4: Cup Size Selection */}
                {wizardStep === 4 && (
                  <div className="grid gap-4 sm:grid-cols-3">
                    {CUP_SIZES.map((sz) => {
                      const active = draft.cupSize === sz.ml;
                      return (
                        <button
                          key={sz.ml}
                          type="button"
                          onClick={() => setDraft((prev) => ({ ...prev, cupSize: sz.ml }))}
                          className={`rounded-2xl border p-5 text-center transition flex flex-col items-center ${
                            active
                              ? 'border-[#20372D] bg-[#20372D] text-[#F4EFE5] shadow-md'
                              : 'border-[#20372D]/15 bg-[#F4EFE5]/60 text-[#242722] hover:border-[#C5A46D]'
                          }`}
                        >
                          <div className="flex h-36 items-end justify-center pb-2">
                            <svg width={sz.topW + 12} height={sz.heightPx * 0.72} viewBox="0 0 110 120">
                              <polygon
                                points="15,10 95,10 78,110 32,110"
                                fill={active ? '#C5A46D' : '#20372D'}
                                fillOpacity={active ? 0.9 : 0.18}
                                stroke={active ? '#C5A46D' : '#20372D'}
                                strokeWidth="2.5"
                              />
                            </svg>
                          </div>
                          <span className="font-serif text-2xl font-bold">{sz.label}</span>
                          <span className="mt-1 text-xs font-semibold">{sz.title}</span>
                          <p
                            className={`mt-1.5 text-[11px] ${
                              active ? 'text-[#F4EFE5]/80' : 'text-[#242722]/70'
                            }`}
                          >
                            {sz.desc}
                          </p>
                        </button>
                      );
                    })}
                  </div>
                )}

                {/* STEP 5: 10 Customized Designs */}
                {wizardStep === 5 && (
                  <div className="space-y-4">
                    <div className="flex flex-wrap items-center justify-between gap-2">
                      <p className="text-xs text-[#242722]/75">
                        Showing <strong>10 customized designs</strong> for <strong>{activeCategory.title}</strong>. Click any cup to select it.
                      </p>
                      <button
                        type="button"
                        onClick={() => navigate('/preview')}
                        className="rounded-full bg-[#C5A46D] px-4 py-1.5 text-xs font-bold text-[#20372D]"
                      >
                        Open Full Studio & Quote →
                      </button>
                    </div>

                    <div className="grid gap-4 sm:grid-cols-2">
                      {DESIGN_STYLES.map((st) => {
                        const isSelected = draft.selectedDesignId === st.id;
                        return (
                          <div
                            key={st.id}
                            onClick={() =>
                              setDraft((prev) => ({ ...prev, selectedDesignId: st.id }))
                            }
                            className={`cursor-pointer rounded-2xl border p-4 transition ${
                              isSelected
                                ? 'border-[#20372D] bg-[#F4EFE5] ring-2 ring-[#C5A46D]'
                                : 'border-[#20372D]/12 bg-white hover:border-[#C5A46D]'
                            }`}
                          >
                            <div className="flex items-center justify-between mb-2">
                              <span className="text-xs font-bold text-[#20372D]">
                                #{st.id} {st.name}
                              </span>
                              {isSelected && (
                                <span className="rounded-full bg-[#20372D] px-2.5 py-0.5 text-[10px] font-bold text-[#C5A46D]">
                                  Selected
                                </span>
                              )}
                            </div>
                            <div className="flex justify-center py-2">
                              <PaperCup3D
                                data={draft}
                                designId={st.id}
                                side={cardSides[st.id] || 'front'}
                                scaleFactor={0.78}
                                showMetaBadge={false}
                              />
                            </div>
                            <div className="mt-2 flex items-center justify-between text-[11px]">
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  toggleCardSide(st.id);
                                }}
                                className="font-semibold text-[#20372D] underline"
                              >
                                Flip Front / Back
                              </button>
                              <button
                                type="button"
                                onClick={(e) => {
                                  e.stopPropagation();
                                  setInspectDesignId(st.id);
                                }}
                                className="font-semibold text-[#9C7A3C]"
                              >
                                Larger View
                              </button>
                            </div>
                          </div>
                        );
                      })}
                    </div>
                  </div>
                )}

                {/* Wizard Footer Navigation */}
                <div className="mt-8 flex items-center justify-between border-t border-[#20372D]/12 pt-5">
                  <button
                    type="button"
                    disabled={wizardStep === 1}
                    onClick={() => setWizardStep((s) => Math.max(1, s - 1))}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#20372D]/25 px-5 py-2.5 text-xs font-semibold text-[#20372D] disabled:opacity-40"
                  >
                    <ArrowLeft className="h-3.5 w-3.5" />
                    Previous
                  </button>

                  {wizardStep < 5 ? (
                    <button
                      type="button"
                      onClick={() => setWizardStep((s) => Math.min(5, s + 1))}
                      className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-6 py-2.5 text-xs font-bold text-[#F4EFE5] hover:bg-[#162720]"
                    >
                      Next Step
                      <ArrowRight className="h-3.5 w-3.5 text-[#C5A46D]" />
                    </button>
                  ) : (
                    <button
                      type="button"
                      onClick={() => navigate('/preview')}
                      className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-6 py-2.5 text-xs font-bold text-[#F4EFE5] hover:bg-[#162720]"
                    >
                      Continue to Design Selection & Quote
                      <ArrowRight className="h-3.5 w-3.5 text-[#C5A46D]" />
                    </button>
                  )}
                </div>
              </div>

              {/* Right Sticky Live Cup Preview */}
              <div className="lg:col-span-4">
                <div className="sticky top-24 rounded-3xl border border-[#20372D]/15 bg-white p-6 shadow-xs">
                  <div className="flex items-center justify-between border-b border-[#20372D]/10 pb-3">
                    <div>
                      <span className="text-[10px] font-bold uppercase tracking-widest text-[#C5A46D]">
                        Live Cup Preview
                      </span>
                      <p className="font-serif text-base font-bold text-[#20372D]">
                        {activeDesign.name}
                      </p>
                    </div>
                    <button
                      type="button"
                      onClick={() => setInspectDesignId(draft.selectedDesignId)}
                      className="rounded-lg bg-[#F4EFE5] p-2 text-[#20372D] hover:bg-[#C5A46D]/25"
                      title="Expand Preview"
                    >
                      <Maximize2 className="h-4 w-4" />
                    </button>
                  </div>

                  <div className="my-4 flex justify-center rounded-2xl bg-[#F4EFE5] py-4">
                    <PaperCup3D
                      data={draft}
                      designId={draft.selectedDesignId || 1}
                      side={cardSides['sidebar'] || 'front'}
                      scaleFactor={0.86}
                    />
                  </div>

                  <button
                    type="button"
                    onClick={() => toggleCardSide('sidebar')}
                    className="w-full rounded-full border border-[#20372D]/20 py-2 text-xs font-semibold text-[#20372D] hover:bg-[#20372D]/5"
                  >
                    Switch Front / Back Side
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}

        {/* ================= DESIGN STUDIO & PREVIEW (/preview) ================= */}
        {route === '/preview' && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="flex flex-wrap items-end justify-between gap-4 mb-8">
              <div>
                <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                  10 Personalized Cup Designs • {activeCategory.title}
                </span>
                <h1 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                  Preview & Select Your Preferred Cup Design
                </h1>
              </div>
              <div className="flex flex-wrap gap-3">
                <button
                  type="button"
                  onClick={() => {
                    setWizardStep(2);
                    navigate('/create');
                  }}
                  className="inline-flex items-center gap-1.5 rounded-full border border-[#20372D] px-4 py-2.5 text-xs font-semibold text-[#20372D]"
                >
                  <Sliders className="h-3.5 w-3.5" />
                  Edit Details & Logo
                </button>
                <button
                  type="button"
                  onClick={() => navigate('/quote')}
                  className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-6 py-2.5 text-xs font-bold text-[#F4EFE5] shadow-md hover:bg-[#162720]"
                >
                  Continue to Quotation
                  <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
                </button>
              </div>
            </div>

            {/* Quick Logo & Placement Studio Bar */}
            <div className="mb-8 rounded-2xl border border-[#20372D]/15 bg-white p-4 sm:p-5 flex flex-wrap items-center justify-between gap-4">
              <div className="flex flex-wrap items-center gap-3">
                <button
                  type="button"
                  onClick={() => setLogoMakerOpen(true)}
                  className="inline-flex items-center gap-1.5 rounded-full bg-[#20372D] px-4 py-2 text-xs font-semibold text-[#F4EFE5]"
                >
                  <Sparkles className="h-3.5 w-3.5 text-[#C5A46D]" />
                  {draft.logoDataUrl ? 'Edit / Replace Logo' : 'Create Logo Here'}
                </button>
                <label className="inline-flex cursor-pointer items-center gap-1.5 rounded-full border border-[#20372D]/25 px-4 py-2 text-xs font-semibold text-[#20372D]">
                  <Upload className="h-3.5 w-3.5" />
                  Upload Logo
                  <input type="file" accept="image/*" onChange={handleLogoUpload} className="hidden" />
                </label>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#20372D]">
                  <span>Size:</span>
                  <input
                    type="range"
                    min={75}
                    max={130}
                    value={draft.logoScale || 100}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, logoScale: Number(e.target.value) }))
                    }
                    className="w-24 accent-[#20372D]"
                  />
                  <span>{draft.logoScale || 100}%</span>
                </div>
                <div className="flex items-center gap-2 text-xs font-semibold text-[#20372D]">
                  <span>Y-Pos:</span>
                  <input
                    type="range"
                    min={-14}
                    max={14}
                    value={draft.logoOffsetY || 0}
                    onChange={(e) =>
                      setDraft((prev) => ({ ...prev, logoOffsetY: Number(e.target.value) }))
                    }
                    className="w-24 accent-[#20372D]"
                  />
                </div>
              </div>

              <div className="text-xs text-[#242722]/75">
                Selected: <strong className="text-[#20372D]">#{activeDesign.id} {activeDesign.name}</strong> • Cup Size: <strong className="text-[#20372D]">{draft.cupSize} ml</strong>
              </div>
            </div>

            {/* 10 Design Cards Grid */}
            <div className="grid gap-6 sm:grid-cols-2 lg:grid-cols-5">
              {DESIGN_STYLES.map((st) => {
                const selected = draft.selectedDesignId === st.id;
                const currentSide = cardSides[st.id] || 'front';

                return (
                  <div
                    key={st.id}
                    className={`rounded-3xl border p-4 transition flex flex-col justify-between ${
                      selected
                        ? 'border-[#20372D] bg-white ring-2 ring-[#C5A46D] shadow-lg'
                        : 'border-[#20372D]/12 bg-white/90 hover:border-[#C5A46D]'
                    }`}
                  >
                    <div>
                      <div className="flex items-center justify-between gap-1 mb-2">
                        <span className="text-[11px] font-bold text-[#C5A46D]">
                          #{st.id} • {st.tag}
                        </span>
                        {selected && (
                          <span className="rounded-full bg-[#20372D] px-2 py-0.5 text-[10px] font-bold text-[#C5A46D]">
                            Selected
                          </span>
                        )}
                      </div>
                      <h2 className="font-serif text-base font-bold text-[#20372D] leading-snug">
                        {st.name}
                      </h2>

                      <div className="my-3 flex justify-center rounded-2xl bg-[#F4EFE5] py-3 px-1">
                        <PaperCup3D
                          data={draft}
                          designId={st.id}
                          side={currentSide}
                          scaleFactor={0.72}
                          showMetaBadge={false}
                        />
                      </div>
                    </div>

                    <div className="space-y-2 pt-1">
                      <div className="flex items-center justify-between text-[11px]">
                        <button
                          type="button"
                          onClick={() => toggleCardSide(st.id)}
                          className="font-semibold text-[#20372D] hover:underline"
                        >
                          {currentSide === 'front' ? 'Show Back & QR' : 'Show Front'}
                        </button>
                        <button
                          type="button"
                          onClick={() => setInspectDesignId(st.id)}
                          className="inline-flex items-center gap-1 font-semibold text-[#8E6D35]"
                        >
                          <Maximize2 className="h-3 w-3" />
                          Inspect
                        </button>
                      </div>

                      <button
                        type="button"
                        onClick={() =>
                          setDraft((prev) => ({ ...prev, selectedDesignId: st.id }))
                        }
                        className={`w-full rounded-full py-2 text-xs font-bold transition ${
                          selected
                            ? 'bg-[#20372D] text-[#C5A46D]'
                            : 'border border-[#20372D] text-[#20372D] hover:bg-[#20372D] hover:text-[#F4EFE5]'
                        }`}
                      >
                        {selected ? 'Selected Design' : 'Choose This Design'}
                      </button>
                    </div>
                  </div>
                );
              })}
            </div>

            {/* Selection Summary & Proofing Note */}
            <div className="mt-10 rounded-3xl border border-[#20372D]/15 bg-white p-6 flex flex-wrap items-center justify-between gap-6">
              <div className="space-y-1 max-w-2xl">
                <h3 className="font-serif text-xl font-bold text-[#20372D]">
                  Summary: {draft.businessName} ({activeCategory.title})
                </h3>
                <p className="text-xs text-[#242722]/75">
                  Design #{activeDesign.id} ({activeDesign.name}) • Cup Size: {draft.cupSize} ml • Contact: {draft.phone} • Location: {draft.location}
                </p>
                <p className="text-[11px] font-medium text-[#8E6D35]">
                  Note: This preview is conceptual. Final print artwork, color separations, and dielines require production approval before printing.
                </p>
              </div>
              <button
                type="button"
                onClick={() => navigate('/quote')}
                className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-7 py-3.5 text-sm font-bold text-[#F4EFE5] hover:bg-[#162720]"
              >
                Request Quote for Design #{activeDesign.id}
                <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
              </button>
            </div>
          </section>
        )}

        {/* ================= QUOTATION REQUEST (/quote) ================= */}
        {route === '/quote' && (
          <section className="mx-auto max-w-6xl px-4 py-10 sm:px-6 lg:px-8">
            <div className="mb-8">
              <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                Direct Studio Quotation
              </span>
              <h1 className="mt-1 font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
                Request Your Custom Cup Quotation
              </h1>
              <p className="mt-1 text-xs text-[#242722]/75">
                Every submission is stored in your Owner Admin Panel (/admin) with the client&apos;s cup preview and details.
              </p>
            </div>

            {submittedQuote ? (
              <div className="rounded-3xl border border-[#20372D]/20 bg-white p-8 shadow-md space-y-6">
                <div className="flex flex-wrap items-center justify-between gap-4 border-b border-[#20372D]/12 pb-5">
                  <div className="flex items-center gap-3">
                    <CheckCircle2 className="h-9 w-9 text-[#20372D]" />
                    <div>
                      <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                        Enquiry Logged • ID {submittedQuote.id}
                      </span>
                      <h2 className="font-serif text-2xl font-bold text-[#20372D]">
                        Quotation Request Recorded for {submittedQuote.businessName}
                      </h2>
                    </div>
                  </div>
                  <div className="flex gap-2">
                    <button
                      type="button"
                      onClick={() => {
                        setSelectedEnquiryId(submittedQuote.id);
                        navigate('/admin');
                      }}
                      className="rounded-full bg-[#20372D] px-5 py-2.5 text-xs font-bold text-[#F4EFE5]"
                    >
                      Open in Owner Admin Panel
                    </button>
                    <button
                      type="button"
                      onClick={() => setSubmittedQuote(null)}
                      className="rounded-full border border-[#20372D]/25 px-4 py-2.5 text-xs font-semibold text-[#20372D]"
                    >
                      New Enquiry
                    </button>
                  </div>
                </div>

                <div className="grid gap-6 md:grid-cols-12 items-center">
                  <div className="md:col-span-4 flex justify-center rounded-2xl bg-[#F4EFE5] p-4">
                    <PaperCup3D
                      data={submittedQuote.snapshot}
                      designId={submittedQuote.selectedDesignId}
                      side="front"
                      scaleFactor={0.85}
                    />
                  </div>
                  <div className="md:col-span-8 grid gap-3 sm:grid-cols-2 text-xs">
                    <div className="rounded-xl bg-[#F4EFE5]/70 p-3.5">
                      <span className="text-[#242722]/60 block">Contact Person</span>
                      <strong className="text-sm text-[#20372D]">{submittedQuote.fullName}</strong>
                    </div>
                    <div className="rounded-xl bg-[#F4EFE5]/70 p-3.5">
                      <span className="text-[#242722]/60 block">Phone & City</span>
                      <strong className="text-sm text-[#20372D]">
                        {submittedQuote.phone} • {submittedQuote.deliveryCity}
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#F4EFE5]/70 p-3.5">
                      <span className="text-[#242722]/60 block">Quantity & Cup Size</span>
                      <strong className="text-sm text-[#20372D]">
                        {submittedQuote.quantity} cups • {submittedQuote.cupSize} ml
                      </strong>
                    </div>
                    <div className="rounded-xl bg-[#F4EFE5]/70 p-3.5">
                      <span className="text-[#242722]/60 block">Selected Design</span>
                      <strong className="text-sm text-[#20372D]">
                        Design #{submittedQuote.selectedDesignId}
                      </strong>
                    </div>
                  </div>
                </div>
              </div>
            ) : (
              <div className="grid gap-8 lg:grid-cols-12">
                <form
                  onSubmit={handleQuoteSubmit}
                  className="lg:col-span-8 rounded-3xl border border-[#20372D]/15 bg-white p-6 sm:p-8 space-y-5"
                >
                  {quoteError && (
                    <div className="rounded-xl bg-red-50 border border-red-200 px-4 py-3 text-xs font-semibold text-red-800">
                      {quoteError}
                    </div>
                  )}

                  <div className="grid gap-4 sm:grid-cols-2">
                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Full Name *
                      </label>
                      <input
                        type="text"
                        value={quoteForm.fullName}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, fullName: e.target.value }))
                        }
                        placeholder="Your Name"
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Business / Event Name *
                      </label>
                      <input
                        type="text"
                        value={quoteForm.businessName}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, businessName: e.target.value }))
                        }
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Phone Number *
                      </label>
                      <input
                        type="text"
                        value={quoteForm.phone}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, phone: e.target.value }))
                        }
                        placeholder="+91 ..."
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Email Address
                      </label>
                      <input
                        type="email"
                        value={quoteForm.email}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, email: e.target.value }))
                        }
                        placeholder="client@domain.com"
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Order Quantity
                      </label>
                      <select
                        value={quoteForm.quantity}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, quantity: e.target.value }))
                        }
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      >
                        <option value="1,000">1,000 Cups</option>
                        <option value="5,000">5,000 Cups</option>
                        <option value="10,000">10,000 Cups</option>
                        <option value="20,000">20,000 Cups</option>
                        <option value="Custom">Custom Quantity</option>
                      </select>
                    </div>

                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Delivery City
                      </label>
                      <input
                        type="text"
                        value={quoteForm.deliveryCity}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, deliveryCity: e.target.value }))
                        }
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  </div>

                  {quoteForm.quantity === 'Custom' && (
                    <div>
                      <label className="block text-xs font-semibold text-[#20372D]">
                        Custom Cup Quantity
                      </label>
                      <input
                        type="number"
                        min={500}
                        step={500}
                        value={quoteForm.customQuantity}
                        onChange={(e) =>
                          setQuoteForm((p) => ({ ...p, customQuantity: e.target.value }))
                        }
                        placeholder="e.g. 3500"
                        className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                      />
                    </div>
                  )}

                  <div>
                    <label className="block text-xs font-semibold text-[#20372D]">
                      Additional Printing / Event Notes
                    </label>
                    <textarea
                      rows={3}
                      value={quoteForm.notes}
                      onChange={(e) =>
                        setQuoteForm((p) => ({ ...p, notes: e.target.value }))
                      }
                      placeholder="Any special notes about paper finish, delivery timeline, or event dates..."
                      className="mt-1 w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5]/40 px-3.5 py-2.5 text-sm"
                    />
                  </div>

                  <p className="text-[11px] text-[#242722]/70">
                    No online payment is collected here. Final print artwork and quotation terms are confirmed after studio review.
                  </p>

                  <button
                    type="submit"
                    className="inline-flex items-center gap-2 rounded-full bg-[#20372D] px-7 py-3.5 text-sm font-bold text-[#F4EFE5] hover:bg-[#162720]"
                  >
                    Request My Quote
                    <ArrowRight className="h-4 w-4 text-[#C5A46D]" />
                  </button>
                </form>

                <div className="lg:col-span-4 rounded-3xl border border-[#20372D]/15 bg-white p-6 space-y-4">
                  <div className="flex items-center justify-between">
                    <span className="text-xs font-bold uppercase tracking-wider text-[#C5A46D]">
                      Selected Cup
                    </span>
                    <button
                      type="button"
                      onClick={() => navigate('/preview')}
                      className="text-xs font-bold text-[#20372D] underline"
                    >
                      Change Design
                    </button>
                  </div>
                  <div className="flex justify-center rounded-2xl bg-[#F4EFE5] py-4">
                    <PaperCup3D
                      data={draft}
                      designId={draft.selectedDesignId}
                      side="front"
                      scaleFactor={0.82}
                    />
                  </div>
                  <div className="text-xs space-y-1 border-t border-[#20372D]/10 pt-3">
                    <p>
                      <strong>Design:</strong> #{activeDesign.id} {activeDesign.name}
                    </p>
                    <p>
                      <strong>Size:</strong> {draft.cupSize} ml
                    </p>
                    <p>
                      <strong>Category:</strong> {activeCategory.title}
                    </p>
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ================= OWNER ADMIN PANEL (/admin) ================= */}
        {route === '/admin' && (
          <section className="mx-auto max-w-7xl px-4 py-10 sm:px-6 lg:px-8">
            {!adminUnlocked ? (
              <div className="mx-auto max-w-md rounded-3xl border border-[#C5A46D]/40 bg-white p-8 shadow-xl text-center">
                <div className="mx-auto flex h-14 w-14 items-center justify-center rounded-2xl bg-[#20372D] text-[#C5A46D]">
                  <Lock className="h-6 w-6" />
                </div>
                <h1 className="mt-4 font-serif text-2xl font-bold text-[#20372D]">
                  BrandMyCup Owner Admin Panel
                </h1>
                <p className="mt-1.5 text-xs text-[#242722]/75">
                  View incoming client quotations, inspect their selected cup mockups, and manage order & delivery stages.
                </p>

                {pinError && (
                  <p className="mt-3 rounded-xl bg-red-50 px-3 py-2 text-xs font-semibold text-red-700">
                    {pinError}
                  </p>
                )}

                <div className="mt-5 space-y-3">
                  <input
                    type="password"
                    value={pinInput}
                    onChange={(e) => setPinInput(e.target.value)}
                    placeholder="Enter Owner PIN (2026)"
                    className="w-full rounded-xl border border-[#20372D]/25 bg-[#F4EFE5]/50 px-4 py-2.5 text-center text-sm font-semibold tracking-widest"
                  />
                  <button
                    type="button"
                    onClick={() => unlockAdmin(pinInput)}
                    className="w-full rounded-full bg-[#20372D] py-3 text-xs font-bold text-[#F4EFE5] hover:bg-[#162720]"
                  >
                    Unlock Admin Panel
                  </button>
                  <button
                    type="button"
                    onClick={() => unlockAdmin(ADMIN_PIN)}
                    className="w-full rounded-full border border-[#C5A46D] bg-[#C5A46D]/15 py-2.5 text-xs font-bold text-[#20372D] hover:bg-[#C5A46D]/25"
                  >
                    Owner Quick Access (PIN 2026)
                  </button>
                </div>
              </div>
            ) : (
              <div className="space-y-8">
                <div className="flex flex-wrap items-center justify-between gap-4">
                  <div>
                    <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
                      Studio Operations & Client Dossiers
                    </span>
                    <h1 className="mt-1 font-serif text-3xl font-bold text-[#20372D]">
                      Owner Admin Dashboard
                    </h1>
                  </div>
                  <button
                    type="button"
                    onClick={() => {
                      setAdminUnlocked(false);
                      try {
                        sessionStorage.removeItem(STORAGE_KEYS.ADMIN_AUTH);
                      } catch {
                        // ignore
                      }
                    }}
                    className="inline-flex items-center gap-1.5 rounded-full border border-[#20372D]/25 px-4 py-2 text-xs font-semibold text-[#20372D]"
                  >
                    <Unlock className="h-3.5 w-3.5" />
                    Lock Panel
                  </button>
                </div>

                {/* Top Summary KPIs */}
                <div className="grid gap-4 sm:grid-cols-2 lg:grid-cols-4">
                  {[
                    {
                      label: 'Total Enquiries',
                      val: enquiries.length,
                      sub: 'All client quote requests',
                    },
                    {
                      label: 'New / Pending Quote',
                      val: enquiries.filter((e) => e.enquiryStatus === 'New').length,
                      sub: 'Awaiting studio follow-up',
                    },
                    {
                      label: 'In Production',
                      val: enquiries.filter((e) => e.productionStatus === 'In Production').length,
                      sub: 'Active cup printing runs',
                    },
                    {
                      label: 'Dispatched / Packed',
                      val: enquiries.filter((e) =>
                        ['Packed', 'Dispatched', 'Delivered'].includes(e.deliveryStatus)
                      ).length,
                      sub: 'Fulfillment pipeline',
                    },
                  ].map((k, i) => (
                    <div
                      key={i}
                      className="rounded-2xl border border-[#20372D]/12 bg-white p-5"
                    >
                      <span className="text-xs font-semibold text-[#242722]/65">{k.label}</span>
                      <p className="mt-1 font-serif text-3xl font-bold text-[#20372D]">
                        {k.val}
                      </p>
                      <span className="text-[11px] text-[#C5A46D] font-medium">{k.sub}</span>
                    </div>
                  ))}
                </div>

                {/* Filter Tabs */}
                <div className="flex flex-wrap gap-2">
                  {[
                    { id: 'all', label: 'All Enquiries' },
                    { id: 'New', label: 'New Quotes' },
                    { id: 'Quoted', label: 'Quoted' },
                    { id: 'Confirmed', label: 'Confirmed Orders' },
                  ].map((t) => (
                    <button
                      key={t.id}
                      type="button"
                      onClick={() => setAdminTab(t.id)}
                      className={`rounded-full px-4 py-2 text-xs font-bold transition ${
                        adminTab === t.id
                          ? 'bg-[#20372D] text-[#F4EFE5]'
                          : 'bg-white text-[#242722] border border-[#20372D]/15'
                      }`}
                    >
                      {t.label}
                    </button>
                  ))}
                </div>

                {/* Enquiries List + Detailed Client Cup Dossier */}
                <div className="grid gap-6 lg:grid-cols-12">
                  <div className="lg:col-span-7 space-y-3">
                    {enquiries
                      .filter((e) => (adminTab === 'all' ? true : e.enquiryStatus === adminTab))
                      .map((enq) => {
                        const catName =
                          CATEGORIES.find((c) => c.id === enq.categoryId)?.title ||
                          enq.categoryId;
                        const isSel = activeEnquiry?.id === enq.id;

                        return (
                          <div
                            key={enq.id}
                            onClick={() => setSelectedEnquiryId(enq.id)}
                            className={`cursor-pointer rounded-2xl border p-4 transition ${
                              isSel
                                ? 'border-[#20372D] bg-white ring-2 ring-[#C5A46D]'
                                : 'border-[#20372D]/12 bg-white/85 hover:border-[#C5A46D]'
                            }`}
                          >
                            <div className="flex flex-wrap items-center justify-between gap-2">
                              <div>
                                <span className="text-[11px] font-bold text-[#C5A46D]">
                                  {enq.id} • {enq.createdAt}
                                </span>
                                <h3 className="font-serif text-lg font-bold text-[#20372D]">
                                  {enq.businessName}{' '}
                                  <span className="font-sans text-xs font-normal text-[#242722]/70">
                                    ({enq.fullName})
                                  </span>
                                </h3>
                              </div>
                              <span className="rounded-full bg-[#20372D] px-3 py-1 text-[11px] font-bold text-[#F4EFE5]">
                                {enq.enquiryStatus}
                              </span>
                            </div>

                            <div className="mt-2 flex flex-wrap gap-3 text-xs text-[#242722]/75">
                              <span>Category: <strong>{catName}</strong></span>
                              <span>Size: <strong>{enq.cupSize} ml</strong></span>
                              <span>Qty: <strong>{enq.quantity}</strong></span>
                              <span>City: <strong>{enq.deliveryCity}</strong></span>
                              <span>Design: <strong>#{enq.selectedDesignId}</strong></span>
                            </div>
                          </div>
                        );
                      })}
                  </div>

                  {/* Selected Client Full Dossier */}
                  <div className="lg:col-span-5">
                    {activeEnquiry ? (
                      <div className="rounded-3xl border border-[#20372D]/15 bg-white p-6 space-y-5 sticky top-24">
                        <div className="flex items-start justify-between gap-2 border-b border-[#20372D]/10 pb-4">
                          <div>
                            <span className="text-[11px] font-bold uppercase tracking-wider text-[#C5A46D]">
                              Client Quotation Dossier
                            </span>
                            <h2 className="font-serif text-xl font-bold text-[#20372D]">
                              {activeEnquiry.businessName}
                            </h2>
                            <p className="text-xs text-[#242722]/70">
                              {activeEnquiry.fullName} • {activeEnquiry.phone}
                            </p>
                          </div>
                          <button
                            type="button"
                            onClick={() => deleteEnquiry(activeEnquiry.id)}
                            className="rounded-lg p-2 text-red-700 hover:bg-red-50"
                            title="Delete Enquiry"
                          >
                            <Trash2 className="h-4 w-4" />
                          </button>
                        </div>

                        <div className="flex justify-center rounded-2xl bg-[#F4EFE5] py-4">
                          <PaperCup3D
                            data={activeEnquiry.snapshot || draft}
                            designId={activeEnquiry.selectedDesignId || 1}
                            side="front"
                            scaleFactor={0.82}
                          />
                        </div>

                        {activeEnquiry.notes && (
                          <div className="rounded-xl bg-[#F4EFE5]/70 p-3 text-xs text-[#242722]">
                            <strong>Client Notes:</strong> {activeEnquiry.notes}
                          </div>
                        )}

                        <div className="grid gap-3 sm:grid-cols-3 text-xs">
                          <div>
                            <label className="block font-semibold text-[#20372D] mb-1">
                              Enquiry Status
                            </label>
                            <select
                              value={activeEnquiry.enquiryStatus}
                              onChange={(e) =>
                                updateEnquiryField(
                                  activeEnquiry.id,
                                  'enquiryStatus',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5] px-2.5 py-2 font-semibold"
                            >
                              <option value="New">New</option>
                              <option value="Quoted">Quoted</option>
                              <option value="Confirmed">Confirmed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-[#20372D] mb-1">
                              Production
                            </label>
                            <select
                              value={activeEnquiry.productionStatus}
                              onChange={(e) =>
                                updateEnquiryField(
                                  activeEnquiry.id,
                                  'productionStatus',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5] px-2.5 py-2 font-semibold"
                            >
                              <option value="Pending Approval">Pending Approval</option>
                              <option value="Artwork Proofing">Artwork Proofing</option>
                              <option value="In Production">In Production</option>
                              <option value="Completed">Completed</option>
                            </select>
                          </div>

                          <div>
                            <label className="block font-semibold text-[#20372D] mb-1">
                              Delivery
                            </label>
                            <select
                              value={activeEnquiry.deliveryStatus}
                              onChange={(e) =>
                                updateEnquiryField(
                                  activeEnquiry.id,
                                  'deliveryStatus',
                                  e.target.value
                                )
                              }
                              className="w-full rounded-xl border border-[#20372D]/20 bg-[#F4EFE5] px-2.5 py-2 font-semibold"
                            >
                              <option value="Not Started">Not Started</option>
                              <option value="Scheduled">Scheduled</option>
                              <option value="Packed">Packed</option>
                              <option value="Dispatched">Dispatched</option>
                              <option value="Delivered">Delivered</option>
                            </select>
                          </div>
                        </div>

                        <a
                          href={`https://wa.me/${activeEnquiry.phone.replace(/\D/g, '') || PRIMARY_WA}?text=${encodeURIComponent(
                            `Hello ${activeEnquiry.fullName}, regarding your BrandMyCup quotation (${activeEnquiry.id}) for ${activeEnquiry.businessName} — ${activeEnquiry.quantity} cups (${activeEnquiry.cupSize} ml, Design #${activeEnquiry.selectedDesignId}).`
                          )}`}
                          target="_blank"
                          rel="noreferrer"
                          className="inline-flex w-full items-center justify-center gap-2 rounded-full bg-[#20372D] py-3 text-xs font-bold text-[#F4EFE5] hover:bg-[#162720]"
                        >
                          <MessageSquare className="h-4 w-4 text-[#C5A46D]" />
                          Message Client on WhatsApp
                        </a>
                      </div>
                    ) : (
                      <div className="rounded-3xl border border-[#20372D]/15 bg-white p-8 text-center text-xs text-[#242722]/70">
                        Select an enquiry on the left to view full client details and cup mockup.
                      </div>
                    )}
                  </div>
                </div>
              </div>
            )}
          </section>
        )}

        {/* ================= ABOUT & HOW IT WORKS & CONTACT ================= */}
        {route === '/how-it-works' && (
          <section className="mx-auto max-w-5xl px-4 py-12 sm:px-6 lg:px-8 space-y-8">
            <h1 className="font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
              How BrandMyCup Works
            </h1>
            <div className="grid gap-6 sm:grid-cols-2">
              {[
                {
                  n: '1. Select Category & Brand Details',
                  d: 'Pick from 9 categories including Cafes, Tea Shops, Bakeries, Restaurants, Hotels, Weddings, Coaching, Real Estate, and Retail.',
                },
                {
                  n: '2. Upload or Generate Your Logo',
                  d: 'Upload an existing logo or build a crisp vector crest right on our website, then tune logo size and vertical alignment.',
                },
                {
                  n: '3. Compare 10 Personalized Designs',
                  d: 'View 10 distinct 3D cup mockups with front & QR back sides, cup sizes (65 ml, 110 ml, 150 ml), and zero text overflow.',
                },
                {
                  n: '4. Submit Quotation Request',
                  d: 'Choose quantity and delivery city to log your request directly in the studio admin panel.',
                },
              ].map((b, i) => (
                <div key={i} className="rounded-2xl border border-[#20372D]/12 bg-white p-6">
                  <h2 className="font-serif text-xl font-bold text-[#20372D]">{b.n}</h2>
                  <p className="mt-2 text-xs leading-relaxed text-[#242722]/75">{b.d}</p>
                </div>
              ))}
            </div>
            <button
              type="button"
              onClick={() => navigate('/create')}
              className="rounded-full bg-[#20372D] px-6 py-3 text-xs font-bold text-[#F4EFE5]"
            >
              Start Creating Your Cup →
            </button>
          </section>
        )}

        {route === '/about' && (
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-5">
            <span className="text-xs font-bold uppercase tracking-[0.2em] text-[#C5A46D]">
              About BrandMyCup
            </span>
            <h1 className="font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
              Premium Custom Cups for Everyday Moments
            </h1>
            <p className="text-sm leading-relaxed text-[#242722]/80">
              BrandMyCup helps cafes, tea lounges, luxury hotels, wedding planners, and growing brands turn daily beverages into memorable visual touchpoints. Clients can test 10 personalized designs before placing a bulk or event quotation.
            </p>
            <div className="rounded-2xl border border-[#20372D]/15 bg-white p-6 text-xs space-y-1.5">
              <p>
                <strong>Studio Helplines:</strong> +91 89553 50925 • +91 78508 65397
              </p>
              <p>
                <strong>Available Sizes:</strong> 65 ml, 110 ml, and 150 ml
              </p>
            </div>
          </section>
        )}

        {route === '/contact' && (
          <section className="mx-auto max-w-4xl px-4 py-12 sm:px-6 lg:px-8 space-y-6">
            <h1 className="font-serif text-3xl font-bold text-[#20372D] sm:text-4xl">
              Contact BrandMyCup
            </h1>
            <div className="grid gap-5 sm:grid-cols-2">
              <div className="rounded-2xl border border-[#20372D]/15 bg-white p-6 space-y-3 text-sm">
                <p className="font-serif text-lg font-bold text-[#20372D]">Direct Phone Lines</p>
                <a
                  href="tel:+918955350925"
                  className="flex items-center gap-2 font-semibold text-[#20372D]"
                >
                  <Phone className="h-4 w-4 text-[#C5A46D]" /> +91 89553 50925
                </a>
                <a
                  href="tel:+917850865397"
                  className="flex items-center gap-2 font-semibold text-[#20372D]"
                >
                  <Phone className="h-4 w-4 text-[#C5A46D]" /> +91 78508 65397
                </a>
              </div>
              <div className="rounded-2xl border border-[#20372D]/15 bg-white p-6 space-y-3 text-sm">
                <p className="font-serif text-lg font-bold text-[#20372D]">Quick Actions</p>
                <div className="flex flex-wrap gap-2">
                  <button
                    type="button"
                    onClick={() => navigate('/create')}
                    className="rounded-full bg-[#20372D] px-4 py-2 text-xs font-bold text-[#F4EFE5]"
                  >
                    Open Cup Wizard
                  </button>
                  <button
                    type="button"
                    onClick={() => navigate('/quote')}
                    className="rounded-full border border-[#20372D] px-4 py-2 text-xs font-bold text-[#20372D]"
                  >
                    Submit Quotation
                  </button>
                </div>
              </div>
            </div>
          </section>
        )}
      </main>

      {/* Footer */}
      <footer className="bg-[#20372D] text-[#F4EFE5] border-t border-[#C5A46D]/25">
        <div className="mx-auto max-w-7xl px-4 py-12 sm:px-6 lg:px-8 grid gap-8 md:grid-cols-4 text-xs">
          <div className="md:col-span-2 space-y-3">
            <span className="font-serif text-2xl font-bold text-white">
              Brand<span className="text-[#C5A46D]">My</span>Cup
            </span>
            <p className="max-w-md leading-relaxed text-[#F4EFE5]/75">
              Custom branded disposable paper cups with 10 tailored design templates per category, built-in logo creation, live QR previews, and direct studio quotations.
            </p>
            <div className="flex flex-wrap gap-4 pt-1 font-semibold text-[#C5A46D]">
              <a href="tel:+918955350925">+91 89553 50925</a>
              <a href="tel:+917850865397">+91 78508 65397</a>
            </div>
          </div>

          <div className="space-y-2">
            <p className="font-bold uppercase tracking-wider text-[#C5A46D]">Navigation</p>
            {[
              { label: 'Home', path: '/' },
              { label: 'Categories', path: '/categories' },
              { label: 'Create Your Cup', path: '/create' },
              { label: '10 Designs Preview', path: '/preview' },
              { label: 'Quotation Request', path: '/quote' },
            ].map((l) => (
              <button
                key={l.path}
                type="button"
                onClick={() => navigate(l.path)}
                className="block text-[#F4EFE5]/80 hover:text-[#C5A46D]"
              >
                {l.label}
              </button>
            ))}
          </div>

          <div className="space-y-2">
            <p className="font-bold uppercase tracking-wider text-[#C5A46D]">Studio Access</p>
            <button
              type="button"
              onClick={() => navigate('/admin')}
              className="block text-[#F4EFE5]/80 hover:text-[#C5A46D]"
            >
              Owner Admin Panel (/admin)
            </button>
            <p className="text-[#F4EFE5]/60 pt-1">Admin PIN: 2026</p>
          </div>
        </div>
        <div className="border-t border-white/10 py-4 text-center text-[11px] text-[#F4EFE5]/60">
          © 2026 BrandMyCup. All rights reserved. Conceptual previews require print proof sign-off.
        </div>
      </footer>

      {/* Modals */}
      <LogoMakerModal
        isOpen={logoMakerOpen}
        onClose={() => setLogoMakerOpen(false)}
        initialBrandName={draft.businessName}
        initialPrimary={draft.primaryColor}
        initialSecondary={draft.secondaryColor}
        onApplyLogo={(dataUrl, meta) =>
          setDraft((prev) => ({
            ...prev,
            logoDataUrl: dataUrl,
            logoMeta: meta,
          }))
        }
      />

      <DesignInspectionModal
        isOpen={Boolean(inspectDesignId)}
        onClose={() => setInspectDesignId(null)}
        data={draft}
        designId={inspectDesignId || 1}
        onSelectDesign={(id) =>
          setDraft((prev) => ({ ...prev, selectedDesignId: id }))
        }
      />
    </div>
  );
}

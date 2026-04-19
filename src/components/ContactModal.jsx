import React, { useState, useEffect } from 'react';

const DIAL_CODES = {
  US: '+1', CA: '+1', GB: '+44', IN: '+91', AU: '+61', DE: '+49', FR: '+33',
  IT: '+39', ES: '+34', BR: '+55', MX: '+52', JP: '+81', KR: '+82', CN: '+86',
  RU: '+7', ZA: '+27', NG: '+234', KE: '+254', EG: '+20', AE: '+971',
  SA: '+966', SG: '+65', MY: '+60', PH: '+63', ID: '+62', TH: '+66',
  VN: '+84', PK: '+92', BD: '+880', LK: '+94', NP: '+977', NL: '+31',
  BE: '+32', SE: '+46', NO: '+47', DK: '+45', FI: '+358', PL: '+48',
  CZ: '+420', AT: '+43', CH: '+41', PT: '+351', IE: '+353', NZ: '+64',
  AR: '+54', CL: '+56', CO: '+57', PE: '+51', IL: '+972', TR: '+90',
  GR: '+30', HU: '+36', RO: '+40', UA: '+380', HR: '+385', RS: '+381',
};

// Group patterns: array of digit-group sizes per country
const PHONE_FORMATS = {
  US: [3, 3, 4],     // 123 456 7890
  CA: [3, 3, 4],
  GB: [4, 6],        // 7911 123456
  IN: [5, 5],        // 12345 67890
  AU: [3, 3, 3],     // 412 345 678
  DE: [3, 4, 4],     // 151 1234 5678
  FR: [1, 2, 2, 2, 2], // 6 12 34 56 78
  JP: [3, 4, 4],     // 090 1234 5678
  KR: [3, 4, 4],
  CN: [3, 4, 4],
  BR: [2, 5, 4],     // 11 91234 5678
  MX: [2, 4, 4],
  AE: [2, 3, 4],     // 50 123 4567
  SG: [4, 4],        // 9123 4567
  DEFAULT: [3, 3, 4],
};

function formatPhone(raw, countryKey) {
  const digits = raw.replace(/[^0-9]/g, '');
  const groups = PHONE_FORMATS[countryKey] || PHONE_FORMATS.DEFAULT;
  const parts = [];
  let idx = 0;

  for (const size of groups) {
    if (idx >= digits.length) break;
    parts.push(digits.slice(idx, idx + size));
    idx += size;
  }

  // Append any remaining digits
  if (idx < digits.length) {
    parts.push(digits.slice(idx));
  }

  return parts.join(' ');
}

const ContactModal = ({ isOpen, onClose }) => {
  const [countryKey, setCountryKey] = useState('US');
  const [countryCode, setCountryCode] = useState('+1');
  const [formData, setFormData] = useState({
    fullName: '',
    email: '',
    phone: '',
    message: '',
  });

  useEffect(() => {
    fetch('https://ipapi.co/json/')
      .then(res => res.json())
      .then(data => {
        if (data.country_code && DIAL_CODES[data.country_code]) {
          setCountryKey(data.country_code);
          setCountryCode(DIAL_CODES[data.country_code]);
        }
      })
      .catch(() => {}); // Silently fallback to +1
  }, []);

  const handleChange = (e) => {
    setFormData({ ...formData, [e.target.name]: e.target.value });
  };

  const handlePhoneChange = (e) => {
    const digits = e.target.value.replace(/[^0-9]/g, '').slice(0, 10);
    const formatted = formatPhone(digits, countryKey);
    setFormData({ ...formData, phone: formatted });
  };

  const handleSubmit = (e) => {
    e.preventDefault();
    console.log('Form submitted:', formData);
    onClose();
  };


  return (
    <>
      {/* Backdrop */}
      <div
        className={`fixed inset-0 z-[998] transition-all duration-700 ${isOpen ? 'opacity-100' : 'opacity-0 pointer-events-none'}`}
        style={{
          backdropFilter: isOpen ? 'blur(2px)' : 'blur(0px)',
          WebkitBackdropFilter: isOpen ? 'blur(2px)' : 'blur(0px)',
          background: 'rgba(255, 255, 255, 0.2)',
        }}
        onClick={onClose}
      />

      {/* Modal */}
      <div
        className={`fixed z-999 bottom-0 right-0 transition-all duration-1500 ease-[cubic-bezier(0.16,1,0.3,1)] ${isOpen
            ? 'opacity-100 scale-100 translate-x-0 translate-y-0'
            : 'opacity-0 scale-5 translate-x-8 translate-y-8 pointer-events-none'
          }`}
        style={{
          transformOrigin: 'bottom right',
        }}
      >
        <div
          className="w-[380px] border border-dove p-6"
          style={{
            background: 'rgba(255, 255, 255, 0.5)',
            backdropFilter: 'blur(2px)',
            WebkitBackdropFilter: 'blur(2px)',
          }}
        >
          {/* Header */}
          <div className="flex justify-between items-center mb-6">
            <h2 className="text-[24px] font-bold text-bbblack">Say hi !</h2>
            <div
              onClick={onClose}
              className="cursor-pointer text-slate hover:text-bbblack transition-colors duration-300 text-[18px] leading-none"
            >
              ✕
            </div>
          </div>

          {/* Form */}
          <form onSubmit={handleSubmit} className="flex flex-col gap-4">
            <input
              type="text"
              name="fullName"
              placeholder="Full Name"
              value={formData.fullName}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-slate text-bbblack text-[13px] font-medium placeholder-slate py-3 px-1 outline-none focus:border-bbblack transition-colors duration-300"
              required
            />
            <input
              type="email"
              name="email"
              placeholder="Email"
              value={formData.email}
              onChange={handleChange}
              className="w-full bg-transparent border-b border-slate text-bbblack text-[13px] font-medium placeholder-slate py-3 px-1 outline-none focus:border-bbblack transition-colors duration-300"
              required
            />
            <div className="flex items-center border-b border-slate focus-within:border-bbblack transition-colors duration-300">
              <span className="text-bbblack text-[13px] font-medium py-3 px-1 select-none">{countryCode}</span>
              <input
                type="tel"
                name="phone"
                placeholder="Phone"
                value={formData.phone}
                onChange={handlePhoneChange}
                inputMode="numeric"
                className="w-full bg-transparent text-bbblack text-[13px] font-medium placeholder-slate py-3 px-1 outline-none"
              />
            </div>
            <textarea
              name="message"
              placeholder="Message"
              value={formData.message}
              onChange={handleChange}
              rows={3}
              className="w-full bg-transparent border-b border-slate text-bbblack text-[13px] font-medium placeholder-slate py-3 px-1 outline-none focus:border-bbblack transition-colors duration-300 resize-none"
              required
            />
            <button
              type="submit"
              className="mt-2 w-full py-3 text-bbblack text-[12px] font-bold tracking-wider uppercase rounded-lg hover:opacity-80 transition-opacity duration-300 cursor-pointer"
            >
              Send
            </button>
          </form>
        </div>
      </div>
    </>
  );
};

export default ContactModal;

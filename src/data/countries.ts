// data/countries.ts
export interface Country {
    code: string;
    name: string;
    phoneCode: string; // رمز الهاتف الدولي
  }
  
  export const arabicCountries: Country[] = [
    { code: "SA", name: "المملكة العربية السعودية", phoneCode: "+966" },
    { code: "EG", name: "مصر", phoneCode: "+20" },
    { code: "AE", name: "الإمارات العربية المتحدة", phoneCode: "+971" },
    { code: "KW", name: "الكويت", phoneCode: "+965" },
    { code: "QA", name: "قطر", phoneCode: "+974" },
    { code: "BH", name: "البحرين", phoneCode: "+973" },
    { code: "OM", name: "عمان", phoneCode: "+968" },
    { code: "JO", name: "الأردن", phoneCode: "+962" },
    { code: "LB", name: "لبنان", phoneCode: "+961" },
    { code: "SY", name: "سوريا", phoneCode: "+963" },
    { code: "IQ", name: "العراق", phoneCode: "+964" },
    { code: "YE", name: "اليمن", phoneCode: "+967" },
    { code: "PS", name: "فلسطين", phoneCode: "+970" },
    { code: "DZ", name: "الجزائر", phoneCode: "+213" },
    { code: "MA", name: "المغرب", phoneCode: "+212" },
    { code: "TN", name: "تونس", phoneCode: "+216" },
    { code: "LY", name: "ليبيا", phoneCode: "+218" },
    { code: "SD", name: "السودان", phoneCode: "+249" },
    // يمكنك إضافة المزيد من الدول هنا
  ];
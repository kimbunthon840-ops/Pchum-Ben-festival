/**
 * Resilient Data Store & Loader for Pchum Ben Cultural Portal
 * Guarantees zero blank screens: fetches dynamic JSON from server with instant fallback
 * Works seamlessly on GitHub Pages, offline environments, and local file:/// previews
 */

const FALLBACK_DATES = {
  "currentYear": 2026,
  "years": [
    {
      "year": 2024,
      "kannBenStart": "2024-09-18",
      "kannBenEnd": "2024-10-01",
      "pchumBenDay": "2024-10-02",
      "publicHolidays": [
        "2024-10-01",
        "2024-10-02",
        "2024-10-03"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2568,
      "status": "passed"
    },
    {
      "year": 2025,
      "kannBenStart": "2025-09-08",
      "kannBenEnd": "2025-09-21",
      "pchumBenDay": "2025-09-22",
      "publicHolidays": [
        "2025-09-21",
        "2025-09-22",
        "2025-09-23"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2569,
      "status": "passed"
    },
    {
      "year": 2026,
      "kannBenStart": "2026-09-26",
      "kannBenEnd": "2026-10-09",
      "pchumBenDay": "2026-10-10",
      "publicHolidays": [
        "2026-10-09",
        "2026-10-10",
        "2026-10-11"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2570,
      "status": "active"
    },
    {
      "year": 2027,
      "kannBenStart": "2027-09-16",
      "kannBenEnd": "2027-09-29",
      "pchumBenDay": "2027-09-30",
      "publicHolidays": [
        "2027-09-29",
        "2027-09-30",
        "2027-10-01"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2571,
      "status": "upcoming"
    },
    {
      "year": 2028,
      "kannBenStart": "2028-10-04",
      "kannBenEnd": "2028-10-17",
      "pchumBenDay": "2028-10-18",
      "publicHolidays": [
        "2028-10-17",
        "2028-10-18",
        "2028-10-19"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2572,
      "status": "upcoming"
    },
    {
      "year": 2029,
      "kannBenStart": "2029-09-23",
      "kannBenEnd": "2029-10-06",
      "pchumBenDay": "2029-10-07",
      "publicHolidays": [
        "2029-10-06",
        "2029-10-07",
        "2029-10-08"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2573,
      "status": "upcoming"
    },
    {
      "year": 2030,
      "kannBenStart": "2030-09-12",
      "kannBenEnd": "2030-09-25",
      "pchumBenDay": "2030-09-26",
      "publicHolidays": [
        "2030-09-25",
        "2030-09-26",
        "2030-09-27"
      ],
      "lunarMonth": "Bhadrapada (ខែភទ្របទ)",
      "beYear": 2574,
      "status": "upcoming"
    }
  ]
};

const FALLBACK_PAGODAS = [
  {
    "id": "wat-ounalom",
    "nameEn": "Wat Ounalom",
    "nameKh": "វត្តឧណ្ណាលោម",
    "provinceEn": "Phnom Penh",
    "provinceKh": "រាជធានីភ្នំពេញ",
    "addressEn": "Samdach Sothearos Blvd, Sangkat Chey Chumneah, Khan Daun Penh",
    "addressKh": "វិថីសម្តេចសុធារស សង្កាត់ជ័យជំនះ ខណ្ឌដូនពេញ",
    "image": "img/pagodas/wat-ounalom.jpg",
    "established": "1443",
    "sect": "Maha Nikaya (Headquarters)",
    "highlightsEn": "Center of Cambodian Buddhism, enshrines an ancient eyebrow hair relic of the Buddha, massive Pchum Ben ceremonies with hundreds of monks.",
    "highlightsKh": "ជាទីស្នាក់ការកណ្តាលនៃគណៈមហានិកាយ តម្កល់ព្រះឧណ្ណាលោម (រោមចិញ្ចើមព្រះពុទ្ធ) និងជាទីកន្លែងប្រារព្ធបុណ្យភ្ជុំបិណ្ឌដ៏ធំជាងគេ។",
    "historyEn": "Wat Ounalom was founded in 1443 by King Ponhea Yat and is the most important pagoda in Phnom Penh, serving as the seat of Cambodia's Supreme Patriarch.",
    "historyKh": "វត្តឧណ្ណាលោមត្រូវបានកសាងឡើងក្នុងឆ្នាំ ១៤៤៣ ដោយព្រះបាទពញាយ៉ាត ហើយជាវត្តដ៏សំខាន់បំផុតនៅភ្នំពេញ និងជាកន្លែងគង់នៅរបស់សម្តេចព្រះសង្ឃរាជ។",
    "tags": [
      "Royal Pagoda",
      "Relic",
      "Riverside",
      "Epicenter"
    ]
  },
  {
    "id": "wat-phnom",
    "nameEn": "Wat Phnom Daun Penh",
    "nameKh": "វត្តភ្នំដូនពេញ",
    "provinceEn": "Phnom Penh",
    "provinceKh": "រាជធានីភ្នំពេញ",
    "addressEn": "Norodom Blvd, Sangkat Wat Phnom, Khan Daun Penh",
    "addressKh": "មហាវិថីព្រះនរោត្តម សង្កាត់វត្តភ្នំ ខណ្ឌដូនពេញ",
    "image": "img/pagodas/wat-phnom.jpg",
    "established": "1372",
    "sect": "Maha Nikaya",
    "highlightsEn": "The historical birthplace of Phnom Penh founded by Lady Penh, hilltop sanctuary surrounded by sacred banyan trees and lively Pchum Ben pilgrims.",
    "highlightsKh": "ជាបេះដូង និងជាប្រភពកំណើតនៃរាជធានីភ្នំពេញ កសាងដោយលោកយាយពេញ មានពុទ្ធបរិស័ទមកបួងសួងយ៉ាងច្រើនកុះករ។",
    "historyEn": "Legend says Grandma Penh spotted four Buddha statues floating inside a Koki tree trunk on the Mekong River and built a hilltop shrine to house them, giving birth to the city.",
    "historyKh": "តាមរឿងព្រេង លោកយាយពេញបានប្រទះឃើញព្រះពុទ្ធបដិមា៤អង្គអណ្តែតក្នុងដើមគគីរតាមទន្លេមេគង្គ ហើយបានសាងសង់អាសនៈលើទួលភ្នំ។",
    "tags": [
      "Historic Legend",
      "Hilltop",
      "Must Visit",
      "Heritage"
    ]
  },
  {
    "id": "wat-bo",
    "nameEn": "Wat Bo",
    "nameKh": "វត្តបូព៌ (វត្តបូ)",
    "provinceEn": "Siem Reap",
    "provinceKh": "ខេត្តសៀមរាប",
    "addressEn": "Wat Bo Road, Sala Kamreuk, Siem Reap City",
    "addressKh": "ផ្លូវវត្តបូ សង្កាត់សាលាកំរើក ក្រុងសៀមរាប",
    "image": "img/pagodas/angkor-pagoda.jpg",
    "established": "18th Century",
    "sect": "Maha Nikaya",
    "highlightsEn": "Famous for 19th-century Reamker (Ramayana) murals, ancient bell tower, tranquil monastery school, and sacred Pchum Ben Bos Bay Ben rituals.",
    "highlightsKh": "ល្បីល្បាញដោយសារគំនូរបុរាណរឿងរាមកេរ្តិ៍សតវត្សរ៍ទី១៩ លើជញ្ជាំងព្រះវិហារ និងពិធីបោះបាយបិណ្ឌដ៏សក្តិសិទ្ធិ។",
    "historyEn": "Wat Bo is one of the oldest pagodas in Siem Reap, renowned for its exquisite religious art blending Khmer folklore and French colonial everyday scenes.",
    "historyKh": "វត្តបូព៌ជាវត្តដ៏ចំណាស់មួយនៅសៀមរាប មានកេរ្តិ៍ឈ្មោះល្បីល្បាញខាងសិល្បៈគំនូរបុរាណ និងការអភិរក្សវប្បធម៌ខ្មែរ។",
    "tags": [
      "Murals",
      "Oldest Wat",
      "Siem Reap",
      "Cultural Hub"
    ]
  },
  {
    "id": "wat-ek-phnom",
    "nameEn": "Wat Ek Phnom",
    "nameKh": "វត្តឯកភ្នំ",
    "provinceEn": "Battambang",
    "provinceKh": "ខេត្តបាត់ដំបង",
    "addressEn": "Peam Aek Commune, Ek Phnom District",
    "addressKh": "ឃុំពាមឯក ស្រុកឯកភ្នំ ខេត្តបាត់ដំបង",
    "image": "img/pagodas/wat-ounalom.jpg",
    "established": "11th Century (Temple) / 19th Century (Wat)",
    "sect": "Maha Nikaya",
    "highlightsEn": "Majestic juxtaposition of an 11th-century Angkorian sandstone temple alongside an active modern Buddhist pagoda and colossal Buddha statue.",
    "highlightsKh": "ការរួមបញ្ចូលគ្នារវាងប្រាសាទថ្មបុរាណសតវត្សរ៍ទី១១ និងព្រះវិហារពុទ្ធសាសនាសម័យទំនើប ព្រមទាំងព្រះពុទ្ធបដិមាដ៏ធំស្កឹមស្កៃ។",
    "historyEn": "Originally built during the reign of King Suryavarman I, the site remains a powerhouse of Theravada Buddhist devotion where Battambang residents bring Num Ansom.",
    "historyKh": "កសាងឡើងក្នុងរាជ្យព្រះបាទសូរ្យវរ្ម័នទី១ ហើយសព្វថ្ងៃជាទីប្រជុំជនដ៏ធំសម្រាប់ពលរដ្ឋខេត្តបាត់ដំបងធ្វើបុណ្យភ្ជុំបិណ្ឌ។",
    "tags": [
      "Angkorian Heritage",
      "Giant Buddha",
      "Battambang",
      "Ancient"
    ]
  },
  {
    "id": "wat-vihear-suork",
    "nameEn": "Wat Vihear Suork",
    "nameKh": "វត្តវិហារសួគ៌",
    "provinceEn": "Kandal",
    "provinceKh": "ខេត្តកណ្តាល",
    "addressEn": "Vihear Suork Commune, Ksach Kandal District",
    "addressKh": "ឃុំវិហារសួគ៌ ស្រុកខ្សាច់កណ្តាល ខេត្តកណ្តាល",
    "image": "img/pagodas/angkor-pagoda.jpg",
    "established": "16th Century",
    "sect": "Maha Nikaya",
    "highlightsEn": "World-famous for annual traditional Water Buffalo Racing and Khmer Wrestling on the final day of Pchum Ben!",
    "highlightsKh": "ល្បីល្បាញទូទាំងពិភពលោកដោយសារពិធីប្រណាំងក្របី និងចំបាប់បុរាណខ្មែរនៅថ្ងៃភ្ជុំធំ និងថ្ងៃឆ្លងបិណ្ឌ។",
    "historyEn": "Believed to hold extraordinary sacred energy, farmers offer prayers and honor their water buffaloes that help till the land, culminating in spirited races.",
    "historyKh": "ជាទីសក្ការៈបូជាដ៏ពូកែសក្តិសិទ្ធិ កសិករតែងតែនាំក្របីមកប្រណាំងដើម្បីតបស្នងសងគុណសត្វពាហនៈ និងសុំសេចក្តីសុខចម្រើន។",
    "tags": [
      "Buffalo Race",
      "Khmer Wrestling",
      "Kandal",
      "Unique Tradition"
    ]
  },
  {
    "id": "wat-nokor-bachey",
    "nameEn": "Wat Nokor Bachey",
    "nameKh": "វត្តនគរបាជ័យ",
    "provinceEn": "Kampong Cham",
    "provinceKh": "ខេត្តកំពង់ចាម",
    "addressEn": "Krang Thnong Village, Ampil Commune, Kampong Cham",
    "addressKh": "ភូមិក្រាំងធ្នង់ ឃុំអំពិល ក្រុងកំពង់ចាម",
    "image": "img/pagodas/wat-phnom.jpg",
    "established": "12th Century (Jayavarman VII)",
    "sect": "Maha Nikaya",
    "highlightsEn": "A modern painted Buddhist pagoda built directly inside the ancient black laterite walls of King Jayavarman VII's Mahayana sanctuary.",
    "highlightsKh": "ព្រះវិហារសម័យថ្មីដែលបានសាងសង់នៅក្នុងបន្ទាយប្រាសាទថ្មបាយក្រៀមបុរាណរបស់ព្រះបាទជ័យវរ្ម័នទី៧។",
    "historyEn": "Constructed in the 12th century under the great King Jayavarman VII, the temple transitioned from Mahayana Buddhism to modern Theravada devotion.",
    "historyKh": "សាងសង់ក្នុងរជ្ជកាលព្រះបាទជ័យវរ្ម័នទី៧ ជាទីតាំងប្រវត្តិសាស្ត្រដែលឆ្លុះបញ្ចាំងពីការផ្លាស់ប្តូរនៃសាសនាខ្មែររាប់ពាន់ឆ្នាំ។",
    "tags": [
      "Laterite Sanctuary",
      "Jayavarman VII",
      "Kampong Cham"
    ]
  }
];

const FALLBACK_TIMELINE = [
  {
    "day": 1,
    "khmerDay": "កាន់បិណ្ឌ ទី១",
    "titleEn": "Kann Ben Day 1: Opening of the Sanctuary",
    "titleKh": "កាន់បិណ្ឌ ទី១៖ ការបើកទ្វារទាន និងការរៀបចំបិណ្ឌដំបូង",
    "lunarDateEn": "1st Waning Moon of Bhadrapada (1 Roch)",
    "lunarDateKh": "១ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - 06:30 AM",
    "summaryEn": "The first official day of the 15-day ancestor festival begins before dawn. Families prepare Bay Ben and take turns hosting the pagoda ceremonies.",
    "summaryKh": "ថ្ងៃដំបូងនៃពិធីបុណ្យកាន់បិណ្ឌចាប់ផ្តើមមុនពេលថ្ងៃរះ។ ពុទ្ធបរិស័ទជួបជុំគ្នាធ្វើពិធីបោះបាយបិណ្ឌ និងប្រគេនចង្ហាន់ដល់ព្រះសង្ឃ។",
    "rituals": [
      {
        "nameEn": "Bos Bay Ben (Dawn Rice Offering)",
        "nameKh": "ពិធីបោះបាយបិណ្ឌ (ម៉ោង ៤ ទៀបភ្លឺ)",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Tak Bat (Morning Alms Giving)",
        "nameKh": "ពិធីរាប់បាត្រព្រឹក",
        "time": "07:00 AM"
      },
      {
        "nameEn": "Dhamma Sermon",
        "nameKh": "ការសម្តែងធម៌ទេសនា",
        "time": "01:00 PM"
      },
      {
        "nameEn": "Evening Chanting",
        "nameKh": "ពិធីចម្រើនព្រះបរិត្តពេលល្ងាច",
        "time": "06:00 PM"
      }
    ],
    "spiritualMeaningEn": "Opening the spiritual portal for wandering souls (Preta) who are permitted to receive merits from their living descendants.",
    "spiritualMeaningKh": "បើកទ្វារទានសម្រាប់វិញ្ញាណក្ខន្ធប្រេតដែលត្រូវអនុញ្ញាតឱ្យមកទទួលចំណែកបុណ្យពីសាច់ញាតិ។"
  },
  {
    "day": 2,
    "khmerDay": "កាន់បិណ្ឌ ទី២",
    "titleEn": "Kann Ben Day 2: The Path of Generosity",
    "titleKh": "កាន់បិណ្ឌ ទី២៖ ដំណើរនៃសេចក្តីជ្រះថ្លា",
    "lunarDateEn": "2nd Waning Moon of Bhadrapada",
    "lunarDateKh": "២ រោច ខែភទ្របទ",
    "category": "offerings",
    "time": "04:00 AM - 08:00 AM",
    "summaryEn": "The second village cohort takes responsibility for temple provisions. Elders recite the Triple Gem protection verses.",
    "summaryKh": "ក្រុមពុទ្ធបរិស័ទវេនទី២ ទទួលបន្ទុកផ្គត់ផ្គង់ចង្ហាន់ និងសម្ភារៈប្រើប្រាស់ដល់ព្រះសង្ឃក្នុងវត្ត។",
    "rituals": [
      {
        "nameEn": "Pre-Dawn Circumambulation",
        "nameKh": "ការដើរប្រទក្សិណជុំវិញព្រះវិហារ ៣ ជុំ",
        "time": "04:15 AM"
      },
      {
        "nameEn": "Offering of Num Ansom",
        "nameKh": "ការប្រគេននំអន្សម និងនំគម",
        "time": "07:30 AM"
      }
    ],
    "spiritualMeaningEn": "Cultivating non-attachment and purifying karmic debts through charitable offerings.",
    "spiritualMeaningKh": "ការបណ្តុះចិត្តលះបង់ និងការកសាងកុសលសម្អាតបាបកម្ម។"
  },
  {
    "day": 3,
    "khmerDay": "កាន់បិណ្ឌ ទី៣",
    "titleEn": "Kann Ben Day 3: Chanting of the Abhidhamma",
    "titleKh": "កាន់បិណ្ឌ ទី៣៖ ការសូត្រព្រះអភិធម្ម និងបង្សុកូល",
    "lunarDateEn": "3rd Waning Moon of Bhadrapada",
    "lunarDateKh": "៣ រោច ខែភទ្របទ",
    "category": "chanting",
    "time": "04:00 AM - 11:30 AM",
    "summaryEn": "Monks chant the deep Abhidhamma verses reflecting on impermanence (Anicca) and transfer merit to departed relatives.",
    "summaryKh": "ព្រះសង្ឃសូត្រព្រះអភិធម្ម៧គម្ពីរ ដើម្បីឧទ្ទិសកុសលដល់អ្នកចែកឋាន និងពិចារណាលើអនិច្ចំ ទុក្ខំ អនត្តា។",
    "rituals": [
      {
        "nameEn": "Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Bangskol Dedication",
        "nameKh": "ពិធីបង្សុកូលឧទ្ទិសកុសល",
        "time": "10:30 AM"
      }
    ],
    "spiritualMeaningEn": "The spiritual vibrations of the Abhidhamma reach into lower spiritual realms to soothe tormented spirits.",
    "spiritualMeaningKh": "រំញ័រធម៌អភិធម្មជួយរំដោះ និងបន្ធូរបន្ថយទុក្ខវេទនារបស់ប្រេតក្នុងអបាយភូមិ។"
  },
  {
    "day": 4,
    "khmerDay": "កាន់បិណ្ឌ ទី៤",
    "titleEn": "Kann Ben Day 4: Lotus and Incense Dedications",
    "titleKh": "កាន់បិណ្ឌ ទី៤៖ បូជាផ្កាឈូក និងគ្រឿងសក្ការៈ",
    "lunarDateEn": "4th Waning Moon of Bhadrapada",
    "lunarDateKh": "៤ រោច ខែភទ្របទ",
    "category": "offerings",
    "time": "04:00 AM - 09:00 AM",
    "summaryEn": "Villagers bring pink and white lotus blossoms, pure beeswax candles, and fragrant incense to adorn the main Buddha hall.",
    "summaryKh": "ពុទ្ធបរិស័ទនាំយកផ្កាឈូក ទៀន ធូប មកបូជាចំពោះព្រះពុទ្ធរូបក្នុងព្រះវិហារយ៉ាងកុះករ។",
    "rituals": [
      {
        "nameEn": "Lotus Garland Offering",
        "nameKh": "ការថ្វាយកម្រងផ្កាឈូក",
        "time": "05:00 AM"
      },
      {
        "nameEn": "Morning Sangha Dana",
        "nameKh": "សង្ឃទានពេលព្រឹក",
        "time": "07:00 AM"
      }
    ],
    "spiritualMeaningEn": "The lotus symbolizes purity arising untainted from murky depths, representing the soul's elevation.",
    "spiritualMeaningKh": "ផ្កាឈូកជានិមិត្តរូបនៃភាពបរិសុទ្ធដែលផុសចេញពីភក់ជ្រាំ បង្ហាញពីការរំដោះវិញ្ញាណ។"
  },
  {
    "day": 5,
    "khmerDay": "កាន់បិណ្ឌ ទី៥",
    "titleEn": "Kann Ben Day 5: Honor of the Maternal Lineage",
    "titleKh": "កាន់បិណ្ឌ ទី៥៖ ការរំឭកគុណមាតា ៧សន្តាន",
    "lunarDateEn": "5th Waning Moon of Bhadrapada",
    "lunarDateKh": "៥ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - 11:00 AM",
    "summaryEn": "Families focus their collective intentions and prayers toward mothers, grandmothers, and female ancestors over seven generations.",
    "summaryKh": "គ្រួសារនីមួយៗផ្តោតការបួងសួងឧទ្ទិសកុសលជូនដល់មាតា ជីដូន និងញាតិកាលខាងម្តាយទាំង៧សន្តាន។",
    "rituals": [
      {
        "nameEn": "Dawn Circumambulation",
        "nameKh": "ពិធីបោះបាយបិណ្ឌ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Ancestral Cloth Ceremony",
        "nameKh": "ការក្រាលសំពត់បង្សុកូល",
        "time": "09:30 AM"
      }
    ],
    "spiritualMeaningEn": "Fulfilling filial piety (Katanñu) towards maternal ancestors who gave life and nourishment.",
    "spiritualMeaningKh": "ការបំពេញកតញ្ញូតាធម៌ចំពោះអ្នកមានគុណខាងមាតា។"
  },
  {
    "day": 6,
    "khmerDay": "កាន់បិណ្ឌ ទី៦",
    "titleEn": "Kann Ben Day 6: Honor of the Paternal Lineage",
    "titleKh": "កាន់បិណ្ឌ ទី៦៖ ការរំឭកគុណបិតា ៧សន្តាន",
    "lunarDateEn": "6th Waning Moon of Bhadrapada",
    "lunarDateKh": "៦ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - 11:00 AM",
    "summaryEn": "Dedications transition to fathers, grandfathers, teachers, and patriarchal guardians who protected the family line.",
    "summaryKh": "ការឧទ្ទិសកុសលជូនចំពោះឪពុក ជីតា គ្រូបាអាចារ្យ និងបុព្វបុរសខាងឪពុក។",
    "rituals": [
      {
        "nameEn": "Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Kralan and Rice Offerings",
        "nameKh": "ប្រគេនក្រឡាន និងបាយបិណ្ឌ",
        "time": "07:15 AM"
      }
    ],
    "spiritualMeaningEn": "Balancing ancestral gratitude and strengthening cosmic lineage protection.",
    "spiritualMeaningKh": "ការតបស្នងសងគុណបិតា និងការពង្រឹងចំណងសាច់ញាតិ។"
  },
  {
    "day": 7,
    "khmerDay": "កាន់បិណ្ឌ ទី៧",
    "titleEn": "Kann Ben Day 7: The Midpoint of Compassion",
    "titleKh": "កាន់បិណ្ឌ ទី៧៖ ពាក់កណ្តាលវេន និងការពង្រីកមេត្តាចិត្ត",
    "lunarDateEn": "7th Waning Moon of Bhadrapada",
    "lunarDateKh": "៧ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - 12:00 PM",
    "summaryEn": "Reaching the halfway mark of Kann Ben. The entire community gathers to renew their ethical precepts and vow of compassion.",
    "summaryKh": "ឈានដល់ពាក់កណ្តាលនៃពិធីកាន់បិណ្ឌ។ អ្នកភូមិទាំងអស់រួមគ្នាទទួលសីល៥ ឬសីល៨ និងស្ដាប់ធម៌។",
    "rituals": [
      {
        "nameEn": "Taking the 5 Precepts",
        "nameKh": "ការសមាទានសីល",
        "time": "06:30 AM"
      },
      {
        "nameEn": "Midway Community Feast",
        "nameKh": "ការទទួលទានអាហាររួមគ្នាក្នុងវត្ត",
        "time": "11:30 AM"
      }
    ],
    "spiritualMeaningEn": "Midpoint spiritual cleansing, ensuring no wandering spirit in the vicinity is overlooked.",
    "spiritualMeaningKh": "ការសម្អាតចិត្ត និងការចែករំលែកមេត្តាធម៌ដល់វិញ្ញាណក្ខន្ធទាំងឡាយ។"
  },
  {
    "day": 8,
    "khmerDay": "កាន់បិណ្ឌ ទី៨",
    "titleEn": "Kann Ben Day 8: Offerings for Unknown Souls",
    "titleKh": "កាន់បិណ្ឌ ទី៨៖ ការឧទ្ទិសដល់ខ្មោចគ្មានបងប្អូន (អនាថា)",
    "lunarDateEn": "8th Waning Moon of Bhadrapada",
    "lunarDateKh": "៨ រោច ខែភទ្របទ",
    "category": "offerings",
    "time": "04:00 AM - 08:30 AM",
    "summaryEn": "Special rice ball offerings are cast towards crossroads, fences, and forest edges for spirits without living relatives.",
    "summaryKh": "ការបោះបាយបិណ្ឌនៅតាមគល់ឈើ របងវត្ត និងផ្លូវបំបែក សម្រាប់វិញ្ញាណអនាថាដែលគ្មានកូនចៅ។",
    "rituals": [
      {
        "nameEn": "Perimeter Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌតាមព្រំប្រទល់វត្ត",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Water Pouring (Chhoet Teuk)",
        "nameKh": "ពិធីច្រូចទឹកឧទ្ទិសកុសល",
        "time": "08:00 AM"
      }
    ],
    "spiritualMeaningEn": "Universal Mahayana-influenced compassion: offering merit to orphaned and forgotten souls.",
    "spiritualMeaningKh": "ព្រហ្មវិហារធម៌ឥតព្រំដែន ចំពោះវិញ្ញាណដែលគ្មានអ្នកនឹកនា។"
  },
  {
    "day": 9,
    "khmerDay": "កាន់បិណ្ឌ ទី៩",
    "titleEn": "Kann Ben Day 9: The Legend of King Bimbisara",
    "titleKh": "កាន់បិណ្ឌ ទី៩៖ រឿងព្រេងព្រះបាទពិម្ពិសារ",
    "lunarDateEn": "9th Waning Moon of Bhadrapada",
    "lunarDateKh": "៩ រោច ខែភទ្របទ",
    "category": "chanting",
    "time": "04:00 AM - 10:00 AM",
    "summaryEn": "Pagoda monks preach the foundational Buddhist scripture of King Bimbisara dedicating merit to relieved ancestral Petas.",
    "summaryKh": "ព្រះសង្ឃសម្តែងធម៌ពីរឿងព្រះបាទពិម្ពិសារ ធ្វើបុណ្យឧទ្ទិសដល់ញាតិដែលកើតជាប្រេតក្នុងសម័យពុទ្ធកាល។",
    "rituals": [
      {
        "nameEn": "Scriptural Chanting",
        "nameKh": "ការស្ដាប់ធម៌ទេសនាប្រវត្តិបុណ្យ",
        "time": "08:30 AM"
      },
      {
        "nameEn": "Dana Offering",
        "nameKh": "ការប្រគេនទេយ្យទាន",
        "time": "10:00 AM"
      }
    ],
    "spiritualMeaningEn": "Understanding that food offered directly to monks transforms into divine celestial food for ancestral spirits.",
    "spiritualMeaningKh": "ការយល់ដឹងថា ចង្ហាន់ដែលប្រគេនព្រះសង្ឃប្រែក្លាយជាទិព្វភោជនដល់វិញ្ញាណក្ខន្ធ។"
  },
  {
    "day": 10,
    "khmerDay": "កាន់បិណ្ឌ ទី១០",
    "titleEn": "Kann Ben Day 10: Rice Harvest Preparation",
    "titleKh": "កាន់បិណ្ឌ ទី១០៖ សម្ព័ន្ធភាពរវាងកសិកម្ម និងព្រះពុទ្ធសាសនា",
    "lunarDateEn": "10th Waning Moon of Bhadrapada",
    "lunarDateKh": "១០ រោច ខែភទ្របទ",
    "category": "offerings",
    "time": "04:00 AM - 09:00 AM",
    "summaryEn": "Farmers bring early green rice (Ambok) and freshly picked produce to offer thanksgiving for rainfall and fertility.",
    "summaryKh": "កសិករនាំយកភោគផលកសិកម្ម អំបុក និងផ្លែឈើមកប្រគេនព្រះសង្ឃជាកិច្ចតបស្នងគុណធម្មជាតិ។",
    "rituals": [
      {
        "nameEn": "Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Agricultural Dana",
        "nameKh": "ការប្រគេនភោគផលស្រែចម្ការ",
        "time": "07:00 AM"
      }
    ],
    "spiritualMeaningEn": "Expressing gratitude to mother earth and deceased ancestors who cleared and cultivated the rice fields.",
    "spiritualMeaningKh": "ការដឹងគុណចំពោះមាតាធរណី និងបុព្វបុរសដែលបានកាប់គាស់ព្រៃធ្វើស្រែចម្ការ។"
  },
  {
    "day": 11,
    "khmerDay": "កាន់បិណ្ឌ ទី១១",
    "titleEn": "Kann Ben Day 11: The Sacred Thread Ceremony",
    "titleKh": "កាន់បិណ្ឌ ទី១១៖ ការចងអំបោះសីមា និងព្រះបរិត្ត",
    "lunarDateEn": "11th Waning Moon of Bhadrapada",
    "lunarDateKh": "១១ រោច ខែភទ្របទ",
    "category": "chanting",
    "time": "04:00 AM - 11:30 AM",
    "summaryEn": "White consecrated cotton cords (Sai Sin) are unrolled around the temple to connect devotees with the blessings of the Sangha.",
    "summaryKh": "ព្រះសង្ឃសូត្រធម៌ដោយកាន់អំបោះសីមា (ខ្សែសីន) ដើម្បីចម្លងថាមពលនៃសេចក្តីសុខសាន្តដល់ញាតិញោម។",
    "rituals": [
      {
        "nameEn": "Sacred Thread Chanting",
        "nameKh": "ពិធីសូត្រមន្តកាន់ខ្សែសីន",
        "time": "08:00 AM"
      },
      {
        "nameEn": "Holy Water Sprinkling",
        "nameKh": "ពិធីស្រោចទឹកសុំសេចក្តីសុខ",
        "time": "10:45 AM"
      }
    ],
    "spiritualMeaningEn": "Protective cosmic energy shielding the family from ill fortune while elevating ancestral souls.",
    "spiritualMeaningKh": "ការការពារគ្រួសារពីឧបទ្រពចង្រៃ និងការចម្លងបុណ្យកុសល។"
  },
  {
    "day": 12,
    "khmerDay": "កាន់បិណ្ឌ ទី១២",
    "titleEn": "Kann Ben Day 12: Wrapping of the Num Ansom",
    "titleKh": "កាន់បិណ្ឌ ទី១២៖ ការរៀបចំវេចនំអន្សមតាមគេហដ្ឋាន",
    "lunarDateEn": "12th Waning Moon of Bhadrapada",
    "lunarDateKh": "១២ រោច ខែភទ្របទ",
    "category": "offerings",
    "time": "All Day & Night",
    "summaryEn": "Villages come alive with firelight as whole families gather together in the courtyard to wrap and boil Num Ansom for 12 hours.",
    "summaryKh": "តាមភូមិស្រុកពោរពេញដោយភាពអ៊ូអរ ក្រុមគ្រួសារជួបជុំគ្នាវេចនំអន្សម និងដាំភ្លើងស្ងោរនំពេញមួយយប់។",
    "rituals": [
      {
        "nameEn": "Dawn Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌពេលព្រឹក",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Communal Cake Wrapping",
        "nameKh": "ការវេចនំអន្សមជុំគ្នាក្នុងផ្ទះ",
        "time": "02:00 PM - Midnight"
      }
    ],
    "spiritualMeaningEn": "Family unity and cultural continuity; the cylindrical shape represents Shiva Linga and the pyramid shape represents Yoni/Uma.",
    "spiritualMeaningKh": "សាមគ្គីភាពគ្រួសារ និងការថែរក្សាប្រពៃណីខ្មែរបុរាណ។"
  },
  {
    "day": 13,
    "khmerDay": "កាន់បិណ្ឌ ទី១៣",
    "titleEn": "Kann Ben Day 13: The Great Homecoming",
    "titleKh": "កាន់បិណ្ឌ ទី១៣៖ ដំណើរវិលត្រឡប់ទៅកាន់ស្រុកកំណើត",
    "lunarDateEn": "13th Waning Moon of Bhadrapada",
    "lunarDateKh": "១៣ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - Evening",
    "summaryEn": "City workers travel across Cambodia to their ancestral villages. Families prepare the house shrines with fruits and flowers.",
    "summaryKh": "បងប្អូនខ្មែរគ្រប់ទិសទីធ្វើដំណើរវិលត្រឡប់ទៅជួបជុំឪពុកម្តាយនៅស្រុកកំណើត រៀបចំបូជាផ្កាផ្លែឈើលើអាសនៈ។",
    "rituals": [
      {
        "nameEn": "Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Ancestral Altar Cleaning",
        "nameKh": "ការរៀបចំជើងធូប និងអាសនៈជីដូនជីតា",
        "time": "03:00 PM"
      }
    ],
    "spiritualMeaningEn": "Reconnecting the living generations before the climax of the festival.",
    "spiritualMeaningKh": "ការជួបជុំសាច់ញាតិយ៉ាងកក់ក្តៅមុនថ្ងៃភ្ជុំធំមកដល់។"
  },
  {
    "day": 14,
    "khmerDay": "កាន់បិណ្ឌ ទី១៤",
    "titleEn": "Kann Ben Day 14: Eve of Pchum Thom",
    "titleKh": "កាន់បិណ្ឌ ទី១៤៖ ថ្ងៃឆ្លងបិណ្ឌ និងត្រៀមភ្ជុំធំ",
    "lunarDateEn": "14th Waning Moon of Bhadrapada",
    "lunarDateKh": "១៤ រោច ខែភទ្របទ",
    "category": "ritual",
    "time": "04:00 AM - Midnight",
    "summaryEn": "The final night before the grand festival. Pagodas hold elaborate lantern vigils and the final large-scale Bay Ben balls are molded.",
    "summaryKh": "រាត្រីចុងក្រោយមុនថ្ងៃភ្ជុំធំ។ វត្តអារាមរៀបចំពិធីឆ្លងបិណ្ឌ និងបំភ្លឺប្រទីបទៀនធូបពេញទីធ្លាវត្ត។",
    "rituals": [
      {
        "nameEn": "Final Kann Ben Bos Bay Ben",
        "nameKh": "បោះបាយបិណ្ឌវេនចុងក្រោយ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Chhlhong Ben Ceremony",
        "nameKh": "ពិធីឆ្លងបិណ្ឌ",
        "time": "02:00 PM"
      },
      {
        "nameEn": "All-Night Temple Chanting",
        "nameKh": "ការសូត្រធម៌រំឭកគុណពេញមួយរាត្រី",
        "time": "07:00 PM"
      }
    ],
    "spiritualMeaningEn": "Final preparations as souls eagerly await the ultimate merit transfer on the new moon day.",
    "spiritualMeaningKh": "ការត្រៀមចិត្តយ៉ាងជ្រះថ្លាដើម្បីឧទ្ទិសកុសលធំនៅថ្ងៃស្អែក។"
  },
  {
    "day": 15,
    "khmerDay": "ថ្ងៃភ្ជុំបិណ្ឌ (ភ្ជុំធំ)",
    "titleEn": "Day 15: Pchum Thom (Grand Ancestors' Day)",
    "titleKh": "ថ្ងៃភ្ជុំបិណ្ឌ (ភ្ជុំធំ)៖ ទិវាបុណ្យភ្ជុំបិណ្ឌដ៏មហោឡារិក",
    "lunarDateEn": "15th Waning Moon of Bhadrapada (New Moon)",
    "lunarDateKh": "១៥ រោច ខែភទ្របទ (ដាច់ខែ)",
    "category": "culmination",
    "time": "All Day (04:00 AM - 09:00 PM)",
    "summaryEn": "The grand culmination of Pchum Ben! Everyone wears traditional white silk clothing, visits up to 7 pagodas, offers feast trays, and attends massive Bangskol prayers.",
    "summaryKh": "ទិវាដ៏ពិសិដ្ឋនៃបុណ្យភ្ជុំបិណ្ឌ! ប្រជាជនស្លៀកពាក់បែបប្រពៃណីអាវសសំពត់ហូលផាមួង ទៅធ្វើបុណ្យរហូតដល់៧វត្ត ប្រគេនចង្ហាន់ និងបង្សុកូលឧទ្ទិសបុណ្យធំ។",
    "rituals": [
      {
        "nameEn": "Dawn Grand Bos Bay Ben",
        "nameKh": "ពិធីបោះបាយបិណ្ឌថ្ងៃភ្ជុំធំ",
        "time": "04:00 AM"
      },
      {
        "nameEn": "Grand Alms Procession (Tak Bat)",
        "nameKh": "ពិធីរាប់បាត្រព្រះសង្ឃរាប់រយអង្គ",
        "time": "07:30 AM"
      },
      {
        "nameEn": "Great Bangskol for 7 Generations",
        "nameKh": "ពិធីបង្សុកូលឧទ្ទិសមហាកុសល ៧សន្តាន",
        "time": "10:30 AM"
      },
      {
        "nameEn": "Visiting 7 Pagodas Tradition",
        "nameKh": "ទំនៀមទម្លាប់ដើរធ្វើបុណ្យ ៧វត្ត",
        "time": "11:00 AM - 03:00 PM"
      },
      {
        "nameEn": "Sron Pralung (Releasing Ancestor Boats)",
        "nameKh": "ពិធីលយប្រទីប ឬបណ្តែតក្បូនដំកល់វិញ្ញាណ",
        "time": "06:00 PM"
      }
    ],
    "spiritualMeaningEn": "Ancestors receive the collective merits of their families. Souls bless their descendants with prosperity, good health, and peace before the spiritual gates close.",
    "spiritualMeaningKh": "ដូនតាបានទទួលបុណ្យពេញលេញ និងប្រសិទ្ធពរជ័យសិរីមង្គលដល់កូនចៅ មុនពេលទ្វារស្ថានប្រេតបិទវិញ។"
  }
];

async function robustFetchJson(primaryPath, fallbackObj) {
  try {
    const res = await fetch(primaryPath);
    if (res.ok) return await res.json();
  } catch (e) {}
  
  // Try root filename fallback (e.g. 'dates.json' if 'data/dates.json' was requested)
  const filename = primaryPath.split('/').pop();
  if (filename !== primaryPath) {
    try {
      const res = await fetch(filename);
      if (res.ok) return await res.json();
    } catch (e) {}
  }
  
  return fallbackObj;
}

const DataStore = {
  async getDates() {
    return await robustFetchJson('data/dates.json', FALLBACK_DATES);
  },

  async getPagodas() {
    return await robustFetchJson('data/pagodas.json', FALLBACK_PAGODAS);
  },

  async getTimeline() {
    return await robustFetchJson('data/timeline.json', FALLBACK_TIMELINE);
  }
};

window.DataStore = DataStore;

import { Course } from './types';

export const COURSES_DATA: Course[] = [
  {
    id: 'web-dev',
    titleOm: 'Misooma Weebsaayitii Full-Stack',
    titleEn: 'Full-Stack Web Dev Mastery',
    descOm: 'Koorsiin kun akkaataa website ammayyaa ijaarru fi bulchuu si barsiisa. HTML, CSS, JavaScript, React, fi Node.js guutuu isaa baradhu.',
    descEn: 'Master modern responsive website design, development, and server management. Learn HTML, CSS, JavaScript, React, and server-side engineering.',
    categoryOm: 'MISOOMA WEEBSAAYITII',
    categoryEn: 'WEB DEVELOPMENT',
    priceBirr: 200,
    durationWeeks: 8,
    lessonsCount: 3,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1555066931-4365d14bab8c?auto=format&fit=crop&w=600&q=80',
    tagOm: 'Dandeettii Hojii',
    tagEn: 'In-Demand Skill',
    syllabus: [
      {
        id: 'web-mod1',
        titleOm: 'Kutaa 1: Bu’ura HTML5 & CSS3',
        titleEn: 'Module 1: HTML5 & CSS3 Foundation',
        contentOm: 'HTML-ni caasaa weebsaayitii qopheessa, CSS-ni immoo miidhagina isaa kennaa. Ammayya weebsaayitii raawwachuuf grid, flexbox fi responsive dizaayinii barachuu qabna.',
        contentEn: 'HTML5 structures the web while CSS3 brings beautiful typography, colors, layouts and responsive breakpoints using Flexbox, CSS Grid, and custom variables.',
        duration: '1 Week',
        quiz: {
          id: 'web-q1',
          questionOm: 'Mallattoon HTML weebsaayitii irratti hunda caalaa jalqabbii fi xumura iftoomsu maali?',
          questionEn: 'Which HTML tag represents the root element that wraps all content on a webpage?',
          optionsOm: ['<head>', '<body>', '<html>', '<div>'],
          optionsEn: ['<head>', '<body>', '<html>', '<div>'],
          correctIndex: 2
        }
      },
      {
        id: 'web-mod2',
        titleOm: 'Kutaa 2: JavaScript & React Interactivity',
        titleEn: 'Module 2: Interactive JavaScript & React Hooks',
        contentOm: 'JavaScript weebsaayitii uumama jiraataa kenna. React ammoo salphaatti component-oota fi state bulchuuf gargaara, hojii keenya saffisaa taasisa.',
        contentEn: 'JavaScript brings active dynamic lifecycle to web applications. React JS leverages component structures and hooks like useState or useEffect to update the UI instantly.',
        duration: '3 Weeks',
        quiz: {
          id: 'web-q2',
          questionOm: 'React keessatti state tokko bulchuuf hook kamtu fayyadama?',
          questionEn: 'Which React hook is used to declare state variables inside functional components?',
          optionsOm: ['useEffect', 'useState', 'useContext', 'useRef'],
          optionsEn: ['useEffect', 'useState', 'useContext', 'useRef'],
          correctIndex: 1
        }
      },
      {
        id: 'web-mod3',
        titleOm: 'Kutaa 3: Node.js Backend & API Integration',
        titleEn: 'Module 3: Server Scripting with Node.js & APIs',
        contentOm: 'Gara duubaa (Backend) hojjechuuf Express fi database gargaarama. Kuni daataa barattootaa fi kaffaltii nagaatti akka kuusamu gargaara.',
        contentEn: 'To save data and manage authentication, we write APIs using Node.js and Express. Learn how client apps request and process database transfers and queries securely.',
        duration: '4 Weeks',
        quiz: {
          id: 'web-q3',
          questionOm: 'Protokoolii weebsaayitiin daataa feechuuf gargaaramu maali?',
          questionEn: 'Which protocol is primarily used to request and transfer web resources between a browser and a server?',
          optionsOm: ['FTP', 'HTTP/HTTPS', 'SMTP', 'SSH'],
          optionsEn: ['FTP', 'HTTP/HTTPS', 'SMTP', 'SSH'],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: 'graphic-design',
    titleOm: 'Master Graphic Design',
    titleEn: 'Master Graphic Design',
    descOm: 'Dizaayinii dandeettii ija keessan gara fakkii professional-etti jijjiiru baradhaa. Seera diizaayinii, herrega halluu fi teessuma jireenyaa baradhu.',
    descEn: 'Learn essential design principles to translate your creative vision into compelling layouts, logos, social media banners, and brand identity assets.',
    categoryOm: 'DIZAAYINII GIRAAFIKAA',
    categoryEn: 'GRAPHIC DESIGN',
    priceBirr: 200,
    durationWeeks: 6,
    lessonsCount: 3,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1626785774573-4b799315345d?auto=format&fit=crop&w=600&q=80',
    tagOm: 'Dizaayinii',
    tagEn: 'Creative Core',
    syllabus: [
      {
        id: 'gd-mod1',
        titleOm: 'Kutaa 1: Seera Bu’ura Dizaayinii (Design Principles)',
        titleEn: 'Module 1: Principles of Premium Layouts',
        contentOm: 'Qulqullina barruu fi qindoomina wantootaa (balance, contrast, alignment) sirriitti hubachuu. Kun dizaayinii keenya simbo qabeessa taasisa.',
        contentEn: 'Learn the pillars of design rhythm: contrast to catch eyes, alignment for harmony, repetition for unity, and spacious proximity to avoid visual clutter.',
        duration: '1 Week',
        quiz: {
          id: 'gd-q1',
          questionOm: 'Wanta beekamaa dizaayinii keessatti gidduu jiru kamtu "Negative Space" jedhama?',
          questionEn: 'What is "Negative Space" in graphic design terminology?',
          optionsOm: ['Iddoo gubate', 'Iddoo duwwaa dizaayinii keessatti argamu', 'Suura badde', 'Barruu gurraacha'],
          optionsEn: ['Burned areas', 'Empty or unoccupied space surrounding elements', 'Corrupted photo layers', 'Pure black texts'],
          correctIndex: 1
        }
      },
      {
        id: 'gd-mod2',
        titleOm: 'Kutaa 2: Saayinsii Halluu fi Haati Barruu (Typography)',
        titleEn: 'Module 2: Color Psychology & Typography Systems',
        contentOm: 'Halluun miira uuma. Halluun daddammaqsee qalbii namaa harkisuu baradhu. Gosa barruu (Fonts) sirrii ta’e filatanii fayyadamuu.',
        contentEn: 'Color theory dictates brand expression. Discover warm vs cool properties, hex codes, and font scaling systems that guide readers smoothly.',
        duration: '2 Weeks',
        quiz: {
          id: 'gd-q2',
          questionOm: 'Halluu fi miira uumamu kamtu "Red" (Diimaa) irraa daddammaqa?',
          questionEn: 'Which emotional response is strongly associated with the color red in branding?',
          optionsOm: ['Sodaa & Nagaa', 'Dhibbaa & Saffisa / Fedhii daddamaqoo', 'Qabbana & Tasgabbii', 'Keessummeessa duwwaa'],
          optionsEn: ['Calmness & Peace', 'Urgency, excitement, or passionate energy', 'Coldness & Logic', 'Pure simplicity'],
          correctIndex: 1
        }
      },
      {
        id: 'gd-mod3',
        titleOm: 'Kutaa 3: Identity Brand uumuu',
        titleEn: 'Module 3: Branding & Corporate Identity Projects',
        contentOm: 'Akkataa Logo fi brand guidelines ijaaramu baradhaa, uumamee daldala dhugaaf akka hojjetu qopheessi.',
        contentEn: 'Learn how to package logo variations, typographies, and color assets into clear brand guidelines that help corporate clients look professional.',
        duration: '3 Weeks',
        quiz: {
          id: 'gd-q3',
          questionOm: 'Gulaallii logo professional-etti herrega eenyummaa brand ibsu kam?',
          questionEn: 'A complete branding kit should provide the guidelines of which of the following details?',
          optionsOm: ['Password qofa', 'Color palettes & typographies & usage rules', 'Suuraa qofa', 'Internet kaffaltii'],
          optionsEn: ['Only passwords', 'Color palettes, typography pairings, and usage rules', 'Only random images', 'Internet speed checks'],
          correctIndex: 1
        }
      }
    ]
  },
  {
    id: 'photoshop-pro',
    titleOm: 'Adobe Photoshop Pro',
    titleEn: 'Adobe Photoshop Pro',
    descOm: 'Suuraa bifa ammayyaani fi qulqullina olaanaan gulaaluu danda’u baradhaa. Filtaroota, masking, retouching fi compositing dhuunfadhaa.',
    descEn: 'Master professional photo editing, digital retouching, shadow mapping, and high-end creative image processing using Adobe Photoshop.',
    categoryOm: 'GULAALLII SUURAA',
    categoryEn: 'PHOTO EDITING',
    priceBirr: 200,
    durationWeeks: 5,
    lessonsCount: 3,
    rating: 4.7,
    image: 'https://images.unsplash.com/photo-1541701494587-cb58502866ab?auto=format&fit=crop&w=600&q=80',
    tagOm: 'Gulaallii',
    tagEn: 'Mastertool',
    syllabus: [
      {
        id: 'ps-mod1',
        titleOm: 'Kutaa 1: Gulaallii "Layers" fi Hubannoo Photoshop',
        titleEn: 'Module 1: Interface & Layer-based Editing',
        contentOm: 'Layers fi Toolbar dizaayinii daddabalan gargaaramuu. Akkasumas fakkii qaxxaamuruu (cutting out vectors) bareechuun hojjechuudha.',
        contentEn: 'Get familiar with the workspace: understanding canvas setups, the non-destructive nature of layers, and robust vector selection shortcuts.',
        duration: '1 Week',
        quiz: {
          id: 'ps-q1',
          questionOm: 'Fakkiirratti jijjiirama daddabalatanii kaasuun akka fakkii bu’uraa hin balleessine Photoshop keessatti maaliin beekama?',
          questionEn: 'What is the most non-destructive way to hide or reveal parts of a layer in Adobe Photoshop?',
          optionsOm: ['Eraser Tool', 'Layer Masking', 'Deleting history', 'Flattening image'],
          optionsEn: ['Eraser Tool', 'Layer Masking', 'Deleting history', 'Flattening image'],
          correctIndex: 1
        }
      },
      {
        id: 'ps-mod2',
        titleOm: 'Kutaa 2: Retouching fi Gulaallii Fuulaa professional',
        titleEn: 'Module 2: Portrait Retouching & Healing Techs',
        contentOm: 'Frequency separation, healing brush, fi clone stamp fayyadamuun suuraa fuula namaa qorumsa malee miira uumamaa qulqulleessuu.',
        contentEn: 'Learn to wipe skin blemishes, match grain, and use frequency separation steps paired with dodge and burn secrets to edit human portrait shoots smoothly.',
        duration: '2 Weeks',
        quiz: {
          id: 'ps-q2',
          questionOm: 'Meesshaa kamtu suuraa keessatti gocha bishaan ykn dhibbaa qixeessuuf dhimma itti baha?',
          questionEn: 'Which tool is best suited for cleaning spots and transferring textures from one section of a photo to another?',
          optionsOm: ['Crop Tool', 'Spot Healing Brush / Stamp Tool', 'Magic Wand', 'Gradient Fill'],
          optionsEn: ['Crop Tool', 'Spot Healing Brush / Stamp Tool', 'Magic Wand', 'Gradient Fill'],
          correctIndex: 1
        }
      },
      {
        id: 'ps-mod3',
        titleOm: 'Kutaa 3: Halluu Gulaaluu fi RAW tuning',
        titleEn: 'Module 3: Camera RAW filter & Color Grading',
        contentOm: 'Camera RAW fayyadamuun qulqullina halluu suuraa kakaasuu, ifa madaalu fi color look-up tables (LUTs) irratti dizaayini uumuu.',
        contentEn: 'Harness the Camera RAW Filter for custom white-balance, highlights retrieval, fine-tuned curves, and artistic cinematic color rendering.',
        duration: '2 Weeks',
        quiz: {
          id: 'ps-q3',
          questionOm: 'Kamtu madaala ifaa fi daddaalte qixxee fakkii guutuu salphaatti qorata?',
          questionEn: 'Which adjustment adjustment panel tool controls overall shadows, midtones, and highlights through a dynamic spline?',
          optionsOm: ['Curves / Levels', 'Polygonal Lasso', 'Zoom Tool', 'Brush Size'],
          optionsEn: ['Curves / Levels', 'Polygonal Lasso', 'Zoom Tool', 'Brush Size'],
          correctIndex: 0
        }
      }
    ]
  },
  {
    id: 'video-editing',
    titleOm: 'Premiere Pro & CapCut',
    titleEn: 'Premiere Pro & CapCut',
    descOm: 'Viidiyoo YouTube fi TikTok dhibbaa uumuu danda’an gulaaluu baradhaa. Transitions, sound effect, captions, fi color grading guutuu baradhu.',
    descEn: 'Learn video editing techniques used by stars. Cut cinematic sequences, add sound effects, dynamic captions, and templates inside Adobe Premiere & CapCut.',
    categoryOm: 'GULAALLII VIIDIYOO',
    categoryEn: 'VIDEO EDITING',
    priceBirr: 200,
    durationWeeks: 6,
    lessonsCount: 3,
    rating: 4.9,
    image: 'https://images.unsplash.com/photo-1574717024653-61fd2cf4d44d?auto=format&fit=crop&w=600&q=80',
    tagOm: 'TikTok/YouTube',
    tagEn: 'Viral Focus',
    syllabus: [
      {
        id: 've-mod1',
        titleOm: 'Kutaa 1: Caasaa Gulaallii fi Saffisa Hojii (Timeline Mastery)',
        titleEn: 'Module 1: Timeline Logistics & Raw Cuts',
        contentOm: 'Akkataa viidiyoo gara timeline-itti galchuufi qaxxaamuranii gurmeessan. Gulaallii riitmii muuziqaa uumuuf dandeetti dizaayini cut.',
        contentEn: 'Understand the interface, timeline channels, razor shortcuts for precise cuts, and syncing camera footage with external microphone audios.',
        duration: '2 Weeks',
        quiz: {
          id: 've-q1',
          questionOm: 'Saffisaan timeline irratti bakka murame kuttuuf kiyyaaf(shortcut) kamtu gargaara?',
          questionEn: 'Which tool is commonly used to slice a clip directly on the timeline panel?',
          optionsOm: ['Hand Tool', 'Razor Tool / Razor Shortcut', 'Zoom Tool', 'Text Tool'],
          optionsEn: ['Hand Tool', 'Razor Tool / Razor Shortcut', 'Zoom Tool', 'Text Tool'],
          correctIndex: 1
        }
      },
      {
        id: 've-mod2',
        titleOm: 'Kutaa 2: Sound Design, SFX & Transitions',
        titleEn: 'Module 2: Audio Dynamics, Captions & Sound Effects',
        contentOm: 'Sagaleen viidiyoo keessatti 50% dhibbaa qaba jedhama. Akkataa sound effect-oota dabalanii, sagalee nagaa madaalan.',
        contentEn: 'Learn keyframe audio leveling, cleaning surrounding background statics, embedding sound effects, and generating auto-captions for high retention.',
        duration: '2 Weeks',
        quiz: {
          id: 've-q2',
          questionOm: 'Viidiyoo keessatti "Sound Design" maaliif gargaara?',
          questionEn: 'Why is sound design vital for social media video editing workflows?',
          optionsOm: ['Homaa hin dabaluf', 'Qalbi maamilaa qabuufi miira viidiyichaa guddisuuf', 'Screen gabaabsuuf', 'Suura qofaaf'],
          optionsEn: ['No purpose', 'To hook immediate auditory attention and amplify the visual mood content', 'Only to shorten display sizes', 'Only for static layouts'],
          correctIndex: 1
        }
      },
      {
        id: 've-mod3',
        titleOm: 'Kutaa 3: Color Grading & Final Export',
        titleEn: 'Module 3: Lumetri Color Grading & YouTube Formats',
        contentOm: 'Miidhagina halluu viidiyoo (Color Grading) akkasumas bitrate sirrii ta’een baasuuf (Exporting settings) barannaa xumuraa.',
        contentEn: 'Master Lumetri scopes to balance shadows, grading LUTs, and setting high-fidelity target bitrates for clean social channel uploads.',
        duration: '2 Weeks',
        quiz: {
          id: 've-q3',
          questionOm: 'Bitrate guddaan yeroo export hojjennu maaliif filatama?',
          questionEn: 'What is the primary benefit of selecting a proper target bitrate during final export?',
          optionsOm: ['Qulqullina bareeda fi gita viidiyoo sirri qabaachuuf', 'Bitrate xiqqaachuf', 'Hard disk guutuuf', 'Kaffaltii caalaa argachuuf'],
          optionsEn: ['To yield sharp visual fidelity and prevent visual compression artifacts', 'To make files low resolution', 'To fill hard drives faster', 'To get extra payouts'],
          correctIndex: 0
        }
      }
    ]
  },
  {
    id: 'digital-marketing',
    titleOm: 'Digital Marketing & SMM',
    titleEn: 'Digital Marketing & SMM',
    descOm: 'Akkaataa beekamtii toora interneetii guddisuu fi maamiloota haaraa baay’isani baradhaa. Facebook Ads, TikTok organic, fi Copywriting.',
    descEn: 'Learn modern digital marketing hacks. Master social media algorithms, setup highly converting targeted ads, and write compelling sales copy.',
    categoryOm: 'BULCHIINSA MIDIYAA',
    categoryEn: 'MARKETING / SMM',
    priceBirr: 200,
    durationWeeks: 4,
    lessonsCount: 3,
    rating: 4.8,
    image: 'https://images.unsplash.com/photo-1460925895917-afdab827c52f?auto=format&fit=crop&w=600&q=80',
    tagOm: 'Daldalootaf',
    tagEn: 'Grow Business',
    syllabus: [
      {
        id: 'dm-mod1',
        titleOm: 'Kutaa 1: Seera Beekumsa Algoritmota Toora Hawaasaa',
        titleEn: 'Module 1: Deciphering Social Media Algorithms',
        contentOm: 'Algoritmiin TikTok, Facebook fi Instagram akkamitti akka hojjetu baradhu. Click-through-rate fi retention raawwii isaaf dhimma uuman.',
        contentEn: 'Deep-dive into matching high attention: learning how Watch Time, Click-Through-Rate (CTR), and shareable loops drive organic algorithm pushes.',
        duration: '1 Week',
        quiz: {
          id: 'dm-q1',
          questionOm: 'Wantoota dhibbaa guddaa uuman keessaa algoritmota toora hawaasaa irratti dursa kamtu qaba?',
          questionEn: 'Which metric acts as the most powerful leverage for organic social algorithm boosts?',
          optionsOm: ['Likes duwwaa', 'Watch Time / User Retention (Yeroo viidiyoorra turan)', 'Fakkii barruu', 'Username miidhaga'],
          optionsEn: ['Pure raw likes count', 'Average Watch Time and User Retention rate', 'Image file format', 'Cool profile banners'],
          correctIndex: 1
        }
      },
      {
        id: 'dm-mod2',
        titleOm: 'Kutaa 2: Copywriting & Barruu Gurgurtaa',
        titleEn: 'Module 2: Psychological Copywriting & Content Funnels',
        contentOm: 'Barruu gurgurtaa nama gara maamilaatti jijjiirun akkamitti akka barreeffamu madaaluu (AIDA model: Attention, Interest, Desire, Action).',
        contentEn: 'Structure captions using the iconic AIDA (Attention, Interest, Desire, Action) framework to guide curious prospects into dedicated buyers.',
        duration: '1 Week',
        quiz: {
          id: 'dm-q2',
          questionOm: 'Mudaalli "AIDA" keessatti "C-T-A" jedhamu kam ibsa?',
          questionEn: 'What does "CTA" represent in marketing copywriting and layout design?',
          optionsOm: ['Continuous Time Axis', 'Call to Action (Gaaffii gocha raawwachuu)', 'Creative Text Area', 'Color Tuning Asset'],
          optionsEn: ['Continuous Time Axis', 'Call to Action (Direct prompt for action)', 'Creative Text Area', 'Color Tuning Asset'],
          correctIndex: 1
        }
      },
      {
        id: 'dm-mod3',
        titleOm: 'Kutaa 3: Targeted Ads & Kampeeyonni Hojjechuu',
        titleEn: 'Module 3: Run Targeted Campaigns & Tracking Metrics',
        contentOm: 'Akkataa Facebook Ads-iifi Tiktok Ads dizaayinii maallaqa xiqqaan, namoota daldala keetiif sirrii ta’an qophaa’an argatan banan.',
        contentEn: 'Configure custom demographics, run budget retargeting models, and perform systematic A/B testing on multi-ads sets to yield maximum return on spend.',
        duration: '2 Weeks',
        quiz: {
          id: 'dm-q3',
          questionOm: 'Herregni ROI daldala digital marketing keessatti maali?',
          questionEn: 'What does the abbreviation "ROI" mean in tracking premium advertising analytics?',
          optionsOm: ['Rate of Interest', 'Return on Investment (Bu’aa Qarshii Hojii)', 'Report on Issues', 'Record of Items'],
          optionsEn: ['Rate of Interest', 'Return on Investment (Profit compared to cost)', 'Report on Issues', 'Record of Items'],
          correctIndex: 1
        }
      }
    ]
  }
];
export const PREDEFINED_STUDENT = {
  email: 'student@amoo.com',
  password: 'password123',
  fullName: 'Amanu Sharaa',
  phone: '0912121212'
};

export const CONTACT_INFO = {
  owner: 'Amanuel',
  phone: '+251967145146',
  address: 'Harar, Ethiopia',
  email: 'amanuel@amoo.com'
};

(function () {
    const baseSpecialties = [
        { id: 1, icon: "fa-wrench", name_ar: "سباك", name_en: "Plumber", name_fr: "Plombier", rating: 4.8, reviewCount: 156 },
        { id: 2, icon: "fa-lightbulb", name_ar: "كهربائي", name_en: "Electrician", name_fr: "Électricien", rating: 4.9, reviewCount: 203 },
        { id: 3, icon: "fa-hammer", name_ar: "نجار", name_en: "Carpenter", name_fr: "Menuisier", rating: 4.7, reviewCount: 189 },
        { id: 4, icon: "fa-car", name_ar: "ميكانيكي سيارات", name_en: "Car Mechanic", name_fr: "Mécanicien auto", rating: 4.6, reviewCount: 112 },
        { id: 5, icon: "fa-industry", name_ar: "حداد", name_en: "Blacksmith", name_fr: "Forgeron", rating: 4.5, reviewCount: 98 },
        { id: 6, icon: "fa-paint-roller", name_ar: "دهان", name_en: "Painter", name_fr: "Peintre", rating: 4.6, reviewCount: 134 },
        { id: 7, icon: "fa-snowflake", name_ar: "فني تكييف", name_en: "AC Technician", name_fr: "Technicien climatisation", rating: 4.9, reviewCount: 245 },
        { id: 8, icon: "fa-border-all", name_ar: "جبس بورد", name_en: "Gypsum Board Installer", name_fr: "Plaquiste", rating: 4.5, reviewCount: 87 },
        { id: 9, icon: "fa-building", name_ar: "مقاول بناء", name_en: "Construction Contractor", name_fr: "Entrepreneur BTP", rating: 4.7, reviewCount: 234 },
        { id: 10, icon: "fa-palette", name_ar: "مهندس ديكور", name_en: "Interior Designer", name_fr: "Architecte d'intérieur", rating: 4.8, reviewCount: 156 },
        { id: 11, icon: "fa-mobile-alt", name_ar: "فني موبايل", name_en: "Mobile Technician", name_fr: "Technicien mobile", rating: 4.7, reviewCount: 112 },
        { id: 12, icon: "fa-laptop", name_ar: "فني كمبيوتر", name_en: "Computer Technician", name_fr: "Technicien informatique", rating: 4.6, reviewCount: 98 },
        { id: 13, icon: "fa-cut", name_ar: "حلاق", name_en: "Barber", name_fr: "Barbier", rating: 4.8, reviewCount: 167 },
        { id: 14, icon: "fa-scissors", name_ar: "خياط", name_en: "Tailor", name_fr: "Tailleur", rating: 4.7, reviewCount: 89 },
        { id: 15, icon: "fa-plug", name_ar: "فني كهرباء منازل", name_en: "Home Electrician", name_fr: "Électricien à domicile", rating: 4.8, reviewCount: 178 },
        { id: 16, icon: "fa-tv", name_ar: "فني شاشات", name_en: "TV Technician", name_fr: "Technicien TV", rating: 4.5, reviewCount: 67 },
        { id: 17, icon: "fa-blender", name_ar: "فني أجهزة منزلية", name_en: "Appliance Technician", name_fr: "Technicien électroménager", rating: 4.6, reviewCount: 89 },
        { id: 18, icon: "fa-wind", name_ar: "فني تكييف مركزي", name_en: "Central AC Technician", name_fr: "Technicien CVC central", rating: 4.8, reviewCount: 102 },
        { id: 19, icon: "fa-fire", name_ar: "فني غلايات", name_en: "Boiler Technician", name_fr: "Technicien chaudière", rating: 4.7, reviewCount: 45 },
        { id: 20, icon: "fa-water", name_ar: "فني مسابح", name_en: "Pool Technician", name_fr: "Technicien piscine", rating: 4.6, reviewCount: 34 },
        { id: 21, icon: "fa-temperature-high", name_ar: "عزل حراري", name_en: "Thermal Insulation", name_fr: "Isolation thermique", rating: 4.5, reviewCount: 56 },
        { id: 22, icon: "fa-tint", name_ar: "عزل مائي", name_en: "Waterproofing", name_fr: "Étanchéité", rating: 4.7, reviewCount: 78 },
        { id: 23, icon: "fa-brush", name_ar: "دهان صناعي", name_en: "Industrial Painter", name_fr: "Peintre industriel", rating: 4.6, reviewCount: 43 },
        { id: 24, icon: "fa-car-battery", name_ar: "كهربائي سيارات", name_en: "Auto Electrician", name_fr: "Électricien automobile", rating: 4.8, reviewCount: 134 },
        { id: 25, icon: "fa-truck", name_ar: "ميكانيكي ديزل", name_en: "Diesel Mechanic", name_fr: "Mécanicien diesel", rating: 4.7, reviewCount: 98 },
        { id: 26, icon: "fa-tree", name_ar: "بستاني", name_en: "Gardener", name_fr: "Jardinier", rating: 4.5, reviewCount: 67 },
        { id: 27, icon: "fa-volume-off", name_ar: "عزل صوت", name_en: "Soundproofing", name_fr: "Isolation acoustique", rating: 4.6, reviewCount: 45 },
        { id: 28, icon: "fa-th-large", name_ar: "مبلط", name_en: "Tiler", name_fr: "Carreleur", rating: 4.7, reviewCount: 112 },
        { id: 29, icon: "fa-microchip", name_ar: "فني إلكترونيات", name_en: "Electronics Technician", name_fr: "Technicien électronique", rating: 4.8, reviewCount: 89 },
        { id: 30, icon: "fa-hard-hat", name_ar: "نجار مسلح", name_en: "Formwork Carpenter", name_fr: "Coffreur", rating: 4.6, reviewCount: 78 },
        { id: 31, icon: "fa-ruler-combined", name_ar: "حدادة مسلحة", name_en: "Rebar Worker", name_fr: "Ferrailleur", rating: 4.5, reviewCount: 67 },
        { id: 32, icon: "fa-couch", name_ar: "نجار أثاث", name_en: "Furniture Carpenter", name_fr: "Ébéniste", rating: 4.8, reviewCount: 134 },
        { id: 33, icon: "fa-solar-panel", name_ar: "طاقة شمسية", name_en: "Solar Technician", name_fr: "Technicien solaire", rating: 4.9, reviewCount: 56 },
        { id: 34, icon: "fa-video", name_ar: "فني كاميرات مراقبة", name_en: "CCTV Technician", name_fr: "Technicien vidéosurveillance", rating: 4.7, reviewCount: 98 },
        { id: 35, icon: "fa-shield-alt", name_ar: "فني إنذار", name_en: "Alarm Technician", name_fr: "Technicien d'alarme", rating: 4.6, reviewCount: 67 },
        { id: 36, icon: "fa-door-open", name_ar: "أبواب أوتوماتيك", name_en: "Automatic Door Tech", name_fr: "Technicien portes auto", rating: 4.7, reviewCount: 45 },
        { id: 37, icon: "fa-building", name_ar: "فني مصاعد", name_en: "Elevator Technician", name_fr: "Technicien ascenseur", rating: 4.8, reviewCount: 34 },
        { id: 38, icon: "fa-fan", name_ar: "فني تهوية", name_en: "Ventilation Technician", name_fr: "Technicien ventilation", rating: 4.5, reviewCount: 29 },
        { id: 39, icon: "fa-drafting-compass", name_ar: "رسام معماري", name_en: "Architectural Drafter", name_fr: "Dessinateur en architecture", rating: 4.7, reviewCount: 88 },
        { id: 40, icon: "fa-spray-can", name_ar: "فني تعقيم", name_en: "Sterilization Technician", name_fr: "Technicien stérilisation", rating: 4.6, reviewCount: 41 }
    ];

    const extraRows = [
        ["فني ستائر", "Curtain technician", "Technicien rideaux", "fa-scroll"],
        ["فني نجف", "Chandelier technician", "Technicien lustres", "fa-lightbulb"],
        ["فني إضاءة", "Lighting technician", "Technicien éclairage", "fa-lightbulb"],
        ["فني طلمبات", "Pump technician", "Technicien pompes", "fa-cogs"],
        ["فني سخانات", "Water heater technician", "Technicien chauffe-eau", "fa-fire"],
        ["فني فلاتر مياه", "Water filter technician", "Technicien filtres eau", "fa-filter"],
        ["فني تنقية مياه", "Water purification technician", "Technicien purification eau", "fa-tint"],
        ["فني مولدات كهرباء", "Generator technician", "Technicien groupes électrogènes", "fa-bolt"],
        ["فني UPS", "UPS technician", "Technicien onduleur (UPS)", "fa-battery-full"],
        ["فني أبواب", "Door technician", "Technicien portes", "fa-door-closed"],
        ["فني شبابيك", "Window technician", "Technicien fenêtres", "fa-border-all"],
        ["فني أقفال", "Locksmith", "Serrurier", "fa-key"],
        ["فني بوابات", "Gate technician", "Technicien portails", "fa-door-open"],
        ["فني جراجات", "Garage door technician", "Technicien portes garage", "fa-warehouse"],
        ["فني عزل أسطح", "Roof insulation technician", "Technicien isolation toiture", "fa-home"],
        ["فني سباكة حمامات", "Bathroom plumbing specialist", "Spécialiste plomberie salle de bain", "fa-bath"],
        ["فني مطابخ", "Kitchen fitter", "Poseur cuisine", "fa-utensils"],
        ["فني ديكور", "Decor technician", "Technicien décoration", "fa-paintbrush"],
        ["مصمم داخلي", "Interior designer", "Designer d'intérieur", "fa-compass-drafting"],
        ["فني أرضيات", "Flooring technician", "Technicien sols", "fa-th"],
        ["فني سجاد", "Carpet technician", "Technicien moquettes", "fa-th-large"],
        ["فني تنجيد", "Upholsterer", "Tapissier", "fa-chair"],
        ["فني مفروشات", "Furniture upholstery tech", "Technicien literie / sièges", "fa-couch"],
        ["فني ستلايت", "Satellite technician", "Technicien parabole", "fa-satellite"],
        ["فني أجهزة طبية", "Medical equipment technician", "Technicien équipement médical", "fa-stethoscope"],
        ["فني معامل", "Lab equipment technician", "Technicien laboratoire", "fa-flask"],
        ["فني تبريد صناعي", "Industrial refrigeration tech", "Technicien froid industriel", "fa-temperature-low"],
        ["فني خطوط إنتاج", "Production line technician", "Technicien ligne de production", "fa-industry"],
        ["فني مصانع", "Factory maintenance technician", "Technicien maintenance usine", "fa-hard-hat"],
        ["فني معدات ثقيلة", "Heavy equipment technician", "Technicien engins lourds", "fa-truck"],
        ["فني لحام", "Welder", "Soudeur", "fa-fire"],
        ["فني CNC", "CNC technician", "Technicien CNC", "fa-cogs"],
        ["فني صيانة عامة", "General maintenance technician", "Technicien maintenance générale", "fa-screwdriver-wrench"],
        ["فني تنظيف", "Cleaning specialist", "Spécialiste nettoyage", "fa-broom"],
        ["فني مكافحة حشرات", "Pest control technician", "Technicien dératisation / nuisibles", "fa-bug"],
        ["فني نقل أثاث", "Furniture mover", "Déménageur", "fa-dolly"],
        ["فني تغليف", "Packing specialist", "Spécialiste emballage", "fa-box"],
        ["فني حدائق", "Landscape technician", "Technicien paysagiste", "fa-leaf"],
        ["فني ري", "Irrigation technician", "Technicien irrigation", "fa-tint"],
        ["فني زراعة", "Agriculture technician", "Technicien agricole", "fa-leaf"],
        ["فني تربية دواجن", "Poultry technician", "Technicien avicole", "fa-feather"],
        ["فني تربية مواشي", "Livestock technician", "Technicien élevage", "fa-cow"],
        ["فني أسماك", "Aquaculture technician", "Technicien aquaculture", "fa-fish"],
        ["فني أفران بلدي", "Traditional oven technician", "Technicien four traditionnel", "fa-fire"],
        ["فني مخابز", "Bakery equipment technician", "Technicien équipement boulangerie", "fa-bread-slice"],
        ["فني مطاعم", "Restaurant equipment tech", "Technicien équipement restauration", "fa-utensils"],
        ["شيف", "Chef", "Chef cuisinier", "fa-utensils"],
        ["مساعد شيف", "Sous-chef assistant", "Commis de cuisine", "fa-user"],
        ["فني قهوة", "Coffee equipment technician", "Technicien machines à café", "fa-mug-hot"],
        ["باريستا", "Barista", "Barista", "fa-mug-hot"],
        ["فني حلويات", "Pastry equipment tech", "Technicien équipement pâtisserie", "fa-birthday-cake"],
        ["فني تصوير", "Photography technician", "Technicien photo", "fa-camera"],
        ["مصور", "Photographer", "Photographe", "fa-camera-retro"],
        ["فني فيديو", "Video technician", "Technicien vidéo", "fa-video"],
        ["فني مونتاج", "Video editor", "Monteur vidéo", "fa-file-alt"],
        ["فني صوت", "Audio technician", "Technicien son", "fa-volume-high"],
        ["فني إضاءة مسارح", "Stage lighting technician", "Technicien lumière scène", "fa-lightbulb"],
        ["فني DJ", "DJ technician", "Technicien DJ", "fa-music"],
        ["فني تنظيم حفلات", "Event setup technician", "Technicien événementiel", "fa-glass-cheers"],
        ["فني أمن", "Security technician", "Technicien sécurité", "fa-user-shield"],
        ["حارس", "Security guard", "Agent de sécurité", "fa-shield"],
        ["فني إنقاذ", "Rescue technician", "Technicien secours", "fa-ambulance"],
        ["فني تمريض", "Nursing aide technician", "Aide-soignant technique", "fa-user-md"],
        ["مساعد طبي", "Medical assistant", "Assistant médical", "fa-file-medical-alt"],
        ["فني علاج طبيعي", "Physiotherapy technician", "Technicien kinésithérapie", "fa-heartbeat"],
        ["فني صيانة أجهزة", "Device maintenance tech", "Technicien maintenance appareils", "fa-screwdriver"],
        ["فني صيانة إلكترونيات", "Electronics maintenance", "Maintenance électronique", "fa-microchip"],
        ["فني روبوتات", "Robotics technician", "Technicien robotique", "fa-robot"],
        ["فني برمجة", "Programming technician", "Technicien programmation", "fa-code"],
        ["فني دعم فني", "IT support technician", "Technicien support IT", "fa-headset"],
        ["فني اختبار", "QA testing technician", "Technicien tests qualité", "fa-check-double"],
        ["فني جودة", "Quality technician", "Technicien qualité", "fa-clipboard-check"],
        ["فني تدريب", "Training technician", "Technicien formation", "fa-chalkboard-teacher"],
        ["فني موارد بشرية", "HR operations specialist", "Spécialiste RH", "fa-users"],
        ["فني تسويق", "Marketing specialist", "Spécialiste marketing", "fa-bullhorn"],
        ["فني مبيعات", "Sales support specialist", "Spécialiste ventes", "fa-shopping-cart"],
        ["فني خدمة عملاء", "Customer service specialist", "Spécialiste service client", "fa-headset"],
        ["فني لوجستيات", "Logistics specialist", "Spécialiste logistique", "fa-dolly"],
        ["فني مشتريات", "Procurement specialist", "Acheteur / approvisionnement", "fa-file-invoice-dollar"],
        ["فني مخازن", "Warehouse technician", "Technicien entrepôt", "fa-boxes"],
        ["فني شحن", "Shipping coordinator", "Coordinateur expédition", "fa-dolly"],
        ["فني تفريغ", "Unloading specialist", "Spécialiste déchargement", "fa-box-open"],
        ["فني كسوة", "Cladding technician", "Technicien bardage / revêtement", "fa-layer-group"],
        ["فني ألمنيوم", "Aluminum technician", "Technicien aluminium", "fa-border-all"],
        ["فني زجاج", "Glazier", "Vitrier", "fa-window-maximize"],
        ["فني مرآب سيارات", "Auto garage technician", "Technicien garage auto", "fa-car"],
        ["فني دراجات", "Bicycle technician", "Technicien vélos", "fa-bicycle"],
        ["فني طابعات", "Printer technician", "Technicien imprimantes", "fa-print"],
        ["فني شبكات", "Network technician", "Technicien réseaux", "fa-network-wired"],
        ["فني سيرفرات", "Server technician", "Technicien serveurs", "fa-server"],
        ["فني أمن معلومات", "IT security technician", "Technicien cybersécurité", "fa-lock"],
        ["فني طاقة رياح", "Wind energy technician", "Technicien éolien", "fa-wind"],
        ["فني غاز", "Gas technician", "Technicien gaz", "fa-fire"],
        ["فني أنابيب", "Pipeline technician", "Technicien canalisations", "fa-stream"],
        ["فني مضخات مياه", "Water pump specialist", "Spécialiste pompes à eau", "fa-water"],
        ["فني نوافذ UPVC", "UPVC window technician", "Technicien fenêtres PVC", "fa-square-full"],
        ["فني أرضيات خشب", "Wood flooring installer", "Poseur parquet bois", "fa-tree"],
        ["فني رخام وجرانيت", "Marble & granite technician", "Technicien marbre & granit", "fa-gem"],
        ["فني واجهات", "Facade technician", "Technicien façades", "fa-building"],
        ["فني حمامات سباحة", "Swimming pool builder tech", "Technicien piscines", "fa-swimming-pool"],
        ["فني نوافذ ذكية", "Smart window technician", "Technicien fenêtres intelligentes", "fa-home"],
        ["فني طاقة", "Energy systems technician", "Technicien systèmes énergétiques", "fa-bolt"],
        ["فني صيانة مصاعد", "Elevator maintenance", "Maintenance ascenseurs", "fa-building"],
        ["فني تبريد تجاري", "Commercial refrigeration", "Froid commercial", "fa-snowflake"],
        ["فني أفران غاز", "Gas oven technician", "Technicien fours à gaz", "fa-fire"],
        ["فني مطابخ فندقية", "Hotel kitchen equipment", "Équipement cuisine hôtelière", "fa-utensils"],
        ["فني أتمتة منازل", "Home automation technician", "Technicien domotique", "fa-home"],
        ["فني أنظمة صوتية", "Sound systems installer", "Installateur sonorisation", "fa-sliders"],
        ["فني LED", "LED lighting technician", "Technicien éclairage LED", "fa-lightbulb"],
        ["فني طاقة احتياطية", "Backup power technician", "Technicien alimentation secours", "fa-battery-full"],
        ["فني هواتف أرضية", "Landline technician", "Technicien téléphonie fixe", "fa-phone"],
        ["فني راوترات", "Router & network installer", "Installateur routeurs", "fa-wifi"],
        ["فني كابلات", "Cabling technician", "Technicien câblage", "fa-plug"],
        ["فني أبراج اتصالات", "Telecom tower technician", "Technicien pylônes", "fa-broadcast-tower"],
        ["فني ماسحات ضوئية", "Scanner technician", "Technicien scanners", "fa-barcode"],
        ["فني ماكينات صراف", "ATM technician", "Technicien GAB / DAB", "fa-money-bill"],
        ["فني بوابات إلكترونية", "Electronic gate technician", "Technicien portails électroniques", "fa-bolt"],
        ["فني بوابات تذاكر", "Turnstile technician", "Technicien tourniquets", "fa-ticket"],
        ["فني أنظمة إطفاء", "Fire suppression technician", "Technicien suppression incendie", "fa-fire-extinguisher"],
        ["فني كاميرات حرارية", "Thermal camera technician", "Technicien caméras thermiques", "fa-thermometer-half"],
        ["فني طاقة متجددة", "Renewable energy technician", "Technicien énergies renouvelables", "fa-leaf"],
        ["فني صيانة طائرات", "Aircraft maintenance helper", "Assistant maintenance aéronefs", "fa-plane"],
        ["فني قوارب", "Marine technician", "Technicien naval", "fa-ship"],
        ["فني معدات زراعية", "Farm equipment technician", "Technicien matériel agricole", "fa-tractor"],
        ["فني صيانة معدات", "Equipment maintenance tech", "Technicien maintenance équipements", "fa-screwdriver-wrench"]
    ];

    let idCounter = 41;
    const all = [...baseSpecialties];
    for (const row of extraRows) {
        if (all.length >= 150) break;
        const [name_ar, name_en, name_fr, icon] = row;
        all.push({
            id: idCounter++,
            icon,
            name_ar,
            name_en,
            name_fr,
            rating: parseFloat((3.6 + Math.random() * 1.3).toFixed(1)),
            reviewCount: Math.floor(20 + Math.random() * 220)
        });
    }
    while (all.length < 150) {
        const n = all.length + 1;
        all.push({
            id: idCounter++,
            icon: "fa-screwdriver-wrench",
            name_ar: `فني صيانة متخصص ${n}`,
            name_en: `Specialized maintenance technician ${n}`,
            name_fr: `Technicien maintenance spécialisé ${n}`,
            rating: parseFloat((3.8 + Math.random() * 1.1).toFixed(1)),
            reviewCount: Math.floor(30 + Math.random() * 150)
        });
    }

    window.SPECIALTIES_DATA = all.slice(0, 150);

    window.GOVERNORATES_DATA = {
        "القاهرة": { name_ar: "القاهرة", name_en: "Cairo", name_fr: "Le Caire", cities: ["الزيتون", "المعادي", "مدينة نصر", "العباسية", "شبرا", "مصر الجديدة", "الوايلي", "روض الفرج", "الساحل", "المنيرة", "الأزبكية", "باب الشعرية", "بولاق", "جاردن سيتي", "وسط البلد", "عابدين", "قصر النيل", "مصر القديمة", "الخليفة", "المقطم", "المنيل", "الزمالك", "الجزيرة", "المرج", "عين شمس", "السلام", "الأميرية", "حدائق القبة", "الزاوية الحمراء"] },
        "الجيزة": { name_ar: "الجيزة", name_en: "Giza", name_fr: "Gizeh", cities: ["الدقي", "المهندسين", "العجوزة", "أكتوبر", "الهرم", "فيصل", "أوسيم", "كرداسة", "البدرشين", "إمبابة", "بولاق الدكرور", "الوراق", "حلوان", "تبين"] },
        "الإسكندرية": { name_ar: "الإسكندرية", name_en: "Alexandria", name_fr: "Alexandrie", cities: ["المنتزه", "سيدي جابر", "محرم بك", "العجمي", "برج العرب", "الرمال", "كليوباترا", "ستانلي", "الأنفوشي", "بحري", "كرموز", "لوران", "جليم", "سبورتنج"] },
        "الشرقية": { name_ar: "الشرقية", name_en: "Sharqia", name_fr: "Charqiya", cities: ["الزقازيق", "العاشر من رمضان", "منيا القمح", "بلبيس", "أبو حماد", "ههيا", "فاقوس", "أبو كبير", "ديرب نجم", "كفر صقر", "الإبراهيمية"] },
        "الدقهلية": { name_ar: "الدقهلية", name_en: "Dakahlia", name_fr: "Daqahleya", cities: ["المنصورة", "طلخا", "السنبلاوين", "دكرنس", "أجا", "ميت غمر", "شربين", "بلقاس", "تمي الأمديد", "بني عبيد"] },
        "البحيرة": { name_ar: "البحيرة", name_en: "Beheira", name_fr: "Beheira", cities: ["دمنهور", "كفر الدوار", "رشيد", "إدكو", "أبو المطامير", "حوش عيسى", "المحمودية", "الرحمانية", "الدلنجات"] },
        "المنوفية": { name_ar: "المنوفية", name_en: "Menoufia", name_fr: "Menoufia", cities: ["شبين الكوم", "منوف", "سرس الليان", "الباجور", "قويسنا", "أشمون", "بركة السبع", "تلا"] },
        "القليوبية": { name_ar: "القليوبية", name_en: "Qalyubia", name_fr: "Qalyubia", cities: ["بنها", "شبرا الخيمة", "قليوب", "الخانكة", "كفر شكر", "طوخ", "قها", "العبور"] },
        "الغربية": { name_ar: "الغربية", name_en: "Gharbia", name_fr: "Gharbia", cities: ["طنطا", "المحلة الكبرى", "كفر الزيات", "زفتى", "بسيون", "سمنود", "قطور"] },
        "كفر الشيخ": { name_ar: "كفر الشيخ", name_en: "Kafr El Sheikh", name_fr: "Kafr El Cheikh", cities: ["كفر الشيخ", "دسوق", "بيلا", "فوه", "مطوبس", "الرياض", "سيدي سالم", "الحامول"] },
        "المنيا": { name_ar: "المنيا", name_en: "Minya", name_fr: "Minya", cities: ["المنيا", "ملوي", "بني مزار", "مطاي", "سمالوط", "أبو قرقاص", "مغاغة", "العدوة"] },
        "أسيوط": { name_ar: "أسيوط", name_en: "Assiut", name_fr: "Assiout", cities: ["أسيوط", "ديروط", "القوصية", "منفلوط", "أبو تيج", "البداري", "ساحل سليم", "الغنايم"] },
        "سوهاج": { name_ar: "سوهاج", name_en: "Sohag", name_fr: "Sohag", cities: ["سوهاج", "أخميم", "البلينا", "المراغة", "جرجا", "طهطا", "دار السلام", "المنشاة"] },
        "قنا": { name_ar: "قنا", name_en: "Qena", name_fr: "Qena", cities: ["قنا", "قفط", "نقادة", "فرشوط", "دشنا", "أبو تشت", "الوقف"] },
        "الأقصر": { name_ar: "الأقصر", name_en: "Luxor", name_fr: "Louxor", cities: ["الأقصر", "البياضية", "الطود", "إسنا", "أرمنت"] },
        "أسوان": { name_ar: "أسوان", name_en: "Aswan", name_fr: "Assouan", cities: ["أسوان", "إدفو", "كوم أمبو", "نصر النوبة", "السباعية"] },
        "الفيوم": { name_ar: "الفيوم", name_en: "Fayoum", name_fr: "Fayoum", cities: ["الفيوم", "طامية", "سنورس", "إطسا", "يوسف الصديق"] },
        "بني سويف": { name_ar: "بني سويف", name_en: "Beni Suef", name_fr: "Beni Souef", cities: ["بني سويف", "الواسطى", "ناصر", "ببا", "سمسطا", "الفشن"] },
        "الإسماعيلية": { name_ar: "الإسماعيلية", name_en: "Ismailia", name_fr: "Ismaïlia", cities: ["الإسماعيلية", "فايد", "القنطرة شرق", "القنطرة غرب", "التل الكبير"] },
        "بورسعيد": { name_ar: "بورسعيد", name_en: "Port Said", name_fr: "Port-Saïd", cities: ["بورسعيد", "العرب", "الزهور", "الضواحي"] },
        "دمياط": { name_ar: "دمياط", name_en: "Damietta", name_fr: "Damiette", cities: ["دمياط", "فارسكور", "كفر سعد", "الزرقا", "رأس البر"] },
        "السويس": { name_ar: "السويس", name_en: "Suez", name_fr: "Suez", cities: ["السويس", "الأربعين", "عتاقة", "الجناين"] },
        "شمال سيناء": { name_ar: "شمال سيناء", name_en: "North Sinai", name_fr: "Nord Sinaï", cities: ["العريش", "الشيخ زويد", "رفح", "بئر العبد"] },
        "جنوب سيناء": { name_ar: "جنوب سيناء", name_en: "South Sinai", name_fr: "Sud Sinaï", cities: ["الطور", "شرم الشيخ", "دهب", "نويبع", "طابا", "سانت كاترين"] },
        "مطروح": { name_ar: "مطروح", name_en: "Matrouh", name_fr: "Matrouh", cities: ["مرسى مطروح", "الضبعة", "النجيلة", "سيوة", "الحمام"] },
        "الوادي الجديد": { name_ar: "الوادي الجديد", name_en: "New Valley", name_fr: "Nouvelle Vallée", cities: ["الخارجة", "الداخلة", "الفرافرة", "بلاط", "باريس"] },
        "البحر الأحمر": { name_ar: "البحر الأحمر", name_en: "Red Sea", name_fr: "Mer Rouge", cities: ["الغردقة", "رأس غارب", "سفاجا", "القصير", "مرسى علم", "حلايب"] }
    };

    const craftsmanNames = [
        { name_ar: "محمود السيد", name_en: "Mahmoud El Sayed", name_fr: "Mahmoud El Sayed" },
        { name_ar: "كريم فتحي", name_en: "Karim Fathy", name_fr: "Karim Fathy" },
        { name_ar: "عمر الشافعي", name_en: "Omar El Shafie", name_fr: "Omar El Chafii" },
        { name_ar: "طارق نبيل", name_en: "Tarek Nabil", name_fr: "Tarek Nabil" },
        { name_ar: "ياسر حمدي", name_en: "Yasser Hamdy", name_fr: "Yasser Hamdy" },
        { name_ar: "هشام رضا", name_en: "Hesham Reda", name_fr: "Hesham Reda" },
        { name_ar: "وليد مصطفى", name_en: "Walid Mostafa", name_fr: "Walid Mostafa" },
        { name_ar: "إسلام جابر", name_en: "Islam Gaber", name_fr: "Islam Gaber" },
        { name_ar: "أحمد ناصر", name_en: "Ahmed Nasser", name_fr: "Ahmed Nasser" },
        { name_ar: "سامح عادل", name_en: "Sameh Adel", name_fr: "Sameh Adel" },
        { name_ar: "ليلى فاتح", name_en: "Laila Fathy", name_fr: "Laila Fathy" },
        { name_ar: "ديانا مصطفى", name_en: "Dina Mostafa", name_fr: "Dina Mostafa" }
    ];

    window.TOP_CRAFTSMEN = craftsmanNames.map((n, i) => {
        const specialty = window.SPECIALTIES_DATA[i];
        return {
            id: i + 1,
            name_ar: n.name_ar,
            name_en: n.name_en,
            name_fr: n.name_fr,
            specialtyId: specialty.id,
            rating: Number((4.4 + (i % 6) * 0.1).toFixed(1)),
            jobs: 95 + i * 18
        };
    });

    window.CUSTOMER_REVIEWS = [
        { id: 1, rating: 5, author_ar: "أحمد علي", author_en: "Ahmed Ali", author_fr: "Ahmed Ali", text_ar: "خدمة ممتازة جداً، الفني وصل في الوقت المحدد واشتغل باحترافية.", text_en: "Excellent service; the technician arrived on time and worked professionally.", text_fr: "Service excellent ; le technicien est arrivé à l'heure et a travaillé avec professionnalisme." },
        { id: 2, rating: 4.5, author_ar: "سارة محمد", author_en: "Sara Mohamed", author_fr: "Sara Mohamed", text_ar: "التطبيق سهل الاستخدام والحرفي كان محترماً.", text_en: "The app is easy to use and the craftsman was respectful.", text_fr: "L'application est simple et l'artisan était respectueux." },
        { id: 3, rating: 5, author_ar: "خالد إبراهيم", author_en: "Khaled Ibrahim", author_fr: "Khaled Ibrahim", text_ar: "أنقذوني في وقت قياسي، شكراً دليل الحرفيين.", text_en: "They helped me incredibly fast—thanks Handyman Directory 2026.", text_fr: "Ils m'ont aidé très rapidement — merci à l'annuaire des artisans." },
        { id: 4, rating: 4, author_ar: "منى حسن", author_en: "Mona Hassan", author_fr: "Mona Hassan", text_ar: "تجربة جيدة، الأسعار واضحة والأداء ممتاز.", text_en: "Good experience: clear pricing and great work.", text_fr: "Bonne expérience : tarifs clairs et travail de qualité." },
        { id: 5, rating: 5, author_ar: "يوسف رشاد", author_en: "Youssef Rashad", author_fr: "Youssef Rashad", text_ar: "أفضل منصة للحرفيين في مصر بلا منازع.", text_en: "The best craftsmen platform in Egypt, hands down.", text_fr: "La meilleure plateforme d'artisans en Égypte, sans hésiter." },
        { id: 6, rating: 4.5, author_ar: "نوران محمود", author_en: "Noran Mahmoud", author_fr: "Noran Mahmoud", text_ar: "سهل وسريع وموثوق، أنصح به بشدة.", text_en: "Easy, fast, and reliable—I highly recommend it.", text_fr: "Simple, rapide et fiable — je recommande vivement." },
        { id: 7, rating: 5, author_ar: "محمد سمير", author_en: "Mohamed Samir", author_fr: "Mohamed Samir", text_ar: "فني التكييف كان خبيراً وحل المشكلة في نصف ساعة.", text_en: "The AC tech was an expert and fixed it in thirty minutes.", text_fr: "Le technicien climatisation était expert et a réglé le problème en trente minutes." },
        { id: 8, rating: 4, author_ar: "فاطمة الزهراء", author_en: "Fatma El Zahraa", author_fr: "Fatma El Zahraa", text_ar: "الموقع سهل والتعامل راقي.", text_en: "The site is easy to use and communication was great.", text_fr: "Le site est simple et l'échange était très professionnel." },
        { id: 9, rating: 5, author_ar: "عمرو دياب", author_en: "Amr Diab", author_fr: "Amr Diab", text_ar: "خدمة عملاء ممتازة وفريق محترف.", text_en: "Excellent customer service and a professional team.", text_fr: "Excellent service client et équipe très professionnelle." },
        { id: 10, rating: 4.5, author_ar: "هبة الله", author_en: "Hibatullah", author_fr: "Hibatullah", text_ar: "أول مرة أستخدم الموقع، لكني سأكرر التجربة.", text_en: "First time using the site—and I will definitely use it again.", text_fr: "Première utilisation du site — et je recommencerai sans hésiter." },
        { id: 11, rating: 4.8, author_ar: "رانيا علي", author_en: "Rania Ali", author_fr: "Rania Ali", text_ar: "اختيار رائع! الحرفي متخصص وموثوق جداً وودي.", text_en: "Excellent choice! The craftsman is specialized, very reliable and friendly.", text_fr: "Excellent choix! L'artisan est spécialisé, très fiable et sympathique." },
        { id: 12, rating: 4.9, author_ar: "محمود حسن", author_en: "Mahmoud Hassan", author_fr: "Mahmoud Hassan", text_ar: "أفضل منصة استخدمتها، الخدمة احترافية والسعر عادل.", text_en: "The best platform I used, professional service and fair price.", text_fr: "La meilleure plateforme que j'ai utilisée, service professionnel et prix juste." }
    ];

    window.TEAM_DATA = [
        {
            name_ar: "محمد أحمد",
            name_en: "Mohamed Ahmed",
            name_fr: "Mohamed Ahmed",
            role_ar: "قائد فريق الهندسة",
            role_en: "Engineering Team Leader",
            role_fr: "Chef d'équipe ingénierie",
            specialty_en: "Full Stack Development",
            rating: 5,
            isLeader: true,
            photo: "image/team/mohamed.jpg"
        },
        {
            name_ar: "حسن",
            name_en: "Hassan",
            name_fr: "Hassan",
            role_ar: "مهندس برمجيات",
            role_en: "Software Engineer",
            role_fr: "Ingénieur logiciel",
            specialty_en: "Backend Development",
            rating: 4.5,
            isLeader: false,
            photo: "image/team/hassan.jpg"
        },
        {
            name_ar: "عبد الوهاب",
            name_en: "Abdelwahab",
            name_fr: "Abdelwahab",
            role_ar: "مهندس برمجيات",
            role_en: "Software Engineer",
            role_fr: "Ingénieur logiciel",
            specialty_en: "Frontend Development",
            rating: 4.6,
            isLeader: false,
            photo: "image/team/abdelwahab.jpg"
        },
        {
            name_ar: "هبة",
            name_en: "Heba",
            name_fr: "Heba",
            role_ar: "مهندسة برمجيات",
            role_en: "Software Engineer",
            role_fr: "Ingénieure logiciel",
            specialty_en: "Database Architecture",
            rating: 4.3,
            isLeader: false,
            photo: "image/team/heba.jpg"
        },
        {
            name_ar: "سما",
            name_en: "Sama",
            name_fr: "Sama",
            role_ar: "مهندسة برمجيات",
            role_en: "Software Engineer",
            role_fr: "Ingénieure logiciel",
            specialty_en: "UI/UX Design",
            rating: 4.3,
            isLeader: false,
            photo: "image/team/sama.jpg"
        },
        {
            name_ar: "نورهان",
            name_en: "Norhan",
            name_fr: "Norhan",
            role_ar: "مهندسة برمجيات",
            role_en: "Software Engineer",
            role_fr: "Ingénieure logiciel",
            specialty_en: "QA Testing",
            rating: 4.3,
            isLeader: false,
            photo: "image/team/norhan.jpg"
        }
    ];

    window.VALUE_DATA = [
        { icon: "fa-bolt", title_ar: "سرعة الوصول", title_en: "Fast Access", title_fr: "Accès rapide", desc_ar: "نوصّلك بأفضل الحرفيين في أقل وقت.", desc_en: "We connect you with top craftsmen quickly.", desc_fr: "Nous vous mettons en relation rapidement avec les meilleurs artisans." },
        { icon: "fa-star", title_ar: "تقييمات حقيقية", title_en: "Real Ratings", title_fr: "Avis authentiques", desc_ar: "تقييمات من عملاء سبق لهم التجربة.", desc_en: "Ratings from customers who used the service.", desc_fr: "Évaluations issues de clients réels." },
        { icon: "fa-shield-alt", title_ar: "حماية وثقة", title_en: "Trust & Safety", title_fr: "Confiance et sécurité", desc_ar: "معايير وضوابط لحماية العميل وجودة الخدمة.", desc_en: "Standards that protect customers and service quality.", desc_fr: "Des standards pour protéger les clients et la qualité." },
        { icon: "fa-hand-holding-usd", title_ar: "أسعار شفافة", title_en: "Transparent Pricing", title_fr: "Tarifs transparents", desc_ar: "وضوح في التسعير قبل بدء العمل.", desc_en: "Clear pricing before work begins.", desc_fr: "Des prix clairs avant le début des travaux." }
    ];

    window.CUSTOMER_PROBLEMS = {
        ar: ["الخوف من الاحتيال أو النصب", "عدم وضوح الأسعار قبل تنفيذ الخدمة", "تأخر وصول الفني", "ضعف التواصل", "صعوبة شرح المشكلة عبر الهاتف", "عدم وجود تقييمات موثوقة", "صعوبة إيجاد حرفي موثوق", "الأسعار المرتفعة بدون ضمان الجودة"],
        en: ["Fear of fraud or scams", "Unclear pricing before service", "Late technician arrival", "Poor communication", "Hard to explain issues by phone", "Lack of reliable ratings", "Hard to find a trusted craftsman", "High prices without quality guarantees"],
        fr: ["Peur d'arnaques", "Prix peu clairs avant intervention", "Retard du technicien", "Mauvaise communication", "Difficulté à expliquer le problème", "Manque d'avis fiables", "Difficulté à trouver un artisan fiable", "Prix élevés sans garantie qualité"]
    };

    window.WORKER_PROBLEMS = {
        ar: ["صعوبة الوصول للعملاء", "عدم وجود دخل ثابت", "قلة فرص العمل", "عدم وجود منصة تعرض مهاراتهم", "انعدام الثقة من العملاء", "التسويق المكلف", "المنافسة غير العادلة"],
        en: ["Hard to reach customers", "Unstable income", "Limited job opportunities", "No platform to showcase skills", "Low customer trust", "Expensive marketing", "Unfair competition"],
        fr: ["Difficulté à trouver des clients", "Revenu instable", "Peu d'opportunités", "Pas de vitrine pour les compétences", "Manque de confiance", "Marketing coûteux", "Concurrence déloyale"]
    };

    window.PLATFORM_SOLUTIONS = {
        ar: ["توصيل العميل بأفضل فني بسرعة", "تقييمات حقيقية للفنيين", "سهولة طلب الخدمة", "تنظيم سوق الحرفيين", "تقليل الاحتيال", "أسعار شفافة", "دعم فني على مدار الساعة"],
        en: ["Fast matching with skilled workers", "Real ratings for technicians", "Simple service requests", "A more organized marketplace", "Less fraud risk", "Transparent pricing", "24/7 support"],
        fr: ["Mise en relation rapide avec des pros", "Avis réels sur les techniciens", "Demande de service simple", "Marché plus structuré", "Moins de risques de fraude", "Prix transparents", "Support 24h/24"]
    };
})();

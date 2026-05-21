﻿const allowed_users = {
  svetlana: {
    user_key: "svetlana",
    display_name: "Svetlana",
    password: "Wolf&Luna",
  },
  diab: {
    user_key: "diab",
    display_name: "Diab",
    password: "Wolf&Luna",
  },
};

const relationship_start_date = "2025-01-18";
const diab_birthdate = "2000-03-23";
const svetlana_birthdate = "1991-08-29";
const hidden_deleted_message_storage_prefix = "sveta_hidden_deleted_messages";
const memory_storage_key = "svetlana_diab_memories";
const event_storage_key = "svetlana_diab_events";
const theme_storage_key = "svetlana_diab_theme";
const language_storage_key = "svetlana_diab_language";
const music_toggle_storage_key = "svetlana_diab_music_enabled";
const local_music_storage_prefix = "svetlana_diab_local_music";
const shared_music_storage_key = "svetlana_diab_shared_music_tracks";
const cycle_storage_key = "svetlana_diab_cycle_data";
const cycle_panel_open_storage_key = "svetlana_diab_cycle_panel_open";
const presence_visibility_storage_prefix = "svetlana_diab_presence_visible";
const presence_seen_storage_prefix = "svetlana_diab_presence_seen";
const presence_state_storage_prefix = "svetlana_diab_presence_state";
const daily_content_history_storage_prefix = "svetlana_diab_daily_content_history";
const biometric_last_password_key = "svetlana_diab_biometric_last_password_at";
const biometric_opt_in_storage_key = "svetlana_diab_biometric_opt_in";
const background_sync_server_key = "svetlana-diab-happiness-space";
const backup_storage_key = "svetlana_diab_backup_config";
const emoji_usage_storage_key = "svetlana_diab_emoji_usage";
const supabase_room_slug_default = "svetlana-diab";
const supabase_table_names = {
  profiles: "app_profiles",
  memories: "app_memories",
  events: "app_events",
  live_messages: "app_live_messages",
  cycle_states: "app_cycle_states",
  media_files: "app_media_files",
};
const supabase_media_bucket_name = "app-media";

const language_cycle = ["en", "de", "ar"];
const language_config = {
  en: {
    label: "EN",
    flag_path: "assets/flags/us.svg",
    alt: "English",
  },
  de: {
    label: "DE",
    flag_path: "assets/flags/de.svg",
    alt: "Deutsch",
  },
  ar: {
    label: "AR",
    flag_path: "assets/flags/eg.svg",
    alt: "العربية",
  },
};

const heart_emoji = "\u2764\uFE0F";
const kiss_heart_emoji = "\u{1F618}\u2764\uFE0F";
const deleted_live_message_marker = "__SVETA_APP_DELETED__";
const presence_live_message_marker = "__SVETA_APP_PRESENCE__";
const cycle_state_live_message_marker = "__SVETA_APP_CYCLE_STATE__";
const shared_music_live_message_marker = "__SVETA_APP_SHARED_MUSIC__";
const shared_activity_live_message_marker = "__SVETA_APP_SHARED_ACTIVITY__";
const cycle_support_messages = [
  "Girl, is it your headache days already? Are you fine, or should I help you bury somebody today.",
  "If the world is being annoying, hand it to me. I can be dramatic for both of us.",
  "If you need to cry, complain, hide, laugh, or order peace and snacks, I am already on your side.",
  "You are allowed to be soft, moody, tired, or fierce today. I am still here loving all of you.",
  "Today feels like one of those days when the universe should speak quietly and bring you comfort first.",
  "If today is one of those dangerous little mood days, just point at the problem and I will already be offended with you.",
  "If you want to cry, we can cry. If you want to laugh, I am ready. If you want to disappear under a blanket, I support the plan.",
  "Official report: your comfort matters more than productivity today. I vote for softness, snacks, and zero nonsense.",
  "If your patience is tiny today, that is fine. I can be patient enough for both of us until the storm passes.",
  "Tell me whether you need quiet, sweetness, ridiculous jokes, or a dramatic partner in crime. I can do all four.",
];
const cycle_music_window_days = 2;
const cycle_support_burst_emojis = ["😜", "😋", "😄", "😂", "🥳", "😇"];
const hero_firework_emojis = [
  "🧡",
  "🩷",
  "🥰",
  "😘",
  "💕",
  "💗",
  "💖",
  "❤️",
];
const night_tale_magic_emojis = ["✨", "🪄", "💫"];
const empty_sound_manifest = Object.freeze({
  background_music: [],
  welcome: [],
  logout: [],
  message_send: [],
  message_receive: [],
});
const local_sound_manifest_fallback = Object.freeze({
  background_music: [
    "sound/Aeris - Moving Mountains (freetouse.com).mp3",
    "sound/Alegend - Dawn (freetouse.com).mp3",
    "sound/Calima - Glass Shop (freetouse.com).mp3",
    "sound/Moavii - We Are (freetouse.com).mp3",
    "sound/Piki - Momo Island (freetouse.com).mp3",
    "sound/Pufino - Glamorous (freetouse.com).mp3",
    "sound/Pufino - Thoughtful (freetouse.com).mp3",
  ].map((sound_path) => encodeURI(sound_path)),
  welcome: ["assets/intro.wav"],
  logout: [],
  message_send: [],
  message_receive: [],
});
const birthday_celebration_messages = {
  en: {
    diab: [
      "Happy birthday, Diab. May this year treat your heart gently, keep your courage bright, and return to you every bit of goodness you try to give.",
    ],
    svetlana: [
      "Happy birthday, my beautiful Svetlana. I feel lucky that this world holds you, and even luckier that my life gets to know your light. You bring warmth, tenderness, and a rare kind of happiness to the people and places around you. I hope today wraps you in celebration, gives you soft moments to remember, and opens a year full of peace, laughter, health, and everything your heart has quietly been wishing for.",
      "Happy birthday, my wonderful Svetlana. You brighten rooms, calm storms, and make life feel kinder just by being in it. I hope today reminds you how deeply loved you are, how much beauty you carry into other people's lives, and how grateful I am that you exist. May this new year of your life bring you joy that stays, success that feels light, and tenderness that always finds its way back to you.",
    ],
  },
  de: {
    diab: [
      "Alles Gute zum Geburtstag, Diab. Möge dieses Jahr sanft mit deinem Herzen umgehen, deinen Mut hell halten und dir all das Gute zurückbringen, das du gibst.",
    ],
    svetlana: [
      "Alles Gute zum Geburtstag, meine wunderschöne Svetlana. Ich fühle mich glücklich, dass diese Welt dich hat, und noch glücklicher, dass mein Leben dein Licht kennen darf. Du bringst Wärme, Zärtlichkeit und eine seltene Art von Freude in Menschen und Orte um dich herum. Ich hoffe, dieser Tag hüllt dich in Feierlichkeit und öffnet dir ein Jahr voller Frieden, Lachen, Gesundheit und all der schönen Dinge, die dein Herz leise ersehnt.",
      "Alles Gute zum Geburtstag, meine wunderbare Svetlana. Du machst Räume heller, Stürme ruhiger und das Leben sanfter, einfach weil du darin bist. Ich hoffe, dieser Tag erinnert dich daran, wie tief du geliebt wirst, wie viel Schönheit du in andere Leben trägst und wie dankbar ich bin, dass es dich gibt. Möge dein neues Lebensjahr dir bleibende Freude, leichte Erfolge und immer wieder Zärtlichkeit schenken.",
    ],
  },
  ar: {
    diab: [
      "عيد ميلاد سعيد يا دياب. أتمنى أن يكون هذا العام لطيفاً مع قلبك، وأن يبقي شجاعتك مشرقة، وأن يعيد إليك كل الخير الذي تحاول منحه.",
    ],
    svetlana: [
      "عيد ميلاد سعيد يا سفيتلانا الجميلة. أنا محظوظ لأن هذا العالم فيه أنتِ، وأكثر حظاً لأن حياتي عرفت نورك. أنتِ تنشرين الدفء واللطف ونوعاً نادراً من السعادة في كل من حولك. أتمنى أن يحتضنك هذا اليوم بالفرح، وأن يفتح لك سنة مليئة بالسلام والضحك والصحة وكل ما يتمناه قلبك بصمت.",
      "عيد ميلاد سعيد يا سفيتلانا الرائعة. أنتِ تجعلين الأماكن أدفأ، والقلوب أهدأ، والحياة ألطف فقط لأنك فيها. أتمنى أن يذكرك هذا اليوم بكم أنتِ محبوبة، وبكم من جمال تضعينه في حياة الآخرين، وبكم أنا ممتن لوجودك. أتمنى لك سنة جديدة مليئة بفرح يدوم، ونجاح خفيف، وحنان يعود إليك دائماً.",
    ],
  },
};
const birthday_prefill_messages = {
  en: {
    diab: "Happy birthday, Diab. I hope this year holds peace, laughter, and beautiful moments for you.",
    svetlana:
      "Happy birthday, my beautiful Svetlana. I feel lucky to have you in my life, and I hope this year brings you joy, peace, laughter, and every beautiful thing your heart deserves.",
  },
  de: {
    diab: "Alles Gute zum Geburtstag, Diab. Ich hoffe, dieses Jahr bringt dir Frieden, Lachen und schöne Momente.",
    svetlana:
      "Alles Gute zum Geburtstag, meine wunderschöne Svetlana. Ich bin glücklich, dich in meinem Leben zu haben, und ich hoffe, dieses Jahr bringt dir Freude, Frieden, Lachen und all die schönen Dinge, die dein Herz verdient.",
  },
  ar: {
    diab: "عيد ميلاد سعيد يا دياب. أتمنى أن تحمل لك هذه السنة سلاماً وضحكاً ولحظات جميلة.",
    svetlana:
      "عيد ميلاد سعيد يا سفيتلانا الجميلة. أنا محظوظ بوجودك في حياتي، وأتمنى أن تحمل لك هذه السنة فرحاً وسلاماً وضحكاً وكل شيء جميل يستحقه قلبك.",
  },
};

const fallback_daily_joy_messages = [
  "Today feels like one of those days when coffee tries its best, but one good laugh still does the real work.",
  "Tiny prank idea: send one dramatic message saying, 'We need to talk.' Then confess that the topic is how unfairly beautiful life feels when she is in it.",
  "A quiet emergency has been reported: one adult tried to stay serious all morning and then lost completely to one soft memory.",
  "Today's official prank: act mysterious for exactly twelve seconds, then reveal the secret is that somebody deserves a forehead kiss and a snack.",
  "Breaking news: productivity applied for a leadership role today, but laughter arrived better dressed and won the room immediately.",
  "Tiny mission for today: make one ordinary moment suspiciously cute, then deny all responsibility with a very innocent face.",
  "The day's dramatic report says everything is under control, which is how we know the comedy is about to begin.",
  "If the day gets too serious, please remind it that we have a private department for nonsense, warmth, and badly timed giggles.",
];

const fallback_daily_joy_messages_de = [
  "Heute ist so ein Tag, an dem der Kaffee alles versucht, aber ein einziges echtes Lachen trotzdem die bessere Arbeit macht.",
  "Kleine Streichidee: Schreib ganz dramatisch, 'Wir müssen reden.' Und gesteh dann, dass es nur darum geht, wie unfair schön das Leben mit ihr darin ist.",
  "Es wurde ein leiser Notfall gemeldet: Ein erwachsener Mensch wollte den ganzen Morgen ernst bleiben und verlor dann komplett gegen eine einzige sanfte Erinnerung.",
];

const fallback_daily_joy_messages_ar = [
  "يبدو أن اليوم من تلك الأيام التي يحاول فيها القهوة أن تنقذ الموقف، لكن ضحكة واحدة جميلة تقوم بالمهمة الحقيقية.",
  "فكرة مقلب صغيرة: أرسل رسالة درامية تقول فيها: نحتاج أن نتحدث. ثم اعترف أن الموضوع فقط هو كم تصبح الحياة أجمل حين تكون هي فيها.",
  "تم تسجيل حالة طوارئ هادئة: شخص بالغ حاول أن يبقى جاداً طوال الصباح، ثم خسر المعركة أمام ذكرى لطيفة واحدة.",
];

const fallback_daily_love_messages = [
  `Svetlana, you are not only the love in my heart. You are also my closest friend, my quiet, and the person who makes life feel more worth living every single day. ${heart_emoji}`,
  `There are people you care about, and then there is the one who becomes home to your soul. For me, that will always be you. ${heart_emoji}`,
  `If I ever sound too full when I speak to you, it is only because my heart has never learned how to love you in small amounts. ${heart_emoji}`,
];

const fallback_daily_love_messages_de = [
  `Svetlana, du bist nicht nur die Liebe in meinem Herzen. Du bist auch meine beste Freundin, meine Ruhe und der Mensch, der das Leben jeden Tag lebenswerter macht. ${heart_emoji}`,
  `Es gibt Menschen, die man liebt, und dann gibt es den einen Menschen, der zur Heimat der Seele wird. Fأ¼r mich wirst das immer du sein. ${heart_emoji}`,
  `Wenn ich bei dir manchmal zu voll klinge, dann nur deshalb, weil mein Herz nie gelernt hat, dich in kleinen Mengen zu lieben. ${heart_emoji}`,
];

const fallback_daily_love_messages_ar = [
  `سفيتلانا، أنتِ لستِ فقط الحب في قلبي، أنتِ أيضاً أقرب صديقة لي، وراحتي، والشخص الذي يجعل الحياة أجمل كل يوم. ${heart_emoji}`,
  `هناك أشخاص نحبهم، ثم هناك الشخص الذي يصبح وطناً للروح. بالنسبة لي، ستكونين أنتِ دائماً ذلك الوطن. ${heart_emoji}`,
  `إذا بدا كلامي معك ممتلئاً أكثر من اللازم، فذلك فقط لأن قلبي لم يتعلم أبداً كيف يحبك بنصف شعور. ${heart_emoji}`,
];

const fallback_morning_messages = [
  "Good morning, my beautiful queen Svetlana.\nIt is me, your Diab.\nI wanted your day to begin with warmth, not noise, and with love, not pressure.\nWalk into today knowing that you are deeply valued, deeply admired, and deeply loved by me.\nPlease take care of yourself today, eat well, drink enough, and be gentle with your heart.\nI hope today meets you with ease and leaves you smiling.",
  "Good morning, my angel.\nBefore the day gets busy, I want you to remember one simple truth: you matter to me more than I can ever fully explain.\nI hope your steps are light today, your luck is kind, and your heart finds small beautiful moments everywhere.\nTake care of yourself for me, my precious girl.",
];

const fallback_morning_messages_de = [
  "Guten Morgen, meine wunderschöne Königin Svetlana.\nHier ist dein Diab.\nIch wollte, dass dein Tag mit Wärme beginnt, nicht mit Lärm, und mit Liebe, nicht mit Druck.\nGeh in diesen Tag mit dem Wissen, dass du von mir tief geschätzt, tief bewundert und tief geliebt wirst.\nBitte pass heute gut auf dich auf, iss ordentlich, trink genug und sei sanft zu deinem Herzen.\nIch hoffe, heute begegnet dir alles freundlich und schenkt dir ein echtes Lächeln.",
  "Guten Morgen, mein Engel.\nBevor der Tag hektisch wird, möchte ich, dass du eine einfache Wahrheit behältst: Du bedeutest mir mehr, als ich je ganz erklären könnte.\nIch hoffe, deine Schritte sind heute leicht, dein Glück ist freundlich, und dein Herz findet überall kleine schöne Momente.\nPass gut auf dich auf, meine Kostbare.",
];

const fallback_morning_messages_ar = [
  "صباح الخير يا ملكتي الجميلة سفيتلانا.\nإنه أنا، ديابك.\nأردت أن يبدأ يومك بدفء، لا بضجيج، وبحب، لا بضغط.\nادخلي يومك وأنتِ تعرفين أنكِ ثمينة عندي جداً، ومحل إعجاب كبير، ومحبوبة بعمق.\nأرجوكِ اعتني بنفسك اليوم، كلي جيداً، واشربي ما يكفي، وكوني لطيفة مع قلبك.\nأتمنى أن يلقاكِ اليوم بلطف ويترك فيكِ ابتسامة حقيقية.",
  "صباح الخير يا ملاكي.\nقبل أن ينشغل اليوم، أريدكِ أن تتذكري حقيقة بسيطة: أنتِ تعنين لي أكثر مما أستطيع وصفه بالكامل.\nأتمنى أن تكون خطواتكِ اليوم خفيفة، وحظكِ لطيفاً، وأن يجد قلبكِ لحظات جميلة صغيرة في كل مكان.\nاعتني بنفسكِ من أجلي يا أغلى ما عندي.",
];

const fallback_night_messages = [
  `Good night, my star Svetlana.\nI hope this night holds you softly and gives you the calm rest your heart deserves.\nIf I could be there, I would stay close, hold you gently, kiss your cheeks, and wait with you until sleep became peaceful.\nSleep in peace, my love. ${kiss_heart_emoji}`,
  `Good night, my beautiful queen.\nMaybe I say too much sometimes, but that is only because I feel too much when it comes to you.\nClose your eyes and imagine me there, near you, watching over your peace and making sure nothing disturbs your dreams.\nSweet dreams, my angel. ${kiss_heart_emoji}`,
];

const fallback_night_messages_de = [
  `Gute Nacht, mein Stern Svetlana.\nIch hoffe, diese Nacht hält dich sanft und schenkt dir die ruhige Erholung, die dein Herz verdient.\nWenn ich bei dir sein könnte, würde ich nah bleiben, dich vorsichtig halten, deine Wangen küssen und bei dir warten, bis der Schlaf friedlich wird.\nSchlaf in Frieden, meine Liebe. ${kiss_heart_emoji}`,
  `Gute Nacht, meine wunderschöne Königin.\nVielleicht sage ich manchmal zu viel, aber nur, weil ich bei dir zu viel fühle, um still zu bleiben.\nSchließ deine Augen und stell dir vor, ich wäre bei dir, ganz nah, und würde über deinen Frieden wachen, damit nichts deine Träume stört.\nSüße Träume, mein Engel. ${kiss_heart_emoji}`,
];

const fallback_night_messages_ar = [
  `تصبحين على خير يا نجمتي سفيتلانا.\nأتمنى أن تحتويكِ هذه الليلة بلطف، وأن تمنحكِ الراحة الهادئة التي يستحقها قلبكِ.\nلو كنتُ بقربكِ الآن، لبقيت قريباً، أضمكِ برفق، وأقبل خديكِ، وأنتظر معكِ حتى يصبح النوم سلاماً.\nنامي بسلام يا حبيبتي. ${kiss_heart_emoji}`,
  `تصبحين على خير يا ملكتي الجميلة.\nربما أقول الكثير أحياناً، لكن هذا فقط لأنني أشعر بالكثير حين يتعلق الأمر بكِ.\nأغلقي عينيكِ وتخيلي أنني هناك قربكِ، أحرس راحتكِ وأتأكد أن لا شيء يزعج أحلامكِ.\nأحلاماً سعيدة يا ملاكي. ${kiss_heart_emoji}`,
];

const fallback_night_tales = [
  "Once upon a time, in a street where every house slept early, there lived a tailor who could fix any torn coat but could never mend his own missing buttons. One night he met a pianist who played beautifully but always started one note too late. They became friends at once, because each one made the other laugh before either could feel embarrassed. From then on, the coats looked better, the songs began on time, and the whole street learned that being gently understood can feel like magic.",
  "Once upon a time, a bookseller had a sign that read, 'Closed for five minutes,' but everyone knew those five minutes often lasted an hour. One evening a woman walked in, pointed to the sign, and said, 'I came to see whether time behaves better indoors.' The bookseller laughed so hard he forgot to be shy, and they spent the rest of the night discussing the difference between lateness and style. By midnight, even the clock seemed less strict.",
  "In a town beside a quiet river, a baker made moon-shaped bread for anyone who could not sleep. One night a traveler arrived too tired to explain her sadness, so the baker gave her the warmest piece and sat beside her without asking for a performance. By morning, nothing had been magically solved, but the world felt possible again, which was the kind of miracle both of them trusted.",
  "There was once a tiny cinema that showed only memories people had almost forgotten. A man bought one ticket and expected a sad film, but the screen filled with a laugh he had once shared under rain. Someone beside him laughed at the same moment. They left together under the same umbrella, both pretending the weather had arranged it by accident.",
  "Far above the city, a tired little star kept blinking at the wrong rhythm. The moon sent a cloud to ask what was wrong, and the star admitted it was lonely from trying to shine perfectly. The cloud stayed nearby all night, making silly shapes until the star forgot to be embarrassed. After that, the sky looked softer whenever both of them were there.",
  "A florist once kept a secret shelf for flowers that bloomed in inconvenient colors. Nobody bought them until a woman came in and said, 'Those are exactly my kind of impossible.' The florist smiled, wrapped them carefully, and added one extra stem for courage. The flowers lasted longer than expected, mostly because they had finally been understood.",
  "In a sleepy train station, the last train refused to leave because its conductor had misplaced his confidence. A passenger offered him half a chocolate bar and said, 'Start slowly. The tracks already know the way.' The train moved, the conductor laughed, and every window carried a little more hope into the dark.",
];

const fallback_night_tales_de = [
  "Es war einmal in einer Straße, in der jedes Haus früh einschlief, ein Schneider, der jeden zerrissenen Mantel retten konnte, aber nie seine eigenen fehlenden Knöpfe fand. Eines Abends traf er eine Pianistin, die wunderschön spielte, aber immer genau einen Ton zu spät begann. Sie wurden sofort Freunde, weil jeder den anderen zum Lachen brachte, bevor einer sich schämen konnte. Von da an sahen die Mäntel besser aus, die Lieder begannen pünktlich, und die ganze Straße lernte, dass sanft verstanden zu werden etwas Magisches hat.",
  "Es war einmal ein Buchhändler mit einem Schild, auf dem stand: 'Für fünf Minuten geschlossen', obwohl jeder wusste, dass diese fünf Minuten oft eine ganze Stunde dauerten. Eines Abends kam eine Frau herein, zeigte auf das Schild und sagte: 'Ich wollte sehen, ob die Zeit sich drinnen besser benimmt.' Der Buchhändler lachte so sehr, dass er vergaß, schüchtern zu sein, und sie verbrachten den Rest der Nacht damit, über den Unterschied zwischen Verspätung und Stil zu sprechen. Gegen Mitternacht war selbst die Uhr milder geworden.",
];

const fallback_night_tales_ar = [
  "كان يا ما كان، في شارع تنام فيه البيوت مبكراً، خياط يستطيع إصلاح أي معطف ممزق، لكنه لا يجد أبداً أزرار معطفه هو. وفي ليلة هادئة، التقى بعازفة بيانو تعزف بجمال، لكنها تبدأ دائماً بعد الموعد بنغمة واحدة. صارا صديقين فوراً، لأن كل واحد منهما كان يجعل الآخر يضحك قبل أن يشعر بالحرج. ومنذ ذلك اليوم بدت المعاطف أجمل، وبدأت الألحان في وقتها، وتعلم الشارع كله أن من يفهمك بلطف يشبه السحر.",
  "كان يا ما كان، بائع كتب يضع على بابه لافتة تقول: 'مغلق لخمس دقائق'، بينما يعرف الجميع أن تلك الدقائق الخمس قد تصبح ساعة كاملة. وفي مساء لطيف دخلت امرأة، أشارت إلى اللافتة، وقالت: 'جئت لأرى إن كان الوقت يتصرف بشكل أفضل في الداخل.' ضحك بائع الكتب حتى نسي أن يكون خجولاً، وقضيا بقية الليل يتحدثان عن الفرق بين التأخر والأناقة. وحتى الساعة عند منتصف الليل بدت أقل صرامة.",
];

const translations = {
  en: {
    document_language: "en",
    locale: "en-US",
    language_switch_hint: "Change language",
    login_eyebrow: "our private place",
    login_copy: "A little door made only for two hearts.",
    username_label: "Name",
    password_label: "Secret word",
    username_placeholder: "Svetlana",
    password_placeholder: "Our secret",
    login_email_hint_empty:
      "The reset email will appear here once the name is known.",
    login_email_hint: (email) => `Reset email: ${email}`,
    forgot_password_button: "Forgot password?",
    forgot_password_username_missing:
      "Write the same name first so I know which email should receive the reset link.",
    forgot_password_sent_generic: "The reset email was sent.",
    forgot_password_sent: (email) => `A reset email was sent to ${email}.`,
    forgot_password_error: "The reset email could not be sent right now.",
    login_button: "Enter our world",
    login_error:
      "This little world opens only with the right name and secret word.",
    welcome_kicker: "hello, beautiful soul",
    enter_home_button: "Enter and keep smiling",
    header_eyebrow: "only ours",
    dark_theme_button: "Dark theme",
    light_theme_button: "Light theme",
    theme_light_short: "Light",
    theme_dark_short: "Dark",
    logout_button: "Leave softly",
    hero_eyebrow: "a place for us",
    hero_heading: "Every day with you becomes part of the story.",
    hero_message_svetlana:
      "This little world is here to greet you softly, hold your memories, and give you a warm smile whenever you open it.",
    hero_message_diab:
      "A private home for the woman you love, the memories you keep, and the life you are building together.",
    today_prank_heading: "A little laugh for today",
    night_tale_eyebrow: "for the quiet hours",
    night_tale_heading: "A night tale for you",
    time_eyebrow: "our time",
    time_heading: "How Long the Heart Remembers",
    days_label: "Days since we found each other",
    days_note: "since January 18, 2025",
    years_label: "The shape of our time",
    years_note: "counted with care",
    diab_age_label: "Diab's age",
    diab_age_note: "born March 23, 2000",
    svetlana_age_label: "Svetlana's age",
    svetlana_age_note: "born August 29, 1991",
    diab_birthday_label: "Diab's next birthday",
    svetlana_birthday_label: "Svetlana's next birthday",
    diab_birthday_message: (days) =>
      `${days} days until the next happy birthday I'll have while you're in my life.`,
    svetlana_birthday_message: (days) =>
      `${days} days until Svetlana's next beautiful birthday.`,
    gallery_eyebrow: "photos and smiles",
    gallery_heading: "Memory Gallery",
    add_memory: "Add a memory",
    events_eyebrow: "our little forever",
    events_heading: "Beautiful Days",
    add_event: "Add a day",
    live_messages_eyebrow: "just us, in real time",
    live_messages_heading: "Live Messages",
    live_messages_empty: "Your private chat will appear here.",
    cycle_eyebrow: "For Your Comfort My Angel",
    cycle_heading: "Cycle Calendar",
    cycle_settings: "Adjust",
    cycle_start_today: "Starting Day",
    cycle_end_today: "Ending Day",
    cycle_write_feeling: "Write feeling",
    cycle_day_of_period: (day) => `Period Day ${day}`,
    cycle_starts_in: (days) => `Period starts in ${days} days`,
    cycle_active_now: "Cycle days are here",
    cycle_summary: (cycle_days, period_days) =>
      `Cycle ${cycle_days} days total - period ${period_days} days`,
    cycle_period_legend: "Period",
    cycle_predicted_legend: "Predicted period",
    cycle_fertile_legend: "Fertile window",
    cycle_ovulation_legend: "Ovulation",
    cycle_today_label: "Today",
    cycle_feeling_title: "How are you feeling today?",
    cycle_feeling_placeholder: "Write whatever today feels like...",
    cycle_feeling_save: "Save feeling",
    cycle_settings_title: "Cycle settings",
    cycle_length_label: "Typical cycle length",
    cycle_duration_label: "Typical period length",
    cycle_settings_save: "Save cycle",
    cycle_note_saved: "Feeling saved for today.",
    cycle_add_note: "Add Note",
    cycle_set_start: "Period start",
    cycle_set_end: "Period end",
    cycle_set_ovulation: "Set As Ovulation",
    cycle_remove_entry: "Remove Entry",
    cycle_state_period: "Period",
    cycle_state_predicted: "Predicted",
    cycle_state_fertile: "Fertile Window",
    cycle_state_ovulation: "Ovulation",
    cycle_state_normal: "Open day",
    cycle_state_today: "Today",
    cycle_discard_changes: "Discard changes?",
    cycle_discard_copy: "You have unsaved cycle changes.",
    cycle_discard: "Discard",
    cycle_overlap_title: "This overlaps an existing cycle.",
    cycle_overlap_replace: "Replace the existing cycle?",
    cycle_overlap_merge: "Merge this date into the existing cycle instead?",
    cycle_end_before_start: "End date cannot be before start date.",
    cycle_future_date_error: "Future dates cannot be confirmed yet.",
    cycle_duplicate_tap_error: "That day was already applied.",
    cycle_removed: "Cycle entry removed.",
    cycle_note_empty: "No note yet for this day.",
    cycle_generated_warning: "Cycle may start in about 2 days.",
    cycle_generated_day_one: "Cycle started today.",
    cycle_generated_day_n: (day) => `Day ${day} of the cycle.`,
    cycle_generated_day_two: "Second day of cycle.",
    cycle_support_soft_suffix: `Take it gently, my love. I'm with you. ${heart_emoji}`,
    cycle_support_day_suffix: `Be soft with yourself today. I'm right here. ${heart_emoji}`,
    cycle_support_warning_suffix: `Please slow down a little this week and let yourself be cared for. ${heart_emoji}`,
    backup_eyebrow: "photos and archives",
    backup_heading: "OneDrive Archive Map",
    backup_copy:
      "Put your OneDrive folder path or shared link here and keep this as the home for your photo archives and exports.",
    backup_input_label: "OneDrive path or link",
    backup_input_placeholder:
      "https://onedrive.live.com/... or OneDrive/MyLoveArchive",
    backup_save: "Save archive path",
    backup_export_all: "Export all",
    backup_export_memories: "Export memories",
    backup_export_events: "Export days",
    backup_export_messages: "Export messages",
    backup_export_cycle: "Export cycle",
    backup_map_gallery: "photos/gallery/",
    backup_map_messages: "archives/messages/",
    backup_map_events: "archives/days/",
    backup_map_cycle: "archives/cycle/",
    backup_map_exports: "exports/",
    mention: "Mention",
    mention_search_empty: "No memory or beautiful day matches this search yet.",
    mention_type_memory: "Memory",
    mention_type_day: "Day",
    replying_to: (name) => `Replying to ${name}`,
    mentioning_memory: "Mentioning memory",
    mentioning_day: "Mentioning beautiful day",
    clear_context: "Clear",
    cancel_action: "Cancel",
    reply_preview: "Reply",
    mention_preview: "Mention",
    image_viewer_close: "Close image",
    live_message_placeholder: "Send message....",
    live_message_add_files: "Add files",
    live_message_send: "Send now",
    live_message_update: "Save edit",
    emoji_button_label: "Open emoji picker",
    live_message_files_selected: "selected",
    live_message_from_you: "You",
    live_message_from_svetlana: "Svetlana",
    live_message_from_diab: "Diab",
    live_message_edited: "Edited",
    live_message_edited_at: (date_text) => `Edited ${date_text}`,
    live_message_deleted: "Deleted",
    live_message_delete_local: "Delete",
    live_message_send_error: "The message could not be sent right now.",
    live_message_edit_prompt: "Edit your message",
    live_message_delete_confirm: "Delete this message?",
    made_with_love: "Made with Love By Diab",
    love_note_eyebrow: "from Diab's heart",
    morning_message_heading: "your morning from Diab",
    night_message_heading: "for your night, my love",
    password_recovery_title: "Choose a new secret word",
    password_recovery_copy:
      "The reset link is ready. Set a new secret word here.",
    new_password_label: "New password",
    confirm_password_label: "Confirm password",
    new_password_placeholder: "New secret word",
    confirm_password_placeholder: "Write it again",
    password_recovery_save: "Save new password",
    password_recovery_mismatch: "The two password lines need to match.",
    password_recovery_success:
      "Your password is updated. You can sign in with the new secret word now.",
    password_recovery_error: "The password could not be updated right now.",
    memory_dialog_add: "Add a memory",
    memory_dialog_edit: "Edit this memory",
    event_dialog_add: "Add a beautiful day",
    event_dialog_edit: "Edit this beautiful day",
    title_label: "Title",
    date_label: "Date",
    note_label: "Little note",
    picture_label: "Picture",
    event_description_label: "What happened",
    memory_title_placeholder: "A smile I want to keep",
    memory_note_placeholder: "Write the feeling here",
    event_title_placeholder: "The day we laughed for no reason",
    event_description_placeholder: "Keep the memory alive",
    save_memory: "Save memory",
    update_memory: "Update memory",
    save_event: "Save day",
    update_event: "Update day",
    image_replace_hint:
      "Choose a new picture only if you want to replace the current one.",
    edit: "Edit",
    delete: "Delete",
    close_dialog_label: "Close",
    delete_memory_confirm: "Delete this memory?",
    delete_event_confirm: "Delete this day?",
    fallback_memory_date: "A day worth keeping",
    fallback_event_date: "A beautiful day",
    default_memory_one_title: "First golden frame",
    default_memory_one_date: "Waiting for a smile",
    default_memory_one_note: "The first photo you add will live here.",
    default_memory_two_title: "A soft little memory",
    default_memory_two_date: "Any beautiful day",
    default_memory_two_note:
      "A place for a picture, a sentence, and the feeling around it.",
    default_memory_three_title: "The next favorite moment",
    default_memory_three_date: "Soon, naturally",
    default_memory_three_note:
      "Ready whenever a day becomes too sweet to forget.",
    first_event_date: "January 18, 2025",
    first_event_title: "The day we found each other",
    first_event_description: "The beginning of something rare and beautiful.",
    years: ["year", "years"],
    months: ["month", "months"],
    days: ["day", "days"],
    greetings: {
      svetlana: {
        morning: [
          "Good morning, my angel Svetlana",
          "Guten Morgen, mein Engel Svetlana",
        ],
        afternoon: [
          "Good afternoon, my angel Svetlana",
          "I hope your day is treating you gently.",
        ],
        evening: [
          "Good evening, my angel Svetlana",
          "May the rest of your day feel soft and kind.",
        ],
        night: [
          "Good night, my angel Svetlana",
          "May your heart feel safe and loved tonight.",
        ],
      },
      diab: {
        morning: [
          "Good morning, Diab",
          "A new day in your little world with Svetlana.",
        ],
        afternoon: ["Good afternoon, Diab", "Keep the warmth alive today."],
        evening: [
          "Good evening, Diab",
          "The quiet part of the day belongs here too.",
        ],
        night: ["Good night, Diab", "Another day held close in the heart."],
      },
    },
  },
  de: {
    document_language: "de",
    locale: "de-DE",
    language_switch_hint: "Sprache wechseln",
    login_eyebrow: "unser privater Ort",
    login_copy: "Eine kleine Tür, gemacht nur für zwei Herzen.",
    username_label: "Name",
    password_label: "Geheimwort",
    username_placeholder: "Svetlana",
    password_placeholder: "Unser Geheimnis",
    login_email_hint_empty:
      "Die Reset-E-Mail erscheint hier, sobald der Name bekannt ist.",
    login_email_hint: (email) => `Reset-E-Mail: ${email}`,
    forgot_password_button: "Passwort vergessen?",
    forgot_password_username_missing:
      "Schreib zuerst denselben Namen, damit ich weiß, an welche E-Mail der Reset-Link gehen soll.",
    forgot_password_sent_generic: "Die Reset-E-Mail wurde gesendet.",
    forgot_password_sent: (email) =>
      `Eine Reset-E-Mail wurde an ${email} gesendet.`,
    forgot_password_error:
      "Die Reset-E-Mail konnte gerade nicht gesendet werden.",
    login_button: "Unsere Welt betreten",
    login_error:
      "Diese kleine Welt öffnet sich nur mit dem richtigen Namen und Geheimwort.",
    welcome_kicker: "hallo, schöne Seele",
    enter_home_button: "Eintreten und weiterlächeln",
    header_eyebrow: "nur unseres",
    dark_theme_button: "Dunkles Design",
    light_theme_button: "Helles Design",
    theme_light_short: "Hell",
    theme_dark_short: "Dunkel",
    logout_button: "Sanft gehen",
    hero_eyebrow: "ein Ort für uns",
    hero_heading: "Jeder Tag mit dir wird Teil der Geschichte.",
    hero_message_svetlana:
      "Diese kleine Welt ist da, um dich sanft zu begrüßen, eure Erinnerungen zu bewahren und dir jedes Mal ein warmes Lächeln zu schenken.",
    hero_message_diab:
      "Ein privates Zuhause für die Frau, die du liebst, für eure Erinnerungen und für das Leben, das ihr zusammen baut.",
    today_prank_heading: "Ein kleines Lachen für heute",
    night_tale_eyebrow: "für die stillen Stunden",
    night_tale_heading: "Eine Nachtgeschichte für dich",
    time_eyebrow: "unsere Zeit",
    time_heading: "Wie lange das Herz sich erinnert",
    days_label: "Tage, seit wir uns gefunden haben",
    days_note: "seit dem 18. Januar 2025",
    years_label: "Die Form unserer Zeit",
    years_note: "mit Sorgfalt gezählt",
    diab_age_label: "Diabs Alter",
    diab_age_note: "geboren am 23. März 2000",
    svetlana_age_label: "Svetlanas Alter",
    svetlana_age_note: "geboren am 29. August 1991",
    diab_birthday_label: "Diabs nächster Geburtstag",
    svetlana_birthday_label: "Svetlanas nächster Geburtstag",
    diab_birthday_message: (days) =>
      `${days} Tage bis zum nächsten glücklichen Geburtstag, den ich haben werde, während du in meinem Leben bist.`,
    svetlana_birthday_message: (days) =>
      `${days} Tage bis zu Svetlanas nächstem wunderschönen Geburtstag.`,
    gallery_eyebrow: "fotos und lächeln",
    gallery_heading: "Erinnerungsgalerie",
    add_memory: "Erinnerung hinzufügen",
    events_eyebrow: "unser kleines fürimmer",
    events_heading: "Schöne Tage",
    add_event: "Tag hinzufügen",
    live_messages_eyebrow: "nur wir, in diesem Moment",
    live_messages_heading: "Live-Nachrichten",
    live_messages_empty: "Euer privater Chat erscheint hier.",
    live_message_placeholder: "Send message....",
    live_message_add_files: "Dateien hinzufügen",
    live_message_send: "Jetzt senden",
    live_message_update: "Bearbeitung speichern",
    emoji_button_label: "Emoji-Auswahl öffnen",
    live_message_files_selected: "ausgewählt",
    live_message_from_you: "Du",
    live_message_from_svetlana: "Svetlana",
    live_message_from_diab: "Diab",
    live_message_edited: "Bearbeitet",
    live_message_edited_at: (date_text) => `Bearbeitet ${date_text}`,
    live_message_deleted: "Gelöscht",
    live_message_delete_local: "Löschen",
    live_message_send_error:
      "Die Nachricht konnte gerade nicht gesendet werden.",
    live_message_edit_prompt: "Bearbeite deine Nachricht",
    live_message_delete_confirm: "Diese Nachricht löschen?",
    made_with_love: "Mit Liebe gemacht von Diab",
    love_note_eyebrow: "aus Diabs Herz",
    morning_message_heading: "dein Morgen von Diab",
    night_message_heading: "für deine Nacht, meine Liebe",
    password_recovery_title: "Wähle ein neues Geheimwort",
    password_recovery_copy:
      "Der Reset-Link ist bereit. Lege hier ein neues Geheimwort fest.",
    new_password_label: "Neues Passwort",
    confirm_password_label: "Passwort bestätigen",
    new_password_placeholder: "Neues Geheimwort",
    confirm_password_placeholder: "Noch einmal schreiben",
    password_recovery_save: "Neues Passwort speichern",
    password_recovery_mismatch: "Beide Passwortfelder müssen gleich sein.",
    password_recovery_success:
      "Dein Passwort wurde aktualisiert. Du kannst dich jetzt mit dem neuen Geheimwort anmelden.",
    password_recovery_error:
      "Das Passwort konnte gerade nicht aktualisiert werden.",
    memory_dialog_add: "Erinnerung hinzufügen",
    memory_dialog_edit: "Diese Erinnerung bearbeiten",
    event_dialog_add: "Einen schönen Tag hinzufügen",
    event_dialog_edit: "Diesen schönen Tag bearbeiten",
    title_label: "Titel",
    date_label: "Datum",
    note_label: "Kleine Notiz",
    picture_label: "Bild",
    event_description_label: "Was passiert ist",
    memory_title_placeholder: "Ein Lächeln, das ich behalten möchte",
    memory_note_placeholder: "Schreib das Gefühl hier hinein",
    event_title_placeholder: "Der Tag, an dem wir ohne Grund gelacht haben",
    event_description_placeholder: "Halte die Erinnerung lebendig",
    save_memory: "Erinnerung speichern",
    update_memory: "Erinnerung aktualisieren",
    save_event: "Tag speichern",
    update_event: "Tag aktualisieren",
    image_replace_hint:
      "Wähle nur dann ein neues Bild, wenn du das aktuelle ersetzen möchtest.",
    edit: "Bearbeiten",
    delete: "Löschen",
    close_dialog_label: "Schließen",
    delete_memory_confirm: "Diese Erinnerung löschen?",
    delete_event_confirm: "Diesen Tag löschen?",
    fallback_memory_date: "Ein Tag zum Behalten",
    fallback_event_date: "Ein schöner Tag",
    default_memory_one_title: "Der erste goldene Rahmen",
    default_memory_one_date: "Wartet auf ein Lächeln",
    default_memory_one_note:
      "Das erste Foto, das ihr hinzufügt, wird hier leben.",
    default_memory_two_title: "Eine sanfte kleine Erinnerung",
    default_memory_two_date: "Jeder schöne Tag",
    default_memory_two_note:
      "Ein Platz für ein Bild, einen Satz und das Gefühl darum herum.",
    default_memory_three_title: "Der nächste Lieblingsmoment",
    default_memory_three_date: "Bald, ganz natürlich",
    default_memory_three_note:
      "Bereit, sobald ein Tag zu süß wird, um ihn zu vergessen.",
    first_event_date: "18. Januar 2025",
    first_event_title: "Der Tag, an dem wir uns gefunden haben",
    first_event_description: "Der Anfang von etwas Seltenem und Wunderschönem.",
    years: ["Jahr", "Jahre"],
    months: ["Monat", "Monate"],
    days: ["Tag", "Tage"],
    greetings: {
      svetlana: {
        morning: [
          "Guten Morgen, mein Engel Svetlana",
          "Heute beginnt sanft nur für dich.",
        ],
        afternoon: [
          "Guten Tag, mein Engel Svetlana",
          "Ich hoffe, dein Tag fühlt sich weich und schön an.",
        ],
        evening: [
          "Guten Abend, mein Engel Svetlana",
          "Der Abend darf jetzt ein wenig leichter werden.",
        ],
        night: [
          "Gute Nacht, mein Engel Svetlana",
          "Möge dein Herz heute Nacht ruhig und geliebt schlafen.",
        ],
      },
      diab: {
        morning: ["Guten Morgen, Diab", "Ein neuer Tag in eurer kleinen Welt."],
        afternoon: ["Guten Tag, Diab", "Bewahre die Wärme gut auf."],
        evening: [
          "Guten Abend, Diab",
          "Die ruhigeren Stunden gehören auch hierher.",
        ],
        night: ["Gute Nacht, Diab", "Ein weiterer Tag bleibt nah am Herzen."],
      },
    },
  },
  ar: {
    document_language: "ar",
    locale: "ar-EG",
    language_switch_hint: "تغيير اللغة",
    login_eyebrow: "مكاننا الخاص",
    login_copy: "باب صغير صُنع لقلبين فقط.",
    username_label: "الاسم",
    password_label: "الكلمة السرية",
    username_placeholder: "Svetlana",
    password_placeholder: "سرنا",
    login_email_hint_empty:
      "سيظهر بريد إعادة التعيين هنا حين يصبح الاسم معروفًا.",
    login_email_hint: (email) => `بريد إعادة التعيين: ${email}`,
    forgot_password_button: "نسيت كلمة السر؟",
    forgot_password_username_missing:
      "اكتب الاسم نفسه أولًا حتى أعرف إلى أي بريد يجب أن يذهب رابط إعادة التعيين.",
    forgot_password_sent_generic: "تم إرسال رسالة إعادة التعيين.",
    forgot_password_sent: (email) =>
      `تم إرسال رسالة إعادة التعيين إلى ${email}.`,
    forgot_password_error: "تعذر إرسال رسالة إعادة التعيين الآن.",
    login_button: "ادخل عالمنا",
    login_error:
      "هذا العالم الصغير لا يفتح إلا بالاسم الصحيح والكلمة السرية الصحيحة.",
    welcome_kicker: "مرحباً يا روح جميلة",
    enter_home_button: "ادخل واحتفظ بابتسامتك",
    header_eyebrow: "لنا وحدنا",
    dark_theme_button: "الوضع الداكن",
    light_theme_button: "الوضع الفاتح",
    theme_light_short: "فاتح",
    theme_dark_short: "داكن",
    logout_button: "اخرج بهدوء",
    hero_eyebrow: "مكان لنا",
    hero_heading: "كل يوم معكِ يصبح جزءاً من الحكاية.",
    hero_message_svetlana:
      "هذا العالم الصغير هنا ليحييكِ بلطف، ويحفظ ذكرياتكما، ويمنحكِ ابتسامة دافئة كلما فتحتيه.",
    hero_message_diab:
      "بيت خاص للمرأة التي تحبها، وللذكريات التي تحفظها، وللحياة التي تبنيانها معاً.",
    today_prank_heading: "ضحكة صغيرة لليوم",
    night_tale_eyebrow: "لساعات الهدوء",
    night_tale_heading: "حكاية ليلية لكِ",
    time_eyebrow: "وقتنا",
    time_heading: "كم يتذكر القلب",
    days_label: "الأيام منذ أن وجدنا بعضنا",
    days_note: "منذ 18 يناير 2025",
    years_label: "شكل وقتنا",
    years_note: "محسوب بعناية",
    diab_age_label: "عمر دياب",
    diab_age_note: "مواليد 23 مارس 2000",
    svetlana_age_label: "عمر سفيتلانا",
    svetlana_age_note: "مواليد 29 أغسطس 1991",
    diab_birthday_label: "عيد ميلاد دياب القادم",
    svetlana_birthday_label: "عيد ميلاد سفيتلانا القادم",
    diab_birthday_message: (days) =>
      `${days} يوماً حتى عيد الميلاد السعيد القادم الذي سأعيشه وأنتِ في حياتي.`,
    svetlana_birthday_message: (days) =>
      `${days} يوماً حتى عيد ميلاد سفيتلانا الجميل القادم.`,
    gallery_eyebrow: "صور وابتسامات",
    gallery_heading: "معرض الذكريات",
    add_memory: "أضف ذكرى",
    events_eyebrow: "إلى الأبد الصغير لنا",
    events_heading: "أيام جميلة",
    add_event: "أضف يوماً",
    live_messages_eyebrow: "نحن فقط، في اللحظة نفسها",
    live_messages_heading: "رسائل مباشرة",
    live_messages_empty: "ستظهر محادثتكما الخاصة هنا.",
    live_message_placeholder: "Send message....",
    live_message_add_files: "أضف ملفات",
    live_message_send: "أرسل الآن",
    live_message_update: "احفظ التعديل",
    emoji_button_label: "افتح لوحة الإيموجي",
    live_message_files_selected: "محددة",
    live_message_from_you: "أنت",
    live_message_from_svetlana: "سفيتلانا",
    live_message_from_diab: "دياب",
    live_message_edited: "تم التعديل",
    live_message_edited_at: (date_text) => `تم التعديل ${date_text}`,
    live_message_deleted: "تم الحذف",
    live_message_delete_local: "حذف",
    live_message_send_error: "تعذر إرسال الرسالة الآن.",
    live_message_edit_prompt: "عدّل رسالتك",
    live_message_delete_confirm: "هل تريد حذف هذه الرسالة؟",
    made_with_love: "صُنع بحب بواسطة دياب",
    love_note_eyebrow: "من قلب دياب",
    morning_message_heading: "صباحكِ من دياب",
    night_message_heading: "لليلتكِ يا حبيبتي",
    password_recovery_title: "اختاري كلمة سر جديدة",
    password_recovery_copy: "رابط إعادة التعيين جاهز. اكتبي كلمة سر جديدة هنا.",
    new_password_label: "كلمة السر الجديدة",
    confirm_password_label: "تأكيد كلمة السر",
    new_password_placeholder: "كلمة السر الجديدة",
    confirm_password_placeholder: "اكتبيها مرة أخرى",
    password_recovery_save: "احفظ كلمة السر الجديدة",
    password_recovery_mismatch: "يجب أن تتطابق كلمتا السر.",
    password_recovery_success:
      "تم تحديث كلمة السر. يمكنك تسجيل الدخول الآن بالكلمة الجديدة.",
    password_recovery_error: "تعذر تحديث كلمة السر الآن.",
    memory_dialog_add: "أضف ذكرى",
    memory_dialog_edit: "عدّل هذه الذكرى",
    event_dialog_add: "أضف يوماً جميلاً",
    event_dialog_edit: "عدّل هذا اليوم الجميل",
    title_label: "العنوان",
    date_label: "التاريخ",
    note_label: "ملاحظة صغيرة",
    picture_label: "صورة",
    event_description_label: "ماذا حدث",
    memory_title_placeholder: "ابتسامة أريد الاحتفاظ بها",
    memory_note_placeholder: "اكتب الشعور هنا",
    event_title_placeholder: "اليوم الذي ضحكنا فيه بلا سبب",
    event_description_placeholder: "أبقِ الذكرى حيّة",
    save_memory: "احفظ الذكرى",
    update_memory: "حدّث الذكرى",
    save_event: "احفظ اليوم",
    update_event: "حدّث اليوم",
    image_replace_hint: "اختر صورة جديدة فقط إذا أردت استبدال الصورة الحالية.",
    edit: "تعديل",
    delete: "حذف",
    close_dialog_label: "إغلاق",
    delete_memory_confirm: "هل تريد حذف هذه الذكرى؟",
    delete_event_confirm: "هل تريد حذف هذا اليوم؟",
    fallback_memory_date: "يوم يستحق الاحتفاظ به",
    fallback_event_date: "يوم جميل",
    default_memory_one_title: "الإطار الذهبي الأول",
    default_memory_one_date: "بانتظار ابتسامة",
    default_memory_one_note: "أول صورة تضيفانها ستعيش هنا.",
    default_memory_two_title: "ذكرى صغيرة دافئة",
    default_memory_two_date: "أي يوم جميل",
    default_memory_two_note: "مكان لصورة وجملة والشعور الذي يحيط بهما.",
    default_memory_three_title: "اللحظة المفضلة القادمة",
    default_memory_three_date: "قريباً، بشكل طبيعي",
    default_memory_three_note: "جاهز عندما يصبح يوم ما حلواً أكثر من أن يُنسى.",
    first_event_date: "18 يناير 2025",
    first_event_title: "اليوم الذي وجدنا فيه بعضنا",
    first_event_description: "بداية شيء نادر وجميل.",
    years: ["سنة", "سنوات"],
    months: ["شهر", "أشهر"],
    days: ["يوم", "أيام"],
    greetings: {
      svetlana: {
        morning: ["صباح الخير يا ملاكي سفيتلانا", "ليبدأ يومكِ بلطف ودفء."],
        afternoon: [
          "مساء الخير يا ملاكي سفيتلانا",
          "أتمنى أن يكون يومكِ هادئاً وجميلاً.",
        ],
        evening: [
          "مساء الخير يا ملاكي سفيتلانا",
          "ليصبح ما تبقى من اليوم أخف وأجمل.",
        ],
        night: [
          "تصبحين على خير يا ملاكي سفيتلانا",
          "ليَنَم قلبكِ الليلة بسلام ومحبة.",
        ],
      },
      diab: {
        morning: ["صباح الخير يا دياب", "يوم جديد في عالمكما الصغير."],
        afternoon: ["مساء الخير يا دياب", "احتفظ بالدفء قريباً من قلبك."],
        evening: ["مساء الخير يا دياب", "حتى ساعات الهدوء لها مكان هنا."],
        night: ["تصبح على خير يا دياب", "يوم آخر بقي قريباً من القلب."],
      },
    },
  },
};

Object.assign(translations.en, {
  app_notice_title: "A little note",
  app_confirm_title: "Just to be sure",
  app_notice_default_body: "Something gentle needs your attention.",
  ok_action: "Okay",
  confirm_action: "Confirm",
  replying_to_self: "Replying to yourself",
  cycle_jump_to_month: "Jump to month",
  mentioning_cycle_note: "Mentioning cycle note",
  cycle_note_reference_label: "Cycle note",
  cycle_feeling_title: "How did this day feel?",
  cycle_mood_button: "Mood",
  cycle_remove_entry: "Clear entry",
  cycle_note_title: "A small note for this day",
  cycle_note_placeholder: "A soft little note for this day...",
  cycle_note_save: "Save note",
  cycle_checkin_title_svetlana: "How are you feeling in these days?",
  cycle_checkin_title_diab: "Leave her a soft reply",
  cycle_checkin_placeholder_svetlana: "Write how these days feel for you...",
  cycle_checkin_placeholder_diab: "Write a gentle reply for her...",
  cycle_checkin_save_svetlana: "Save feeling",
  cycle_checkin_save_diab: "Save reply",
  cycle_reply_softly: "Reply softly",
  cycle_checkin_svetlana_prefix: "Svetlana",
  cycle_checkin_diab_prefix: "Diab",
  cycle_support_bloom_message:
    "Smile my angel, you're the most wonderful woman in the universe",
  cycle_detail_period_note: (day) => `Marked as confirmed period day ${day}.`,
  cycle_detail_predicted_note:
    "Predicted from the learned average of the recent cycles, and it will adapt as more entries are confirmed.",
  cycle_detail_ovulation_note:
    "This day is currently marked as the ovulation point.",
  cycle_detail_fertile_note:
    "This day sits inside the fertile window calculated from the cycle rhythm.",
  cycle_detail_normal_note:
    "Choose how this day should shape the cycle timeline, or leave a note for how it felt.",
  cycle_saved_note_prefix: "Note",
  cycle_mood_none: "Mood",
  cycle_mood_very_low: "Very low",
  cycle_mood_low: "Low",
  cycle_mood_soft: "Soft",
  cycle_mood_good: "Good",
  cycle_mood_bright: "Bright",
});

Object.assign(translations.de, {
  app_notice_title: "Eine kleine Notiz",
  app_confirm_title: "Nur kurz zur Sicherheit",
  app_notice_default_body: "Etwas Kleines braucht gerade deine Aufmerksamkeit.",
  ok_action: "Okay",
  confirm_action: "Bestätigen",
  replying_to_self: "Antwort an dich selbst",
  cycle_jump_to_month: "Zum Monat springen",
  mentioning_cycle_note: "Zyklusnotiz wird erwähnt",
  cycle_note_reference_label: "Zyklusnotiz",
  cycle_feeling_title: "Wie hat sich dieser Tag angefühlt?",
  cycle_mood_button: "Stimmung",
  cycle_remove_entry: "Eintrag lösen",
  cycle_note_title: "Eine kleine Notiz für diesen Tag",
  cycle_note_placeholder: "Eine sanfte kleine Notiz für diesen Tag...",
  cycle_note_save: "Notiz speichern",
  cycle_checkin_title_svetlana: "Wie fühlst du dich in diesen Tagen?",
  cycle_checkin_title_diab: "Lass ihr eine sanfte Antwort da",
  cycle_checkin_placeholder_svetlana:
    "Schreib, wie sich diese Tage für dich anfühlen...",
  cycle_checkin_placeholder_diab:
    "Schreib ihr eine liebevolle kleine Antwort...",
  cycle_checkin_save_svetlana: "Gefühl speichern",
  cycle_checkin_save_diab: "Antwort speichern",
  cycle_reply_softly: "Sanft antworten",
  cycle_checkin_svetlana_prefix: "Svetlana",
  cycle_checkin_diab_prefix: "Diab",
  cycle_support_bloom_message:
    "Lächle, mein Engel, du bist die wunderbarste Frau im Universum",
  cycle_detail_period_note: (day) =>
    `Als bestätigter Periodentag ${day} markiert.`,
  cycle_detail_predicted_note:
    "Aus dem gelernten Durchschnitt der letzten Zyklen berechnet und wird mit neuen Einträgen weiter angepasst.",
  cycle_detail_ovulation_note:
    "Dieser Tag ist derzeit als Eisprungspunkt markiert.",
  cycle_detail_fertile_note:
    "Dieser Tag liegt im fruchtbaren Fenster, das aus dem Zyklusrhythmus berechnet wurde.",
  cycle_detail_normal_note:
    "Lege fest, wie dieser Tag die Zykluslinie formen soll, oder hinterlasse eine kleine Notiz.",
  cycle_saved_note_prefix: "Notiz",
  cycle_mood_none: "Stimmung",
  cycle_mood_very_low: "Sehr niedrig",
  cycle_mood_low: "Niedrig",
  cycle_mood_soft: "Sanft",
  cycle_mood_good: "Gut",
  cycle_mood_bright: "Strahlend",
});

Object.assign(translations.ar, {
  app_notice_title: "ملاحظة صغيرة",
  app_confirm_title: "فقط للتأكد",
  app_notice_default_body: "هناك شيء لطيف يحتاج إلى انتباهك الآن.",
  ok_action: "حسنًا",
  confirm_action: "تأكيد",
  replying_to_self: "الرد على نفسك",
  cycle_jump_to_month: "الانتقال إلى شهر محدد",
  mentioning_cycle_note: "الإشارة إلى ملاحظة الدورة",
  cycle_note_reference_label: "ملاحظة الدورة",
  cycle_feeling_title: "كيف كان شعور هذا اليوم؟",
  cycle_mood_button: "المزاج",
  cycle_remove_entry: "تنظيف الإدخال",
  cycle_note_title: "ملاحظة صغيرة لهذا اليوم",
  cycle_note_placeholder: "ملاحظة صغيرة وهادئة لهذا اليوم...",
  cycle_note_save: "حفظ الملاحظة",
  cycle_checkin_title_svetlana: "كيف تشعرين في هذه الأيام؟",
  cycle_checkin_title_diab: "اترك لها ردا لطيفا",
  cycle_checkin_placeholder_svetlana: "اكتبي كيف تمر عليك هذه الأيام...",
  cycle_checkin_placeholder_diab: "اكتب لها ردا دافئا ولطيفا...",
  cycle_checkin_save_svetlana: "حفظ الشعور",
  cycle_checkin_save_diab: "حفظ الرد",
  cycle_reply_softly: "رد بلطف",
  cycle_checkin_svetlana_prefix: "سفيتلانا",
  cycle_checkin_diab_prefix: "دياب",
  cycle_support_bloom_message: "ابتسمي يا ملاكي، أنت أروع امرأة في هذا الكون",
  cycle_detail_period_note: (day) => `تم تأكيد هذا اليوم كيوم دورة رقم ${day}.`,
  cycle_detail_predicted_note:
    "تم توقّعه من متوسط الدورات الأخيرة وسيتكيف كلما تم تأكيد أيام جديدة.",
  cycle_detail_ovulation_note: "هذا اليوم محدد الآن كنقطة الإباضة.",
  cycle_detail_fertile_note:
    "هذا اليوم يقع داخل نافذة الخصوبة المحسوبة من إيقاع الدورة.",
  cycle_detail_normal_note:
    "اختاري كيف يجب أن يؤثر هذا اليوم على خط الدورة، أو اتركي ملاحظة صغيرة عنه.",
  cycle_saved_note_prefix: "ملاحظة",
  cycle_mood_none: "المزاج",
  cycle_mood_very_low: "منخفض جدا",
  cycle_mood_low: "منخفض",
  cycle_mood_soft: "هادئ",
  cycle_mood_good: "جيد",
  cycle_mood_bright: "رائع",
});

const cycle_mood_scale = [
  { key: "very_low", emoji: "😞" },
  { key: "low", emoji: "😕" },
  { key: "soft", emoji: "🙂" },
  { key: "good", emoji: "😊" },
  { key: "bright", emoji: "🤩" },
];

Object.assign(translations.en, {
  menu_button_label: "Menu",
  music_on_short: "On",
  music_mute_short: "Mute",
  music_toggle_label: "Music",
  music_controls_label: "Music controls",
  music_previous_track: "Previous track",
  music_next_track: "Next track",
  music_add_track: "Add music",
  music_library: "Your music",
  music_library_empty: "No personal tracks yet.",
  music_delete_track: "Remove track",
  music_default_tracks: "Default music",
  music_shared_tracks: "Shared uploads",
  music_personal_tracks: "Your uploads",
  music_shared_upload_failed:
    "The track stayed only on this device because shared storage is not ready yet.",
  music_play_track: "Play track",
  music_pause_track: "Pause track",
  music_added: (count) => `${count} track${count === 1 ? "" : "s"} added.`,
  music_play: "Play music",
  music_pause: "Pause music",
  messages_short_heading: "Messages",
  messages_search: "Search messages",
  messages_search_placeholder: "Search messages",
  messages_search_no_results: "No matches",
  messages_search_previous: "Previous match",
  messages_search_next: "Next match",
  messages_search_close: "Close search",
  messages_latest: "Go to latest message",
  presence_online: "Online",
  presence_last_seen_just_now: "Last seen just now",
  presence_last_seen_minutes: (count, time) =>
    `Last seen ${count} minute${count === 1 ? "" : "s"} ago at ${time}`,
  presence_last_seen_hours: (count, time) =>
    `Last seen ${count} hour${count === 1 ? "" : "s"} ago at ${time}`,
  presence_last_seen_yesterday: (time) => `Last seen yesterday at ${time}`,
  presence_last_seen_date: (time, date) => `Last seen at ${time} ${date}`,
  presence_hidden: "Last seen hidden",
  presence_show_setting: "Show online status",
  presence_hide_setting: "Hide online status",
  presence_seen_toggle: "Seen",
  presence_hidden_toggle: "Hidden",
  presence_waiting: "Status will appear soon",
  presence_typing: "Typing...",
  incoming_message_title: (name) => `New message from ${name}`,
  incoming_message_close: "Close notification",
  shared_activity_memory: "Memory updated",
  shared_activity_event: "Event updated",
  shared_activity_cycle: "Cycle calendar updated",
  shared_activity_music: "Shared music updated",
  shared_activity_file: "File saved to shared storage",
  shared_activity_generic: "Shared update",
  show_password: "Show password",
  hide_password: "Hide password",
  biometric_login: "Use fingerprint",
  biometric_setup_saved: "Fingerprint sign-in is ready for the next 30 days.",
  biometric_unavailable: "Fingerprint sign-in is not available on this device yet.",
  biometric_expired: "Please sign in with the secret word again.",
  biometric_opt_in_label: "Use fingerprint next time",
  notification_reply: "Reply",
  notification_confirm: "Confirm",
  cycle_notification_two_days: "Two days before predicted cycle",
  cycle_notification_one_day: "One day before predicted cycle",
  cycle_notification_today: "It is your predicted cycle day",
  cycle_notification_end: (day) => `It's day ${day} the predicted cycle end`,
  cycle_update_start: "Cycle start confirmed",
  cycle_update_end: "Cycle end confirmed",
  cycle_update_note: "Cycle note updated",
  cycle_update_mood: "Cycle mood updated",
  cycle_update_checkin: "Cycle feeling updated",
  cycle_update_settings: "Cycle settings updated",
  cycle_update_generic: "Cycle calendar updated",
  expand_messages: "Expand messages",
  close_messages: "Close messages",
  open_messages: "Open messages",
  expand_cycle_calendar: "Expand cycle calendar",
  close_cycle_calendar: "Close cycle calendar",
  open_cycle_calendar: "Open cycle calendar",
  download: "Download",
  download_image: "Download image",
  download_saved: (path_text) => `Saved to ${path_text}.`,
  download_failed: "The image could not be saved from this device.",
  cycle_set_start: "Period start",
  cycle_set_end: "Period end",
  add_your_thought: "Add your thought",
  edit_your_thought: "Edit your thought",
  birthday_write_wish: "Write birthday wish",
});

Object.assign(translations.de, {
  menu_button_label: "Menü",
  music_on_short: "An",
  music_mute_short: "Stumm",
  music_toggle_label: "Musik",
  music_controls_label: "Musiksteuerung",
  music_previous_track: "Vorheriger Titel",
  music_next_track: "Nächster Titel",
  music_add_track: "Musik hinzufügen",
  music_library: "Deine Musik",
  music_library_empty: "Noch keine persönlichen Titel.",
  music_delete_track: "Titel entfernen",
  music_default_tracks: "Standardmusik",
  music_shared_tracks: "Gemeinsame Uploads",
  music_personal_tracks: "Deine Uploads",
  music_shared_upload_failed:
    "Der Titel blieb nur auf diesem Gerät, weil der gemeinsame Speicher noch nicht bereit ist.",
  music_play_track: "Titel abspielen",
  music_pause_track: "Titel pausieren",
  music_added: (count) => `${count} Titel hinzugefügt.`,
  music_play: "Musik abspielen",
  music_pause: "Musik pausieren",
  messages_short_heading: "Nachrichten",
  messages_search: "Nachrichten suchen",
  messages_search_placeholder: "Nachrichten suchen",
  messages_search_no_results: "Keine Treffer",
  messages_search_previous: "Vorheriger Treffer",
  messages_search_next: "Nächster Treffer",
  messages_search_close: "Suche schließen",
  messages_latest: "Zur neuesten Nachricht",
  presence_online: "Online",
  presence_last_seen_just_now: "Zuletzt gerade eben gesehen",
  presence_last_seen_minutes: (count, time) =>
    `Zuletzt vor ${count} Minute${count === 1 ? "" : "n"} um ${time} gesehen`,
  presence_last_seen_hours: (count, time) =>
    `Zuletzt vor ${count} Stunde${count === 1 ? "" : "n"} um ${time} gesehen`,
  presence_last_seen_yesterday: (time) => `Zuletzt gestern um ${time} gesehen`,
  presence_last_seen_date: (time, date) => `Zuletzt um ${time} ${date} gesehen`,
  presence_hidden: "Zuletzt gesehen verborgen",
  presence_show_setting: "Online-Status zeigen",
  presence_hide_setting: "Online-Status verbergen",
  presence_seen_toggle: "Seen",
  presence_hidden_toggle: "Hidden",
  presence_waiting: "Status erscheint gleich",
  presence_typing: "Schreibt...",
  incoming_message_title: (name) => `Neue Nachricht von ${name}`,
  incoming_message_close: "Benachrichtigung schließen",
  shared_activity_memory: "Erinnerung aktualisiert",
  shared_activity_event: "Ereignis aktualisiert",
  shared_activity_cycle: "Zykluskalender aktualisiert",
  shared_activity_music: "Gemeinsame Musik aktualisiert",
  shared_activity_file: "Datei im gemeinsamen Speicher gesichert",
  shared_activity_generic: "Gemeinsame Aktualisierung",
  show_password: "Passwort zeigen",
  hide_password: "Passwort verbergen",
  biometric_login: "Fingerabdruck verwenden",
  biometric_setup_saved:
    "Fingerabdruck-Anmeldung ist für die nächsten 30 Tage bereit.",
  biometric_unavailable:
    "Fingerabdruck-Anmeldung ist auf diesem Gerät noch nicht verfügbar.",
  biometric_expired: "Bitte melde dich wieder mit dem Geheimwort an.",
  biometric_opt_in_label: "Fingerabdruck beim nächsten Mal nutzen",
  notification_reply: "Antworten",
  notification_confirm: "Bestätigen",
  cycle_notification_two_days: "Zwei Tage vor dem vorhergesagten Zyklus",
  cycle_notification_one_day: "Ein Tag vor dem vorhergesagten Zyklus",
  cycle_notification_today: "Heute ist dein vorhergesagter Zyklustag",
  cycle_notification_end: (day) => `Tag ${day}: vorhergesagtes Zyklusende`,
  cycle_update_start: "Zyklusbeginn bestätigt",
  cycle_update_end: "Zyklusende bestätigt",
  cycle_update_note: "Zyklusnotiz aktualisiert",
  cycle_update_mood: "Zyklusstimmung aktualisiert",
  cycle_update_checkin: "Zyklusgefühl aktualisiert",
  cycle_update_settings: "Zykluseinstellungen aktualisiert",
  cycle_update_generic: "Zykluskalender aktualisiert",
  expand_messages: "Nachrichten erweitern",
  close_messages: "Nachrichten schließen",
  open_messages: "Nachrichten öffnen",
  expand_cycle_calendar: "Zykluskalender erweitern",
  close_cycle_calendar: "Zykluskalender schließen",
  open_cycle_calendar: "Zykluskalender öffnen",
  download: "Herunterladen",
  download_image: "Bild herunterladen",
  download_saved: (path_text) => `Gespeichert unter ${path_text}.`,
  download_failed: "Das Bild konnte auf diesem Gerät nicht gespeichert werden.",
  cycle_set_start: "Periodenstart",
  cycle_set_end: "Periodenende",
  add_your_thought: "Deinen Gedanken hinzufügen",
  edit_your_thought: "Deinen Gedanken bearbeiten",
  birthday_write_wish: "Geburtstagsgruß schreiben",
});

Object.assign(translations.ar, {
  menu_button_label: "القائمة",
  music_on_short: "تشغيل",
  music_mute_short: "كتم",
  music_toggle_label: "الموسيقى",
  music_controls_label: "تحكم الموسيقى",
  music_previous_track: "المقطع السابق",
  music_next_track: "المقطع التالي",
  music_add_track: "إضافة موسيقى",
  music_library: "موسيقاي",
  music_library_empty: "لا توجد مقاطع شخصية بعد.",
  music_delete_track: "حذف المقطع",
  music_default_tracks: "الموسيقى الأساسية",
  music_shared_tracks: "المقاطع المشتركة",
  music_personal_tracks: "مقاطعك",
  music_shared_upload_failed:
    "بقي المقطع على هذا الجهاز فقط لأن التخزين المشترك غير جاهز بعد.",
  music_play_track: "تشغيل المقطع",
  music_pause_track: "إيقاف المقطع",
  music_added: (count) => `تمت إضافة ${count} مقطع.`,
  music_play: "تشغيل الموسيقى",
  music_pause: "إيقاف الموسيقى مؤقتاً",
  messages_short_heading: "الرسائل",
  messages_search: "البحث في الرسائل",
  messages_search_placeholder: "ابحثي في الرسائل",
  messages_search_no_results: "لا توجد نتائج",
  messages_search_previous: "النتيجة السابقة",
  messages_search_next: "النتيجة التالية",
  messages_search_close: "إغلاق البحث",
  messages_latest: "آخر رسالة",
  presence_online: "متصل",
  presence_last_seen_just_now: "آخر ظهور الآن",
  presence_last_seen_minutes: (count, time) =>
    `آخر ظهور منذ ${count} دقيقة في ${time}`,
  presence_last_seen_hours: (count, time) =>
    `آخر ظهور منذ ${count} ساعة في ${time}`,
  presence_last_seen_yesterday: (time) => `آخر ظهور أمس في ${time}`,
  presence_last_seen_date: (time, date) => `آخر ظهور في ${time} ${date}`,
  presence_hidden: "آخر ظهور مخفي",
  presence_show_setting: "إظهار الحالة",
  presence_hide_setting: "إخفاء الحالة",
  presence_seen_toggle: "Seen",
  presence_hidden_toggle: "Hidden",
  presence_waiting: "ستظهر الحالة قريباً",
  presence_typing: "يكتب الآن...",
  incoming_message_title: (name) => `رسالة جديدة من ${name}`,
  incoming_message_close: "إغلاق الإشعار",
  shared_activity_memory: "تم تحديث ذكرى",
  shared_activity_event: "تم تحديث حدث",
  shared_activity_cycle: "تم تحديث تقويم الدورة",
  shared_activity_music: "تم تحديث الموسيقى المشتركة",
  shared_activity_file: "تم حفظ الملف في التخزين المشترك",
  shared_activity_generic: "تحديث مشترك",
  show_password: "إظهار كلمة السر",
  hide_password: "إخفاء كلمة السر",
  biometric_login: "استخدام البصمة",
  biometric_setup_saved: "تسجيل الدخول بالبصمة جاهز لمدة 30 يوماً.",
  biometric_unavailable: "البصمة غير متاحة على هذا الجهاز بعد.",
  biometric_expired: "يرجى تسجيل الدخول بكلمة السر مرة أخرى.",
  biometric_opt_in_label: "استخدام البصمة في المرة القادمة",
  notification_reply: "رد",
  notification_confirm: "تأكيد",
  cycle_notification_two_days: "قبل الدورة المتوقعة بيومين",
  cycle_notification_one_day: "قبل الدورة المتوقعة بيوم واحد",
  cycle_notification_today: "اليوم هو يوم الدورة المتوقع",
  cycle_notification_end: (day) => `إنه اليوم ${day} لنهاية الدورة المتوقعة`,
  cycle_update_start: "تم تأكيد بداية الدورة",
  cycle_update_end: "تم تأكيد نهاية الدورة",
  cycle_update_note: "تم تحديث ملاحظة الدورة",
  cycle_update_mood: "تم تحديث مزاج الدورة",
  cycle_update_checkin: "تم تحديث شعور الدورة",
  cycle_update_settings: "تم تحديث إعدادات الدورة",
  cycle_update_generic: "تم تحديث تقويم الدورة",
  expand_messages: "توسيع الرسائل",
  close_messages: "إغلاق الرسائل",
  open_messages: "فتح الرسائل",
  expand_cycle_calendar: "توسيع تقويم الدورة",
  close_cycle_calendar: "إغلاق تقويم الدورة",
  open_cycle_calendar: "فتح تقويم الدورة",
  download: "تنزيل",
  download_image: "تنزيل الصورة",
  download_saved: (path_text) => `تم الحفظ في ${path_text}.`,
  download_failed: "تعذر حفظ الصورة من هذا الجهاز.",
  cycle_set_start: "بداية الدورة",
  cycle_set_end: "نهاية الدورة",
  add_your_thought: "أضف فكرتك",
  edit_your_thought: "عدّل فكرتك",
  birthday_write_wish: "اكتب تهنئة عيد ميلاد",
});

function get_default_memory_gallery_items() {
  return [
    {
      id: "memory_placeholder_one",
      is_placeholder: true,
      title: translate("default_memory_one_title"),
      date_label: translate("default_memory_one_date"),
      note: translate("default_memory_one_note"),
      image_data: "",
    },
    {
      id: "memory_placeholder_two",
      is_placeholder: true,
      title: translate("default_memory_two_title"),
      date_label: translate("default_memory_two_date"),
      note: translate("default_memory_two_note"),
      image_data: "",
    },
    {
      id: "memory_placeholder_three",
      is_placeholder: true,
      title: translate("default_memory_three_title"),
      date_label: translate("default_memory_three_date"),
      note: translate("default_memory_three_note"),
      image_data: "",
    },
  ];
}

function get_default_event_timeline_items() {
  return [
    {
      id: "first_day",
      is_locked: true,
      is_custom: false,
      date_label: translate("first_event_date"),
      date_value: "2025-01-18",
      title: translate("first_event_title"),
      description: translate("first_event_description"),
    },
  ];
}

function create_default_cycle_data() {
  return {
    typical_cycle_length: 24,
    typical_period_length: 7,
    entries: [
      {
        id: "cycle_seed_may_2026",
        startDate: "2026-05-07",
        endDate: "2026-05-12",
        cycleLength: 24,
        periodLength: 6,
        confirmed: true,
        symptoms: [],
        notes: [],
        manualOvulationDate: "",
      },
    ],
    day_notes_by_date: {},
    cycle_checkins_by_key: {},
    moods_by_date: {},
    updated_at: "",
  };
}

function rebuild_cycle_runtime_state() {
  return rebuild_cycle_state();
}
function build_cycle_generated_messages(
  runtime,
  entry,
  start,
  cycleLength,
  periodLength,
) {
  const nextCycle = add_days(start, cycleLength);
  const twoDaysBefore = add_days(nextCycle, -2);
  runtime.generated_messages.push({
    type: "cycle-warning",
    date: format_date_key(twoDaysBefore),
    content: translate("cycle_generated_warning"),
  });
  for (let i = 0; i < periodLength; i++) {
    const currentDay = add_days(start, i);
    runtime.generated_messages.push({
      type: "cycle-day",
      date: format_date_key(currentDay),
      content:
        i === 0
          ? translate("cycle_generated_day_one")
          : i === 1
            ? translate("cycle_generated_day_two")
            : translate("cycle_generated_day_n")(i + 1),
    });
  }
}
function after_cycle_data_change() {
  on_cycle_change();
}
function set_cycle_start(date_key) {
  set_cycle_start_for_date(normalize_date_key(date_key));
}
function set_cycle_end(date_key) {
  set_cycle_end_for_date(normalize_date_key(date_key));
}
function remove_cycle_entry(date_key) {
  remove_cycle_entry_for_date(normalize_date_key(date_key));
}
function render_cycle_messages() {
  render_cycle_status_panel();
}
function render_cycle_support_message() {
  render_cycle_status_panel();
}

function create_default_backup_config() {
  return {
    one_drive_base_path: "",
  };
}

function get_month_anchor(date_value) {
  const date = new Date(date_value);
  return new Date(date.getFullYear(), date.getMonth(), 1);
}

const dom_references = {};
let current_user_profile = null;
let current_language = "en";
let daily_joy_messages_by_language = {
  en: fallback_daily_joy_messages,
  de: fallback_daily_joy_messages_de,
  ar: fallback_daily_joy_messages_ar,
};
let daily_love_messages_by_language = {
  en: fallback_daily_love_messages,
  de: fallback_daily_love_messages_de,
  ar: fallback_daily_love_messages_ar,
};
let morning_messages_by_language = {
  en: fallback_morning_messages,
  de: fallback_morning_messages_de,
  ar: fallback_morning_messages_ar,
};
let night_messages_by_language = {
  en: fallback_night_messages,
  de: fallback_night_messages_de,
  ar: fallback_night_messages_ar,
};
let night_tales_by_language = {
  en: fallback_night_tales,
  de: fallback_night_tales_de,
  ar: fallback_night_tales_ar,
};
let current_memory_items = [];
let current_event_items = [];
let current_live_messages = [];
let selected_live_message_files = [];
let pending_message_context = null;
let editing_memory_id = null;
let editing_event_id = null;
let editing_live_message_id = null;
let editing_live_message_has_attachments = false;
let editing_memory_image_data = "";
let hidden_deleted_message_ids = [];
let current_cycle_data = create_default_cycle_data();
let current_backup_config = create_default_backup_config();
let current_cycle_month_anchor = get_month_anchor(new Date());
let current_cycle_message_index = 0;
let current_selected_cycle_date = "";
let current_cycle_calendar_view_key = "";
let current_cycle_calendar_buttons = new Map();
let current_open_cycle_note_date = "";
let current_cycle_mood_picker_open = false;
let current_lightbox_image_data = "";
let current_lightbox_title = "";
let most_used_emojis = [];
let emoji_usage_counts = {};
let welcome_audio_context = null;
let current_sound_manifest = { ...local_sound_manifest_fallback };
let background_music_audio = null;
let last_background_music_url = "";
let background_music_needs_unlock = false;
let background_music_paused_by_user = false;
let background_music_paused_by_lifecycle = false;
let music_enabled = true;
let local_music_tracks = [];
let shared_music_tracks = [];
let fullscreen_panel_name = "";
let cycle_panel_user_compacted = false;
let cycle_panel_auto_expanded = false;
let message_search_query = "";
let message_search_matches = [];
let message_search_active_index = -1;
let presence_interval_id = null;
let presence_sync_timeout_id = null;
let presence_state_by_user = {};
let current_user_presence_visible = true;
let biometric_auto_prompt_attempted = false;
let emoji_swipe_state = null;
let time_sensitive_interval_id = null;
let live_message_stream = null;
let live_message_poll_id = null;
let live_messages_history_loaded = false;
let shared_data_stream = null;
let heart_shower_interval_id = null;
let heart_shower_timeout_id = null;
let hero_message_timer_id = null;
let hero_message_cleanup_id = null;
let supabase_client = null;
let supabase_auth_subscription = null;
let current_room_slug = supabase_room_slug_default;
let current_auth_user_id = "";
let current_auth_access_token = "";
let password_recovery_mode_active = false;
let last_exit_sound_time = 0;
let active_overlay_name = "";
let live_message_swipe_state = null;
let cycle_ambient_nodes = null;
let cycle_message_rotation_id = null;
let cycle_feeling_prompt_key = "";
let current_cycle_text_dialog_mode = "checkin";
let cycle_support_echo_timer_id = null;
let cycle_support_echo_cleanup_id = null;
let suppress_next_popstate_sound = false;
let active_mention_query = null;
let mention_search_results = [];
let mention_search_active_index = 0;
let saved_message_selection_range = null;
let cycle_state_sync_timeout_id = null;
let shared_music_sync_timeout_id = null;
let pending_cycle_change_type = "";
let typing_idle_timeout_id = null;
let last_typing_sync_time = 0;
let in_app_notification_layer = null;
let birthday_page_effect_key = "";
let cycle_calendar_swipe_state = null;
let suppress_cycle_day_click_until = 0;
let current_cycle_runtime_state = null;
function add_days(date, amount) {
  const cloned = new Date(date);
  cloned.setDate(cloned.getDate() + amount);
  return cloned;
}
function format_date_key(date) {
  return format_date_input_value(date);
}
function normalize_date_key(value) {
  if (!value) return "";
  if (typeof value === "string" && value.includes("T")) {
    return value.split("T")[0];
  }
  return value;
}
function is_same_day(date_a, date_b) {
  return (
    format_date_key(new Date(date_a)) === format_date_key(new Date(date_b))
  );
}
function get_cycle_entry_by_id(entry_id) {
  return current_cycle_data.entries.find((entry) => {
    return entry.id === entry_id;
  });
}
function clear_cycle_visual_states() {
  const buttons = [...document.querySelectorAll(".cycle_day_button")];
  buttons.forEach((button) => {
    button.classList.remove(
      "is_period",
      "is_predicted",
      "is_fertile",
      "is_ovulation",
      "is_today",
      "is_selected",
      "has_note",
      "has_mood",
      "is_note_open",
    );
  });
}

function get_cycle_mood_options() {
  return [
    { key: "very_low", emoji: "😞" },
    { key: "low", emoji: "😕" },
    { key: "soft", emoji: "🙂" },
    { key: "good", emoji: "😊" },
    { key: "bright", emoji: "🤩" },
  ].map((mood_item) => ({
    ...mood_item,
    label: translate(`cycle_mood_${mood_item.key}`),
  }));
}

function get_cycle_note_for_date(date_text) {
  return String(current_cycle_data.day_notes_by_date?.[date_text] || "").trim();
}

function get_cycle_mood_value(date_text) {
  return String(current_cycle_data.moods_by_date?.[date_text] || "").trim();
}

function get_cycle_mood_option(date_text) {
  const mood_key = get_cycle_mood_value(date_text);
  return (
    get_cycle_mood_options().find((mood_item) => mood_item.key === mood_key) ||
    null
  );
}

function get_cycle_mood_button_label(date_text) {
  const mood_option = get_cycle_mood_option(date_text);

  if (!mood_option) {
    return translate("cycle_mood_button");
  }

  return `${mood_option.emoji} ${mood_option.label}`;
}

function set_cycle_mood_for_date(date_text, mood_key) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const normalized_mood = String(mood_key || "").trim();

  current_cycle_data.moods_by_date ||= {};

  if (
    !normalized_mood ||
    get_cycle_mood_value(normalized_date) === normalized_mood
  ) {
    delete current_cycle_data.moods_by_date[normalized_date];
  } else {
    current_cycle_data.moods_by_date[normalized_date] = normalized_mood;
  }

  current_selected_cycle_date = normalized_date;
  pending_cycle_change_type = "mood";
  on_cycle_change();
}

function get_active_cycle_checkin_context() {
  const runtime_state = get_cycle_runtime_state();

  if (!runtime_state.window_is_active) {
    return null;
  }

  const today_status = runtime_state.today_status;

  if (today_status.state === "period" && today_status.entry?.startDate) {
    const start_text = today_status.entry.startDate;
    const end_text =
      today_status.entry.endDate ||
      format_date_input_value(
        add_days(
          parse_local_date(start_text),
          Math.max(today_status.entry.periodLength - 1, 0),
        ),
      );

    return {
      key: `cycle_${start_text}`,
      start_text,
      end_text,
    };
  }

  const start_text =
    today_status.predicted_start || runtime_state.next_predicted_start;

  if (!start_text) {
    return null;
  }

  return {
    key: `cycle_${start_text}`,
    start_text,
    end_text: format_date_input_value(
      add_days(
        parse_local_date(start_text),
        Math.max(runtime_state.stats.period_length - 1, 0),
      ),
    ),
  };
}

function get_cycle_checkin_entry() {
  const checkin_context = get_active_cycle_checkin_context();

  if (!checkin_context) {
    return null;
  }

  const entry =
    current_cycle_data.cycle_checkins_by_key?.[checkin_context.key] || null;

  return entry
    ? {
        ...entry,
        key: checkin_context.key,
        start_text: checkin_context.start_text,
        end_text: checkin_context.end_text,
      }
    : {
        key: checkin_context.key,
        start_text: checkin_context.start_text,
        end_text: checkin_context.end_text,
        feeling_text: "",
        reply_text: "",
      };
}

function cleanup_expired_cycle_checkins() {
  const stored_items = current_cycle_data.cycle_checkins_by_key;

  if (!stored_items || typeof stored_items !== "object") {
    current_cycle_data.cycle_checkins_by_key = {};
    return;
  }

  const today = start_of_today();
  current_cycle_data.cycle_checkins_by_key = Object.fromEntries(
    Object.entries(stored_items).filter(([, entry]) => {
      if (!entry?.end_text) {
        return true;
      }

      return parse_local_date(entry.end_text) >= today;
    }),
  );
}
let current_cycle_dialog_guard = {
  dialog_id: "",
  has_unsaved_changes: false,
  closing_via_save: false,
};
let current_app_notice_request = null;
const flow_animation_state = {};
const quick_emoji_source = `Smileys & Emotion
😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 😎 🤓 🧐 🤩 🥳 🙂‍↔️ 🙂‍↕️ 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾 ❤️ 🧡 💛 💚 💙 🩵 💜 🖤 🩶 🤍 🤎 💔 ❤️‍🔥 ❤️‍🩹 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟

People & Body
👋 🤚 🖐️ ✋ 🖖 🫱 🫲 🫳 🫴 🫷 🫸 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 🫵 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦵 🦿 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁️ 👅 👄 🫦 💋 🩸 👶 🧒 👦 👧 🧑 👱 👨 🧔 🧔‍♂️ 🧔‍♀️ 👨‍🦰 👨‍🦱 👨‍🦳 👨‍🦲 👩 👩‍🦰 🧑‍🦰 👩‍🦱 🧑‍🦱 👩‍🦳 🧑‍🦳 👩‍🦲 🧑‍🦲 👱‍♀️ 👱‍♂️ 🧓 👴 👵 🙍 🙍‍♂️ 🙍‍♀️ 🙎 🙎‍♂️ 🙎‍♀️ 🙅 🙅‍♂️ 🙅‍♀️ 🙆 🙆‍♂️ 🙆‍♀️ 💁 💁‍♂️ 💁‍♀️ 🙋 🙋‍♂️ 🙋‍♀️ 🧏 🧏‍♂️ 🧏‍♀️ 🙇 🙇‍♂️ 🙇‍♀️ 🤦 🤦‍♂️ 🤦‍♀️ 🤷 🤷‍♂️ 🤷‍♀️ 🧑‍⚕️ 👨‍⚕️ 👩‍⚕️ 🧑‍🎓 👨‍🎓 👩‍🎓 🧑‍🏫 👨‍🏫 👩‍🏫 🧑‍⚖️ 👨‍⚖️ 👩‍⚖️ 🧑‍🌾 👨‍🌾 👩‍🌾 🧑‍🍳 👨‍🍳 👩‍🍳 🧑‍🔧 👨‍🔧 👩‍🔧 🧑‍🏭 👨‍🏭 👩‍🏭 🧑‍💼 👨‍💼 👩‍💼 🧑‍🔬 👨‍🔬 👩‍🔬 🧑‍💻 👨‍💻 👩‍💻 🧑‍🎤 👨‍🎤 👩‍🎤 🧑‍🎨 👨‍🎨 👩‍🎨 🧑‍✈️ 👨‍✈️ 👩‍✈️ 🧑‍🚀 👨‍🚀 👩‍🚀 🧑‍🚒 👨‍🚒 👩‍🚒 👮 👮‍♂️ 👮‍♀️ 🕵️ 🕵️‍♂️ 🕵️‍♀️ 💂 💂‍♂️ 💂‍♀️ 🥷 👷 👷‍♂️ 👷‍♀️ 🫅 🤴 👸 👳 👳‍♂️ 👳‍♀️ 👲 🧕 🤵 🤵‍♂️ 🤵‍♀️ 👰 👰‍♂️ 👰‍♀️ 🤰 🫃 🫄 🤱 👩‍🍼 👨‍🍼 🧑‍🍼 👼 🎅 🤶 🧑‍🎄 🦸 🦸‍♂️ 🦸‍♀️ 🦹 🦹‍♂️ 🦹‍♀️ 🧙 🧙‍♂️ 🧙‍♀️ 🧚 🧚‍♂️ 🧚‍♀️ 🧛 🧛‍♂️ 🧛‍♀️ 🧜 🧜‍♂️ 🧜‍♀️ 🧝 🧝‍♂️ 🧝‍♀️ 🧞 🧞‍♂️ 🧞‍♀️ 🧟 🧟‍♂️ 🧟‍♀️ 🧌 💆 💆‍♂️ 💆‍♀️ 💇 💇‍♂️ 💇‍♀️ 🚶 🚶‍♂️ 🚶‍♀️ 🧍 🧍‍♂️ 🧍‍♀️ 🧎 🧎‍♂️ 🧎‍♀️ 🧑‍🦯 👨‍🦯 👩‍🦯 🧑‍🦼 👨‍🦼 👩‍🦼 🧑‍🦽 👨‍🦽 👩‍🦽 🏃 🏃‍♂️ 🏃‍♀️ 💃 🕺 🕴️ 👯 👯‍♂️ 👯‍♀️ 🧖 🧖‍♂️ 🧖‍♀️ 🧗 🧗‍♂️ 🧗‍♀️

Animals & Nature
🐵 🐒 🦍 🦧 🐶 🐕 🦮 🐕‍🦺 🐩 🐺 🦊 🦝 🐱 🐈 🐈‍⬛ 🦁 🐯 🐅 🐆 🐴 🫎 🫏 🐎 🦄 🦓 🦌 🦬 🐮 🐂 🐃 🐄 🐷 🐖 🐗 🐽 🐏 🐑 🐐 🐪 🐫 🦙 🦒 🐘 🦣 🦏 🦛 🐭 🐁 🐀 🐹 🐰 🐇 🐿️ 🦫 🦔 🦇 🐻 🐻‍❄️ 🐨 🐼 🦥 🦦 🦨 🦘 🦡 🐾 🦃 🐔 🐓 🐣 🐤 🐥 🐦 🐧 🕊️ 🦅 🦆 🦢 🦉 🦤 🪶 🦩 🦚 🦜 🪽 🐦‍⬛ 🪿 🐸 🐊 🐢 🦎 🐍 🐲 🐉 🦕 🦖 🐳 🐋 🐬 🦭 🐟 🐠 🐡 🦈 🐙 🐚 🪸 🪼 🐌 🦋 🐛 🐜 🐝 🪲 🐞 🦗 🪳 🕷️ 🕸️ 🦂 🦟 🪰 🪱 🦠 💐 🌸 💮 🪷 🏵️ 🌹 🥀 🌺 🌻 🌼 🌷 🪻 🌱 🪴 🌲 🌳 🌴 🌵 🌾 🌿 ☘️ 🍀 🍁 🍂 🍃 🪹 🪺 🍄 🪨 🪵 🌰 🦀 🦞 🦐 🦑

Food & Drink
🍇 🍈 🍉 🍊 🍋 🍋‍🟩 🍌 🍍 🥭 🍎 🍏 🍐 🍑 🍒 🍓 🫐 🥝 🍅 🫒 🥥 🥑 🍆 🥔 🥕 🌽 🌶️ 🫑 🥒 🥬 🥦 🧄 🧅 🥜 🫘 🌰 🫚 🫛 🍄‍🟫 🍞 🥐 🥖 🫓 🥨 🥯 🥞 🧇 🧀 🍖 🍗 🥩 🥓 🍔 🍟 🍕 🌭 🥪 🌮 🌯 🫔 🥙 🧆 🥚 🍳 🥘 🍲 🫕 🥣 🥗 🍿 🧈 🧂 🥫 🍱 🍘 🍙 🍚 🍛 🍜 🍝 🍠 🍢 🍣 🍤 🍥 🥮 🍡 🥟 🥠 🥡 🦪 🍦 🍧 🍨 🍩 🍪 🎂 🍰 🧁 🥧 🍫 🍬 🍭 🍮 🍯 🍼 🥛 ☕ 🫖 🍵 🍶 🍾 🍷 🍸 🍹 🍺 🍻 🥂 🥃 🫗 🥤 🧋 🧃 🧉 🧊 🥢 🍽️ 🍴 🥄 🔪 🫙 🏺

Travel & Places
🌍 🌎 🌏 🌐 🗺️ 🗾 🧭 🏔️ ⛰️ 🌋 🗻 🏕️ 🏖️ 🏜️ 🏝️ 🏞️ 🏟️ 🏛️ 🏗️ 🧱 🪨 🪵 🛖 🏘️ 🏚️ 🏠 🏡 🏢 🏣 🏤 🏥 🏦 🏨 🏩 🏪 🏫 🏬 🏭 🏯 🏰 💒 🗼 🗽 ⛪ 🕌 🛕 🕍 ⛩️ 🕋 ⛲ ⛺ 🌁 🌃 🏙️ 🌄 🌅 🌆 🌇 🌉 ♨️ 🎠 🛝 🎡 🎢 💈 🎪 🚂 🚃 🚄 🚅 🚆 🚇 🚈 🚉 🚊 🚝 🚞 🚋 🚌 🚍 🚎 🚐 🚑 🚒 🚓 🚔 🚕 🚖 🚗 🚘 🚙 🛻 🚚 🚛 🚜 🏎️ 🏍️ 🛵 🦽 🦼 🛺 🚲 🛴 🛹 🛼 🚏 🛣️ 🛤️ 🛢️ ⛽ 🛞 🚨 🚥 🚦 🛑 🚧 ⚓ 🛟 ⛵ 🛶 🚤 🛳️ ⛴️ 🛥️ 🚢 ✈️ 🛩️ 🛫 🛬 🪂 💺 🚁 🚟 🚠 🚡 🛰️ 🚀 🛸 🛎️ 🧳 ⌛ ⏳ ⌚ ⏰ ⏱️ ⏲️ 🕰️ 🕛 🕧 🕐 🕜 🕑 🕝 🕒 🕞 🕓 🕟 🕔 🕠 🕕 🕡 🕖 🕢 🕗 🕣 🕘 🕤 🕙 🕥 🕚 🕦 🌑 🌒 🌓 🌔 🌕 🌖 🌗 🌘 🌙 🌚 🌛 🌜 🌡️ ☀️ 🌝 🌞 🪐 ⭐ 🌟 🌠 🌌 ☁️ ⛅ ⛈️ 🌤️ 🌥️ 🌦️ 🌧️ 🌨️ 🌩️ 🌪️ 🌫️ 🌬️ 🌀 🌈 🌂 ☂️ ☔ ⛱️ ⚡ ❄️ ☃️ ⛄ ☄️ 🔥 💧 🌊

Activities
🎃 🎄 🎆 🎇 🧨 ✨ 🎈 🎉 🎊 🎋 🎍 🎎 🎏 🎐 🎑 🧧 🎀 🎁 🎗️ 🎟️ 🎫 🎖️ 🏆 🏅 🥇 🥈 🥉 ⚽ ⚾ 🥎 🏀 🏐 🏈 🏉 🎾 🥏 🎳 🏏 🏑 🏒 🥍 🏓 🏸 🥊 🥋 🥅 ⛳ ⛸️ 🎣 🤿 🎽 🎿 🛷 🥌 🎯 🪀 🪁 🔫 🎱 🔮 🪄 🎮 🕹️ 🎰 🎲 🧩 🧸 🪅 🪩 🪆 ♠️ ♥️ ♦️ ♣️ ♟️ 🃏 🀄 🎴 🎭 🖼️ 🎨 🧵 🪡 🧶 🪢

Objects
👓 🕶️ 🥽 🥼 🦺 👔 👕 👖 🧣 🧤 🧥 🧦 👗 👘 🥻 🩱 🩲 🩳 👙 👚 🪭 👛 👜 👝 🛍️ 🎒 🩴 👞 👟 🥾 🥿 👠 👡 🩰 👢 🪮 👑 👒 🎩 🎓 🧢 🪖 ⛑️ 📿 💄 💍 💎 🔇 🔈 🔉 🔊 📢 📣 📯 🔔 🔕 🎼 🎵 🎶 🎙️ 🎚️ 🎛️ 🎤 🎧 📻 🎷 🪗 🎸 🎹 🎺 🎻 🪕 🥁 🪘 🪇 🪈 📱 📲 ☎️ 📞 📟 📠 🔋 🪫 🔌 💻 🖥️ 🖨️ ⌨️ 🖱️ 🖲️ 💽 💾 💿 📀 🧮 🎥 🎞️ 📽️ 🎬 📺 📷 📸 📹 📼 🔍 🔎 🕯️ 💡 🔦 🏮 🪔 📔 📕 📖 📗 📘 📙 📚 📓 📒 📃 📜 📄 📰 🗞️ 📑 🔖 🏷️ 💰 🪙 💴 💵 💶 💷 💸 💳 🧾 💹 ✉️ 📧 📨 📩 📤 📥 📦 📫 📪 📬 📭 📮 🗳️ ✏️ ✒️ 🖋️ 🖊️ 🖌️ 🖍️ 📝 💼 📁 📂 🗂️ 📅 📆 🗒️ 🗓️ 📇 📈 📉 📊 📋 📌 📍 📎 🖇️ 📏 📐 ✂️ 🗃️ 🗄️ 🗑️ 🔒 🔓 🔏 🔐 🔑 🗝️ 🔨 🪓 ⛏️ ⚒️ 🛠️ 🗡️ ⚔️ 💣 🪃 🏹 🛡️ 🪚 🔧 🪛 🔩 ⚙️ 🗜️ ⚖️ 🦯 🔗 ⛓️‍💥 ⛓️ 🪝 🧰 🧲 🪜 ⚗️ 🧪 🧫 🧬 🔬 🔭 📡 💉 🩸 💊 🩹 🩼 🩺 🩻 🚪 🛗 🪞 🪟 🛏️ 🛋️ 🪑 🚽 🪠 🚿 🛁 🪤 🪒 🧴 🧷 🧹 🧺 🧻 🪣 🧼 🫧 🪥 🧽 🧯 🛒 🚬 ⚰️ 🪦 ⚱️ 🧿 🪬 🗿 🪧 🪪

Symbols
🏧 🚮 🚰 ♿ 🚹 🚺 🚻 🚼 🚾 🛂 🛃 🛄 🛅 ⚠️ 🚸 ⛔ 🚫 🚳 🚭 🚯 🚱 🚷 📵 🔞 ☢️ ☣️ ⬆️ ↗️ ➡️ ↘️ ⬇️ ↙️ ⬅️ ↖️ ↕️ ↔️ ↩️ ↪️ ⤴️ ⤵️ 🔃 🔄 🔙 🔚 🔛 🔜 🔝 🛐 ⚛️ 🕉️ ✡️ ☸️ ☯️ ✝️ ☦️ ☪️ ☮️ 🕎 🔯 🪯 ♈ ♉ ♊ ♋ ♌ ♍ ♎ ♏ ♐ ♑ ♒ ♓ ⛎ 🔀 🔁 🔂 ▶️ ⏩ ⏭️ ⏯️ ◀️ ⏪ ⏮️ 🔼 ⏫ 🔽 ⏬ ⏸️ ⏹️ ⏺️ ⏏️ 🎦 🔅 🔆 📶 🛜 📳 📴 ♀️ ♂️ ⚧️ ✖️ ➕ ➖ ➗ 🟰 ♾️ ‼️ ⁉️ ❓ ❔ ❕ ❗ 〰️ 💱 💲 ⚕️ ♻️ ⚜️ 🔱 📛 🔰 ⭕ ✅ ☑️ ✔️ ❌ ❎ ➰ ➿ 〽️ ✳️ ✴️ ❇️ ©️ ®️ ™️ #️⃣ *️⃣ 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔠 🔡 🔢 🔣 🔤 🅰️ 🆎 🅱️ 🆑 🆒 🆓 ℹ️ 🆔 Ⓜ️ 🆕 🆖 🅾️ 🆗 🅿️ 🆘 🆙 🆚 🈁 🈂️ 🈷️ 🈶 🈯 🉐 🈹 🈚 🈲 🉑 🈸 🈴 🈳 ㊗️ ㊙️ 🈺 🈵 🔴 🟠 🟡 🟢 🔵 🟣 🟤 ⚫ ⚪ 🟥 🟧 🟨 🟩 🟦 🟪 🟫 ⬛ ⬜ ◼️ ◻️ ◾ ◽ ▪️ ▫️ 🔶 🔷 🔸 🔹 🔺 🔻 💠 🔘 🔳 🔲

Flags
🏁 🚩 🎌 🏴 🏳️ 🏳️‍🌈 🏳️‍⚧️ 🏴‍☠️ AC 🇦🇩 🇦🇪 🇦🇫 🇦🇬 🇦🇮 🇦🇱 🇦🇲 🇦🇴 🇦🇶 🇦🇷 🇦🇸 🇦🇹 🇦🇺 🇦🇼 🇦🇽 🇦🇿 🇧🇦 🇧🇧 🇧🇩 🇧🇪 🇧🇫 🇧🇬 🇧🇭 🇧🇮 🇧🇯 🇧🇱 🇧🇲 🇧🇳 🇧🇴 🇧🇶 🇧🇷 🇧🇸 🇧🇹 🇧🇻 🇧🇼 🇧🇾 🇧🇿 🇨🇦 🇨🇨 🇨🇩 🇨🇫 🇨🇬 🇨🇭 🇨🇮 🇨🇰 🇨🇱 🇨🇲 🇨🇳 🇨🇴 🇨🇵 🇨🇷 🇨🇺 🔜 🔝 ⛐ ⚛️ ⛩️ ⛲ ⛺ ⛱️ ⚡ ❄️ ☃️ ⛄ ☄️ 🔥 💧 💨
`;
const emoji_categories = parse_emoji_categories(quick_emoji_source);
const quick_emojis = emoji_categories.flatMap((category) => category.emojis);

document.addEventListener("DOMContentLoaded", initialize_application);

async function initialize_application() {
  collect_dom_references();
  lift_emoji_picker_panel();
  initialize_supabase_client();
  bind_event_handlers();
  load_most_used_emojis();
  apply_saved_language();
  apply_saved_theme();
  apply_saved_music_setting();
  load_local_music_tracks();
  await initialize_native_notifications();
  await load_sound_manifest();
  await load_all_message_lists();
  apply_language();
  sync_fullscreen_panel_state();
  update_music_control_buttons();
  sync_biometric_opt_in_checkbox();
  const restored_session = await restore_existing_session();
  sync_authenticated_chrome();
  void update_biometric_login_button();

  if (!restored_session) {
    await load_saved_content();
    rebuild_cycle_runtime_state();
    void maybe_auto_prompt_biometric_login();
  }

  update_home_counters();
  update_contextual_messages();
  start_time_sensitive_updates();
  build_emoji_picker();
  initialize_section_navigation_observer();
  auto_grow_live_message_input();
  start_heart_shower_cycle();
}

function collect_dom_references() {
  dom_references.reaction_layer = document.getElementById("reaction_layer");
  dom_references.app_nav_toggle_button = document.getElementById(
    "app_nav_toggle_button",
  );
  dom_references.app_nav_toggle_label = document.getElementById(
    "app_nav_toggle_label",
  );
  dom_references.app_nav_overlay = document.getElementById("app_nav_overlay");
  dom_references.app_nav_drawer = document.getElementById("app_nav_drawer");
  dom_references.app_nav_links = [
    ...document.querySelectorAll(".app_nav_link"),
  ];
  dom_references.language_toggle_button = document.getElementById(
    "language_toggle_button",
  );
  dom_references.language_flag_icon =
    document.getElementById("language_flag_icon");
  dom_references.language_toggle_label = document.getElementById(
    "language_toggle_label",
  );
  dom_references.login_screen = document.getElementById("login_screen");
  dom_references.login_panel_eyebrow = document.querySelector(
    "#login_screen .eyebrow_text",
  );
  dom_references.login_copy = document.querySelector(".login_copy");
  dom_references.login_form = document.getElementById("login_form");
  dom_references.login_button = document.getElementById("login_button");
  dom_references.username_input = document.getElementById("username_input");
  dom_references.password_input = document.getElementById("password_input");
  dom_references.password_visibility_button = document.getElementById(
    "password_visibility_button",
  );
  dom_references.biometric_login_button = document.getElementById(
    "biometric_login_button",
  );
  dom_references.biometric_opt_in_checkbox = document.getElementById(
    "biometric_opt_in_checkbox",
  );
  dom_references.biometric_opt_in_text = document.getElementById(
    "biometric_opt_in_text",
  );
  dom_references.login_email_hint = document.getElementById("login_email_hint");
  dom_references.forgot_password_button = document.getElementById(
    "forgot_password_button",
  );
  dom_references.login_error_message = document.getElementById(
    "login_error_message",
  );
  dom_references.welcome_overlay = document.getElementById("welcome_overlay");
  dom_references.welcome_kicker = document.getElementById("welcome_kicker");
  dom_references.welcome_primary_message = document.getElementById(
    "welcome_primary_message",
  );
  dom_references.welcome_secondary_message = document.getElementById(
    "welcome_secondary_message",
  );
  dom_references.daily_joy_message =
    document.getElementById("daily_joy_message");
  dom_references.enter_home_button =
    document.getElementById("enter_home_button");
  dom_references.home_screen = document.getElementById("home_screen");
  dom_references.home_header_eyebrow = document.querySelector(
    ".home_header .eyebrow_text",
  );
  dom_references.home_greeting = document.getElementById("home_greeting");
  dom_references.music_toggle_button = document.getElementById(
    "music_toggle_button",
  );
  dom_references.music_toggle_label =
    document.getElementById("music_toggle_label");
  dom_references.music_control_pill =
    document.getElementById("music_control_pill");
  dom_references.music_previous_button = document.getElementById(
    "music_previous_button",
  );
  dom_references.music_play_pause_button = document.getElementById(
    "music_play_pause_button",
  );
  dom_references.music_next_button =
    document.getElementById("music_next_button");
  dom_references.music_add_button = document.getElementById("music_add_button");
  dom_references.music_library_button = document.getElementById(
    "music_library_button",
  );
  dom_references.music_file_input =
    document.getElementById("music_file_input");
  dom_references.music_library_panel = document.getElementById(
    "music_library_panel",
  );
  dom_references.logout_button = document.getElementById("logout_button");
  dom_references.theme_toggle_button = document.getElementById(
    "theme_toggle_button",
  );
  dom_references.hero_eyebrow = document.querySelector(
    ".hero_content .eyebrow_text",
  );
  dom_references.hero_heading = document.getElementById("hero_heading");
  dom_references.hero_personal_message = document.getElementById(
    "hero_personal_message",
  );
  dom_references.daily_love_heading =
    document.getElementById("daily_love_heading");
  dom_references.daily_love_message =
    document.getElementById("daily_love_message");
  dom_references.daily_love_note = document.querySelector(".daily_love_note");
  dom_references.hero_symbol = document.querySelector(".hero_symbol");
  dom_references.hero_symbol_message = document.getElementById(
    "hero_symbol_message",
  );
  dom_references.today_prank_heading = document.getElementById(
    "today_prank_heading",
  );
  dom_references.today_prank_message = document.getElementById(
    "today_prank_message",
  );
  dom_references.today_prank_card = document.querySelector(".today_prank_card");
  dom_references.night_tale_card = document.getElementById("night_tale_card");
  dom_references.night_tale_eyebrow =
    document.getElementById("night_tale_eyebrow");
  dom_references.night_tale_heading =
    document.getElementById("night_tale_heading");
  dom_references.night_tale_message =
    document.getElementById("night_tale_message");
  dom_references.time_eyebrow = document.querySelector(
    "[aria-labelledby='time_heading'] .eyebrow_text",
  );
  dom_references.time_heading = document.getElementById("time_heading");
  dom_references.days_label = document.querySelector(
    ".featured_metric .metric_label",
  );
  dom_references.days_note = document.querySelector(
    ".featured_metric .metric_note",
  );
  dom_references.years_label = document.querySelector(
    ".time_grid .metric_card:nth-child(2) .metric_label",
  );
  dom_references.years_note = document.querySelector(
    ".time_grid .metric_card:nth-child(2) .metric_note",
  );
  dom_references.diab_age_label = document.querySelector(
    ".time_grid .metric_card:nth-child(3) .metric_label",
  );
  dom_references.diab_age_note = document.querySelector(
    ".time_grid .metric_card:nth-child(3) .metric_note",
  );
  dom_references.svetlana_age_label = document.querySelector(
    ".time_grid .metric_card:nth-child(4) .metric_label",
  );
  dom_references.svetlana_age_note = document.querySelector(
    ".time_grid .metric_card:nth-child(4) .metric_note",
  );
  dom_references.diab_birthday_label = document.querySelector(
    ".time_grid .metric_card:nth-child(5) .metric_label",
  );
  dom_references.svetlana_birthday_label = document.querySelector(
    ".time_grid .metric_card:nth-child(6) .metric_label",
  );
  dom_references.days_together_counter = document.getElementById(
    "days_together_counter",
  );
  dom_references.years_together_counter = document.getElementById(
    "years_together_counter",
  );
  dom_references.diab_age_counter = document.getElementById("diab_age_counter");
  dom_references.svetlana_age_counter = document.getElementById(
    "svetlana_age_counter",
  );
  dom_references.diab_next_birthday_message = document.getElementById(
    "diab_next_birthday_message",
  );
  dom_references.diab_birthday_celebration = document.getElementById(
    "diab_birthday_celebration",
  );
  dom_references.diab_birthday_celebration_message = document.getElementById(
    "diab_birthday_celebration_message",
  );
  dom_references.diab_birthday_wish_button = document.getElementById(
    "diab_birthday_wish_button",
  );
  dom_references.svetlana_next_birthday_message = document.getElementById(
    "svetlana_next_birthday_message",
  );
  dom_references.svetlana_birthday_celebration = document.getElementById(
    "svetlana_birthday_celebration",
  );
  dom_references.svetlana_birthday_celebration_message =
    document.getElementById("svetlana_birthday_celebration_message");
  dom_references.svetlana_birthday_wish_button = document.getElementById(
    "svetlana_birthday_wish_button",
  );
  dom_references.gallery_eyebrow = document.querySelector(
    "[aria-labelledby='memory_gallery_heading'] .eyebrow_text",
  );
  dom_references.memory_gallery_heading = document.getElementById(
    "memory_gallery_heading",
  );
  dom_references.add_memory_button =
    document.getElementById("add_memory_button");
  dom_references.memory_gallery = document.getElementById("memory_gallery");
  dom_references.events_eyebrow = document.querySelector(
    "[aria-labelledby='event_timeline_heading'] .eyebrow_text",
  );
  dom_references.event_timeline_heading = document.getElementById(
    "event_timeline_heading",
  );
  dom_references.add_event_button = document.getElementById("add_event_button");
  dom_references.event_timeline = document.getElementById("event_timeline");
  dom_references.cycle_eyebrow = document.getElementById("cycle_eyebrow");
  dom_references.cycle_tracker_section = document.getElementById(
    "cycle_tracker_section",
  );
  dom_references.cycle_heading = document.getElementById("cycle_heading");
  dom_references.open_cycle_settings_button = document.getElementById(
    "open_cycle_settings_button",
  );
  dom_references.cycle_expand_button =
    document.getElementById("cycle_expand_button");
  dom_references.cycle_compact_summary = document.getElementById(
    "cycle_compact_summary",
  );
  dom_references.cycle_compact_summary_text = document.getElementById(
    "cycle_compact_summary_text",
  );
  dom_references.cycle_shell = document.querySelector(".cycle_shell");
  dom_references.cycle_status_label =
    document.getElementById("cycle_status_label");
  dom_references.cycle_summary_text =
    document.getElementById("cycle_summary_text");
  dom_references.cycle_previous_month_button = document.getElementById(
    "cycle_previous_month_button",
  );
  dom_references.cycle_month_label =
    document.getElementById("cycle_month_label");
  dom_references.cycle_month_picker_input = document.getElementById(
    "cycle_month_picker_input",
  );
  dom_references.cycle_next_month_button = document.getElementById(
    "cycle_next_month_button",
  );
  dom_references.cycle_support_card =
    document.getElementById("cycle_support_card");
  dom_references.cycle_support_message = document.getElementById(
    "cycle_support_message",
  );
  dom_references.cycle_support_echo =
    document.getElementById("cycle_support_echo");
  dom_references.cycle_today_feeling = document.getElementById(
    "cycle_today_feeling",
  );
  dom_references.open_cycle_feeling_button = document.getElementById(
    "open_cycle_feeling_button",
  );
  dom_references.cycle_weekday_row =
    document.getElementById("cycle_weekday_row");
  dom_references.cycle_calendar_grid = document.getElementById(
    "cycle_calendar_grid",
  );
  dom_references.cycle_period_legend = document.getElementById(
    "cycle_period_legend",
  );
  dom_references.cycle_predicted_legend = document.getElementById(
    "cycle_predicted_legend",
  );
  dom_references.cycle_fertile_legend = document.getElementById(
    "cycle_fertile_legend",
  );
  dom_references.cycle_ovulation_legend = document.getElementById(
    "cycle_ovulation_legend",
  );
  dom_references.cycle_day_detail_card = document.getElementById(
    "cycle_day_detail_card",
  );
  dom_references.cycle_day_detail_title = document.getElementById(
    "cycle_day_detail_title",
  );
  dom_references.cycle_day_detail_state = document.getElementById(
    "cycle_day_detail_state",
  );
  dom_references.cycle_day_detail_note = document.getElementById(
    "cycle_day_detail_note",
  );
  dom_references.cycle_day_detail_saved_note = document.getElementById(
    "cycle_day_detail_saved_note",
  );
  dom_references.cycle_day_mood_button = document.getElementById(
    "cycle_day_mood_button",
  );
  dom_references.cycle_day_note_button = document.getElementById(
    "cycle_day_note_button",
  );
  dom_references.cycle_day_set_start_button = document.getElementById(
    "cycle_day_set_start_button",
  );
  dom_references.cycle_day_set_end_button = document.getElementById(
    "cycle_day_set_end_button",
  );
  dom_references.cycle_day_remove_button = document.getElementById(
    "cycle_day_remove_button",
  );
  dom_references.cycle_day_mood_picker = document.getElementById(
    "cycle_day_mood_picker",
  );
  dom_references.live_messages_eyebrow = document.getElementById(
    "live_messages_eyebrow",
  );
  dom_references.live_messages_heading = document.getElementById(
    "live_messages_heading",
  );
  dom_references.messages_section = document.getElementById("messages_section");
  dom_references.messages_expand_button = document.getElementById(
    "messages_expand_button",
  );
  dom_references.messages_compact_summary = document.getElementById(
    "messages_compact_summary",
  );
  dom_references.messages_compact_summary_text = document.getElementById(
    "messages_compact_summary_text",
  );
  dom_references.messages_search_button = document.getElementById(
    "messages_search_button",
  );
  dom_references.messages_search_panel = document.getElementById(
    "messages_search_panel",
  );
  dom_references.messages_search_input = document.getElementById(
    "messages_search_input",
  );
  dom_references.messages_search_previous_button = document.getElementById(
    "messages_search_previous_button",
  );
  dom_references.messages_search_next_button = document.getElementById(
    "messages_search_next_button",
  );
  dom_references.messages_search_close_button = document.getElementById(
    "messages_search_close_button",
  );
  dom_references.message_visibility_button = document.getElementById(
    "message_visibility_button",
  );
  dom_references.message_presence_bar = document.getElementById(
    "message_presence_bar",
  );
  dom_references.live_messages_empty_state = document.getElementById(
    "live_messages_empty_state",
  );
  dom_references.live_messages_list =
    document.getElementById("live_messages_list");
  dom_references.messages_scroll_bottom_button = document.getElementById(
    "messages_scroll_bottom_button",
  );
  dom_references.live_message_form =
    document.getElementById("live_message_form");
  dom_references.live_message_context_preview = document.getElementById(
    "live_message_context_preview",
  );
  dom_references.live_message_context_label = document.getElementById(
    "live_message_context_label",
  );
  dom_references.live_message_context_body = document.getElementById(
    "live_message_context_body",
  );
  dom_references.clear_live_message_context_button = document.getElementById(
    "clear_live_message_context_button",
  );
  dom_references.live_message_composer = document.querySelector(
    ".live_message_composer",
  );
  dom_references.live_message_input =
    document.getElementById("live_message_input");
  dom_references.mention_search_panel = document.getElementById(
    "mention_search_panel",
  );
  dom_references.emoji_toggle_button = document.getElementById(
    "emoji_toggle_button",
  );
  dom_references.emoji_picker_panel =
    document.getElementById("emoji_picker_panel");
  dom_references.live_message_files_input = document.getElementById(
    "live_message_files_input",
  );
  dom_references.live_message_files_label = document.getElementById(
    "live_message_files_label",
  );
  dom_references.live_message_files_preview = document.getElementById(
    "live_message_files_preview",
  );
  dom_references.send_live_message_button = document.getElementById(
    "send_live_message_button",
  );
  dom_references.footer_text = document.querySelector(".love_footer > p");
  dom_references.memory_dialog = document.getElementById("memory_dialog");
  dom_references.memory_form = document.getElementById("memory_form");
  dom_references.memory_dialog_title = document.getElementById(
    "memory_dialog_title",
  );
  dom_references.close_memory_dialog_button = document.getElementById(
    "close_memory_dialog_button",
  );
  dom_references.memory_title_label = document.querySelector(
    "label[for='memory_title_input']",
  );
  dom_references.memory_date_label = document.querySelector(
    "label[for='memory_date_input']",
  );
  dom_references.memory_note_label = document.querySelector(
    "label[for='memory_note_input']",
  );
  dom_references.memory_image_label = document.querySelector(
    "label[for='memory_image_input']",
  );
  dom_references.memory_title_input =
    document.getElementById("memory_title_input");
  dom_references.memory_date_input =
    document.getElementById("memory_date_input");
  dom_references.memory_note_input =
    document.getElementById("memory_note_input");
  dom_references.memory_image_input =
    document.getElementById("memory_image_input");
  dom_references.memory_image_hint =
    document.getElementById("memory_image_hint");
  dom_references.save_memory_button =
    document.getElementById("save_memory_button");
  dom_references.event_dialog = document.getElementById("event_dialog");
  dom_references.event_form = document.getElementById("event_form");
  dom_references.event_dialog_title =
    document.getElementById("event_dialog_title");
  dom_references.close_event_dialog_button = document.getElementById(
    "close_event_dialog_button",
  );
  dom_references.event_title_label = document.querySelector(
    "label[for='event_title_input']",
  );
  dom_references.event_date_label = document.querySelector(
    "label[for='event_date_input']",
  );
  dom_references.event_description_label = document.querySelector(
    "label[for='event_description_input']",
  );
  dom_references.event_title_input =
    document.getElementById("event_title_input");
  dom_references.event_date_input = document.getElementById("event_date_input");
  dom_references.event_description_input = document.getElementById(
    "event_description_input",
  );
  dom_references.save_event_button =
    document.getElementById("save_event_button");
  dom_references.password_recovery_dialog = document.getElementById(
    "password_recovery_dialog",
  );
  dom_references.password_recovery_form = document.getElementById(
    "password_recovery_form",
  );
  dom_references.password_recovery_title = document.getElementById(
    "password_recovery_title",
  );
  dom_references.password_recovery_copy = document.getElementById(
    "password_recovery_copy",
  );
  dom_references.close_password_recovery_button = document.getElementById(
    "close_password_recovery_button",
  );
  dom_references.new_password_label = document.querySelector(
    "label[for='new_password_input']",
  );
  dom_references.confirm_password_label = document.querySelector(
    "label[for='confirm_password_input']",
  );
  dom_references.new_password_input =
    document.getElementById("new_password_input");
  dom_references.confirm_password_input = document.getElementById(
    "confirm_password_input",
  );
  dom_references.password_recovery_status = document.getElementById(
    "password_recovery_status",
  );
  dom_references.save_password_button = document.getElementById(
    "save_password_button",
  );
  dom_references.cycle_settings_dialog = document.getElementById(
    "cycle_settings_dialog",
  );
  dom_references.cycle_settings_form = document.getElementById(
    "cycle_settings_form",
  );
  dom_references.cycle_settings_title = document.getElementById(
    "cycle_settings_title",
  );
  dom_references.close_cycle_settings_button = document.getElementById(
    "close_cycle_settings_button",
  );
  dom_references.cycle_length_label =
    document.getElementById("cycle_length_label");
  dom_references.cycle_length_input =
    document.getElementById("cycle_length_input");
  dom_references.cycle_duration_label = document.getElementById(
    "cycle_duration_label",
  );
  dom_references.cycle_duration_input = document.getElementById(
    "cycle_duration_input",
  );
  dom_references.save_cycle_settings_button = document.getElementById(
    "save_cycle_settings_button",
  );
  dom_references.cycle_feeling_dialog = document.getElementById(
    "cycle_feeling_dialog",
  );
  dom_references.cycle_feeling_form =
    document.getElementById("cycle_feeling_form");
  dom_references.cycle_feeling_title = document.getElementById(
    "cycle_feeling_title",
  );
  dom_references.close_cycle_feeling_button = document.getElementById(
    "close_cycle_feeling_button",
  );
  dom_references.cycle_feeling_input = document.getElementById(
    "cycle_feeling_input",
  );
  dom_references.save_cycle_feeling_button = document.getElementById(
    "save_cycle_feeling_button",
  );
  dom_references.cycle_discard_dialog = document.getElementById(
    "cycle_discard_dialog",
  );
  dom_references.cycle_discard_form =
    document.getElementById("cycle_discard_form");
  dom_references.cycle_discard_title = document.getElementById(
    "cycle_discard_title",
  );
  dom_references.cycle_discard_copy =
    document.getElementById("cycle_discard_copy");
  dom_references.close_cycle_discard_button = document.getElementById(
    "close_cycle_discard_button",
  );
  dom_references.cancel_cycle_discard_button = document.getElementById(
    "cancel_cycle_discard_button",
  );
  dom_references.confirm_cycle_discard_button = document.getElementById(
    "confirm_cycle_discard_button",
  );
  dom_references.app_notice_dialog =
    document.getElementById("app_notice_dialog");
  dom_references.app_notice_form = document.getElementById("app_notice_form");
  dom_references.app_notice_title =
    document.getElementById("app_notice_title");
  dom_references.app_notice_body = document.getElementById("app_notice_body");
  dom_references.close_app_notice_button = document.getElementById(
    "close_app_notice_button",
  );
  dom_references.cancel_app_notice_button = document.getElementById(
    "cancel_app_notice_button",
  );
  dom_references.confirm_app_notice_button = document.getElementById(
    "confirm_app_notice_button",
  );
  dom_references.memory_lightbox = document.getElementById("memory_lightbox");
  dom_references.memory_lightbox_image = document.getElementById(
    "memory_lightbox_image",
  );
  dom_references.memory_lightbox_caption = document.getElementById(
    "memory_lightbox_caption",
  );
  dom_references.memory_lightbox_download_button = document.getElementById(
    "memory_lightbox_download_button",
  );
  dom_references.live_message_input.removeAttribute("required");
}

function lift_emoji_picker_panel() {
  if (!dom_references.emoji_picker_panel) {
    return;
  }

  if (dom_references.emoji_picker_panel.parentElement !== document.body) {
    document.body.appendChild(dom_references.emoji_picker_panel);
  }
}

function load_most_used_emojis() {
  try {
    const stored_value = JSON.parse(
      localStorage.getItem(emoji_usage_storage_key) || "{}",
    );
    emoji_usage_counts =
      stored_value && typeof stored_value === "object" ? stored_value : {};
  } catch (error) {
    emoji_usage_counts = {};
  }

  most_used_emojis = get_sorted_most_used_emojis();
}

function save_emoji_usage_counts() {
  localStorage.setItem(
    emoji_usage_storage_key,
    JSON.stringify(emoji_usage_counts),
  );
}

function record_emoji_usage(emoji_character) {
  emoji_usage_counts[emoji_character] =
    (emoji_usage_counts[emoji_character] || 0) + 1;
  most_used_emojis = get_sorted_most_used_emojis();
  save_emoji_usage_counts();
}

function get_sorted_most_used_emojis() {
  const ranked_emojis = Object.entries(emoji_usage_counts)
    .sort((left_item, right_item) => right_item[1] - left_item[1])
    .map(([emoji_character]) => emoji_character)
    .filter(Boolean);

  return [
    ...new Set([
      ...ranked_emojis,
      "❤️",
      "😘",
      "🥹",
      "😄",
      "😂",
      "😍",
      "🙂",
      "🥳",
      "😝",
      "✨",
    ]),
  ].slice(0, 28);
}

function get_emoji_categories_with_recent() {
  const category_list =
    emoji_categories.length > 0
      ? emoji_categories
      : [{ id: "all", label: "Emoji", emojis: quick_emojis }];

  if (most_used_emojis.length === 0) {
    return category_list;
  }

  return [
    {
      id: "most_used",
      label: "Most used",
      emojis: most_used_emojis,
    },
    ...category_list,
  ];
}

function open_overlay_layer(overlay_name) {
  if (active_overlay_name === overlay_name) {
    return;
  }

  active_overlay_name = overlay_name;

  if (typeof window.history.pushState === "function") {
    window.history.pushState({ sveta_overlay: overlay_name }, document.title);
  }
}

function close_overlay_layer(overlay_name, from_history = false) {
  if (active_overlay_name !== overlay_name) {
    return;
  }

  active_overlay_name = "";

  if (
    !from_history &&
    typeof window.history.state === "object" &&
    window.history.state?.sveta_overlay === overlay_name
  ) {
    suppress_next_popstate_sound = true;
    window.history.back();
  }
}

function handle_global_popstate() {
  if (suppress_next_popstate_sound) {
    suppress_next_popstate_sound = false;
    return;
  }

  if (active_overlay_name === "emoji_picker") {
    hide_emoji_picker(true, true);
    return;
  }

  if (active_overlay_name === "memory_lightbox") {
    close_memory_lightbox(null, true);
    return;
  }

  handle_page_exit_sound();
}

function initialize_supabase_client() {
  const supabase_config = window.supabase_public_config || {};
  const create_client =
    window.supabase && typeof window.supabase.createClient === "function"
      ? window.supabase.createClient
      : null;
  const normalized_url = normalize_supabase_project_url(supabase_config.url);

  if (!create_client || !normalized_url || !supabase_config.anon_key) {
    return;
  }

  current_room_slug = supabase_config.room_slug || supabase_room_slug_default;
  supabase_client = create_client(normalized_url, supabase_config.anon_key, {
    auth: {
      persistSession: true,
      autoRefreshToken: true,
      detectSessionInUrl: true,
    },
  });

  bind_supabase_auth_listener();
}

function normalize_supabase_project_url(raw_url) {
  const safe_url = String(raw_url || "").trim();

  if (!safe_url) {
    return "";
  }

  return safe_url
    .replace(/\/+$/, "")
    .replace(/\/auth\/v1$/i, "")
    .replace(/\/rest\/v1$/i, "")
    .replace(/\/storage\/v1$/i, "");
}

function is_supabase_enabled() {
  return Boolean(supabase_client);
}

function can_use_local_api() {
  const host_name = String(window.location.hostname || "").toLowerCase();
  return (
    host_name === "localhost" ||
    host_name === "127.0.0.1" ||
    host_name === "::1"
  );
}

function get_supabase_user_map() {
  return (
    (window.supabase_public_config && window.supabase_public_config.users) || {}
  );
}

function get_supabase_user_config(username) {
  return get_supabase_user_map()[username] || null;
}

function bind_supabase_auth_listener() {
  if (!supabase_client || supabase_auth_subscription) {
    return;
  }

  const auth_listener = supabase_client.auth.onAuthStateChange(
    (event, session) => {
      if (event !== "PASSWORD_RECOVERY") {
        return;
      }

      window.setTimeout(() => {
        password_recovery_mode_active = true;
        current_auth_user_id = String(session?.user?.id || "");
        current_auth_access_token = String(session?.access_token || "");
        open_password_recovery_dialog();
      }, 0);
    },
  );

  supabase_auth_subscription =
    auth_listener?.data?.subscription || auth_listener?.subscription || null;
}

function is_supabase_recovery_link_present() {
  const search_text = String(window.location.search || "").toLowerCase();
  const hash_text = String(window.location.hash || "").toLowerCase();
  return (
    search_text.includes("type=recovery") || hash_text.includes("type=recovery")
  );
}

function clear_supabase_recovery_url_state() {
  if (typeof window.history.replaceState !== "function") {
    return;
  }

  const clean_url = `${window.location.pathname}${window.location.search}`;
  window.history.replaceState({}, document.title, clean_url);
}

function build_user_profile(user_key, email = "") {
  const local_user = allowed_users[user_key];

  if (!local_user) {
    return null;
  }

  return {
    user_key: local_user.user_key,
    display_name: local_user.display_name,
    email,
  };
}

function get_profile_from_supabase_user(user) {
  const user_email = String(user?.email || "")
    .trim()
    .toLowerCase();

  if (!user_email) {
    return null;
  }

  const matching_entry = Object.entries(get_supabase_user_map()).find(
    ([, config]) => {
      return (
        String(config?.email || "")
          .trim()
          .toLowerCase() === user_email
      );
    },
  );

  if (!matching_entry) {
    return null;
  }

  return build_user_profile(matching_entry[0], user_email);
}

async function restore_existing_session() {
  if (
    is_supabase_enabled() &&
    (password_recovery_mode_active || is_supabase_recovery_link_present())
  ) {
    return false;
  }

  if (is_supabase_enabled()) {
    try {
      const { data, error } = await supabase_client.auth.getSession();

      if (error) {
        await supabase_client.auth.signOut({ scope: "local" }).catch(() => {});
        return false;
      }

      if (!error && data.session?.user) {
        const restored_profile = get_profile_from_supabase_user(
          data.session.user,
        );

        if (restored_profile) {
          current_auth_user_id = data.session.user.id;
          current_auth_access_token = String(data.session.access_token || "");
          current_user_profile = restored_profile;
          load_local_music_tracks();
          await load_shared_music_tracks();
          load_hidden_deleted_messages();
          sessionStorage.setItem(
            "logged_in_user",
            JSON.stringify(restored_profile),
          );
          await ensure_supabase_profile_row(restored_profile);
          await load_saved_content();
          update_home_for_user(restored_profile);
          apply_saved_cycle_panel_state();
          sync_authenticated_chrome();
          start_presence_updates();
          dom_references.login_screen.classList.add("hidden");
          dom_references.welcome_overlay.classList.add("hidden");
          dom_references.home_screen.classList.remove("hidden");
          sync_cycle_audio();
          await configure_background_message_sync();
          await schedule_cycle_notifications();
          await initialize_live_messages_for_session();
          return true;
        }
      }
    } catch (error) {
      // Login falls back to the manual gate below.
    }
  }

  try {
    const saved_profile = JSON.parse(
      sessionStorage.getItem("logged_in_user") || "null",
    );

    if (saved_profile && saved_profile.user_key) {
      current_user_profile = saved_profile;
      current_auth_user_id = current_auth_user_id || "";
      load_local_music_tracks();
      await load_shared_music_tracks();
      load_hidden_deleted_messages();
      await load_saved_content();
      update_home_for_user(saved_profile);
      apply_saved_cycle_panel_state();
      sync_authenticated_chrome();
      start_presence_updates();
      dom_references.login_screen.classList.add("hidden");
      dom_references.welcome_overlay.classList.add("hidden");
      dom_references.home_screen.classList.remove("hidden");
      sync_cycle_audio();
      await configure_background_message_sync();
      await schedule_cycle_notifications();
      await initialize_live_messages_for_session();
      return true;
    }
  } catch (error) {
    // No local session to restore.
  }

  return false;
}

async function ensure_supabase_profile_row(user_profile) {
  if (!is_supabase_enabled() || !current_auth_user_id || !user_profile) {
    return;
  }

  try {
    await supabase_client.from(supabase_table_names.profiles).upsert({
      id: current_auth_user_id,
      user_key: user_profile.user_key,
      display_name: user_profile.display_name,
      room_slug: current_room_slug,
    });
  } catch (error) {
    // The app still works if the profile row will be created later.
  }
}

async function get_supabase_access_token() {
  if (!is_supabase_enabled()) {
    return "";
  }

  try {
    const { data } = await supabase_client.auth.getSession();
    const session_token = String(data?.session?.access_token || "");
    current_auth_access_token = session_token || current_auth_access_token;
    return current_auth_access_token;
  } catch (error) {
    return current_auth_access_token;
  }
}

async function configure_background_message_sync(enabled = true) {
  const background_sync_plugin = get_capacitor_plugin("BackgroundSync");

  if (!background_sync_plugin?.configure) {
    return;
  }

  const supabase_config = window.supabase_public_config || {};
  const latest_message = [...current_live_messages]
    .filter(
      (message_item) =>
        !should_hide_deleted_message(message_item) &&
        !is_system_live_message(message_item),
    )
    .sort(
      (left_item, right_item) =>
        new Date(right_item.created_at) - new Date(left_item.created_at),
    )[0];

  try {
    await background_sync_plugin.configure({
      enabled: Boolean(enabled && current_user_profile),
      supabaseUrl: normalize_supabase_project_url(supabase_config.url),
      anonKey: String(supabase_config.anon_key || ""),
      accessToken: await get_supabase_access_token(),
      roomSlug: current_room_slug,
      userKey: current_user_profile?.user_key || "",
      lastMessageCreatedAt: latest_message?.created_at || "",
    });
  } catch (error) {
    log_app_error("background_sync_configure_failed", error);
  }
}

async function initialize_native_notifications() {
  const local_notifications = get_capacitor_plugin("LocalNotifications");

  if (!local_notifications) {
    return;
  }

  try {
    const permission_state = await local_notifications.checkPermissions();

    if (permission_state?.display !== "granted") {
      await local_notifications.requestPermissions();
    }

    if (typeof local_notifications.createChannel === "function") {
      await local_notifications.createChannel({
        id: "messages",
        name: "Messages",
        importance: 4,
        visibility: 1,
      });
      await local_notifications.createChannel({
        id: "cycle",
        name: "Cycle calendar",
        importance: 4,
        visibility: 1,
      });
      await local_notifications.createChannel({
        id: "activity",
        name: "Shared updates",
        importance: 4,
        visibility: 1,
      });
    }

    await local_notifications.registerActionTypes({
      types: [
        {
          id: "MESSAGE_REPLY",
          actions: [
            {
              id: "reply",
              title: translate("notification_reply"),
              foreground: true,
            },
          ],
        },
        {
          id: "CYCLE_CONFIRM",
          actions: [
            {
              id: "confirm",
              title: translate("notification_confirm"),
              foreground: true,
            },
          ],
        },
      ],
    });

    await local_notifications.addListener(
      "localNotificationActionPerformed",
      handle_local_notification_action,
    );
  } catch (error) {
    log_app_error("native_notifications_init_failed", error);
  }
}

function build_notification_id(prefix_value, seed_text) {
  const hash_value = [...String(seed_text || "")].reduce(
    (total, character) => (total * 31 + character.charCodeAt(0)) % 100000,
    prefix_value,
  );
  return Math.max(1, hash_value);
}

async function schedule_activity_notification(title, body, seed_text) {
  const local_notifications = get_capacitor_plugin("LocalNotifications");

  if (!local_notifications || !current_user_profile) {
    return;
  }

  try {
    await local_notifications.schedule({
      notifications: [
        {
          id: build_notification_id(520000, seed_text),
          title: String(title || translate("shared_activity_generic")),
          body: String(body || ""),
          schedule: { at: new Date(Date.now() + 1000) },
          channelId: "activity",
          smallIcon: "ic_stat_notification",
          extra: {
            kind: "activity",
          },
        },
      ],
    });
  } catch (error) {
    log_app_error("activity_notification_schedule_failed", error);
  }
}

async function schedule_message_notification(message_item) {
  const local_notifications = get_capacitor_plugin("LocalNotifications");

  if (!local_notifications || !message_item || is_deleted_live_message(message_item)) {
    return;
  }

  const body_text = get_plain_text_snippet(
    get_live_message_display_text(message_item),
    140,
  );

  try {
    await local_notifications.schedule({
      notifications: [
        {
          id: build_notification_id(410000, message_item.id),
          title: message_item.sender_name || get_message_sender_label(message_item, false),
          body: body_text || translate("live_messages_heading"),
          largeBody: body_text,
          channelId: "messages",
          actionTypeId: "MESSAGE_REPLY",
          extra: {
            kind: "message",
            messageId: message_item.id,
          },
          schedule: { at: new Date(Date.now() + 200) },
        },
      ],
    });
  } catch (error) {
    log_app_error("message_notification_schedule_failed", error);
  }
}

function get_cycle_notification_body(date_text, suffix_type = "period") {
  return pick_cycle_support_suffix(date_text, suffix_type);
}

function get_next_cycle_notification_window() {
  const today = start_of_today();
  return get_cycle_runtime_state().predicted_windows.find(
    (window_item) => window_item.predicted_end >= today,
  );
}

async function schedule_cycle_notifications() {
  const local_notifications = get_capacitor_plugin("LocalNotifications");

  if (!local_notifications || !current_user_profile) {
    return;
  }

  const window_item = get_next_cycle_notification_window();

  if (!window_item) {
    return;
  }

  const period_length =
    calculate_days_between(window_item.predicted_start, window_item.predicted_end) +
    1;
  const schedule_items = [
    {
      offset: -2,
      id: 520002,
      title: translate("cycle_notification_two_days"),
      body: get_cycle_notification_body(
        format_date_input_value(add_days(window_item.predicted_start, -2)),
        "warning",
      ),
      badge: 2,
    },
    {
      offset: -1,
      id: 520001,
      title: translate("cycle_notification_one_day"),
      body: get_cycle_notification_body(
        format_date_input_value(add_days(window_item.predicted_start, -1)),
        "warning",
      ),
      badge: 1,
    },
    {
      offset: 0,
      id: 520100,
      title: translate("cycle_notification_today"),
      body: get_cycle_notification_body(window_item.predicted_start_text, "period"),
      actionTypeId: "CYCLE_CONFIRM",
      action: "start",
      badge: 1,
    },
    {
      date: window_item.predicted_end,
      id: 520200,
      title: translate("cycle_notification_end", period_length),
      body: get_cycle_notification_body(
        format_date_input_value(window_item.predicted_end),
        "period",
      ),
      actionTypeId: "CYCLE_CONFIRM",
      action: "end",
      badge: period_length,
    },
  ];
  const now = new Date();
  const notifications = schedule_items
    .map((item) => {
      const target_date = item.date
        ? item.date
        : add_days(window_item.predicted_start, item.offset || 0);
      const schedule_at = new Date(
        target_date.getFullYear(),
        target_date.getMonth(),
        target_date.getDate(),
        9,
        0,
        0,
      );

      if (schedule_at <= now) {
        return null;
      }

      return {
        id: item.id,
        title: item.title,
        body: item.body,
        largeBody: item.body,
        badge: item.badge,
        channelId: "cycle",
        actionTypeId: item.actionTypeId,
        extra: {
          kind: "cycle",
          action: item.action || "",
          date: format_date_input_value(target_date),
          periodLength: period_length,
        },
        schedule: {
          at: schedule_at,
          allowWhileIdle: true,
        },
      };
    })
    .filter(Boolean);

  try {
    await local_notifications.cancel({
      notifications: schedule_items.map((item) => ({ id: item.id })),
    });

    if (notifications.length > 0) {
      await local_notifications.schedule({ notifications });
    }
  } catch (error) {
    log_app_error("cycle_notifications_schedule_failed", error);
  }
}

function handle_local_notification_action(notification_action) {
  const notification = notification_action?.notification || {};
  const extra = notification.extra || notification.data || {};

  if (extra.kind === "message") {
    open_messages_for_reply(extra.messageId || "");
    return;
  }

  if (extra.kind === "cycle" && notification_action.actionId === "confirm") {
    if (extra.action === "start") {
      set_cycle_start_for_date(extra.date);
    } else if (extra.action === "end") {
      set_cycle_end_for_date(extra.date);
    }
  }
}

function open_messages_for_reply(message_id = "") {
  if (!current_user_profile) {
    return;
  }

  toggle_fullscreen_panel("messages", true);
  window.setTimeout(() => {
    if (message_id) {
      scroll_to_message_by_id(message_id);
    }

    dom_references.live_message_input?.focus();
  }, 120);
}

function handle_native_open_request(event) {
  if (event?.detail?.panel === "messages") {
    open_messages_for_reply(event.detail.messageId || "");
  }
}

function bind_event_handlers() {
  document.addEventListener("mousedown", handle_cycle_dialog_outside_click);
  document.addEventListener("mousedown", handle_cycle_mood_outside_click);
  document.addEventListener("pointerdown", handle_audio_unlock_pointerdown, {
    passive: true,
  });
  function handle_cycle_dialog_outside_click(event) {
    const dialog = dom_references.cycle_settings_dialog;
    if (!dialog?.open) return;
    const rect = dialog.getBoundingClientRect();
    const clickedInside =
      event.clientX >= rect.left &&
      event.clientX <= rect.right &&
      event.clientY >= rect.top &&
      event.clientY <= rect.bottom;
    if (!clickedInside) {
      attempt_close_cycle_dialog();
    }
  }
  async function attempt_close_cycle_dialog() {
    if (current_cycle_dialog_guard?.has_unsaved_changes) {
      const discard = await show_app_confirm(translate("cycle_discard_copy"), {
        title: translate("cycle_discard_changes"),
        confirm_label: translate("cycle_discard"),
      });
      if (!discard) return;
    }
    dom_references.cycle_settings_dialog?.close();
  }
  function handle_cycle_mood_outside_click(event) {
    if (!current_cycle_mood_picker_open) {
      return;
    }

    const picker = dom_references.cycle_day_mood_picker;
    const button = dom_references.cycle_day_mood_button;

    if (picker?.contains(event.target) || button?.contains(event.target)) {
      return;
    }

    current_cycle_mood_picker_open = false;
    render_cycle_day_detail();
  }
  dom_references.app_nav_toggle_button.addEventListener(
    "click",
    toggle_app_navigation,
  );
  dom_references.app_nav_overlay.addEventListener(
    "click",
    handle_app_navigation_click,
  );
  dom_references.app_nav_links.forEach((nav_button) =>
    nav_button.addEventListener("click", handle_app_navigation_link_click),
  );
  dom_references.language_toggle_button.addEventListener(
    "click",
    toggle_language,
  );
  dom_references.login_form.addEventListener("submit", handle_login);
  dom_references.username_input.addEventListener("input", () => {
    set_status_text(dom_references.login_error_message, "", "");
    update_login_email_hint();
  });
  dom_references.forgot_password_button.addEventListener(
    "click",
    handle_forgot_password_request,
  );
  dom_references.password_visibility_button?.addEventListener(
    "click",
    toggle_password_visibility,
  );
  dom_references.biometric_opt_in_checkbox?.addEventListener("change", () => {
    if (!dom_references.biometric_opt_in_checkbox.checked) {
      void clear_biometric_credentials();
    }
  });
  dom_references.biometric_login_button?.addEventListener(
    "click",
    handle_biometric_login,
  );
  dom_references.enter_home_button.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "heart", 10);
    enter_home_from_welcome();
  });
  dom_references.music_toggle_button.addEventListener("click", toggle_music);
  dom_references.music_previous_button?.addEventListener("click", () =>
    change_background_track(-1),
  );
  dom_references.music_play_pause_button?.addEventListener(
    "click",
    toggle_background_music_playback,
  );
  dom_references.music_next_button?.addEventListener("click", () =>
    change_background_track(1),
  );
  dom_references.music_add_button?.addEventListener("click", () =>
    dom_references.music_file_input?.click(),
  );
  dom_references.music_library_button?.addEventListener(
    "click",
    toggle_music_library_panel,
  );
  dom_references.music_file_input?.addEventListener(
    "change",
    handle_music_files_selected,
  );
  dom_references.music_library_panel?.addEventListener(
    "click",
    handle_music_library_action,
  );
  dom_references.memory_lightbox_download_button?.addEventListener(
    "click",
    handle_memory_lightbox_download,
  );
  dom_references.logout_button.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "spark", 8);
    handle_logout();
  });
  dom_references.theme_toggle_button.addEventListener("click", toggle_theme);
  dom_references.add_memory_button.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "heart", 8);
    prepare_new_memory();
  });
  dom_references.add_event_button.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "spark", 8);
    prepare_new_event();
  });
  dom_references.diab_birthday_wish_button.addEventListener("click", () =>
    start_birthday_wish("diab"),
  );
  dom_references.svetlana_birthday_wish_button.addEventListener("click", () =>
    start_birthday_wish("svetlana"),
  );
  dom_references.memory_gallery.addEventListener("click", handle_memory_action);
  dom_references.event_timeline.addEventListener("click", handle_event_action);
  dom_references.open_cycle_settings_button.addEventListener(
    "click",
    open_cycle_settings,
  );
  dom_references.cycle_previous_month_button.addEventListener("click", () =>
    shift_cycle_month(-1),
  );
  dom_references.cycle_month_label?.addEventListener(
    "click",
    open_cycle_month_picker,
  );
  dom_references.cycle_month_label?.addEventListener(
    "keydown",
    handle_cycle_month_label_keydown,
  );
  dom_references.cycle_month_picker_input?.addEventListener(
    "change",
    handle_cycle_month_picker_change,
  );
  dom_references.cycle_next_month_button.addEventListener("click", () =>
    shift_cycle_month(1),
  );
  dom_references.open_cycle_feeling_button.addEventListener("click", () =>
    open_cycle_feeling_dialog(),
  );
  dom_references.cycle_expand_button?.addEventListener("click", () =>
    toggle_fullscreen_panel("cycle"),
  );
  dom_references.cycle_compact_summary?.addEventListener("click", () =>
    toggle_fullscreen_panel("cycle", true),
  );
  dom_references.cycle_support_message.addEventListener(
    "click",
    handle_cycle_support_message_click,
  );
  dom_references.cycle_day_mood_button.addEventListener(
    "click",
    handle_cycle_day_mood_click,
  );
  dom_references.cycle_day_note_button.addEventListener(
    "click",
    handle_cycle_day_note_click,
  );
  dom_references.cycle_day_set_start_button?.addEventListener(
    "click",
    handle_cycle_day_set_start_click,
  );
  dom_references.cycle_day_set_end_button?.addEventListener(
    "click",
    handle_cycle_day_set_end_click,
  );
  dom_references.cycle_day_remove_button?.addEventListener(
    "click",
    handle_cycle_day_remove_click,
  );

  dom_references.cycle_shell.addEventListener(
    "touchstart",
    handle_cycle_calendar_touch_start,
    { passive: true },
  );
  dom_references.cycle_shell.addEventListener(
    "touchend",
    handle_cycle_calendar_touch_end,
    { passive: true },
  );
  dom_references.cycle_shell.addEventListener(
    "touchcancel",
    handle_cycle_calendar_touch_cancel,
    { passive: true },
  );
  dom_references.today_prank_card.addEventListener("click", (event) =>
    burst_reaction(event.currentTarget, "spark", 10),
  );
  dom_references.today_prank_message.addEventListener("click", (event) => {
    burst_emoji_reaction(
      event.currentTarget,
      ["😄", "😂", "😝", "😜", "🥳", "❤️"],
      18,
      [24, 40],
    );
  });
  dom_references.night_tale_card.addEventListener("click", (event) =>
    burst_reaction(event.currentTarget, "spark", 12),
  );
  dom_references.night_tale_message.addEventListener("click", (event) => {
    burst_emoji_reaction(
      event.currentTarget,
      night_tale_magic_emojis,
      16,
      [18, 32],
    );
  });
  dom_references.daily_love_note.addEventListener("click", (event) =>
    burst_reaction(event.currentTarget, "heart", 12),
  );
  dom_references.hero_symbol.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "spark", 18);
    burst_emoji_reaction(
      event.currentTarget,
      [...hero_firework_emojis, "💛", "🤍"],
      18,
      [24, 40],
    );
    show_hero_symbol_message();
  });
  dom_references.close_memory_dialog_button.addEventListener("click", () =>
    close_dialog(dom_references.memory_dialog),
  );
  dom_references.close_event_dialog_button.addEventListener("click", () =>
    close_dialog(dom_references.event_dialog),
  );
  dom_references.memory_form.addEventListener("submit", save_memory_from_form);
  dom_references.event_form.addEventListener("submit", save_event_from_form);
  dom_references.password_recovery_form.addEventListener(
    "submit",
    handle_password_recovery_submit,
  );
  dom_references.close_password_recovery_button.addEventListener(
    "click",
    close_password_recovery_dialog,
  );
  dom_references.cycle_settings_form.addEventListener(
    "submit",
    save_cycle_settings,
  );
  dom_references.close_cycle_settings_button.addEventListener("click", () =>
    request_cycle_dialog_close(dom_references.cycle_settings_dialog),
  );
  dom_references.cycle_feeling_form.addEventListener(
    "submit",
    save_cycle_feeling,
  );
  dom_references.close_cycle_feeling_button.addEventListener("click", () =>
    request_cycle_dialog_close(dom_references.cycle_feeling_dialog),
  );
  dom_references.cycle_length_input.addEventListener("input", () =>
    mark_cycle_dialog_dirty(dom_references.cycle_settings_dialog),
  );
  dom_references.cycle_duration_input.addEventListener("input", () =>
    mark_cycle_dialog_dirty(dom_references.cycle_settings_dialog),
  );
  dom_references.cycle_feeling_input.addEventListener("input", () =>
    mark_cycle_dialog_dirty(dom_references.cycle_feeling_dialog),
  );
  dom_references.cycle_settings_dialog.addEventListener(
    "cancel",
    handle_cycle_dialog_cancel,
  );
  dom_references.cycle_feeling_dialog.addEventListener(
    "cancel",
    handle_cycle_dialog_cancel,
  );
  dom_references.cycle_settings_dialog.addEventListener(
    "click",
    handle_cycle_dialog_backdrop_click,
  );
  dom_references.cycle_feeling_dialog.addEventListener(
    "click",
    handle_cycle_dialog_backdrop_click,
  );
  dom_references.cycle_settings_dialog.addEventListener(
    "touchstart",
    handle_cycle_dialog_touch_start,
    { passive: true },
  );
  dom_references.cycle_settings_dialog.addEventListener(
    "touchend",
    handle_cycle_dialog_touch_end,
    { passive: true },
  );
  dom_references.cycle_feeling_dialog.addEventListener(
    "touchstart",
    handle_cycle_dialog_touch_start,
    { passive: true },
  );
  dom_references.cycle_feeling_dialog.addEventListener(
    "touchend",
    handle_cycle_dialog_touch_end,
    { passive: true },
  );
  dom_references.cycle_discard_form.addEventListener(
    "submit",
    handle_cycle_discard_submit,
  );
  dom_references.close_cycle_discard_button.addEventListener(
    "click",
    close_cycle_discard_dialog,
  );
  dom_references.cancel_cycle_discard_button.addEventListener(
    "click",
    close_cycle_discard_dialog,
  );
  dom_references.app_notice_dialog.addEventListener(
    "cancel",
    handle_app_notice_cancel,
  );
  dom_references.app_notice_dialog.addEventListener(
    "click",
    handle_app_notice_backdrop_click,
  );
  dom_references.close_app_notice_button.addEventListener("click", () =>
    settle_app_notice_dialog(false),
  );
  dom_references.cancel_app_notice_button.addEventListener("click", () =>
    settle_app_notice_dialog(false),
  );
  dom_references.confirm_app_notice_button.addEventListener("click", () =>
    settle_app_notice_dialog(true),
  );
  dom_references.live_message_form.addEventListener(
    "submit",
    send_live_message,
  );
  dom_references.messages_expand_button?.addEventListener("click", () =>
    toggle_fullscreen_panel("messages"),
  );
  dom_references.messages_compact_summary?.addEventListener("click", () =>
    toggle_fullscreen_panel("messages", true),
  );
  dom_references.messages_search_button?.addEventListener(
    "click",
    open_messages_search,
  );
  dom_references.messages_search_close_button?.addEventListener(
    "click",
    close_messages_search,
  );
  dom_references.messages_search_input?.addEventListener(
    "input",
    handle_messages_search_input,
  );
  dom_references.messages_search_previous_button?.addEventListener(
    "click",
    () => move_message_search_match(-1),
  );
  dom_references.messages_search_next_button?.addEventListener("click", () =>
    move_message_search_match(1),
  );
  dom_references.message_visibility_button?.addEventListener(
    "click",
    toggle_presence_visibility,
  );
  dom_references.messages_scroll_bottom_button?.addEventListener(
    "click",
    (event) => {
      event.preventDefault();
      scroll_live_messages_to_bottom("smooth");
    },
  );
  dom_references.live_messages_list.addEventListener(
    "scroll",
    update_messages_scroll_button,
  );
  dom_references.live_messages_list.addEventListener(
    "click",
    handle_live_message_action,
  );
  dom_references.live_message_input.addEventListener(
    "focus",
    handle_live_message_input_focus,
  );
  dom_references.live_message_input.addEventListener(
    "blur",
    handle_live_message_input_blur,
  );
  dom_references.live_message_input.addEventListener(
    "mouseup",
    save_message_selection_range,
  );
  dom_references.live_messages_list.addEventListener(
    "pointerdown",
    handle_live_message_pointer_down,
  );
  dom_references.live_messages_list.addEventListener(
    "pointermove",
    handle_live_message_pointer_move,
  );
  dom_references.live_messages_list.addEventListener(
    "pointerup",
    handle_live_message_pointer_up,
  );
  dom_references.live_messages_list.addEventListener(
    "pointercancel",
    handle_live_message_pointer_cancel,
  );
  dom_references.live_message_files_input.addEventListener(
    "change",
    handle_live_message_files_selected,
  );
  dom_references.live_message_input.addEventListener(
    "input",
    auto_grow_live_message_input,
  );
  dom_references.live_message_input.addEventListener(
    "input",
    handle_message_input_change,
  );
  dom_references.live_message_input.addEventListener(
    "keydown",
    handle_live_message_keydown,
  );
  dom_references.live_message_input.addEventListener(
    "click",
    handle_live_message_input_click,
  );
  dom_references.live_message_input.addEventListener(
    "keyup",
    handle_message_input_change,
  );
  dom_references.live_message_input.addEventListener(
    "paste",
    handle_message_input_paste,
  );
  dom_references.emoji_toggle_button.addEventListener(
    "pointerdown",
    (event) => event.preventDefault(),
  );
  dom_references.emoji_toggle_button.addEventListener(
    "click",
    toggle_emoji_picker,
  );
  dom_references.clear_live_message_context_button.addEventListener(
    "click",
    clear_pending_message_context,
  );
  dom_references.memory_lightbox.addEventListener(
    "click",
    close_memory_lightbox,
  );
  document.addEventListener("click", handle_document_click);
  document.addEventListener("keydown", handle_global_keydown, true);
  document.addEventListener("touchstart", handle_emoji_edge_swipe_start, {
    passive: true,
  });
  document.addEventListener("touchend", handle_emoji_edge_swipe_end, {
    passive: true,
  });
  document.addEventListener("visibilitychange", handle_app_visibility_change);
  window.addEventListener("focus", () => {
    mark_current_user_seen(is_app_active_for_presence(), true);
    update_presence_status_text();
  });
  window.addEventListener("beforeunload", () => {
    mark_current_user_seen(false, true);
    close_live_messages_stream();
  });
  window.addEventListener("pagehide", () => {
    mark_current_user_seen(false, true);
    pause_background_music_for_lifecycle();
  });
  window.addEventListener("pageshow", resume_background_music_from_lifecycle);
  window.addEventListener("resize", handle_visual_viewport_change);
  window.visualViewport?.addEventListener("resize", handle_visual_viewport_change);
  window.visualViewport?.addEventListener("scroll", handle_visual_viewport_change);
  window.addEventListener("popstate", handle_global_popstate);
  window.addEventListener("svetaNativeOpen", handle_native_open_request);
  bind_capacitor_app_lifecycle();
}

function translate(key, ...args) {
  const active_pack = translations[current_language] || translations.en;
  const fallback_pack = translations.en;
  const value = key in active_pack ? active_pack[key] : fallback_pack[key];
  return typeof value === "function" ? value(...args) : value;
}

function set_text(element_or_selector, value) {
  const element =
    typeof element_or_selector === "string"
      ? document.querySelector(element_or_selector)
      : element_or_selector;

  if (element) {
    element.textContent = value;
  }
}

function set_placeholder(element, value) {
  if (element) {
    if ("placeholder" in element) {
      element.placeholder = value;
    } else {
      element.setAttribute("data-placeholder", value);
    }
  }
}

function set_status_text(element, message_text, status_type = "") {
  if (!element) {
    return;
  }

  element.textContent = message_text || "";
  element.classList.remove("is_success", "is_error");

  if (status_type === "success") {
    element.classList.add("is_success");
  }

  if (status_type === "error") {
    element.classList.add("is_error");
  }
}

function get_capacitor_plugin(plugin_name) {
  return window.Capacitor?.Plugins?.[plugin_name] || null;
}

function sync_authenticated_chrome() {
  document.body.classList.toggle("is_logged_in", Boolean(current_user_profile));
}

function toggle_password_visibility() {
  if (!dom_references.password_input) {
    return;
  }

  dom_references.password_input.type =
    dom_references.password_input.type === "password" ? "text" : "password";
  update_password_visibility_button();
}

function update_password_visibility_button() {
  const button = dom_references.password_visibility_button;

  if (!button || !dom_references.password_input) {
    return;
  }

  const is_visible = dom_references.password_input.type === "text";
  const label = translate(is_visible ? "hide_password" : "show_password");
  button.classList.toggle("is_visible", is_visible);
  button.setAttribute("aria-label", label);
  button.title = label;
}

function biometric_opt_in_is_enabled() {
  return localStorage.getItem(biometric_opt_in_storage_key) === "on";
}

function sync_biometric_opt_in_checkbox() {
  if (dom_references.biometric_opt_in_checkbox) {
    dom_references.biometric_opt_in_checkbox.checked = biometric_opt_in_is_enabled();
  }
}

function get_biometric_plugin() {
  return get_capacitor_plugin("NativeBiometric");
}

function biometric_credentials_are_fresh() {
  const last_password_at = Number(
    localStorage.getItem(biometric_last_password_key) || "0",
  );

  if (!last_password_at) {
    return false;
  }

  return Date.now() - last_password_at < 30 * 24 * 60 * 60 * 1000;
}

async function update_biometric_login_button() {
  const button = dom_references.biometric_login_button;

  if (!button) {
    return;
  }

  const biometric_plugin = get_biometric_plugin();
  let should_show = false;

  if (
    biometric_plugin &&
    biometric_opt_in_is_enabled() &&
    biometric_credentials_are_fresh()
  ) {
    try {
      const availability = await biometric_plugin.isAvailable({
        useFallback: true,
      });
      const saved_state = await biometric_plugin.isCredentialsSaved({
        server: background_sync_server_key,
      });
      should_show = Boolean(availability?.isAvailable && saved_state?.isSaved);
    } catch (error) {
      should_show = false;
    }
  }

  button.classList.toggle("hidden", !should_show);
  return should_show;
}

async function clear_biometric_credentials() {
  localStorage.removeItem(biometric_last_password_key);
  localStorage.removeItem(biometric_opt_in_storage_key);

  const biometric_plugin = get_biometric_plugin();

  if (biometric_plugin?.deleteCredentials) {
    try {
      await biometric_plugin.deleteCredentials({
        server: background_sync_server_key,
      });
    } catch (error) {
      log_app_error("biometric_credentials_clear_failed", error);
    }
  }

  sync_biometric_opt_in_checkbox();
  void update_biometric_login_button();
}

async function save_biometric_credentials(username, password) {
  const biometric_plugin = get_biometric_plugin();

  if (!biometric_plugin || !username || !password) {
    return;
  }

  try {
    const availability = await biometric_plugin.isAvailable({
      useFallback: true,
    });

    if (!availability?.isAvailable) {
      return;
    }

    await biometric_plugin.setCredentials({
      username,
      password,
      server: background_sync_server_key,
    });
    localStorage.setItem(biometric_last_password_key, String(Date.now()));
    localStorage.setItem(biometric_opt_in_storage_key, "on");
    sync_biometric_opt_in_checkbox();
    void update_biometric_login_button();
  } catch (error) {
    log_app_error("biometric_credentials_save_failed", error);
  }
}

async function handle_biometric_login({ is_auto_prompt = false } = {}) {
  const biometric_plugin = get_biometric_plugin();

  if (!biometric_plugin) {
    set_status_text(
      dom_references.login_error_message,
      translate("biometric_unavailable"),
      "error",
    );
    return;
  }

  if (!biometric_credentials_are_fresh()) {
    set_status_text(
      dom_references.login_error_message,
      translate("biometric_expired"),
      "error",
    );
    dom_references.biometric_login_button?.classList.add("hidden");
    sync_biometric_opt_in_checkbox();
    return;
  }

  try {
    await biometric_plugin.verifyIdentity({
      reason: translate("biometric_login"),
      title: translate("biometric_login"),
      subtitle: "Svetlana & Diab",
      useFallback: true,
    });
    const credentials = await biometric_plugin.getCredentials({
      server: background_sync_server_key,
    });
    const username = String(credentials?.username || "").trim().toLowerCase();
    const password = String(credentials?.password || "");
    const user_profile = await authenticate_user(username, password);

    if (!user_profile) {
      throw new Error("biometric_credentials_rejected");
    }

    await finish_successful_login(user_profile);
  } catch (error) {
    if (!is_auto_prompt) {
      log_app_error("biometric_login_failed", error);
      set_status_text(
        dom_references.login_error_message,
        translate("login_error"),
        "error",
      );
    }
  }
}

async function maybe_auto_prompt_biometric_login() {
  if (biometric_auto_prompt_attempted || current_user_profile) {
    return;
  }

  biometric_auto_prompt_attempted = true;
  const should_show = await update_biometric_login_button();

  if (!should_show) {
    return;
  }

  window.setTimeout(() => {
    if (!current_user_profile) {
      void handle_biometric_login({ is_auto_prompt: true });
    }
  }, 350);
}

function update_login_email_hint(custom_message = "", status_type = "") {
  if (!dom_references.login_email_hint) {
    return;
  }

  if (custom_message) {
    set_status_text(
      dom_references.login_email_hint,
      custom_message,
      status_type,
    );
    return;
  }

  if (!is_supabase_enabled()) {
    set_status_text(dom_references.login_email_hint, "", "");
    return;
  }

  const submitted_username = String(dom_references.username_input?.value || "")
    .trim()
    .toLowerCase();
  const supabase_user = get_supabase_user_config(submitted_username);
  const hint_text = supabase_user?.email
    ? translate("login_email_hint", supabase_user.email)
    : translate("login_email_hint_empty");

  set_status_text(dom_references.login_email_hint, hint_text, "");
}

function log_app_error(context_label, error) {
  window.console.error(`[sveta_app] ${context_label}`, error);
}

function parse_emoji_categories(source_text) {
  const category_list = [];
  let current_category = null;

  source_text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean)
    .forEach((line) => {
      if (/^[A-Za-z &]+$/.test(line)) {
        current_category = {
          id: line
            .toLowerCase()
            .replace(/[^a-z]+/g, "_")
            .replace(/^_|_$/g, ""),
          label: line,
          emojis: [],
        };
        category_list.push(current_category);
        return;
      }

      if (!current_category) {
        return;
      }

      current_category.emojis.push(
        ...line
          .split(/\s+/)
          .filter((token) => token && !/[A-Za-z]/.test(token) && token !== "&"),
      );
    });

  return category_list
    .map((category) => ({
      ...category,
      emojis: [...new Set(category.emojis)],
    }))
    .filter((category) => category.emojis.length > 0);
}

function build_emoji_picker() {
  if (!dom_references.emoji_picker_panel) {
    return;
  }

  dom_references.emoji_picker_panel.innerHTML = "";
  const category_list = get_emoji_categories_with_recent();
  const topbar = document.createElement("div");
  topbar.className = "emoji_picker_topbar";
  const tabs = document.createElement("div");
  tabs.className = "emoji_picker_tabs";
  const delete_button = document.createElement("button");
  delete_button.className = "emoji_picker_delete_button";
  delete_button.type = "button";
  delete_button.textContent = "⌫";
  delete_button.setAttribute("aria-label", "Delete");
  delete_button.addEventListener("pointerdown", (event) => {
    event.preventDefault();
    delete_last_composer_character();
  });
  delete_button.addEventListener("click", (event) => {
    event.preventDefault();
  });
  topbar.append(tabs, delete_button);
  const body = document.createElement("div");
  body.className = "emoji_picker_body";

  category_list.forEach((category) => {
    const section_id = `emoji_category_${category.id || "all"}`;
    const tab_button = document.createElement("button");
    tab_button.className = "emoji_picker_tab";
    tab_button.type = "button";
    tab_button.textContent = category.label;
    tab_button.setAttribute("aria-controls", section_id);
    tab_button.addEventListener("click", () => {
      const target_section = document.getElementById(section_id);

      if (target_section) {
        target_section.scrollIntoView({
          behavior: "smooth",
          block: "start",
          inline: "nearest",
        });
      }
    });
    tabs.appendChild(tab_button);

    const section = document.createElement("section");
    section.className = "emoji_picker_section";
    section.id = section_id;

    const heading = document.createElement("p");
    heading.className = "emoji_picker_section_heading";
    heading.textContent = category.label;
    section.appendChild(heading);

    const grid = document.createElement("div");
    grid.className = "emoji_picker_grid";

    category.emojis.forEach((emoji_character) => {
      const emoji_button = document.createElement("button");
      emoji_button.className = "emoji_picker_button";
      emoji_button.type = "button";
      emoji_button.textContent = emoji_character;
      emoji_button.setAttribute("aria-label", emoji_character);
      emoji_button.addEventListener("pointerdown", (event) =>
        event.preventDefault(),
      );
      emoji_button.addEventListener("click", () => {
        insert_emoji_at_cursor(emoji_character);
        record_emoji_usage(emoji_character);
      });
      grid.appendChild(emoji_button);
    });

    section.appendChild(grid);
    body.appendChild(section);
  });

  dom_references.emoji_picker_panel.append(topbar, body);
}

function toggle_emoji_picker(event) {
  event.stopPropagation();
  save_message_selection_range();

  if (dom_references.emoji_picker_panel.classList.contains("hidden")) {
    build_emoji_picker();
    update_emoji_picker_position();
    dom_references.emoji_picker_panel.classList.remove("hidden");
    document.body.classList.add("emoji_picker_open");
    open_overlay_layer("emoji_picker");
    preserve_live_messages_viewport_after_layout();
    return;
  }

  hide_emoji_picker(false, true);
}

function hide_emoji_picker(from_history = false, restore_keyboard = false) {
  const picker_was_open =
    dom_references.emoji_picker_panel &&
    !dom_references.emoji_picker_panel.classList.contains("hidden");

  if (!picker_was_open) {
    return;
  }

  dom_references.emoji_picker_panel.classList.add("hidden");
  document.body.classList.remove("emoji_picker_open");
  close_overlay_layer("emoji_picker", from_history);
  preserve_live_messages_viewport_after_layout();

  if (
    restore_keyboard &&
    dom_references.live_message_input &&
    dom_references.messages_section?.classList.contains("is_panel_expanded")
  ) {
    window.setTimeout(() => {
      dom_references.live_message_input.focus();
      if (!saved_message_selection_range) {
        place_caret_at_end(dom_references.live_message_input);
      }
    }, 80);
  }
}

function handle_emoji_edge_swipe_start(event) {
  if (
    !dom_references.emoji_picker_panel ||
    dom_references.emoji_picker_panel.classList.contains("hidden")
  ) {
    emoji_swipe_state = null;
    return;
  }

  const touch = event.changedTouches?.[0];

  if (!touch) {
    emoji_swipe_state = null;
    return;
  }

  const edge_size = 34;
  const from_edge =
    touch.clientX <= edge_size || touch.clientX >= window.innerWidth - edge_size;
  emoji_swipe_state = from_edge
    ? {
        start_x: touch.clientX,
        start_y: touch.clientY,
      }
    : null;
}

function handle_emoji_edge_swipe_end(event) {
  if (!emoji_swipe_state) {
    return;
  }

  const touch = event.changedTouches?.[0];
  const state = emoji_swipe_state;
  emoji_swipe_state = null;

  if (!touch) {
    return;
  }

  const dx = touch.clientX - state.start_x;
  const dy = touch.clientY - state.start_y;

  if (Math.abs(dx) >= 54 && Math.abs(dx) > Math.abs(dy) * 1.35) {
    hide_emoji_picker(false, true);
  }
}

function handle_document_click(event) {
  const clicked_inside_nav = dom_references.app_nav_drawer.contains(
    event.target,
  );
  const clicked_nav_toggle = dom_references.app_nav_toggle_button.contains(
    event.target,
  );
  const clicked_inside_form = dom_references.live_message_form.contains(
    event.target,
  );
  const clicked_inside_picker = dom_references.emoji_picker_panel.contains(
    event.target,
  );
  const clicked_inside_mention = dom_references.mention_search_panel.contains(
    event.target,
  );
  const clicked_toggle_button = dom_references.emoji_toggle_button.contains(
    event.target,
  );
  const clicked_music_panel =
    dom_references.music_library_panel?.contains(event.target) ||
    dom_references.music_library_button?.contains(event.target);

  if (
    !clicked_inside_form &&
    !clicked_inside_picker &&
    !clicked_toggle_button &&
    !dom_references.emoji_picker_panel.classList.contains("hidden")
  ) {
    hide_emoji_picker(false, true);
  }

  if (!clicked_inside_form && !clicked_inside_mention) {
    hide_mention_search();
  }

  if (!clicked_inside_nav && !clicked_nav_toggle) {
    close_app_navigation();
  }

  if (!clicked_music_panel) {
    dom_references.music_library_panel?.classList.add("hidden");
  }
}

function save_message_selection_range() {
  const selection = window.getSelection();
  const input = dom_references.live_message_input;

  if (
    !selection ||
    selection.rangeCount === 0 ||
    !input ||
    !input.contains(selection.getRangeAt(0).startContainer)
  ) {
    return;
  }

  saved_message_selection_range = selection.getRangeAt(0).cloneRange();
}

function insert_emoji_at_cursor(emoji_character) {
  const selection = window.getSelection();
  const input = dom_references.live_message_input;
  const picker_open =
    !dom_references.emoji_picker_panel.classList.contains("hidden");
  const range = picker_open
    ? saved_message_selection_range
    : selection && selection.rangeCount > 0
      ? selection.getRangeAt(0)
      : null;

  if (!picker_open) {
    input.focus();
  }

  if (!range || !input.contains(range.startContainer)) {
    input.appendChild(document.createTextNode(emoji_character));
    if (!picker_open) {
      place_caret_at_end(input);
    }
  } else {
    range.deleteContents();
    const emoji_node = document.createTextNode(emoji_character);
    range.insertNode(emoji_node);
    range.setStartAfter(emoji_node);
    range.collapse(true);
    saved_message_selection_range = range.cloneRange();

    if (!picker_open && selection) {
      selection.removeAllRanges();
      selection.addRange(range);
    }
  }

  auto_grow_live_message_input();
  update_active_mention_search();
}

function delete_last_composer_character() {
  const input = dom_references.live_message_input;

  if (!input) {
    return;
  }

  while (
    input.lastChild &&
    input.lastChild.nodeType === Node.TEXT_NODE &&
    !input.lastChild.textContent
  ) {
    input.removeChild(input.lastChild);
  }

  const walker = document.createTreeWalker(input, NodeFilter.SHOW_TEXT);
  let last_text_node = null;

  while (walker.nextNode()) {
    last_text_node = walker.currentNode;
  }

  if (last_text_node && last_text_node.textContent.length > 0) {
    last_text_node.textContent = Array.from(last_text_node.textContent)
      .slice(0, -1)
      .join("");
  } else if (input.lastChild) {
    input.removeChild(input.lastChild);
  }

  place_caret_at_end(input);
  save_message_selection_range();
  auto_grow_live_message_input();
  update_active_mention_search();
}

function toggle_app_navigation() {
  const should_open =
    dom_references.app_nav_overlay.classList.contains("hidden");
  dom_references.app_nav_overlay.classList.toggle("hidden", !should_open);
  dom_references.app_nav_overlay.setAttribute(
    "aria-hidden",
    String(!should_open),
  );
}

function close_app_navigation() {
  dom_references.app_nav_overlay.classList.add("hidden");
  dom_references.app_nav_overlay.setAttribute("aria-hidden", "true");
}

function set_panel_expand_button_state(button, is_open, open_label, close_label) {
  if (!button) {
    return;
  }

  const label = is_open ? close_label : open_label;
  button.setAttribute("aria-expanded", String(is_open));
  button.setAttribute("aria-label", label);
  button.title = label;
}

function sync_fullscreen_panel_state() {
  const messages_open = fullscreen_panel_name === "messages";
  const cycle_open = fullscreen_panel_name === "cycle";

  dom_references.messages_section?.classList.toggle(
    "is_panel_expanded",
    messages_open,
  );
  dom_references.cycle_tracker_section?.classList.toggle(
    "is_panel_expanded",
    cycle_open,
  );
  document.body.classList.toggle(
    "panel_fullscreen_open",
    messages_open,
  );
  set_text(
    dom_references.live_messages_heading,
    translate(messages_open ? "messages_short_heading" : "live_messages_heading"),
  );
  set_panel_expand_button_state(
    dom_references.messages_expand_button,
    messages_open,
    translate("expand_messages"),
    translate("close_messages"),
  );
  set_panel_expand_button_state(
    dom_references.cycle_expand_button,
    cycle_open,
    translate("expand_cycle_calendar"),
    translate("close_cycle_calendar"),
  );
  dom_references.messages_compact_summary?.setAttribute(
    "aria-label",
    translate("open_messages"),
  );
  dom_references.cycle_compact_summary?.setAttribute(
    "aria-label",
    translate("open_cycle_calendar"),
  );
}

function apply_saved_cycle_panel_state() {
  if (fullscreen_panel_name === "messages") {
    return;
  }

  fullscreen_panel_name =
    localStorage.getItem(cycle_panel_open_storage_key) === "closed"
      ? ""
      : "cycle";
  cycle_panel_user_compacted = fullscreen_panel_name !== "cycle";
  cycle_panel_auto_expanded = false;
  sync_fullscreen_panel_state();
}

function persist_cycle_panel_state() {
  localStorage.setItem(
    cycle_panel_open_storage_key,
    fullscreen_panel_name === "cycle" ? "open" : "closed",
  );
}

function toggle_fullscreen_panel(panel_name, force_open = false) {
  const should_open = force_open || fullscreen_panel_name !== panel_name;

  if (panel_name === "cycle" && !should_open) {
    cycle_panel_user_compacted = true;
    cycle_panel_auto_expanded = false;
  } else if (panel_name === "cycle" && should_open && !force_open) {
    cycle_panel_user_compacted = false;
    cycle_panel_auto_expanded = false;
  }

  fullscreen_panel_name = should_open ? panel_name : "";
  sync_fullscreen_panel_state();

  if (panel_name === "cycle") {
    persist_cycle_panel_state();
  }

  if (fullscreen_panel_name) {
    const target =
      panel_name === "messages"
        ? dom_references.messages_section
        : dom_references.cycle_tracker_section;
    if (panel_name === "messages") {
      window.setTimeout(() => {
        scroll_live_messages_to_bottom("auto");
        dom_references.live_message_composer?.scrollIntoView({
          behavior: "auto",
          block: "end",
        });
      }, 80);
    } else {
      target?.scrollIntoView({ behavior: "smooth", block: "start" });
    }
  }
}

function should_auto_expand_cycle_panel(today_context, cycle_message_event) {
  return Boolean(
    cycle_message_event &&
      today_context?.today_status?.state === "period",
  );
}

function sync_cycle_auto_expansion(today_context, cycle_message_event) {
  const should_auto_expand = should_auto_expand_cycle_panel(
    today_context,
    cycle_message_event,
  );

  if (!should_auto_expand) {
    cycle_panel_user_compacted = false;

    if (cycle_panel_auto_expanded && fullscreen_panel_name === "cycle") {
      fullscreen_panel_name = "";
      sync_fullscreen_panel_state();
    }

    cycle_panel_auto_expanded = false;
    return;
  }

  if (
    !cycle_panel_user_compacted &&
    fullscreen_panel_name !== "messages" &&
    fullscreen_panel_name !== "cycle"
  ) {
    fullscreen_panel_name = "cycle";
    cycle_panel_auto_expanded = true;
    sync_fullscreen_panel_state();
  }
}

function handle_app_navigation_click(event) {
  if (event.target === dom_references.app_nav_overlay) {
    close_app_navigation();
  }
}

function handle_app_navigation_link_click(event) {
  const target_id = event.currentTarget.dataset.target;
  const target = target_id ? document.getElementById(target_id) : null;

  if (target) {
    set_active_navigation_target(target_id);
    close_app_navigation();

    if (target_id === "messages_section") {
      toggle_fullscreen_panel("messages", true);
      return;
    }

    if (target_id === "cycle_tracker_section") {
      toggle_fullscreen_panel("cycle", true);
      return;
    }

    if (fullscreen_panel_name) {
      fullscreen_panel_name = "";
      sync_fullscreen_panel_state();
    }
    window.requestAnimationFrame(() =>
      window.requestAnimationFrame(() => scroll_to_section(target)),
    );
    return;
  }

  close_app_navigation();
}

function set_active_navigation_target(target_id) {
  dom_references.app_nav_links.forEach((nav_button) => {
    nav_button.classList.toggle(
      "is_active",
      nav_button.dataset.target === target_id,
    );
  });
}

function initialize_section_navigation_observer() {
  if (typeof IntersectionObserver !== "function") {
    return;
  }

  const target_sections = dom_references.app_nav_links
    .map((nav_button) => document.getElementById(nav_button.dataset.target))
    .filter(Boolean);

  const observer = new IntersectionObserver(
    (entries) => {
      const visible_sections = entries
        .filter((entry) => entry.isIntersecting)
        .sort(
          (left_entry, right_entry) =>
            right_entry.intersectionRatio - left_entry.intersectionRatio,
        );

      if (visible_sections[0]?.target?.id) {
        set_active_navigation_target(visible_sections[0].target.id);
      }
    },
    {
      root: null,
      threshold: [0.2, 0.35, 0.5],
      rootMargin: "-14% 0px -48% 0px",
    },
  );

  target_sections.forEach((section) => observer.observe(section));
}

function get_plain_text_snippet(input_text, max_length = 50) {
  const normalized_text = String(input_text || "")
    .replace(/\s+/g, " ")
    .trim();
  return normalized_text.length > max_length
    ? `${normalized_text.slice(0, max_length - 3)}...`
    : normalized_text;
}

function handle_message_input_change() {
  auto_grow_live_message_input();
  update_active_mention_search();
  const has_text = Boolean(
    String(dom_references.live_message_input?.textContent || "").trim(),
  );
  mark_current_user_typing(has_text);
}

function handle_live_message_input_focus() {
  save_message_selection_range();

  if (
    dom_references.emoji_picker_panel &&
    !dom_references.emoji_picker_panel.classList.contains("hidden")
  ) {
    hide_emoji_picker(false, false);
  }
}

function handle_live_message_input_click() {
  if (
    dom_references.emoji_picker_panel &&
    !dom_references.emoji_picker_panel.classList.contains("hidden")
  ) {
    hide_emoji_picker(false, false);
  }

  handle_message_input_change();
}

function handle_live_message_input_blur() {
  mark_current_user_typing(false);
}

function handle_message_input_paste(event) {
  event.preventDefault();
  const pasted_text = event.clipboardData?.getData("text/plain") || "";
  insert_text_at_caret(pasted_text);
  handle_message_input_change();
}

function insert_text_at_caret(text_value) {
  const selection = window.getSelection();
  const range =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  if (
    !range ||
    !dom_references.live_message_input.contains(range.startContainer)
  ) {
    dom_references.live_message_input.appendChild(
      document.createTextNode(text_value),
    );
    place_caret_at_end(dom_references.live_message_input);
    return;
  }

  range.deleteContents();
  const text_node = document.createTextNode(text_value);
  range.insertNode(text_node);
  range.setStartAfter(text_node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function get_current_mention_query() {
  const selection = window.getSelection();

  if (!selection || selection.rangeCount === 0) {
    return null;
  }

  let node = selection.anchorNode;
  let offset = selection.anchorOffset;

  if (!node || !dom_references.live_message_input.contains(node)) {
    return null;
  }

  if (node.nodeType !== Node.TEXT_NODE) {
    const previous_node = node.childNodes[offset - 1];

    if (previous_node && previous_node.nodeType === Node.TEXT_NODE) {
      node = previous_node;
      offset = previous_node.textContent.length;
    } else {
      return null;
    }
  }

  const text_before = node.textContent.slice(0, offset);
  const match = text_before.match(/(?:^|\s)@([^\s@]{0,40})$/);

  if (!match) {
    return null;
  }

  return {
    query: match[1].toLowerCase(),
    text_node: node,
    start_offset: offset - match[1].length - 1,
    end_offset: offset,
  };
}

function search_memory_mentions(query_text) {
  const safe_query = String(query_text || "")
    .trim()
    .toLowerCase();
  const memory_candidates = current_memory_items
    .filter((item) => !item.is_placeholder)
    .map((item) => {
      const clean_thought_text = get_item_thought_preview(item, "note");
      return {
        reference_type: "memory",
        title: item.title,
        subtitle: get_item_display_date(item, "fallback_memory_date"),
        preview_text: "",
        search_blob: [
          item.title,
          clean_thought_text,
          get_item_display_date(item, "fallback_memory_date"),
        ]
          .join(" ")
          .toLowerCase(),
        mention_data: build_mention_context("memory", item.id),
      };
    });
  const event_candidates = current_event_items.map((item) => {
    const clean_thought_text = get_item_thought_preview(item, "description");
    return {
      reference_type: "event",
      title: item.title,
      subtitle: get_item_display_date(item, "fallback_event_date"),
      preview_text: "",
      search_blob: [
        item.title,
        clean_thought_text,
        get_item_display_date(item, "fallback_event_date"),
      ]
        .join(" ")
        .toLowerCase(),
      mention_data: build_mention_context("event", item.id),
    };
  });

  return [...memory_candidates, ...event_candidates]
    .filter((item) => item.mention_data)
    .filter((item) => !safe_query || item.search_blob.includes(safe_query))
    .slice(0, 8);
}

function get_reference_type_label(reference_type) {
  return reference_type === "event"
    ? translate("mention_type_day")
    : translate("mention_type_memory");
}

function get_reference_type_icon_class(reference_type) {
  return reference_type === "event" ? "is_event" : "is_memory";
}

function update_active_mention_search() {
  active_mention_query = get_current_mention_query();

  if (!active_mention_query) {
    hide_mention_search();
    return;
  }

  mention_search_results = search_memory_mentions(active_mention_query.query);
  mention_search_active_index = 0;
  render_mention_search_panel();
}

function render_mention_search_panel() {
  dom_references.mention_search_panel.innerHTML = "";

  if (!active_mention_query) {
    hide_mention_search();
    return;
  }

  if (mention_search_results.length === 0) {
    const empty_state = document.createElement("p");
    empty_state.className = "mention_result_snippet";
    empty_state.textContent = translate("mention_search_empty");
    dom_references.mention_search_panel.appendChild(empty_state);
  } else {
    mention_search_results.forEach((result_item, index) => {
      const result_button = document.createElement("button");
      result_button.className = `mention_result_item${index === mention_search_active_index ? " is_active" : ""}`;
      result_button.type = "button";
      result_button.dataset.referenceId = result_item.mention_data.reference_id;
      result_button.addEventListener("click", () =>
        insert_memory_mention(result_item.mention_data),
      );
      const memory_item = result_item.mention_data;

      const title = document.createElement("div");
      title.className = "mention_result_title";
      title.innerHTML = `<span class="mention_chip_icon">♡</span><span>${escape_html(memory_item.title)}</span>`;
      title.textContent = "";
      title.append(
        create_inline_chip_icon(result_item.reference_type),
        create_inline_chip_text(result_item.title || ""),
        create_mention_result_badge(
          get_reference_type_label(result_item.reference_type),
        ),
      );
      const meta = document.createElement("p");
      meta.className = "mention_result_meta";
      meta.textContent = result_item.subtitle || "";
      const snippet = document.createElement("p");
      snippet.className = "mention_result_snippet";
      snippet.textContent = result_item.preview_text || "";
      result_button.append(title, meta);
      if (snippet.textContent) {
        result_button.appendChild(snippet);
      }
      dom_references.mention_search_panel.appendChild(result_button);
    });
  }

  dom_references.mention_search_panel.classList.remove("hidden");
}

function create_mention_result_badge(label_text) {
  const badge = document.createElement("span");
  badge.className = "mention_result_badge";
  badge.textContent = label_text;
  return badge;
}

function hide_mention_search() {
  active_mention_query = null;
  mention_search_results = [];
  mention_search_active_index = 0;
  dom_references.mention_search_panel.classList.add("hidden");
}

function insert_memory_mention(mention_item) {
  if (!active_mention_query) {
    return;
  }

  const range = document.createRange();
  range.setStart(
    active_mention_query.text_node,
    active_mention_query.start_offset,
  );
  range.setEnd(active_mention_query.text_node, active_mention_query.end_offset);
  range.deleteContents();

  const chip = create_composer_mention_chip(mention_item);
  const spacer = document.createTextNode(" ");
  range.insertNode(spacer);
  range.insertNode(chip);
  place_caret_after_node(spacer);
  hide_mention_search();
  auto_grow_live_message_input();
}

function create_composer_mention_chip(mention_data) {
  const chip = document.createElement("span");
  chip.className = "composer_mention_chip";
  chip.contentEditable = "false";
  chip.dataset.mention = "true";
  chip.dataset.referenceType = mention_data.reference_type || "memory";
  chip.dataset.referenceId = mention_data.reference_id || "";
  chip.dataset.title = mention_data.title || "";
  chip.dataset.subtitle = mention_data.subtitle || "";
  chip.dataset.text = mention_data.text || "";

  const icon = document.createElement("span");
  icon.className = "mention_chip_icon";
  icon.textContent = "♡";
  const text = document.createElement("span");
  text.className = "mention_chip_text";
  text.textContent = mention_data.title || "";
  const remove_button = document.createElement("button");
  remove_button.className = "composer_mention_remove";
  remove_button.type = "button";
  remove_button.setAttribute("aria-label", translate("delete"));
  remove_button.textContent = "×";
  remove_button.addEventListener("click", (event) => {
    event.preventDefault();
    chip.remove();
    handle_message_input_change();
  });

  chip.append(
    create_inline_chip_icon(mention_data.reference_type),
    create_inline_chip_text(mention_data.title || ""),
    remove_button,
  );
  return chip;
}

function create_message_mention_chip(mention_data) {
  const chip = document.createElement("button");
  chip.className = "message_mention_chip";
  chip.type = "button";
  chip.dataset.referenceType = mention_data.reference_type || "memory";
  chip.dataset.referenceId = mention_data.reference_id || "";
  chip.title = mention_data.text || mention_data.title || "";
  chip.append(
    create_inline_chip_icon(mention_data.reference_type),
    create_inline_chip_text(mention_data.title || ""),
  );
  chip.addEventListener("click", () => open_mentioned_item(mention_data));
  return chip;
}

function insert_manual_mention(mention_data) {
  const chip = create_composer_mention_chip(mention_data);
  const spacer = document.createTextNode(" ");
  dom_references.live_message_input.focus();
  insert_node_at_caret(chip);
  insert_node_at_caret(spacer);
  place_caret_after_node(spacer);
  hide_mention_search();
  auto_grow_live_message_input();
}

function insert_node_at_caret(node) {
  const selection = window.getSelection();
  const range =
    selection && selection.rangeCount > 0 ? selection.getRangeAt(0) : null;

  if (
    !range ||
    !dom_references.live_message_input.contains(range.startContainer)
  ) {
    dom_references.live_message_input.appendChild(node);
    return;
  }

  range.insertNode(node);
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
}

function create_inline_chip_icon(reference_type = "memory") {
  const icon = document.createElement("span");
  icon.className = "mention_chip_icon";
  icon.dataset.referenceType = reference_type;
  icon.textContent = "♡";
  icon.textContent = "";
  return icon;
}

function create_inline_chip_text(text_value) {
  const text = document.createElement("span");
  text.className = "mention_chip_text";
  text.textContent = text_value;
  return text;
}

function open_mentioned_item(mention_data) {
  const open_reference = () => {
    if (mention_data.reference_type === "memory") {
      const target = dom_references.memory_gallery.querySelector(
        `[data-memory-id='${mention_data.reference_id}'], [data-memory_id='${mention_data.reference_id}']`,
      );

      if (target) {
        scroll_to_and_highlight(target);
      }

      return;
    }

    const target = dom_references.event_timeline.querySelector(
      `[data-event-id='${mention_data.reference_id}']`,
    );

    if (target) {
      scroll_to_and_highlight(target);
    }
  };

  if (fullscreen_panel_name === "messages") {
    fullscreen_panel_name = "";
    sync_fullscreen_panel_state();
    window.setTimeout(open_reference, 80);
    return;
  }

  open_reference();
}

function open_cycle_note_reference(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const parsed_date = parse_local_date(normalized_date);

  if (Number.isNaN(parsed_date.getTime())) {
    return;
  }

  current_selected_cycle_date = normalized_date;
  current_open_cycle_note_date = normalized_date;
  current_cycle_mood_picker_open = false;
  current_cycle_month_anchor = get_month_anchor(parsed_date);
  if (fullscreen_panel_name === "messages") {
    fullscreen_panel_name = "cycle";
    persist_cycle_panel_state();
    sync_fullscreen_panel_state();
  } else if (fullscreen_panel_name !== "cycle") {
    fullscreen_panel_name = "cycle";
    persist_cycle_panel_state();
    sync_fullscreen_panel_state();
  }
  render_cycle_calendar();
  const target = current_cycle_calendar_buttons.get(normalized_date);

  if (target) {
    scroll_to_and_highlight(target);
    return;
  }

  if (dom_references.cycle_shell) {
    scroll_to_and_highlight(dom_references.cycle_shell);
  }
}

function scroll_to_and_highlight(target_element) {
  target_element.scrollIntoView({ behavior: "smooth", block: "center" });
  target_element.classList.add("is_temporarily_highlighted");
  window.setTimeout(
    () => target_element.classList.remove("is_temporarily_highlighted"),
    1800,
  );
}

function scroll_to_section(target_element) {
  const top =
    target_element.getBoundingClientRect().top +
    window.scrollY -
    Math.min(92, Math.max(56, window.innerHeight * 0.08));
  window.scrollTo({
    top: Math.max(0, top),
    behavior: "smooth",
  });
}

function scroll_to_message_by_id(message_id) {
  const target = dom_references.live_messages_list.querySelector(
    `[data-message-id='${message_id}']`,
  );

  if (target) {
    scroll_to_and_highlight(target);
  }
}

function place_caret_after_node(node) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.setStartAfter(node);
  range.collapse(true);
  selection.removeAllRanges();
  selection.addRange(range);
  dom_references.live_message_input.focus();
}

function place_caret_at_end(target_element) {
  const selection = window.getSelection();
  const range = document.createRange();
  range.selectNodeContents(target_element);
  range.collapse(false);
  selection.removeAllRanges();
  selection.addRange(range);
}

function escape_html(text_value) {
  return String(text_value || "")
    .replaceAll("&", "&amp;")
    .replaceAll("<", "&lt;")
    .replaceAll(">", "&gt;");
}

function apply_saved_language() {
  const saved_language = localStorage.getItem(language_storage_key);
  current_language = language_cycle.includes(saved_language)
    ? saved_language
    : "en";
  document.documentElement.lang = translate("document_language");
  document.documentElement.dir = current_language === "ar" ? "rtl" : "ltr";
}

function toggle_language() {
  const current_index = language_cycle.indexOf(current_language);
  const next_index = (current_index + 1) % language_cycle.length;
  current_language = language_cycle[next_index];
  localStorage.setItem(language_storage_key, current_language);
  apply_language();
  burst_reaction(dom_references.language_toggle_button, "spark", 8);
}

function apply_language() {
  const active_language = language_config[current_language];
  document.documentElement.lang = translate("document_language");
  document.documentElement.dir = current_language === "ar" ? "rtl" : "ltr";
  dom_references.language_flag_icon.src = active_language.flag_path;
  dom_references.language_flag_icon.alt = active_language.alt;
  dom_references.language_toggle_label.textContent = active_language.label;
  dom_references.language_toggle_button.setAttribute(
    "aria-label",
    translate("language_switch_hint"),
  );
  dom_references.language_toggle_button.title = translate(
    "language_switch_hint",
  );
  set_text(dom_references.app_nav_toggle_label, translate("menu_button_label"));
  dom_references.app_nav_toggle_button.setAttribute(
    "aria-label",
    translate("menu_button_label"),
  );
  dom_references.app_nav_toggle_button.title = translate("menu_button_label");
  dom_references.music_control_pill?.setAttribute(
    "aria-label",
    translate("music_controls_label"),
  );
  dom_references.music_previous_button?.setAttribute(
    "aria-label",
    translate("music_previous_track"),
  );
  if (dom_references.music_previous_button) {
    dom_references.music_previous_button.title = translate(
      "music_previous_track",
    );
  }
  dom_references.music_next_button?.setAttribute(
    "aria-label",
    translate("music_next_track"),
  );
  if (dom_references.music_next_button) {
    dom_references.music_next_button.title = translate("music_next_track");
  }
  dom_references.music_add_button?.setAttribute(
    "aria-label",
    translate("music_add_track"),
  );
  if (dom_references.music_add_button) {
    dom_references.music_add_button.title = translate("music_add_track");
  }
  dom_references.music_library_button?.setAttribute(
    "aria-label",
    translate("music_library"),
  );
  if (dom_references.music_library_button) {
    dom_references.music_library_button.title = translate("music_library");
  }

  set_text(dom_references.login_panel_eyebrow, translate("login_eyebrow"));
  set_text(dom_references.login_copy, translate("login_copy"));
  set_text(dom_references.memory_title_label, translate("title_label"));
  set_text(dom_references.memory_date_label, translate("date_label"));
  set_text(dom_references.memory_note_label, translate("note_label"));
  set_text(dom_references.memory_image_label, translate("picture_label"));
  set_text(dom_references.event_title_label, translate("title_label"));
  set_text(dom_references.event_date_label, translate("date_label"));
  set_text(
    dom_references.event_description_label,
    translate("event_description_label"),
  );
  set_text(
    document.querySelector("label[for='username_input']"),
    translate("username_label"),
  );
  set_text(
    document.querySelector("label[for='password_input']"),
    translate("password_label"),
  );
  set_placeholder(
    dom_references.username_input,
    translate("username_placeholder"),
  );
  set_placeholder(
    dom_references.password_input,
    translate("password_placeholder"),
  );
  set_text(
    dom_references.forgot_password_button,
    translate("forgot_password_button"),
  );
  set_text(dom_references.biometric_login_button, translate("biometric_login"));
  set_text(
    dom_references.biometric_opt_in_text,
    translate("biometric_opt_in_label"),
  );
  set_text(dom_references.login_button, translate("login_button"));
  update_login_email_hint();
  set_text(dom_references.welcome_kicker, translate("welcome_kicker"));
  set_text(dom_references.enter_home_button, translate("enter_home_button"));
  set_text(dom_references.home_header_eyebrow, translate("header_eyebrow"));
  set_text(dom_references.logout_button, translate("logout_button"));
  set_text(dom_references.hero_eyebrow, translate("hero_eyebrow"));
  set_text(dom_references.hero_heading, translate("hero_heading"));
  set_text(
    dom_references.today_prank_heading,
    translate("today_prank_heading"),
  );
  set_text(dom_references.night_tale_eyebrow, translate("night_tale_eyebrow"));
  set_text(dom_references.night_tale_heading, translate("night_tale_heading"));
  set_text(dom_references.time_eyebrow, translate("time_eyebrow"));
  set_text(dom_references.time_heading, translate("time_heading"));
  set_text(dom_references.days_label, translate("days_label"));
  set_text(dom_references.days_note, translate("days_note"));
  set_text(dom_references.years_label, translate("years_label"));
  set_text(dom_references.years_note, translate("years_note"));
  set_text(dom_references.diab_age_label, translate("diab_age_label"));
  set_text(dom_references.diab_age_note, translate("diab_age_note"));
  set_text(dom_references.svetlana_age_label, translate("svetlana_age_label"));
  set_text(dom_references.svetlana_age_note, translate("svetlana_age_note"));
  set_text(
    dom_references.diab_birthday_label,
    translate("diab_birthday_label"),
  );
  set_text(
    dom_references.svetlana_birthday_label,
    translate("svetlana_birthday_label"),
  );
  set_text(dom_references.gallery_eyebrow, translate("gallery_eyebrow"));
  set_text(dom_references.memory_gallery_heading, translate("gallery_heading"));
  set_text(dom_references.add_memory_button, translate("add_memory"));
  set_text(dom_references.events_eyebrow, translate("events_eyebrow"));
  set_text(dom_references.event_timeline_heading, translate("events_heading"));
  set_text(dom_references.add_event_button, translate("add_event"));
  set_text(dom_references.cycle_eyebrow, translate("cycle_eyebrow"));
  set_text(dom_references.cycle_heading, translate("cycle_heading"));
  set_text(
    dom_references.open_cycle_settings_button,
    translate("cycle_settings"),
  );
  set_text(
    dom_references.cycle_period_legend,
    translate("cycle_period_legend"),
  );
  set_text(
    dom_references.cycle_predicted_legend,
    translate("cycle_predicted_legend"),
  );
  set_text(
    dom_references.cycle_fertile_legend,
    translate("cycle_fertile_legend"),
  );
  set_text(
    dom_references.cycle_ovulation_legend,
    translate("cycle_ovulation_legend"),
  );
  set_text(
    dom_references.open_cycle_feeling_button,
    current_user_profile?.user_key === "diab"
      ? translate("cycle_reply_softly")
      : translate("cycle_write_feeling"),
  );
  dom_references.cycle_month_label?.setAttribute(
    "aria-label",
    translate("cycle_jump_to_month"),
  );
  dom_references.cycle_month_label?.setAttribute(
    "title",
    translate("cycle_jump_to_month"),
  );
  dom_references.cycle_month_picker_input?.setAttribute(
    "aria-label",
    translate("cycle_jump_to_month"),
  );
  set_text(
    dom_references.cycle_day_mood_button,
    translate("cycle_mood_button"),
  );
  set_text(dom_references.cycle_day_note_button, translate("cycle_add_note"));
  set_text(
    dom_references.cycle_day_set_start_button,
    translate("cycle_set_start"),
  );
  set_text(dom_references.cycle_day_set_end_button, translate("cycle_set_end"));
  set_text(
    dom_references.cycle_day_remove_button,
    translate("cycle_remove_entry"),
  );
  set_text(
    dom_references.live_messages_eyebrow,
    translate("live_messages_eyebrow"),
  );
  set_text(
    dom_references.live_messages_heading,
    translate("live_messages_heading"),
  );
  dom_references.messages_search_button?.setAttribute(
    "aria-label",
    translate("messages_search"),
  );
  if (dom_references.messages_search_button) {
    dom_references.messages_search_button.title = translate("messages_search");
  }
  set_placeholder(
    dom_references.messages_search_input,
    translate("messages_search_placeholder"),
  );
  dom_references.messages_search_previous_button?.setAttribute(
    "aria-label",
    translate("messages_search_previous"),
  );
  if (dom_references.messages_search_previous_button) {
    dom_references.messages_search_previous_button.title = translate(
      "messages_search_previous",
    );
  }
  dom_references.messages_search_next_button?.setAttribute(
    "aria-label",
    translate("messages_search_next"),
  );
  if (dom_references.messages_search_next_button) {
    dom_references.messages_search_next_button.title = translate(
      "messages_search_next",
    );
  }
  dom_references.messages_search_close_button?.setAttribute(
    "aria-label",
    translate("messages_search_close"),
  );
  if (dom_references.messages_search_close_button) {
    dom_references.messages_search_close_button.title = translate(
      "messages_search_close",
    );
  }
  dom_references.messages_scroll_bottom_button?.setAttribute(
    "aria-label",
    translate("messages_latest"),
  );
  if (dom_references.messages_scroll_bottom_button) {
    dom_references.messages_scroll_bottom_button.title =
      translate("messages_latest");
  }
  set_text(
    dom_references.diab_birthday_wish_button,
    translate("birthday_write_wish"),
  );
  set_text(
    dom_references.svetlana_birthday_wish_button,
    translate("birthday_write_wish"),
  );
  set_text(
    dom_references.live_messages_empty_state,
    translate("live_messages_empty"),
  );
  set_placeholder(
    dom_references.live_message_input,
    translate("live_message_placeholder"),
  );
  dom_references.emoji_toggle_button.setAttribute(
    "aria-label",
    translate("emoji_button_label"),
  );
  dom_references.emoji_toggle_button.title = translate("emoji_button_label");
  dom_references.live_message_files_label.setAttribute(
    "aria-label",
    translate("live_message_add_files"),
  );
  dom_references.live_message_files_label.title = translate(
    "live_message_add_files",
  );
  update_live_message_action_labels();
  set_text(dom_references.footer_text, translate("made_with_love"));
  set_text(dom_references.daily_love_heading, get_active_love_heading());
  set_placeholder(
    dom_references.memory_title_input,
    translate("memory_title_placeholder"),
  );
  set_placeholder(
    dom_references.memory_note_input,
    translate("memory_note_placeholder"),
  );
  set_placeholder(
    dom_references.event_title_input,
    translate("event_title_placeholder"),
  );
  set_placeholder(
    dom_references.event_description_input,
    translate("event_description_placeholder"),
  );
  set_text(
    dom_references.password_recovery_title,
    translate("password_recovery_title"),
  );
  set_text(
    dom_references.password_recovery_copy,
    translate("password_recovery_copy"),
  );
  set_text(dom_references.new_password_label, translate("new_password_label"));
  set_text(
    dom_references.confirm_password_label,
    translate("confirm_password_label"),
  );
  set_placeholder(
    dom_references.new_password_input,
    translate("new_password_placeholder"),
  );
  set_placeholder(
    dom_references.confirm_password_input,
    translate("confirm_password_placeholder"),
  );
  set_text(
    dom_references.save_password_button,
    translate("password_recovery_save"),
  );
  set_text(
    dom_references.cycle_settings_title,
    translate("cycle_settings_title"),
  );
  set_text(dom_references.cycle_length_label, translate("cycle_length_label"));
  set_text(
    dom_references.cycle_duration_label,
    translate("cycle_duration_label"),
  );
  set_text(
    dom_references.save_cycle_settings_button,
    translate("cycle_settings_save"),
  );
  set_text(
    dom_references.cycle_feeling_title,
    translate("cycle_feeling_title"),
  );
  set_placeholder(
    dom_references.cycle_feeling_input,
    translate("cycle_feeling_placeholder"),
  );
  set_text(
    dom_references.save_cycle_feeling_button,
    translate("cycle_feeling_save"),
  );
  set_text(
    dom_references.cycle_discard_title,
    translate("cycle_discard_changes"),
  );
  set_text(dom_references.cycle_discard_copy, translate("cycle_discard_copy"));
  set_text(
    dom_references.confirm_cycle_discard_button,
    translate("cycle_discard"),
  );
  set_text(
    dom_references.cancel_cycle_discard_button,
    translate("cancel_action"),
  );
  set_text(
    dom_references.app_notice_title,
    translate("app_notice_title"),
  );
  set_text(
    dom_references.app_notice_body,
    translate("app_notice_default_body"),
  );
  set_text(
    dom_references.cancel_app_notice_button,
    translate("cancel_action"),
  );
  set_text(
    dom_references.confirm_app_notice_button,
    translate("ok_action"),
  );
  dom_references.close_memory_dialog_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_event_dialog_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_password_recovery_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_cycle_settings_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_cycle_feeling_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_cycle_discard_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.close_app_notice_button.setAttribute(
    "aria-label",
    translate("close_dialog_label"),
  );
  dom_references.memory_lightbox_download_button?.setAttribute(
    "aria-label",
    translate("download_image"),
  );
  if (dom_references.memory_lightbox_download_button) {
    dom_references.memory_lightbox_download_button.title =
      translate("download_image");
  }
  update_theme_button(document.documentElement.dataset.theme || "light");
  update_music_button();
  sync_fullscreen_panel_state();
  translate_default_items();
  update_home_for_user(current_user_profile);
  update_welcome_text();
  update_contextual_messages();
  update_home_counters();
  update_dialog_titles();
  refresh_cycle_text_dialog_copy();
  update_live_message_file_preview();
  update_password_visibility_button();
  update_biometric_login_button();
  update_presence_status_text();
  render_music_library_panel();
  build_emoji_picker();
  auto_grow_live_message_input();
  render_memory_gallery(
    current_memory_items.length > 0
      ? current_memory_items
      : get_default_memory_gallery_items(),
  );
  render_event_timeline(
    current_event_items.length > 0
      ? current_event_items
      : get_default_event_timeline_items(),
  );
  render_cycle_calendar();
  render_live_message_context_preview();
  render_live_messages();
}

function update_dialog_titles() {
  dom_references.memory_dialog_title.textContent = editing_memory_id
    ? translate("memory_dialog_edit")
    : translate("memory_dialog_add");
  dom_references.save_memory_button.textContent = editing_memory_id
    ? translate("update_memory")
    : translate("save_memory");
  dom_references.event_dialog_title.textContent = editing_event_id
    ? translate("event_dialog_edit")
    : translate("event_dialog_add");
  dom_references.save_event_button.textContent = editing_event_id
    ? translate("update_event")
    : translate("save_event");

  if (editing_memory_id && editing_memory_image_data) {
    dom_references.memory_image_hint.textContent =
      translate("image_replace_hint");
  } else if (!editing_memory_id) {
    dom_references.memory_image_hint.textContent = "";
  }
}

function update_live_message_action_labels() {
  const send_label = editing_live_message_id
    ? translate("live_message_update")
    : translate("live_message_send");
  dom_references.send_live_message_button.setAttribute(
    "aria-label",
    send_label,
  );
  dom_references.send_live_message_button.title = send_label;
}

function refresh_cycle_text_dialog_copy() {
  if (!dom_references.cycle_feeling_dialog) {
    return;
  }

  if (
    (dom_references.cycle_feeling_form?.dataset.mode ||
      current_cycle_text_dialog_mode) === "note"
  ) {
    dom_references.cycle_feeling_title.textContent =
      translate("cycle_note_title");
    dom_references.cycle_feeling_input.placeholder = translate(
      "cycle_note_placeholder",
    );
    dom_references.save_cycle_feeling_button.textContent =
      translate("cycle_note_save");
    return;
  }

  const is_svetlana = current_user_profile?.user_key === "svetlana";
  dom_references.cycle_feeling_title.textContent = translate(
    is_svetlana ? "cycle_checkin_title_svetlana" : "cycle_checkin_title_diab",
  );
  dom_references.cycle_feeling_input.placeholder = translate(
    is_svetlana
      ? "cycle_checkin_placeholder_svetlana"
      : "cycle_checkin_placeholder_diab",
  );
  dom_references.save_cycle_feeling_button.textContent = translate(
    is_svetlana ? "cycle_checkin_save_svetlana" : "cycle_checkin_save_diab",
  );
}

function translate_default_items() {
  if (
    current_memory_items.length > 0 &&
    current_memory_items.every((item) => item.is_placeholder)
  ) {
    current_memory_items = get_default_memory_gallery_items();
  }

  if (current_event_items.length > 0) {
    const translated_first_day = get_default_event_timeline_items()[0];
    current_event_items = current_event_items.map((item) => {
      if (item.id === "first_day" && item.is_locked && !item.is_custom) {
        return translated_first_day;
      }

      return item;
    });
  }
}

async function load_all_message_lists() {
  const [joy_lists, love_lists, morning_lists, night_lists, tale_lists] =
    await Promise.all([
      load_daily_joy_messages_by_language(),
      load_daily_love_messages_by_language(),
      load_morning_messages_by_language(),
      load_night_messages_by_language(),
      load_night_tales_by_language(),
    ]);

  daily_joy_messages_by_language = joy_lists;
  daily_love_messages_by_language = love_lists;
  morning_messages_by_language = morning_lists;
  night_messages_by_language = night_lists;
  night_tales_by_language = tale_lists;
}

async function handle_login(event) {
  event.preventDefault();
  prepare_welcome_audio();

  const submitted_username = dom_references.username_input.value
    .trim()
    .toLowerCase();
  const submitted_password = dom_references.password_input.value;
  const user_profile = await authenticate_user(
    submitted_username,
    submitted_password,
  );

  if (!user_profile) {
    set_status_text(
      dom_references.login_error_message,
      translate("login_error"),
      "error",
    );
    return;
  }

  if (dom_references.biometric_opt_in_checkbox?.checked) {
    await save_biometric_credentials(submitted_username, submitted_password);
  } else {
    await clear_biometric_credentials();
  }
  await finish_successful_login(user_profile);
}

async function finish_successful_login(user_profile) {
  current_user_profile = {
    user_key: user_profile.user_key,
    display_name: user_profile.display_name,
    email: user_profile.email || "",
  };

  password_recovery_mode_active = false;
  load_local_music_tracks();
  await load_shared_music_tracks();
  load_hidden_deleted_messages();
  sessionStorage.setItem(
    "logged_in_user",
    JSON.stringify(current_user_profile),
  );
  set_status_text(dom_references.login_error_message, "", "");
  dom_references.username_input.value = "";
  dom_references.password_input.value = "";
  update_login_email_hint();
  await load_saved_content();
  update_home_for_user(current_user_profile);
  apply_saved_cycle_panel_state();
  sync_authenticated_chrome();
  start_presence_updates();
  await configure_background_message_sync();
  await schedule_cycle_notifications();
  show_welcome_overlay(current_user_profile);
}

async function authenticate_user(username, password) {
  const local_user = allowed_users[username];

  if (!local_user || local_user.password !== password) {
    return null;
  }

  if (is_supabase_enabled()) {
    const supabase_user = get_supabase_user_config(username);

    if (!supabase_user?.email) {
      return null;
    }

    try {
      const { data, error } = await supabase_client.auth.signInWithPassword({
        email: supabase_user.email,
        password,
      });

      if (error || !data.user) {
        log_app_error("supabase_auth_sign_in_failed", error || "missing_user");
        return null;
      } else {
        current_auth_user_id = data.user.id;
        current_auth_access_token = String(data.session?.access_token || "");
        const user_profile = build_user_profile(username, supabase_user.email);
        await ensure_supabase_profile_row(user_profile);
        return user_profile;
      }
    } catch (error) {
      log_app_error("supabase_auth_sign_in_threw", error);
      return null;
    }
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify({ username, password }),
    });

    if (response.ok) {
      const server_user = await response.json();
      return {
        user_key: server_user.user_key,
        display_name: server_user.display_name,
      };
    }
  } catch (error) {
    // The local gate is enough when the backend is not reachable.
  }

  return {
    user_key: local_user.user_key,
    display_name: local_user.display_name,
  };
}

function handle_logout() {
  play_logout_sound();
  stop_presence_updates();
  sessionStorage.removeItem("logged_in_user");
  current_user_profile = null;
  current_auth_user_id = "";
  current_auth_access_token = "";
  local_music_tracks = [];
  shared_music_tracks = [];
  render_music_library_panel();
  sync_authenticated_chrome();
  void configure_background_message_sync(false);
  hidden_deleted_message_ids = [];
  password_recovery_mode_active = false;
  dom_references.home_screen.classList.add("hidden");
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.login_screen.classList.remove("hidden");
  set_status_text(dom_references.login_error_message, "", "");
  update_login_email_hint();
  close_live_messages_stream();
  close_shared_data_stream();
  clear_live_message_composer();
  close_memory_lightbox(null, true);
  stop_cycle_ambient_audio();
  if (cycle_message_rotation_id) {
    window.clearInterval(cycle_message_rotation_id);
    cycle_message_rotation_id = null;
  }
  render_event_timeline(current_event_items);
  close_password_recovery_dialog();

  if (is_supabase_enabled()) {
    supabase_client.auth.signOut().catch(() => {});
  }
}

function handle_global_keydown(event) {
  if (event.key !== "Escape") {
    return;
  }

  if (!dom_references.app_nav_overlay.classList.contains("hidden")) {
    close_app_navigation();
    return;
  }

  if (active_overlay_name === "emoji_picker") {
    hide_emoji_picker(false, true);
    return;
  }

  if (active_overlay_name === "memory_lightbox") {
    close_memory_lightbox();
    return;
  }

  if (fullscreen_panel_name) {
    fullscreen_panel_name = "";
    sync_fullscreen_panel_state();
    return;
  }

  if (!dom_references.mention_search_panel.classList.contains("hidden")) {
    hide_mention_search();
    return;
  }

  if (!current_user_profile) {
    return;
  }

  if (editing_live_message_id) {
    return;
  }

  const open_dialog_present = document.querySelector("dialog[open]");

  if (open_dialog_present) {
    return;
  }

  play_logout_sound();
}

function handle_page_exit_sound() {
  if (!current_user_profile) {
    return;
  }

  play_logout_sound();
}

async function handle_forgot_password_request() {
  if (!is_supabase_enabled()) {
    set_status_text(
      dom_references.login_error_message,
      translate("forgot_password_error"),
      "error",
    );
    return;
  }

  const submitted_username = String(dom_references.username_input.value || "")
    .trim()
    .toLowerCase();
  const supabase_user = get_supabase_user_config(submitted_username);

  if (!supabase_user?.email) {
    set_status_text(
      dom_references.login_error_message,
      translate("forgot_password_username_missing"),
      "error",
    );
    update_login_email_hint();
    return;
  }

  const redirect_url = `${window.location.origin}${window.location.pathname}`;

  try {
    const { error } = await supabase_client.auth.resetPasswordForEmail(
      supabase_user.email,
      {
        redirectTo: redirect_url,
      },
    );

    if (error) {
      log_app_error("supabase_password_reset_email_failed", error);
      throw error;
    }

    set_status_text(
      dom_references.login_error_message,
      translate("forgot_password_sent", supabase_user.email),
      "success",
    );
    update_login_email_hint();
  } catch (error) {
    log_app_error("supabase_password_reset_email_threw", error);
    set_status_text(
      dom_references.login_error_message,
      translate("forgot_password_error"),
      "error",
    );
  }
}

function open_password_recovery_dialog() {
  password_recovery_mode_active = true;
  sessionStorage.removeItem("logged_in_user");
  current_user_profile = null;
  hidden_deleted_message_ids = [];
  set_status_text(dom_references.password_recovery_status, "", "");
  dom_references.password_recovery_form.reset();
  dom_references.login_screen.classList.remove("hidden");
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.home_screen.classList.add("hidden");
  open_dialog(dom_references.password_recovery_dialog);
  dom_references.new_password_input.focus();
}

function close_password_recovery_dialog() {
  set_status_text(dom_references.password_recovery_status, "", "");
  close_dialog(dom_references.password_recovery_dialog);
}

async function handle_password_recovery_submit(event) {
  event.preventDefault();

  const new_password = String(dom_references.new_password_input.value || "");
  const confirmed_password = String(
    dom_references.confirm_password_input.value || "",
  );

  if (new_password !== confirmed_password) {
    set_status_text(
      dom_references.password_recovery_status,
      translate("password_recovery_mismatch"),
      "error",
    );
    return;
  }

  if (!is_supabase_enabled()) {
    set_status_text(
      dom_references.password_recovery_status,
      translate("password_recovery_error"),
      "error",
    );
    return;
  }

  dom_references.save_password_button.disabled = true;

  try {
    const { error } = await supabase_client.auth.updateUser({
      password: new_password,
    });

    if (error) {
      log_app_error("supabase_password_update_failed", error);
      throw error;
    }

    set_status_text(
      dom_references.password_recovery_status,
      translate("password_recovery_success"),
      "success",
    );
    clear_supabase_recovery_url_state();
    password_recovery_mode_active = false;
    current_auth_user_id = "";
    current_auth_access_token = "";
    try {
      await supabase_client.auth.signOut();
    } catch (error) {
      // The password is already updated even if sign-out is delayed.
    }
    sessionStorage.removeItem("logged_in_user");
    current_user_profile = null;
    hidden_deleted_message_ids = [];
    dom_references.password_input.value = "";
    dom_references.username_input.value = "";
    set_status_text(dom_references.login_error_message, "", "");
    update_login_email_hint(translate("password_recovery_success"), "success");
    window.setTimeout(() => {
      close_password_recovery_dialog();
    }, 800);
  } catch (error) {
    log_app_error("supabase_password_update_threw", error);
    set_status_text(
      dom_references.password_recovery_status,
      translate("password_recovery_error"),
      "error",
    );
  } finally {
    dom_references.save_password_button.disabled = false;
  }
}

function show_welcome_overlay(user_profile) {
  const greeting = get_time_based_greeting(user_profile);
  dom_references.welcome_primary_message.textContent = greeting.primary;
  dom_references.welcome_secondary_message.textContent = greeting.secondary;
  dom_references.daily_joy_message.textContent = get_daily_joy_message();
  update_contextual_messages();
  dom_references.login_screen.classList.add("hidden");
  dom_references.home_screen.classList.add("hidden");
  dom_references.welcome_overlay.classList.remove("hidden");
  play_welcome_sound();
  window.setTimeout(
    () => burst_reaction(dom_references.welcome_overlay, "spark", 18),
    220,
  );
  window.setTimeout(
    () => burst_reaction(dom_references.welcome_overlay, "heart", 14),
    620,
  );
}

async function enter_home_from_welcome() {
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.home_screen.classList.remove("hidden");
  update_contextual_messages();
  update_home_counters();
  sync_cycle_audio();
  burst_reaction(dom_references.hero_symbol, "heart", 16);
  await initialize_live_messages_for_session();
}

async function initialize_live_messages_for_session() {
  await load_live_messages();
  open_live_messages_stream();
}

function get_time_based_greeting(user_profile) {
  if (!user_profile) {
    return {
      primary: "Svetlana & Diab",
      secondary: "",
    };
  }

  const current_hour = new Date().getHours();
  const person_key = user_profile.user_key === "svetlana" ? "svetlana" : "diab";
  let day_part = "night";

  if (current_hour >= 21 || current_hour < 6) {
    day_part = "night";
  } else if (current_hour < 12) {
    day_part = "morning";
  } else if (current_hour < 18) {
    day_part = "afternoon";
  } else {
    day_part = "evening";
  }

  const greeting_lines =
    translations[current_language].greetings[person_key][day_part];
  return {
    primary: greeting_lines[0],
    secondary: greeting_lines[1],
  };
}

function update_welcome_text() {
  if (
    !current_user_profile ||
    dom_references.welcome_overlay.classList.contains("hidden")
  ) {
    return;
  }

  const greeting = get_time_based_greeting(current_user_profile);
  dom_references.welcome_primary_message.textContent = greeting.primary;
  dom_references.welcome_secondary_message.textContent = greeting.secondary;
  dom_references.daily_joy_message.textContent = get_daily_joy_message();
}

async function load_daily_joy_messages_by_language() {
  return {
    en: await load_message_list(
      "daily_joy_messages",
      fallback_daily_joy_messages,
    ),
    de: await load_message_list(
      "daily_joy_messages_de",
      fallback_daily_joy_messages_de,
    ),
    ar: await load_message_list(
      "daily_joy_messages_ar",
      fallback_daily_joy_messages_ar,
    ),
  };
}

async function load_daily_love_messages_by_language() {
  return {
    en: await load_message_list(
      "daily_love_messages",
      fallback_daily_love_messages,
    ),
    de: await load_message_list(
      "daily_love_messages_de",
      fallback_daily_love_messages_de,
    ),
    ar: await load_message_list(
      "daily_love_messages_ar",
      fallback_daily_love_messages_ar,
    ),
  };
}

async function load_morning_messages_by_language() {
  return {
    en: await load_message_list("morning_messages", fallback_morning_messages),
    de: await load_message_list(
      "morning_messages_de",
      fallback_morning_messages_de,
    ),
    ar: await load_message_list(
      "morning_messages_ar",
      fallback_morning_messages_ar,
    ),
  };
}

async function load_night_messages_by_language() {
  return {
    en: await load_message_list("night_messages", fallback_night_messages),
    de: await load_message_list(
      "night_messages_de",
      fallback_night_messages_de,
    ),
    ar: await load_message_list(
      "night_messages_ar",
      fallback_night_messages_ar,
    ),
  };
}

async function load_night_tales_by_language() {
  return {
    en: await load_message_list("night_tales", fallback_night_tales),
    de: await load_message_list("night_tales_de", fallback_night_tales_de),
    ar: await load_message_list("night_tales_ar", fallback_night_tales_ar),
  };
}

async function load_message_list(message_name, fallback_messages) {
  if (can_use_local_api()) {
    try {
      const response = await fetch(`/api/${message_name}`);

      if (response.ok) {
        const messages = await response.json();

        if (Array.isArray(messages) && messages.length > 0) {
          return messages;
        }
      }
    } catch (error) {
      // The JSON file fallback below keeps the experience usable.
    }
  }

  try {
    const response = await fetch(`data/${message_name}.json`);

    if (response.ok) {
      const messages = await response.json();

      if (Array.isArray(messages) && messages.length > 0) {
        return messages;
      }
    }
  } catch (error) {
    // Fallback strings below remain available.
  }

  return fallback_messages;
}

function get_daily_message_from_list(message_list, fallback_list, seed_key) {
  const source_list =
    Array.isArray(message_list) && message_list.length > 0
      ? message_list
      : [];
  const fallback_source = Array.isArray(fallback_list) ? fallback_list : [];
  const safe_list = build_fresh_message_pool(source_list, fallback_source);
  if (safe_list.length === 0) {
    return "";
  }
  const today = new Date();
  const today_key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const storage_key = `${daily_content_history_storage_prefix}_${seed_key}`;

  try {
    const stored_value = JSON.parse(localStorage.getItem(storage_key) || "null");

    if (stored_value?.date === today_key && stored_value?.message) {
      return stored_value.message;
    }
  } catch (error) {
    // A malformed history entry should never block fresh content.
  }

  const recent_history = get_recent_daily_content_history(storage_key);
  const eligible_list =
    safe_list.length > 1
      ? safe_list.filter((message) => !recent_history.includes(message))
      : safe_list;
  const pick_list = eligible_list.length > 0 ? eligible_list : safe_list;
  const seed_text = `${seed_key}_${today_key}`;
  const hash_value = Array.from(seed_text).reduce(
    (total, character) => (total * 33 + character.charCodeAt(0)) % 1000003,
    0,
  );
  const selected_message = pick_list[hash_value % pick_list.length] || "";
  const next_history = [selected_message, ...recent_history]
    .filter(Boolean)
    .slice(0, Math.min(12, Math.max(3, safe_list.length - 1)));

  try {
    localStorage.setItem(
      storage_key,
      JSON.stringify({
        date: today_key,
        message: selected_message,
        history: next_history,
      }),
    );
  } catch (error) {
    // Local storage may be unavailable in a private browser.
  }

  return selected_message;
}

function get_recent_daily_content_history(storage_key) {
  try {
    const stored_value = JSON.parse(localStorage.getItem(storage_key) || "null");
    return Array.isArray(stored_value?.history) ? stored_value.history : [];
  } catch (error) {
    return [];
  }
}

function get_daily_content_index(seed_key, list_length) {
  if (!list_length) {
    return 0;
  }

  const today = new Date();
  const today_key = `${today.getFullYear()}-${today.getMonth() + 1}-${today.getDate()}`;
  const storage_key = `${daily_content_history_storage_prefix}_${seed_key}_index`;

  try {
    const stored_value = JSON.parse(localStorage.getItem(storage_key) || "null");

    if (
      stored_value?.date === today_key &&
      Number.isInteger(stored_value?.index)
    ) {
      return Math.abs(stored_value.index) % list_length;
    }
  } catch (error) {
    // A malformed index should never block content selection.
  }

  const seed_text = `${seed_key}_${today_key}`;
  const index = Array.from(seed_text).reduce(
    (total, character) => (total * 33 + character.charCodeAt(0)) % 1000003,
    0,
  );

  try {
    localStorage.setItem(
      storage_key,
      JSON.stringify({
        date: today_key,
        index,
      }),
    );
  } catch (error) {
    // Daily content still works without local storage.
  }

  return index % list_length;
}

function get_indexed_daily_message(list_by_language, fallback_by_language, seed_key) {
  const anchor_list = build_fresh_message_pool(
    list_by_language.en || [],
    fallback_by_language.en || [],
  );
  const active_list = build_fresh_message_pool(
    list_by_language[current_language] || [],
    fallback_by_language[current_language] || fallback_by_language.en || [],
  );

  if (active_list.length === 0) {
    return "";
  }

  const index = get_daily_content_index(
    seed_key,
    anchor_list.length || active_list.length,
  );
  return active_list[index % active_list.length] || "";
}

function get_message_signature(message_text) {
  return String(message_text || "")
    .replace(/\s+/g, " ")
    .trim()
    .slice(0, 72)
    .toLowerCase();
}

function build_fresh_message_pool(source_list, fallback_list) {
  const unique_messages = [
    ...new Set(
      [...source_list, ...fallback_list]
        .map((message) => String(message || "").trim())
        .filter(Boolean),
    ),
  ];

  if (unique_messages.length <= 1) {
    return unique_messages;
  }

  const signature_counts = unique_messages.reduce((counts, message) => {
    const signature = get_message_signature(message);
    counts[signature] = (counts[signature] || 0) + 1;
    return counts;
  }, {});
  const dominant_count = Math.max(...Object.values(signature_counts));

  if (dominant_count < unique_messages.length * 0.45) {
    return unique_messages;
  }

  const seen_signatures = new Set();
  const diverse_messages = [];

  unique_messages.forEach((message) => {
    const signature = get_message_signature(message);

    if (seen_signatures.has(signature)) {
      return;
    }

    seen_signatures.add(signature);
    diverse_messages.push(message);
  });

  return [...new Set([...fallback_list, ...diverse_messages])].filter(Boolean);
}

function get_daily_joy_message() {
  return get_indexed_daily_message(
    daily_joy_messages_by_language,
    {
      en: fallback_daily_joy_messages,
      de: fallback_daily_joy_messages_de,
      ar: fallback_daily_joy_messages_ar,
    },
    "joy",
  );
}

function get_daily_love_message() {
  return get_daily_message_from_list(
    daily_love_messages_by_language[current_language],
    fallback_daily_love_messages,
    `love_${current_language}`,
  );
}

function get_morning_message() {
  return get_daily_message_from_list(
    morning_messages_by_language[current_language],
    fallback_morning_messages,
    `morning_${current_language}`,
  );
}

function get_night_message() {
  return get_daily_message_from_list(
    night_messages_by_language[current_language],
    fallback_night_messages,
    `night_${current_language}`,
  );
}

function get_night_tale() {
  return get_indexed_daily_message(
    night_tales_by_language,
    {
      en: fallback_night_tales,
      de: fallback_night_tales_de,
      ar: fallback_night_tales_ar,
    },
    "night_tale",
  );
}

function is_night_time() {
  const current_hour = new Date().getHours();
  return current_hour >= 21 || current_hour < 6;
}

function is_morning_message_time() {
  const current_hour = new Date().getHours();
  return current_hour >= 7 && current_hour < 12;
}

function get_active_love_message_mode() {
  if (is_night_time()) {
    return "night";
  }

  if (is_morning_message_time()) {
    return "morning";
  }

  return "daily";
}

function get_active_love_message() {
  const message_mode = get_active_love_message_mode();

  if (message_mode === "night") {
    return get_night_message();
  }

  if (message_mode === "morning") {
    return get_morning_message();
  }

  return get_daily_love_message();
}

function get_active_love_heading() {
  const message_mode = get_active_love_message_mode();

  if (message_mode === "night") {
    return translate("night_message_heading");
  }

  if (message_mode === "morning") {
    return translate("morning_message_heading");
  }

  return translate("love_note_eyebrow");
}

function split_love_message_parts(message_text) {
  const safe_text = String(message_text || "").trim();
  const newline_parts = safe_text
    .split("\n")
    .map((line) => line.trim())
    .filter(Boolean);

  if (newline_parts.length > 1) {
    return {
      heading: newline_parts[0],
      body: newline_parts.slice(1).join("\n"),
    };
  }

  const sentence_match = safe_text.match(/^(.+?[.!?])\s+([\s\S]+)$/);

  if (sentence_match) {
    return {
      heading: sentence_match[1].trim(),
      body: sentence_match[2].trim(),
    };
  }

  return {
    heading: get_active_love_heading(),
    body: safe_text,
  };
}

function update_today_prank_message() {
  dom_references.today_prank_message.textContent = get_daily_joy_message();
}

function render_flowing_message(target_element, next_message, state_key) {
  if (!target_element) {
    return;
  }

  const message_signature = `${current_language}:${state_key}:${next_message}`;
  const existing_state = flow_animation_state[state_key];

  if (existing_state && existing_state.signature === message_signature) {
    return;
  }

  if (existing_state && existing_state.timer_id) {
    window.clearTimeout(existing_state.timer_id);
  }

  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    flow_animation_state[state_key] = {
      signature: message_signature,
      timer_id: null,
    };
    target_element.textContent = next_message;
    return;
  }

  const next_state = {
    signature: message_signature,
    timer_id: null,
  };

  flow_animation_state[state_key] = next_state;
  target_element.textContent = "";
  let current_index = 0;

  const write_next = () => {
    if (flow_animation_state[state_key] !== next_state) {
      return;
    }

    if (current_index >= next_message.length) {
      next_state.timer_id = null;
      return;
    }

    const character = next_message[current_index];
    const remaining_length = next_message.length - current_index;
    const step_size =
      character === "\n"
        ? 1
        : Math.max(1, Math.min(4, Math.ceil(remaining_length / 40)));
    current_index += step_size;
    target_element.textContent = next_message.slice(0, current_index);
    next_state.timer_id = window.setTimeout(
      write_next,
      character === "\n" ? 40 : 18,
    );
  };

  write_next();
}

function update_daily_love_message() {
  const active_message = get_active_love_message();
  const message_parts = split_love_message_parts(active_message);
  set_text(dom_references.daily_love_heading, message_parts.heading);
  render_flowing_message(
    dom_references.daily_love_message,
    message_parts.body,
    "daily_love_message",
  );
}

function update_night_tale_section() {
  const should_show_night_tale = is_night_time();
  dom_references.night_tale_card.classList.toggle(
    "hidden",
    !should_show_night_tale,
  );

  if (should_show_night_tale) {
    dom_references.night_tale_message.textContent = get_night_tale();
  }
}

function update_contextual_messages() {
  update_today_prank_message();
  update_daily_love_message();
  update_night_tale_section();
  render_cycle_calendar();
}

function refresh_time_sensitive_content() {
  update_home_for_user(current_user_profile);
  update_welcome_text();
  update_contextual_messages();
}

function start_time_sensitive_updates() {
  if (time_sensitive_interval_id) {
    return;
  }

  time_sensitive_interval_id = window.setInterval(
    refresh_time_sensitive_content,
    60 * 1000,
  );
}

function update_home_for_user(user_profile) {
  if (!user_profile) {
    return;
  }

  const greeting = get_time_based_greeting(user_profile);
  dom_references.home_greeting.textContent = greeting.primary;
  dom_references.hero_personal_message.textContent =
    user_profile.user_key === "svetlana"
      ? translate("hero_message_svetlana")
      : translate("hero_message_diab");

  if (current_event_items.length > 0) {
    render_event_timeline(current_event_items);
  }

  render_cycle_calendar();
}

function parse_local_date(date_string) {
  const [year, month, day] = date_string.split("-").map(Number);
  return new Date(year, month - 1, day);
}

function calculate_days_between(start_date, end_date) {
  const safe_start = new Date(
    start_date.getFullYear(),
    start_date.getMonth(),
    start_date.getDate(),
  );
  const safe_end = new Date(
    end_date.getFullYear(),
    end_date.getMonth(),
    end_date.getDate(),
  );
  const milliseconds_per_day = 24 * 60 * 60 * 1000;
  return Math.round((safe_end - safe_start) / milliseconds_per_day);
}

function get_today_at_midnight() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function calculate_days_together() {
  const start_date = parse_local_date(relationship_start_date);
  const today = get_today_at_midnight();
  const milliseconds_per_day = 24 * 60 * 60 * 1000;
  return Math.max(0, Math.floor((today - start_date) / milliseconds_per_day));
}

function calculate_years_together() {
  const start_date = parse_local_date(relationship_start_date);
  const today = get_today_at_midnight();
  let years = today.getFullYear() - start_date.getFullYear();
  let months = today.getMonth() - start_date.getMonth();
  let days = today.getDate() - start_date.getDate();

  if (days < 0) {
    months -= 1;
    const previous_month = new Date(today.getFullYear(), today.getMonth(), 0);
    days += previous_month.getDate();
  }

  if (months < 0) {
    years -= 1;
    months += 12;
  }

  return format_duration(years, months, days);
}

function format_duration(years, months, days) {
  const duration_parts = [];
  const year_words = translate("years");
  const month_words = translate("months");
  const day_words = translate("days");

  if (years > 0) {
    duration_parts.push(
      `${years} ${years === 1 ? year_words[0] : year_words[1]}`,
    );
  }

  if (months > 0) {
    duration_parts.push(
      `${months} ${months === 1 ? month_words[0] : month_words[1]}`,
    );
  }

  duration_parts.push(`${days} ${days === 1 ? day_words[0] : day_words[1]}`);
  return duration_parts.join(", ");
}

function calculate_age(birthdate_string) {
  const birthdate = parse_local_date(birthdate_string);
  const today = get_today_at_midnight();
  let age = today.getFullYear() - birthdate.getFullYear();
  const birthday_has_not_happened_this_year =
    today.getMonth() < birthdate.getMonth() ||
    (today.getMonth() === birthdate.getMonth() &&
      today.getDate() < birthdate.getDate());

  if (birthday_has_not_happened_this_year) {
    age -= 1;
  }

  return age;
}

function calculate_days_until_next_birthday(birthdate_string) {
  const birthdate = parse_local_date(birthdate_string);
  const today = get_today_at_midnight();
  let next_birthday = new Date(
    today.getFullYear(),
    birthdate.getMonth(),
    birthdate.getDate(),
  );

  if (next_birthday < today) {
    next_birthday = new Date(
      today.getFullYear() + 1,
      birthdate.getMonth(),
      birthdate.getDate(),
    );
  }

  const milliseconds_per_day = 24 * 60 * 60 * 1000;
  return Math.round((next_birthday - today) / milliseconds_per_day);
}

function calculate_days_from_nearest_birthday(birthdate_string) {
  const birthdate = parse_local_date(birthdate_string);
  const today = get_today_at_midnight();
  const birthdays = [
    new Date(today.getFullYear() - 1, birthdate.getMonth(), birthdate.getDate()),
    new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate()),
    new Date(today.getFullYear() + 1, birthdate.getMonth(), birthdate.getDate()),
  ];
  const nearest_birthday = birthdays.sort(
    (left_date, right_date) =>
      Math.abs(today - left_date) - Math.abs(today - right_date),
  )[0];
  return calculate_days_between(nearest_birthday, today);
}

function update_home_counters() {
  const days_together = calculate_days_together();
  const years_together = calculate_years_together();
  const diab_age = calculate_age(diab_birthdate);
  const svetlana_age = calculate_age(svetlana_birthdate);
  const days_until_diab_birthday =
    calculate_days_until_next_birthday(diab_birthdate);
  const days_until_svetlana_birthday =
    calculate_days_until_next_birthday(svetlana_birthdate);

  dom_references.days_together_counter.textContent =
    days_together.toLocaleString(translate("locale"));
  dom_references.years_together_counter.textContent = years_together;
  dom_references.diab_age_counter.textContent = diab_age.toString();
  dom_references.svetlana_age_counter.textContent = svetlana_age.toString();
  dom_references.diab_next_birthday_message.textContent = translate(
    "diab_birthday_message",
    days_until_diab_birthday,
  );
  dom_references.svetlana_next_birthday_message.textContent = translate(
    "svetlana_birthday_message",
    days_until_svetlana_birthday,
  );
  render_birthday_celebrations(
    calculate_days_from_nearest_birthday(diab_birthdate),
    calculate_days_from_nearest_birthday(svetlana_birthdate),
  );
}

function is_birthday_today(birthdate_string) {
  return calculate_days_until_next_birthday(birthdate_string) === 0;
}

function get_rotating_copy(copy_list, seed_text) {
  if (!Array.isArray(copy_list) || copy_list.length === 0) {
    return "";
  }

  const seed_value = String(seed_text || "")
    .split("")
    .reduce(
      (total, character, index) =>
        total + character.charCodeAt(0) * (index + 1),
      0,
    );

  return copy_list[seed_value % copy_list.length];
}

function render_birthday_celebration_block(person_key, birthday_offset_days) {
  const is_visible = Math.abs(birthday_offset_days) <= 7;
  const celebration_element =
    person_key === "svetlana"
      ? dom_references.svetlana_birthday_celebration
      : dom_references.diab_birthday_celebration;
  const message_element =
    person_key === "svetlana"
      ? dom_references.svetlana_birthday_celebration_message
      : dom_references.diab_birthday_celebration_message;
  const button_element =
    person_key === "svetlana"
      ? dom_references.svetlana_birthday_wish_button
      : dom_references.diab_birthday_wish_button;

  if (!celebration_element || !message_element || !button_element) {
    return;
  }

  celebration_element.classList.toggle("hidden", !is_visible);
  button_element.classList.toggle("hidden", !is_visible);

  if (!is_visible) {
    message_element.textContent = "";
    return;
  }

  const localized_messages =
    birthday_celebration_messages[current_language]?.[person_key] ||
    birthday_celebration_messages.en[person_key] ||
    [];
  const seed_key = `${person_key}_${new Date().getFullYear()}_${current_language}`;
  message_element.textContent = get_rotating_copy(localized_messages, seed_key);
}

function render_birthday_page_effects(birthday_items) {
  const active_birthdays = birthday_items.filter(
    (item) => Math.abs(item.offset) <= 7,
  );
  const effect_key = active_birthdays
    .map((item) => `${item.key}:${item.offset}`)
    .join("|");
  let layer = document.querySelector(".birthday_page_effect_layer");

  if (!active_birthdays.length) {
    birthday_page_effect_key = "";
    layer?.remove();
    return;
  }

  if (birthday_page_effect_key === effect_key && layer) {
    return;
  }

  birthday_page_effect_key = effect_key;
  layer?.remove();
  layer = document.createElement("div");
  layer.className = "birthday_page_effect_layer";
  layer.setAttribute("aria-hidden", "true");

  const message = document.createElement("div");
  message.className = "birthday_flying_message";
  message.textContent = active_birthdays
    .map((item) => `Happy birthday ${item.name}`)
    .join(" & ");
  layer.appendChild(message);

  const symbols = ["🎈", "🎈", "💛", "❤️", "🎁", "🎁", "✨", "✨", "〰"];
  for (let index = 0; index < 32; index += 1) {
    const particle = document.createElement("span");
    particle.className = `birthday_floating_symbol symbol_${index % 5}`;
    particle.textContent = symbols[index % symbols.length];
    particle.style.left = `${Math.random() * 100}%`;
    particle.style.animationDelay = `${Math.random() * 8}s`;
    particle.style.animationDuration = `${10 + Math.random() * 8}s`;
    layer.appendChild(particle);
  }

  document.body.appendChild(layer);
}

function render_birthday_celebrations(
  diab_birthday_offset_days,
  svetlana_birthday_offset_days,
) {
  render_birthday_celebration_block("diab", diab_birthday_offset_days);
  render_birthday_celebration_block("svetlana", svetlana_birthday_offset_days);
  render_birthday_page_effects([
    { key: "diab", offset: diab_birthday_offset_days, name: "Diab" },
    { key: "svetlana", offset: svetlana_birthday_offset_days, name: "Svetlana" },
  ]);
}

function prefill_live_message_text(text_value) {
  clear_live_message_composer();
  load_message_segments_into_composer([{ type: "text", text: text_value }]);
  auto_grow_live_message_input();
  dom_references.live_message_input.focus();
  place_caret_at_end(dom_references.live_message_input);
  dom_references.live_message_form.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function start_birthday_wish(person_key) {
  const prefill_text =
    birthday_prefill_messages[current_language]?.[person_key] ||
    birthday_prefill_messages.en[person_key] ||
    "";

  if (!prefill_text) {
    return;
  }

  prefill_live_message_text(prefill_text);
  burst_reaction(dom_references.live_message_composer, "spark", 10);
}

async function load_saved_content() {
  current_memory_items = await api_get_items(
    "memories",
    memory_storage_key,
    get_default_memory_gallery_items(),
  );
  current_event_items = await api_get_items(
    "events",
    event_storage_key,
    get_default_event_timeline_items(),
  );
  current_cycle_data = await api_get_cycle_data();
  rebuild_cycle_runtime_state();
  render_memory_gallery(current_memory_items);
  render_event_timeline(current_event_items);
  render_cycle_calendar();
}

async function api_get_items(item_type, storage_key, fallback_items) {
  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const supabase_items = await supabase_get_items(item_type);
      localStorage.setItem(storage_key, JSON.stringify(supabase_items));
      return supabase_items.length > 0 ? supabase_items : fallback_items;
    } catch (error) {
      log_app_error(`supabase_get_items_${item_type}_failed`, error);
      // Local storage fallback below keeps the app usable.
    }
  }

  if (can_use_local_api()) {
    try {
      const response = await fetch(`/api/${item_type}`);

      if (response.ok) {
        const items = await response.json();

        if (Array.isArray(items)) {
          localStorage.setItem(storage_key, JSON.stringify(items));
          return items.length > 0 ? items : fallback_items;
        }
      }
    } catch (error) {
      // Local storage keeps the page usable when the server is unavailable.
    }
  }

  const stored_items = JSON.parse(localStorage.getItem(storage_key) || "null");
  return Array.isArray(stored_items) && stored_items.length > 0
    ? stored_items
    : fallback_items;
}

async function api_save_items(item_type, storage_key, items) {
  localStorage.setItem(storage_key, JSON.stringify(items));

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      await supabase_replace_items(item_type, items);
      return;
    } catch (error) {
      log_app_error(`supabase_save_items_${item_type}_failed`, error);
      // Local fallback below remains available.
    }
  }

  if (can_use_local_api()) {
    try {
      await fetch(`/api/${item_type}`, {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(items),
      });
    } catch (error) {
      // The local copy is already safe in the browser.
    }
  }
}

function create_cycle_state_message_id() {
  const safe_room = String(current_room_slug || supabase_room_slug_default)
    .replace(/[^a-z0-9_-]+/gi, "_")
    .toLowerCase();
  return `cycle_state_${safe_room}`;
}

function get_cycle_state_attachment(message_item) {
  const attachments = Array.isArray(message_item?.attachments)
    ? message_item.attachments
    : [];
  return (
    attachments.find((attachment) => attachment?.kind === "cycle_state") ||
    null
  );
}

async function api_get_cycle_data() {
  const local_cycle_data = load_cycle_data();

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.cycle_states)
        .select("cycle_data, updated_at, updated_by")
        .eq("room_slug", current_room_slug)
        .maybeSingle();

      if (!error && data?.cycle_data) {
        return normalize_cycle_data_store({
          ...data.cycle_data,
          updated_at: data.updated_at || data.cycle_data.updated_at || "",
        });
      }
    } catch (error) {
      // The live-message fallback below works before the optional table exists.
    }

    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .select("*")
        .eq("room_slug", current_room_slug)
        .eq("id", create_cycle_state_message_id())
        .maybeSingle();

      if (!error && data) {
        const attachment = get_cycle_state_attachment(
          map_live_message_row_to_item(data),
        );

        if (attachment?.cycle_data) {
          return normalize_cycle_data_store({
            ...attachment.cycle_data,
            updated_at: attachment.updated_at || attachment.cycle_data.updated_at || "",
          });
        }
      }
    } catch (error) {
      // Local data remains the offline fallback.
    }
  }

  if (can_use_local_api()) {
    try {
      const response = await fetch("/api/cycle_data");

      if (response.ok) {
        const cycle_data = await response.json();
        return normalize_cycle_data_store(cycle_data);
      }
    } catch (error) {
      // Local storage fallback below keeps the calendar available.
    }
  }

  return local_cycle_data;
}

function build_cycle_state_live_message(cycle_data, change_type = "") {
  const updated_at = cycle_data.updated_at || new Date().toISOString();
  return {
    id: create_cycle_state_message_id(),
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: cycle_state_live_message_marker,
    created_at: updated_at,
    edited_at: updated_at,
    attachments: [
      {
        kind: "cycle_state",
        cycle_data,
        updated_at,
        updated_by: current_user_profile.user_key,
        change_type,
      },
    ],
  };
}

async function sync_cycle_data_to_remote(immediate = false) {
  if (!current_user_profile) {
    return;
  }

  if (!immediate) {
    window.clearTimeout(cycle_state_sync_timeout_id);
    cycle_state_sync_timeout_id = window.setTimeout(
      () => sync_cycle_data_to_remote(true),
      350,
    );
    return;
  }

  window.clearTimeout(cycle_state_sync_timeout_id);
  cycle_state_sync_timeout_id = null;

  const cycle_data = normalize_cycle_data_store(current_cycle_data);
  const change_type = pending_cycle_change_type || "generic";
  pending_cycle_change_type = "";

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      await supabase_client.from(supabase_table_names.cycle_states).upsert(
        {
          room_slug: current_room_slug,
          cycle_data,
          updated_by: current_user_profile.user_key,
          updated_at: cycle_data.updated_at || new Date().toISOString(),
        },
        { onConflict: "room_slug" },
      );
    } catch (error) {
      // The live-message state below is the compatibility path.
    }

    try {
      await supabase_client.from(supabase_table_names.live_messages).upsert(
        build_cycle_state_live_message(cycle_data, change_type),
        { onConflict: "id" },
      );
      return;
    } catch (error) {
      log_app_error("supabase_cycle_state_sync_failed", error);
    }
  }

  if (can_use_local_api()) {
    try {
      await fetch("/api/cycle_data", {
        method: "POST",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify(cycle_data),
      });
    } catch (error) {
      // LocalStorage already has the latest cycle data.
    }
  }
}

function get_cycle_update_title(change_type = "") {
  const key_map = {
    start: "cycle_update_start",
    end: "cycle_update_end",
    note: "cycle_update_note",
    mood: "cycle_update_mood",
    checkin: "cycle_update_checkin",
    settings: "cycle_update_settings",
  };
  return translate(key_map[change_type] || "cycle_update_generic");
}

function apply_cycle_state_from_message(message_item) {
  const attachment = get_cycle_state_attachment(message_item);

  if (!attachment?.cycle_data) {
    return;
  }

  const incoming_updated_at = String(
    attachment.updated_at || attachment.cycle_data.updated_at || "",
  );
  const current_updated_at = String(current_cycle_data.updated_at || "");

  if (
    incoming_updated_at &&
    current_updated_at &&
    new Date(incoming_updated_at) < new Date(current_updated_at)
  ) {
    return;
  }

  current_cycle_data = normalize_cycle_data_store({
    ...attachment.cycle_data,
    updated_at: incoming_updated_at,
  });
  save_cycle_data({ mark_updated: false, sync_remote: false });
  rebuild_cycle_runtime_state();
  cleanup_expired_cycle_checkins();
  render_cycle_calendar();
  void schedule_cycle_notifications();

  if (
    live_messages_history_loaded &&
    current_user_profile &&
    attachment.updated_by !== current_user_profile.user_key
  ) {
    const title = get_cycle_update_title(attachment.change_type);
    show_in_app_notification({
      title,
      body: translate("shared_activity_cycle"),
      reference_id: "cycle",
      kind: "cycle",
    });
    void schedule_activity_notification(
      title,
      translate("shared_activity_cycle"),
      `cycle_${incoming_updated_at || Date.now()}`,
    );
  }
}

function get_shared_activity_attachment(message_item) {
  const attachments = Array.isArray(message_item?.attachments)
    ? message_item.attachments
    : [];
  return (
    attachments.find((attachment) => attachment?.kind === "shared_activity") ||
    null
  );
}

async function announce_shared_activity(activity_type, title = "", body = "") {
  if (!current_user_profile || !is_supabase_enabled() || !current_auth_user_id) {
    return;
  }

  const now_text = new Date().toISOString();
  const message_item = {
    id: `activity_${Date.now()}_${Math.random().toString(16).slice(2)}`,
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: shared_activity_live_message_marker,
    created_at: now_text,
    edited_at: now_text,
    attachments: [
      {
        kind: "shared_activity",
        activity_type,
        title,
        body,
        updated_by: current_user_profile.user_key,
        updated_at: now_text,
      },
    ],
  };

  try {
    await supabase_client.from(supabase_table_names.live_messages).insert(message_item);
  } catch (error) {
    log_app_error("shared_activity_announce_failed", error);
  }
}

function get_shared_activity_title(activity_type) {
  const key_map = {
    memory: "shared_activity_memory",
    event: "shared_activity_event",
    cycle: "shared_activity_cycle",
    music: "shared_activity_music",
    file: "shared_activity_file",
  };
  return translate(key_map[activity_type] || "shared_activity_generic");
}

function apply_shared_activity_from_message(message_item) {
  const attachment = get_shared_activity_attachment(message_item);

  if (!attachment || !current_user_profile) {
    return;
  }

  if (attachment.updated_by === current_user_profile.user_key) {
    return;
  }

  if (attachment.activity_type === "memory" || attachment.activity_type === "event") {
    void load_saved_content();
  }

  if (!live_messages_history_loaded) {
    return;
  }

  const title = attachment.title || get_shared_activity_title(attachment.activity_type);
  const body = attachment.body || get_shared_activity_title(attachment.activity_type);
  show_in_app_notification({
    title,
    body,
    kind: attachment.activity_type === "cycle" ? "cycle" : "activity",
  });
  void schedule_activity_notification(
    title,
    body,
    `activity_${attachment.activity_type}_${attachment.updated_at || Date.now()}`,
  );
}

async function supabase_get_items(item_type) {
  const table_name =
    item_type === "memories"
      ? supabase_table_names.memories
      : supabase_table_names.events;
  const { data, error } = await supabase_client
    .from(table_name)
    .select("*")
    .eq("room_slug", current_room_slug)
    .order("sort_order", { ascending: true });

  if (error) {
    throw error;
  }

  const rows = Array.isArray(data) ? data : [];
  return item_type === "memories"
    ? rows.map(map_memory_row_to_item)
    : rows.map(map_event_row_to_item);
}

async function supabase_replace_items(item_type, items) {
  const table_name =
    item_type === "memories"
      ? supabase_table_names.memories
      : supabase_table_names.events;
  const rows =
    item_type === "memories"
      ? items.map(map_memory_item_to_row)
      : items.map(map_event_item_to_row);

  const delete_result = await supabase_client
    .from(table_name)
    .delete()
    .eq("room_slug", current_room_slug);

  if (delete_result.error) {
    throw delete_result.error;
  }

  if (rows.length === 0) {
    return;
  }

  const insert_result = await supabase_client.from(table_name).insert(rows);

  if (insert_result.error) {
    throw insert_result.error;
  }
}

function map_memory_item_to_row(memory_item, index) {
  return {
    id: String(memory_item.id),
    room_slug: current_room_slug,
    sort_order: index,
    title: String(memory_item.title || ""),
    date_label: String(memory_item.date_label || ""),
    date_value: String(memory_item.date_value || ""),
    note: String(memory_item.note || ""),
    image_data: String(memory_item.image_data || ""),
  };
}

function map_memory_row_to_item(row) {
  return {
    id: String(row.id),
    title: String(row.title || ""),
    date_label: String(row.date_label || translate("fallback_memory_date")),
    date_value: String(row.date_value || ""),
    note: String(row.note || ""),
    image_data: String(row.image_data || ""),
  };
}

function map_event_item_to_row(event_item, index) {
  return {
    id: String(event_item.id),
    room_slug: current_room_slug,
    sort_order: index,
    is_locked: Boolean(event_item.is_locked),
    is_custom: Boolean(event_item.is_custom),
    title: String(event_item.title || ""),
    date_label: String(event_item.date_label || ""),
    date_value: String(event_item.date_value || ""),
    description: String(event_item.description || ""),
  };
}

function map_event_row_to_item(row) {
  return {
    id: String(row.id),
    is_locked: Boolean(row.is_locked),
    is_custom: Boolean(row.is_custom),
    title: String(row.title || ""),
    date_label: String(row.date_label || translate("fallback_event_date")),
    date_value: String(row.date_value || ""),
    description: String(row.description || ""),
  };
}

function load_cycle_data() {
  try {
    const stored_value = JSON.parse(
      localStorage.getItem(cycle_storage_key) || "null",
    );

    if (!stored_value || typeof stored_value !== "object") {
      return normalize_cycle_data_store(create_default_cycle_data());
    }

    const normalized_cycle_data = normalize_cycle_data_store(stored_value);

    if (
      !Array.isArray(normalized_cycle_data.entries) ||
      normalized_cycle_data.entries.length === 0
    ) {
      return normalize_cycle_data_store(create_default_cycle_data());
    }

    return normalized_cycle_data;
  } catch (error) {
    return normalize_cycle_data_store(create_default_cycle_data());
  }
}

function save_cycle_data(options = {}) {
  const { mark_updated = true, sync_remote = true } = options;
  current_cycle_data = normalize_cycle_data_store(current_cycle_data);

  if (mark_updated) {
    current_cycle_data.updated_at = new Date().toISOString();
  }

  localStorage.setItem(cycle_storage_key, JSON.stringify(current_cycle_data));

  if (sync_remote) {
    void sync_cycle_data_to_remote();
  }
}

function clamp_number(value, min, max, fallback_value) {
  const parsed_value = Number(value);

  if (!Number.isFinite(parsed_value)) {
    return fallback_value;
  }

  return Math.min(max, Math.max(min, Math.round(parsed_value)));
}

function get_cycle_entry_duration(entry) {
  if (!entry?.startDate || !entry?.endDate) {
    return 0;
  }

  const start_date = parse_local_date(entry.startDate);
  const end_date = parse_local_date(entry.endDate);
  return Math.max(1, calculate_days_between(start_date, end_date) + 1);
}

function get_sorted_cycle_entries() {
  return [...get_cycle_runtime_state().entries];
}

function get_effective_cycle_lengths() {
  const sorted_entries = get_sorted_cycle_entries();
  const cycle_lengths = [];

  for (let index = 1; index < sorted_entries.length; index += 1) {
    cycle_lengths.push(
      calculate_days_between(
        parse_local_date(sorted_entries[index - 1].startDate),
        parse_local_date(sorted_entries[index].startDate),
      ),
    );
  }

  return cycle_lengths;
}

function get_cycle_stats() {
  return get_cycle_runtime_state().stats;
}

function normalize_cycle_entry(entry, fallback_index = 0) {
  const start_date = String(entry?.startDate || entry?.start_date || "").trim();

  if (!start_date) {
    return null;
  }

  const end_date = String(entry?.endDate || entry?.end_date || "").trim();
  const parsed_start = parse_local_date(start_date);
  const parsed_end = end_date ? parse_local_date(end_date) : null;
  const safe_end_date =
    parsed_end && parsed_end >= parsed_start ? end_date : "";
  const inferred_period_length = safe_end_date
    ? Math.max(
        1,
        calculate_days_between(parsed_start, parse_local_date(safe_end_date)) +
          1,
      )
    : current_cycle_data.typical_period_length;

  return {
    id: String(entry?.id || `cycle_${start_date}_${fallback_index}`),
    startDate: start_date,
    endDate: safe_end_date,
    cycleLength: clamp_number(
      entry?.cycleLength ?? entry?.cycle_length,
      18,
      60,
      current_cycle_data.typical_cycle_length,
    ),
    periodLength: clamp_number(
      entry?.periodLength ?? entry?.period_length ?? inferred_period_length,
      2,
      12,
      current_cycle_data.typical_period_length,
    ),
    confirmed: entry?.confirmed !== false,
    symptoms: Array.isArray(entry?.symptoms)
      ? entry.symptoms.map((item) => String(item)).filter(Boolean)
      : [],
    notes: Array.isArray(entry?.notes)
      ? entry.notes.map((item) => String(item)).filter(Boolean)
      : [],
    manualOvulationDate: String(
      entry?.manualOvulationDate || entry?.manual_ovulation_date || "",
    ).trim(),
  };
}

function normalize_cycle_entries(entry_list) {
  const sorted_entries = [...(entry_list || [])]
    .map((entry, index) => normalize_cycle_entry(entry, index))
    .filter(Boolean)
    .sort(
      (left_entry, right_entry) =>
        parse_local_date(left_entry.startDate) -
        parse_local_date(right_entry.startDate),
    );
  const merged_entries = [];

  sorted_entries.forEach((entry) => {
    const last_entry = merged_entries[merged_entries.length - 1];

    if (!last_entry) {
      merged_entries.push(entry);
      return;
    }

    const last_end_text =
      last_entry.endDate ||
      format_date_input_value(
        add_days(
          parse_local_date(last_entry.startDate),
          Math.max(last_entry.periodLength - 1, 0),
        ),
      );
    const last_end = parse_local_date(last_end_text);
    const current_start = parse_local_date(entry.startDate);

    if (entry.startDate === last_entry.startDate || current_start <= last_end) {
      const current_end_text =
        entry.endDate ||
        format_date_input_value(
          add_days(
            parse_local_date(entry.startDate),
            Math.max(entry.periodLength - 1, 0),
          ),
        );
      const current_end = parse_local_date(current_end_text);
      const merged_end =
        current_end > last_end ? current_end_text : last_end_text;
      last_entry.endDate = merged_end;
      last_entry.periodLength = Math.max(
        last_entry.periodLength,
        Math.max(
          1,
          calculate_days_between(
            parse_local_date(last_entry.startDate),
            parse_local_date(merged_end),
          ) + 1,
        ),
      );
      last_entry.cycleLength = clamp_number(
        Math.round((last_entry.cycleLength + entry.cycleLength) / 2),
        18,
        60,
        current_cycle_data.typical_cycle_length,
      );
      last_entry.confirmed = last_entry.confirmed || entry.confirmed;
      last_entry.manualOvulationDate =
        entry.manualOvulationDate || last_entry.manualOvulationDate;
      last_entry.symptoms = [
        ...new Set([...last_entry.symptoms, ...entry.symptoms]),
      ];
      last_entry.notes = [...last_entry.notes, ...entry.notes];
      return;
    }

    merged_entries.push(entry);
  });

  return merged_entries;
}

function normalize_cycle_data_store(raw_value) {
  const default_cycle_data = create_default_cycle_data();
  return {
    typical_cycle_length: clamp_number(
      raw_value?.typical_cycle_length,
      18,
      60,
      default_cycle_data.typical_cycle_length,
    ),
    typical_period_length: clamp_number(
      raw_value?.typical_period_length,
      2,
      12,
      default_cycle_data.typical_period_length,
    ),
    entries: normalize_cycle_entries(raw_value?.entries || []),
    day_notes_by_date:
      raw_value?.day_notes_by_date &&
      typeof raw_value.day_notes_by_date === "object"
        ? raw_value.day_notes_by_date
        : raw_value?.feelings_by_date &&
            typeof raw_value.feelings_by_date === "object"
          ? raw_value.feelings_by_date
          : {},
    cycle_checkins_by_key:
      raw_value?.cycle_checkins_by_key &&
      typeof raw_value.cycle_checkins_by_key === "object"
        ? raw_value.cycle_checkins_by_key
        : {},
    moods_by_date:
      raw_value?.moods_by_date && typeof raw_value.moods_by_date === "object"
        ? raw_value.moods_by_date
        : {},
    updated_at: String(raw_value?.updated_at || ""),
  };
}

function get_cycle_runtime_state(force_rebuild = false) {
  if (!force_rebuild && current_cycle_runtime_state) {
    return current_cycle_runtime_state;
  }

  current_cycle_data = normalize_cycle_data_store(current_cycle_data);
  const entries = normalize_cycle_entries(current_cycle_data.entries);
  current_cycle_data.entries = entries;
  const cycle_lengths = [];
  const completed_lengths = [];

  for (let index = 0; index < entries.length; index += 1) {
    const entry = entries[index];

    if (entry.endDate) {
      completed_lengths.push(get_cycle_entry_duration(entry));
    }

    if (index > 0) {
      cycle_lengths.push(
        calculate_days_between(
          parse_local_date(entries[index - 1].startDate),
          parse_local_date(entry.startDate),
        ),
      );
    }
  }

  const average_cycle =
    cycle_lengths.length > 0
      ? Math.round(
          cycle_lengths.reduce((sum, value) => sum + value, 0) /
            cycle_lengths.length,
        )
      : current_cycle_data.typical_cycle_length;
  const average_period =
    completed_lengths.length > 0
      ? Math.round(
          completed_lengths.reduce((sum, value) => sum + value, 0) /
            completed_lengths.length,
        )
      : current_cycle_data.typical_period_length;
  const stats = {
    cycle_length: clamp_number(
      average_cycle,
      18,
      60,
      current_cycle_data.typical_cycle_length,
    ),
    period_length: clamp_number(
      average_period,
      2,
      12,
      current_cycle_data.typical_period_length,
    ),
  };
  const confirmed_windows = entries.map((entry) => {
    const start_date = parse_local_date(entry.startDate);
    const cycle_length = clamp_number(
      entry.cycleLength,
      18,
      60,
      stats.cycle_length,
    );
    const period_length = clamp_number(
      entry.periodLength,
      2,
      12,
      stats.period_length,
    );
    const end_date = entry.endDate
      ? parse_local_date(entry.endDate)
      : add_days(start_date, Math.max(period_length - 1, 0));
    const ovulation_date = entry.manualOvulationDate
      ? parse_local_date(entry.manualOvulationDate)
      : add_days(start_date, cycle_length - 14);

    return {
      entry,
      start_date,
      end_date,
      cycle_length,
      period_length,
      ovulation_date,
      fertile_start: new Date(
        Math.max(
          add_days(ovulation_date, -5).getTime(),
          add_days(end_date, 1).getTime(),
        ),
      ),
      fertile_end: add_days(ovulation_date, 1),
    };
  });
  const predicted_windows = build_predicted_cycle_windows(entries, stats);
  const today_text = format_date_input_value(new Date());

  current_cycle_runtime_state = {
    entries,
    stats,
    confirmed_windows,
    predicted_windows,
    generated_messages: [],
    today_text,
  };

  const today_status = find_cycle_day_status_from_runtime(
    today_text,
    current_cycle_runtime_state,
  );
  const next_predicted_start = predicted_windows
    .map((window_item) => window_item.predicted_start_text)
    .find((date_value) => parse_local_date(date_value) >= start_of_today());
  const days_until_next = next_predicted_start
    ? calculate_days_between(
        start_of_today(),
        parse_local_date(next_predicted_start),
      )
    : stats.cycle_length;

  current_cycle_runtime_state.today_status = today_status;
  current_cycle_runtime_state.next_predicted_start = next_predicted_start || "";
  current_cycle_runtime_state.days_until_next = days_until_next;
  current_cycle_runtime_state.window_is_active =
    today_status.state === "period" ||
    today_status.state === "predicted_period" ||
    days_until_next <= cycle_music_window_days;
  current_cycle_runtime_state.active_cycle =
    entries[entries.length - 1] || null;
  current_cycle_runtime_state.confirmed_period_days = [
    ...new Set(
      confirmed_windows.flatMap((window_item) => {
        const total_days = Math.max(
          0,
          calculate_days_between(window_item.start_date, window_item.end_date),
        );

        return Array.from({ length: total_days + 1 }, (_, index) =>
          format_date_input_value(add_days(window_item.start_date, index)),
        );
      }),
    ),
  ];
  current_cycle_runtime_state.predicted_period_days = [
    ...new Set(
      predicted_windows.flatMap((window_item) => {
        const total_days = Math.max(
          0,
          calculate_days_between(
            window_item.predicted_start,
            window_item.predicted_end,
          ),
        );

        return Array.from({ length: total_days + 1 }, (_, index) =>
          format_date_input_value(add_days(window_item.predicted_start, index)),
        );
      }),
    ),
  ];
  current_cycle_runtime_state.fertile_days = [
    ...new Set(
      [...confirmed_windows, ...predicted_windows].flatMap((window_item) => {
        const total_days = Math.max(
          0,
          calculate_days_between(
            window_item.fertile_start,
            window_item.fertile_end,
          ),
        );

        return Array.from({ length: total_days + 1 }, (_, index) =>
          format_date_input_value(add_days(window_item.fertile_start, index)),
        );
      }),
    ),
  ];
  current_cycle_runtime_state.ovulation_days = [
    ...new Set(
      [...confirmed_windows, ...predicted_windows].map((window_item) =>
        format_date_input_value(window_item.ovulation_date),
      ),
    ),
  ];
  current_cycle_runtime_state.generated_messages =
    generate_cycle_message_events(current_cycle_runtime_state);

  return current_cycle_runtime_state;
}

function rebuild_cycle_state() {
  current_cycle_runtime_state = null;
  return get_cycle_runtime_state(true);
}

function build_predicted_cycle_windows(entries, stats) {
  if (entries.length === 0) {
    return [];
  }

  const last_entry = entries[entries.length - 1];
  const predicted_windows = [];
  let predicted_start = add_days(
    parse_local_date(last_entry.startDate),
    clamp_number(last_entry.cycleLength, 18, 60, stats.cycle_length),
  );
  const max_date = add_days(start_of_today(), stats.cycle_length * 6);

  while (predicted_start <= max_date) {
    const predicted_start_text = format_date_input_value(predicted_start);
    const predicted_end = add_days(
      predicted_start,
      Math.max(stats.period_length - 1, 0),
    );
    const ovulation_date = add_days(predicted_start, stats.cycle_length - 14);
    predicted_windows.push({
      predicted_start_text,
      predicted_start,
      predicted_end,
      ovulation_date,
      fertile_start: new Date(
        Math.max(
          add_days(ovulation_date, -5).getTime(),
          add_days(predicted_end, 1).getTime(),
        ),
      ),
      fertile_end: add_days(ovulation_date, 1),
    });
    predicted_start = add_days(predicted_start, stats.cycle_length);
  }

  return predicted_windows;
}

function find_cycle_entry_for_date(date_value) {
  const date_text =
    typeof date_value === "string"
      ? date_value
      : format_date_input_value(date_value);
  const current_date = parse_local_date(date_text);
  const runtime_state = get_cycle_runtime_state();

  for (
    let index = 0;
    index < runtime_state.confirmed_windows.length;
    index += 1
  ) {
    const window_item = runtime_state.confirmed_windows[index];

    if (
      current_date >= window_item.start_date &&
      current_date <= window_item.end_date
    ) {
      return {
        entry: window_item.entry,
        index,
        start_date: window_item.start_date,
        end_date: window_item.end_date,
      };
    }
  }

  return null;
}

function find_cycle_anchor_entry_for_date(date_text) {
  const target_text =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const target_date = parse_local_date(target_text);
  const runtime_state = get_cycle_runtime_state();
  const direct_match = find_cycle_entry_for_date(target_text);

  if (direct_match) {
    return direct_match.entry;
  }

  for (const window_item of runtime_state.confirmed_windows) {
    if (
      target_date >= window_item.start_date &&
      target_date <=
        add_days(
          window_item.start_date,
          Math.max(window_item.cycle_length - 1, 0),
        )
    ) {
      return window_item.entry;
    }
  }

  return null;
}

function get_predicted_cycle_windows() {
  return [...get_cycle_runtime_state().predicted_windows];
}

function get_predicted_cycle_start_dates() {
  return get_predicted_cycle_windows().map(
    (window_item) => window_item.predicted_start_text,
  );
}

function find_cycle_day_status(date_value) {
  return find_cycle_day_status_from_runtime(
    date_value,
    get_cycle_runtime_state(),
  );
}

function find_cycle_day_status_from_runtime(date_value, runtime_state) {
  const date_text =
    typeof date_value === "string"
      ? date_value
      : format_date_input_value(date_value);
  const current_date = parse_local_date(date_text);

  for (const window_item of runtime_state.confirmed_windows) {
    if (
      current_date >= window_item.start_date &&
      current_date <= window_item.end_date
    ) {
      return {
        state: "period",
        entry: window_item.entry,
        period_day:
          calculate_days_between(window_item.start_date, current_date) + 1,
      };
    }
  }

  for (const window_item of runtime_state.confirmed_windows) {
    if (current_date.getTime() === window_item.ovulation_date.getTime()) {
      return {
        state: "ovulation",
        entry: window_item.entry,
        fertile_start: format_date_input_value(window_item.fertile_start),
        fertile_end: format_date_input_value(window_item.fertile_end),
        ovulation_date: format_date_input_value(window_item.ovulation_date),
        predicted_start: format_date_input_value(
          add_days(window_item.start_date, window_item.cycle_length),
        ),
      };
    }

    if (
      current_date >= window_item.fertile_start &&
      current_date <= window_item.fertile_end
    ) {
      return {
        state: "fertile",
        entry: window_item.entry,
        fertile_start: format_date_input_value(window_item.fertile_start),
        fertile_end: format_date_input_value(window_item.fertile_end),
        ovulation_date: format_date_input_value(window_item.ovulation_date),
        predicted_start: format_date_input_value(
          add_days(window_item.start_date, window_item.cycle_length),
        ),
      };
    }
  }

  for (const predicted_window of runtime_state.predicted_windows) {
    if (
      current_date >= predicted_window.predicted_start &&
      current_date <= predicted_window.predicted_end
    ) {
      return {
        state: "predicted_period",
        period_day:
          calculate_days_between(
            predicted_window.predicted_start,
            current_date,
          ) + 1,
        predicted_start: predicted_window.predicted_start_text,
      };
    }

    if (
      format_date_input_value(predicted_window.ovulation_date) === date_text
    ) {
      return {
        state: "ovulation",
        fertile_start: format_date_input_value(predicted_window.fertile_start),
        fertile_end: format_date_input_value(predicted_window.fertile_end),
        ovulation_date: format_date_input_value(
          predicted_window.ovulation_date,
        ),
        predicted_start: predicted_window.predicted_start_text,
      };
    }

    if (
      current_date >= predicted_window.fertile_start &&
      current_date <= predicted_window.fertile_end
    ) {
      return {
        state: "fertile",
        fertile_start: format_date_input_value(predicted_window.fertile_start),
        fertile_end: format_date_input_value(predicted_window.fertile_end),
        ovulation_date: format_date_input_value(
          predicted_window.ovulation_date,
        ),
        predicted_start: predicted_window.predicted_start_text,
      };
    }
  }

  return {
    state: "normal",
  };
}

function get_fertile_window_for_date(date_value) {
  const runtime_state = get_cycle_runtime_state();
  const current_date =
    typeof date_value === "string" ? parse_local_date(date_value) : date_value;

  for (const confirmed_window of runtime_state.confirmed_windows) {
    if (
      current_date >= confirmed_window.fertile_start &&
      current_date <= confirmed_window.fertile_end
    ) {
      return {
        fertile_start: format_date_input_value(confirmed_window.fertile_start),
        fertile_end: format_date_input_value(confirmed_window.fertile_end),
        ovulation_date: format_date_input_value(
          confirmed_window.ovulation_date,
        ),
        predicted_start: format_date_input_value(
          add_days(confirmed_window.start_date, confirmed_window.cycle_length),
        ),
      };
    }
  }

  for (const predicted_window of runtime_state.predicted_windows) {
    if (
      current_date >= predicted_window.fertile_start &&
      current_date <= predicted_window.fertile_end
    ) {
      return {
        fertile_start: format_date_input_value(predicted_window.fertile_start),
        fertile_end: format_date_input_value(predicted_window.fertile_end),
        ovulation_date: format_date_input_value(
          predicted_window.ovulation_date,
        ),
        predicted_start: predicted_window.predicted_start_text,
      };
    }
  }

  return null;
}

function get_cycle_today_context() {
  const runtime_state = get_cycle_runtime_state();
  return {
    today_text: runtime_state.today_text,
    today_status: runtime_state.today_status,
    next_predicted_start: runtime_state.next_predicted_start,
    days_until_next: runtime_state.days_until_next,
    window_is_active: runtime_state.window_is_active,
  };
}

function format_date_input_value(date_value) {
  const date =
    typeof date_value === "string"
      ? parse_local_date(date_value)
      : new Date(date_value);
  return `${date.getFullYear()}-${String(date.getMonth() + 1).padStart(2, "0")}-${String(date.getDate()).padStart(2, "0")}`;
}

function start_of_today() {
  const now = new Date();
  return new Date(now.getFullYear(), now.getMonth(), now.getDate());
}

function add_days(date_value, days_to_add) {
  const date = new Date(
    date_value.getFullYear(),
    date_value.getMonth(),
    date_value.getDate(),
  );
  date.setDate(date.getDate() + days_to_add);
  return date;
}

function get_cycle_month_day_cells() {
  const year = current_cycle_month_anchor.getFullYear();
  const month = current_cycle_month_anchor.getMonth();
  const first_day = new Date(year, month, 1);
  const last_day = new Date(year, month + 1, 0);
  const start_padding = first_day.getDay();
  const cell_list = [];

  for (let index = 0; index < start_padding; index += 1) {
    cell_list.push(null);
  }

  for (let day = 1; day <= last_day.getDate(); day += 1) {
    cell_list.push(new Date(year, month, day));
  }

  return cell_list;
}

function get_weekday_labels() {
  const labels = [];
  const base_sunday = new Date(2026, 4, 3);

  for (let index = 0; index < 7; index += 1) {
    labels.push(
      add_days(base_sunday, index).toLocaleDateString(translate("locale"), {
        weekday: "short",
      }),
    );
  }

  return labels;
}

function get_cycle_selected_date_or_today() {
  if (
    !current_selected_cycle_date ||
    Number.isNaN(parse_local_date(current_selected_cycle_date).getTime())
  ) {
    current_selected_cycle_date = format_date_input_value(new Date());
  }

  return current_selected_cycle_date;
}

function format_cycle_long_date(date_text) {
  return parse_local_date(date_text).toLocaleDateString(translate("locale"), {
    month: "long",
    day: "numeric",
    year: "numeric",
  });
}

function get_cycle_state_text(status) {
  if (status.state === "period") {
    return translate("cycle_day_of_period", status.period_day || 1);
  }

  if (status.state === "today") {
    return translate("cycle_state_today");
  }

  if (status.state === "predicted_period") {
    return translate("cycle_state_predicted");
  }

  if (status.state === "ovulation") {
    return translate("cycle_state_ovulation");
  }

  if (status.state === "fertile") {
    return translate("cycle_state_fertile");
  }

  return translate("cycle_state_normal");
}

function get_cycle_detail_note_text(date_text, status) {
  if (status.state === "period") {
    return translate("cycle_detail_period_note", status.period_day || 1);
  }

  if (status.state === "predicted_period") {
    return translate("cycle_detail_predicted_note");
  }

  if (status.state === "ovulation") {
    return translate("cycle_detail_ovulation_note");
  }

  if (status.state === "fertile") {
    return translate("cycle_detail_fertile_note");
  }

  return translate("cycle_detail_normal_note");
}

function render_cycle_day_mood_picker() {
  if (!dom_references.cycle_day_mood_picker) {
    return;
  }

  if (!can_edit_cycle_personal_details()) {
    current_cycle_mood_picker_open = false;
    dom_references.cycle_day_mood_picker.innerHTML = "";
    dom_references.cycle_day_mood_picker.classList.add("hidden");
    return;
  }

  dom_references.cycle_day_mood_picker.innerHTML = "";
  dom_references.cycle_day_mood_picker.classList.toggle(
    "hidden",
    !current_cycle_mood_picker_open,
  );

  if (!current_cycle_mood_picker_open) {
    return;
  }

  const selected_date = get_cycle_selected_date_or_today();
  const active_mood = get_cycle_mood_value(selected_date);

  get_cycle_mood_options().forEach((mood_option) => {
    const mood_button = document.createElement("button");
    mood_button.type = "button";
    mood_button.className = "cycle_mood_option_button";
    mood_button.textContent = mood_option.emoji;
    mood_button.title = mood_option.label;
    mood_button.setAttribute("aria-label", mood_option.label);
    mood_button.classList.toggle("is_active", active_mood === mood_option.key);
    mood_button.addEventListener("click", () => {
      set_cycle_mood_for_date(selected_date, mood_option.key);
      current_cycle_mood_picker_open = false;
      render_cycle_day_detail();
    });
    dom_references.cycle_day_mood_picker.appendChild(mood_button);
  });
}

function get_cycle_status_text() {
  const selected_date = get_cycle_selected_date_or_today();
  const selected_status = find_cycle_day_status(selected_date);

  if (
    selected_date === format_date_input_value(new Date()) &&
    selected_status.state === "normal"
  ) {
    const context = get_cycle_today_context();
    return translate("cycle_starts_in", context.days_until_next);
  }

  return get_cycle_state_text(selected_status);
}

function hash_text_seed(seed_text) {
  return [...String(seed_text || "seed")].reduce(
    (total, character) => total + character.charCodeAt(0),
    0,
  );
}

function pick_cycle_support_suffix(seed_text, suffix_type) {
  const base_list =
    cycle_support_messages.length > 0
      ? cycle_support_messages
      : [translate("cycle_support_soft_suffix")];
  const selected_message =
    base_list[hash_text_seed(`${seed_text}_${suffix_type}`) % base_list.length];
  const translated_suffix =
    suffix_type === "warning"
      ? translate("cycle_support_warning_suffix")
      : suffix_type === "period"
        ? translate("cycle_support_day_suffix")
        : translate("cycle_support_soft_suffix");
  return `${selected_message} ${translated_suffix}`.trim();
}

function generate_cycle_message_events(runtime_state) {
  const generated_events = [];
  const today_text = runtime_state.today_text;
  const today_status = runtime_state.today_status;

  if (runtime_state.days_until_next === 2 && today_status.state !== "period") {
    generated_events.push({
      id: `cycle-warning-${today_text}`,
      type: "cycle-warning",
      date: today_text,
      priority: 3,
      generated: true,
      content:
        `${translate("cycle_generated_warning")} ${pick_cycle_support_suffix(today_text, "warning")}`.trim(),
    });
  }

  if (today_status.state === "period") {
    const period_day = today_status.period_day || 1;
    const intro =
      period_day === 1
        ? translate("cycle_generated_day_one")
        : period_day === 2
          ? translate("cycle_generated_day_two")
          : translate("cycle_generated_day_n", period_day);

    generated_events.push({
      id: `cycle-day-${today_text}`,
      type: "cycle-day",
      date: today_text,
      priority: 5,
      generated: true,
      content:
        `${intro} ${pick_cycle_support_suffix(`${today_text}_${period_day}`, "period")}`.trim(),
    });
  }

  return generated_events;
}

function get_active_cycle_message_event() {
  const runtime_state = get_cycle_runtime_state();
  return (
    [...runtime_state.generated_messages].sort(
      (left_event, right_event) => right_event.priority - left_event.priority,
    )[0] || null
  );
}

function on_cycle_change(options = {}) {
  const { sync_remote = true } = options;
  rebuild_cycle_runtime_state();
  cleanup_expired_cycle_checkins();
  save_cycle_data({ sync_remote });
  render_cycle_calendar();
  maybe_prompt_cycle_feeling();
  void schedule_cycle_notifications();
}

function is_future_cycle_date(date_text) {
  return parse_local_date(date_text) > start_of_today();
}

function show_cycle_validation_message(message_text) {
  void show_app_alert(message_text, {
    title: translate("app_notice_title"),
  });
}

async function get_cycle_overlap_resolution(overlap_entry) {
  const replace_existing = await show_app_confirm(
    `${translate("cycle_overlap_title")}\n\n${translate("cycle_overlap_replace")}`,
    {
      title: translate("cycle_overlap_title"),
      confirm_label: translate("confirm_action"),
    },
  );

  if (replace_existing) {
    return "replace";
  }

  const merge_existing = await show_app_confirm(
    translate("cycle_overlap_merge"),
    {
      title: translate("cycle_overlap_title"),
      confirm_label: translate("confirm_action"),
    },
  );

  if (merge_existing) {
    return "merge";
  }

  return "cancel";
}

function close_previous_open_cycle_if_needed(
  entry_list,
  target_start_text,
  preferred_period_length,
) {
  const target_start = parse_local_date(target_start_text);
  const previous_open_entry = [...entry_list]
    .filter((entry) => !entry.endDate)
    .sort(
      (left_entry, right_entry) =>
        parse_local_date(right_entry.startDate) -
        parse_local_date(left_entry.startDate),
    )
    .find((entry) => parse_local_date(entry.startDate) < target_start);

  if (!previous_open_entry) {
    return;
  }

  const projected_end = add_days(
    parse_local_date(previous_open_entry.startDate),
    Math.max(
      (preferred_period_length ||
        previous_open_entry.periodLength ||
        get_cycle_stats().period_length) - 1,
      0,
    ),
  );
  const latest_safe_end = add_days(target_start, -1);

  if (projected_end <= latest_safe_end) {
    previous_open_entry.endDate = format_date_input_value(projected_end);
  } else if (
    latest_safe_end >= parse_local_date(previous_open_entry.startDate)
  ) {
    previous_open_entry.endDate = format_date_input_value(latest_safe_end);
  }

  previous_open_entry.periodLength =
    get_cycle_entry_duration(previous_open_entry) ||
    previous_open_entry.periodLength;
}

function set_pending_message_context(context_value) {
  pending_message_context = context_value;
  render_live_message_context_preview();
  dom_references.live_message_input.focus();
}

function clear_pending_message_context() {
  pending_message_context = null;
  render_live_message_context_preview();
}

function render_live_message_context_preview() {
  if (!dom_references.live_message_context_preview) {
    return;
  }

  if (
    !pending_message_context ||
    !["reply", "cycle_note"].includes(pending_message_context.kind)
  ) {
    dom_references.live_message_context_preview.classList.add("hidden");
    dom_references.live_message_context_preview.classList.remove(
      "is_reply_preview",
    );
    dom_references.live_message_context_label.textContent = "";
    dom_references.live_message_context_body.textContent = "";
    return;
  }

  dom_references.live_message_context_preview.classList.remove("hidden");
  dom_references.live_message_context_preview.classList.add("is_reply_preview");
  dom_references.live_message_context_label.textContent =
    pending_message_context.preview_label || "";
  dom_references.live_message_context_body.textContent = get_plain_text_snippet(
    pending_message_context.preview_body || "",
    50,
  );
}

function build_reply_context_from_message(message_item) {
  const is_replying_to_self =
    current_user_profile?.user_key === message_item.sender_key;
  const sender_name = get_message_sender_label(
    message_item,
    is_replying_to_self,
  );
  const preview_text = get_preview_snippet(
    get_live_message_display_text(message_item),
  );

  return {
    kind: "reply",
    reference_id: message_item.id,
    sender_name,
    title: sender_name,
    text: preview_text,
    preview_label: is_replying_to_self
      ? translate("replying_to_self")
      : translate("replying_to", sender_name),
    preview_body: preview_text,
  };
}

function build_cycle_note_context(date_text, note_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const safe_note_text = String(note_text || "").trim();

  if (!safe_note_text) {
    return null;
  }

  return {
    kind: "cycle_note",
    reference_type: "cycle_note",
    reference_id: normalized_date,
    title: format_cycle_long_date(normalized_date),
    text: get_preview_snippet(safe_note_text),
    preview_label: translate("mentioning_cycle_note"),
    preview_body: safe_note_text,
  };
}

function build_mention_context(item_type, item_id) {
  if (item_type === "memory") {
    const memory_item = current_memory_items.find(
      (item) => item.id === item_id,
    );

    if (!memory_item) {
      return null;
    }

    return {
      kind: "mention",
      reference_type: "memory",
      reference_id: item_id,
      title: memory_item.title,
      subtitle: get_item_display_date(memory_item, "fallback_memory_date"),
      text: get_preview_snippet(get_item_thought_preview(memory_item, "note")),
      preview_label: translate("mentioning_memory"),
      preview_body: memory_item.title,
    };
  }

  const event_item = current_event_items.find((item) => item.id === item_id);

  if (!event_item) {
    return null;
  }

  return {
    kind: "mention",
    reference_type: "event",
    reference_id: item_id,
    title: event_item.title,
    subtitle: get_item_display_date(event_item, "fallback_event_date"),
    text: get_preview_snippet(get_item_thought_preview(event_item, "description")),
    preview_label: translate("mentioning_day"),
    preview_body: event_item.title,
  };
}

function get_preview_snippet(raw_text) {
  const text = String(raw_text || "")
    .replace(/\s+/g, " ")
    .trim();
  return text.length > 96 ? `${text.slice(0, 93)}...` : text;
}

function get_context_attachment(attachment_list) {
  return (
    (attachment_list || []).find(
      (attachment) =>
        attachment?.kind === "reply" || attachment?.kind === "cycle_note",
    ) || null
  );
}

function get_structured_content_attachment(attachment_list) {
  return (
    (attachment_list || []).find(
      (attachment) => attachment?.kind === "structured_content",
    ) || null
  );
}

function get_file_attachments(attachment_list) {
  return (attachment_list || []).filter(
    (attachment) => !attachment?.kind || attachment.kind === "file",
  );
}

async function hydrate_live_message_storage_sources(message_or_messages) {
  const hydrate_attachment = (attachment) => {
    if (!attachment || attachment.kind !== "file" || attachment.public_url) {
      return attachment;
    }

    if (!attachment.storage_path) {
      return attachment;
    }

    return {
      ...attachment,
      public_url: get_supabase_media_public_url(
        attachment.storage_path,
        attachment.bucket || supabase_media_bucket_name,
      ),
    };
  };

  const hydrate_message = (message_item) => ({
    ...message_item,
    attachments: Array.isArray(message_item?.attachments)
      ? message_item.attachments.map(hydrate_attachment)
      : [],
  });

  if (Array.isArray(message_or_messages)) {
    return message_or_messages.map(hydrate_message);
  }

  return hydrate_message(message_or_messages);
}

function render_message_context_attachment(context_attachment) {
  const preview_wrap = document.createElement("button");
  preview_wrap.className = "live_message_reference_preview";
  preview_wrap.type = "button";
  const preview_label = document.createElement("p");
  preview_label.className = "live_message_reference_label";
  preview_label.textContent =
    context_attachment.kind === "reply"
      ? translate("reply_preview")
      : context_attachment.kind === "cycle_note"
        ? translate("cycle_note_reference_label")
        : translate("mention_preview");
  const preview_body = document.createElement("p");
  preview_body.className = "live_message_reference_body";
  preview_body.textContent = context_attachment.title || "";
  preview_wrap.append(preview_label, preview_body);

  if (context_attachment.text) {
    const preview_note = document.createElement("p");
    preview_note.className = "live_message_reference_note";
    preview_note.textContent = context_attachment.text;
    preview_wrap.appendChild(preview_note);
  }

  if (context_attachment.reference_id) {
    preview_wrap.addEventListener("click", () => {
      if (context_attachment.kind === "reply") {
        scroll_to_message_by_id(context_attachment.reference_id);
        return;
      }

      if (context_attachment.kind === "cycle_note") {
        open_cycle_note_reference(context_attachment.reference_id);
      }
    });
  }

  return preview_wrap;
}

function render_message_segments_into_body(container, segments) {
  segments.forEach((segment) => {
    if (segment.type === "mention") {
      container.appendChild(create_message_mention_chip(segment));
      return;
    }

    const text_node = document.createElement("span");
    text_node.className = "message_segment_text";
    text_node.textContent = segment.text || "";
    container.appendChild(text_node);
  });
}

function build_download_filename(label_text = "memory") {
  const normalized_label = String(label_text || "memory")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 42);

  return `${normalized_label || "memory"}-image.png`;
}

function parse_data_url(data_url) {
  const match = String(data_url || "").match(/^data:([^;,]+)?(;base64)?,(.*)$/);

  if (!match) {
    return null;
  }

  const [, mime_type = "application/octet-stream", base64_marker, payload] =
    match;
  const decoded_payload = decodeURIComponent(payload || "");
  const base64_data = base64_marker
    ? decoded_payload
    : btoa(unescape(encodeURIComponent(decoded_payload)));

  return {
    mime_type,
    base64_data,
  };
}

function data_url_to_blob(data_url) {
  const parsed_data_url = parse_data_url(data_url);

  if (!parsed_data_url) {
    return null;
  }

  const byte_string = atob(parsed_data_url.base64_data);
  const byte_numbers = new Array(byte_string.length);

  for (let index = 0; index < byte_string.length; index += 1) {
    byte_numbers[index] = byte_string.charCodeAt(index);
  }

  return new Blob([new Uint8Array(byte_numbers)], {
    type: parsed_data_url.mime_type,
  });
}

async function save_data_url_with_capacitor(data_url, filename) {
  const filesystem_plugin = window.Capacitor?.Plugins?.Filesystem;
  const parsed_data_url = parse_data_url(data_url);

  if (!filesystem_plugin || !parsed_data_url) {
    return false;
  }

  const safe_filename = filename || "memory-image.png";
  const file_path = `Svetlana-Diab/${safe_filename}`;

  try {
    await filesystem_plugin.writeFile({
      path: file_path,
      data: parsed_data_url.base64_data,
      directory: "DOCUMENTS",
      recursive: true,
    });
    void show_app_alert(translate("download_saved", `Documents/${file_path}`), {
      title: translate("download"),
    });
    return true;
  } catch (error) {
    log_app_error("capacitor_memory_download_failed", error);
    return false;
  }
}

async function download_data_url(data_url, filename) {
  if (!data_url) {
    return;
  }

  const saved_natively = await save_data_url_with_capacitor(
    data_url,
    filename,
  );

  if (saved_natively) {
    return;
  }

  const blob = data_url_to_blob(data_url);
  const object_url = blob ? URL.createObjectURL(blob) : "";
  const link = document.createElement("a");
  link.href = object_url || data_url;
  link.download = filename || "memory-image.png";
  document.body.appendChild(link);
  link.click();
  link.remove();

  if (object_url) {
    window.setTimeout(() => URL.revokeObjectURL(object_url), 1000);
  }
}

function handle_memory_lightbox_download(event) {
  event?.stopPropagation();
  void download_data_url(
    current_lightbox_image_data,
    build_download_filename(current_lightbox_title),
  );
}

function open_memory_lightbox(image_data, caption_text = "") {
  if (!image_data) {
    return;
  }

  current_lightbox_image_data = image_data;
  current_lightbox_title = caption_text;
  dom_references.memory_lightbox_image.src = image_data;
  dom_references.memory_lightbox_image.alt = caption_text;
  dom_references.memory_lightbox_caption.textContent = caption_text;
  dom_references.memory_lightbox.classList.remove("hidden");
  dom_references.memory_lightbox.setAttribute("aria-hidden", "false");
  open_overlay_layer("memory_lightbox");
}

function close_memory_lightbox(event = null, from_history = false) {
  if (event && event.target !== dom_references.memory_lightbox) {
    return;
  }

  dom_references.memory_lightbox.classList.add("hidden");
  dom_references.memory_lightbox.setAttribute("aria-hidden", "true");
  dom_references.memory_lightbox_image.src = "";
  dom_references.memory_lightbox_caption.textContent = "";
  current_lightbox_image_data = "";
  current_lightbox_title = "";
  close_overlay_layer("memory_lightbox", from_history);
}

function get_person_display_name(user_key) {
  return allowed_users[user_key]?.display_name || String(user_key || "");
}

function parse_item_thoughts(raw_text) {
  const marker = "__SVETA_THOUGHTS__:";
  const safe_text = String(raw_text || "");

  if (!safe_text.startsWith(marker)) {
    return null;
  }

  try {
    const parsed_value = JSON.parse(safe_text.slice(marker.length));
    return parsed_value && typeof parsed_value === "object" ? parsed_value : {};
  } catch (error) {
    return {};
  }
}

function encode_item_thoughts(thoughts) {
  return `__SVETA_THOUGHTS__:${JSON.stringify(thoughts || {})}`;
}

function get_item_thoughts(item, field_name) {
  const parsed_thoughts = parse_item_thoughts(item?.[field_name]);

  if (parsed_thoughts) {
    return parsed_thoughts;
  }

  const direct_thoughts =
    item?.thoughts && typeof item.thoughts === "object" ? item.thoughts : null;

  if (direct_thoughts) {
    return direct_thoughts;
  }

  const plain_text = String(item?.[field_name] || "").trim();

  if (!plain_text || item?.is_placeholder) {
    return {};
  }

  const legacy_author_key =
    item?.author_key ||
    item?.created_by ||
    item?.owner_key ||
    item?.added_by ||
    (item?.id === "first_day" ? "diab" : "svetlana");

  return {
    [legacy_author_key]: plain_text,
  };
}

function get_item_thought_text(item, field_name, user_key) {
  const thoughts = get_item_thoughts(item, field_name);
  return String(thoughts[user_key] || "").trim();
}

function get_item_thought_preview(item, field_name) {
  const thoughts = get_item_thoughts(item, field_name);
  return Object.values(thoughts).filter(Boolean).join(" ");
}

function create_thought_action_button(item_type, item_id, has_current_thought) {
  const button = document.createElement("button");
  button.className = "thought_action_button";
  button.type = "button";
  button.dataset.action = `edit_${item_type}`;
  button.dataset.item_id = item_id;
  button.textContent = translate(
    has_current_thought ? "edit_your_thought" : "add_your_thought",
  );
  button.setAttribute("aria-label", button.textContent);
  return button;
}

function render_item_thoughts(item, field_name, item_type = "memory") {
  const thoughts = get_item_thoughts(item, field_name);
  const thought_entries = Object.entries(thoughts).filter(([, text]) =>
    String(text || "").trim(),
  );
  const has_current_thought = Boolean(
    current_user_profile?.user_key &&
      String(thoughts[current_user_profile.user_key] || "").trim(),
  );

  if (thought_entries.length === 0) {
    const fallback = document.createElement("div");
    fallback.className = "item_thought_list";
    if (!item?.is_placeholder) {
      fallback.appendChild(
        create_thought_action_button(item_type, item?.id || "", false),
      );
    }
    return fallback;
  }

  const wrap = document.createElement("div");
  wrap.className = "item_thought_list";
  thought_entries.forEach(([user_key, thought_text]) => {
    const line = document.createElement("div");
    line.className = "item_thought_line";
    const author = document.createElement("span");
    author.className = "item_thought_author";
    author.textContent = `${get_person_display_name(user_key)}'s thought`;
    const text = document.createElement("span");
    text.className = "item_thought_text";
    text.textContent = ` ${String(thought_text).trim()}`;
    line.append(
      author,
      text,
    );

    wrap.appendChild(line);

    if (current_user_profile?.user_key === user_key && !item?.is_placeholder) {
      wrap.appendChild(create_thought_action_button(item_type, item.id, true));
    }
  });

  if (!has_current_thought && !item?.is_placeholder) {
    wrap.appendChild(create_thought_action_button(item_type, item.id, false));
  }

  return wrap;
}

function render_memory_gallery(memory_items) {
  dom_references.memory_gallery.innerHTML = "";

  memory_items.forEach((memory_item) => {
    const memory_card = document.createElement("article");
    memory_card.className = memory_item.image_data
      ? "memory_card memory_card_with_image"
      : "memory_card";
    memory_card.dataset.memoryId = memory_item.id;

    if (memory_item.image_data) {
      const memory_image = document.createElement("img");
      memory_image.src = memory_item.image_data;
      memory_image.alt = memory_item.title;
      memory_image.className = "memory_card_image";
      memory_card.appendChild(memory_image);
    }

    const memory_text = document.createElement("div");
    memory_text.className = "memory_text";

    const memory_date = document.createElement("p");
    memory_date.className = "memory_date";
    memory_date.textContent = get_item_display_date(
      memory_item,
      "fallback_memory_date",
    );

    const memory_title = document.createElement("h3");
    memory_title.textContent = memory_item.title;

    memory_text.append(
      memory_date,
      memory_title,
      render_item_thoughts(memory_item, "note", "memory"),
    );

    if (!memory_item.is_placeholder) {
      const memory_actions = create_item_actions("memory", memory_item.id, {
        with_text: true,
        allow_download: Boolean(memory_item.image_data),
      });
      memory_text.appendChild(memory_actions);
    }

    memory_card.appendChild(memory_text);
    dom_references.memory_gallery.appendChild(memory_card);
  });
}

function render_event_timeline(event_items) {
  dom_references.event_timeline.innerHTML = "";

  event_items.forEach((event_item) => {
    const timeline_item = document.createElement("article");
    timeline_item.className = "timeline_item";
    timeline_item.dataset.eventId = event_item.id;

    const timeline_marker = document.createElement("span");
    timeline_marker.className = "timeline_marker";
    timeline_marker.setAttribute("aria-hidden", "true");

    const timeline_content = document.createElement("div");
    timeline_content.className = "timeline_content";

    const timeline_date = document.createElement("time");
    timeline_date.textContent = get_item_display_date(
      event_item,
      "fallback_event_date",
    );

    const timeline_title = document.createElement("h3");
    timeline_title.textContent = event_item.title;

    timeline_content.append(
      timeline_date,
      timeline_title,
      render_item_thoughts(event_item, "description", "event"),
    );

    const can_diab_edit_first_day =
      event_item.id === "first_day" &&
      event_item.is_locked &&
      current_user_profile &&
      current_user_profile.user_key === "diab";

    if (can_diab_edit_first_day) {
      timeline_content.appendChild(
        create_item_actions("event", event_item.id, {
          allow_delete: false,
        }),
      );
    } else if (event_item.is_locked) {
      timeline_content.appendChild(
        create_item_actions("event", event_item.id, {
          allow_edit: false,
          allow_delete: false,
        }),
      );
    } else if (!event_item.is_locked) {
      timeline_content.appendChild(create_item_actions("event", event_item.id));
    }

    timeline_item.append(timeline_marker, timeline_content);
    dom_references.event_timeline.appendChild(timeline_item);
  });
}

function create_item_actions(item_type, item_id, options = {}) {
  const {
    with_text = false,
    allow_edit = true,
    allow_delete = true,
    allow_download = true,
  } = options;
  const action_bar = document.createElement("div");
  action_bar.className = "item_actions";

  if (allow_edit) {
    const edit_button = document.createElement("button");
    edit_button.className = "small_action_button";
    edit_button.type = "button";
    edit_button.dataset.action = `edit_${item_type}`;
    edit_button.dataset.item_id = item_id;
    edit_button.title = translate("edit");
    edit_button.setAttribute("aria-label", translate("edit"));
    edit_button.appendChild(create_action_icon("edit"));

    if (with_text) {
      edit_button.classList.add("has_label");
      edit_button.appendChild(create_action_label(translate("edit")));
    }

    action_bar.appendChild(edit_button);
  }

  if (allow_delete) {
    const delete_button = document.createElement("button");
    delete_button.className = "small_action_button danger_action_button";
    delete_button.type = "button";
    delete_button.dataset.action = `delete_${item_type}`;
    delete_button.dataset.item_id = item_id;
    delete_button.title = translate("delete");
    delete_button.setAttribute("aria-label", translate("delete"));
    delete_button.appendChild(create_action_icon("delete"));

    if (with_text) {
      delete_button.classList.add("has_label");
      delete_button.appendChild(create_action_label(translate("delete")));
    }

    action_bar.appendChild(delete_button);
  }

  const mention_button = document.createElement("button");
  mention_button.className = "small_action_button has_label";
  mention_button.type = "button";
  mention_button.dataset.action = `mention_${item_type}`;
  mention_button.dataset.item_id = item_id;
  mention_button.title = translate("mention");
  mention_button.setAttribute("aria-label", translate("mention"));
  mention_button.appendChild(create_action_icon("mention"));
  mention_button.appendChild(create_action_label(translate("mention")));
  action_bar.appendChild(mention_button);

  if (item_type === "memory" && allow_download) {
    const download_button = document.createElement("button");
    download_button.className = "small_action_button";
    download_button.type = "button";
    download_button.dataset.action = "download_memory";
    download_button.dataset.item_id = item_id;
    download_button.title = translate("download");
    download_button.setAttribute("aria-label", translate("download"));
    download_button.appendChild(create_action_icon("download"));
    action_bar.appendChild(download_button);
  }

  return action_bar;
}

function create_action_label(label_text) {
  const label = document.createElement("span");
  label.className = "action_button_label";
  label.textContent = label_text;
  return label;
}

function create_action_icon(icon_name) {
  const icon = document.createElementNS("http://www.w3.org/2000/svg", "svg");
  icon.setAttribute("viewBox", "0 0 24 24");
  icon.setAttribute("aria-hidden", "true");
  icon.classList.add("action_icon");
  const path = document.createElementNS("http://www.w3.org/2000/svg", "path");

  if (icon_name === "edit") {
    path.setAttribute(
      "d",
      "M4 20h4.6L18.9 9.7l-4.6-4.6L4 15.4V20Zm12.7-12.5 1.6-1.6c.6-.6.6-1.4 0-2l-.2-.2c-.6-.6-1.4-.6-2 0l-1.6 1.6 2.2 2.2Z",
    );
  } else if (icon_name === "mention") {
    path.setAttribute(
      "d",
      "M12 4a8 8 0 1 0 5.7 13.6M16.8 8.6v4.7c0 1 .8 1.7 1.7 1.7.9 0 1.7-.8 1.7-1.7V12a8.2 8.2 0 1 0-2.4 5.8",
    );
  } else if (icon_name === "download") {
    path.setAttribute(
      "d",
      "M11 4h2v8.2l3.2-3.2 1.4 1.4L12 16 6.4 10.4 7.8 9l3.2 3.2V4Zm-5 14h12v2H6v-2Z",
    );
  } else {
    path.setAttribute(
      "d",
      "M8 21c-1.1 0-2-.9-2-2V8H5c-.6 0-1-.4-1-1s.4-1 1-1h4V5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v1h4c.6 0 1 .4 1 1s-.4 1-1 1h-1v11c0 1.1-.9 2-2 2H8Zm3-16v1h2V5h-2Zm-1 13c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1Zm4 0c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1Z",
    );
  }

  icon.appendChild(path);
  return icon;
}

function burst_reaction(source_element, type = "heart", amount = 10) {
  if (
    !source_element ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const bounds = source_element.getBoundingClientRect();
  const origin_x = bounds.left + bounds.width / 2;
  const origin_y =
    type === "heart" ? bounds.bottom - 14 : bounds.top + bounds.height / 2;

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const drift = (Math.random() - 0.5) * 170;
    const lift = 86 + Math.random() * 130;
    const delay = Math.random() * 120;
    const size = 12 + Math.random() * 16;

    particle.className =
      type === "heart"
        ? "reaction_particle reaction_heart"
        : "reaction_particle reaction_spark";
    particle.style.left = `${origin_x + (Math.random() - 0.5) * bounds.width * 0.75}px`;
    particle.style.top = `${origin_y + (Math.random() - 0.5) * 24}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--reaction_drift", `${drift}px`);
    particle.style.setProperty("--reaction_lift", `${lift}px`);
    particle.style.animationDelay = `${delay}ms`;

    dom_references.reaction_layer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 1800 + delay);
  }
}

function burst_emoji_reaction(
  source_element,
  emoji_list,
  amount = 10,
  size_range = [20, 34],
) {
  if (
    !source_element ||
    window.matchMedia("(prefers-reduced-motion: reduce)").matches
  ) {
    return;
  }

  const bounds = source_element.getBoundingClientRect();
  const origin_x = bounds.left + bounds.width / 2;
  const origin_y = bounds.top + bounds.height / 2;

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const drift = (Math.random() - 0.5) * 180;
    const lift = 92 + Math.random() * 140;
    const delay = Math.random() * 160;
    const size =
      size_range[0] + Math.random() * (size_range[1] - size_range[0]);
    particle.className = "reaction_particle reaction_emoji";
    particle.textContent =
      emoji_list[Math.floor(Math.random() * emoji_list.length)];
    particle.style.left = `${origin_x + (Math.random() - 0.5) * bounds.width * 0.85}px`;
    particle.style.top = `${origin_y + (Math.random() - 0.5) * bounds.height * 0.4}px`;
    particle.style.fontSize = `${size}px`;
    particle.style.setProperty("--reaction_drift", `${drift}px`);
    particle.style.setProperty("--reaction_lift", `${lift}px`);
    particle.style.animationDelay = `${delay}ms`;
    dom_references.reaction_layer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 1900 + delay);
  }
}

function show_hero_symbol_message() {
  const message_element = dom_references.hero_symbol_message;
  const message_text = "I love you, Svetlana";

  if (!message_element) {
    return;
  }

  if (hero_message_timer_id) {
    window.clearTimeout(hero_message_timer_id);
    hero_message_timer_id = null;
  }

  if (hero_message_cleanup_id) {
    window.clearTimeout(hero_message_cleanup_id);
    hero_message_cleanup_id = null;
  }

  message_element.textContent = "";
  message_element.classList.remove("is_blooming");
  message_element.classList.add("is_visible");
  let current_index = 0;

  const write_next = () => {
    if (current_index >= message_text.length) {
      hero_message_timer_id = window.setTimeout(() => {
        message_element.classList.add("is_blooming");
        burst_emoji_reaction(
          dom_references.hero_symbol,
          hero_firework_emojis,
          20,
          [18, 34],
        );
        burst_reaction(dom_references.hero_symbol, "spark", 16);
        window.setTimeout(() => {
          burst_emoji_reaction(
            dom_references.hero_symbol,
            hero_firework_emojis,
            14,
            [16, 28],
          );
        }, 1800);
        window.setTimeout(() => {
          burst_reaction(dom_references.hero_symbol, "spark", 14);
        }, 4200);
      }, 220);

      hero_message_cleanup_id = window.setTimeout(() => {
        message_element.classList.remove("is_visible", "is_blooming");
        message_element.textContent = "";
      }, 10200);
      return;
    }

    current_index += 1;
    message_element.textContent = message_text.slice(0, current_index);
    hero_message_timer_id = window.setTimeout(
      write_next,
      current_index < 5 ? 68 : 44,
    );
  };

  write_next();
}

function show_cycle_support_echo_message() {
  const message_element = dom_references.cycle_support_echo;
  const message_text = translate("cycle_support_bloom_message");

  if (!message_element) {
    return;
  }

  if (cycle_support_echo_timer_id) {
    window.clearTimeout(cycle_support_echo_timer_id);
    cycle_support_echo_timer_id = null;
  }

  if (cycle_support_echo_cleanup_id) {
    window.clearTimeout(cycle_support_echo_cleanup_id);
    cycle_support_echo_cleanup_id = null;
  }

  message_element.textContent = "";
  message_element.classList.remove("is_blooming", "hidden");
  message_element.classList.add("is_visible");
  let current_index = 0;

  const write_next = () => {
    if (current_index >= message_text.length) {
      cycle_support_echo_timer_id = window.setTimeout(() => {
        message_element.classList.add("is_blooming");
      }, 220);

      cycle_support_echo_cleanup_id = window.setTimeout(() => {
        message_element.classList.remove("is_visible", "is_blooming");
        message_element.classList.add("hidden");
        message_element.textContent = "";
      }, 30000);
      return;
    }

    current_index += 1;
    message_element.textContent = message_text.slice(0, current_index);
    cycle_support_echo_timer_id = window.setTimeout(
      write_next,
      current_index < 6 ? 58 : 34,
    );
  };

  write_next();
}

function launch_heart_shower() {
  if (window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const amount = 18;

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const size = 12 + Math.random() * 18;
    const drift = (Math.random() - 0.5) * 150;
    const lift = window.innerHeight * (0.55 + Math.random() * 0.18);
    const delay = index * 140 + Math.random() * 90;
    particle.className = "reaction_particle reaction_heart shower_heart";
    particle.style.left = `${Math.random() * window.innerWidth}px`;
    particle.style.top = `${window.innerHeight + 24 + Math.random() * 20}px`;
    particle.style.width = `${size}px`;
    particle.style.height = `${size}px`;
    particle.style.setProperty("--reaction_drift", `${drift}px`);
    particle.style.setProperty("--reaction_lift", `${lift}px`);
    particle.style.animationDelay = `${delay}ms`;
    dom_references.reaction_layer.appendChild(particle);
    window.setTimeout(() => particle.remove(), 5600 + delay);
  }
}

function start_heart_shower_cycle() {
  if (heart_shower_interval_id) {
    return;
  }

  heart_shower_timeout_id = window.setTimeout(launch_heart_shower, 28000);
  heart_shower_interval_id = window.setInterval(launch_heart_shower, 120000);
}

function normalize_sound_manifest(manifest_value = {}) {
  return {
    background_music: Array.isArray(manifest_value.background_music)
      ? manifest_value.background_music
      : [],
    welcome: Array.isArray(manifest_value.welcome)
      ? manifest_value.welcome
      : [],
    logout: Array.isArray(manifest_value.logout) ? manifest_value.logout : [],
    message_send: Array.isArray(manifest_value.message_send)
      ? manifest_value.message_send
      : [],
    message_receive: Array.isArray(manifest_value.message_receive)
      ? manifest_value.message_receive
      : [],
  };
}

async function load_sound_manifest() {
  current_sound_manifest = normalize_sound_manifest(local_sound_manifest_fallback);
}

function apply_saved_music_setting() {
  music_enabled = localStorage.getItem(music_toggle_storage_key) !== "off";
}

function update_music_button() {
  if (!dom_references.music_toggle_button) {
    return;
  }

  const label = translate(
    music_enabled ? "music_on_short" : "music_mute_short",
  );
  const title = `${translate("music_toggle_label")}: ${label}`;
  dom_references.music_toggle_label.textContent = label;
  dom_references.music_toggle_button.setAttribute("aria-label", title);
  dom_references.music_toggle_button.title = title;
  dom_references.music_toggle_button.setAttribute(
    "aria-pressed",
    String(music_enabled),
  );
  const music_icon =
    dom_references.music_toggle_button.querySelector(".music_toggle_icon");

  if (music_icon) {
    music_icon.textContent = music_enabled ? "🔊" : "🔇";
  }

  if (background_music_audio) {
    background_music_audio.muted = !music_enabled;
  }

  update_music_control_buttons();
}

function play_existing_background_music() {
  if (!background_music_audio) {
    return;
  }

  background_music_audio.muted = !music_enabled;
  const play_result = background_music_audio.play();

  if (play_result?.catch) {
    play_result
      .then(() => {
        background_music_needs_unlock = false;
        update_music_control_buttons();
      })
      .catch(() => {
        background_music_needs_unlock = true;
        update_music_control_buttons();
      });
    return;
  }

  background_music_needs_unlock = false;
  update_music_control_buttons();
}

function toggle_music() {
  music_enabled = !music_enabled;
  localStorage.setItem(music_toggle_storage_key, music_enabled ? "on" : "off");
  update_music_button();

  if (!music_enabled) {
    return;
  }

  if (background_music_paused_by_user) {
    update_music_control_buttons();
    return;
  }

  if (background_music_audio && background_music_audio.paused) {
    background_music_paused_by_lifecycle = false;
    play_existing_background_music();
    return;
  }

  if (!background_music_audio) {
    background_music_paused_by_user = false;
    sync_cycle_audio();
  }
}

function pause_background_music_for_lifecycle() {
  if (!background_music_audio || background_music_audio.paused) {
    return;
  }

  background_music_paused_by_lifecycle = true;
  background_music_audio.pause();
  update_music_control_buttons();
}

function resume_background_music_from_lifecycle() {
  if (!background_music_paused_by_lifecycle) {
    return;
  }

  if (!music_enabled || background_music_paused_by_user) {
    return;
  }

  if (!should_play_background_music()) {
    return;
  }

  background_music_paused_by_lifecycle = false;

  if (background_music_audio) {
    play_existing_background_music();
    return;
  }

  ensure_background_music();
}

function handle_app_visibility_change() {
  if (document.hidden) {
    mark_current_user_typing(false);
    mark_current_user_seen(false, true);
    pause_background_music_for_lifecycle();
    return;
  }

  mark_current_user_seen(is_app_active_for_presence(), true);
  resume_background_music_from_lifecycle();
}

function bind_capacitor_app_lifecycle() {
  const app_plugin = window.Capacitor?.Plugins?.App;

  if (!app_plugin?.addListener) {
    return;
  }

  app_plugin.addListener("appStateChange", (state) => {
    if (state?.isActive) {
      mark_current_user_seen(true, true);
      resume_background_music_from_lifecycle();
      return;
    }

    mark_current_user_seen(false, true);
    pause_background_music_for_lifecycle();
  });
}

function handle_audio_unlock_pointerdown() {
  if (!background_music_needs_unlock) {
    return;
  }

  sync_cycle_audio();
}

function prepare_welcome_audio() {
  const AudioContextConstructor =
    window.AudioContext || window.webkitAudioContext;

  if (!AudioContextConstructor) {
    return;
  }

  if (!welcome_audio_context) {
    welcome_audio_context = new AudioContextConstructor();
  }

  if (welcome_audio_context.state === "suspended") {
    welcome_audio_context.resume();
  }
}

function select_random_sound_url(url_list, previous_url = "") {
  if (!Array.isArray(url_list) || url_list.length === 0) {
    return "";
  }

  if (url_list.length === 1) {
    return url_list[0];
  }

  const safe_pool = url_list.filter((url) => url !== previous_url);
  const pool = safe_pool.length > 0 ? safe_pool : url_list;
  return pool[Math.floor(Math.random() * pool.length)] || "";
}

function create_effect_audio(url, volume = 0.5) {
  const audio = new Audio(url);
  audio.preload = "auto";
  audio.volume = volume;
  return audio;
}

function play_effect_sound_from_manifest(manifest_key, volume = 0.5) {
  const url_list = current_sound_manifest[manifest_key] || [];
  const selected_url = select_random_sound_url(url_list);

  if (!selected_url) {
    return false;
  }

  const audio = create_effect_audio(selected_url, volume);
  const play_result = audio.play();

  if (play_result?.catch) {
    play_result.catch(() => {});
  }

  return true;
}

function get_local_music_storage_key() {
  return `${local_music_storage_prefix}_${current_user_profile?.user_key || "guest"}`;
}

function load_local_music_tracks() {
  try {
    const stored_tracks = JSON.parse(
      localStorage.getItem(get_local_music_storage_key()) || "[]",
    );
    local_music_tracks = Array.isArray(stored_tracks) ? stored_tracks : [];
  } catch (error) {
    local_music_tracks = [];
  }

  void hydrate_local_music_track_sources();
}

function save_local_music_tracks() {
  const serialized_tracks = local_music_tracks.map(({ src, ...track }) => track);
  localStorage.setItem(
    get_local_music_storage_key(),
    JSON.stringify(serialized_tracks),
  );
}

function save_shared_music_tracks_locally() {
  const serialized_tracks = shared_music_tracks.map(({ src, ...track }) => track);
  localStorage.setItem(shared_music_storage_key, JSON.stringify(serialized_tracks));
}

async function hydrate_shared_music_track_sources() {
  shared_music_tracks = shared_music_tracks
    .map((track) => ({
      ...track,
      src:
        track.src ||
        track.public_url ||
        get_supabase_media_public_url(
          track.storage_path,
          track.bucket || supabase_media_bucket_name,
        ),
    }))
    .filter((track) => track.src);
  save_shared_music_tracks_locally();
  update_music_control_buttons();
  render_music_library_panel();
}

function get_shared_music_attachment(message_item) {
  const attachments = Array.isArray(message_item?.attachments)
    ? message_item.attachments
    : [];
  return (
    attachments.find((attachment) => attachment?.kind === "shared_music") ||
    null
  );
}

function create_shared_music_message_id() {
  const safe_room = String(current_room_slug || supabase_room_slug_default)
    .replace(/[^a-z0-9_-]+/gi, "_")
    .toLowerCase();
  return `shared_music_${safe_room}`;
}

async function load_shared_music_tracks() {
  try {
    const stored_tracks = JSON.parse(
      localStorage.getItem(shared_music_storage_key) || "[]",
    );
    shared_music_tracks = Array.isArray(stored_tracks) ? stored_tracks : [];
  } catch (error) {
    shared_music_tracks = [];
  }

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.media_files)
        .select("*")
        .eq("room_slug", current_room_slug)
        .eq("category", "music")
        .order("created_at", { ascending: true });

      if (!error && Array.isArray(data)) {
        shared_music_tracks = data.map((row) => ({
          id: String(row.id),
          name: String(row.name || "music"),
          type: String(row.mime_type || "audio/*"),
          size: Number(row.size_bytes || 0),
          bucket: String(row.storage_bucket || supabase_media_bucket_name),
          storage_path: String(row.storage_path || ""),
          public_url: String(row.public_url || ""),
          owner_key: String(row.owner_key || ""),
          is_shared: true,
        }));
      }
    } catch (error) {
      // The live-message manifest below covers older Supabase setups.
    }

    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .select("*")
        .eq("room_slug", current_room_slug)
        .eq("id", create_shared_music_message_id())
        .maybeSingle();

      if (!error && data) {
        const attachment = get_shared_music_attachment(
          map_live_message_row_to_item(data),
        );

        if (Array.isArray(attachment?.tracks) && attachment.tracks.length > 0) {
          shared_music_tracks = attachment.tracks;
        }
      }
    } catch (error) {
      // Local shared list remains available.
    }
  }

  await hydrate_shared_music_track_sources();
}

async function sync_shared_music_tracks_to_remote(immediate = false) {
  if (!current_user_profile) {
    return;
  }

  if (!immediate) {
    window.clearTimeout(shared_music_sync_timeout_id);
    shared_music_sync_timeout_id = window.setTimeout(
      () => sync_shared_music_tracks_to_remote(true),
      350,
    );
    return;
  }

  window.clearTimeout(shared_music_sync_timeout_id);
  shared_music_sync_timeout_id = null;
  save_shared_music_tracks_locally();

  if (!is_supabase_enabled() || !current_auth_user_id) {
    return;
  }

  const now_text = new Date().toISOString();
  const message_item = {
    id: create_shared_music_message_id(),
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: shared_music_live_message_marker,
    created_at: now_text,
    edited_at: now_text,
    attachments: [
      {
        kind: "shared_music",
        tracks: shared_music_tracks.map(({ src, ...track }) => track),
        updated_by: current_user_profile.user_key,
        updated_at: now_text,
      },
    ],
  };

  try {
    await supabase_client
      .from(supabase_table_names.live_messages)
      .upsert(message_item, { onConflict: "id" });
  } catch (error) {
    log_app_error("shared_music_manifest_sync_failed", error);
  }
}

function apply_shared_music_state_from_message(message_item) {
  const attachment = get_shared_music_attachment(message_item);

  if (!Array.isArray(attachment?.tracks)) {
    return;
  }

  shared_music_tracks = attachment.tracks.map((track) => ({
    ...track,
    is_shared: true,
  }));
  void hydrate_shared_music_track_sources();

  if (
    live_messages_history_loaded &&
    current_user_profile &&
    attachment.updated_by !== current_user_profile.user_key
  ) {
    show_in_app_notification({
      title: translate("shared_activity_music"),
      body: translate("shared_activity_music"),
      kind: "activity",
    });
  }
}

async function hydrate_local_music_track_sources() {
  const filesystem_plugin = get_capacitor_plugin("Filesystem");

  if (!filesystem_plugin) {
    update_music_control_buttons();
    render_music_library_panel();
    return;
  }

  await Promise.all(
    local_music_tracks.map(async (track) => {
      if (!track.path || track.src) {
        return;
      }

      try {
        const uri_result = await filesystem_plugin.getUri({
          path: track.path,
          directory: "DATA",
        });
        track.src = window.Capacitor?.convertFileSrc
          ? window.Capacitor.convertFileSrc(uri_result.uri)
          : uri_result.uri;
      } catch (error) {
        track.src = track.data_url || "";
      }
    }),
  );
  update_music_control_buttons();
  render_music_library_panel();
}

function get_file_extension(filename) {
  const extension = String(filename || "").split(".").pop();
  return extension && extension !== filename ? extension.toLowerCase() : "mp3";
}

function sanitize_storage_filename(filename, fallback_extension = "bin") {
  const safe_extension = get_file_extension(filename) || fallback_extension;
  const safe_base = String(filename || "file")
    .replace(/\.[^.]+$/, "")
    .trim()
    .toLowerCase()
    .replace(/[^a-z0-9_-]+/g, "-")
    .replace(/^-+|-+$/g, "")
    .slice(0, 48);
  return `${safe_base || "file"}.${safe_extension}`;
}

function get_supabase_media_public_url(storage_path, bucket_name = supabase_media_bucket_name) {
  if (!is_supabase_enabled() || !storage_path) {
    return "";
  }

  try {
    const { data } = supabase_client.storage
      .from(bucket_name)
      .getPublicUrl(storage_path);
    return data?.publicUrl || "";
  } catch (error) {
    return "";
  }
}

async function upload_file_to_supabase_media(file_item, category, preferred_id = "") {
  if (!is_supabase_enabled() || !current_auth_user_id || !file_item) {
    return null;
  }

  const id = preferred_id || create_item_id();
  const safe_filename = sanitize_storage_filename(file_item.name);
  const storage_path = `${current_room_slug}/${category}/${id}-${safe_filename}`;

  try {
    const { error } = await supabase_client.storage
      .from(supabase_media_bucket_name)
      .upload(storage_path, file_item, {
        upsert: true,
        contentType: file_item.type || "application/octet-stream",
      });

    if (error) {
      throw error;
    }

    const public_url = get_supabase_media_public_url(storage_path);

    try {
      await supabase_client.from(supabase_table_names.media_files).upsert(
        {
          id,
          room_slug: current_room_slug,
          category,
          name: file_item.name || safe_filename,
          mime_type: file_item.type || "application/octet-stream",
          size_bytes: file_item.size || 0,
          storage_bucket: supabase_media_bucket_name,
          storage_path,
          public_url,
          owner_key: current_user_profile?.user_key || "",
          updated_at: new Date().toISOString(),
        },
        { onConflict: "id" },
      );
    } catch (error) {
      // The storage object is the important part; metadata can be synced later.
    }

    return {
      id,
      bucket: supabase_media_bucket_name,
      storage_path,
      public_url,
    };
  } catch (error) {
    log_app_error("supabase_media_upload_failed", error);
    return null;
  }
}

async function create_local_music_track(file_item) {
  const id = create_item_id();
  const data_url = await read_file_as_data_url(file_item);
  const parsed_data_url = parse_data_url(data_url);
  const filesystem_plugin = get_capacitor_plugin("Filesystem");
  const base_track = {
    id,
    name: file_item.name || "music",
    type: file_item.type || "audio/*",
    path: "",
    data_url: "",
    src: data_url,
  };

  if (filesystem_plugin && parsed_data_url) {
    const safe_extension = get_file_extension(file_item.name);
    const path = `local-music/${current_user_profile?.user_key || "guest"}/${id}.${safe_extension}`;

    try {
      await filesystem_plugin.writeFile({
        path,
        data: parsed_data_url.base64_data,
        directory: "DATA",
        recursive: true,
      });
      const uri_result = await filesystem_plugin.getUri({
        path,
        directory: "DATA",
      });
      return {
        ...base_track,
        path,
        data_url: "",
        src: window.Capacitor?.convertFileSrc
          ? window.Capacitor.convertFileSrc(uri_result.uri)
          : uri_result.uri,
      };
    } catch (error) {
      log_app_error("local_music_write_failed", error);
    }
  }

  return {
    ...base_track,
    data_url,
  };
}

async function create_shared_music_track(file_item) {
  const id = create_item_id();
  const uploaded_file = await upload_file_to_supabase_media(file_item, "music", id);

  if (!uploaded_file?.public_url) {
    return null;
  }

  return {
    id,
    name: file_item.name || "music",
    type: file_item.type || "audio/*",
    size: file_item.size || 0,
    bucket: uploaded_file.bucket,
    storage_path: uploaded_file.storage_path,
    public_url: uploaded_file.public_url,
    src: uploaded_file.public_url,
    owner_key: current_user_profile?.user_key || "",
    is_shared: true,
  };
}

async function handle_music_files_selected(event) {
  const files = Array.from(event.currentTarget.files || []).filter((file_item) =>
    String(file_item.type || "").startsWith("audio/"),
  );

  if (files.length === 0) {
    return;
  }

  try {
    const shared_results = await Promise.all(
      files.map(async (file_item) => ({
        file_item,
        track: await create_shared_music_track(file_item),
      })),
    );
    const shared_tracks = shared_results
      .map((result) => result.track)
      .filter(Boolean);
    let tracks = shared_tracks;

    if (shared_tracks.length !== files.length) {
      const fallback_files = shared_results
        .filter((result) => !result.track)
        .map((result) => result.file_item);
      const local_tracks = await Promise.all(
        fallback_files.map(create_local_music_track),
      );
      local_music_tracks = [...local_music_tracks, ...local_tracks];
      save_local_music_tracks();
      tracks = [...shared_tracks, ...local_tracks];
      void show_app_alert(translate("music_shared_upload_failed"), {
        title: translate("music_library"),
      });
    }

    if (shared_tracks.length > 0) {
      shared_music_tracks = [...shared_music_tracks, ...shared_tracks];
      save_shared_music_tracks_locally();
      void sync_shared_music_tracks_to_remote();
      void announce_shared_activity(
        "music",
        translate("shared_activity_music"),
        shared_tracks.map((track) => track.name).join(", "),
      );
    }

    render_music_library_panel();
    update_music_control_buttons();
    void show_app_alert(translate("music_added", tracks.length), {
      title: translate("music_library"),
    });
  } catch (error) {
    log_app_error("local_music_add_failed", error);
  } finally {
    event.currentTarget.value = "";
  }
}

function toggle_music_library_panel(event = null) {
  event?.stopPropagation?.();
  render_music_library_panel();
  dom_references.music_library_panel?.classList.toggle("hidden");
}

function get_track_name_from_url(track_url) {
  const clean_url = String(track_url || "").split("?")[0].split("#")[0];
  const filename = clean_url.split("/").pop() || "music";

  try {
    return decodeURIComponent(filename);
  } catch (error) {
    return filename;
  }
}

function get_default_music_tracks() {
  const manifest_tracks = Array.isArray(current_sound_manifest.background_music)
    ? current_sound_manifest.background_music
    : [];
  return manifest_tracks.map((track_url, index) => ({
    id: `default_${index}_${track_url}`,
    name: get_track_name_from_url(track_url),
    src: track_url,
    is_default: true,
  }));
}

function get_personal_music_tracks() {
  return local_music_tracks
    .map((track) => ({
      ...track,
      src: track.src || track.data_url || "",
      is_default: false,
    }))
    .filter((track) => track.src);
}

function get_shared_music_tracks() {
  return shared_music_tracks
    .map((track) => ({
      ...track,
      src:
        track.src ||
        track.public_url ||
        get_supabase_media_public_url(
          track.storage_path,
          track.bucket || supabase_media_bucket_name,
        ),
      is_default: false,
      is_shared: true,
    }))
    .filter((track) => track.src);
}

function get_all_music_tracks() {
  return [
    ...get_default_music_tracks(),
    ...get_shared_music_tracks(),
    ...get_personal_music_tracks(),
  ];
}

function create_music_library_heading(label_text) {
  const heading = document.createElement("p");
  heading.className = "music_library_heading";
  heading.textContent = label_text;
  return heading;
}

function render_music_library_track(track) {
  const item = document.createElement("div");
  const is_current = track.src === last_background_music_url;
  const is_playing =
    is_current && background_music_audio && !background_music_audio.paused;
  item.className = "music_library_item";
  item.classList.toggle("is_current_track", is_current);

  const play_button = document.createElement("button");
  play_button.className = "music_library_play_button";
  play_button.type = "button";
  play_button.dataset.track_id = track.id;
  play_button.textContent = is_playing ? "Ⅱ" : "▶";
  play_button.title = translate(
    is_playing ? "music_pause_track" : "music_play_track",
  );
  play_button.setAttribute("aria-label", play_button.title);

  const title = document.createElement("span");
  title.textContent = track.name || "music";

  item.append(play_button, title);

  if (!track.is_default) {
    const delete_button = document.createElement("button");
    delete_button.className = "music_library_delete_button";
    delete_button.type = "button";
    delete_button.dataset.track_id = track.id;
    delete_button.textContent = "✕";
    delete_button.title = translate("music_delete_track");
    delete_button.setAttribute("aria-label", translate("music_delete_track"));
    item.appendChild(delete_button);
  }

  return item;
}

function render_music_library_panel() {
  const panel = dom_references.music_library_panel;

  if (!panel) {
    return;
  }

  panel.innerHTML = "";
  const default_tracks = get_default_music_tracks();
  const shared_tracks = get_shared_music_tracks();
  const personal_tracks = get_personal_music_tracks();

  if (default_tracks.length > 0) {
    panel.appendChild(create_music_library_heading(translate("music_default_tracks")));
    default_tracks.forEach((track) =>
      panel.appendChild(render_music_library_track(track)),
    );
  }

  if (shared_tracks.length > 0) {
    panel.appendChild(create_music_library_heading(translate("music_shared_tracks")));
    shared_tracks.forEach((track) =>
      panel.appendChild(render_music_library_track(track)),
    );
  }

  panel.appendChild(create_music_library_heading(translate("music_personal_tracks")));

  if (personal_tracks.length === 0) {
    const empty_state = document.createElement("p");
    empty_state.className = "music_library_empty";
    empty_state.textContent = translate("music_library_empty");
    panel.appendChild(empty_state);
    return;
  }

  personal_tracks.forEach((track) =>
    panel.appendChild(render_music_library_track(track)),
  );
}

async function handle_music_library_action(event) {
  const play_button = event.target.closest(".music_library_play_button");
  const delete_button = event.target.closest(".music_library_delete_button");

  if (play_button) {
    const track = get_all_music_tracks().find(
      (item) => item.id === play_button.dataset.track_id,
    );

    if (!track?.src) {
      return;
    }

    if (
      background_music_audio &&
      last_background_music_url === track.src &&
      !background_music_audio.paused
    ) {
      background_music_paused_by_user = true;
      background_music_audio.pause();
      update_music_control_buttons();
      render_music_library_panel();
      return;
    }

    music_enabled = true;
    background_music_paused_by_user = false;
    localStorage.setItem(music_toggle_storage_key, "on");
    update_music_button();
    start_background_music_track(track.src, true);
    render_music_library_panel();
    return;
  }

  if (!delete_button) {
    return;
  }

  const track_id = delete_button.dataset.track_id;
  const track =
    shared_music_tracks.find((item) => item.id === track_id) ||
    local_music_tracks.find((item) => item.id === track_id);

  if (!track) {
    return;
  }

  if (track.is_shared || shared_music_tracks.some((item) => item.id === track_id)) {
    if (is_supabase_enabled() && track.storage_path) {
      try {
        await supabase_client.storage
          .from(track.bucket || supabase_media_bucket_name)
          .remove([track.storage_path]);
      } catch (error) {
        log_app_error("shared_music_delete_failed", error);
      }

      try {
        await supabase_client
          .from(supabase_table_names.media_files)
          .delete()
          .eq("id", track_id)
          .eq("room_slug", current_room_slug);
      } catch (error) {
        // The live shared list still removes the track.
      }
    }

    const track_sources = [track.src, track.public_url].filter(Boolean);
    shared_music_tracks = shared_music_tracks.filter((item) => item.id !== track_id);
    save_shared_music_tracks_locally();
    void sync_shared_music_tracks_to_remote();

    if (background_music_audio && track_sources.includes(last_background_music_url)) {
      stop_background_music();
      ensure_background_music(true);
    }

    render_music_library_panel();
    update_music_control_buttons();
    return;
  }

  const filesystem_plugin = get_capacitor_plugin("Filesystem");

  if (filesystem_plugin && track.path) {
    try {
      await filesystem_plugin.deleteFile({
        path: track.path,
        directory: "DATA",
      });
    } catch (error) {
      log_app_error("local_music_delete_failed", error);
    }
  }

  const track_sources = [track.src, track.data_url].filter(Boolean);
  local_music_tracks = local_music_tracks.filter((item) => item.id !== track_id);
  save_local_music_tracks();

  if (background_music_audio && track_sources.includes(last_background_music_url)) {
    stop_background_music();
    ensure_background_music(true);
  }

  render_music_library_panel();
  update_music_control_buttons();
}

function get_background_music_tracks() {
  return get_all_music_tracks()
    .map((track) => track.src)
    .filter(Boolean);
}

function get_current_background_track_index() {
  const track_list = get_background_music_tracks();
  const current_index = track_list.indexOf(last_background_music_url);
  return current_index >= 0 ? current_index : 0;
}

function update_music_control_buttons() {
  const has_tracks = get_background_music_tracks().length > 0;
  const is_paused =
    background_music_paused_by_user ||
    !background_music_audio ||
    background_music_audio.paused;
  const play_pause_button = dom_references.music_play_pause_button;

  dom_references.music_control_pill?.classList.toggle(
    "has_no_tracks",
    !has_tracks,
  );
  dom_references.music_previous_button?.toggleAttribute("disabled", !has_tracks);
  dom_references.music_next_button?.toggleAttribute("disabled", !has_tracks);
  play_pause_button?.toggleAttribute("disabled", !has_tracks);

  if (play_pause_button) {
    const label = is_paused
      ? translate("music_play")
      : translate("music_pause");
    play_pause_button.setAttribute("aria-label", label);
    play_pause_button.title = label;
    play_pause_button.innerHTML = is_paused
      ? '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M8 5v14l11-7L8 5Z"></path></svg>'
      : '<svg viewBox="0 0 24 24" aria-hidden="true"><path d="M7 5h4v14H7V5Zm6 0h4v14h-4V5Z"></path></svg>';
  }

  if (
    dom_references.music_library_panel &&
    !dom_references.music_library_panel.classList.contains("hidden")
  ) {
    render_music_library_panel();
  }
}

function should_play_background_music() {
  return (
    Boolean(current_user_profile) &&
    dom_references.login_screen?.classList.contains("hidden")
  );
}

function stop_background_music() {
  background_music_needs_unlock = false;
  background_music_paused_by_user = false;
  background_music_paused_by_lifecycle = false;

  if (!background_music_audio) {
    update_music_control_buttons();
    return;
  }

  background_music_audio.pause();
  background_music_audio.removeAttribute("src");
  background_music_audio.load();
  background_music_audio = null;
  update_music_control_buttons();
}

function start_background_music_track(selected_url, force_restart = true) {
  if (!selected_url) {
    return;
  }

  background_music_paused_by_lifecycle = false;

  if (force_restart) {
    const previous_audio = background_music_audio;

    if (previous_audio) {
      previous_audio.pause();
      previous_audio.removeAttribute("src");
      previous_audio.load();
    }

    background_music_audio = null;
  }

  const audio = new Audio(selected_url);
  audio.preload = "auto";
  audio.volume = 0.42;
  audio.muted = !music_enabled;
  audio.loop = false;
  audio.addEventListener("ended", () => {
    if (background_music_audio === audio) {
      background_music_audio = null;
      update_music_control_buttons();
      sync_cycle_audio();
    }
  });
  audio.addEventListener("error", () => {
    if (background_music_audio === audio) {
      background_music_audio = null;
      update_music_control_buttons();
    }
  });
  audio.addEventListener("play", update_music_control_buttons);
  audio.addEventListener("pause", update_music_control_buttons);

  background_music_audio = audio;
  last_background_music_url = selected_url;
  const play_result = audio.play();

  if (play_result?.catch) {
    play_result
      .then(() => {
        background_music_needs_unlock = false;
        update_music_control_buttons();
      })
      .catch(() => {
        background_music_needs_unlock = true;
        update_music_control_buttons();
      });
    return;
  }

  background_music_needs_unlock = false;
  update_music_control_buttons();
}

function ensure_background_music(force_restart = false) {
  if (!should_play_background_music()) {
    stop_background_music();
    return;
  }

  if (background_music_paused_by_user) {
    update_music_control_buttons();
    return;
  }

  if (!music_enabled && !background_music_audio) {
    update_music_control_buttons();
    return;
  }

  if (document.hidden) {
    update_music_control_buttons();
    return;
  }

  const track_list = get_background_music_tracks();

  if (track_list.length === 0) {
    stop_background_music();
    return;
  }

  if (
    background_music_audio &&
    !background_music_audio.paused &&
    !force_restart
  ) {
    return;
  }

  if (force_restart) {
    const previous_audio = background_music_audio;

    if (previous_audio) {
      previous_audio.pause();
      previous_audio.removeAttribute("src");
      previous_audio.load();
      background_music_audio = null;
    }
  }

  const selected_url = select_random_sound_url(
    track_list,
    last_background_music_url,
  );

  if (!selected_url) {
    return;
  }

  start_background_music_track(selected_url, true);
}

function change_background_track(direction) {
  const track_list = get_background_music_tracks();

  if (track_list.length === 0) {
    return;
  }

  const current_index = get_current_background_track_index();
  const next_index =
    (current_index + direction + track_list.length) % track_list.length;
  background_music_paused_by_user = false;
  background_music_paused_by_lifecycle = false;
  start_background_music_track(track_list[next_index], true);
}

function toggle_background_music_playback() {
  const has_context = should_play_background_music();

  if (!has_context) {
    return;
  }

  if (background_music_audio && !background_music_audio.paused) {
    background_music_paused_by_user = true;
    background_music_audio.pause();
    update_music_control_buttons();
    return;
  }

  background_music_paused_by_user = false;
  background_music_paused_by_lifecycle = false;

  if (background_music_audio) {
    play_existing_background_music();
    return;
  }

  ensure_background_music();
}

function play_welcome_sound() {
  background_music_paused_by_user = false;
  play_effect_sound_from_manifest("welcome", 0.62);
  ensure_background_music(true);
}

function play_logout_sound() {
  const now_ms = Date.now();

  if (now_ms - last_exit_sound_time < 650) {
    return;
  }

  last_exit_sound_time = now_ms;
  play_effect_sound_from_manifest("logout", 0.5);
  stop_background_music();
}

function play_send_click_fallback(base_frequency, end_frequency, peak_gain) {
  prepare_welcome_audio();

  if (!welcome_audio_context) {
    return;
  }

  const now = welcome_audio_context.currentTime;
  const gain = welcome_audio_context.createGain();
  gain.gain.setValueAtTime(0.0001, now);
  gain.gain.exponentialRampToValueAtTime(peak_gain, now + 0.018);
  gain.gain.exponentialRampToValueAtTime(0.0001, now + 0.16);
  gain.connect(welcome_audio_context.destination);

  const oscillator = welcome_audio_context.createOscillator();
  oscillator.type = "triangle";
  oscillator.frequency.setValueAtTime(base_frequency, now);
  oscillator.frequency.exponentialRampToValueAtTime(end_frequency, now + 0.11);
  oscillator.connect(gain);
  oscillator.start(now);
  oscillator.stop(now + 0.18);
}

function play_send_message_sound() {
  if (play_effect_sound_from_manifest("message_send", 0.48)) {
    return;
  }

  play_send_click_fallback(760, 980, 0.07);
}

function play_receive_message_sound() {
  if (play_effect_sound_from_manifest("message_receive", 0.44)) {
    return;
  }

  play_send_click_fallback(620, 860, 0.055);
}

function ensure_in_app_notification_layer() {
  if (in_app_notification_layer) {
    return in_app_notification_layer;
  }

  in_app_notification_layer = document.createElement("div");
  in_app_notification_layer.className = "in_app_notification_layer";
  in_app_notification_layer.setAttribute("aria-live", "polite");
  document.body.appendChild(in_app_notification_layer);
  return in_app_notification_layer;
}

function dismiss_in_app_notification(notification_element) {
  if (!notification_element) {
    return;
  }

  notification_element.classList.add("is_dismissing");
  window.setTimeout(() => notification_element.remove(), 220);
}

function show_in_app_notification({ title, body, reference_id = "", kind = "message" }) {
  const layer = ensure_in_app_notification_layer();
  const notification = document.createElement("div");
  notification.className = "in_app_notification";
  notification.dataset.kind = kind;
  let swipe_start_y = 0;

  const title_node = document.createElement("strong");
  title_node.textContent = title || translate("shared_activity_generic");
  const body_node = document.createElement("span");
  body_node.textContent = get_plain_text_snippet(body || "", 120);
  const close_button = document.createElement("button");
  close_button.type = "button";
  close_button.className = "in_app_notification_close";
  close_button.setAttribute("aria-label", translate("incoming_message_close"));
  close_button.title = translate("incoming_message_close");
  close_button.textContent = "×";

  close_button.addEventListener("click", (event) => {
    event.stopPropagation();
    dismiss_in_app_notification(notification);
  });
  notification.addEventListener("pointerdown", (event) => {
    swipe_start_y = event.clientY;
  });
  notification.addEventListener("pointerup", (event) => {
    if (swipe_start_y - event.clientY > 28) {
      dismiss_in_app_notification(notification);
    }
  });
  notification.addEventListener("click", () => {
    if (kind === "message" && reference_id) {
      toggle_fullscreen_panel("messages", true);
      window.setTimeout(() => scroll_to_message_by_id(reference_id), 80);
    } else if (kind === "cycle") {
      toggle_fullscreen_panel("cycle", true);
    }
    dismiss_in_app_notification(notification);
  });

  notification.append(title_node, body_node, close_button);
  layer.prepend(notification);
  window.setTimeout(() => dismiss_in_app_notification(notification), 4000);
}

function show_in_app_message_notification(message_item) {
  const sender_name = get_message_sender_label(message_item, false);
  show_in_app_notification({
    title: translate("incoming_message_title", sender_name),
    body: get_live_message_display_text(message_item),
    reference_id: message_item.id,
    kind: "message",
  });
}

function stop_cycle_ambient_audio() {
  stop_background_music();
}

function sync_cycle_audio() {
  if (!should_play_background_music()) {
    stop_background_music();

    if (cycle_message_rotation_id) {
      window.clearInterval(cycle_message_rotation_id);
      cycle_message_rotation_id = null;
    }

    return;
  }

  ensure_background_music();
}

function prepare_new_memory() {
  editing_memory_id = null;
  editing_memory_image_data = "";
  dom_references.memory_form.reset();
  dom_references.memory_image_hint.textContent = "";
  update_dialog_titles();
  open_dialog(dom_references.memory_dialog);
}

function prepare_new_event() {
  editing_event_id = null;
  dom_references.event_form.reset();
  dom_references.event_title_input.disabled = false;
  dom_references.event_date_input.disabled = false;
  update_dialog_titles();
  open_dialog(dom_references.event_dialog);
}

function handle_memory_action(event) {
  const action_button = event.target.closest("button[data-action]");

  if (!action_button) {
    const memory_image = event.target.closest(".memory_card_image");

    if (memory_image) {
      open_memory_lightbox(memory_image.src, memory_image.alt || "");
    }

    return;
  }

  const item_id = action_button.dataset.item_id;

  if (action_button.dataset.action === "edit_memory") {
    edit_memory(item_id);
  }

  if (action_button.dataset.action === "delete_memory") {
    delete_memory(item_id);
  }

  if (action_button.dataset.action === "mention_memory") {
    const mention_context = build_mention_context("memory", item_id);

    if (mention_context) {
      toggle_fullscreen_panel("messages", true);
      insert_manual_mention(mention_context);
      burst_reaction(dom_references.live_message_composer, "heart", 8);
      dom_references.live_message_composer.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  if (action_button.dataset.action === "download_memory") {
    const memory_item = current_memory_items.find((item) => item.id === item_id);

    if (memory_item?.image_data) {
      void download_data_url(
        memory_item.image_data,
        build_download_filename(memory_item.title),
      );
    }
  }
}

function handle_event_action(event) {
  const action_button = event.target.closest("button[data-action]");

  if (!action_button) {
    return;
  }

  const item_id = action_button.dataset.item_id;

  if (action_button.dataset.action === "edit_event") {
    edit_event(item_id);
  }

  if (action_button.dataset.action === "delete_event") {
    delete_event(item_id);
  }

  if (action_button.dataset.action === "mention_event") {
    const mention_context = build_mention_context("event", item_id);

    if (mention_context) {
      toggle_fullscreen_panel("messages", true);
      insert_manual_mention(mention_context);
      burst_reaction(dom_references.live_message_composer, "spark", 8);
      dom_references.live_message_composer.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }
}

function edit_memory(item_id) {
  const memory_item = current_memory_items.find((item) => item.id === item_id);

  if (!memory_item) {
    return;
  }

  editing_memory_id = item_id;
  editing_memory_image_data = memory_item.image_data || "";
  dom_references.memory_title_input.value = memory_item.title || "";
  dom_references.memory_date_input.value = memory_item.date_value || "";
  dom_references.memory_note_input.value = get_item_thought_text(
    memory_item,
    "note",
    current_user_profile?.user_key,
  );
  dom_references.memory_image_input.value = "";
  dom_references.memory_image_hint.textContent = editing_memory_image_data
    ? translate("image_replace_hint")
    : "";
  update_dialog_titles();
  open_dialog(dom_references.memory_dialog);
}

async function delete_memory(item_id) {
  const should_delete = await show_app_confirm(
    translate("delete_memory_confirm"),
    {
      title: translate("app_confirm_title"),
      confirm_label: translate("delete"),
    },
  );

  if (!should_delete) {
    return;
  }

  current_memory_items = current_memory_items.filter(
    (item) => item.id !== item_id,
  );
  await api_save_items("memories", memory_storage_key, current_memory_items);
  render_memory_gallery(
    current_memory_items.length > 0
      ? current_memory_items
      : get_default_memory_gallery_items(),
  );
  burst_reaction(dom_references.memory_gallery, "spark", 8);
}

function edit_event(item_id) {
  const event_item = current_event_items.find((item) => item.id === item_id);

  if (!event_item) {
    return;
  }

  editing_event_id = item_id;
  const locked_for_current_user =
    event_item.is_locked && current_user_profile?.user_key !== "diab";
  dom_references.event_title_input.disabled = locked_for_current_user;
  dom_references.event_date_input.disabled = locked_for_current_user;
  dom_references.event_title_input.value = event_item.title || "";
  dom_references.event_date_input.value = event_item.date_value || "";
  dom_references.event_description_input.value = get_item_thought_text(
    event_item,
    "description",
    current_user_profile?.user_key,
  );
  update_dialog_titles();
  open_dialog(dom_references.event_dialog);
}

async function delete_event(item_id) {
  const event_item = current_event_items.find((item) => item.id === item_id);

  if (!event_item || event_item.is_locked) {
    return;
  }

  const should_delete = await show_app_confirm(
    translate("delete_event_confirm"),
    {
      title: translate("app_confirm_title"),
      confirm_label: translate("delete"),
    },
  );

  if (!should_delete) {
    return;
  }

  current_event_items = current_event_items.filter(
    (item) => item.id !== item_id,
  );
  await api_save_items("events", event_storage_key, current_event_items);
  render_event_timeline(
    current_event_items.length > 0
      ? current_event_items
      : get_default_event_timeline_items(),
  );
  burst_reaction(dom_references.event_timeline, "spark", 8);
}

function open_cycle_settings() {
  const cycle_stats = get_cycle_stats();
  dom_references.cycle_length_input.value = cycle_stats.cycle_length;
  dom_references.cycle_duration_input.value = cycle_stats.period_length;
  current_cycle_dialog_guard = {
    dialog_id: dom_references.cycle_settings_dialog.id,
    has_unsaved_changes: false,
    closing_via_save: false,
  };
  open_dialog(dom_references.cycle_settings_dialog);
}

function save_cycle_settings(event) {
  event.preventDefault();
  current_cycle_dialog_guard.closing_via_save = true;
  current_cycle_data.typical_cycle_length = clamp_number(
    dom_references.cycle_length_input.value,
    18,
    60,
    24,
  );
  current_cycle_data.typical_period_length = clamp_number(
    dom_references.cycle_duration_input.value,
    2,
    12,
    7,
  );
  close_dialog(dom_references.cycle_settings_dialog);
  current_cycle_dialog_guard.has_unsaved_changes = false;
  current_cycle_dialog_guard.closing_via_save = false;
  pending_cycle_change_type = "settings";
  on_cycle_change();
}

function shift_cycle_month(direction) {
  current_cycle_month_anchor = new Date(
    current_cycle_month_anchor.getFullYear(),
    current_cycle_month_anchor.getMonth() + direction,
    1,
  );
  current_cycle_calendar_view_key = "";
  current_cycle_calendar_buttons = new Map();

  const selected_date = parse_local_date(get_cycle_selected_date_or_today());

  if (
    selected_date.getFullYear() !== current_cycle_month_anchor.getFullYear() ||
    selected_date.getMonth() !== current_cycle_month_anchor.getMonth()
  ) {
    current_selected_cycle_date = format_date_input_value(
      current_cycle_month_anchor,
    );
  }

  render_cycle_calendar();
}

function format_cycle_month_picker_value(date_value) {
  const month_date =
    date_value instanceof Date && !Number.isNaN(date_value.getTime())
      ? date_value
      : new Date(current_cycle_month_anchor);
  return `${month_date.getFullYear()}-${String(month_date.getMonth() + 1).padStart(2, "0")}`;
}

function sync_cycle_month_picker_value() {
  if (!dom_references.cycle_month_picker_input) {
    return;
  }

  dom_references.cycle_month_picker_input.value =
    format_cycle_month_picker_value(current_cycle_month_anchor);
}

function open_cycle_month_picker() {
  const month_input = dom_references.cycle_month_picker_input;

  if (!month_input) {
    return;
  }

  sync_cycle_month_picker_value();

  if (typeof month_input.showPicker === "function") {
    month_input.showPicker();
    return;
  }

  month_input.focus();
  month_input.click();
}

function handle_cycle_month_label_keydown(event) {
  if (event.key !== "Enter" && event.key !== " ") {
    return;
  }

  event.preventDefault();
  open_cycle_month_picker();
}

function handle_cycle_month_picker_change(event) {
  const month_value = event.currentTarget?.value || "";

  if (!/^\d{4}-\d{2}$/.test(month_value)) {
    return;
  }

  const [year_text, month_text] = month_value.split("-");
  const year = Number(year_text);
  const month = Number(month_text);

  if (Number.isNaN(year) || Number.isNaN(month) || month < 1 || month > 12) {
    return;
  }

  current_cycle_month_anchor = new Date(year, month - 1, 1);
  current_selected_cycle_date = format_date_input_value(
    new Date(year, month - 1, 1),
  );
  render_cycle_calendar();
}

function can_edit_cycle_personal_details() {
  return current_user_profile?.user_key === "svetlana";
}

function mark_cycle_start_today() {
  set_cycle_start_for_date(get_cycle_selected_date_or_today());
}

function mark_cycle_end_today() {
  set_cycle_end_for_date(get_cycle_selected_date_or_today());
}

function set_cycle_start_for_date(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const selected_date = parse_local_date(normalized_date);
  const cycle_stats = get_cycle_stats();
  const sorted_entries = get_sorted_cycle_entries().map((entry) => ({
    ...entry,
  }));
  const anchor_entry = find_cycle_anchor_entry_for_date(normalized_date);

  if (is_future_cycle_date(normalized_date)) {
    show_cycle_validation_message(translate("cycle_future_date_error"));
    return;
  }

  if (sorted_entries.some((entry) => entry.startDate === normalized_date)) {
    current_selected_cycle_date = normalized_date;
    current_cycle_month_anchor = get_month_anchor(selected_date);
    render_cycle_calendar();
    return;
  }

  if (anchor_entry) {
    const overlap_index = sorted_entries.findIndex(
      (entry) => entry.id === anchor_entry.id,
    );

    if (overlap_index !== -1) {
      sorted_entries[overlap_index].startDate = normalized_date;
      if (
        sorted_entries[overlap_index].endDate &&
        parse_local_date(sorted_entries[overlap_index].endDate) < selected_date
      ) {
        sorted_entries[overlap_index].endDate = "";
      }
      sorted_entries[overlap_index].periodLength = sorted_entries[overlap_index]
        .endDate
        ? get_cycle_entry_duration(sorted_entries[overlap_index])
        : cycle_stats.period_length;
    }
  } else {
    close_previous_open_cycle_if_needed(
      sorted_entries,
      normalized_date,
      cycle_stats.period_length,
    );
    sorted_entries.push({
      id: create_item_id(),
      startDate: normalized_date,
      endDate: "",
      cycleLength: cycle_stats.cycle_length,
      periodLength: cycle_stats.period_length,
      confirmed: true,
      symptoms: [],
      notes: [],
      manualOvulationDate: "",
    });
  }

  current_cycle_data.entries = normalize_cycle_entries(sorted_entries);
  current_selected_cycle_date = normalized_date;
  current_cycle_month_anchor = get_month_anchor(selected_date);
  pending_cycle_change_type = "start";
  on_cycle_change();

  if (normalized_date === format_date_input_value(new Date())) {
    maybe_prompt_cycle_feeling(true);
  }
}

function set_cycle_end_for_date(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const selected_date = parse_local_date(normalized_date);
  const sorted_entries = get_sorted_cycle_entries().map((entry) => ({
    ...entry,
  }));
  const { period_length } = get_cycle_stats();
  let target_entry =
    sorted_entries.find(
      (entry) =>
        entry.id === find_cycle_anchor_entry_for_date(normalized_date)?.id,
    ) ||
    [...sorted_entries]
      .reverse()
      .find(
        (entry) =>
          !entry.endDate && parse_local_date(entry.startDate) <= selected_date,
      ) ||
    null;

  if (is_future_cycle_date(normalized_date)) {
    show_cycle_validation_message(translate("cycle_future_date_error"));
    return;
  }

  if (!target_entry) {
    sorted_entries.push({
      id: create_item_id(),
      startDate: format_date_input_value(
        add_days(selected_date, -(Math.max(period_length, 1) - 1)),
      ),
      endDate: normalized_date,
      cycleLength: get_cycle_stats().cycle_length,
      periodLength: period_length,
      confirmed: true,
      symptoms: [],
      notes: [],
      manualOvulationDate: "",
    });
  } else {
    if (parse_local_date(target_entry.startDate) > selected_date) {
      show_cycle_validation_message(translate("cycle_end_before_start"));
      return;
    }

    target_entry.endDate = normalized_date;
    target_entry.periodLength = Math.max(
      1,
      calculate_days_between(
        parse_local_date(target_entry.startDate),
        selected_date,
      ) + 1,
    );
  }

  current_cycle_data.entries = normalize_cycle_entries(sorted_entries);
  current_selected_cycle_date = normalized_date;
  current_cycle_month_anchor = get_month_anchor(selected_date);
  pending_cycle_change_type = "end";
  on_cycle_change();
}

function set_cycle_ovulation_for_date(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const selected_date = parse_local_date(normalized_date);
  const sorted_entries = get_sorted_cycle_entries().map((entry) => ({
    ...entry,
  }));
  const cycle_stats = get_cycle_stats();
  let target_entry = find_cycle_anchor_entry_for_date(normalized_date);

  if (is_future_cycle_date(normalized_date)) {
    show_cycle_validation_message(translate("cycle_future_date_error"));
    return;
  }

  if (!target_entry) {
    const estimated_start = format_date_input_value(
      add_days(selected_date, -Math.max(cycle_stats.cycle_length - 14, 0)),
    );
    target_entry = {
      id: create_item_id(),
      startDate: estimated_start,
      endDate: "",
      cycleLength: cycle_stats.cycle_length,
      periodLength: cycle_stats.period_length,
      confirmed: true,
      symptoms: [],
      notes: [],
      manualOvulationDate: normalized_date,
    };
    sorted_entries.push(target_entry);
  } else {
    const target_index = sorted_entries.findIndex(
      (entry) => entry.id === target_entry.id,
    );

    if (target_index !== -1) {
      sorted_entries[target_index].manualOvulationDate = normalized_date;
    }
  }

  current_cycle_data.entries = normalize_cycle_entries(sorted_entries);
  current_selected_cycle_date = normalized_date;
  current_cycle_month_anchor = get_month_anchor(selected_date);
  pending_cycle_change_type = "settings";
  on_cycle_change();
}

function remove_cycle_entry_for_date(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const target_entry = find_cycle_anchor_entry_for_date(normalized_date);

  if (!target_entry) {
    show_cycle_validation_message(translate("cycle_removed"));
    return;
  }

  current_cycle_data.entries = normalize_cycle_entries(
    current_cycle_data.entries.filter((entry) => entry.id !== target_entry.id),
  );
  current_selected_cycle_date = normalized_date;
  current_cycle_month_anchor = get_month_anchor(
    parse_local_date(normalized_date),
  );
  pending_cycle_change_type = "settings";
  on_cycle_change();
}

function handle_cycle_day_note_click() {
  if (!can_edit_cycle_personal_details()) {
    return;
  }

  current_cycle_mood_picker_open = false;
  open_cycle_note_dialog(get_cycle_selected_date_or_today());
}

function handle_cycle_day_mood_click() {
  if (!can_edit_cycle_personal_details()) {
    return;
  }

  current_cycle_mood_picker_open = !current_cycle_mood_picker_open;
  render_cycle_day_detail();
}

function handle_cycle_day_set_start_click() {
  current_cycle_mood_picker_open = false;
  set_cycle_start_for_date(get_cycle_selected_date_or_today());
}

function handle_cycle_day_set_end_click() {
  current_cycle_mood_picker_open = false;
  set_cycle_end_for_date(get_cycle_selected_date_or_today());
}

function handle_cycle_day_set_ovulation_click() {
  set_cycle_ovulation_for_date(get_cycle_selected_date_or_today());
}

function handle_cycle_day_remove_click() {
  current_cycle_mood_picker_open = false;
  remove_cycle_entry_for_date(get_cycle_selected_date_or_today());
}

function handle_cycle_support_message_click(event) {
  burst_emoji_reaction(
    event.currentTarget,
    cycle_support_burst_emojis,
    24,
    [22, 36],
  );
  burst_reaction(event.currentTarget, "heart", 12);
  show_cycle_support_echo_message();
}

function queue_cycle_note_mention(date_text) {
  const normalized_date =
    typeof date_text === "string"
      ? date_text
      : format_date_input_value(date_text);
  const note_text = get_cycle_note_for_date(normalized_date);
  const cycle_note_context = build_cycle_note_context(
    normalized_date,
    note_text,
  );

  if (!cycle_note_context) {
    return;
  }

  set_pending_message_context(cycle_note_context);
  toggle_fullscreen_panel("messages", true);
  burst_reaction(dom_references.live_message_composer, "spark", 8);
  dom_references.live_message_composer.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

function get_cycle_day_visual_state(
  date_key,
  runtime = get_cycle_runtime_state(),
) {
  if (runtime.confirmed_period_days.includes(date_key)) {
    return "is_period";
  }

  if (runtime.predicted_period_days.includes(date_key)) {
    return "is_predicted";
  }

  if (runtime.ovulation_days.includes(date_key)) {
    return "is_ovulation";
  }

  if (runtime.fertile_days.includes(date_key)) {
    return "is_fertile";
  }

  return "";
}

function build_cycle_calendar_month() {
  if (!dom_references.cycle_calendar_grid) {
    return;
  }

  const monthStart = new Date(current_cycle_month_anchor);
  const year = monthStart.getFullYear();
  const month = monthStart.getMonth();
  const view_key = `${year}-${month}`;

  if (
    current_cycle_calendar_view_key === view_key &&
    current_cycle_calendar_buttons.size > 0
  ) {
    return;
  }

  current_cycle_calendar_view_key = view_key;
  current_cycle_calendar_buttons = new Map();
  dom_references.cycle_calendar_grid.innerHTML = "";

  const firstDay = new Date(year, month, 1);
  const lastDay = new Date(year, month + 1, 0);
  const firstWeekday = firstDay.getDay();

  for (let index = 0; index < firstWeekday; index += 1) {
    const spacer = document.createElement("div");
    spacer.className = "cycle_calendar_spacer";
    dom_references.cycle_calendar_grid.appendChild(spacer);
  }

  for (let day = 1; day <= lastDay.getDate(); day += 1) {
    const currentDate = new Date(year, month, day);
    const dateKey = format_date_key(currentDate);
    const button = document.createElement("button");

    button.type = "button";
    button.className = "cycle_day_button";
    button.dataset.date = dateKey;
    button.setAttribute("aria-label", format_cycle_long_date(dateKey));

    const moodBadge = document.createElement("span");
    moodBadge.className = "cycle_day_mood_badge hidden";
    button.appendChild(moodBadge);

    const number = document.createElement("span");
    number.className = "cycle_day_button_number";
    number.textContent = String(day);
    button.appendChild(number);

    const todayBadge = document.createElement("span");
    todayBadge.className = "cycle_day_today_badge hidden";
    button.appendChild(todayBadge);

    const noteCloud = document.createElement("span");
    noteCloud.className = "cycle_day_note_cloud hidden";
    noteCloud.addEventListener("click", (event) => {
      if (!can_edit_cycle_personal_details()) {
        return;
      }

      event.stopPropagation();
      current_selected_cycle_date = dateKey;
      open_cycle_note_dialog(dateKey);
    });
    noteCloud.addEventListener("keydown", (event) => {
      if (!can_edit_cycle_personal_details()) {
        return;
      }

      if (event.key === "Enter" || event.key === " ") {
        event.preventDefault();
        current_selected_cycle_date = dateKey;
        open_cycle_note_dialog(dateKey);
      }
    });
    noteCloud.tabIndex = 0;
    noteCloud.setAttribute("role", "button");
    const noteCloudText = document.createElement("span");
    noteCloudText.className = "cycle_day_note_cloud_text";
    noteCloud.appendChild(noteCloudText);
    const noteCloudMentionButton = document.createElement("button");
    noteCloudMentionButton.type = "button";
    noteCloudMentionButton.className = "cycle_day_note_cloud_mention_button";
    noteCloudMentionButton.textContent = "@";
    noteCloudMentionButton.setAttribute(
      "aria-label",
      translate("mention_preview"),
    );
    noteCloudMentionButton.title = translate("mention_preview");
    noteCloudMentionButton.addEventListener("click", (event) => {
      event.preventDefault();
      event.stopPropagation();
      queue_cycle_note_mention(dateKey);
    });
    noteCloud.appendChild(noteCloudMentionButton);
    button.appendChild(noteCloud);

    button.addEventListener("click", () => {
      if (Date.now() < suppress_cycle_day_click_until) {
        return;
      }

      const has_note = Boolean(get_cycle_note_for_date(dateKey));
      const is_repeated_click = current_selected_cycle_date === dateKey;
      current_selected_cycle_date = dateKey;
      current_open_cycle_note_date =
        has_note &&
        !(is_repeated_click && current_open_cycle_note_date === dateKey)
          ? dateKey
          : "";
      current_cycle_mood_picker_open = false;
      apply_cycle_calendar_states();
      render_cycle_day_detail();
      render_cycle_status_panel();
    });

    current_cycle_calendar_buttons.set(dateKey, button);
    dom_references.cycle_calendar_grid.appendChild(button);
  }
}

function apply_cycle_calendar_states(runtime = get_cycle_runtime_state()) {
  if (!current_cycle_calendar_buttons.size) {
    return;
  }

  const selected_date_key = get_cycle_selected_date_or_today();

  current_cycle_calendar_buttons.forEach((button, dateKey) => {
    button.classList.remove(
      "is_period",
      "is_predicted",
      "is_fertile",
      "is_ovulation",
      "is_today",
      "is_selected",
      "has_note",
      "has_mood",
      "is_note_open",
    );

    const visual_state = get_cycle_day_visual_state(dateKey, runtime);
    const mood_badge = button.querySelector(".cycle_day_mood_badge");
    const today_badge = button.querySelector(".cycle_day_today_badge");
    const note_cloud = button.querySelector(".cycle_day_note_cloud");
    const day_note = get_cycle_note_for_date(dateKey);
    const mood_option = get_cycle_mood_option(dateKey);

    if (visual_state) {
      button.classList.add(visual_state);
    }

    if (dateKey === format_date_key(new Date())) {
      button.classList.add("is_today");
    }

    if (selected_date_key === dateKey) {
      button.classList.add("is_selected");
    }

    if (mood_badge) {
      if (mood_option) {
        button.classList.add("has_mood");
        mood_badge.classList.remove("hidden");
        mood_badge.textContent = mood_option.emoji;
        mood_badge.title = mood_option.label;
        mood_badge.setAttribute("aria-label", mood_option.label);
      } else {
        mood_badge.classList.add("hidden");
        mood_badge.textContent = "";
        mood_badge.removeAttribute("title");
        mood_badge.removeAttribute("aria-label");
      }
    }

    if (today_badge) {
      today_badge.textContent = translate("cycle_today_label");
      today_badge.classList.toggle(
        "hidden",
        dateKey !== format_date_key(new Date()),
      );
    }

    if (note_cloud) {
      if (day_note) {
        button.classList.add("has_note");
        const note_cloud_text = note_cloud.querySelector(
          ".cycle_day_note_cloud_text",
        );
        const note_cloud_mention_button = note_cloud.querySelector(
          ".cycle_day_note_cloud_mention_button",
        );

        if (note_cloud_text) {
          note_cloud_text.textContent =
            day_note.length > 58 ? `${day_note.slice(0, 55)}...` : day_note;
        }
        if (note_cloud_mention_button) {
          note_cloud_mention_button.setAttribute(
            "aria-label",
            translate("mention_preview"),
          );
          note_cloud_mention_button.title = translate("mention_preview");
          note_cloud_mention_button.classList.remove("hidden");
        }
        note_cloud.tabIndex = can_edit_cycle_personal_details() ? 0 : -1;
        note_cloud.setAttribute(
          "role",
          can_edit_cycle_personal_details() ? "button" : "note",
        );
        note_cloud.classList.toggle(
          "hidden",
          current_open_cycle_note_date !== dateKey,
        );
      } else {
        note_cloud.classList.add("hidden");
        const note_cloud_text = note_cloud.querySelector(
          ".cycle_day_note_cloud_text",
        );
        const note_cloud_mention_button = note_cloud.querySelector(
          ".cycle_day_note_cloud_mention_button",
        );
        if (note_cloud_text) {
          note_cloud_text.textContent = "";
        }
        if (note_cloud_mention_button) {
          note_cloud_mention_button.classList.add("hidden");
        }
        note_cloud.tabIndex = -1;
        note_cloud.removeAttribute("role");
      }
    }

    if (current_open_cycle_note_date === dateKey && day_note) {
      button.classList.add("is_note_open");
    }
  });
}

function handle_cycle_calendar_touch_start(event) {
  const touch = event.changedTouches?.[0];

  if (!touch) {
    return;
  }

  cycle_calendar_swipe_state = {
    x: touch.clientX,
    y: touch.clientY,
  };
}

function handle_cycle_calendar_touch_end(event) {
  if (!cycle_calendar_swipe_state) {
    return;
  }

  const touch = event.changedTouches?.[0];

  if (!touch) {
    cycle_calendar_swipe_state = null;
    return;
  }

  const dx = touch.clientX - cycle_calendar_swipe_state.x;
  const dy = touch.clientY - cycle_calendar_swipe_state.y;
  cycle_calendar_swipe_state = null;

  if (Math.abs(dx) < 54 || Math.abs(dy) > 42) {
    return;
  }

  suppress_cycle_day_click_until = Date.now() + 260;
  shift_cycle_month(dx < 0 ? 1 : -1);
}

function handle_cycle_calendar_touch_cancel() {
  cycle_calendar_swipe_state = null;
}

function open_cycle_feeling_dialog(
  target_date = get_cycle_selected_date_or_today(),
) {
  const normalized_date =
    typeof target_date === "string" &&
    !Number.isNaN(parse_local_date(target_date).getTime())
      ? target_date
      : get_cycle_selected_date_or_today();
  const checkin_context = get_active_cycle_checkin_context();
  const existing_checkin = get_cycle_checkin_entry();
  const is_svetlana = current_user_profile?.user_key === "svetlana";

  current_cycle_text_dialog_mode = "checkin";
  current_selected_cycle_date = normalized_date;
  current_cycle_mood_picker_open = false;
  dom_references.cycle_feeling_form.dataset.targetDate =
    checkin_context?.key || normalized_date;
  dom_references.cycle_feeling_form.dataset.mode = "checkin";
  dom_references.cycle_feeling_title.textContent = translate(
    is_svetlana ? "cycle_checkin_title_svetlana" : "cycle_checkin_title_diab",
  );
  dom_references.cycle_feeling_input.placeholder = translate(
    is_svetlana
      ? "cycle_checkin_placeholder_svetlana"
      : "cycle_checkin_placeholder_diab",
  );
  dom_references.save_cycle_feeling_button.textContent = translate(
    is_svetlana ? "cycle_checkin_save_svetlana" : "cycle_checkin_save_diab",
  );
  dom_references.cycle_feeling_input.value = is_svetlana
    ? existing_checkin?.feeling_text || ""
    : existing_checkin?.reply_text || "";
  current_cycle_dialog_guard = {
    dialog_id: dom_references.cycle_feeling_dialog.id,
    has_unsaved_changes: false,
    closing_via_save: false,
  };
  open_dialog(dom_references.cycle_feeling_dialog);
}

function open_cycle_note_dialog(
  target_date = get_cycle_selected_date_or_today(),
) {
  if (!can_edit_cycle_personal_details()) {
    return;
  }

  const normalized_date =
    typeof target_date === "string" &&
    !Number.isNaN(parse_local_date(target_date).getTime())
      ? target_date
      : get_cycle_selected_date_or_today();

  current_cycle_text_dialog_mode = "note";
  current_selected_cycle_date = normalized_date;
  current_cycle_mood_picker_open = false;
  dom_references.cycle_feeling_form.dataset.targetDate = normalized_date;
  dom_references.cycle_feeling_form.dataset.mode = "note";
  dom_references.cycle_feeling_title.textContent =
    translate("cycle_note_title");
  dom_references.cycle_feeling_input.placeholder = translate(
    "cycle_note_placeholder",
  );
  dom_references.save_cycle_feeling_button.textContent =
    translate("cycle_note_save");
  dom_references.cycle_feeling_input.value =
    get_cycle_note_for_date(normalized_date);
  current_cycle_dialog_guard = {
    dialog_id: dom_references.cycle_feeling_dialog.id,
    has_unsaved_changes: false,
    closing_via_save: false,
  };
  open_dialog(dom_references.cycle_feeling_dialog);
}

function close_cycle_feeling_dialog() {
  close_dialog(dom_references.cycle_feeling_dialog);
}

function save_cycle_feeling(event) {
  event.preventDefault();
  current_cycle_dialog_guard.closing_via_save = true;
  const target_date =
    dom_references.cycle_feeling_form.dataset.targetDate ||
    get_cycle_selected_date_or_today();
  const mode = dom_references.cycle_feeling_form.dataset.mode || "checkin";
  const feeling_text = dom_references.cycle_feeling_input.value.trim();

  if (mode === "note") {
    if (!can_edit_cycle_personal_details()) {
      current_cycle_dialog_guard.closing_via_save = false;
      close_cycle_feeling_dialog();
      return;
    }

    const previous_feeling_text = get_cycle_note_for_date(target_date);
    current_cycle_data.day_notes_by_date ||= {};

    if (feeling_text) {
      current_cycle_data.day_notes_by_date[target_date] = feeling_text;
    } else {
      delete current_cycle_data.day_notes_by_date[target_date];
    }

    const anchor_entry = find_cycle_anchor_entry_for_date(target_date);

    if (anchor_entry) {
      const target_entry = current_cycle_data.entries.find(
        (entry) => entry.id === anchor_entry.id,
      );

      if (target_entry) {
        const cleaned_notes = (target_entry.notes || []).filter(
          (note_text) => note_text !== previous_feeling_text,
        );
        target_entry.notes = feeling_text
          ? [...new Set([...cleaned_notes, feeling_text])]
          : cleaned_notes;
      }
    }

    current_open_cycle_note_date = feeling_text ? target_date : "";
    pending_cycle_change_type = "note";
  } else {
    const checkin_context = get_active_cycle_checkin_context();

    if (checkin_context) {
      current_cycle_data.cycle_checkins_by_key ||= {};
      const existing_entry =
        current_cycle_data.cycle_checkins_by_key[checkin_context.key] || {};
      const updated_entry = {
        ...existing_entry,
        start_text: checkin_context.start_text,
        end_text: checkin_context.end_text,
        feeling_text:
          current_user_profile?.user_key === "svetlana"
            ? feeling_text
            : existing_entry.feeling_text || "",
        reply_text:
          current_user_profile?.user_key === "diab"
            ? feeling_text
            : existing_entry.reply_text || "",
        updated_at: new Date().toISOString(),
      };

      if (!updated_entry.feeling_text && !updated_entry.reply_text) {
        delete current_cycle_data.cycle_checkins_by_key[checkin_context.key];
      } else {
        current_cycle_data.cycle_checkins_by_key[checkin_context.key] =
          updated_entry;
      }
    }

    cycle_feeling_prompt_key = `${target_date}_active`;
    pending_cycle_change_type = "checkin";
  }

  close_cycle_feeling_dialog();
  current_cycle_dialog_guard.has_unsaved_changes = false;
  current_cycle_dialog_guard.closing_via_save = false;
  on_cycle_change();
}
function render_cycle_calendar() {
  if (!dom_references.cycle_calendar_grid) {
    return;
  }
  const runtime = get_cycle_runtime_state();
  render_cycle_weekdays();
  build_cycle_calendar_month();
  apply_cycle_calendar_states(runtime);
  const monthStart = new Date(current_cycle_month_anchor);
  dom_references.cycle_month_label.textContent = monthStart.toLocaleDateString(
    current_language === "ar"
      ? "ar-EG"
      : current_language === "de"
        ? "de-DE"
        : "en-US",
    { month: "long", year: "numeric" },
  );
  sync_cycle_month_picker_value();
  render_cycle_status_panel();
  render_cycle_day_detail();
}

function render_cycle_day_details() {
  render_cycle_day_detail();
}

function render_cycle_day_detail() {
  const selected_date = get_cycle_selected_date_or_today();
  const selected_status = find_cycle_day_status(selected_date);
  const selected_entry = find_cycle_anchor_entry_for_date(selected_date);
  const saved_note = get_cycle_note_for_date(selected_date);
  const can_edit_personal = can_edit_cycle_personal_details();
  dom_references.cycle_day_detail_card.classList.remove("hidden");
  dom_references.cycle_day_detail_title.textContent =
    format_cycle_long_date(selected_date);
  dom_references.cycle_day_detail_state.textContent =
    get_cycle_state_text(selected_status);
  dom_references.cycle_day_detail_note.textContent = get_cycle_detail_note_text(
    selected_date,
    selected_status,
  );
  dom_references.cycle_day_detail_saved_note.textContent = saved_note
    ? `${translate("cycle_saved_note_prefix")}: ${saved_note}`
    : "";
  dom_references.cycle_day_detail_saved_note.classList.toggle(
    "hidden",
    !saved_note,
  );
  dom_references.cycle_day_mood_button.textContent =
    get_cycle_mood_button_label(selected_date);
  dom_references.cycle_day_mood_button.classList.toggle(
    "hidden",
    !can_edit_personal,
  );
  dom_references.cycle_day_note_button.classList.toggle(
    "hidden",
    !can_edit_personal,
  );
  dom_references.cycle_day_remove_button.disabled = !selected_entry;
  dom_references.cycle_day_remove_button.classList.toggle(
    "is_subtle_hidden",
    !selected_entry,
  );
  render_cycle_day_mood_picker();
}
function render_cycle_weekdays() {
  dom_references.cycle_weekday_row.innerHTML = "";
  get_weekday_labels().forEach((label_text) => {
    const label = document.createElement("span");
    label.textContent = label_text;
    dom_references.cycle_weekday_row.appendChild(label);
  });
}

function render_cycle_month_label() {
  dom_references.cycle_month_label.textContent =
    current_cycle_month_anchor.toLocaleDateString(translate("locale"), {
      month: "long",
      year: "numeric",
    });
  sync_cycle_month_picker_value();
}

function format_cycle_checkin_thread() {
  const checkin_entry = get_cycle_checkin_entry();
  const line_list = [];

  if (checkin_entry?.feeling_text) {
    line_list.push(
      `${translate("cycle_checkin_svetlana_prefix")}: ${checkin_entry.feeling_text}`,
    );
  }

  if (checkin_entry?.reply_text) {
    line_list.push(
      `${translate("cycle_checkin_diab_prefix")}: ${checkin_entry.reply_text}`,
    );
  }

  return line_list;
}

function render_cycle_status_panel() {
  const cycle_stats = get_cycle_stats();
  const today_context = get_cycle_today_context();
  const cycle_message_event = get_active_cycle_message_event();
  const selected_date = get_cycle_selected_date_or_today();
  const thread_lines = format_cycle_checkin_thread();
  const cycle_status_text = get_cycle_status_text();
  dom_references.cycle_status_label.textContent = cycle_status_text;
  dom_references.cycle_summary_text.textContent = `${format_cycle_long_date(today_context.today_text)} - ${translate("cycle_summary", cycle_stats.cycle_length, cycle_stats.period_length)}`;
  if (dom_references.cycle_compact_summary_text) {
    dom_references.cycle_compact_summary_text.textContent = cycle_status_text;
  }
  dom_references.cycle_support_card.classList.toggle(
    "hidden",
    !cycle_message_event && !today_context.window_is_active,
  );

  if (cycle_message_event || today_context.window_is_active) {
    dom_references.cycle_support_message.textContent =
      cycle_message_event?.content ||
      pick_cycle_support_suffix(today_context.today_text, "soft");
    dom_references.cycle_today_feeling.classList.toggle(
      "hidden",
      thread_lines.length === 0,
    );
    dom_references.cycle_today_feeling.textContent = thread_lines.join("  •  ");
    dom_references.open_cycle_feeling_button.textContent =
      current_user_profile?.user_key === "diab"
        ? translate("cycle_reply_softly")
        : translate("cycle_write_feeling");
  } else {
    dom_references.cycle_support_echo.classList.add("hidden");
    dom_references.cycle_support_echo.classList.remove(
      "is_visible",
      "is_blooming",
    );
    dom_references.cycle_support_echo.textContent = "";
    dom_references.cycle_today_feeling.classList.add("hidden");
    dom_references.cycle_today_feeling.textContent = "";
  }

  sync_cycle_auto_expansion(today_context, cycle_message_event);
  sync_cycle_audio();
}

function maybe_prompt_cycle_feeling(force_open = false) {
  const today_context = get_cycle_today_context();
  const prompt_key = `${today_context.today_text}_${today_context.window_is_active ? "active" : "quiet"}`;
  const checkin_entry = get_cycle_checkin_entry();

  if (
    !today_context.window_is_active ||
    !current_user_profile ||
    current_user_profile.user_key !== "svetlana"
  ) {
    return;
  }

  if (!force_open && cycle_feeling_prompt_key === prompt_key) {
    return;
  }

  if (!checkin_entry?.feeling_text || force_open) {
    cycle_feeling_prompt_key = prompt_key;
    window.setTimeout(
      () => {
        if (
          !dom_references.cycle_feeling_dialog.open &&
          !document.querySelector("dialog[open]")
        ) {
          open_cycle_feeling_dialog();
        }
      },
      force_open ? 120 : 420,
    );
  }
}

function mark_cycle_dialog_dirty(dialog_element) {
  if (
    !dialog_element ||
    current_cycle_dialog_guard.dialog_id !== dialog_element.id
  ) {
    return;
  }

  if (current_cycle_dialog_guard.closing_via_save) {
    return;
  }

  current_cycle_dialog_guard.has_unsaved_changes = true;
}

function open_cycle_discard_dialog(target_dialog) {
  current_cycle_dialog_guard.dialog_id = target_dialog.id;
  open_dialog(dom_references.cycle_discard_dialog);
}

function close_cycle_discard_dialog() {
  close_dialog(dom_references.cycle_discard_dialog);
}

function request_cycle_dialog_close(dialog_element) {
  if (!dialog_element?.open) {
    return;
  }

  if (
    current_cycle_dialog_guard.dialog_id === dialog_element.id &&
    current_cycle_dialog_guard.has_unsaved_changes
  ) {
    open_cycle_discard_dialog(dialog_element);
    return;
  }

  current_cycle_dialog_guard = {
    dialog_id: "",
    has_unsaved_changes: false,
    closing_via_save: false,
  };
  close_dialog(dialog_element);
}

function handle_cycle_dialog_cancel(event) {
  event.preventDefault();
  request_cycle_dialog_close(event.currentTarget);
}

function handle_cycle_dialog_backdrop_click(event) {
  if (event.target === event.currentTarget) {
    request_cycle_dialog_close(event.currentTarget);
  }
}

function handle_cycle_dialog_touch_start(event) {
  const touch = event.changedTouches?.[0];

  if (!touch) {
    return;
  }

  event.currentTarget.dataset.touchStartX = String(touch.clientX);
  event.currentTarget.dataset.touchStartY = String(touch.clientY);
}

function handle_cycle_dialog_touch_end(event) {
  const touch = event.changedTouches?.[0];
  const start_x = Number(event.currentTarget.dataset.touchStartX || "0");
  const start_y = Number(event.currentTarget.dataset.touchStartY || "0");

  if (!touch || !start_x || !start_y) {
    return;
  }

  const delta_x = touch.clientX - start_x;
  const delta_y = touch.clientY - start_y;

  if (delta_y > 88 && Math.abs(delta_x) < 46) {
    request_cycle_dialog_close(event.currentTarget);
  }
}

function handle_cycle_discard_submit(event) {
  event.preventDefault();
  const target_dialog = document.getElementById(
    current_cycle_dialog_guard.dialog_id,
  );
  close_cycle_discard_dialog();
  current_cycle_dialog_guard = {
    dialog_id: "",
    has_unsaved_changes: false,
    closing_via_save: false,
  };

  if (target_dialog) {
    close_dialog(target_dialog);
  }
}

function open_dialog(dialog_element) {
  if (typeof dialog_element.showModal === "function") {
    if (!dialog_element.open) {
      dialog_element.showModal();
    }
  } else {
    dialog_element.setAttribute("open", "");
  }
}

function close_dialog(dialog_element) {
  if (typeof dialog_element.close === "function") {
    if (dialog_element.open) {
      dialog_element.close();
    }
  } else {
    dialog_element.removeAttribute("open");
  }
}

function handle_app_notice_cancel(event) {
  event.preventDefault();
  settle_app_notice_dialog(false);
}

function handle_app_notice_backdrop_click(event) {
  if (event.target === event.currentTarget) {
    settle_app_notice_dialog(false);
  }
}

function settle_app_notice_dialog(result) {
  const request = current_app_notice_request;

  if (!request) {
    close_dialog(dom_references.app_notice_dialog);
    return;
  }

  current_app_notice_request = null;
  close_dialog(dom_references.app_notice_dialog);
  request.resolve(Boolean(result));
}

function show_app_dialog({
  title = translate("app_notice_title"),
  message = translate("app_notice_default_body"),
  confirm_label = translate("ok_action"),
  cancel_label = translate("cancel_action"),
  show_cancel = false,
} = {}) {
  if (!dom_references.app_notice_dialog) {
    return Promise.resolve(show_cancel ? false : true);
  }

  if (current_app_notice_request) {
    settle_app_notice_dialog(false);
  }

  set_text(dom_references.app_notice_title, title);
  set_text(dom_references.app_notice_body, message);
  set_text(dom_references.confirm_app_notice_button, confirm_label);
  set_text(dom_references.cancel_app_notice_button, cancel_label);
  dom_references.cancel_app_notice_button.classList.toggle(
    "hidden",
    !show_cancel,
  );

  open_dialog(dom_references.app_notice_dialog);

  const preferred_button = show_cancel
    ? dom_references.confirm_app_notice_button
    : dom_references.confirm_app_notice_button;
  window.setTimeout(() => {
    preferred_button?.focus();
  }, 24);

  return new Promise((resolve) => {
    current_app_notice_request = { resolve };
  });
}

function show_app_alert(message_text, options = {}) {
  return show_app_dialog({
    title: options.title || translate("app_notice_title"),
    message: message_text,
    confirm_label: options.confirm_label || translate("ok_action"),
    cancel_label: options.cancel_label || translate("cancel_action"),
    show_cancel: false,
  });
}

function show_app_confirm(message_text, options = {}) {
  return show_app_dialog({
    title: options.title || translate("app_confirm_title"),
    message: message_text,
    confirm_label: options.confirm_label || translate("confirm_action"),
    cancel_label: options.cancel_label || translate("cancel_action"),
    show_cancel: true,
  });
}

async function save_memory_from_form(event) {
  event.preventDefault();

  const image_file = dom_references.memory_image_input.files[0];
  const memory_date = dom_references.memory_date_input.value;
  const existing_memory = current_memory_items.find(
    (item) => item.id === editing_memory_id,
  );
  const memory_id = editing_memory_id || create_item_id();
  const uploaded_image = image_file
    ? await upload_file_to_supabase_media(
        image_file,
        "memory-gallery",
        `memory_${memory_id}`,
      )
    : null;
  const image_data = image_file
    ? uploaded_image?.public_url || (await read_file_as_data_url(image_file))
    : editing_memory_image_data;
  const memory_thoughts = {
    ...get_item_thoughts(existing_memory, "note"),
  };
  const active_memory_thought = dom_references.memory_note_input.value.trim();

  if (current_user_profile?.user_key) {
    if (active_memory_thought) {
      memory_thoughts[current_user_profile.user_key] = active_memory_thought;
    } else {
      delete memory_thoughts[current_user_profile.user_key];
    }
  }

  const saved_memory = {
    id: memory_id,
    author_key:
      existing_memory?.author_key ||
      current_user_profile?.user_key ||
      "svetlana",
    title: dom_references.memory_title_input.value.trim(),
    date_label: memory_date
      ? format_display_date(memory_date)
      : existing_memory?.date_label || translate("fallback_memory_date"),
    date_value: memory_date || existing_memory?.date_value || "",
    note: encode_item_thoughts(memory_thoughts),
    image_data,
  };

  const base_memories = current_memory_items.filter(
    (item) => !item.is_placeholder,
  );
  const updated_memories = editing_memory_id
    ? current_memory_items.map((item) =>
        item.id === editing_memory_id ? saved_memory : item,
      )
    : [saved_memory, ...base_memories];

  current_memory_items = updated_memories;
  await api_save_items("memories", memory_storage_key, updated_memories);
  void announce_shared_activity(
    "memory",
    translate("shared_activity_memory"),
    saved_memory.title,
  );
  render_memory_gallery(updated_memories);
  editing_memory_id = null;
  editing_memory_image_data = "";
  dom_references.memory_form.reset();
  dom_references.memory_image_hint.textContent = "";
  update_dialog_titles();
  close_dialog(dom_references.memory_dialog);
  burst_reaction(dom_references.memory_gallery, "heart", 12);
}

async function save_event_from_form(event) {
  event.preventDefault();

  const event_date = dom_references.event_date_input.value;
  const existing_event = current_event_items.find(
    (item) => item.id === editing_event_id,
  );
  const event_thoughts = {
    ...get_item_thoughts(existing_event, "description"),
  };
  const active_event_thought =
    dom_references.event_description_input.value.trim();
  const can_edit_event_fields =
    !existing_event?.is_locked || current_user_profile?.user_key === "diab";
  const saved_event_date = can_edit_event_fields
    ? event_date
    : existing_event?.date_value || "";

  if (current_user_profile?.user_key) {
    if (active_event_thought) {
      event_thoughts[current_user_profile.user_key] = active_event_thought;
    } else {
      delete event_thoughts[current_user_profile.user_key];
    }
  }

  const saved_event = {
    id: editing_event_id || create_item_id(),
    author_key:
      existing_event?.author_key ||
      current_user_profile?.user_key ||
      "svetlana",
    is_locked: existing_event?.is_locked || false,
    is_custom: existing_event?.is_locked
      ? true
      : existing_event?.is_custom || false,
    title: can_edit_event_fields
      ? dom_references.event_title_input.value.trim()
      : existing_event?.title || "",
    date_label: saved_event_date
      ? format_display_date(saved_event_date)
      : existing_event?.date_label || translate("fallback_event_date"),
    date_value: saved_event_date,
    description: encode_item_thoughts(event_thoughts),
  };

  const updated_events = editing_event_id
    ? current_event_items.map((item) =>
        item.id === editing_event_id ? saved_event : item,
      )
    : [saved_event, ...current_event_items];

  current_event_items = updated_events;
  await api_save_items("events", event_storage_key, updated_events);
  void announce_shared_activity(
    "event",
    translate("shared_activity_event"),
    saved_event.title,
  );
  render_event_timeline(updated_events);
  editing_event_id = null;
  dom_references.event_form.reset();
  dom_references.event_title_input.disabled = false;
  dom_references.event_date_input.disabled = false;
  update_dialog_titles();
  close_dialog(dom_references.event_dialog);
  burst_reaction(dom_references.event_timeline, "heart", 12);
}

function read_file_as_data_url(file) {
  return new Promise((resolve, reject) => {
    const reader = new FileReader();
    reader.addEventListener("load", () => resolve(reader.result));
    reader.addEventListener("error", () => reject(reader.error));
    reader.readAsDataURL(file);
  });
}

function format_display_date(date_value) {
  const date = parse_local_date(date_value);
  return date.toLocaleDateString(translate("locale"), {
    year: "numeric",
    month: "long",
    day: "numeric",
  });
}

function get_item_display_date(item, fallback_key) {
  if (item?.date_value) {
    return format_display_date(item.date_value);
  }

  return item?.date_label || translate(fallback_key);
}

function create_item_id() {
  return `item_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function set_theme(theme_name) {
  document.documentElement.dataset.theme = theme_name;
  document.body.dataset.theme = theme_name;
}

function apply_saved_theme() {
  const saved_theme =
    document.documentElement.dataset.theme ||
    localStorage.getItem(theme_storage_key) ||
    "light";
  set_theme(saved_theme);
  update_theme_button(saved_theme);
}

function toggle_theme() {
  const next_theme =
    document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  set_theme(next_theme);
  localStorage.setItem(theme_storage_key, next_theme);
  update_theme_button(next_theme);
  burst_reaction(dom_references.theme_toggle_button, "spark", 10);
}

function update_theme_button(theme_name) {
  const is_dark_theme = theme_name === "dark";
  const icon = is_dark_theme ? "\u2600\uFE0F" : "\uD83C\uDF19";
  const label = is_dark_theme
    ? translate("theme_light_short")
    : translate("theme_dark_short");
  dom_references.theme_toggle_button.innerHTML = `
    <span class="theme_toggle_icon" aria-hidden="true">${icon}</span>
    <span class="theme_toggle_label">${label}</span>
  `;
  dom_references.theme_toggle_button.setAttribute("aria-label", label);
  dom_references.theme_toggle_button.title = label;
  dom_references.theme_toggle_button.setAttribute(
    "aria-pressed",
    String(is_dark_theme),
  );
}

async function load_live_messages() {
  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .select("*")
        .eq("room_slug", current_room_slug)
        .order("created_at", { ascending: true });

      if (error) {
        log_app_error("supabase_live_messages_load_failed", error);
        throw error;
      }

      const hydrated_messages = await hydrate_live_message_storage_sources(
        Array.isArray(data) ? data.map(map_live_message_row_to_item) : [],
      );
      current_live_messages = split_visible_live_messages(hydrated_messages);
      render_live_messages(true);
      void configure_background_message_sync();
      return;
    } catch (error) {
      log_app_error("supabase_live_messages_load_threw", error);
      render_live_messages();
      return;
    }
  }

  try {
    const response = await fetch("/api/live_messages");

    if (response.ok) {
      const live_messages = await response.json();

      if (Array.isArray(live_messages)) {
        current_live_messages = split_visible_live_messages(live_messages);
        render_live_messages(true);
        void configure_background_message_sync();
      }
    }
  } catch (error) {
    render_live_messages();
  }
}

function open_live_messages_stream() {
  close_live_messages_stream();

  if (is_supabase_enabled() && current_auth_user_id) {
    live_message_stream = supabase_client
      .channel(`live-messages-${current_room_slug}`)
      .on(
        "postgres_changes",
        {
          event: "*",
          schema: "public",
          table: supabase_table_names.live_messages,
          filter: `room_slug=eq.${current_room_slug}`,
        },
        async (payload) => {
          if (payload.eventType === "DELETE") {
            current_live_messages = current_live_messages.filter(
              (message_item) => message_item.id !== payload.old.id,
            );
            render_live_messages(true);
            return;
          }

          const next_message = await hydrate_live_message_storage_sources(
            map_live_message_row_to_item(payload.new),
          );
          if (is_system_live_message(next_message)) {
            apply_system_live_message(next_message);
            return;
          }
          upsert_live_message(next_message, true);
        },
      )
      .subscribe();
    return;
  }

  if (typeof window.EventSource !== "function") {
    start_live_message_polling();
    return;
  }

  live_message_stream = new EventSource("/api/live_messages_stream");
  live_message_stream.addEventListener("live_message", (event) => {
    try {
      const message_item = JSON.parse(event.data);
      if (is_system_live_message(message_item)) {
        apply_system_live_message(message_item);
        return;
      }
      upsert_live_message(message_item, true);
    } catch (error) {
      // Ignore malformed events.
    }
  });
  live_message_stream.addEventListener("live_message_updated", (event) => {
    try {
      const message_item = JSON.parse(event.data);
      if (is_system_live_message(message_item)) {
        apply_system_live_message(message_item);
        return;
      }
      upsert_live_message(message_item, true);
    } catch (error) {
      // Ignore malformed events.
    }
  });
  live_message_stream.addEventListener("live_message_deleted", (event) => {
    try {
      const payload = JSON.parse(event.data);
      current_live_messages = current_live_messages.filter(
        (message_item) => message_item.id !== payload.id,
      );
      render_live_messages(true);
    } catch (error) {
      // Ignore malformed events.
    }
  });
  live_message_stream.onerror = () => {
    start_live_message_polling();
  };
}

function close_live_messages_stream() {
  if (live_message_stream) {
    if (is_supabase_enabled()) {
      supabase_client.removeChannel(live_message_stream);
    } else {
      live_message_stream.close();
    }
    live_message_stream = null;
  }

  stop_live_message_polling();
}

function close_shared_data_stream() {
  if (!shared_data_stream) {
    return;
  }

  if (is_supabase_enabled()) {
    supabase_client.removeChannel(shared_data_stream);
  }

  shared_data_stream = null;
}

function start_live_message_polling() {
  if (live_message_poll_id) {
    return;
  }

  live_message_poll_id = window.setInterval(load_live_messages, 5000);
}

function stop_live_message_polling() {
  if (!live_message_poll_id) {
    return;
  }

  window.clearInterval(live_message_poll_id);
  live_message_poll_id = null;
}

function upsert_live_message(message_item, scroll_to_bottom = false) {
  if (is_system_live_message(message_item)) {
    apply_system_live_message(message_item);
    return;
  }

  const existing_index = current_live_messages.findIndex(
    (item) => item.id === message_item.id,
  );
  const is_new_message = existing_index < 0;

  if (existing_index >= 0) {
    current_live_messages[existing_index] = message_item;
  } else {
    current_live_messages = [...current_live_messages, message_item];
  }

  if (
    !is_deleted_live_message(message_item) &&
    hidden_deleted_message_ids.includes(message_item.id)
  ) {
    hidden_deleted_message_ids = hidden_deleted_message_ids.filter(
      (item_id) => item_id !== message_item.id,
    );
    save_hidden_deleted_messages();
  }

  if (
    editing_live_message_id === message_item.id &&
    is_deleted_live_message(message_item)
  ) {
    clear_live_message_composer();
  }

  current_live_messages.sort(
    (left_item, right_item) =>
      new Date(left_item.created_at) - new Date(right_item.created_at),
  );
  render_live_messages(scroll_to_bottom);

  if (
    is_new_message &&
    live_messages_history_loaded &&
    current_user_profile &&
    message_item.sender_key !== current_user_profile.user_key &&
    !is_deleted_live_message(message_item)
  ) {
    play_receive_message_sound();
    show_in_app_message_notification(message_item);
    if (document.hidden || !document.hasFocus()) {
      void schedule_message_notification(message_item);
    }
  }

  void configure_background_message_sync();
}

function map_live_message_row_to_item(row) {
  return {
    id: String(row.id),
    room_slug: String(row.room_slug || current_room_slug),
    sender_key: String(row.sender_key || ""),
    sender_name: String(row.sender_name || ""),
    text: String(row.text || ""),
    created_at: String(row.created_at || new Date().toISOString()),
    edited_at: String(row.edited_at || ""),
    attachments: Array.isArray(row.attachments) ? row.attachments : [],
  };
}

function is_system_live_message(message_item) {
  const message_text = String(message_item?.text || "");
  return [
    presence_live_message_marker,
    cycle_state_live_message_marker,
    shared_music_live_message_marker,
    shared_activity_live_message_marker,
  ].includes(message_text);
}

function apply_system_live_message(message_item) {
  const message_text = String(message_item?.text || "");

  if (message_text === presence_live_message_marker) {
    apply_presence_state_from_message(message_item);
    return;
  }

  if (message_text === cycle_state_live_message_marker) {
    apply_cycle_state_from_message(message_item);
    return;
  }

  if (message_text === shared_music_live_message_marker) {
    apply_shared_music_state_from_message(message_item);
    return;
  }

  if (message_text === shared_activity_live_message_marker) {
    apply_shared_activity_from_message(message_item);
  }
}

function is_deleted_live_message(message_item) {
  return (
    Boolean(message_item) &&
    String(message_item.text || "") === deleted_live_message_marker
  );
}

function get_presence_attachment(message_item) {
  const attachments = Array.isArray(message_item?.attachments)
    ? message_item.attachments
    : [];
  return (
    attachments.find((attachment) => attachment?.kind === "presence_state") ||
    null
  );
}

function normalize_hidden_deleted_ids(value) {
  return [
    ...new Set(
      (Array.isArray(value) ? value : [])
        .map((item) => String(item || ""))
        .filter(Boolean),
    ),
  ];
}

function get_default_presence_state(user_key) {
  return {
    user_key,
    visible: true,
    active: false,
    last_seen_at: "",
    updated_at: "",
    typing_until: "",
    hidden_deleted_message_ids: [],
  };
}

function normalize_presence_state(raw_state = {}, fallback_user_key = "") {
  const user_key = String(raw_state.user_key || fallback_user_key || "");
  return {
    ...get_default_presence_state(user_key),
    user_key,
    visible: raw_state.visible !== false,
    active: Boolean(raw_state.active),
    last_seen_at: String(raw_state.last_seen_at || raw_state.lastSeenAt || ""),
    updated_at: String(raw_state.updated_at || raw_state.updatedAt || ""),
    typing_until: String(raw_state.typing_until || raw_state.typingUntil || ""),
    hidden_deleted_message_ids: normalize_hidden_deleted_ids(
      raw_state.hidden_deleted_message_ids || raw_state.hiddenDeletedMessageIds,
    ),
  };
}

function get_presence_state_storage_key(user_key) {
  return `${presence_state_storage_prefix}_${current_room_slug}_${user_key}`;
}

function read_local_presence_state(user_key) {
  try {
    const stored_state = JSON.parse(
      localStorage.getItem(get_presence_state_storage_key(user_key)) || "null",
    );

    if (stored_state && typeof stored_state === "object") {
      return normalize_presence_state(stored_state, user_key);
    }
  } catch (error) {
    // Local presence falls through to the old keys/default state below.
  }

  const fallback_state = get_default_presence_state(user_key);
  fallback_state.visible =
    localStorage.getItem(get_presence_visibility_key(user_key)) !== "off";
  fallback_state.last_seen_at =
    localStorage.getItem(get_presence_seen_key(user_key)) || "";
  return fallback_state;
}

function save_local_presence_state(user_key, state) {
  if (!user_key) {
    return;
  }

  localStorage.setItem(
    get_presence_state_storage_key(user_key),
    JSON.stringify(normalize_presence_state(state, user_key)),
  );
}

function set_presence_state(user_key, next_state, should_save = true) {
  if (!user_key) {
    return get_default_presence_state("");
  }

  const normalized_state = normalize_presence_state(
    {
      ...(presence_state_by_user[user_key] || read_local_presence_state(user_key)),
      ...next_state,
      user_key,
    },
    user_key,
  );
  presence_state_by_user[user_key] = normalized_state;

  if (should_save) {
    save_local_presence_state(user_key, normalized_state);
  }

  return normalized_state;
}

function apply_presence_state_from_message(message_item) {
  const attachment = get_presence_attachment(message_item);

  if (!attachment || !message_item.sender_key) {
    return;
  }

  const state = set_presence_state(
    message_item.sender_key,
    {
      ...attachment,
      user_key: message_item.sender_key,
    },
    true,
  );

  if (current_user_profile?.user_key === message_item.sender_key) {
    current_user_presence_visible = state.visible;
    hidden_deleted_message_ids = normalize_hidden_deleted_ids(
      state.hidden_deleted_message_ids,
    );
  }

  update_presence_status_text();
}

function split_visible_live_messages(message_items) {
  const mapped_items = Array.isArray(message_items)
    ? message_items.map((item) =>
        item?.room_slug !== undefined ? item : map_live_message_row_to_item(item),
      )
    : [];

  mapped_items
    .filter(is_system_live_message)
    .forEach(apply_system_live_message);

  return mapped_items.filter((message_item) => !is_system_live_message(message_item));
}

function get_hidden_deleted_message_storage_key() {
  if (!current_user_profile?.user_key) {
    return "";
  }

  return `${hidden_deleted_message_storage_prefix}_${current_room_slug}_${current_user_profile.user_key}`;
}

function load_hidden_deleted_messages() {
  const storage_key = get_hidden_deleted_message_storage_key();
  const presence_state = current_user_profile?.user_key
    ? read_local_presence_state(current_user_profile.user_key)
    : null;

  if (presence_state?.hidden_deleted_message_ids?.length) {
    hidden_deleted_message_ids = normalize_hidden_deleted_ids(
      presence_state.hidden_deleted_message_ids,
    );
    return;
  }

  if (!storage_key) {
    hidden_deleted_message_ids = [];
    return;
  }

  try {
    const stored_value = JSON.parse(localStorage.getItem(storage_key) || "[]");
    hidden_deleted_message_ids = Array.isArray(stored_value)
      ? [
          ...new Set(
            stored_value.map((item) => String(item || "")).filter(Boolean),
          ),
        ]
      : [];
  } catch (error) {
    hidden_deleted_message_ids = [];
  }
}

function save_hidden_deleted_messages() {
  const storage_key = get_hidden_deleted_message_storage_key();

  if (!storage_key) {
    return;
  }

  localStorage.setItem(storage_key, JSON.stringify(hidden_deleted_message_ids));
  if (current_user_profile?.user_key) {
    set_presence_state(
      current_user_profile.user_key,
      {
        hidden_deleted_message_ids,
        updated_at: new Date().toISOString(),
      },
      true,
    );
    void sync_presence_state_to_remote();
  }
}

function should_hide_deleted_message(message_item) {
  return (
    is_deleted_live_message(message_item) &&
    hidden_deleted_message_ids.includes(message_item.id)
  );
}

function hide_deleted_message_locally(message_id) {
  if (hidden_deleted_message_ids.includes(message_id)) {
    return;
  }

  hidden_deleted_message_ids = [...hidden_deleted_message_ids, message_id];
  save_hidden_deleted_messages();
  render_live_messages();
}

function get_live_message_display_text(message_item) {
  if (is_deleted_live_message(message_item)) {
    return translate("live_message_deleted");
  }

  return String(message_item.text || "");
}

function render_live_messages(scroll_to_bottom = false) {
  const scroll_anchor = get_live_messages_scroll_anchor();
  dom_references.live_messages_list.innerHTML = "";
  const has_messages = current_live_messages.length > 0;
  update_messages_compact_summary();
  dom_references.live_messages_empty_state.classList.toggle(
    "hidden",
    has_messages,
  );

  if (!has_messages) {
    return;
  }

  current_live_messages.forEach((message_item) => {
    if (should_hide_deleted_message(message_item)) {
      return;
    }

    const message_element = document.createElement("article");
    const is_own_message =
      current_user_profile &&
      message_item.sender_key === current_user_profile.user_key;
    const is_deleted_message = is_deleted_live_message(message_item);
    message_element.className = is_own_message
      ? "live_message_item own_message"
      : "live_message_item";
    message_element.dataset.messageId = message_item.id;
    message_element.dataset.senderKey = message_item.sender_key;

    if (is_deleted_message) {
      message_element.classList.add("is_deleted_message");
    }

    const message_meta = document.createElement("div");
    message_meta.className = "live_message_meta";

    const sender_label = document.createElement("span");
    sender_label.textContent = get_message_sender_label(
      message_item,
      is_own_message,
    );

    const time_label = document.createElement("span");
    time_label.textContent = format_message_time(message_item.created_at);

    message_meta.append(sender_label, time_label);
    message_element.appendChild(message_meta);

    const context_attachment = get_context_attachment(message_item.attachments);

    if (context_attachment) {
      message_element.appendChild(
        render_message_context_attachment(context_attachment),
      );
    }

    const message_body = document.createElement("div");
    message_body.className = "live_message_body";

    if (is_deleted_message) {
      message_body.textContent = get_live_message_display_text(message_item);
    } else {
      const structured_content = get_structured_content_attachment(
        message_item.attachments,
      );

      if (structured_content?.segments?.length) {
        render_message_segments_into_body(
          message_body,
          structured_content.segments,
        );
      } else {
        message_body.textContent = get_live_message_display_text(message_item);
      }
    }

    if (message_body.childNodes.length > 0 || message_body.textContent) {
      message_element.appendChild(message_body);
    }

    const file_attachments = get_file_attachments(message_item.attachments);

    if (!is_deleted_message && file_attachments.length > 0) {
      const attachment_list = document.createElement("div");
      attachment_list.className = "live_message_attachments";
      file_attachments.forEach((attachment) =>
        attachment_list.appendChild(render_live_message_attachment(attachment)),
      );
      message_element.appendChild(attachment_list);
    }

    const edit_note = render_live_message_edit_note(message_item);

    if (edit_note) {
      message_element.appendChild(edit_note);
    }

    if (is_deleted_message) {
      message_element.appendChild(
        create_deleted_message_tools(message_item.id),
      );
    } else if (is_own_message) {
      message_element.appendChild(create_live_message_tools(message_item.id));
    }

    dom_references.live_messages_list.appendChild(message_element);
  });

  if (scroll_to_bottom || scroll_anchor?.near_bottom) {
    dom_references.live_messages_list.scrollTop =
      dom_references.live_messages_list.scrollHeight;
  } else {
    restore_live_messages_scroll_anchor(scroll_anchor);
  }

  live_messages_history_loaded = true;
  refresh_message_search_matches();
  update_messages_scroll_button();
}

function open_messages_search() {
  toggle_fullscreen_panel("messages", true);
  dom_references.messages_search_panel?.classList.remove("hidden");
  window.setTimeout(() => dom_references.messages_search_input?.focus(), 80);
}

function close_messages_search() {
  message_search_query = "";
  message_search_matches = [];
  message_search_active_index = -1;
  dom_references.messages_search_input.value = "";
  dom_references.messages_search_panel?.classList.add("hidden");
  refresh_message_search_matches();
}

function handle_messages_search_input(event) {
  message_search_query = String(event.currentTarget.value || "")
    .trim()
    .toLowerCase();
  message_search_active_index = -1;
  refresh_message_search_matches();
  move_message_search_match(1);
}

function escape_reg_exp(value) {
  return String(value || "").replace(/[.*+?^${}()|[\]\\]/g, "\\$&");
}

function clear_message_search_highlights(message_node) {
  message_node
    .querySelectorAll("mark.message_search_highlight")
    .forEach((highlight_node) => {
      highlight_node.replaceWith(
        document.createTextNode(highlight_node.textContent || ""),
      );
    });
  message_node.normalize();
}

function apply_message_search_highlights(message_node, query) {
  clear_message_search_highlights(message_node);

  if (!query) {
    return false;
  }

  const body = message_node.querySelector(".live_message_body");

  if (!body) {
    return false;
  }

  const matcher = new RegExp(escape_reg_exp(query), "gi");
  let has_match = false;
  const walker = document.createTreeWalker(
    body,
    NodeFilter.SHOW_TEXT,
    {
      acceptNode(node) {
        matcher.lastIndex = 0;
        return node.textContent && matcher.test(node.textContent)
          ? NodeFilter.FILTER_ACCEPT
          : NodeFilter.FILTER_REJECT;
      },
    },
  );
  const text_nodes = [];

  while (walker.nextNode()) {
    text_nodes.push(walker.currentNode);
  }

  text_nodes.forEach((text_node) => {
    const text_value = text_node.textContent || "";
    const fragment = document.createDocumentFragment();
    let last_index = 0;
    matcher.lastIndex = 0;

    text_value.replace(matcher, (match_text, match_index) => {
      has_match = true;

      if (match_index > last_index) {
        fragment.appendChild(
          document.createTextNode(text_value.slice(last_index, match_index)),
        );
      }

      const mark = document.createElement("mark");
      mark.className = "message_search_highlight";
      mark.textContent = match_text;
      fragment.appendChild(mark);
      last_index = match_index + match_text.length;
      return match_text;
    });

    if (last_index < text_value.length) {
      fragment.appendChild(document.createTextNode(text_value.slice(last_index)));
    }

    text_node.replaceWith(fragment);
  });

  return has_match;
}

function refresh_message_search_matches() {
  if (!dom_references.live_messages_list) {
    return;
  }

  const query = message_search_query;
  const message_nodes = [
    ...dom_references.live_messages_list.querySelectorAll(".live_message_item"),
  ];
  message_search_matches = [];

  message_nodes.forEach((message_node) => {
    const matches = apply_message_search_highlights(message_node, query);
    message_node.classList.toggle("is_search_match", Boolean(matches));
    message_node.classList.remove("is_current_search_match");

    if (matches) {
      message_search_matches.push(message_node);
    }
  });

  if (message_search_matches.length === 0) {
    message_search_active_index = -1;
    return;
  }

  if (message_search_active_index >= message_search_matches.length) {
    message_search_active_index = message_search_matches.length - 1;
  }

  if (message_search_active_index >= 0) {
    message_search_matches[message_search_active_index]?.classList.add(
      "is_current_search_match",
    );
  }
}

function move_message_search_match(direction) {
  if (!message_search_query || message_search_matches.length === 0) {
    return;
  }

  message_search_matches.forEach((message_node) =>
    message_node.classList.remove("is_current_search_match"),
  );
  message_search_active_index =
    (message_search_active_index + direction + message_search_matches.length) %
    message_search_matches.length;
  const active_match = message_search_matches[message_search_active_index];
  active_match?.classList.add("is_current_search_match");
  active_match?.scrollIntoView({
    behavior: "smooth",
    block: "center",
  });
}

function is_live_messages_list_near_bottom() {
  const list = dom_references.live_messages_list;

  if (!list) {
    return true;
  }

  return list.scrollHeight - list.scrollTop - list.clientHeight < 120;
}

function get_live_messages_scroll_anchor() {
  const list = dom_references.live_messages_list;

  if (!list) {
    return null;
  }

  const list_bounds = list.getBoundingClientRect();
  const visible_message = [
    ...list.querySelectorAll(".live_message_item"),
  ].find((message_node) => {
    const bounds = message_node.getBoundingClientRect();
    return bounds.bottom > list_bounds.top && bounds.top < list_bounds.bottom;
  });

  return {
    near_bottom: is_live_messages_list_near_bottom(),
    scroll_top: list.scrollTop,
    message_id: visible_message?.dataset.messageId || "",
    offset_top: visible_message
      ? visible_message.getBoundingClientRect().top - list_bounds.top
      : 0,
  };
}

function restore_live_messages_scroll_anchor(anchor) {
  const list = dom_references.live_messages_list;

  if (!list || !anchor) {
    return;
  }

  if (anchor.near_bottom) {
    list.scrollTop = list.scrollHeight;
    update_messages_scroll_button();
    return;
  }

  const target = anchor.message_id
    ? list.querySelector(`[data-message-id='${anchor.message_id}']`)
    : null;

  if (target) {
    const list_bounds = list.getBoundingClientRect();
    const target_offset = target.getBoundingClientRect().top - list_bounds.top;
    list.scrollTop += target_offset - anchor.offset_top;
  } else {
    list.scrollTop = anchor.scroll_top;
  }

  update_messages_scroll_button();
}

function preserve_live_messages_viewport_after_layout() {
  const anchor = get_live_messages_scroll_anchor();
  window.requestAnimationFrame(() =>
    window.requestAnimationFrame(() => restore_live_messages_scroll_anchor(anchor)),
  );
  window.setTimeout(() => restore_live_messages_scroll_anchor(anchor), 120);
}

function update_emoji_picker_position() {
  const viewport = window.visualViewport;
  const keyboard_offset = viewport
    ? Math.max(0, window.innerHeight - viewport.height - viewport.offsetTop)
    : 0;
  document.documentElement.style.setProperty(
    "--emoji_keyboard_offset",
    `${Math.round(keyboard_offset)}px`,
  );
}

function handle_visual_viewport_change() {
  update_emoji_picker_position();
  preserve_live_messages_viewport_after_layout();
}

function update_messages_scroll_button() {
  dom_references.messages_scroll_bottom_button?.classList.toggle(
    "hidden",
    is_live_messages_list_near_bottom(),
  );
}

function scroll_live_messages_to_bottom(behavior = "smooth") {
  const scroll_behavior =
    typeof behavior === "string" && behavior ? behavior : "smooth";
  dom_references.live_messages_list?.scrollTo({
    top: dom_references.live_messages_list.scrollHeight,
    behavior: scroll_behavior,
  });
  window.setTimeout(update_messages_scroll_button, 260);
}

function get_presence_visibility_key(user_key = current_user_profile?.user_key) {
  return `${presence_visibility_storage_prefix}_${current_room_slug}_${user_key || "guest"}`;
}

function get_presence_seen_key(user_key) {
  return `${presence_seen_storage_prefix}_${current_room_slug}_${user_key}`;
}

function get_other_user_key() {
  return current_user_profile?.user_key === "svetlana" ? "diab" : "svetlana";
}

function load_presence_visibility() {
  const current_state = read_local_presence_state(
    current_user_profile?.user_key || "guest",
  );
  current_user_presence_visible = current_state.visible;
  set_presence_state(current_user_profile?.user_key || "guest", current_state);
}

function is_app_active_for_presence() {
  return !document.hidden;
}

function get_current_presence_state_patch(is_active = !document.hidden) {
  const now_text = new Date().toISOString();
  return {
    visible: current_user_presence_visible,
    active: Boolean(is_active && current_user_presence_visible),
    last_seen_at: now_text,
    updated_at: now_text,
    hidden_deleted_message_ids,
  };
}

function mark_current_user_seen(is_active = !document.hidden, sync_remote = false) {
  if (!current_user_profile) {
    return;
  }

  set_presence_state(
    current_user_profile.user_key,
    get_current_presence_state_patch(is_active),
    true,
  );

  if (sync_remote) {
    void sync_presence_state_to_remote(true);
  }
}

function mark_current_user_typing(is_typing) {
  if (!current_user_profile) {
    return;
  }

  const now_ms = Date.now();
  const typing_until = is_typing
    ? new Date(now_ms + 4500).toISOString()
    : "";
  const current_state = get_current_presence_state_for_remote();
  const current_until = current_state?.typing_until
    ? new Date(current_state.typing_until).getTime()
    : 0;

  if (
    is_typing &&
    current_until > now_ms + 2500 &&
    now_ms - last_typing_sync_time < 1300
  ) {
    return;
  }

  window.clearTimeout(typing_idle_timeout_id);
  set_presence_state(
    current_user_profile.user_key,
    {
      typing_until,
      updated_at: new Date().toISOString(),
    },
    true,
  );
  last_typing_sync_time = now_ms;
  void sync_presence_state_to_remote(true);

  if (is_typing) {
    typing_idle_timeout_id = window.setTimeout(
      () => mark_current_user_typing(false),
      4600,
    );
  }
}

function create_presence_message_id(user_key = current_user_profile?.user_key) {
  const safe_room = String(current_room_slug || supabase_room_slug_default)
    .replace(/[^a-z0-9_-]+/gi, "_")
    .toLowerCase();
  return `presence_${safe_room}_${user_key || "guest"}`;
}

function build_presence_live_message(state) {
  return {
    id: create_presence_message_id(current_user_profile.user_key),
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: presence_live_message_marker,
    created_at: state.updated_at || new Date().toISOString(),
    edited_at: state.updated_at || new Date().toISOString(),
    attachments: [
      {
        kind: "presence_state",
        user_key: current_user_profile.user_key,
        visible: state.visible,
        active: state.active,
        last_seen_at: state.last_seen_at,
        updated_at: state.updated_at,
        typing_until: state.typing_until,
        hidden_deleted_message_ids: state.hidden_deleted_message_ids,
      },
    ],
  };
}

function get_current_presence_state_for_remote() {
  if (!current_user_profile) {
    return null;
  }

  return normalize_presence_state(
    presence_state_by_user[current_user_profile.user_key] ||
      read_local_presence_state(current_user_profile.user_key),
    current_user_profile.user_key,
  );
}

async function sync_presence_state_to_remote(immediate = false) {
  if (!current_user_profile) {
    return;
  }

  if (!immediate) {
    window.clearTimeout(presence_sync_timeout_id);
    presence_sync_timeout_id = window.setTimeout(
      () => sync_presence_state_to_remote(true),
      400,
    );
    return;
  }

  window.clearTimeout(presence_sync_timeout_id);
  presence_sync_timeout_id = null;
  const state = get_current_presence_state_for_remote();

  if (!state) {
    return;
  }

  save_local_presence_state(current_user_profile.user_key, state);
  const presence_message = build_presence_live_message(state);

  if (!is_supabase_enabled() || !current_auth_user_id) {
    if (can_use_local_api()) {
      try {
        const response = await fetch("/api/live_messages", {
          method: "POST",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify(presence_message),
        });

        if (!response.ok) {
          throw new Error("presence_local_sync_failed");
        }
      } catch (error) {
        // Local presence remains stored in this browser if the server is gone.
      }
    }
    return;
  }

  try {
    await supabase_client.from(supabase_table_names.live_messages).upsert(
      presence_message,
      { onConflict: "id" },
    );
  } catch (error) {
    // Presence still works locally when the network is unavailable.
  }
}

function start_presence_updates() {
  load_presence_visibility();
  mark_current_user_seen(is_app_active_for_presence(), true);
  update_presence_status_text();

  if (presence_interval_id) {
    return;
  }

  presence_interval_id = window.setInterval(() => {
    mark_current_user_seen(is_app_active_for_presence(), true);
    update_presence_status_text();
  }, 20 * 1000);
}

function stop_presence_updates() {
  mark_current_user_seen(false, true);

  if (presence_interval_id) {
    window.clearInterval(presence_interval_id);
    presence_interval_id = null;
  }
}

function format_presence_time(date_value) {
  return date_value.toLocaleTimeString(translate("locale"), {
    hour: "2-digit",
    minute: "2-digit",
  });
}

function format_presence_date(date_value) {
  return date_value.toLocaleDateString(translate("locale"), {
    day: "2-digit",
    month: "2-digit",
    year: "numeric",
  });
}

function is_presence_typing(state) {
  const typing_until = state?.typing_until ? new Date(state.typing_until) : null;
  return Boolean(
    typing_until &&
      !Number.isNaN(typing_until.getTime()) &&
      typing_until.getTime() > Date.now(),
  );
}

function get_presence_status_text() {
  if (!current_user_profile) {
    return "";
  }

  const other_user = get_other_user_key();
  const other_state =
    presence_state_by_user[other_user] || read_local_presence_state(other_user);
  const other_visible = other_state.visible !== false;

  if (!other_visible) {
    return translate("presence_hidden");
  }

  if (is_presence_typing(other_state)) {
    return translate("presence_typing");
  }

  const last_seen_text = other_state.last_seen_at || "";
  const last_seen_date = last_seen_text ? new Date(last_seen_text) : null;
  const updated_text = other_state.updated_at || last_seen_text;
  const updated_date = updated_text ? new Date(updated_text) : last_seen_date;

  if (!last_seen_date || Number.isNaN(last_seen_date.getTime())) {
    return translate("presence_waiting");
  }

  const now = new Date();
  const diff_ms = now - last_seen_date;
  const heartbeat_ms =
    updated_date && !Number.isNaN(updated_date.getTime())
      ? now - updated_date
      : diff_ms;
  const diff_minutes = Math.floor(diff_ms / (60 * 1000));
  const diff_hours = Math.floor(diff_ms / (60 * 60 * 1000));
  const yesterday = add_days(start_of_today(), -1);
  const last_seen_day = new Date(
    last_seen_date.getFullYear(),
    last_seen_date.getMonth(),
    last_seen_date.getDate(),
  );
  const time_text = format_presence_time(last_seen_date);

  if (other_state.active && heartbeat_ms >= 0 && heartbeat_ms < 70 * 1000) {
    return translate("presence_online");
  }

  if (diff_minutes < 1) {
    return translate("presence_last_seen_just_now");
  }

  if (diff_minutes < 60) {
    return translate("presence_last_seen_minutes", diff_minutes, time_text);
  }

  if (diff_hours < 24 && last_seen_day.getTime() === start_of_today().getTime()) {
    return translate("presence_last_seen_hours", diff_hours, time_text);
  }

  if (last_seen_day.getTime() === yesterday.getTime()) {
    return translate("presence_last_seen_yesterday", time_text);
  }

  return translate(
    "presence_last_seen_date",
    time_text,
    format_presence_date(last_seen_date),
  );
}

function update_presence_status_text() {
  set_text(dom_references.message_presence_bar, get_presence_status_text());

  if (dom_references.message_visibility_button) {
    const label = current_user_presence_visible
      ? translate("presence_hide_setting")
      : translate("presence_show_setting");
    const visible_text = current_user_presence_visible
      ? translate("presence_seen_toggle")
      : translate("presence_hidden_toggle");
    dom_references.message_visibility_button.setAttribute("aria-label", label);
    dom_references.message_visibility_button.title = label;
    dom_references.message_visibility_button.classList.toggle(
      "is_hidden",
      !current_user_presence_visible,
    );
    dom_references.message_visibility_button.innerHTML = current_user_presence_visible
      ? `
      <svg class="presence_toggle_icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M2.5 12s3.4-6 9.5-6 9.5 6 9.5 6-3.4 6-9.5 6-9.5-6-9.5-6Z"></path>
        <circle cx="12" cy="12" r="2.6"></circle>
      </svg>
      <span class="presence_toggle_text">${visible_text}</span>
    `
      : `
      <svg class="presence_toggle_icon" viewBox="0 0 24 24" aria-hidden="true">
        <path d="M3 3l18 18"></path>
        <path d="M2.5 12s3.4-6 9.5-6c2 0 3.7.6 5.1 1.4M21.5 12s-3.4 6-9.5 6c-2 0-3.8-.6-5.2-1.5"></path>
      </svg>
      <span class="presence_toggle_text">${visible_text}</span>
    `;
  }
}

function toggle_presence_visibility() {
  current_user_presence_visible = !current_user_presence_visible;
  localStorage.setItem(
    get_presence_visibility_key(),
    current_user_presence_visible ? "on" : "off",
  );
  mark_current_user_seen(current_user_presence_visible && !document.hidden, true);
  update_presence_status_text();
}

function update_messages_compact_summary() {
  if (!dom_references.messages_compact_summary_text) {
    return;
  }

  const visible_count = current_live_messages.filter(
    (message_item) => !should_hide_deleted_message(message_item),
  ).length;
  const last_message = [...current_live_messages]
    .reverse()
    .find((message_item) => !should_hide_deleted_message(message_item));
  const last_text = last_message
    ? get_live_message_display_text(last_message).replace(/\s+/g, " ").trim()
    : translate("live_messages_empty");
  const preview_text = last_text
    ? last_text.slice(0, 54)
    : translate("live_messages_empty");

  dom_references.messages_compact_summary_text.textContent =
    visible_count > 0
      ? `${visible_count} • ${preview_text}${last_text.length > 54 ? "..." : ""}`
      : preview_text;
}

function create_live_message_tools(message_id) {
  const tool_wrap = document.createElement("div");
  tool_wrap.className = "live_message_tools";

  const edit_button = document.createElement("button");
  edit_button.className = "live_message_tool_button";
  edit_button.type = "button";
  edit_button.dataset.action = "edit_live_message";
  edit_button.dataset.message_id = message_id;
  edit_button.title = translate("edit");
  edit_button.setAttribute("aria-label", translate("edit"));
  edit_button.append(
    create_action_icon("edit"),
    create_action_label(translate("edit")),
  );

  const delete_button = document.createElement("button");
  delete_button.className = "live_message_tool_button delete_message_tool";
  delete_button.type = "button";
  delete_button.dataset.action = "delete_live_message";
  delete_button.dataset.message_id = message_id;
  delete_button.title = translate("delete");
  delete_button.setAttribute("aria-label", translate("delete"));
  delete_button.append(
    create_action_icon("delete"),
    create_action_label(translate("delete")),
  );

  tool_wrap.append(edit_button, delete_button);
  return tool_wrap;
}

function create_deleted_message_tools(message_id) {
  const tool_wrap = document.createElement("div");
  tool_wrap.className = "live_message_tools deleted_message_tools";

  const delete_button = document.createElement("button");
  delete_button.className = "live_message_tool_button local_delete_tool";
  delete_button.type = "button";
  delete_button.dataset.action = "hide_deleted_live_message";
  delete_button.dataset.message_id = message_id;
  delete_button.title = translate("live_message_delete_local");
  delete_button.setAttribute(
    "aria-label",
    translate("live_message_delete_local"),
  );
  delete_button.append(
    create_action_icon("delete"),
    create_action_label(translate("live_message_delete_local")),
  );

  tool_wrap.appendChild(delete_button);
  return tool_wrap;
}

function handle_live_message_action(event) {
  const action_button = event.target.closest("button[data-action]");

  if (!action_button) {
    return;
  }

  const message_id = action_button.dataset.message_id;

  if (action_button.dataset.action === "edit_live_message") {
    edit_live_message(message_id);
  }

  if (action_button.dataset.action === "delete_live_message") {
    delete_live_message(message_id);
  }

  if (action_button.dataset.action === "hide_deleted_live_message") {
    hide_deleted_message_locally(message_id);
  }
}

function handle_live_message_pointer_down(event) {
  const message_element = event.target.closest(".live_message_item");

  if (!message_element || event.target.closest("button, a, video, audio")) {
    return;
  }

  live_message_swipe_state = {
    message_id: message_element.dataset.messageId || "",
    start_x: event.clientX,
    start_y: event.clientY,
    dx: 0,
    dy: 0,
    message_element,
    engaged: false,
  };
}

function handle_live_message_pointer_move(event) {
  if (!live_message_swipe_state) {
    return;
  }

  live_message_swipe_state.dx =
    event.clientX - live_message_swipe_state.start_x;
  live_message_swipe_state.dy =
    event.clientY - live_message_swipe_state.start_y;

  if (
    Math.abs(live_message_swipe_state.dx) < 10 ||
    Math.abs(live_message_swipe_state.dy) > 28
  ) {
    return;
  }

  live_message_swipe_state.engaged = true;
  const translate_x = Math.max(
    -56,
    Math.min(56, live_message_swipe_state.dx * 0.45),
  );
  live_message_swipe_state.message_element.style.transform = `translateX(${translate_x}px)`;
}

function handle_live_message_pointer_up() {
  if (!live_message_swipe_state) {
    return;
  }

  const { message_id, dx, engaged, message_element } = live_message_swipe_state;
  message_element.style.transform = "";

  if (engaged && Math.abs(dx) >= 62) {
    const message_item = current_live_messages.find(
      (item) => item.id === message_id,
    );

    if (message_item && !is_deleted_live_message(message_item)) {
      set_pending_message_context(
        build_reply_context_from_message(message_item),
      );
      burst_reaction(dom_references.live_message_composer, "spark", 8);
      dom_references.live_message_input.focus();
      dom_references.live_message_composer.scrollIntoView({
        behavior: "smooth",
        block: "nearest",
      });
    }
  }

  live_message_swipe_state = null;
}

function handle_live_message_pointer_cancel() {
  if (!live_message_swipe_state) {
    return;
  }

  live_message_swipe_state.message_element.style.transform = "";
  live_message_swipe_state = null;
}

function get_message_sender_label(message_item, is_own_message) {
  if (is_own_message) {
    return translate("live_message_from_you");
  }

  if (message_item.sender_key === "svetlana") {
    return translate("live_message_from_svetlana");
  }

  return translate("live_message_from_diab");
}

function render_live_message_edit_note(message_item) {
  if (!message_item.edited_at || is_deleted_live_message(message_item)) {
    return null;
  }

  const edit_note = document.createElement("div");
  edit_note.className = "live_message_edit_note";
  edit_note.textContent = translate(
    "live_message_edited_at",
    format_message_time(message_item.edited_at),
  );
  edit_note.title = translate("live_message_edited");
  return edit_note;
}

function render_live_message_attachment(attachment) {
  const attachment_card = document.createElement("div");
  attachment_card.className = "live_message_attachment";
  const attachment_source =
    attachment.public_url || attachment.url || attachment.data_url || "";
  const attachment_name = document.createElement("strong");
  attachment_name.className = "live_message_attachment_name";
  attachment_name.textContent = attachment.name || "file";
  const attachment_meta = document.createElement("span");
  attachment_meta.className = "live_message_attachment_meta";
  attachment_meta.textContent = format_file_size(attachment.size || 0);

  if ((attachment.type || "").startsWith("image/") && attachment_source) {
    const image = document.createElement("img");
    image.src = attachment_source;
    image.alt = attachment.name || "attachment";
    attachment_card.appendChild(image);
  } else if (
    (attachment.type || "").startsWith("video/") &&
    attachment_source
  ) {
    const video = document.createElement("video");
    video.src = attachment_source;
    video.controls = true;
    attachment_card.appendChild(video);
  } else if (
    (attachment.type || "").startsWith("audio/") &&
    attachment_source
  ) {
    const audio = document.createElement("audio");
    audio.src = attachment_source;
    audio.controls = true;
    attachment_card.appendChild(audio);
  }

  const attachment_link = document.createElement("a");
  attachment_link.className = "live_message_attachment_link";
  attachment_link.href = attachment_source || "#";
  attachment_link.download = attachment.name || "file";
  attachment_link.target = "_blank";
  attachment_link.rel = "noopener";
  attachment_link.append(attachment_name, attachment_meta);
  attachment_card.appendChild(attachment_link);

  return attachment_card;
}

function format_file_size(size_in_bytes) {
  if (!size_in_bytes) {
    return "0 KB";
  }

  if (size_in_bytes < 1024 * 1024) {
    return `${Math.max(1, Math.round(size_in_bytes / 1024))} KB`;
  }

  return `${(size_in_bytes / (1024 * 1024)).toFixed(1)} MB`;
}

function format_message_time(date_value) {
  const date = new Date(date_value);
  return date.toLocaleString(translate("locale"), {
    hour: "2-digit",
    minute: "2-digit",
    month: "short",
    day: "numeric",
  });
}

function extract_message_segments_from_composer() {
  const segment_list = [];

  function walk_nodes(node_list) {
    node_list.forEach((node) => {
      if (node.nodeType === Node.TEXT_NODE) {
        segment_list.push({
          type: "text",
          text: node.textContent || "",
        });
        return;
      }

      if (node.nodeName === "BR") {
        segment_list.push({
          type: "text",
          text: "\n",
        });
        return;
      }

      if (node.nodeType !== Node.ELEMENT_NODE) {
        return;
      }

      const element = node;

      if (element.dataset.mention === "true") {
        segment_list.push({
          type: "mention",
          kind: "mention",
          reference_type: element.dataset.referenceType || "memory",
          reference_id: element.dataset.referenceId || "",
          title: element.dataset.title || "",
          subtitle: element.dataset.subtitle || "",
          text: element.dataset.text || "",
        });
        return;
      }

      walk_nodes([...element.childNodes]);

      if (["DIV", "P"].includes(element.nodeName)) {
        segment_list.push({
          type: "text",
          text: "\n",
        });
      }
    });
  }

  walk_nodes([...dom_references.live_message_input.childNodes]);
  return normalize_message_segments(segment_list);
}

function normalize_message_segments(segment_list) {
  const normalized_segments = [];

  segment_list.forEach((segment) => {
    if (segment.type === "text") {
      const text_value = segment.text || "";

      if (!text_value) {
        return;
      }

      const previous_segment =
        normalized_segments[normalized_segments.length - 1];

      if (previous_segment && previous_segment.type === "text") {
        previous_segment.text += text_value;
      } else {
        normalized_segments.push({
          type: "text",
          text: text_value,
        });
      }

      return;
    }

    normalized_segments.push(segment);
  });

  return normalized_segments;
}

function get_message_text_from_segments(segment_list) {
  return segment_list
    .map((segment) =>
      segment.type === "mention"
        ? `@${segment.title || ""}`
        : segment.text || "",
    )
    .join("");
}

function normalize_message_edit_payload(value) {
  return JSON.stringify(value || null);
}

function load_message_segments_into_composer(segment_list, fallback_text = "") {
  dom_references.live_message_input.innerHTML = "";
  const safe_segments =
    Array.isArray(segment_list) && segment_list.length > 0
      ? segment_list
      : [{ type: "text", text: fallback_text }];

  safe_segments.forEach((segment) => {
    if (segment.type === "mention") {
      dom_references.live_message_input.appendChild(
        create_composer_mention_chip(segment),
      );
      dom_references.live_message_input.appendChild(
        document.createTextNode(" "),
      );
      return;
    }

    dom_references.live_message_input.appendChild(
      document.createTextNode(segment.text || ""),
    );
  });

  place_caret_at_end(dom_references.live_message_input);
}

function auto_grow_live_message_input() {
  const input = dom_references.live_message_input;

  if (!input) {
    return;
  }

  input.style.height = "auto";
  input.style.height = `${Math.min(input.scrollHeight, 220)}px`;
}

function handle_live_message_files_selected() {
  if (editing_live_message_id) {
    dom_references.live_message_files_input.value = "";
    return;
  }

  selected_live_message_files = Array.from(
    dom_references.live_message_files_input.files || [],
  );
  update_live_message_file_preview();
}

function update_live_message_file_preview() {
  dom_references.live_message_files_preview.innerHTML = "";

  selected_live_message_files.forEach((file_item) => {
    const chip = document.createElement("span");
    chip.className = "live_message_file_chip";
    const name = document.createElement("strong");
    name.textContent = file_item.name;
    const meta = document.createElement("span");
    meta.textContent = `${format_file_size(file_item.size)} ${translate("live_message_files_selected")}`;
    chip.append(name, meta);
    dom_references.live_message_files_preview.appendChild(chip);
  });
}

function clear_live_message_composer() {
  mark_current_user_typing(false);
  editing_live_message_id = null;
  editing_live_message_has_attachments = false;
  selected_live_message_files = [];
  pending_message_context = null;
  dom_references.live_message_form.reset();
  dom_references.live_message_input.innerHTML = "";
  dom_references.live_message_composer.classList.remove("is_editing");
  dom_references.live_message_files_input.disabled = false;
  dom_references.live_message_files_label.classList.remove("is_disabled");
  dom_references.live_message_files_preview.innerHTML = "";
  update_live_message_action_labels();
  render_live_message_context_preview();
  hide_emoji_picker(false, false);
  hide_mention_search();
  auto_grow_live_message_input();
}

function start_live_message_edit(message_item) {
  clear_live_message_composer();
  editing_live_message_id = message_item.id;
  editing_live_message_has_attachments =
    Array.isArray(message_item.attachments) &&
    message_item.attachments.length > 0;
  dom_references.live_message_composer.classList.add("is_editing");
  dom_references.live_message_files_input.disabled = true;
  dom_references.live_message_files_label.classList.add("is_disabled");
  const structured_content = get_structured_content_attachment(
    message_item.attachments,
  );

  if (get_context_attachment(message_item.attachments)) {
    pending_message_context = get_context_attachment(message_item.attachments);
  }

  load_message_segments_into_composer(
    structured_content?.segments || [],
    message_item.text || "",
  );
  update_live_message_action_labels();
  render_live_message_context_preview();
  auto_grow_live_message_input();
  dom_references.live_message_input.focus();
  place_caret_at_end(dom_references.live_message_input);
  dom_references.live_message_composer.scrollIntoView({
    behavior: "smooth",
    block: "nearest",
  });
}

function handle_live_message_keydown(event) {
  if (!dom_references.mention_search_panel.classList.contains("hidden")) {
    if (event.key === "ArrowDown") {
      event.preventDefault();
      mention_search_active_index = Math.min(
        mention_search_results.length - 1,
        mention_search_active_index + 1,
      );
      render_mention_search_panel();
      return;
    }

    if (event.key === "ArrowUp") {
      event.preventDefault();
      mention_search_active_index = Math.max(
        0,
        mention_search_active_index - 1,
      );
      render_mention_search_panel();
      return;
    }

    if (
      event.key === "Enter" &&
      mention_search_results[mention_search_active_index]
    ) {
      event.preventDefault();
      insert_memory_mention(
        mention_search_results[mention_search_active_index],
      );
      return;
    }
  }

  if (event.key === "Enter" && !event.shiftKey) {
    event.preventDefault();
    dom_references.live_message_form.requestSubmit();
    return;
  }

  if (event.key === "Enter" && event.shiftKey) {
    event.preventDefault();
    insert_text_at_caret("\n");
    handle_message_input_change();
    return;
  }

  if (
    event.key === "Escape" &&
    !dom_references.mention_search_panel.classList.contains("hidden")
  ) {
    hide_mention_search();
    return;
  }

  if (event.key === "Escape" && editing_live_message_id) {
    clear_live_message_composer();
  }
}

async function edit_live_message(message_id) {
  const message_item = current_live_messages.find(
    (item) => item.id === message_id,
  );

  if (
    !message_item ||
    !current_user_profile ||
    message_item.sender_key !== current_user_profile.user_key
  ) {
    return;
  }

  start_live_message_edit(message_item);
}

async function delete_live_message(message_id) {
  const message_item = current_live_messages.find(
    (item) => item.id === message_id,
  );

  if (
    !message_item ||
    !current_user_profile ||
    message_item.sender_key !== current_user_profile.user_key
  ) {
    return;
  }

  const should_delete = await show_app_confirm(
    translate("live_message_delete_confirm"),
    {
      title: translate("app_confirm_title"),
      confirm_label: translate("delete"),
    },
  );

  if (!should_delete) {
    return;
  }

  const deleted_message = {
    ...message_item,
    text: deleted_live_message_marker,
    attachments: [],
    edited_at: new Date().toISOString(),
  };

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .update({
          text: deleted_live_message_marker,
          attachments: [],
          edited_at: deleted_message.edited_at,
        })
        .eq("id", message_id)
        .eq("room_slug", current_room_slug)
        .select()
        .single();

      if (error) {
        log_app_error("supabase_live_message_delete_failed", error);
        throw error;
      }

      if (editing_live_message_id === message_id) {
        clear_live_message_composer();
      }
      upsert_live_message(
        map_live_message_row_to_item(data || deleted_message),
        true,
      );
      return;
    } catch (error) {
      log_app_error("supabase_live_message_delete_threw", error);
      // Local fallback below remains available.
    }
  }

  try {
    const response = await fetch(
      `/api/live_messages/${encodeURIComponent(message_id)}`,
      {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json",
        },
        body: JSON.stringify({
          sender_key: current_user_profile.user_key,
          text: deleted_live_message_marker,
          attachments: [],
        }),
      },
    );

    if (response.ok) {
      const result = await response.json();
      if (editing_live_message_id === message_id) {
        clear_live_message_composer();
      }
      upsert_live_message(result.message || deleted_message, true);
      return;
    }
  } catch (error) {
    // The local update below still keeps the interface usable.
  }

  if (editing_live_message_id === message_id) {
    clear_live_message_composer();
  }
  upsert_live_message(deleted_message, true);
}

async function send_live_message(event) {
  event.preventDefault();

  if (!current_user_profile) {
    return;
  }

  const message_segments = extract_message_segments_from_composer();
  const message_text = get_message_text_from_segments(message_segments).trim();
  const files = [...selected_live_message_files];
  const is_editing_message = Boolean(editing_live_message_id);

  if (
    !message_text &&
    files.length === 0 &&
    !editing_live_message_has_attachments
  ) {
    return;
  }

  if (is_editing_message) {
    const message_item = current_live_messages.find(
      (item) => item.id === editing_live_message_id,
    );

    if (
      !message_item ||
      message_item.sender_key !== current_user_profile.user_key
    ) {
      clear_live_message_composer();
      return;
    }

    const updated_message = {
      ...message_item,
      text: message_text,
      attachments: [
        ...(pending_message_context ? [pending_message_context] : []),
        {
          kind: "structured_content",
          segments: message_segments,
        },
        ...get_file_attachments(message_item.attachments),
      ],
      edited_at: new Date().toISOString(),
    };
    const current_payload = normalize_message_edit_payload({
      text: String(message_item.text || "").trim(),
      attachments: Array.isArray(message_item.attachments)
        ? message_item.attachments
        : [],
    });
    const next_payload = normalize_message_edit_payload({
      text: message_text,
      attachments: updated_message.attachments,
    });

    if (current_payload === next_payload) {
      clear_live_message_composer();
      return;
    }

    dom_references.send_live_message_button.disabled = true;

    try {
      if (is_supabase_enabled() && current_auth_user_id) {
        const { data, error } = await supabase_client
          .from(supabase_table_names.live_messages)
          .update({
            text: message_text,
            attachments: updated_message.attachments,
            edited_at: updated_message.edited_at,
          })
          .eq("id", editing_live_message_id)
          .eq("room_slug", current_room_slug)
          .select()
          .single();

        if (error) {
          log_app_error("supabase_live_message_update_failed", error);
          throw error;
        }

        upsert_live_message(map_live_message_row_to_item(data), true);
        clear_live_message_composer();
        burst_reaction(dom_references.live_messages_list, "spark", 8);
        return;
      }

      const response = await fetch(
        `/api/live_messages/${encodeURIComponent(editing_live_message_id)}`,
        {
          method: "PATCH",
          headers: {
            "Content-Type": "application/json",
          },
          body: JSON.stringify({
            sender_key: current_user_profile.user_key,
            text: message_text,
            attachments: updated_message.attachments,
          }),
        },
      );

      if (!response.ok) {
        throw new Error("message_update_failed");
      }

      const result = await response.json();
      upsert_live_message(result.message || updated_message, true);
      clear_live_message_composer();
      burst_reaction(dom_references.live_messages_list, "spark", 8);
    } catch (error) {
      log_app_error("supabase_live_message_update_threw", error);
      upsert_live_message(updated_message, true);
      clear_live_message_composer();
      window.console.error(translate("live_message_send_error"));
    } finally {
      dom_references.send_live_message_button.disabled = false;
    }

    return;
  }

  const file_attachments = await Promise.all(
    files.map(read_file_as_attachment),
  );
  const attachments = [
    ...(pending_message_context ? [pending_message_context] : []),
    {
      kind: "structured_content",
      segments: message_segments,
    },
    ...file_attachments,
  ];
  const message_item = {
    id: create_item_id(),
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: message_text,
    created_at: new Date().toISOString(),
    edited_at: null,
    attachments,
  };

  dom_references.send_live_message_button.disabled = true;

  try {
    if (is_supabase_enabled() && current_auth_user_id) {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .insert(message_item)
        .select()
        .single();

      if (error) {
        log_app_error("supabase_live_message_insert_failed", error);
        throw error;
      }

      upsert_live_message(map_live_message_row_to_item(data), true);
      play_send_message_sound();
      clear_live_message_composer();
      burst_reaction(dom_references.live_messages_list, "heart", 8);
      return;
    }

    const response = await fetch("/api/live_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json",
      },
      body: JSON.stringify(message_item),
    });

    if (!response.ok) {
      throw new Error("message_send_failed");
    }

    const result = await response.json();
    upsert_live_message(result.message || message_item, true);
    play_send_message_sound();
    clear_live_message_composer();
    burst_reaction(dom_references.live_messages_list, "heart", 8);
  } catch (error) {
    log_app_error("supabase_live_message_insert_threw", error);
    upsert_live_message(message_item, true);
    clear_live_message_composer();
    window.console.error(translate("live_message_send_error"));
  } finally {
    dom_references.send_live_message_button.disabled = false;
  }
}

async function read_file_as_attachment(file_item) {
  const uploaded_file = await upload_file_to_supabase_media(
    file_item,
    "shared-files",
  );

  if (uploaded_file?.public_url) {
    void announce_shared_activity(
      "file",
      translate("shared_activity_file"),
      file_item.name || "file",
    );
    return {
      kind: "file",
      name: file_item.name,
      type: file_item.type || "application/octet-stream",
      size: file_item.size || 0,
      bucket: uploaded_file.bucket,
      storage_path: uploaded_file.storage_path,
      public_url: uploaded_file.public_url,
      data_url: "",
    };
  }

  return {
    kind: "file",
    name: file_item.name,
    type: file_item.type || "application/octet-stream",
    size: file_item.size || 0,
    data_url: await read_file_as_data_url(file_item),
  };
}

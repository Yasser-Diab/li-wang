const allowed_users = {
  svetlana: {
    user_key: "svetlana",
    display_name: "Svetlana",
    password: "Wolf&Luna"
  },
  diab: {
    user_key: "diab",
    display_name: "Diab",
    password: "Wolf&Luna"
  }
};

const relationship_start_date = "2025-01-18";
const diab_birthdate = "2000-03-23";
const svetlana_birthdate = "1991-08-29";
const hidden_deleted_message_storage_prefix = "sveta_hidden_deleted_messages";
const memory_storage_key = "svetlana_diab_memories";
const event_storage_key = "svetlana_diab_events";
const theme_storage_key = "svetlana_diab_theme";
const language_storage_key = "svetlana_diab_language";
const supabase_room_slug_default = "svetlana-diab";
const supabase_table_names = {
  profiles: "app_profiles",
  memories: "app_memories",
  events: "app_events",
  live_messages: "app_live_messages"
};

const language_cycle = ["en", "de", "ar"];
const language_config = {
  en: {
    label: "EN",
    flag_path: "assets/flags/us.svg",
    alt: "English"
  },
  de: {
    label: "DE",
    flag_path: "assets/flags/de.svg",
    alt: "Deutsch"
  },
  ar: {
    label: "AR",
    flag_path: "assets/flags/eg.svg",
    alt: "العربية"
  }
};

const heart_emoji = "\u2764\uFE0F";
const kiss_heart_emoji = "\u{1F618}\u2764\uFE0F";
const deleted_live_message_marker = "__SVETA_APP_DELETED__";

const fallback_daily_joy_messages = [
  "Today feels like one of those days when coffee tries its best, but one good laugh still does the real work.",
  "Tiny prank idea: send one dramatic message saying, 'We need to talk.' Then confess that the topic is how unfairly beautiful life feels when she is in it.",
  "A quiet emergency has been reported: one adult tried to stay serious all morning and then lost completely to one soft memory."
];

const fallback_daily_joy_messages_de = [
  "Heute ist so ein Tag, an dem der Kaffee alles versucht, aber ein einziges echtes Lachen trotzdem die bessere Arbeit macht.",
  "Kleine Streichidee: Schreib ganz dramatisch, 'Wir müssen reden.' Und gesteh dann, dass es nur darum geht, wie unfair schön das Leben mit ihr darin ist.",
  "Es wurde ein leiser Notfall gemeldet: Ein erwachsener Mensch wollte den ganzen Morgen ernst bleiben und verlor dann komplett gegen eine einzige sanfte Erinnerung."
];

const fallback_daily_joy_messages_ar = [
  "يبدو أن اليوم من تلك الأيام التي يحاول فيها القهوة أن تنقذ الموقف، لكن ضحكة واحدة جميلة تقوم بالمهمة الحقيقية.",
  "فكرة مقلب صغيرة: أرسل رسالة درامية تقول فيها: نحتاج أن نتحدث. ثم اعترف أن الموضوع فقط هو كم تصبح الحياة أجمل حين تكون هي فيها.",
  "تم تسجيل حالة طوارئ هادئة: شخص بالغ حاول أن يبقى جاداً طوال الصباح، ثم خسر المعركة أمام ذكرى لطيفة واحدة."
];

const fallback_daily_love_messages = [
  `Svetlana, you are not only the love in my heart. You are also my closest friend, my quiet, and the person who makes life feel more worth living every single day. ${heart_emoji}`,
  `There are people you care about, and then there is the one who becomes home to your soul. For me, that will always be you. ${heart_emoji}`,
  `If I ever sound too full when I speak to you, it is only because my heart has never learned how to love you in small amounts. ${heart_emoji}`
];

const fallback_daily_love_messages_de = [
  `Svetlana, du bist nicht nur die Liebe in meinem Herzen. Du bist auch meine beste Freundin, meine Ruhe und der Mensch, der das Leben jeden Tag lebenswerter macht. ${heart_emoji}`,
  `Es gibt Menschen, die man liebt, und dann gibt es den einen Menschen, der zur Heimat der Seele wird. Für mich wirst das immer du sein. ${heart_emoji}`,
  `Wenn ich bei dir manchmal zu voll klinge, dann nur deshalb, weil mein Herz nie gelernt hat, dich in kleinen Mengen zu lieben. ${heart_emoji}`
];

const fallback_daily_love_messages_ar = [
  `سفيتلانا، أنتِ لستِ فقط الحب في قلبي، أنتِ أيضاً أقرب صديقة لي، وراحتي، والشخص الذي يجعل الحياة أجمل كل يوم. ${heart_emoji}`,
  `هناك أشخاص نحبهم، ثم هناك الشخص الذي يصبح وطناً للروح. بالنسبة لي، ستكونين أنتِ دائماً ذلك الوطن. ${heart_emoji}`,
  `إذا بدا كلامي معكِ ممتلئاً أكثر من اللازم، فذلك فقط لأن قلبي لم يتعلم أبداً كيف يحبكِ بنصف شعور. ${heart_emoji}`
];

const fallback_morning_messages = [
  "Good morning, my beautiful queen Svetlana.\nIt is me, your Diab.\nI wanted your day to begin with warmth, not noise, and with love, not pressure.\nWalk into today knowing that you are deeply valued, deeply admired, and deeply loved by me.\nPlease take care of yourself today, eat well, drink enough, and be gentle with your heart.\nI hope today meets you with ease and leaves you smiling.",
  "Good morning, my angel.\nBefore the day gets busy, I want you to remember one simple truth: you matter to me more than I can ever fully explain.\nI hope your steps are light today, your luck is kind, and your heart finds small beautiful moments everywhere.\nTake care of yourself for me, my precious girl."
];

const fallback_morning_messages_de = [
  "Guten Morgen, meine wunderschöne Königin Svetlana.\nHier ist dein Diab.\nIch wollte, dass dein Tag mit Wärme beginnt, nicht mit Lärm, und mit Liebe, nicht mit Druck.\nGeh in diesen Tag mit dem Wissen, dass du von mir tief geschätzt, tief bewundert und tief geliebt wirst.\nBitte pass heute gut auf dich auf, iss ordentlich, trink genug und sei sanft zu deinem Herzen.\nIch hoffe, heute begegnet dir alles freundlich und schenkt dir ein echtes Lächeln.",
  "Guten Morgen, mein Engel.\nBevor der Tag hektisch wird, möchte ich, dass du eine einfache Wahrheit behältst: Du bedeutest mir mehr, als ich je ganz erklären könnte.\nIch hoffe, deine Schritte sind heute leicht, dein Glück ist freundlich, und dein Herz findet überall kleine schöne Momente.\nPass gut auf dich auf, meine Kostbare."
];

const fallback_morning_messages_ar = [
  "صباح الخير يا ملكتي الجميلة سفيتلانا.\nإنه أنا، ديابك.\nأردت أن يبدأ يومكِ بدفء لا بضجيج، وبحب لا بضغط.\nادخلي يومكِ وأنتِ تعرفين أنكِ ثمينة عندي جداً، ومحل إعجاب كبير، ومحبوبة بعمق.\nأرجوكِ اعتني بنفسكِ اليوم، كلي جيداً، واشربي ما يكفي، وكوني لطيفة مع قلبكِ.\nأتمنى أن يلقاكِ اليوم بلطف ويترك فيكِ ابتسامة حقيقية.",
  "صباح الخير يا ملاكي.\nقبل أن ينشغل اليوم، أريدكِ أن تتذكري حقيقة بسيطة: أنتِ تعنين لي أكثر مما أستطيع وصفه بالكامل.\nأتمنى أن تكون خطواتكِ اليوم خفيفة، وحظكِ لطيفاً، وأن يجد قلبكِ لحظات جميلة صغيرة في كل مكان.\nاعتني بنفسكِ من أجلي يا أغلى ما عندي."
];

const fallback_night_messages = [
  `Good night, my star Svetlana.\nI hope this night holds you softly and gives you the calm rest your heart deserves.\nIf I could be there, I would stay close, hold you gently, kiss your cheeks, and wait with you until sleep became peaceful.\nSleep in peace, my love. ${kiss_heart_emoji}`,
  `Good night, my beautiful queen.\nMaybe I say too much sometimes, but that is only because I feel too much when it comes to you.\nClose your eyes and imagine me there, near you, watching over your peace and making sure nothing disturbs your dreams.\nSweet dreams, my angel. ${kiss_heart_emoji}`
];

const fallback_night_messages_de = [
  `Gute Nacht, mein Stern Svetlana.\nIch hoffe, diese Nacht hält dich sanft und schenkt dir die ruhige Erholung, die dein Herz verdient.\nWenn ich bei dir sein könnte, würde ich nah bleiben, dich vorsichtig halten, deine Wangen küssen und bei dir warten, bis der Schlaf friedlich wird.\nSchlaf in Frieden, meine Liebe. ${kiss_heart_emoji}`,
  `Gute Nacht, meine wunderschöne Königin.\nVielleicht sage ich manchmal zu viel, aber nur, weil ich bei dir zu viel fühle, um still zu bleiben.\nSchließ deine Augen und stell dir vor, ich wäre bei dir, ganz nah, und würde über deinen Frieden wachen, damit nichts deine Träume stört.\nSüße Träume, mein Engel. ${kiss_heart_emoji}`
];

const fallback_night_messages_ar = [
  `تصبحين على خير يا نجمتي سفيتلانا.\nأتمنى أن تحتويكِ هذه الليلة بلطف، وأن تمنحكِ الراحة الهادئة التي يستحقها قلبكِ.\nلو كنتُ بقربكِ الآن، لبقيت قريباً، أضمكِ برفق، وأقبل خديكِ، وأنتظر معكِ حتى يصبح النوم سلاماً.\nنامي بسلام يا حبيبتي. ${kiss_heart_emoji}`,
  `تصبحين على خير يا ملكتي الجميلة.\nربما أقول الكثير أحياناً، لكن هذا فقط لأنني أشعر بالكثير حين يتعلق الأمر بكِ.\nأغلقي عينيكِ وتخيلي أنني هناك قربكِ، أحرس راحتكِ وأتأكد أن لا شيء يزعج أحلامكِ.\nأحلاماً سعيدة يا ملاكي. ${kiss_heart_emoji}`
];

const fallback_night_tales = [
  "Once upon a time, in a street where every house slept early, there lived a tailor who could fix any torn coat but could never mend his own missing buttons. One night he met a pianist who played beautifully but always started one note too late. They became friends at once, because each one made the other laugh before either could feel embarrassed. From then on, the coats looked better, the songs began on time, and the whole street learned that being gently understood can feel like magic.",
  "Once upon a time, a bookseller had a sign that read, 'Closed for five minutes,' but everyone knew those five minutes often lasted an hour. One evening a woman walked in, pointed to the sign, and said, 'I came to see whether time behaves better indoors.' The bookseller laughed so hard he forgot to be shy, and they spent the rest of the night discussing the difference between lateness and style. By midnight, even the clock seemed less strict."
];

const fallback_night_tales_de = [
  "Es war einmal in einer Straße, in der jedes Haus früh einschlief, ein Schneider, der jeden zerrissenen Mantel retten konnte, aber nie seine eigenen fehlenden Knöpfe fand. Eines Abends traf er eine Pianistin, die wunderschön spielte, aber immer genau einen Ton zu spät begann. Sie wurden sofort Freunde, weil jeder den anderen zum Lachen brachte, bevor einer sich schämen konnte. Von da an sahen die Mäntel besser aus, die Lieder begannen pünktlich, und die ganze Straße lernte, dass sanft verstanden zu werden etwas Magisches hat.",
  "Es war einmal ein Buchhändler mit einem Schild, auf dem stand: 'Für fünf Minuten geschlossen', obwohl jeder wusste, dass diese fünf Minuten oft eine ganze Stunde dauerten. Eines Abends kam eine Frau herein, zeigte auf das Schild und sagte: 'Ich wollte sehen, ob die Zeit sich drinnen besser benimmt.' Der Buchhändler lachte so sehr, dass er vergaß, schüchtern zu sein, und sie verbrachten den Rest der Nacht damit, über den Unterschied zwischen Verspätung und Stil zu sprechen. Gegen Mitternacht war selbst die Uhr milder geworden."
];

const fallback_night_tales_ar = [
  "كان يا ما كان، في شارع تنام فيه البيوت مبكراً، خياط يستطيع إصلاح أي معطف ممزق، لكنه لا يجد أبداً أزرار معطفه هو. وفي ليلة هادئة، التقى بعازفة بيانو تعزف بجمال، لكنها تبدأ دائماً بعد الموعد بنغمة واحدة. صارا صديقين فوراً، لأن كل واحد منهما كان يجعل الآخر يضحك قبل أن يشعر بالحرج. ومنذ ذلك اليوم بدت المعاطف أجمل، وبدأت الألحان في وقتها، وتعلم الشارع كله أن من يفهمك بلطف يشبه السحر.",
  "كان يا ما كان، بائع كتب يضع على بابه لافتة تقول: 'مغلق لخمس دقائق'، بينما يعرف الجميع أن تلك الدقائق الخمس قد تصبح ساعة كاملة. وفي مساء لطيف دخلت امرأة، أشارت إلى اللافتة، وقالت: 'جئت لأرى إن كان الوقت يتصرف بشكل أفضل في الداخل.' ضحك بائع الكتب حتى نسي أن يكون خجولاً، وقضيا بقية الليل يتحدثان عن الفرق بين التأخر والأناقة. وحتى الساعة عند منتصف الليل بدت أقل صرامة."
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
    login_email_hint_empty: "The reset email will appear here once the name is known.",
    login_email_hint: (email) => `Reset email: ${email}`,
    forgot_password_button: "Forgot password?",
    forgot_password_username_missing: "Write the same name first so I know which email should receive the reset link.",
    forgot_password_sent_generic: "The reset email was sent.",
    forgot_password_sent: (email) => `A reset email was sent to ${email}.`,
    forgot_password_error: "The reset email could not be sent right now.",
    login_button: "Enter our world",
    login_error: "This little world opens only with the right name and secret word.",
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
    hero_message_svetlana: "This little world is here to greet you softly, hold your memories, and give you a warm smile whenever you open it.",
    hero_message_diab: "A private home for the woman you love, the memories you keep, and the life you are building together.",
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
    diab_birthday_message: (days) => `${days} days until the next happy birthday I'll have while you're in my life.`,
    svetlana_birthday_message: (days) => `${days} days until Svetlana's next beautiful birthday.`,
    gallery_eyebrow: "photos and smiles",
    gallery_heading: "Memory Gallery",
    add_memory: "Add a memory",
    events_eyebrow: "our little forever",
    events_heading: "Beautiful Days",
    add_event: "Add a day",
    live_messages_eyebrow: "just us, in real time",
    live_messages_heading: "Live Messages",
    live_messages_empty: "Your private chat will appear here.",
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
    password_recovery_copy: "The reset link is ready. Set a new secret word here.",
    new_password_label: "New password",
    confirm_password_label: "Confirm password",
    new_password_placeholder: "New secret word",
    confirm_password_placeholder: "Write it again",
    password_recovery_save: "Save new password",
    password_recovery_mismatch: "The two password lines need to match.",
    password_recovery_success: "Your password is updated. You can sign in with the new secret word now.",
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
    image_replace_hint: "Choose a new picture only if you want to replace the current one.",
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
    default_memory_two_note: "A place for a picture, a sentence, and the feeling around it.",
    default_memory_three_title: "The next favorite moment",
    default_memory_three_date: "Soon, naturally",
    default_memory_three_note: "Ready whenever a day becomes too sweet to forget.",
    first_event_date: "January 18, 2025",
    first_event_title: "The day we found each other",
    first_event_description: "The beginning of something rare and beautiful.",
    years: ["year", "years"],
    months: ["month", "months"],
    days: ["day", "days"],
    greetings: {
      svetlana: {
        morning: ["Good morning, my angel Svetlana", "Guten Morgen, mein Engel Svetlana"],
        afternoon: ["Good afternoon, my angel Svetlana", "I hope your day is treating you gently."],
        evening: ["Good evening, my angel Svetlana", "May the rest of your day feel soft and kind."],
        night: ["Good night, my angel Svetlana", "May your heart feel safe and loved tonight."]
      },
      diab: {
        morning: ["Good morning, Diab", "A new day in your little world with Svetlana."],
        afternoon: ["Good afternoon, Diab", "Keep the warmth alive today."],
        evening: ["Good evening, Diab", "The quiet part of the day belongs here too."],
        night: ["Good night, Diab", "Another day held close in the heart."]
      }
    }
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
    login_email_hint_empty: "Die Reset-E-Mail erscheint hier, sobald der Name bekannt ist.",
    login_email_hint: (email) => `Reset-E-Mail: ${email}`,
    forgot_password_button: "Passwort vergessen?",
    forgot_password_username_missing: "Schreib zuerst denselben Namen, damit ich weiß, an welche E-Mail der Reset-Link gehen soll.",
    forgot_password_sent_generic: "Die Reset-E-Mail wurde gesendet.",
    forgot_password_sent: (email) => `Eine Reset-E-Mail wurde an ${email} gesendet.`,
    forgot_password_error: "Die Reset-E-Mail konnte gerade nicht gesendet werden.",
    login_button: "Unsere Welt betreten",
    login_error: "Diese kleine Welt öffnet sich nur mit dem richtigen Namen und Geheimwort.",
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
    hero_message_svetlana: "Diese kleine Welt ist da, um dich sanft zu begrüßen, eure Erinnerungen zu bewahren und dir jedes Mal ein warmes Lächeln zu schenken.",
    hero_message_diab: "Ein privates Zuhause für die Frau, die du liebst, für eure Erinnerungen und für das Leben, das ihr zusammen baut.",
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
    diab_birthday_message: (days) => `${days} Tage bis zum nächsten glücklichen Geburtstag, den ich haben werde, während du in meinem Leben bist.`,
    svetlana_birthday_message: (days) => `${days} Tage bis zu Svetlanas nächstem wunderschönen Geburtstag.`,
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
    live_message_send_error: "Die Nachricht konnte gerade nicht gesendet werden.",
    live_message_edit_prompt: "Bearbeite deine Nachricht",
    live_message_delete_confirm: "Diese Nachricht löschen?",
    made_with_love: "Mit Liebe gemacht von Diab",
    love_note_eyebrow: "aus Diabs Herz",
    morning_message_heading: "dein Morgen von Diab",
    night_message_heading: "für deine Nacht, meine Liebe",
    password_recovery_title: "Wähle ein neues Geheimwort",
    password_recovery_copy: "Der Reset-Link ist bereit. Lege hier ein neues Geheimwort fest.",
    new_password_label: "Neues Passwort",
    confirm_password_label: "Passwort bestätigen",
    new_password_placeholder: "Neues Geheimwort",
    confirm_password_placeholder: "Noch einmal schreiben",
    password_recovery_save: "Neues Passwort speichern",
    password_recovery_mismatch: "Beide Passwortfelder müssen gleich sein.",
    password_recovery_success: "Dein Passwort wurde aktualisiert. Du kannst dich jetzt mit dem neuen Geheimwort anmelden.",
    password_recovery_error: "Das Passwort konnte gerade nicht aktualisiert werden.",
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
    image_replace_hint: "Wähle nur dann ein neues Bild, wenn du das aktuelle ersetzen möchtest.",
    edit: "Bearbeiten",
    delete: "Löschen",
    close_dialog_label: "Schließen",
    delete_memory_confirm: "Diese Erinnerung löschen?",
    delete_event_confirm: "Diesen Tag löschen?",
    fallback_memory_date: "Ein Tag zum Behalten",
    fallback_event_date: "Ein schöner Tag",
    default_memory_one_title: "Der erste goldene Rahmen",
    default_memory_one_date: "Wartet auf ein Lächeln",
    default_memory_one_note: "Das erste Foto, das ihr hinzufügt, wird hier leben.",
    default_memory_two_title: "Eine sanfte kleine Erinnerung",
    default_memory_two_date: "Jeder schöne Tag",
    default_memory_two_note: "Ein Platz für ein Bild, einen Satz und das Gefühl darum herum.",
    default_memory_three_title: "Der nächste Lieblingsmoment",
    default_memory_three_date: "Bald, ganz natürlich",
    default_memory_three_note: "Bereit, sobald ein Tag zu süß wird, um ihn zu vergessen.",
    first_event_date: "18. Januar 2025",
    first_event_title: "Der Tag, an dem wir uns gefunden haben",
    first_event_description: "Der Anfang von etwas Seltenem und Wunderschönem.",
    years: ["Jahr", "Jahre"],
    months: ["Monat", "Monate"],
    days: ["Tag", "Tage"],
    greetings: {
      svetlana: {
        morning: ["Guten Morgen, mein Engel Svetlana", "Heute beginnt sanft nur für dich."],
        afternoon: ["Guten Tag, mein Engel Svetlana", "Ich hoffe, dein Tag fühlt sich weich und schön an."],
        evening: ["Guten Abend, mein Engel Svetlana", "Der Abend darf jetzt ein wenig leichter werden."],
        night: ["Gute Nacht, mein Engel Svetlana", "Möge dein Herz heute Nacht ruhig und geliebt schlafen."]
      },
      diab: {
        morning: ["Guten Morgen, Diab", "Ein neuer Tag in eurer kleinen Welt."],
        afternoon: ["Guten Tag, Diab", "Bewahre die Wärme gut auf."],
        evening: ["Guten Abend, Diab", "Die ruhigeren Stunden gehören auch hierher."],
        night: ["Gute Nacht, Diab", "Ein weiterer Tag bleibt nah am Herzen."]
      }
    }
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
    login_email_hint_empty: "سيظهر بريد إعادة التعيين هنا حين يصبح الاسم معروفًا.",
    login_email_hint: (email) => `بريد إعادة التعيين: ${email}`,
    forgot_password_button: "نسيت كلمة السر؟",
    forgot_password_username_missing: "اكتب الاسم نفسه أولًا حتى أعرف إلى أي بريد يجب أن يذهب رابط إعادة التعيين.",
    forgot_password_sent_generic: "تم إرسال رسالة إعادة التعيين.",
    forgot_password_sent: (email) => `تم إرسال رسالة إعادة التعيين إلى ${email}.`,
    forgot_password_error: "تعذر إرسال رسالة إعادة التعيين الآن.",
    login_button: "ادخل عالمنا",
    login_error: "هذا العالم الصغير لا يفتح إلا بالاسم الصحيح والكلمة السرية الصحيحة.",
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
    hero_message_svetlana: "هذا العالم الصغير هنا ليحييكِ بلطف، ويحفظ ذكرياتكما، ويمنحكِ ابتسامة دافئة كلما فتحتيه.",
    hero_message_diab: "بيت خاص للمرأة التي تحبها، وللذكريات التي تحفظها، وللحياة التي تبنيانها معاً.",
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
    diab_birthday_message: (days) => `${days} يوماً حتى عيد الميلاد السعيد القادم الذي سأعيشه وأنتِ في حياتي.`,
    svetlana_birthday_message: (days) => `${days} يوماً حتى عيد ميلاد سفيتلانا الجميل القادم.`,
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
    password_recovery_success: "تم تحديث كلمة السر. يمكنك تسجيل الدخول الآن بالكلمة الجديدة.",
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
        afternoon: ["مساء الخير يا ملاكي سفيتلانا", "أتمنى أن يكون يومكِ هادئاً وجميلاً."],
        evening: ["مساء الخير يا ملاكي سفيتلانا", "ليصبح ما تبقى من اليوم أخف وأجمل."],
        night: ["تصبحين على خير يا ملاكي سفيتلانا", "ليَنَم قلبكِ الليلة بسلام ومحبة."]
      },
      diab: {
        morning: ["صباح الخير يا دياب", "يوم جديد في عالمكما الصغير."],
        afternoon: ["مساء الخير يا دياب", "احتفظ بالدفء قريباً من قلبك."],
        evening: ["مساء الخير يا دياب", "حتى ساعات الهدوء لها مكان هنا."],
        night: ["تصبح على خير يا دياب", "يوم آخر بقي قريباً من القلب."]
      }
    }
  }
};

function get_default_memory_gallery_items() {
  return [
    {
      id: "memory_placeholder_one",
      is_placeholder: true,
      title: translate("default_memory_one_title"),
      date_label: translate("default_memory_one_date"),
      note: translate("default_memory_one_note"),
      image_data: ""
    },
    {
      id: "memory_placeholder_two",
      is_placeholder: true,
      title: translate("default_memory_two_title"),
      date_label: translate("default_memory_two_date"),
      note: translate("default_memory_two_note"),
      image_data: ""
    },
    {
      id: "memory_placeholder_three",
      is_placeholder: true,
      title: translate("default_memory_three_title"),
      date_label: translate("default_memory_three_date"),
      note: translate("default_memory_three_note"),
      image_data: ""
    }
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
      description: translate("first_event_description")
    }
  ];
}

const dom_references = {};
let current_user_profile = null;
let current_language = "en";
let daily_joy_messages_by_language = {
  en: fallback_daily_joy_messages,
  de: fallback_daily_joy_messages_de,
  ar: fallback_daily_joy_messages_ar
};
let daily_love_messages_by_language = {
  en: fallback_daily_love_messages,
  de: fallback_daily_love_messages_de,
  ar: fallback_daily_love_messages_ar
};
let morning_messages_by_language = {
  en: fallback_morning_messages,
  de: fallback_morning_messages_de,
  ar: fallback_morning_messages_ar
};
let night_messages_by_language = {
  en: fallback_night_messages,
  de: fallback_night_messages_de,
  ar: fallback_night_messages_ar
};
let night_tales_by_language = {
  en: fallback_night_tales,
  de: fallback_night_tales_de,
  ar: fallback_night_tales_ar
};
let current_memory_items = [];
let current_event_items = [];
let current_live_messages = [];
let selected_live_message_files = [];
let editing_memory_id = null;
let editing_event_id = null;
let editing_live_message_id = null;
let editing_live_message_has_attachments = false;
let editing_memory_image_data = "";
let hidden_deleted_message_ids = [];
let welcome_audio_context = null;
let time_sensitive_interval_id = null;
let live_message_stream = null;
let live_message_poll_id = null;
let heart_shower_interval_id = null;
let heart_shower_timeout_id = null;
let hero_message_timer_id = null;
let hero_message_cleanup_id = null;
let supabase_client = null;
let supabase_auth_subscription = null;
let current_room_slug = supabase_room_slug_default;
let current_auth_user_id = "";
let password_recovery_mode_active = false;
const flow_animation_state = {};
const quick_emoji_source = `
Smileys & Emotion
😀 😃 😄 😁 😆 😅 😂 🤣 🥲 🥹 ☺️ 😊 😇 🙂 🙃 😉 😌 😍 🥰 😘 😗 😙 😚 😋 😛 😝 😜 🤪 🤨 🧐 🤓 😎 🥸 🤩 🥳 😏 😒 😞 😔 😟 😕 🙁 ☹️ 😣 😖 😫 😩 🥺 😢 😭 😮‍💨 😤 😠 😡 🤬 🤯 😳 🥵 🥶 😱 😨 😰 😥 😓 🫣 🤗 🫡 🤔 🫢 🤭 🤫 🤥 😶 😶‍🌫️ 😐 😑 😬 🫨 🫠 🙄 😯 😦 😧 😮 😲 🥱 😴 🤤 😪 😵 😵‍💫 🤐 🥴 🤢 🤮 🤧 😷 🤒 🤕 🤑 🤠 😈 👿 👹 👺 🤡 💩 👻 💀 ☠️ 👽 👾 🤖 🎃 😺 😸 😹 😻 😼 😽 🙀 😿 😾

People & Body
👋 🤚 🖐 ✋ 🖖 🫱 🫲 🫳 🫴 🫷 🫸 👌 🤌 🤏 ✌️ 🤞 🫰 🤟 🤘 🤙 👈 👉 👆 🖕 👇 ☝️ 👍 👎 ✊ 👊 🤛 🤜 👏 🙌 🫶 👐 🤲 🤝 🙏 ✍️ 💅 🤳 💪 🦾 🦿 🦵 🦶 👂 🦻 👃 🧠 🫀 🫁 🦷 🦴 👀 👁 👅 👄 🫦 💋 🩸

Animals & Nature
🐶 🐱 🐭 🐹 🐰 🦊 🐻 🐼 🐻‍❄️ 🐨 🐯 🦁 🐮 🐷 🐽 🐸 🐵 🙈 🙉 🙊 🐒 🐔 🐧 🐦 🐤 🐣 🐥 🦆 🦅 🦉 🦇 🐺 🐗 🐴 🦄 🐝 🪱 🐛 🦋 🐌 🐞 🐜 🪰 🪲 🪳 🦟 🦗 🕷 🕸 🦂 🐢 🐍 🦎 🦖 🦕 🐙 🦑 🦐 🦞 🦀 🐡 🐠 🐟 🐬 🐳 🐋 🦈 🐊 🐅 🐆 🦓 🦍 🦧 🦣 🐘 🦛 🦏 🐪 🐫 🦒 🦘 🦬 🐃 🐂 🐄 🐎 🐖 🐏 🐑 🦙 🐐 🦌 🐕 🐩 🦮 🐕‍🦺 🐈 🐈‍⬛ 🪶 🐓 🦃 🦤 🦚 🦜 🦢 🦩 🕊 🐇 🦝 🦨 🦡 🦫 🦦 🦥 🐁 🐀 🐿 🦔 🐾 🐉 🐲 🌵 🎄 🌲 🌳 🌴 🪵 🌱 🌿 ☘️ 🍀 🎍 🪴 🎋 🍃 🍂 🍁 🍄 🐚 🪨 🌾 💐 🌷 🌹 🥀 🌺 🌸 🌼 🌻 🌞 🌝 🌛 🌜 🌚 🌕 🌖 🌗 🌘 🌑 🌒 🌓 🌔 🌙 🌎 🌍 🌏 🪐 💫 ⭐️ 🌟 ✨ ⚡️ ☄️ 💥 🔥 🌪 🌈 ☀️ 🌤 ⛅️ 🌥 ☁️ 🌦 🌧 ⛈ 🌩 🌨 ❄️ ☃️ ⛄️ 🌬 💨 💧 💦 ☔️ ☂️ 🌊 🌫

Food & Drink
🍏 🍎 🍐 🍊 🍋 🍌 🍉 🍇 🍓 🫐 🍈 🍒 🍑 🥭 🍍 🥥 🥝 🍅 🍆 🥑 🥦 🥬 🥒 🌶 🫑 🌽 🥕 🫒 🧄 🧅 🥔 🍠 🥐 🥯 🍞 🥖 🥨 🧀 🥚 🍳 🧈 🥞 🧇 🥓 🥩 🍗 🍖 🦴 🌭 🍔 🍟 🍕 🫓 🥪 🥙 🧆 🌮 🌯 🫔 🥗 🥘 🫕 🥫 🍝 🍜 🍲 🍛 🍣 🍱 🥟 🦪 🍤 🍙 🍚 🍘 🍥 🥠 🥮 🍢 🍡 🍧 🍨 🍦 🥧 🧁 🍰 🎂 🍮 🍭 🍬 🍫 🍿 🍩 🍪 🌰 🥜 🍯 🥛 🍼 🫖 ☕️ 🍵 🧃 🥤 🧋 🍶 🍺 🍻 🥂 🍷 🥃 🍸 🍹 🧉 🍾 🧊 🥄 🍴 🍽 🥣 🥡 🥢 🧂

Objects & Symbols
⌚️ 📱 📲 💻 ⌨️ 🖥 🖨 🖱 🖲 🕹 🗜 💽 💾 💿 📀 📼 📷 📸 📹 🎥 📽 🎞 📞 ☎️ 📟 📠 📺 📻 🎙 🎚 🎛 🧭 ⏱ ⏲ ⏰ 🕰 ⌛️ ⏳ 📡 🔋 🔌 💡 🔦 🕯 🪔 🧯 🛢 💸 💵 💴 💶 💷 🪙 💰 💳 💎 ⚖️ 🪜 🧰 🪛 🔧 🔨 ⚒ 🛠 ⛏ 🪚 🔩 ⚙️ 🪤 🧱 ⛓ 🧲 🔫 💣 🧨 🪓 🔪 🗡 ⚔️ 🛡 🚬 ⚰️ 🪦 ⚱️ 🏺 🔮 📿 🧿 💈 ⚗️ 🔭 🔬 🕳 🩹 🩺 💊 💉 🩸 🧬 🦠 🧫 🧪 🌡 🧹 🪠 🧺 🧻 🚽 🚰 🚿 🛁 🛀 🧼 🪥 🪒 🧽 🪣 🧴 🛎 🔑 🗝 🚪 🪑 🛋 🛏 🛌 🧸 🪆 🖼 🪞 🪟 🛍 🛒 🎁 🎈 🎏 🎀 🪄 🪅 🎊 🎉 🎎 🏮 🎐 🧧 ✉️ 📩 📨 📧 💌 📥 📤 📦 🏷 🪧 📪 📫 📬 📭 📮 📯 📜 📃 📄 📑 🧾 📊 📈 📉 🗒 🗓 📆 📅 🗑 📇 🗃 🗳 🗄 📋 📁 📂 🗂 🗞 📰 📓 📔 📒 📕 📗 📘 📙 📚 📖 🔖 🧷 🔗 📎 🖇 📐 📏 🧮 📌 📍 ✂️ 🖊 🖋 ✒️ 🖌 🖍 📝 ✏️ 🔍 🔎 🔏 🔐 🔒 🔓 ❤️ 🧡 💛 💚 💙 💜 🖤 🤍 🤎 💔 ❣️ 💕 💞 💓 💗 💖 💘 💝 💟 ☮️ ✝️ ☪️ 🕉 ☸️ ✡️ 🔯 🕎 ☯️ ☦️ 🛐 ⛎ ♈️ ♉️ ♊️ ♋️ ♌️ ♍️ ♎️ ♏️ ♐️ ♑️ ♒️ ♓️ 🆔 ⚛️ 🉑 ☢️ ☣️ 📴 📳 🈶 🈚️ 🈸 🈺 🈷️ ✴️ 🆚 💮 🉐 ㊙️ ㊗️ 🈴 🈵 🈹 🈲 🅰️ 🅱️ 🆎 🆑 🅾️ 🆘 ❌ ⭕️ 🛑 ⛔️ 📛 🚫 💯 💢 ♨️ 🚷 🚯 🚳 🚱 🔞 📵 🚭 ❗️ ❕ ❓ ❔ ‼️ ⁉️ 🔅 🔆 〽️ ⚠️ 🚸 🔱 ⚜️ 🔰 ♻️ ✅ 🈯️ 💹 ❇️ ✳️ ❎ 🌐 💠 Ⓜ️ 🌀 💤 🏧 🚾 ♿️ 🅿️ 🛗 🈳 🈂️ 🛂 🛃 🛄 🛅 🚹 🚺 🚼 ⚧ 🚻 🚮 🎦 📶 🈁 🔣 ℹ️ 🔤 🔡 🔠 🆖 🆗 🆙 🆒 🆕 🆓 0️⃣ 1️⃣ 2️⃣ 3️⃣ 4️⃣ 5️⃣ 6️⃣ 7️⃣ 8️⃣ 9️⃣ 🔟 🔢 #️⃣ *️⃣ ⏏️ ▶️ ⏸ ⏯ ⏹ ⏺ ⏭ ⏮ ⏩ ⏪ ⏫ ⏬ ◀️ 🔼 🔽 ➡️ ⬅️ ⬆️ ⬇️ ↗️ ↘️ ↙️ ↖️ ↕️ ↔️ ↪️ ↩️ ⤴️ ⤵️ 🔀 🔁 🔂 🔄 🔃 🎵 🎶 ➕ ➖ ➗ ✖️ ♾ 💲 💱 ™️ ©️ ®️ 〰️ ➰ ➿ 🔚 🔙 🔛 🔝 🔜 ✔️ ☑️ 🔘 🔴 🟠 🟡 🟢 🔵 🟣 ⚫️ ⚪️ 🟤 🔺 🔻 🔸 🔹 🔶 🟦 🟪 ⬛️ ⬜️ 🟫 🔈 🔇 🔉 🔊 🔔 🔕 📣 📢 👁‍🗨 💬 💭 🗯 ♠️ ♣️ ♥️ ♦️ 🃏 🎴 🀄️ 🕐 🕑 🕒 🕓 🕔 🕕 🕖 🕗 🕘 🕙 🕚 🕛 🕜 🕝 🕞 🕟 🕠 🕡 🕢 🕣 🕤 🕥 🕦 🕧
`;
const emoji_categories = parse_emoji_categories(quick_emoji_source);
const quick_emojis = emoji_categories.flatMap((category) => category.emojis);

document.addEventListener("DOMContentLoaded", initialize_application);

async function initialize_application() {
  collect_dom_references();
  lift_emoji_picker_panel();
  initialize_supabase_client();
  bind_event_handlers();
  apply_saved_language();
  apply_saved_theme();
  await load_all_message_lists();
  apply_language();
  const restored_session = await restore_existing_session();

  if (!restored_session) {
    await load_saved_content();
  }

  update_home_counters();
  update_contextual_messages();
  start_time_sensitive_updates();
  build_emoji_picker();
  auto_grow_live_message_input();
  start_heart_shower_cycle();
}

function collect_dom_references() {
  dom_references.reaction_layer = document.getElementById("reaction_layer");
  dom_references.language_toggle_button = document.getElementById("language_toggle_button");
  dom_references.language_flag_icon = document.getElementById("language_flag_icon");
  dom_references.language_toggle_label = document.getElementById("language_toggle_label");
  dom_references.login_screen = document.getElementById("login_screen");
  dom_references.login_panel_eyebrow = document.querySelector("#login_screen .eyebrow_text");
  dom_references.login_copy = document.querySelector(".login_copy");
  dom_references.login_form = document.getElementById("login_form");
  dom_references.login_button = document.getElementById("login_button");
  dom_references.username_input = document.getElementById("username_input");
  dom_references.password_input = document.getElementById("password_input");
  dom_references.login_email_hint = document.getElementById("login_email_hint");
  dom_references.forgot_password_button = document.getElementById("forgot_password_button");
  dom_references.login_error_message = document.getElementById("login_error_message");
  dom_references.welcome_overlay = document.getElementById("welcome_overlay");
  dom_references.welcome_kicker = document.getElementById("welcome_kicker");
  dom_references.welcome_primary_message = document.getElementById("welcome_primary_message");
  dom_references.welcome_secondary_message = document.getElementById("welcome_secondary_message");
  dom_references.daily_joy_message = document.getElementById("daily_joy_message");
  dom_references.enter_home_button = document.getElementById("enter_home_button");
  dom_references.home_screen = document.getElementById("home_screen");
  dom_references.home_header_eyebrow = document.querySelector(".home_header .eyebrow_text");
  dom_references.home_greeting = document.getElementById("home_greeting");
  dom_references.logout_button = document.getElementById("logout_button");
  dom_references.theme_toggle_button = document.getElementById("theme_toggle_button");
  dom_references.hero_eyebrow = document.querySelector(".hero_content .eyebrow_text");
  dom_references.hero_heading = document.getElementById("hero_heading");
  dom_references.hero_personal_message = document.getElementById("hero_personal_message");
  dom_references.daily_love_heading = document.getElementById("daily_love_heading");
  dom_references.daily_love_message = document.getElementById("daily_love_message");
  dom_references.daily_love_note = document.querySelector(".daily_love_note");
  dom_references.hero_symbol = document.querySelector(".hero_symbol");
  dom_references.hero_symbol_message = document.getElementById("hero_symbol_message");
  dom_references.today_prank_heading = document.getElementById("today_prank_heading");
  dom_references.today_prank_message = document.getElementById("today_prank_message");
  dom_references.today_prank_card = document.querySelector(".today_prank_card");
  dom_references.night_tale_card = document.getElementById("night_tale_card");
  dom_references.night_tale_eyebrow = document.getElementById("night_tale_eyebrow");
  dom_references.night_tale_heading = document.getElementById("night_tale_heading");
  dom_references.night_tale_message = document.getElementById("night_tale_message");
  dom_references.time_eyebrow = document.querySelector("[aria-labelledby='time_heading'] .eyebrow_text");
  dom_references.time_heading = document.getElementById("time_heading");
  dom_references.days_label = document.querySelector(".featured_metric .metric_label");
  dom_references.days_note = document.querySelector(".featured_metric .metric_note");
  dom_references.years_label = document.querySelector(".time_grid .metric_card:nth-child(2) .metric_label");
  dom_references.years_note = document.querySelector(".time_grid .metric_card:nth-child(2) .metric_note");
  dom_references.diab_age_label = document.querySelector(".time_grid .metric_card:nth-child(3) .metric_label");
  dom_references.diab_age_note = document.querySelector(".time_grid .metric_card:nth-child(3) .metric_note");
  dom_references.svetlana_age_label = document.querySelector(".time_grid .metric_card:nth-child(4) .metric_label");
  dom_references.svetlana_age_note = document.querySelector(".time_grid .metric_card:nth-child(4) .metric_note");
  dom_references.diab_birthday_label = document.querySelector(".time_grid .metric_card:nth-child(5) .metric_label");
  dom_references.svetlana_birthday_label = document.querySelector(".time_grid .metric_card:nth-child(6) .metric_label");
  dom_references.days_together_counter = document.getElementById("days_together_counter");
  dom_references.years_together_counter = document.getElementById("years_together_counter");
  dom_references.diab_age_counter = document.getElementById("diab_age_counter");
  dom_references.svetlana_age_counter = document.getElementById("svetlana_age_counter");
  dom_references.diab_next_birthday_message = document.getElementById("diab_next_birthday_message");
  dom_references.svetlana_next_birthday_message = document.getElementById("svetlana_next_birthday_message");
  dom_references.gallery_eyebrow = document.querySelector("[aria-labelledby='memory_gallery_heading'] .eyebrow_text");
  dom_references.memory_gallery_heading = document.getElementById("memory_gallery_heading");
  dom_references.add_memory_button = document.getElementById("add_memory_button");
  dom_references.memory_gallery = document.getElementById("memory_gallery");
  dom_references.events_eyebrow = document.querySelector("[aria-labelledby='event_timeline_heading'] .eyebrow_text");
  dom_references.event_timeline_heading = document.getElementById("event_timeline_heading");
  dom_references.add_event_button = document.getElementById("add_event_button");
  dom_references.event_timeline = document.getElementById("event_timeline");
  dom_references.live_messages_eyebrow = document.getElementById("live_messages_eyebrow");
  dom_references.live_messages_heading = document.getElementById("live_messages_heading");
  dom_references.live_messages_empty_state = document.getElementById("live_messages_empty_state");
  dom_references.live_messages_list = document.getElementById("live_messages_list");
  dom_references.live_message_form = document.getElementById("live_message_form");
  dom_references.live_message_composer = document.querySelector(".live_message_composer");
  dom_references.live_message_input = document.getElementById("live_message_input");
  dom_references.emoji_toggle_button = document.getElementById("emoji_toggle_button");
  dom_references.emoji_picker_panel = document.getElementById("emoji_picker_panel");
  dom_references.live_message_files_input = document.getElementById("live_message_files_input");
  dom_references.live_message_files_label = document.getElementById("live_message_files_label");
  dom_references.live_message_files_preview = document.getElementById("live_message_files_preview");
  dom_references.send_live_message_button = document.getElementById("send_live_message_button");
  dom_references.footer_text = document.querySelector(".love_footer > p");
  dom_references.memory_dialog = document.getElementById("memory_dialog");
  dom_references.memory_form = document.getElementById("memory_form");
  dom_references.memory_dialog_title = document.getElementById("memory_dialog_title");
  dom_references.close_memory_dialog_button = document.getElementById("close_memory_dialog_button");
  dom_references.memory_title_label = document.querySelector("label[for='memory_title_input']");
  dom_references.memory_date_label = document.querySelector("label[for='memory_date_input']");
  dom_references.memory_note_label = document.querySelector("label[for='memory_note_input']");
  dom_references.memory_image_label = document.querySelector("label[for='memory_image_input']");
  dom_references.memory_title_input = document.getElementById("memory_title_input");
  dom_references.memory_date_input = document.getElementById("memory_date_input");
  dom_references.memory_note_input = document.getElementById("memory_note_input");
  dom_references.memory_image_input = document.getElementById("memory_image_input");
  dom_references.memory_image_hint = document.getElementById("memory_image_hint");
  dom_references.save_memory_button = document.getElementById("save_memory_button");
  dom_references.event_dialog = document.getElementById("event_dialog");
  dom_references.event_form = document.getElementById("event_form");
  dom_references.event_dialog_title = document.getElementById("event_dialog_title");
  dom_references.close_event_dialog_button = document.getElementById("close_event_dialog_button");
  dom_references.event_title_label = document.querySelector("label[for='event_title_input']");
  dom_references.event_date_label = document.querySelector("label[for='event_date_input']");
  dom_references.event_description_label = document.querySelector("label[for='event_description_input']");
  dom_references.event_title_input = document.getElementById("event_title_input");
  dom_references.event_date_input = document.getElementById("event_date_input");
  dom_references.event_description_input = document.getElementById("event_description_input");
  dom_references.save_event_button = document.getElementById("save_event_button");
  dom_references.password_recovery_dialog = document.getElementById("password_recovery_dialog");
  dom_references.password_recovery_form = document.getElementById("password_recovery_form");
  dom_references.password_recovery_title = document.getElementById("password_recovery_title");
  dom_references.password_recovery_copy = document.getElementById("password_recovery_copy");
  dom_references.close_password_recovery_button = document.getElementById("close_password_recovery_button");
  dom_references.new_password_label = document.querySelector("label[for='new_password_input']");
  dom_references.confirm_password_label = document.querySelector("label[for='confirm_password_input']");
  dom_references.new_password_input = document.getElementById("new_password_input");
  dom_references.confirm_password_input = document.getElementById("confirm_password_input");
  dom_references.password_recovery_status = document.getElementById("password_recovery_status");
  dom_references.save_password_button = document.getElementById("save_password_button");
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

function initialize_supabase_client() {
  const supabase_config = window.supabase_public_config || {};
  const create_client = window.supabase && typeof window.supabase.createClient === "function"
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
      autoRefreshToken: true
    }
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
  return host_name === "localhost" || host_name === "127.0.0.1" || host_name === "::1";
}

function get_supabase_user_map() {
  return (window.supabase_public_config && window.supabase_public_config.users) || {};
}

function get_supabase_user_config(username) {
  return get_supabase_user_map()[username] || null;
}

function bind_supabase_auth_listener() {
  if (!supabase_client || supabase_auth_subscription) {
    return;
  }

  const auth_listener = supabase_client.auth.onAuthStateChange((event, session) => {
    if (event !== "PASSWORD_RECOVERY") {
      return;
    }

    window.setTimeout(() => {
      password_recovery_mode_active = true;
      current_auth_user_id = String(session?.user?.id || "");
      open_password_recovery_dialog();
    }, 0);
  });

  supabase_auth_subscription = auth_listener?.data?.subscription || auth_listener?.subscription || null;
}

function is_supabase_recovery_link_present() {
  const search_text = String(window.location.search || "").toLowerCase();
  const hash_text = String(window.location.hash || "").toLowerCase();
  return search_text.includes("type=recovery") || hash_text.includes("type=recovery");
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
    email
  };
}

function get_profile_from_supabase_user(user) {
  const user_email = String(user?.email || "").trim().toLowerCase();

  if (!user_email) {
    return null;
  }

  const matching_entry = Object.entries(get_supabase_user_map()).find(([, config]) => {
    return String(config?.email || "").trim().toLowerCase() === user_email;
  });

  if (!matching_entry) {
    return null;
  }

  return build_user_profile(matching_entry[0], user_email);
}

async function restore_existing_session() {
  if (is_supabase_enabled() && (password_recovery_mode_active || is_supabase_recovery_link_present())) {
    return false;
  }

  if (is_supabase_enabled()) {
    try {
      const { data, error } = await supabase_client.auth.getSession();

      if (!error && data.session?.user) {
        const restored_profile = get_profile_from_supabase_user(data.session.user);

        if (restored_profile) {
          current_auth_user_id = data.session.user.id;
          current_user_profile = restored_profile;
          load_hidden_deleted_messages();
          sessionStorage.setItem("logged_in_user", JSON.stringify(restored_profile));
          await ensure_supabase_profile_row(restored_profile);
          await load_saved_content();
          update_home_for_user(restored_profile);
          dom_references.login_screen.classList.add("hidden");
          dom_references.welcome_overlay.classList.add("hidden");
          dom_references.home_screen.classList.remove("hidden");
          await initialize_live_messages_for_session();
          return true;
        }
      }
    } catch (error) {
      // Login falls back to the manual gate below.
    }
  }

  try {
    const saved_profile = JSON.parse(sessionStorage.getItem("logged_in_user") || "null");

    if (saved_profile && saved_profile.user_key) {
      current_user_profile = saved_profile;
      load_hidden_deleted_messages();
      await load_saved_content();
      update_home_for_user(saved_profile);
      dom_references.login_screen.classList.add("hidden");
      dom_references.welcome_overlay.classList.add("hidden");
      dom_references.home_screen.classList.remove("hidden");
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
      room_slug: current_room_slug
    });
  } catch (error) {
    // The app still works if the profile row will be created later.
  }
}

function bind_event_handlers() {
  dom_references.language_toggle_button.addEventListener("click", toggle_language);
  dom_references.login_form.addEventListener("submit", handle_login);
  dom_references.username_input.addEventListener("input", () => {
    set_status_text(dom_references.login_error_message, "", "");
    update_login_email_hint();
  });
  dom_references.forgot_password_button.addEventListener("click", handle_forgot_password_request);
  dom_references.enter_home_button.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "heart", 10);
    enter_home_from_welcome();
  });
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
  dom_references.memory_gallery.addEventListener("click", handle_memory_action);
  dom_references.event_timeline.addEventListener("click", handle_event_action);
  dom_references.today_prank_card.addEventListener("click", (event) => burst_reaction(event.currentTarget, "spark", 10));
  dom_references.today_prank_message.addEventListener("click", (event) => {
    burst_emoji_reaction(event.currentTarget, ["😂", "🤣", "😄", "❤️", "💞"], 14, [24, 40]);
  });
  dom_references.night_tale_card.addEventListener("click", (event) => burst_reaction(event.currentTarget, "spark", 12));
  dom_references.daily_love_note.addEventListener("click", (event) => burst_reaction(event.currentTarget, "heart", 12));
  dom_references.hero_symbol.addEventListener("click", (event) => {
    burst_reaction(event.currentTarget, "heart", 14);
    burst_emoji_reaction(event.currentTarget, ["❤️", "💖", "💗"], 10, [22, 36]);
    show_hero_symbol_message();
  });
  dom_references.close_memory_dialog_button.addEventListener("click", () => close_dialog(dom_references.memory_dialog));
  dom_references.close_event_dialog_button.addEventListener("click", () => close_dialog(dom_references.event_dialog));
  dom_references.memory_form.addEventListener("submit", save_memory_from_form);
  dom_references.event_form.addEventListener("submit", save_event_from_form);
  dom_references.password_recovery_form.addEventListener("submit", handle_password_recovery_submit);
  dom_references.close_password_recovery_button.addEventListener("click", close_password_recovery_dialog);
  dom_references.live_message_form.addEventListener("submit", send_live_message);
  dom_references.live_messages_list.addEventListener("click", handle_live_message_action);
  dom_references.live_message_files_input.addEventListener("change", handle_live_message_files_selected);
  dom_references.live_message_input.addEventListener("input", auto_grow_live_message_input);
  dom_references.live_message_input.addEventListener("keydown", handle_live_message_keydown);
  dom_references.emoji_toggle_button.addEventListener("click", toggle_emoji_picker);
  document.addEventListener("click", handle_document_click);
  window.addEventListener("beforeunload", close_live_messages_stream);
}

function translate(key, ...args) {
  const active_pack = translations[current_language] || translations.en;
  const fallback_pack = translations.en;
  const value = key in active_pack ? active_pack[key] : fallback_pack[key];
  return typeof value === "function" ? value(...args) : value;
}

function set_text(element_or_selector, value) {
  const element = typeof element_or_selector === "string"
    ? document.querySelector(element_or_selector)
    : element_or_selector;

  if (element) {
    element.textContent = value;
  }
}

function set_placeholder(element, value) {
  if (element) {
    element.placeholder = value;
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

function update_login_email_hint(custom_message = "", status_type = "") {
  if (!dom_references.login_email_hint) {
    return;
  }

  if (custom_message) {
    set_status_text(dom_references.login_email_hint, custom_message, status_type);
    return;
  }

  if (!is_supabase_enabled()) {
    set_status_text(dom_references.login_email_hint, "", "");
    return;
  }

  const submitted_username = String(dom_references.username_input?.value || "").trim().toLowerCase();
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
          id: line.toLowerCase().replace(/[^a-z]+/g, "_").replace(/^_|_$/g, ""),
          label: line,
          emojis: []
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
          .filter((token) => token && !/[A-Za-z]/.test(token) && token !== "&")
      );
    });

  return category_list
    .map((category) => ({
      ...category,
      emojis: [...new Set(category.emojis)]
    }))
    .filter((category) => category.emojis.length > 0);
}

function build_emoji_picker() {
  if (!dom_references.emoji_picker_panel) {
    return;
  }

  dom_references.emoji_picker_panel.innerHTML = "";
  const category_list = emoji_categories.length > 0
    ? emoji_categories
    : [{ id: "all", label: "Emoji", emojis: quick_emojis }];
  const tabs = document.createElement("div");
  tabs.className = "emoji_picker_tabs";
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
        target_section.scrollIntoView({ behavior: "smooth", block: "start", inline: "nearest" });
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
      emoji_button.addEventListener("click", () => {
        insert_emoji_at_cursor(emoji_character);
        hide_emoji_picker();
      });
      grid.appendChild(emoji_button);
    });

    section.appendChild(grid);
    body.appendChild(section);
  });

  dom_references.emoji_picker_panel.append(tabs, body);
}

function toggle_emoji_picker(event) {
  event.stopPropagation();
  dom_references.emoji_picker_panel.classList.toggle("hidden");
}

function hide_emoji_picker() {
  dom_references.emoji_picker_panel.classList.add("hidden");
}

function handle_document_click(event) {
  const clicked_inside_form = dom_references.live_message_form.contains(event.target);
  const clicked_inside_picker = dom_references.emoji_picker_panel.contains(event.target);
  const clicked_toggle_button = dom_references.emoji_toggle_button.contains(event.target);

  if (!clicked_inside_form && !clicked_inside_picker && !clicked_toggle_button) {
    hide_emoji_picker();
  }
}

function insert_emoji_at_cursor(emoji_character) {
  const input = dom_references.live_message_input;
  const start = input.selectionStart ?? input.value.length;
  const end = input.selectionEnd ?? input.value.length;
  const next_value = `${input.value.slice(0, start)}${emoji_character}${input.value.slice(end)}`;
  input.value = next_value;
  input.focus();
  const next_cursor = start + emoji_character.length;
  input.setSelectionRange(next_cursor, next_cursor);
  auto_grow_live_message_input();
}

function apply_saved_language() {
  const saved_language = localStorage.getItem(language_storage_key);
  current_language = language_cycle.includes(saved_language) ? saved_language : "en";
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
  dom_references.language_toggle_button.setAttribute("aria-label", translate("language_switch_hint"));
  dom_references.language_toggle_button.title = translate("language_switch_hint");

  set_text(dom_references.login_panel_eyebrow, translate("login_eyebrow"));
  set_text(dom_references.login_copy, translate("login_copy"));
  set_text(dom_references.memory_title_label, translate("title_label"));
  set_text(dom_references.memory_date_label, translate("date_label"));
  set_text(dom_references.memory_note_label, translate("note_label"));
  set_text(dom_references.memory_image_label, translate("picture_label"));
  set_text(dom_references.event_title_label, translate("title_label"));
  set_text(dom_references.event_date_label, translate("date_label"));
  set_text(dom_references.event_description_label, translate("event_description_label"));
  set_text(document.querySelector("label[for='username_input']"), translate("username_label"));
  set_text(document.querySelector("label[for='password_input']"), translate("password_label"));
  set_placeholder(dom_references.username_input, translate("username_placeholder"));
  set_placeholder(dom_references.password_input, translate("password_placeholder"));
  set_text(dom_references.forgot_password_button, translate("forgot_password_button"));
  set_text(dom_references.login_button, translate("login_button"));
  update_login_email_hint();
  set_text(dom_references.welcome_kicker, translate("welcome_kicker"));
  set_text(dom_references.enter_home_button, translate("enter_home_button"));
  set_text(dom_references.home_header_eyebrow, translate("header_eyebrow"));
  set_text(dom_references.logout_button, translate("logout_button"));
  set_text(dom_references.hero_eyebrow, translate("hero_eyebrow"));
  set_text(dom_references.hero_heading, translate("hero_heading"));
  set_text(dom_references.today_prank_heading, translate("today_prank_heading"));
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
  set_text(dom_references.diab_birthday_label, translate("diab_birthday_label"));
  set_text(dom_references.svetlana_birthday_label, translate("svetlana_birthday_label"));
  set_text(dom_references.gallery_eyebrow, translate("gallery_eyebrow"));
  set_text(dom_references.memory_gallery_heading, translate("gallery_heading"));
  set_text(dom_references.add_memory_button, translate("add_memory"));
  set_text(dom_references.events_eyebrow, translate("events_eyebrow"));
  set_text(dom_references.event_timeline_heading, translate("events_heading"));
  set_text(dom_references.add_event_button, translate("add_event"));
  set_text(dom_references.live_messages_eyebrow, translate("live_messages_eyebrow"));
  set_text(dom_references.live_messages_heading, translate("live_messages_heading"));
  set_text(dom_references.live_messages_empty_state, translate("live_messages_empty"));
  set_placeholder(dom_references.live_message_input, translate("live_message_placeholder"));
  dom_references.emoji_toggle_button.setAttribute("aria-label", translate("emoji_button_label"));
  dom_references.emoji_toggle_button.title = translate("emoji_button_label");
  dom_references.live_message_files_label.setAttribute("aria-label", translate("live_message_add_files"));
  dom_references.live_message_files_label.title = translate("live_message_add_files");
  update_live_message_action_labels();
  set_text(dom_references.footer_text, translate("made_with_love"));
  set_text(dom_references.daily_love_heading, get_active_love_heading());
  set_placeholder(dom_references.memory_title_input, translate("memory_title_placeholder"));
  set_placeholder(dom_references.memory_note_input, translate("memory_note_placeholder"));
  set_placeholder(dom_references.event_title_input, translate("event_title_placeholder"));
  set_placeholder(dom_references.event_description_input, translate("event_description_placeholder"));
  set_text(dom_references.password_recovery_title, translate("password_recovery_title"));
  set_text(dom_references.password_recovery_copy, translate("password_recovery_copy"));
  set_text(dom_references.new_password_label, translate("new_password_label"));
  set_text(dom_references.confirm_password_label, translate("confirm_password_label"));
  set_placeholder(dom_references.new_password_input, translate("new_password_placeholder"));
  set_placeholder(dom_references.confirm_password_input, translate("confirm_password_placeholder"));
  set_text(dom_references.save_password_button, translate("password_recovery_save"));
  dom_references.close_memory_dialog_button.setAttribute("aria-label", translate("close_dialog_label"));
  dom_references.close_event_dialog_button.setAttribute("aria-label", translate("close_dialog_label"));
  dom_references.close_password_recovery_button.setAttribute("aria-label", translate("close_dialog_label"));
  update_theme_button(document.documentElement.dataset.theme || "light");
  translate_default_items();
  update_home_for_user(current_user_profile);
  update_welcome_text();
  update_contextual_messages();
  update_home_counters();
  update_dialog_titles();
  update_live_message_file_preview();
  build_emoji_picker();
  auto_grow_live_message_input();
  render_memory_gallery(current_memory_items.length > 0 ? current_memory_items : get_default_memory_gallery_items());
  render_event_timeline(current_event_items.length > 0 ? current_event_items : get_default_event_timeline_items());
  render_live_messages();
}

function update_dialog_titles() {
  dom_references.memory_dialog_title.textContent = editing_memory_id ? translate("memory_dialog_edit") : translate("memory_dialog_add");
  dom_references.save_memory_button.textContent = editing_memory_id ? translate("update_memory") : translate("save_memory");
  dom_references.event_dialog_title.textContent = editing_event_id ? translate("event_dialog_edit") : translate("event_dialog_add");
  dom_references.save_event_button.textContent = editing_event_id ? translate("update_event") : translate("save_event");

  if (editing_memory_id && editing_memory_image_data) {
    dom_references.memory_image_hint.textContent = translate("image_replace_hint");
  } else if (!editing_memory_id) {
    dom_references.memory_image_hint.textContent = "";
  }
}

function update_live_message_action_labels() {
  const send_label = editing_live_message_id ? translate("live_message_update") : translate("live_message_send");
  dom_references.send_live_message_button.setAttribute("aria-label", send_label);
  dom_references.send_live_message_button.title = send_label;
}

function translate_default_items() {
  if (current_memory_items.length > 0 && current_memory_items.every((item) => item.is_placeholder)) {
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
  const [joy_lists, love_lists, morning_lists, night_lists, tale_lists] = await Promise.all([
    load_daily_joy_messages_by_language(),
    load_daily_love_messages_by_language(),
    load_morning_messages_by_language(),
    load_night_messages_by_language(),
    load_night_tales_by_language()
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

  const submitted_username = dom_references.username_input.value.trim().toLowerCase();
  const submitted_password = dom_references.password_input.value;
  const user_profile = await authenticate_user(submitted_username, submitted_password);

  if (!user_profile) {
    set_status_text(dom_references.login_error_message, translate("login_error"), "error");
    return;
  }

  current_user_profile = {
    user_key: user_profile.user_key,
    display_name: user_profile.display_name,
    email: user_profile.email || ""
  };

  password_recovery_mode_active = false;
  load_hidden_deleted_messages();
  sessionStorage.setItem("logged_in_user", JSON.stringify(current_user_profile));
  set_status_text(dom_references.login_error_message, "", "");
  dom_references.username_input.value = "";
  dom_references.password_input.value = "";
  update_login_email_hint();
  await load_saved_content();
  update_home_for_user(current_user_profile);
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
        password
      });

      if (error || !data.user) {
        log_app_error("supabase_auth_sign_in_failed", error || "missing_user");
        return null;
      }

      current_auth_user_id = data.user.id;
      const user_profile = build_user_profile(username, supabase_user.email);
      await ensure_supabase_profile_row(user_profile);
      return user_profile;
    } catch (error) {
      log_app_error("supabase_auth_sign_in_threw", error);
      return null;
    }
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({ username, password })
    });

    if (response.ok) {
      const server_user = await response.json();
      return {
        user_key: server_user.user_key,
        display_name: server_user.display_name
      };
    }
  } catch (error) {
    // The local gate is enough when the backend is not reachable.
  }

  return {
    user_key: local_user.user_key,
    display_name: local_user.display_name
  };
}

function handle_logout() {
  sessionStorage.removeItem("logged_in_user");
  current_user_profile = null;
  current_auth_user_id = "";
  hidden_deleted_message_ids = [];
  password_recovery_mode_active = false;
  dom_references.home_screen.classList.add("hidden");
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.login_screen.classList.remove("hidden");
  set_status_text(dom_references.login_error_message, "", "");
  update_login_email_hint();
  close_live_messages_stream();
  clear_live_message_composer();
  render_event_timeline(current_event_items);
  close_password_recovery_dialog();

  if (is_supabase_enabled()) {
    supabase_client.auth.signOut().catch(() => {});
  }
}

async function handle_forgot_password_request() {
  if (!is_supabase_enabled()) {
    set_status_text(dom_references.login_error_message, translate("forgot_password_error"), "error");
    return;
  }

  const submitted_username = String(dom_references.username_input.value || "").trim().toLowerCase();
  const supabase_user = get_supabase_user_config(submitted_username);

  if (!supabase_user?.email) {
    set_status_text(dom_references.login_error_message, translate("forgot_password_username_missing"), "error");
    update_login_email_hint();
    return;
  }

  const redirect_url = `${window.location.origin}${window.location.pathname}`;

  try {
    const { error } = await supabase_client.auth.resetPasswordForEmail(supabase_user.email, {
      redirectTo: redirect_url
    });

    if (error) {
      log_app_error("supabase_password_reset_email_failed", error);
      throw error;
    }

    set_status_text(dom_references.login_error_message, translate("forgot_password_sent_generic"), "success");
    update_login_email_hint();
  } catch (error) {
    log_app_error("supabase_password_reset_email_threw", error);
    set_status_text(dom_references.login_error_message, translate("forgot_password_error"), "error");
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
  const confirmed_password = String(dom_references.confirm_password_input.value || "");

  if (new_password !== confirmed_password) {
    set_status_text(dom_references.password_recovery_status, translate("password_recovery_mismatch"), "error");
    return;
  }

  if (!is_supabase_enabled()) {
    set_status_text(dom_references.password_recovery_status, translate("password_recovery_error"), "error");
    return;
  }

  dom_references.save_password_button.disabled = true;

  try {
    const { error } = await supabase_client.auth.updateUser({
      password: new_password
    });

    if (error) {
      log_app_error("supabase_password_update_failed", error);
      throw error;
    }

    set_status_text(dom_references.password_recovery_status, translate("password_recovery_success"), "success");
    clear_supabase_recovery_url_state();
    password_recovery_mode_active = false;
    current_auth_user_id = "";
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
    set_status_text(dom_references.password_recovery_status, translate("password_recovery_error"), "error");
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
  window.setTimeout(() => burst_reaction(dom_references.welcome_overlay, "spark", 18), 220);
  window.setTimeout(() => burst_reaction(dom_references.welcome_overlay, "heart", 14), 620);
}

async function enter_home_from_welcome() {
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.home_screen.classList.remove("hidden");
  update_contextual_messages();
  update_home_counters();
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
      secondary: ""
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

  const greeting_lines = translations[current_language].greetings[person_key][day_part];
  return {
    primary: greeting_lines[0],
    secondary: greeting_lines[1]
  };
}

function update_welcome_text() {
  if (!current_user_profile || dom_references.welcome_overlay.classList.contains("hidden")) {
    return;
  }

  const greeting = get_time_based_greeting(current_user_profile);
  dom_references.welcome_primary_message.textContent = greeting.primary;
  dom_references.welcome_secondary_message.textContent = greeting.secondary;
  dom_references.daily_joy_message.textContent = get_daily_joy_message();
}

async function load_daily_joy_messages_by_language() {
  return {
    en: await load_message_list("daily_joy_messages", fallback_daily_joy_messages),
    de: await load_message_list("daily_joy_messages_de", fallback_daily_joy_messages_de),
    ar: await load_message_list("daily_joy_messages_ar", fallback_daily_joy_messages_ar)
  };
}

async function load_daily_love_messages_by_language() {
  return {
    en: await load_message_list("daily_love_messages", fallback_daily_love_messages),
    de: await load_message_list("daily_love_messages_de", fallback_daily_love_messages_de),
    ar: await load_message_list("daily_love_messages_ar", fallback_daily_love_messages_ar)
  };
}

async function load_morning_messages_by_language() {
  return {
    en: await load_message_list("morning_messages", fallback_morning_messages),
    de: await load_message_list("morning_messages_de", fallback_morning_messages_de),
    ar: await load_message_list("morning_messages_ar", fallback_morning_messages_ar)
  };
}

async function load_night_messages_by_language() {
  return {
    en: await load_message_list("night_messages", fallback_night_messages),
    de: await load_message_list("night_messages_de", fallback_night_messages_de),
    ar: await load_message_list("night_messages_ar", fallback_night_messages_ar)
  };
}

async function load_night_tales_by_language() {
  return {
    en: await load_message_list("night_tales", fallback_night_tales),
    de: await load_message_list("night_tales_de", fallback_night_tales_de),
    ar: await load_message_list("night_tales_ar", fallback_night_tales_ar)
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
  const safe_list = Array.isArray(message_list) && message_list.length > 0 ? message_list : fallback_list;
  const today = new Date();
  const seed_text = `${seed_key}_${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  const hash_value = Array.from(seed_text).reduce((total, character) => total + character.charCodeAt(0), 0);
  return safe_list[hash_value % safe_list.length];
}

function get_daily_joy_message() {
  return get_daily_message_from_list(
    daily_joy_messages_by_language[current_language],
    fallback_daily_joy_messages,
    `joy_${current_language}`
  );
}

function get_daily_love_message() {
  return get_daily_message_from_list(
    daily_love_messages_by_language[current_language],
    fallback_daily_love_messages,
    `love_${current_language}`
  );
}

function get_morning_message() {
  return get_daily_message_from_list(
    morning_messages_by_language[current_language],
    fallback_morning_messages,
    `morning_${current_language}`
  );
}

function get_night_message() {
  return get_daily_message_from_list(
    night_messages_by_language[current_language],
    fallback_night_messages,
    `night_${current_language}`
  );
}

function get_night_tale() {
  return get_daily_message_from_list(
    night_tales_by_language[current_language],
    fallback_night_tales,
    `night_tale_${current_language}`
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
  const newline_parts = safe_text.split("\n").map((line) => line.trim()).filter(Boolean);

  if (newline_parts.length > 1) {
    return {
      heading: newline_parts[0],
      body: newline_parts.slice(1).join("\n")
    };
  }

  const sentence_match = safe_text.match(/^(.+?[.!?])\s+([\s\S]+)$/);

  if (sentence_match) {
    return {
      heading: sentence_match[1].trim(),
      body: sentence_match[2].trim()
    };
  }

  return {
    heading: get_active_love_heading(),
    body: safe_text
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
      timer_id: null
    };
    target_element.textContent = next_message;
    return;
  }

  const next_state = {
    signature: message_signature,
    timer_id: null
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
    const step_size = character === "\n" ? 1 : Math.max(1, Math.min(4, Math.ceil(remaining_length / 40)));
    current_index += step_size;
    target_element.textContent = next_message.slice(0, current_index);
    next_state.timer_id = window.setTimeout(write_next, character === "\n" ? 40 : 18);
  };

  write_next();
}

function update_daily_love_message() {
  const active_message = get_active_love_message();
  const message_parts = split_love_message_parts(active_message);
  set_text(dom_references.daily_love_heading, message_parts.heading);
  render_flowing_message(dom_references.daily_love_message, message_parts.body, "daily_love_message");
}

function update_night_tale_section() {
  const should_show_night_tale = is_night_time();
  dom_references.night_tale_card.classList.toggle("hidden", !should_show_night_tale);

  if (should_show_night_tale) {
    dom_references.night_tale_message.textContent = get_night_tale();
  }
}

function update_contextual_messages() {
  update_today_prank_message();
  update_daily_love_message();
  update_night_tale_section();
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

  time_sensitive_interval_id = window.setInterval(refresh_time_sensitive_content, 60 * 1000);
}

function update_home_for_user(user_profile) {
  if (!user_profile) {
    return;
  }

  const greeting = get_time_based_greeting(user_profile);
  dom_references.home_greeting.textContent = greeting.primary;
  dom_references.hero_personal_message.textContent = user_profile.user_key === "svetlana"
    ? translate("hero_message_svetlana")
    : translate("hero_message_diab");

  if (current_event_items.length > 0) {
    render_event_timeline(current_event_items);
  }
}

function parse_local_date(date_string) {
  const [year, month, day] = date_string.split("-").map(Number);
  return new Date(year, month - 1, day);
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
    duration_parts.push(`${years} ${years === 1 ? year_words[0] : year_words[1]}`);
  }

  if (months > 0) {
    duration_parts.push(`${months} ${months === 1 ? month_words[0] : month_words[1]}`);
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
    (today.getMonth() === birthdate.getMonth() && today.getDate() < birthdate.getDate());

  if (birthday_has_not_happened_this_year) {
    age -= 1;
  }

  return age;
}

function calculate_days_until_next_birthday(birthdate_string) {
  const birthdate = parse_local_date(birthdate_string);
  const today = get_today_at_midnight();
  let next_birthday = new Date(today.getFullYear(), birthdate.getMonth(), birthdate.getDate());

  if (next_birthday < today) {
    next_birthday = new Date(today.getFullYear() + 1, birthdate.getMonth(), birthdate.getDate());
  }

  const milliseconds_per_day = 24 * 60 * 60 * 1000;
  return Math.round((next_birthday - today) / milliseconds_per_day);
}

function update_home_counters() {
  const days_together = calculate_days_together();
  const years_together = calculate_years_together();
  const diab_age = calculate_age(diab_birthdate);
  const svetlana_age = calculate_age(svetlana_birthdate);
  const days_until_diab_birthday = calculate_days_until_next_birthday(diab_birthdate);
  const days_until_svetlana_birthday = calculate_days_until_next_birthday(svetlana_birthdate);

  dom_references.days_together_counter.textContent = days_together.toLocaleString(translate("locale"));
  dom_references.years_together_counter.textContent = years_together;
  dom_references.diab_age_counter.textContent = diab_age.toString();
  dom_references.svetlana_age_counter.textContent = svetlana_age.toString();
  dom_references.diab_next_birthday_message.textContent = translate("diab_birthday_message", days_until_diab_birthday);
  dom_references.svetlana_next_birthday_message.textContent = translate("svetlana_birthday_message", days_until_svetlana_birthday);
}

async function load_saved_content() {
  current_memory_items = await api_get_items("memories", memory_storage_key, get_default_memory_gallery_items());
  current_event_items = await api_get_items("events", event_storage_key, get_default_event_timeline_items());
  render_memory_gallery(current_memory_items);
  render_event_timeline(current_event_items);
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
  return Array.isArray(stored_items) && stored_items.length > 0 ? stored_items : fallback_items;
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
          "Content-Type": "application/json"
        },
        body: JSON.stringify(items)
      });
    } catch (error) {
      // The local copy is already safe in the browser.
    }
  }
}

async function supabase_get_items(item_type) {
  const table_name = item_type === "memories" ? supabase_table_names.memories : supabase_table_names.events;
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
  const table_name = item_type === "memories" ? supabase_table_names.memories : supabase_table_names.events;
  const rows = item_type === "memories"
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
    image_data: String(memory_item.image_data || "")
  };
}

function map_memory_row_to_item(row) {
  return {
    id: String(row.id),
    title: String(row.title || ""),
    date_label: String(row.date_label || translate("fallback_memory_date")),
    date_value: String(row.date_value || ""),
    note: String(row.note || ""),
    image_data: String(row.image_data || "")
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
    description: String(event_item.description || "")
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
    description: String(row.description || "")
  };
}

function render_memory_gallery(memory_items) {
  dom_references.memory_gallery.innerHTML = "";

  memory_items.forEach((memory_item) => {
    const memory_card = document.createElement("article");
    memory_card.className = memory_item.image_data ? "memory_card memory_card_with_image" : "memory_card";

    if (memory_item.image_data) {
      const memory_image = document.createElement("img");
      memory_image.src = memory_item.image_data;
      memory_image.alt = memory_item.title;
      memory_card.appendChild(memory_image);
    }

    const memory_text = document.createElement("div");
    memory_text.className = "memory_text";

    const memory_date = document.createElement("p");
    memory_date.className = "memory_date";
    memory_date.textContent = memory_item.date_label || translate("fallback_memory_date");

    const memory_title = document.createElement("h3");
    memory_title.textContent = memory_item.title;

    const memory_note = document.createElement("p");
    memory_note.textContent = memory_item.note || "";

    memory_text.append(memory_date, memory_title, memory_note);

    if (!memory_item.is_placeholder) {
      const memory_actions = create_item_actions("memory", memory_item.id, {
        with_text: true
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

    const timeline_marker = document.createElement("span");
    timeline_marker.className = "timeline_marker";
    timeline_marker.setAttribute("aria-hidden", "true");

    const timeline_content = document.createElement("div");
    timeline_content.className = "timeline_content";

    const timeline_date = document.createElement("time");
    timeline_date.textContent = event_item.date_label || translate("fallback_event_date");

    const timeline_title = document.createElement("h3");
    timeline_title.textContent = event_item.title;

    const timeline_description = document.createElement("p");
    timeline_description.textContent = event_item.description || "";

    timeline_content.append(timeline_date, timeline_title, timeline_description);

    const can_diab_edit_first_day =
      event_item.id === "first_day" &&
      event_item.is_locked &&
      current_user_profile &&
      current_user_profile.user_key === "diab";

    if (can_diab_edit_first_day) {
      timeline_content.appendChild(create_item_actions("event", event_item.id, {
        allow_delete: false
      }));
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
    allow_delete = true
  } = options;
  const action_bar = document.createElement("div");
  action_bar.className = "item_actions";

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
    path.setAttribute("d", "M4 20h4.6L18.9 9.7l-4.6-4.6L4 15.4V20Zm12.7-12.5 1.6-1.6c.6-.6.6-1.4 0-2l-.2-.2c-.6-.6-1.4-.6-2 0l-1.6 1.6 2.2 2.2Z");
  } else {
    path.setAttribute("d", "M8 21c-1.1 0-2-.9-2-2V8H5c-.6 0-1-.4-1-1s.4-1 1-1h4V5c0-1.1.9-2 2-2h2c1.1 0 2 .9 2 2v1h4c.6 0 1 .4 1 1s-.4 1-1 1h-1v11c0 1.1-.9 2-2 2H8Zm3-16v1h2V5h-2Zm-1 13c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1Zm4 0c.6 0 1-.4 1-1v-6c0-.6-.4-1-1-1s-1 .4-1 1v6c0 .6.4 1 1 1Z");
  }

  icon.appendChild(path);
  return icon;
}

function burst_reaction(source_element, type = "heart", amount = 10) {
  if (!source_element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
    return;
  }

  const bounds = source_element.getBoundingClientRect();
  const origin_x = bounds.left + bounds.width / 2;
  const origin_y = type === "heart" ? bounds.bottom - 14 : bounds.top + bounds.height / 2;

  for (let index = 0; index < amount; index += 1) {
    const particle = document.createElement("span");
    const drift = (Math.random() - 0.5) * 170;
    const lift = 86 + Math.random() * 130;
    const delay = Math.random() * 120;
    const size = 12 + Math.random() * 16;

    particle.className = type === "heart" ? "reaction_particle reaction_heart" : "reaction_particle reaction_spark";
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

function burst_emoji_reaction(source_element, emoji_list, amount = 10, size_range = [20, 34]) {
  if (!source_element || window.matchMedia("(prefers-reduced-motion: reduce)").matches) {
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
    const size = size_range[0] + Math.random() * (size_range[1] - size_range[0]);
    particle.className = "reaction_particle reaction_emoji";
    particle.textContent = emoji_list[Math.floor(Math.random() * emoji_list.length)];
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
      }, 260);

      hero_message_cleanup_id = window.setTimeout(() => {
        message_element.classList.remove("is_visible", "is_blooming");
        message_element.textContent = "";
      }, 3200);
      return;
    }

    current_index += 1;
    message_element.textContent = message_text.slice(0, current_index);
    hero_message_timer_id = window.setTimeout(write_next, current_index < 5 ? 60 : 42);
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

function prepare_welcome_audio() {
  const AudioContextConstructor = window.AudioContext || window.webkitAudioContext;

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

function play_welcome_sound() {
  if (!welcome_audio_context) {
    return;
  }

  const now = welcome_audio_context.currentTime;
  const master_gain = welcome_audio_context.createGain();
  master_gain.gain.setValueAtTime(0.0001, now);
  master_gain.gain.exponentialRampToValueAtTime(0.08, now + 0.04);
  master_gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.45);
  master_gain.connect(welcome_audio_context.destination);

  [
    { frequency: 523.25, start: 0, duration: 0.56 },
    { frequency: 659.25, start: 0.16, duration: 0.62 },
    { frequency: 783.99, start: 0.34, duration: 0.72 },
    { frequency: 1046.5, start: 0.62, duration: 0.64 }
  ].forEach((note) => {
    const oscillator = welcome_audio_context.createOscillator();
    const note_gain = welcome_audio_context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.frequency, now + note.start);
    note_gain.gain.setValueAtTime(0.0001, now + note.start);
    note_gain.gain.exponentialRampToValueAtTime(0.34, now + note.start + 0.05);
    note_gain.gain.exponentialRampToValueAtTime(0.0001, now + note.start + note.duration);
    oscillator.connect(note_gain);
    note_gain.connect(master_gain);
    oscillator.start(now + note.start);
    oscillator.stop(now + note.start + note.duration + 0.08);
  });
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
  update_dialog_titles();
  open_dialog(dom_references.event_dialog);
}

function handle_memory_action(event) {
  const action_button = event.target.closest("button[data-action]");

  if (!action_button) {
    return;
  }

  const item_id = action_button.dataset.item_id;

  if (action_button.dataset.action === "edit_memory") {
    edit_memory(item_id);
  }

  if (action_button.dataset.action === "delete_memory") {
    delete_memory(item_id);
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
  dom_references.memory_note_input.value = memory_item.note || "";
  dom_references.memory_image_input.value = "";
  dom_references.memory_image_hint.textContent = editing_memory_image_data ? translate("image_replace_hint") : "";
  update_dialog_titles();
  open_dialog(dom_references.memory_dialog);
}

async function delete_memory(item_id) {
  if (!window.confirm(translate("delete_memory_confirm"))) {
    return;
  }

  current_memory_items = current_memory_items.filter((item) => item.id !== item_id);
  await api_save_items("memories", memory_storage_key, current_memory_items);
  render_memory_gallery(current_memory_items.length > 0 ? current_memory_items : get_default_memory_gallery_items());
  burst_reaction(dom_references.memory_gallery, "spark", 8);
}

function edit_event(item_id) {
  const event_item = current_event_items.find((item) => item.id === item_id);

  if (!event_item) {
    return;
  }

  if (event_item.is_locked && (!current_user_profile || current_user_profile.user_key !== "diab")) {
    return;
  }

  editing_event_id = item_id;
  dom_references.event_title_input.value = event_item.title || "";
  dom_references.event_date_input.value = event_item.date_value || "";
  dom_references.event_description_input.value = event_item.description || "";
  update_dialog_titles();
  open_dialog(dom_references.event_dialog);
}

async function delete_event(item_id) {
  const event_item = current_event_items.find((item) => item.id === item_id);

  if (!event_item || event_item.is_locked) {
    return;
  }

  if (!window.confirm(translate("delete_event_confirm"))) {
    return;
  }

  current_event_items = current_event_items.filter((item) => item.id !== item_id);
  await api_save_items("events", event_storage_key, current_event_items);
  render_event_timeline(current_event_items.length > 0 ? current_event_items : get_default_event_timeline_items());
  burst_reaction(dom_references.event_timeline, "spark", 8);
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

async function save_memory_from_form(event) {
  event.preventDefault();

  const image_file = dom_references.memory_image_input.files[0];
  const image_data = image_file ? await read_file_as_data_url(image_file) : editing_memory_image_data;
  const memory_date = dom_references.memory_date_input.value;
  const existing_memory = current_memory_items.find((item) => item.id === editing_memory_id);
  const saved_memory = {
    id: editing_memory_id || create_item_id(),
    title: dom_references.memory_title_input.value.trim(),
    date_label: memory_date ? format_display_date(memory_date) : existing_memory?.date_label || translate("fallback_memory_date"),
    date_value: memory_date || existing_memory?.date_value || "",
    note: dom_references.memory_note_input.value.trim(),
    image_data
  };

  const base_memories = current_memory_items.filter((item) => !item.is_placeholder);
  const updated_memories = editing_memory_id
    ? current_memory_items.map((item) => (item.id === editing_memory_id ? saved_memory : item))
    : [saved_memory, ...base_memories];

  current_memory_items = updated_memories;
  await api_save_items("memories", memory_storage_key, updated_memories);
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
  const existing_event = current_event_items.find((item) => item.id === editing_event_id);
  const saved_event = {
    id: editing_event_id || create_item_id(),
    is_locked: existing_event?.is_locked || false,
    is_custom: existing_event?.is_locked ? true : existing_event?.is_custom || false,
    title: dom_references.event_title_input.value.trim(),
    date_label: event_date ? format_display_date(event_date) : existing_event?.date_label || translate("fallback_event_date"),
    date_value: event_date || existing_event?.date_value || "",
    description: dom_references.event_description_input.value.trim()
  };

  const updated_events = editing_event_id
    ? current_event_items.map((item) => (item.id === editing_event_id ? saved_event : item))
    : [saved_event, ...current_event_items];

  current_event_items = updated_events;
  await api_save_items("events", event_storage_key, updated_events);
  render_event_timeline(updated_events);
  editing_event_id = null;
  dom_references.event_form.reset();
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
    day: "numeric"
  });
}

function create_item_id() {
  return `item_${Date.now()}_${Math.random().toString(16).slice(2)}`;
}

function set_theme(theme_name) {
  document.documentElement.dataset.theme = theme_name;
  document.body.dataset.theme = theme_name;
}

function apply_saved_theme() {
  const saved_theme = document.documentElement.dataset.theme || localStorage.getItem(theme_storage_key) || "light";
  set_theme(saved_theme);
  update_theme_button(saved_theme);
}

function toggle_theme() {
  const next_theme = document.documentElement.dataset.theme === "dark" ? "light" : "dark";
  set_theme(next_theme);
  localStorage.setItem(theme_storage_key, next_theme);
  update_theme_button(next_theme);
  burst_reaction(dom_references.theme_toggle_button, "spark", 10);
}

function update_theme_button(theme_name) {
  const is_dark_theme = theme_name === "dark";
  const icon = is_dark_theme ? "\u2600\uFE0F" : "\uD83C\uDF19";
  const label = is_dark_theme ? translate("theme_light_short") : translate("theme_dark_short");
  dom_references.theme_toggle_button.innerHTML = `
    <span class="theme_toggle_icon" aria-hidden="true">${icon}</span>
    <span class="theme_toggle_label">${label}</span>
  `;
  dom_references.theme_toggle_button.setAttribute("aria-label", label);
  dom_references.theme_toggle_button.title = label;
  dom_references.theme_toggle_button.setAttribute("aria-pressed", String(is_dark_theme));
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

      current_live_messages = Array.isArray(data) ? data.map(map_live_message_row_to_item) : [];
      render_live_messages(true);
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
        current_live_messages = live_messages;
        render_live_messages(true);
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
          filter: `room_slug=eq.${current_room_slug}`
        },
        (payload) => {
          if (payload.eventType === "DELETE") {
            current_live_messages = current_live_messages.filter((message_item) => message_item.id !== payload.old.id);
            render_live_messages(true);
            return;
          }

          const next_message = map_live_message_row_to_item(payload.new);
          upsert_live_message(next_message, true);
        }
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
      upsert_live_message(message_item, true);
    } catch (error) {
      // Ignore malformed events.
    }
  });
  live_message_stream.addEventListener("live_message_updated", (event) => {
    try {
      const message_item = JSON.parse(event.data);
      upsert_live_message(message_item, true);
    } catch (error) {
      // Ignore malformed events.
    }
  });
  live_message_stream.addEventListener("live_message_deleted", (event) => {
    try {
      const payload = JSON.parse(event.data);
      current_live_messages = current_live_messages.filter((message_item) => message_item.id !== payload.id);
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
  const existing_index = current_live_messages.findIndex((item) => item.id === message_item.id);

  if (existing_index >= 0) {
    current_live_messages[existing_index] = message_item;
  } else {
    current_live_messages = [...current_live_messages, message_item];
  }

  if (!is_deleted_live_message(message_item) && hidden_deleted_message_ids.includes(message_item.id)) {
    hidden_deleted_message_ids = hidden_deleted_message_ids.filter((item_id) => item_id !== message_item.id);
    save_hidden_deleted_messages();
  }

  if (editing_live_message_id === message_item.id && is_deleted_live_message(message_item)) {
    clear_live_message_composer();
  }

  current_live_messages.sort((left_item, right_item) => new Date(left_item.created_at) - new Date(right_item.created_at));
  render_live_messages(scroll_to_bottom);
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
    attachments: Array.isArray(row.attachments) ? row.attachments : []
  };
}

function is_deleted_live_message(message_item) {
  return Boolean(message_item) && String(message_item.text || "") === deleted_live_message_marker;
}

function get_hidden_deleted_message_storage_key() {
  if (!current_user_profile?.user_key) {
    return "";
  }

  return `${hidden_deleted_message_storage_prefix}_${current_room_slug}_${current_user_profile.user_key}`;
}

function load_hidden_deleted_messages() {
  const storage_key = get_hidden_deleted_message_storage_key();

  if (!storage_key) {
    hidden_deleted_message_ids = [];
    return;
  }

  try {
    const stored_value = JSON.parse(localStorage.getItem(storage_key) || "[]");
    hidden_deleted_message_ids = Array.isArray(stored_value)
      ? [...new Set(stored_value.map((item) => String(item || "")).filter(Boolean))]
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
}

function should_hide_deleted_message(message_item) {
  return is_deleted_live_message(message_item) && hidden_deleted_message_ids.includes(message_item.id);
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
  dom_references.live_messages_list.innerHTML = "";
  const has_messages = current_live_messages.length > 0;
  dom_references.live_messages_empty_state.classList.toggle("hidden", has_messages);

  if (!has_messages) {
    return;
  }

  current_live_messages.forEach((message_item) => {
    if (should_hide_deleted_message(message_item)) {
      return;
    }

    const message_element = document.createElement("article");
    const is_own_message = current_user_profile && message_item.sender_key === current_user_profile.user_key;
    const is_deleted_message = is_deleted_live_message(message_item);
    message_element.className = is_own_message ? "live_message_item own_message" : "live_message_item";

    if (is_deleted_message) {
      message_element.classList.add("is_deleted_message");
    }

    const message_meta = document.createElement("div");
    message_meta.className = "live_message_meta";

    const sender_label = document.createElement("span");
    sender_label.textContent = get_message_sender_label(message_item, is_own_message);

    const time_label = document.createElement("span");
    time_label.textContent = format_message_time(message_item.created_at);

    message_meta.append(sender_label, time_label);
    message_element.appendChild(message_meta);

    const message_body_text = get_live_message_display_text(message_item);

    if (message_body_text) {
      const message_body = document.createElement("div");
      message_body.className = "live_message_body";
      message_body.textContent = message_body_text;
      message_element.appendChild(message_body);
    }

    if (!is_deleted_message && Array.isArray(message_item.attachments) && message_item.attachments.length > 0) {
      const attachment_list = document.createElement("div");
      attachment_list.className = "live_message_attachments";
      message_item.attachments.forEach((attachment) => attachment_list.appendChild(render_live_message_attachment(attachment)));
      message_element.appendChild(attachment_list);
    }

    const edit_note = render_live_message_edit_note(message_item);

    if (edit_note) {
      message_element.appendChild(edit_note);
    }

    if (is_deleted_message) {
      message_element.appendChild(create_deleted_message_tools(message_item.id));
    } else if (is_own_message) {
      message_element.appendChild(create_live_message_tools(message_item.id));
    }

    dom_references.live_messages_list.appendChild(message_element);
  });

  if (scroll_to_bottom) {
    dom_references.live_messages_list.scrollTop = dom_references.live_messages_list.scrollHeight;
  }
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
  edit_button.append(create_action_icon("edit"), create_action_label(translate("edit")));

  const delete_button = document.createElement("button");
  delete_button.className = "live_message_tool_button delete_message_tool";
  delete_button.type = "button";
  delete_button.dataset.action = "delete_live_message";
  delete_button.dataset.message_id = message_id;
  delete_button.title = translate("delete");
  delete_button.setAttribute("aria-label", translate("delete"));
  delete_button.append(create_action_icon("delete"), create_action_label(translate("delete")));

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
  delete_button.setAttribute("aria-label", translate("live_message_delete_local"));
  delete_button.append(create_action_icon("delete"), create_action_label(translate("live_message_delete_local")));

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
  edit_note.textContent = translate("live_message_edited_at", format_message_time(message_item.edited_at));
  edit_note.title = translate("live_message_edited");
  return edit_note;
}

function render_live_message_attachment(attachment) {
  const attachment_card = document.createElement("div");
  attachment_card.className = "live_message_attachment";
  const attachment_name = document.createElement("strong");
  attachment_name.className = "live_message_attachment_name";
  attachment_name.textContent = attachment.name || "file";
  const attachment_meta = document.createElement("span");
  attachment_meta.className = "live_message_attachment_meta";
  attachment_meta.textContent = format_file_size(attachment.size || 0);

  if ((attachment.type || "").startsWith("image/") && attachment.data_url) {
    const image = document.createElement("img");
    image.src = attachment.data_url;
    image.alt = attachment.name || "attachment";
    attachment_card.appendChild(image);
  } else if ((attachment.type || "").startsWith("video/") && attachment.data_url) {
    const video = document.createElement("video");
    video.src = attachment.data_url;
    video.controls = true;
    attachment_card.appendChild(video);
  } else if ((attachment.type || "").startsWith("audio/") && attachment.data_url) {
    const audio = document.createElement("audio");
    audio.src = attachment.data_url;
    audio.controls = true;
    attachment_card.appendChild(audio);
  }

  const attachment_link = document.createElement("a");
  attachment_link.className = "live_message_attachment_link";
  attachment_link.href = attachment.data_url || "#";
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
    day: "numeric"
  });
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

  selected_live_message_files = Array.from(dom_references.live_message_files_input.files || []);
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
  editing_live_message_id = null;
  editing_live_message_has_attachments = false;
  selected_live_message_files = [];
  dom_references.live_message_form.reset();
  dom_references.live_message_composer.classList.remove("is_editing");
  dom_references.live_message_files_input.disabled = false;
  dom_references.live_message_files_label.classList.remove("is_disabled");
  dom_references.live_message_files_preview.innerHTML = "";
  update_live_message_action_labels();
  hide_emoji_picker();
  auto_grow_live_message_input();
}

function start_live_message_edit(message_item) {
  clear_live_message_composer();
  editing_live_message_id = message_item.id;
  editing_live_message_has_attachments = Array.isArray(message_item.attachments) && message_item.attachments.length > 0;
  dom_references.live_message_composer.classList.add("is_editing");
  dom_references.live_message_files_input.disabled = true;
  dom_references.live_message_files_label.classList.add("is_disabled");
  dom_references.live_message_input.value = message_item.text || "";
  update_live_message_action_labels();
  auto_grow_live_message_input();
  dom_references.live_message_input.focus();
  const selection_end = dom_references.live_message_input.value.length;
  dom_references.live_message_input.setSelectionRange(selection_end, selection_end);
  dom_references.live_message_composer.scrollIntoView({ behavior: "smooth", block: "nearest" });
}

function handle_live_message_keydown(event) {
  if (event.key === "Escape" && editing_live_message_id) {
    clear_live_message_composer();
  }
}

async function edit_live_message(message_id) {
  const message_item = current_live_messages.find((item) => item.id === message_id);

  if (!message_item || !current_user_profile || message_item.sender_key !== current_user_profile.user_key) {
    return;
  }

  start_live_message_edit(message_item);
}

async function delete_live_message(message_id) {
  const message_item = current_live_messages.find((item) => item.id === message_id);

  if (!message_item || !current_user_profile || message_item.sender_key !== current_user_profile.user_key) {
    return;
  }

  const should_delete = typeof window.confirm === "function"
    ? window.confirm(translate("live_message_delete_confirm"))
    : true;

  if (!should_delete) {
    return;
  }

  const deleted_message = {
    ...message_item,
    text: deleted_live_message_marker,
    attachments: [],
    edited_at: new Date().toISOString()
  };

  if (is_supabase_enabled() && current_auth_user_id) {
    try {
      const { data, error } = await supabase_client
        .from(supabase_table_names.live_messages)
        .update({
          text: deleted_live_message_marker,
          attachments: [],
          edited_at: deleted_message.edited_at
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
      upsert_live_message(map_live_message_row_to_item(data || deleted_message), true);
      return;
    } catch (error) {
      log_app_error("supabase_live_message_delete_threw", error);
      // Local fallback below remains available.
    }
  }

  try {
    const response = await fetch(`/api/live_messages/${encodeURIComponent(message_id)}`, {
      method: "PATCH",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        sender_key: current_user_profile.user_key,
        text: deleted_live_message_marker,
        attachments: []
      })
    });

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

  const message_text = dom_references.live_message_input.value.trim();
  const files = [...selected_live_message_files];
  const is_editing_message = Boolean(editing_live_message_id);

  if (!message_text && files.length === 0 && !editing_live_message_has_attachments) {
    return;
  }

  if (is_editing_message) {
    const message_item = current_live_messages.find((item) => item.id === editing_live_message_id);

    if (!message_item || message_item.sender_key !== current_user_profile.user_key) {
      clear_live_message_composer();
      return;
    }

    const updated_message = {
      ...message_item,
      text: message_text,
      edited_at: new Date().toISOString()
    };

    dom_references.send_live_message_button.disabled = true;

    try {
      if (is_supabase_enabled() && current_auth_user_id) {
        const { data, error } = await supabase_client
          .from(supabase_table_names.live_messages)
          .update({
            text: message_text,
            edited_at: new Date().toISOString()
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

      const response = await fetch(`/api/live_messages/${encodeURIComponent(editing_live_message_id)}`, {
        method: "PATCH",
        headers: {
          "Content-Type": "application/json"
        },
        body: JSON.stringify({
          sender_key: current_user_profile.user_key,
          text: message_text
        })
      });

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

  const attachments = await Promise.all(files.map(read_file_as_attachment));
  const message_item = {
    id: create_item_id(),
    room_slug: current_room_slug,
    sender_key: current_user_profile.user_key,
    sender_name: current_user_profile.display_name,
    text: message_text,
    created_at: new Date().toISOString(),
    edited_at: null,
    attachments
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
      clear_live_message_composer();
      burst_reaction(dom_references.live_messages_list, "heart", 8);
      return;
    }

    const response = await fetch("/api/live_messages", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(message_item)
    });

    if (!response.ok) {
      throw new Error("message_send_failed");
    }

    const result = await response.json();
    upsert_live_message(result.message || message_item, true);
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
  return {
    name: file_item.name,
    type: file_item.type || "application/octet-stream",
    size: file_item.size || 0,
    data_url: await read_file_as_data_url(file_item)
  };
}

const fs = require("fs");
const path = require("path");

const data_directory = path.join(__dirname, "..", "data");
const files = {
  joy_en: path.join(data_directory, "daily_joy_messages.json"),
  joy_de: path.join(data_directory, "daily_joy_messages_de.json"),
  joy_ar: path.join(data_directory, "daily_joy_messages_ar.json"),
  love_en: path.join(data_directory, "daily_love_messages.json"),
  love_de: path.join(data_directory, "daily_love_messages_de.json"),
  love_ar: path.join(data_directory, "daily_love_messages_ar.json"),
  morning_en: path.join(data_directory, "morning_messages.json"),
  morning_de: path.join(data_directory, "morning_messages_de.json"),
  morning_ar: path.join(data_directory, "morning_messages_ar.json"),
  night_en: path.join(data_directory, "night_messages.json"),
  night_de: path.join(data_directory, "night_messages_de.json"),
  night_ar: path.join(data_directory, "night_messages_ar.json"),
  tale_en: path.join(data_directory, "night_tales.json"),
  tale_de: path.join(data_directory, "night_tales_de.json"),
  tale_ar: path.join(data_directory, "night_tales_ar.json")
};

const heart_emoji = "\u2764\uFE0F";
const kiss_heart_emoji = "\u{1F618}\u2764\uFE0F";

const JOY_COUNT = 1200;
const LOVE_COUNT = 960;
const MORNING_COUNT = 420;
const NIGHT_COUNT = 420;
const TALE_COUNT = 420;

function unique_messages(messages) {
  return Array.from(new Set(messages.map((message) => String(message).trim()).filter(Boolean)));
}

function seeded_shuffle(messages, seed_text) {
  const output = [...messages];
  let seed = Array.from(seed_text).reduce((total, character) => total + character.charCodeAt(0), 0);

  for (let index = output.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const swap_index = seed % (index + 1);
    [output[index], output[swap_index]] = [output[swap_index], output[index]];
  }

  return output;
}

function finalize(messages, count, seed_text) {
  return seeded_shuffle(unique_messages(messages), seed_text).slice(0, count);
}

function sentence_case(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toUpperCase() + text.slice(1);
}

function lower_first(text) {
  if (!text) {
    return "";
  }

  return text.charAt(0).toLowerCase() + text.slice(1);
}

function strip_leading_connector(text) {
  return String(text || "")
    .replace(/^\s*(and then|then|und dann|ثم)\s+/i, "")
    .trim();
}

function build_joy_story(opener, setup, twist, ending, variant_index) {
  const clean_twist = strip_leading_connector(twist);

  switch (variant_index % 6) {
    case 1:
      return `${opener}: ${setup}. ${sentence_case(clean_twist)}. ${ending}`;
    case 2:
      return `${opener}:\n${setup}; ${clean_twist}. ${ending}`;
    case 3:
      return `${setup}, ${twist}. ${opener}. ${ending}`;
    case 4:
      return `${opener}: ${setup}. ${ending} ${sentence_case(clean_twist)}.`;
    case 5:
      return `${opener}: ${setup}, ${twist}; ${lower_first(ending)}`;
    default:
      return `${opener}: ${setup}, ${twist}. ${ending}`;
  }
}

const content = {
  en: {
    joy_seed: [
      "Today’s tiny truth: the alarm clock and I are no longer on speaking terms.",
      "I tried to be a dignified adult today. Then the supermarket played a love song and I smiled at a shelf of tomatoes.",
      "Harmless prank idea: send, 'I have shocking news,' then reveal that the shocking news is your toast betrayed you again.",
      "The most unrealistic thing in modern life is a recipe saying, 'let it cool for five minutes,' as if anyone has that kind of patience.",
      "I opened the fridge three times today as if the fourth visit might reveal a new personality and better snacks.",
      "My coffee worked very hard this morning, and I still think one good laugh did more for me.",
      "A responsible person made a schedule for today. I respected it so much that I ignored it gently.",
      "The laundry looked at me today with the confidence of a task that knows it will win."
    ],
    joy_openers: [
      "A tiny scene from today",
      "Today briefly became a comedy scene",
      "A little plot twist from real life",
      "The afternoon entered wearing dramatic shoes",
      "A small episode from the day",
      "The ordinary day forgot how to be ordinary",
      "A pocket-sized story from today",
      "The day handed me a ridiculous scene",
      "A soft comedy scene for today",
      "Today's tiny movie moment"
    ],
    joy_setups: [
      "I tried to behave like a serious adult",
      "I entered the day with a plan and suspicious confidence",
      "I opened my messages meaning to say one calm sentence",
      "I looked at my to-do list as if mutual respect existed between us",
      "I told myself I would be productive before becoming dramatic",
      "I thought one cup of coffee would solve the whole personality",
      "I trusted my memory for absolutely no good reason",
      "I went to the store for one thing and somehow came back with six feelings",
      "I sat down for five minutes and accidentally began a full negotiation with my own laziness",
      "I decided this would be the day I finally stop being ridiculous"
    ],
    joy_twists: [
      "and then life immediately replied with a joke louder than my plan",
      "and then one small thing happened and the whole day lost its posture",
      "and then my own brain changed sides and joined the comedy",
      "and then the room looked at me like, 'really, this is your strategy?'",
      "and then I managed to defeat myself before breakfast was even over",
      "and then everything became slightly funnier and much less under control",
      "and then even the furniture seemed disappointed in my decision making",
      "and then the universe politely reminded me that dignity is seasonal",
      "and then the entire situation turned into material for tomorrow’s embarrassment",
      "and then my last bit of seriousness slipped on a metaphorical banana peel"
    ],
    joy_endings: [
      "At this point I deserve either applause or supervision.",
      "So yes, things are going beautifully if we define beautifully very loosely.",
      "I am choosing to call it charm, because the truth sounds less elegant.",
      "The good news is that I laughed. The bad news is that witnesses existed.",
      "It was not my strongest moment, but it was definitely one of my most memorable.",
      "I survived, but my dignity left by a side door.",
      "This is why no one should leave me alone with thoughts before noon.",
      "Honestly, the whole day needed background music and a camera crew.",
      "If confidence were electricity, I definitely had a power cut.",
      "I would like this event removed from the official record."
    ],
    joy_prank_leads: [
      "Harmless prank idea",
      "Soft little joke for today",
      "Message idea if you want a laugh",
      "Tiny theatrical move",
      "A playful line for the day",
      "If mischief feels appropriate today",
      "Here is a small harmless trap",
      "One line that could get a smile"
    ],
    joy_prank_messages: [
      "write, 'We need to discuss something urgent.'",
      "send, 'I have a confession.'",
      "open with, 'Please stay calm.'",
      "text, 'I made a serious mistake.'",
      "send, 'You should probably sit down for this.'",
      "write, 'I have difficult news from the kitchen.'",
      "start with, 'I need emotional support.'",
      "message, 'I am not proud of what happened.'"
    ],
    joy_prank_reveals: [
      "Then reveal that the urgent matter is a biscuit falling tragically into tea.",
      "Then confess that your big mistake was trusting one weak shopping bag with the fate of six oranges.",
      "Then explain that you were emotionally defeated by a fitted bedsheet again.",
      "Then admit the only crisis is that you waved politely at someone who was not waving at you.",
      "Then say the breaking news is that your socks continue to disappear with criminal confidence.",
      "Then explain that the difficult news is your coffee cooled down while you were being dramatic.",
      "Then reveal you only needed support because a jar made direct eye contact and still refused to open.",
      "Then confess that the whole scandal is you trying to remember why you entered the room in the first place."
    ],
    joy_dialogue_a: [
      "Me",
      "My brain",
      "My coffee",
      "My alarm clock",
      "My to-do list",
      "The mirror this morning",
      "My last bit of discipline",
      "My kitchen"
    ],
    joy_dialogue_b: [
      "today we will be calm",
      "we should act mature now",
      "please behave normally for once",
      "let us make one sensible decision",
      "we are absolutely staying focused",
      "dignity is still possible",
      "there is no need for drama",
      "this will be easy"
    ],
    joy_dialogue_c: [
      "Five minutes later: absolutely not.",
      "Reality: that speech had a very short life.",
      "My actual day: a completely different creative direction.",
      "Then one small inconvenience entered and won immediately.",
      "I would like to report a total collapse of the original plan.",
      "Everything after that sentence became comedy.",
      "The universe heard that and started laughing first.",
      "That was an optimistic thing to say, in hindsight."
    ],
    love_seed: [
      `If only I could kidnap you into our little universe, even Google would not be able to find you. ${heart_emoji}`,
      `Svetlana, you are my soulmate, my closest best friend, my peace, and the person my heart trusts most in this world. ${heart_emoji}`,
      `The truth is simple with you: I do not just love you, I feel at home in you. ${heart_emoji}`,
      `When I think of the gentlest part of life, your name arrives before the thought is even finished. ${heart_emoji}`
    ],
    love_addresses: [
      "My beautiful Svetlana",
      "My angel",
      "My soulmate",
      "My precious girl",
      "My closest heart",
      "My lovely queen",
      "My best friend and my love",
      "Svetlana, my home",
      "My dearest one",
      "My heart"
    ],
    love_truths: [
      "you are the one my heart returns to without hesitation",
      "you are the person who makes even ordinary days feel full",
      "you are not only loved by me, you are deeply relied on by my soul",
      "you are the soft place in me that life itself cannot replace",
      "you are the person I want beside me in joy, silence, stress, and peace",
      "you are the rare kind of love that feels honest, safe, and alive all at once",
      "you are my favorite comfort and my favorite wonder at the same time",
      "you are the one who turns longing into tenderness instead of pain",
      "you are family to my heart in the truest sense",
      "you are the person who made my love feel serious, warm, and real"
    ],
    love_depths: [
      "I miss you in the middle of good days and think of you in the quiet after them",
      "even when I am smiling at other things, some part of me is still smiling toward you",
      "you make my heart feel understood in a way that gives me peace",
      "when life gets noisy, the thought of you still knows how to calm me",
      "you are the one I want to tell everything to first and hide beside second",
      "I never feel the need to pretend with you, and that is one of the most precious things I know",
      "loving you has made my world softer without making it smaller",
      "the more I know you, the more grateful I become that you exist exactly as you are",
      "you make affection feel easy and loyalty feel natural",
      "there are days when one memory of you changes the whole temperature of my heart"
    ],
    love_wishes: [
      "I hope you always feel how carefully and steadily I love you.",
      "I want your heart to feel safe in mine for a very long time.",
      "I hope life gives me endless chances to keep proving this love to you.",
      "I want to be gentle with everything you trust me with.",
      "I hope you never doubt how cherished you are by me.",
      "I want to keep choosing you with the same certainty every day.",
      "I hope you always remember that you are one of the best things that ever happened to me.",
      "I want to keep being a place where your heart can rest.",
      "I hope the love I give you always feels honest and full.",
      "I want to spend a lifetime still finding new reasons to adore you."
    ],
    morning_greetings: [
      "Good morning, my beautiful queen Svetlana.",
      "Good morning, my angel.",
      "Good morning, my precious girl.",
      "Good morning, my lovely heart."
    ],
    morning_openings: [
      "It is me, your Diab.",
      "I wanted your day to begin with warmth from me.",
      "Before the world gets loud, I wanted to reach you first.",
      "I wanted you to wake up and find something soft from my heart waiting for you."
    ],
    morning_truths: [
      "You mean more to me than I can ever fully say in one message.",
      "You are one of the rarest blessings in my life, and I never forget that.",
      "I want you to start today knowing that you are deeply admired, deeply valued, and deeply loved.",
      "The thought of you gives the whole morning a warmer color.",
      "You are not just special to me, you are woven into the way I move through the day."
    ],
    morning_wishes: [
      "I hope your day is filled with ease, success, and the kind of moments that make you smile without forcing it.",
      "May everything go smoothly for you today, and may life treat you with kindness and good fortune.",
      "I hope your heart feels light today and that your efforts are rewarded beautifully.",
      "May this day open gently for you and give you reasons to feel proud of yourself.",
      "I hope today brings you peace of mind, lovely surprises, and quiet confidence."
    ],
    morning_cares: [
      "Please take care of yourself for me, eat well, drink enough, and do not skip what your body needs.",
      "Be gentle with yourself today, my love. Rest when you can, breathe well, and do not neglect yourself.",
      "Take good care of my most precious girl today. I want you fed, hydrated, steady, and smiling.",
      "Please remember that caring for yourself matters to me more than you probably realize.",
      "I need you to be kind to your own heart and body today, because both of them are precious to me."
    ],
    morning_teases: [
      "And if you do not, I may have to come over and complain in person with unreasonable affection.",
      "Do not test me on this, because I can become very dramatic when I worry about you.",
      "I am saying this lovingly, but with enough seriousness to make you listen.",
      "Please cooperate with my concern and save me from becoming theatrical about it.",
      "Otherwise I will be forced to launch a fully unnecessary but heartfelt campaign of reminders."
    ],
    morning_closings: [
      "Walk into your day knowing that my heart is with you.",
      "Go shine, my queen. You deserve a beautiful day.",
      "Carry my love with you quietly through every hour.",
      "Have a lovely day, my angel. I am proud of you already.",
      "Take care, my beautiful girl. You are loved more than words manage."
    ],
    night_greetings: [
      "Good night, my star Svetlana.",
      "Good night, my beautiful queen.",
      "Good night, my angel.",
      "Good night, my precious love."
    ],
    night_openings: [
      "I hope tonight wraps itself around you gently and gives you the deep calm your heart deserves.",
      "I want this night to be soft with you and kind to every tired part of you.",
      "May sleep come to you easily tonight and leave peace behind in every corner of your heart.",
      "I hope the night carries away the noise of the day and keeps only the tenderness."
    ],
    night_confessions: [
      "Maybe I say too much sometimes, but I only do that because my heart never feels small when it comes to you.",
      "When I write to you at night, it is because love becomes even more honest in quiet hours.",
      "I cannot keep my feelings for you neat and short, because they simply are not neat and short.",
      "There is something about you that makes my heart overflow instead of whisper."
    ],
    night_imaginings: [
      "Close your eyes for a moment and imagine me there, standing near, holding you gently and kissing your sweet cheeks before sleep.",
      "If I could be with you right now, I would stay close, keep you warm, and let you fall asleep feeling only peace.",
      "I wish I could be beside you tonight just to hold you softly and make the whole room feel safer.",
      "In my heart, I am already there with you, quiet and close, watching over your calm."
    ],
    night_watches: [
      "I think I could stay there forever just looking at your beautiful face as it grows peaceful.",
      "There is such a beautiful feeling in imagining you drifting to sleep while feeling fully loved.",
      "I would gladly guard your rest as if it were the most precious thing in the world.",
      "Nothing sounds gentler to me than your heart finding real peace at the end of the day."
    ],
    night_closings: [
      "Sleep softly, my love, and let the last thing you feel tonight be love.",
      "Sweet dreams, my angel, and let your sleep carry you somewhere warm and safe.",
      "Rest deeply, my queen, and wake up tomorrow with a lighter heart.",
      "Sleep peacefully, my beautiful girl, knowing how truly loved you are."
    ],
    tale_characters: [
      "a watchmaker",
      "a bookseller",
      "a tailor",
      "a baker",
      "a mapmaker",
      "a pianist",
      "a lamp maker",
      "a letter writer"
    ],
    tale_quirks: [
      "who could repair everything except the small chaos in his own room",
      "who remembered every important detail except where the keys had gone",
      "who spoke beautifully in public and got tangled in ordinary conversations",
      "who was famous for being early to work and late to dinner",
      "who could calm strangers but not quiet a stubborn teacup on the shelf",
      "who kept every promise carefully but still lost umbrellas in clear weather",
      "who believed silence solved most things and laughter solved the rest",
      "who looked perfectly organized until someone opened the wrong drawer"
    ],
    tale_meetings: [
      "One evening that person met someone at a quiet shop door just as both of them were pretending to know exactly what they were doing.",
      "One night a stranger arrived with a problem so small and so strange that laughing became the only respectable response.",
      "One rainy evening another soul appeared carrying the exact kind of trouble that sounded foolish and familiar at once.",
      "At the edge of closing time, someone knocked gently and accidentally brought a whole new chapter with them.",
      "Near midnight, a second wandering heart arrived with a story that felt like a mirror and a joke at the same time.",
      "One moonlit evening, a visitor paused under the window and asked a question so honest that neither of them could stay formal.",
      "As the street grew quiet, another tired person appeared carrying one missing button, one crooked sentence, and excellent comic timing.",
      "Just when the day had almost ended, a stranger stepped in and turned awkwardness into company."
    ],
    tale_turns: [
      "They sat down, shared the embarrassment honestly, and discovered that being understood is often only one laugh away.",
      "By the time the lamps burned low, the problem had not become serious at all; it had become a story worth keeping.",
      "They laughed so much at their own ridiculous habits that the room itself seemed warmer than before.",
      "Instead of solving everything, they chose to stay, talk, and make the whole inconvenience feel smaller together.",
      "What began as a little inconvenience slowly turned into the kind of memory people retell because it still feels warm years later.",
      "The night did not become perfect, but it became gentle, and that was somehow even better.",
      "Without planning it, they gave each other the one thing both had needed most: easy company.",
      "Neither of them fixed the whole world, but both of them went home lighter."
    ],
    tale_lessons: [
      "From then on, the street slept better, because even its clumsiest souls knew they were not alone.",
      "And that is how the whole neighborhood learned that affection often enters wearing the shoes of comedy.",
      "After that, even the clocks in the town seemed less strict about small mistakes.",
      "So the night kept its softness, and the story stayed kind enough to tell again.",
      "By morning, the world looked exactly the same, but both hearts had become easier to carry.",
      "The moon kept the rest of the joke to itself, but everyone agreed the ending felt right.",
      "That night nothing grand happened, only something gentle, which was more than enough.",
      "And so the story ended the way good bedtime stories should: with peace arriving quietly."
    ],
    tale_opener: "Once upon a time",
    tale_intro_phrase: "there was"
  },
  de: {
    joy_seed: [
      "Die kleine Wahrheit des Tages: Der Wecker und ich pflegen gerade eine stille Trennung.",
      "Ich wollte heute ein würdevoller Erwachsener sein. Dann spielte im Supermarkt ein Liebeslied und ich grinste Tomaten an.",
      "Harmlose Streichidee: Schreib, 'Ich habe schockierende Neuigkeiten', und enthülle dann, dass dein Toast dich wieder verraten hat.",
      "Das Unwirklichste an Rezepten ist der Satz: 'Fünf Minuten abkühlen lassen', als hätte irgendwer so eine Geduld.",
      "Ich habe heute dreimal den Kühlschrank geöffnet, als würde beim vierten Versuch eine bessere Zukunft drinstehen.",
      "Mein Kaffee hat heute alles gegeben, aber ein einziges echtes Lachen war trotzdem wirksamer.",
      "Ein verantwortungsvoller Mensch hat heute einen Plan gemacht. Ich habe ihn respektvoll ignoriert.",
      "Die Wäsche sah mich heute mit der Selbstsicherheit einer Aufgabe an, die weiß, dass sie gewinnen wird."
    ],
    joy_openers: [
      "Kleiner Bericht aus dem echten Leben",
      "Kleiner Skandal des Tages",
      "Frische Absurdität aus meinem Alltag",
      "Leiser Drama-Bericht",
      "Tagesmeldung aus dem menschlichen Zirkus",
      "Kurzer Komödienhinweis",
      "Gerade eben passierte etwas Lächerliches",
      "Bitte genieße dieses kleine Desaster"
    ],
    joy_setups: [
      "Ich wollte mich wie ein ernsthafter Erwachsener benehmen",
      "Ich bin mit einem Plan und verdächtig viel Selbstvertrauen in den Tag gegangen",
      "Ich öffnete meine Nachrichten mit dem Vorsatz, genau einen ruhigen Satz zu schreiben",
      "Ich sah meine To-do-Liste an, als gäbe es gegenseitigen Respekt zwischen uns",
      "Ich sagte mir, ich werde erst produktiv und später dramatisch",
      "Ich glaubte, eine Tasse Kaffee würde das ganze Wesen regeln",
      "Ich vertraute meinem Gedächtnis aus absolut keinem vernünftigen Grund",
      "Ich setzte mich für fünf Minuten hin und begann versehentlich Verhandlungen mit meiner Faulheit"
    ],
    joy_twists: [
      "und dann antwortete das Leben sofort mit einem besseren Witz als meinem Plan",
      "und dann verlor der ganze Tag durch eine Kleinigkeit seine Haltung",
      "und dann wechselte mein eigenes Gehirn die Seite und schloss sich der Komödie an",
      "und dann sah der Raum mich an, als wolle er sagen: wirklich, das ist deine Strategie",
      "und dann schlug ich mich selbst noch vor dem Frühstück",
      "und dann wurde alles etwas lustiger und deutlich weniger kontrolliert",
      "und dann erinnerte mich das Universum höflich daran, dass Würde saisonal ist",
      "und dann rutschte mein letzter Rest Ernsthaftigkeit auf einer metaphorischen Bananenschale aus"
    ],
    joy_endings: [
      "Ich verdiene an dieser Stelle entweder Applaus oder Aufsicht.",
      "Es läuft also großartig, wenn wir großartig sehr locker definieren.",
      "Ich nenne es einfach Charme, denn die Wahrheit klingt unvorteilhafter.",
      "Die gute Nachricht ist, dass ich gelacht habe. Die schlechte ist, dass Zeugen existierten.",
      "Es war nicht mein stärkster Moment, aber definitiv einer meiner merkbarsten.",
      "Ich habe überlebt, aber meine Würde verließ das Gebäude durch einen Seitenausgang.",
      "Darum sollte man mich vor Mittag nicht allein mit Gedanken lassen.",
      "Die ganze Szene brauchte eigentlich Hintergrundmusik und eine Kamera."
    ],
    joy_prank_leads: [
      "Harmlose Streichidee",
      "Kleiner Scherz für heute",
      "Nachrichtenidee für ein Lächeln",
      "Mini-Auftritt für zwischendurch",
      "Ein verspielter Satz für heute",
      "Falls heute etwas Unfug passt",
      "Hier ist eine kleine harmlose Falle",
      "Eine Zeile, die ein Grinsen bringen könnte"
    ],
    joy_prank_messages: [
      "schreib: 'Wir müssen dringend etwas besprechen.'",
      "sende: 'Ich habe ein Geständnis.'",
      "beginne mit: 'Bitte bleib ruhig.'",
      "schreib: 'Ich habe einen ernsten Fehler gemacht.'",
      "sende: 'Du solltest dich vielleicht hinsetzen.'",
      "schreib: 'Es gibt schlechte Nachrichten aus der Küche.'",
      "beginne mit: 'Ich brauche emotionale Unterstützung.'",
      "schreib: 'Ich bin nicht stolz auf das, was passiert ist.'"
    ],
    joy_prank_reveals: [
      "Dann enthülle, dass die dringende Sache nur ein Keks ist, der tragisch in den Tee gefallen ist.",
      "Dann gesteh, dass der große Fehler darin bestand, sechs Orangen einer schwachen Einkaufstasche anzuvertrauen.",
      "Dann gib zu, dass du wieder gegen ein Spannbettlaken verloren hast.",
      "Dann sag, die Krise sei nur, dass du jemandem höflich zurückgewinkt hast, der gar nicht dir gewinkt hat.",
      "Dann enthülle, dass deine Socken weiterhin mit krimineller Sicherheit verschwinden.",
      "Dann erkläre, die schlechten Nachrichten seien, dass dein Kaffee kalt wurde, während du dramatisch warst.",
      "Dann sag, du brauchtest nur Unterstützung, weil ein Einmachglas direkten Augenkontakt hielt und sich trotzdem nicht öffnen ließ.",
      "Dann gesteh, dass der ganze Skandal nur daraus besteht, nicht mehr zu wissen, warum du den Raum betreten hast."
    ],
    joy_dialogue_a: [
      "Ich",
      "Mein Gehirn",
      "Mein Kaffee",
      "Mein Wecker",
      "Meine To-do-Liste",
      "Der Spiegel heute Morgen",
      "Mein letzter Rest Disziplin",
      "Meine Küche"
    ],
    joy_dialogue_b: [
      "heute bleiben wir ruhig",
      "wir benehmen uns jetzt reif",
      "bitte sei ausnahmsweise normal",
      "wir treffen genau eine vernünftige Entscheidung",
      "wir bleiben absolut fokussiert",
      "Würde ist noch möglich",
      "es gibt keinen Grund für Drama",
      "das wird ganz leicht"
    ],
    joy_dialogue_c: [
      "Fünf Minuten später: ganz sicher nicht.",
      "Die Realität: Dieser Satz hatte ein sehr kurzes Leben.",
      "Mein eigentlicher Tag: komplett anderes kreatives Konzept.",
      "Dann kam eine kleine Unannehmlichkeit herein und gewann sofort.",
      "Ich möchte den vollständigen Zusammenbruch des ursprünglichen Plans melden.",
      "Ab diesem Satz wurde alles Komödie.",
      "Das Universum hörte das und begann zuerst zu lachen.",
      "Rückblickend war das sehr optimistisch formuliert."
    ],
    love_seed: [
      `Wenn ich dich nur in unser kleines Universum entführen könnte, würde dich nicht einmal Google finden. ${heart_emoji}`,
      `Svetlana, du bist meine Seelenverwandte, meine engste beste Freundin, mein Frieden und der Mensch, dem mein Herz am meisten vertraut. ${heart_emoji}`,
      `Die Wahrheit mit dir ist einfach: Ich liebe dich nicht nur, ich fühle mich in dir zuhause. ${heart_emoji}`,
      `Wenn ich an den sanftesten Teil des Lebens denke, kommt dein Name schon, bevor der Gedanke zu Ende ist. ${heart_emoji}`
    ],
    love_addresses: [
      "Meine schöne Svetlana",
      "Mein Engel",
      "Meine Seelenverwandte",
      "Mein kostbares Mädchen",
      "Mein nahes Herz",
      "Meine liebe Königin",
      "Meine beste Freundin und meine Liebe",
      "Svetlana, mein Zuhause",
      "Mein liebster Mensch",
      "Mein Herz"
    ],
    love_truths: [
      "du bist die eine, zu der mein Herz ohne Zögern zurückkehrt",
      "du bist der Mensch, der selbst gewöhnliche Tage voller macht",
      "du wirst von mir nicht nur geliebt, du wirst von meiner Seele getragen",
      "du bist der weiche Ort in mir, den das Leben selbst nicht ersetzen kann",
      "du bist die Person, die ich in Freude, Stille, Stress und Frieden neben mir will",
      "du bist die seltene Art von Liebe, die ehrlich, sicher und lebendig zugleich wirkt",
      "du bist mein liebster Trost und mein liebstes Wunder zur selben Zeit",
      "du bist diejenige, die Sehnsucht in Zärtlichkeit verwandelt statt in Schmerz",
      "du bist Familie für mein Herz im wahrsten Sinn",
      "du bist die Frau, durch die meine Liebe ernst, warm und echt geworden ist"
    ],
    love_depths: [
      "ich vermisse dich mitten in guten Tagen und denke an dich in der Stille danach",
      "selbst wenn ich über andere Dinge lächle, lächelt ein Teil von mir immer noch zu dir",
      "du gibst meinem Herzen das Gefühl, verstanden zu sein, und das schenkt mir Frieden",
      "wenn das Leben laut wird, weiß der Gedanke an dich mich immer noch zu beruhigen",
      "du bist die Person, der ich alles zuerst erzählen und an die ich mich danach anlehnen will",
      "bei dir muss ich nichts spielen, und genau das ist für mich unendlich kostbar",
      "dich zu lieben hat meine Welt weicher gemacht, ohne sie kleiner zu machen",
      "je mehr ich dich kenne, desto dankbarer bin ich, dass du genauso existierst",
      "du machst Zuneigung leicht und Loyalität selbstverständlich",
      "es gibt Tage, da verändert eine einzige Erinnerung an dich die ganze Temperatur meines Herzens"
    ],
    love_wishes: [
      "Ich hoffe, du spürst immer, wie sorgfältig und stetig ich dich liebe.",
      "Ich möchte, dass dein Herz sich in meinem für lange Zeit sicher fühlen kann.",
      "Ich hoffe, das Leben schenkt mir endlos viele Chancen, dir diese Liebe zu zeigen.",
      "Ich will mit allem sanft sein, was du mir anvertraust.",
      "Ich hoffe, du zweifelst nie daran, wie geschätzt du von mir bist.",
      "Ich will dich jeden Tag mit derselben Sicherheit weiter wählen.",
      "Ich hoffe, du erinnerst dich immer daran, dass du zu den besten Dingen meines Lebens gehörst.",
      "Ich möchte ein Ort bleiben, an dem dein Herz ausruhen kann.",
      "Ich hoffe, die Liebe, die ich dir gebe, fühlt sich immer ehrlich und voll an.",
      "Ich möchte ein Leben lang neue Gründe finden, dich zu bewundern."
    ],
    morning_greetings: [
      "Guten Morgen, meine wunderschöne Königin Svetlana.",
      "Guten Morgen, mein Engel.",
      "Guten Morgen, mein kostbares Mädchen.",
      "Guten Morgen, mein liebes Herz."
    ],
    morning_openings: [
      "Hier ist dein Diab.",
      "Ich wollte, dass dein Tag mit etwas Wärme von mir beginnt.",
      "Bevor die Welt laut wird, wollte ich dich zuerst erreichen.",
      "Ich wollte, dass du aufwachst und etwas Weiches von meinem Herzen findest."
    ],
    morning_truths: [
      "Du bedeutest mir mehr, als ich je in einer einzigen Nachricht ganz sagen könnte.",
      "Du bist einer der seltensten Segnungen in meinem Leben, und das vergesse ich nie.",
      "Ich möchte, dass du heute mit dem Wissen beginnst, dass du tief bewundert, tief geschätzt und tief geliebt wirst.",
      "Der Gedanke an dich gibt dem ganzen Morgen eine wärmere Farbe.",
      "Du bist nicht nur etwas Besonderes für mich, du bist in die Art eingewebt, wie ich durch meinen Tag gehe."
    ],
    morning_wishes: [
      "Ich hoffe, dein Tag ist voller Leichtigkeit, Erfolg und solcher Momente, die dir ein echtes Lächeln schenken.",
      "Möge heute alles für dich weich laufen, und möge das Leben dich mit Freundlichkeit und Glück behandeln.",
      "Ich hoffe, dein Herz fühlt sich heute leicht an und deine Mühe wird schön belohnt.",
      "Möge dieser Tag sich sanft für dich öffnen und dir Gründe geben, stolz auf dich zu sein.",
      "Ich hoffe, heute bringt dir Ruhe im Kopf, schöne Überraschungen und stilles Selbstvertrauen."
    ],
    morning_cares: [
      "Bitte pass heute gut auf dich auf, iss ordentlich, trink genug und überspringe nicht, was dein Körper braucht.",
      "Sei heute sanft mit dir selbst, meine Liebe. Ruhe dich aus, wenn du kannst, atme gut und vergiss dich nicht.",
      "Kümmere dich heute gut um mein kostbarstes Mädchen. Ich will dich satt, hydriert, stabil und lächelnd wissen.",
      "Bitte denk daran, dass mir deine Fürsorge für dich selbst wichtiger ist, als du vielleicht ahnst.",
      "Ich brauche, dass du heute freundlich zu deinem eigenen Herzen und Körper bist, denn beides ist mir kostbar."
    ],
    morning_teases: [
      "Und wenn nicht, muss ich wohl persönlich vorbeikommen und mich mit übertriebener Zuneigung beschweren.",
      "Teste mich damit lieber nicht, denn ich kann sehr dramatisch werden, wenn ich mir Sorgen um dich mache.",
      "Ich sage das liebevoll, aber mit genug Ernst, dass du besser hörst.",
      "Bitte arbeite mit meiner Fürsorge zusammen und bewahre mich vor unnötigem Theater.",
      "Sonst bin ich gezwungen, eine völlig überflüssige, aber herzliche Erinnerungs-Kampagne zu starten."
    ],
    morning_closings: [
      "Geh in deinen Tag mit dem Wissen, dass mein Herz bei dir ist.",
      "Geh strahlen, meine Königin. Du verdienst einen schönen Tag.",
      "Trag meine Liebe leise durch jede Stunde mit dir.",
      "Hab einen wunderbaren Tag, mein Engel. Ich bin jetzt schon stolz auf dich.",
      "Pass auf dich auf, mein schönes Mädchen. Du wirst mehr geliebt, als Worte es schaffen."
    ],
    night_greetings: [
      "Gute Nacht, mein Stern Svetlana.",
      "Gute Nacht, meine wunderschöne Königin.",
      "Gute Nacht, mein Engel.",
      "Gute Nacht, meine kostbare Liebe."
    ],
    night_openings: [
      "Ich hoffe, diese Nacht legt sich sanft um dich und schenkt dir die tiefe Ruhe, die dein Herz verdient.",
      "Ich möchte, dass die Nacht mit dir weich umgeht und jedem müden Teil von dir Frieden gibt.",
      "Möge der Schlaf heute leicht zu dir kommen und in jeder Ecke deines Herzens Ruhe hinterlassen.",
      "Ich hoffe, die Nacht nimmt den Lärm des Tages mit und lässt nur die Zärtlichkeit zurück."
    ],
    night_confessions: [
      "Vielleicht sage ich manchmal zu viel, aber nur, weil mein Herz bei dir nie klein fühlt.",
      "Wenn ich dir nachts schreibe, dann weil Liebe in der Stille noch ehrlicher wird.",
      "Ich kann meine Gefühle für dich nicht ordentlich und kurz halten, weil sie einfach nicht ordentlich und kurz sind.",
      "Es gibt etwas an dir, das mein Herz überlaufen lässt statt zu flüstern."
    ],
    night_imaginings: [
      "Schließ für einen Moment die Augen und stell dir vor, ich wäre da, nahe bei dir, hielte dich sanft und küsste deine süßen Wangen vor dem Schlaf.",
      "Wenn ich jetzt bei dir sein könnte, würde ich nah bleiben, dich warm halten und dich nur Frieden fühlen lassen.",
      "Ich wünschte, ich könnte heute Nacht neben dir sein, dich weich halten und den ganzen Raum sicherer machen.",
      "In meinem Herzen bin ich schon bei dir, still und nah, und ich wache über deine Ruhe."
    ],
    night_watches: [
      "Ich glaube, ich könnte ewig dort bleiben und nur dein schönes Gesicht betrachten, wie es friedlich wird.",
      "Es gibt ein wunderschönes Gefühl darin, dich einschlafen zu sehen, während du dich vollkommen geliebt fühlst.",
      "Ich würde deinen Schlaf bewachen, als wäre er das Wertvollste auf der Welt.",
      "Nichts klingt sanfter für mich, als dein Herz am Ende des Tages echten Frieden finden zu sehen."
    ],
    night_closings: [
      "Schlaf weich, meine Liebe, und lass das Letzte, was du heute fühlst, Liebe sein.",
      "Süße Träume, mein Engel, und lass den Schlaf dich an einen warmen, sicheren Ort tragen.",
      "Ruhe tief, meine Königin, und wach morgen mit einem leichteren Herzen auf.",
      "Schlaf friedlich, mein schönes Mädchen, und wisse, wie aufrichtig du geliebt wirst."
    ],
    tale_characters: [
      "ein Uhrmacher",
      "eine Buchhändlerin",
      "ein Schneider",
      "eine Bäckerin",
      "ein Kartenzeichner",
      "eine Pianistin",
      "ein Lampenmacher",
      "eine Briefschreiberin"
    ],
    tale_quirks: [
      "der alles reparieren konnte außer dem kleinen Chaos im eigenen Zimmer",
      "die jedes wichtige Detail behielt außer dem Ort, an dem die Schlüssel lagen",
      "der öffentlich wunderschön sprach und sich in gewöhnlichen Gesprächen verhedderte",
      "die pünktlich zur Arbeit und zuverlässig zu spät zum Abendessen kam",
      "der Fremde beruhigen konnte, aber keine eigensinnige Teetasse auf dem Regal",
      "die jedes Versprechen hielt und trotzdem Regenschirme bei gutem Wetter verlor",
      "der glaubte, Schweigen löse das meiste und Lachen den Rest",
      "die vollkommen organisiert wirkte, bis jemand die falsche Schublade öffnete"
    ],
    tale_meetings: [
      "Eines Abends traf diese Person an einer stillen Ladentür jemanden, der genauso tat, als wüsste er genau, was er tue.",
      "Eines Nachts kam ein Fremder mit einem so kleinen und merkwürdigen Problem, dass Lachen die einzig respektable Antwort blieb.",
      "An einem regnerischen Abend erschien eine zweite Seele mit genau der Art von Schwierigkeit, die zugleich albern und vertraut klang.",
      "Kurz vor Ladenschluss klopfte jemand leise an und brachte versehentlich ein ganz neues Kapitel mit.",
      "Gegen Mitternacht kam ein anderes wanderndes Herz mit einer Geschichte, die gleichzeitig Spiegel und Witz war.",
      "Unter dem Mond blieb ein Besucher unter dem Fenster stehen und stellte eine Frage, die so ehrlich war, dass Förmlichkeit unmöglich wurde.",
      "Als die Straße still wurde, kam noch jemand müde vorbei mit einem fehlenden Knopf, einem schiefen Satz und ausgezeichnetem Timing.",
      "Gerade als der Tag fast zu Ende war, trat ein Fremder ein und verwandelte Verlegenheit in Gesellschaft."
    ],
    tale_turns: [
      "Sie setzten sich, erzählten ihre Peinlichkeiten ehrlich und entdeckten, dass Verstandenwerden oft nur ein Lachen entfernt ist.",
      "Als die Lampen tiefer brannten, war das Problem nicht ernst geworden, sondern zu einer Geschichte, die man behalten wollte.",
      "Sie lachten so sehr über ihre eigenen merkwürdigen Gewohnheiten, dass selbst der Raum wärmer wirkte.",
      "Statt alles zu lösen, blieben sie einfach, redeten, und machten die ganze Unannehmlichkeit zusammen kleiner.",
      "Was als kleines Ärgernis begann, wurde langsam zu einer Erinnerung, die man Jahre später noch gern erzählt.",
      "Die Nacht wurde nicht perfekt, aber sanft, und das war irgendwie noch besser.",
      "Ohne es zu planen, gaben sie einander genau das, was beide am meisten gebraucht hatten: leichte Gesellschaft.",
      "Keiner von beiden reparierte die ganze Welt, aber beide gingen leichter nach Hause."
    ],
    tale_lessons: [
      "Von da an schlief die Straße besser, weil selbst ihre zerstreutesten Seelen wussten, dass sie nicht allein waren.",
      "Und so lernte die ganze Nachbarschaft, dass Zuneigung oft in den Schuhen der Komödie hereinkommt.",
      "Danach waren sogar die Uhren der Stadt weniger streng mit kleinen Fehlern.",
      "So blieb die Nacht weich, und die Geschichte freundlich genug, um wieder erzählt zu werden.",
      "Am Morgen sah die Welt genauso aus, aber beide Herzen waren leichter zu tragen.",
      "Den Rest des Witzes behielt der Mond für sich, aber alle fanden das Ende richtig.",
      "In dieser Nacht geschah nichts Großes, nur etwas Sanftes, und das war mehr als genug.",
      "Und so endete die Geschichte, wie gute Gute-Nacht-Geschichten enden sollen: mit Frieden, der leise ankommt."
    ],
    tale_opener: "Es war einmal",
    tale_intro_phrase: ""
  },
  ar: {
    joy_seed: [
      "حقيقة اليوم الصغيرة: المنبه وأنا لم نعد في علاقة محترمة.",
      "كنت أنوي أن أكون شخصاً وقوراً اليوم، ثم سمعت أغنية حب في السوق وابتسمت لرف الطماطم.",
      "فكرة مقلب لطيفة: أرسل، 'لدي خبر صادم'، ثم اكشف أن الخبر فقط هو أن قطعة التوست خانتك من جديد.",
      "أكثر شيء غير واقعي في الوصفات هو جملة: اتركه يبرد خمس دقائق، وكأن أحداً يملك هذا الصبر.",
      "فتحت الثلاجة اليوم ثلاث مرات وكأن الزيارة الرابعة ستكشف لي شخصية أفضل وحلوى إضافية.",
      "القهوة حاولت إنقاذ صباحي بكل إخلاص، لكن ضحكة واحدة جميلة كانت أكثر فعالية.",
      "شخص مسؤول وضع خطة لليوم. وأنا احترمتها لدرجة أنني تركتها بسلام وحدها.",
      "الغسيل نظر إليّ اليوم بثقة مهمة تعرف جيداً أنها ستنتصر في النهاية."
    ],
    joy_openers: [
      "تقرير صغير من الحياة",
      "فضيحة لطيفة من اليوم",
      "جرعة عبث جديدة من يومي",
      "نشرة دراما هادئة",
      "تحديث من السيرك البشري",
      "ملخص كوميدي قصير",
      "شيء سخيف حدث للتو",
      "تفضل هذا الخراب الصغير"
    ],
    joy_setups: [
      "حاولت أن أتصرف كشخص بالغ جاد",
      "دخلت اليوم ومعي خطة وثقة مريبة",
      "فتحت الرسائل وأنا أنوي كتابة جملة واحدة هادئة",
      "نظرت إلى قائمة المهام وكأن بيننا احتراماً متبادلاً",
      "قلت لنفسي إنني سأكون منتجاً قبل أن أصبح درامياً",
      "ظننت أن فنجان قهوة واحداً سيحل كل شيء في شخصيتي",
      "وثقت بذاكرتي بلا أي سبب منطقي",
      "جلست لخمس دقائق فوجدت نفسي أتفاوض مع كسلي"
    ],
    joy_twists: [
      "ثم ردت الحياة فوراً بنكتة أفضل من خطتي",
      "ثم فقد اليوم كله هيبته بسبب شيء صغير جداً",
      "ثم غير عقلي موقفه وانضم للكوميديا",
      "ثم بدا المكان وكأنه ينظر إليّ قائلاً: حقاً، هذه هي خطتك",
      "ثم هزمت نفسي قبل أن ينتهي الفطور",
      "ثم صار كل شيء أضحك وأقل سيطرة",
      "ثم ذكّرني الكون بلطف أن الوقار ليس متوفراً دائماً",
      "ثم انزلقت آخر ذرة جدية في داخلي على قشرة موز مجازية"
    ],
    joy_endings: [
      "في هذه المرحلة أستحق إما التصفيق أو المراقبة.",
      "كل شيء يسير بشكل جميل إذا وسعنا تعريف كلمة جميل كثيراً.",
      "قررت أن أسميه سحراً لأن الحقيقة أقل أناقة.",
      "الخبر الجيد أنني ضحكت، والسيئ أن هناك شهوداً.",
      "لم تكن أقوى لحظاتي، لكنها كانت بالتأكيد من أكثرها وضوحاً.",
      "نجوت، لكن كرامتي غادرت من باب جانبي.",
      "لهذا لا يجب تركي وحدي مع أفكاري قبل الظهر.",
      "المشهد كله كان يحتاج موسيقى تصويرية وكاميرا."
    ],
    joy_prank_leads: [
      "فكرة مقلب لطيف",
      "مزحة صغيرة لليوم",
      "رسالة قد تصنع ابتسامة",
      "حركة تمثيلية بسيطة",
      "سطر مرح لهذا اليوم",
      "إذا كان المزاح مناسباً اليوم",
      "هذه فخ لطيف جداً",
      "جملة قد تنتج ضحكة"
    ],
    joy_prank_messages: [
      "اكتب: نحتاج أن نتحدث في أمر عاجل.",
      "أرسل: لدي اعتراف.",
      "ابدأ بـ: أرجوك ابق هادئاً.",
      "اكتب: ارتكبت خطأً خطيراً.",
      "أرسل: ربما عليك أن تجلس.",
      "اكتب: لدي أخبار صعبة من المطبخ.",
      "ابدأ بـ: أحتاج دعماً عاطفياً.",
      "أرسل: لست فخوراً بما حدث."
    ],
    joy_prank_reveals: [
      "ثم اكشف أن الأمر العاجل ليس أكثر من بسكويت سقط في الشاي بطريقة مأساوية.",
      "ثم اعترف أن الخطأ الكبير كان وثوقك بكيس تسوق ضعيف لحمل ست برتقالات.",
      "ثم قل إنك خسرت المعركة مرة أخرى أمام شرشف السرير المطاطي.",
      "ثم وضح أن الأزمة الوحيدة هي أنك لوحت لشخص لم يكن يلوح لك أصلاً.",
      "ثم اكشف أن الجوارب ما زالت تختفي بثقة المجرمين المحترفين.",
      "ثم قل إن الخبر الصعب هو أن القهوة بردت بينما كنت تمارس الدراما.",
      "ثم اعترف أنك احتجت الدعم فقط لأن برطماناً رفض أن يفتح رغم التواصل البصري المباشر.",
      "ثم اشرح أن الفضيحة كلها أنك نسيت لماذا دخلت الغرفة أصلاً."
    ],
    joy_dialogue_a: [
      "أنا",
      "عقلي",
      "قهوتي",
      "المنبه",
      "قائمة مهامي",
      "المرآة هذا الصباح",
      "آخر ذرة انضباط عندي",
      "مطبخي"
    ],
    joy_dialogue_b: [
      "اليوم سنكون هادئين",
      "سنتصرف بنضج الآن",
      "من فضلك كن طبيعياً هذه المرة",
      "سنتخذ قراراً واحداً معقولاً",
      "سنظل مركزين تماماً",
      "الوقار ما زال ممكناً",
      "لا داعي للدراما",
      "سيكون الأمر سهلاً"
    ],
    joy_dialogue_c: [
      "بعد خمس دقائق: بالتأكيد لا.",
      "الواقع: هذه الجملة عاشت عمراً قصيراً جداً.",
      "ما حدث فعلاً: اتجاه إبداعي مختلف تماماً.",
      "ثم دخل إزعاج صغير وانتصر فوراً.",
      "أود الإبلاغ عن انهيار كامل للخطة الأصلية.",
      "منذ تلك الجملة تحولت الأمور كلها إلى كوميديا.",
      "الكون سمع ذلك وبدأ يضحك أولاً.",
      "عند التفكير بالأمر لاحقاً، كان ذلك متفائلاً أكثر من اللازم."
    ],
    love_seed: [
      `لو استطعت فقط أن أخطفك إلى كوننا الصغير، فلن يتمكن حتى Google من إيجادك. ${heart_emoji}`,
      `سفيتلانا، أنتِ توأم روحي، وأقرب صديقة لي، وراحتي، والشخص الذي يثق به قلبي أكثر من أي أحد. ${heart_emoji}`,
      `الحقيقة معكِ بسيطة: أنا لا أحبكِ فقط، أنا أشعر أنني في وطني حين أكون معكِ. ${heart_emoji}`,
      `حين أفكر في ألطف جزء في الحياة، يصل اسمكِ قبل أن ينتهي التفكير نفسه. ${heart_emoji}`
    ],
    love_addresses: [
      "يا سفيتلانا الجميلة",
      "يا ملاكي",
      "يا توأم روحي",
      "يا فتاتي الثمينة",
      "يا أقرب قلب إليّ",
      "يا ملكتي الجميلة",
      "يا صديقتي الأقرب وحبيبتي",
      "يا سفيتلانا، يا وطني",
      "يا أغلى إنسانة",
      "يا قلبي"
    ],
    love_truths: [
      "أنتِ الشخص الذي يعود إليه قلبي بلا تردد",
      "أنتِ من تجعلين الأيام العادية ممتلئة أكثر",
      "أنتِ لستِ فقط محبوبة عندي، بل محمولة داخل روحي",
      "أنتِ المكان اللطيف في داخلي الذي لا يمكن للحياة أن تستبدله",
      "أنتِ الشخص الذي أريده بجانبي في الفرح والهدوء والتعب والسلام",
      "أنتِ ذلك النوع النادر من الحب الذي يشعرني بالصدق والأمان والحياة معاً",
      "أنتِ راحتي المفضلة ودهشتي المفضلة في الوقت نفسه",
      "أنتِ من يحول الشوق إلى حنان بدلاً من الألم",
      "أنتِ عائلة لقلبي بالمعنى الحقيقي",
      "أنتِ المرأة التي جعلت الحب عندي دافئاً وجاداً وحقيقياً"
    ],
    love_depths: [
      "أفتقدكِ حتى في وسط الأيام الجميلة وأفكر فيكِ في السكون بعدها",
      "حتى حين أبتسم لأشياء أخرى، يبقى جزء مني يبتسم باتجاهكِ",
      "أنتِ تمنحين قلبي إحساساً بأنه مفهوم، وهذا وحده يهدئني",
      "حين تصبح الحياة صاخبة، يبقى مجرد التفكير فيكِ قادراً على تهدئتي",
      "أنتِ الشخص الذي أريد أن أحكي له كل شيء أولاً وأرتاح عنده ثانياً",
      "معكِ لا أشعر بحاجة إلى التظاهر، وهذا من أثمن ما أعرفه",
      "حبكِ جعل عالمي أكثر نعومة من دون أن يجعله أصغر",
      "كلما عرفتكِ أكثر، ازددت امتناناً لأنكِ موجودة كما أنتِ",
      "أنتِ تجعلين المودة سهلة والوفاء طبيعياً",
      "هناك أيام تغير فيها ذكرى واحدة لكِ درجة حرارة قلبي كلها"
    ],
    love_wishes: [
      "أتمنى أن تشعري دائماً بمدى ثباتي وصدقي في حبكِ.",
      "أريد لقلبكِ أن يشعر بالأمان في قلبي لوقت طويل جداً.",
      "أتمنى أن تمنحني الحياة فرصاً لا تنتهي لأثبت لكِ هذا الحب.",
      "أريد أن أكون لطيفاً مع كل شيء تأتمنينني عليه.",
      "أتمنى ألا تشكي أبداً في كم أنتِ غالية عندي.",
      "أريد أن أواصل اختياركِ كل يوم باليقين نفسه.",
      "أتمنى أن تتذكري دائماً أنكِ من أجمل ما منحتني الحياة.",
      "أريد أن أبقى المكان الذي يستطيع قلبكِ أن يستريح فيه.",
      "أتمنى أن يبدو الحب الذي أعطيكِ إياه صادقاً وممتلئاً دائماً.",
      "أريد أن أقضي عمري كله وأنا أجد أسباباً جديدة لأعشقكِ."
    ],
    morning_greetings: [
      "صباح الخير يا ملكتي الجميلة سفيتلانا.",
      "صباح الخير يا ملاكي.",
      "صباح الخير يا فتاتي الثمينة.",
      "صباح الخير يا قلبي الجميل."
    ],
    morning_openings: [
      "إنه أنا، ديابكِ.",
      "أردت أن يبدأ يومكِ بدفء مني.",
      "قبل أن يصبح العالم صاخباً، أردت أن أصل إليكِ أولاً.",
      "أردت أن تستيقظي وتجدي شيئاً ناعماً من قلبي ينتظركِ."
    ],
    morning_truths: [
      "أنتِ تعنين لي أكثر مما أستطيع قوله في رسالة واحدة.",
      "أنتِ من أندر النعم في حياتي، وأنا لا أنسى ذلك أبداً.",
      "أريدكِ أن تبدئي يومكِ وأنتِ تعرفين أنكِ محل إعجاب كبير ومحبة عميقة وتقدير صادق.",
      "مجرد التفكير فيكِ يمنح الصباح كله لوناً أدفأ.",
      "أنتِ لستِ فقط مميزة عندي، أنتِ جزء من الطريقة التي أعبر بها يومي."
    ],
    morning_wishes: [
      "أتمنى أن يكون يومكِ مليئاً بالسهولة والنجاح واللحظات التي تجعلكِ تبتسمين من قلبكِ.",
      "أتمنى أن تمضي أموركِ بسلاسة اليوم، وأن يعاملكِ العالم بلطف وحظ جميل.",
      "أتمنى أن يشعر قلبكِ بالخفة اليوم وأن تكافأ جهودكِ بشكل جميل.",
      "أتمنى أن يفتح هذا اليوم ذراعيه لكِ بلطف ويمنحكِ أسباباً لتفخري بنفسكِ.",
      "أتمنى أن يجلب لكِ اليوم راحة في الفكر ومفاجآت لطيفة وثقة هادئة."
    ],
    morning_cares: [
      "أرجوكِ اعتني بنفسكِ من أجلي، كلي جيداً، واشربي ما يكفي، ولا تهملي ما يحتاجه جسدكِ.",
      "كوني لطيفة مع نفسكِ اليوم يا حبيبتي، ارتاحي حين تستطيعين، وتنفسّي جيداً، ولا تنسي نفسكِ.",
      "اعتني اليوم بأغلى فتاة عندي. أريدكِ شبعانة، مرتاحة، هادئة، ومبتسمة.",
      "تذكري أن اهتمامكِ بنفسكِ يعني لي أكثر مما قد تتوقعين.",
      "أحتاج منكِ أن تكوني رحيمة بقلبكِ وجسدكِ اليوم، لأنهما عزيزان جداً عليّ."
    ],
    morning_teases: [
      "وإذا لم تفعلي، فقد أضطر إلى الحضور شخصياً والاعتراض بحنان مبالغ فيه.",
      "لا تختبري صبري في هذا، لأنني قد أصبح درامياً جداً حين أقلق عليكِ.",
      "أقول هذا بحب، لكن بجدية كافية لتسمعي الكلام.",
      "من فضلكِ تعاوني مع قلقي اللطيف وأنقذيني من مسرحية غير ضرورية.",
      "وإلا سأضطر إلى إطلاق حملة تذكير مبالغ فيها لكنها صادقة جداً."
    ],
    morning_closings: [
      "ادخلي يومكِ وأنتِ تعرفين أن قلبي معكِ.",
      "اذهبي وتألقّي يا ملكتي، فأنتِ تستحقين يوماً جميلاً.",
      "احملي حبي معكِ بهدوء طوال ساعات اليوم.",
      "أتمنى لكِ يوماً رائعاً يا ملاكي، وأنا فخور بكِ من الآن.",
      "اعتني بنفسكِ يا جميلتي، فأنتِ محبوبة أكثر مما تستطيع الكلمات وصفه."
    ],
    night_greetings: [
      "تصبحين على خير يا نجمتي سفيتلانا.",
      "تصبحين على خير يا ملكتي الجميلة.",
      "تصبحين على خير يا ملاكي.",
      "تصبحين على خير يا حبيبتي الثمينة."
    ],
    night_openings: [
      "أتمنى أن تحتويكِ هذه الليلة بلطف وأن تمنح قلبكِ الراحة العميقة التي يستحقها.",
      "أريد لهذه الليلة أن تكون هادئة معكِ وأن تترك السلام في كل جزء متعب منكِ.",
      "ليأتكِ النوم بسهولة الليلة، وليترك الطمأنينة في كل زاوية من قلبكِ.",
      "أتمنى أن تحمل الليلة معها ضجيج النهار بعيداً وتترك الحنان فقط."
    ],
    night_confessions: [
      "ربما أقول الكثير أحياناً، لكن ذلك فقط لأن قلبي لا يعرف كيف يكون صغيراً حين يتعلق الأمر بكِ.",
      "حين أكتب لكِ ليلاً، فذلك لأن الحب يصبح أكثر صدقاً في الساعات الهادئة.",
      "لا أستطيع أن أجعل مشاعري نحوكِ قصيرة ومرتبة، لأنها ببساطة ليست كذلك.",
      "هناك شيء فيكِ يجعل قلبي يفيض بدلاً من أن يهمس."
    ],
    night_imaginings: [
      "أغلقي عينيكِ للحظة وتخيلي أنني هناك، قريب منكِ، أضمكِ برفق وأقبل خديكِ قبل النوم.",
      "لو كنت بقربكِ الآن، لبقيت قريباً، أحافظ على دفئكِ، وأدعكِ تنامين وأنتِ لا تشعرين إلا بالسلام.",
      "أتمنى لو أكون بجانبكِ الليلة فقط لأحملكِ بلطف وأجعل الغرفة كلها أكثر أماناً.",
      "في قلبي أنا موجود هناك فعلاً، قريب وهادئ، أحرس راحتكِ."
    ],
    night_watches: [
      "أشعر أنني أستطيع البقاء هناك طويلاً فقط وأنا أنظر إلى وجهكِ الجميل وهو يصبح أكثر هدوءاً.",
      "هناك شعور جميل جداً في تخيلكِ وأنتِ تنامين وأنتِ تشعرين بكل هذا الحب.",
      "كنت سأحرس راحتكِ وكأنها أغلى شيء في العالم.",
      "لا شيء يبدو لي ألطف من أن يجد قلبكِ سلامه الحقيقي في نهاية اليوم."
    ],
    night_closings: [
      "نامي بهدوء يا حبيبتي، وليكن آخر ما تشعرين به الليلة هو الحب.",
      "أحلاماً سعيدة يا ملاكي، ودعي النوم يحملكِ إلى مكان دافئ وآمن.",
      "استريحي بعمق يا ملكتي، واستيقظي غداً بقلب أخف.",
      "نامي بسلام يا جميلتي، وأنتِ تعرفين كم أنتِ محبوبة بصدق."
    ],
    tale_characters: [
      "صانع ساعات",
      "بائعة كتب",
      "خياط",
      "خبازة",
      "رسام خرائط",
      "عازفة بيانو",
      "صانع مصابيح",
      "كاتبة رسائل"
    ],
    tale_quirks: [
      "يستطيع إصلاح كل شيء إلا الفوضى الصغيرة في غرفته",
      "تتذكر كل تفصيل مهم إلا المكان الذي تركت فيه المفاتيح",
      "يتحدث بجمال أمام الناس ويتعثر في الأحاديث العادية",
      "تصل إلى العمل باكراً وإلى العشاء متأخرة دائماً",
      "يهدئ الغرباء لكنه لا يستطيع تهدئة فنجان شاي عنيد على الرف",
      "تحفظ كل وعد لكنها تضيع المظلات في الجو الصحو",
      "يؤمن أن الصمت يحل معظم الأمور وأن الضحك يحل الباقي",
      "تبدو منظمة تماماً إلى أن يفتح أحدهم الدرج الخطأ"
    ],
    tale_meetings: [
      "وفي مساء هادئ التقى هذا الشخص بآخر يقف عند باب متجر وكأنه يعرف تماماً ما يفعل، مع أن الأمر لم يكن كذلك أبداً.",
      "وفي ليلة لطيفة جاء غريب يحمل مشكلة صغيرة وغريبة جداً حتى بدا الضحك هو الرد الوحيد المحترم.",
      "وفي مساء ممطر ظهرت روح ثانية تحمل النوع نفسه من المتاعب التي تبدو سخيفة ومألوفة معاً.",
      "وقبيل الإغلاق طرق شخص ما الباب بهدوء وجلب معه فصلاً جديداً من دون قصد.",
      "وقرب منتصف الليل وصل قلب آخر متعب يحمل قصة تشبه المرآة والنكتة في آن واحد.",
      "وتحت ضوء القمر توقف زائر عند النافذة وسأل سؤالاً صادقاً لدرجة أن الرسمية اختفت فوراً.",
      "ومع هدوء الشارع ظهر شخص يحمل زراً مفقوداً وجملة مائلة وتوقيتاً ممتازاً للضحك.",
      "وفي اللحظة التي ظن الجميع أن اليوم انتهى، دخل غريب وحول الإحراج إلى صحبة."
    ],
    tale_turns: [
      "جلس الاثنان وتحدثا بصراحة عن إحراجهما، فاكتشفا أن الشعور بالفهم يبعد مسافة ضحكة واحدة فقط.",
      "ومع خفوت المصابيح لم تعد المشكلة مشكلة، بل تحولت إلى حكاية تستحق أن تبقى.",
      "ضحكا كثيراً على عاداتهما الغريبة حتى بدا المكان نفسه أدفأ من قبل.",
      "وبدلاً من إصلاح كل شيء، قررا البقاء والحديث حتى صار الإزعاج أصغر بكثير.",
      "وما بدأ كإرباك بسيط صار ذكرى من النوع الذي يُحكى بعد سنوات وهو ما زال دافئاً.",
      "لم تصبح الليلة مثالية، لكنها أصبحت لطيفة، وكان ذلك أجمل من الكمال نفسه.",
      "ومن دون تخطيط منح كل واحد منهما الآخر ما كان يحتاجه أكثر: صحبة سهلة.",
      "لم يصلح أي منهما العالم كله، لكن كليهما عاد إلى بيته أخف قلباً."
    ],
    tale_lessons: [
      "ومنذ ذلك الحين نام الشارع بشكل أفضل، لأن حتى أكثر أرواحه تشتتاً عرفت أنها ليست وحدها.",
      "وهكذا تعلم الحي كله أن المودة كثيراً ما تدخل وهي ترتدي حذاء الكوميديا.",
      "وبعدها بدت حتى ساعات المدينة أقل قسوة تجاه الأخطاء الصغيرة.",
      "فظلت الليلة ناعمة، وبقيت الحكاية لطيفة بما يكفي لتُروى مرة أخرى.",
      "وعند الصباح بقي العالم كما هو، لكن القلبين صارا أخف حملاً.",
      "احتفظ القمر ببقية النكتة لنفسه، لكن الجميع اتفق أن النهاية كانت مناسبة.",
      "في تلك الليلة لم يحدث شيء عظيم، بل شيء لطيف فقط، وكان ذلك أكثر من كاف.",
      "وهكذا انتهت الحكاية كما يجب أن تنتهي حكايات الليل الجميلة: بسلام يصل بهدوء."
    ],
    tale_opener: "كان يا ما كان",
    tale_intro_phrase: ""
  }
};

function build_daily_joy(locale_key, count) {
  const locale = content[locale_key];
  const messages = [...locale.joy_seed];
  let variant_index = 0;

  for (const lead of locale.joy_prank_leads) {
    for (const message of locale.joy_prank_messages) {
      for (const reveal of locale.joy_prank_reveals) {
        messages.push(`${lead}: ${message} ${reveal}`);
      }
    }
  }

  for (const speaker of locale.joy_dialogue_a) {
    for (const line of locale.joy_dialogue_b) {
      for (const ending of locale.joy_dialogue_c) {
        messages.push(`${speaker}: ${line}.\n${ending}`);
      }
    }
  }

  for (const opener of locale.joy_openers) {
    for (const setup of locale.joy_setups) {
      for (const twist of locale.joy_twists) {
        for (const ending of locale.joy_endings) {
          messages.push(
            build_joy_story(opener, setup, twist, ending, variant_index),
          );
          variant_index += 1;

          if (unique_messages(messages).length >= count) {
            return finalize(messages, count, `${locale_key}_joy`);
          }
        }
      }
    }
  }

  return finalize(messages, count, `${locale_key}_joy`);
}

function build_daily_love(locale_key, count) {
  const locale = content[locale_key];
  const messages = [...locale.love_seed];

  for (const address of locale.love_addresses) {
    for (const truth of locale.love_truths) {
      for (const depth of locale.love_depths) {
        for (const wish of locale.love_wishes) {
          messages.push(`${address}, ${truth}. ${sentence_case(depth)}. ${sentence_case(wish)} ${heart_emoji}`);

          if (unique_messages(messages).length >= count) {
            return finalize(messages, count, `${locale_key}_love`);
          }
        }
      }
    }
  }

  return finalize(messages, count, `${locale_key}_love`);
}

function build_morning_messages(locale_key, count) {
  const locale = content[locale_key];
  const messages = [];

  for (const greeting of locale.morning_greetings) {
    for (const opening of locale.morning_openings) {
      for (const truth of locale.morning_truths) {
        for (const wish of locale.morning_wishes) {
          for (const care of locale.morning_cares) {
            for (const tease of locale.morning_teases) {
              for (const closing of locale.morning_closings) {
                messages.push(`${greeting}\n${opening}\n${truth}\n${wish}\n${care}\n${tease}\n${closing}`);

                if (unique_messages(messages).length >= count) {
                  return finalize(messages, count, `${locale_key}_morning`);
                }
              }
            }
          }
        }
      }
    }
  }

  return finalize(messages, count, `${locale_key}_morning`);
}

function build_night_messages(locale_key, count) {
  const locale = content[locale_key];
  const messages = [];

  for (const greeting of locale.night_greetings) {
    for (const opening of locale.night_openings) {
      for (const confession of locale.night_confessions) {
        for (const imagining of locale.night_imaginings) {
          for (const watch of locale.night_watches) {
            for (const closing of locale.night_closings) {
              messages.push(`${greeting}\n${opening}\n${confession}\n${imagining}\n${watch}\n${closing} ${kiss_heart_emoji}`);

              if (unique_messages(messages).length >= count) {
                return finalize(messages, count, `${locale_key}_night`);
              }
            }
          }
        }
      }
    }
  }

  return finalize(messages, count, `${locale_key}_night`);
}

function build_night_tales(locale_key, count) {
  const locale = content[locale_key];
  const messages = [];

  for (const character of locale.tale_characters) {
    for (const quirk of locale.tale_quirks) {
      for (const meeting of locale.tale_meetings) {
        for (const turn of locale.tale_turns) {
          for (const lesson of locale.tale_lessons) {
            const intro_phrase = locale.tale_intro_phrase ? `${locale.tale_intro_phrase} ` : "";
            messages.push(`${locale.tale_opener}, ${intro_phrase}${character} ${quirk}. ${meeting} ${turn} ${lesson}`);

            if (unique_messages(messages).length >= count) {
              return finalize(messages, count, `${locale_key}_tales`);
            }
          }
        }
      }
    }
  }

  return finalize(messages, count, `${locale_key}_tales`);
}

function write_json(file_path, payload) {
  fs.writeFileSync(file_path, `${JSON.stringify(payload, null, 2)}\n`, "utf8");
}

const english_joy = build_daily_joy("en", JOY_COUNT);
const german_joy = build_daily_joy("de", JOY_COUNT);
const arabic_joy = build_daily_joy("ar", JOY_COUNT);
const english_love = build_daily_love("en", LOVE_COUNT);
const german_love = build_daily_love("de", LOVE_COUNT);
const arabic_love = build_daily_love("ar", LOVE_COUNT);
const english_morning = build_morning_messages("en", MORNING_COUNT);
const german_morning = build_morning_messages("de", MORNING_COUNT);
const arabic_morning = build_morning_messages("ar", MORNING_COUNT);
const english_night = build_night_messages("en", NIGHT_COUNT);
const german_night = build_night_messages("de", NIGHT_COUNT);
const arabic_night = build_night_messages("ar", NIGHT_COUNT);
const english_tales = build_night_tales("en", TALE_COUNT);
const german_tales = build_night_tales("de", TALE_COUNT);
const arabic_tales = build_night_tales("ar", TALE_COUNT);

fs.mkdirSync(data_directory, { recursive: true });
write_json(files.joy_en, english_joy);
write_json(files.joy_de, german_joy);
write_json(files.joy_ar, arabic_joy);
write_json(files.love_en, english_love);
write_json(files.love_de, german_love);
write_json(files.love_ar, arabic_love);
write_json(files.morning_en, english_morning);
write_json(files.morning_de, german_morning);
write_json(files.morning_ar, arabic_morning);
write_json(files.night_en, english_night);
write_json(files.night_de, german_night);
write_json(files.night_ar, arabic_night);
write_json(files.tale_en, english_tales);
write_json(files.tale_de, german_tales);
write_json(files.tale_ar, arabic_tales);

console.log(
  `Generated ${JOY_COUNT} joy messages, ${LOVE_COUNT} love notes, ${MORNING_COUNT} morning messages, ${NIGHT_COUNT} night messages, and ${TALE_COUNT} night tales in English, German, and Arabic.`
);

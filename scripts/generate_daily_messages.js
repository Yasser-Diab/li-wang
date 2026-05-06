const fs = require("fs");
const path = require("path");

const data_directory = path.join(__dirname, "..", "data");
const prank_path = path.join(data_directory, "daily_joy_messages.json");
const love_path = path.join(data_directory, "daily_love_messages.json");
const prank_de_path = path.join(data_directory, "daily_joy_messages_de.json");
const love_de_path = path.join(data_directory, "daily_love_messages_de.json");

const seed_pranks = [
  "Today's prank: look very serious and say, 'Svetlana, we need to talk.' Then pause like a movie villain and confess: 'Your smile is illegally powerful and I demand compensation in laughter.'",
  "Send her: 'I have evidence.' When she asks what evidence, say: 'Screenshots from my heart proving you are adorable.'",
  "Today's comedy report: Diab tried to act normal, remembered Svetlana exists, and immediately lost the case.",
  "Ask her if she knows German law. When she says no, tell her: 'Too late, you have been sentenced to one imaginary hug.'",
  "Breaking news: local heart refuses to behave after receiving one message from Svetlana.",
  "Send 'I need help' and then explain the problem is that she is too cute and customer service is not answering.",
  "Say 'I found your secret talent.' The secret talent is making Diab smile like he forgot all adult responsibilities.",
  "Tiny story: the coffee asked why Diab was smiling. The coffee was informed it would not understand because it is only coffee.",
  "Today's silly warning: if Svetlana smiles too much, Diab may start writing poetry without supervision.",
  "Say 'I am filing a complaint.' Complaint: she keeps being wonderful with no permit.",
  "Send: 'Your account has been charged one smile.' If she asks why, say: 'Subscription renewed automatically in my heart.'",
  "Today's prank: ask her to stop being beautiful for five minutes because the productivity department is suffering.",
  "Send: 'I contacted NASA.' Then say: 'They confirmed your smile can be seen from my entire mood.'",
  "Act suspicious and say: 'I know what you did.' Then reveal: 'You became adorable again. Very suspicious behavior.'",
  "Tell her: 'I tried to be dramatic today, but you exist, so now I am just romantic and mildly useless.'",
  "Send: 'Emergency meeting.' Agenda item one: Svetlana is wonderful. Agenda item two: Diab is not recovering.",
  "Today's tiny prank: ask if she has insurance for all the smiles she causes.",
  "Send: 'I have a technical issue.' Then say: 'My brain keeps opening a tab called Svetlana and refusing to close it.'",
  "Tell her: 'Your cuteness has been reported to the authorities.' The authorities are your heart, and they are biased.",
  "Prank idea: say 'I made a serious decision.' Then tell her the decision is to adore her more professionally.",
  "Send: 'I need your opinion.' Then ask: 'How do you manage to be this sweet without warning labels?'",
  "Today's story: Diab tried to focus. Then a thought of Svetlana walked in wearing a crown and took over the meeting.",
  "Send: 'There is a problem with your name.' Then say: 'Every time I see it, I smile. Very distracting.'",
  "Tell her: 'The moon called.' It complained that Svetlana is stealing too much of Diab's attention.",
  "Ask: 'Can you please be less adorable?' Then immediately apologize because that is an impossible request.",
  "Send: 'I have one question for you.' The question: 'How dare you be this precious from so far away?'",
  "Today's prank: act like you are angry and say, 'I cannot believe you did this.' Then reveal: 'You made my day better again.'",
  "Send: 'New rule.' The rule is that Svetlana must accept at least one compliment today, no negotiations.",
  "Tiny comedy: Diab's heart applied for vacation, but then Svetlana smiled and it cancelled the request.",
  "Send: 'I solved the mystery.' The mystery: why Diab smiles randomly. The answer has eight letters: Svetlana.",
  "Tell her: 'I am not saying you are magic, but my mood improved suspiciously after your message.'",
  "Prank plan: send a very official-looking 'NOTICE' and then write: 'You are loved. This notice cannot be appealed.'",
  "Ask her if she is secretly a sunrise, because she keeps making things warmer.",
  "Send: 'I need to confess.' Confession: you are completely guilty of being my favorite thought.",
  "Today's dramatic update: Diab attempted to resist missing Svetlana. The attempt lasted approximately zero seconds.",
  "Tell her: 'Your smile has caused a system update.' New version: Diab 2.0, now with extra happiness.",
  "Send: 'I checked the forecast.' It says: high chance of thinking about Svetlana, low chance of pretending otherwise.",
  "Prank idea: tell her you joined a club. Club name: People Who Smile When Svetlana Texts.",
  "Say: 'I have a medical concern.' Concern: every message from you causes uncontrolled happiness.",
  "Send: 'I found a bug.' Bug report: distance exists. Suggested fix: more memories, more calls, more us.",
  "Today's tiny scene: Diab tried to act cool. His heart said, 'Svetlana,' and ruined the whole performance.",
  "Tell her: 'I asked my calendar about you.' It said January 18, 2025 was the day everything became suspiciously beautiful.",
  "Send: 'Your smile has been audited.' Results: too powerful, too sweet, approved for daily use.",
  "Prank plan: ask her to send proof she is real, because nobody should be this lovely without documentation.",
  "Tell her: 'I am starting a petition.' Petition title: Svetlana deserves more smiles today.",
  "Send: 'I have a password problem.' Password hint: the answer is always Svetlana.",
  "Today's ridiculous truth: if missing you was a sport, Diab would need a trophy shelf.",
  "Ask: 'Are you aware you keep improving my day without permission?' Then thank her for the crime.",
  "Send: 'Important delivery.' Contents: one compliment, two smiles, and a tiny invisible hug.",
  "Tell her: 'I tried to write a normal message, but my heart added sparkle and refused to apologize.'",
  "Prank idea: send 'Do not panic.' Then say: 'I just remembered how cute you are. Panic is understandable.'",
  "Today's headline: Svetlana continues to be the main reason Diab's serious face cannot be trusted.",
  "Send: 'I have a court case.' Charge: stealing Diab's attention. Sentence: one loving message.",
  "Ask her to rate your seriousness from 1 to 10, then say you lost all seriousness after thinking of her.",
  "Tell her: 'My heart has a complaint department.' It only accepts compliments about Svetlana.",
  "Send: 'I found your superpower.' It is turning ordinary seconds into little golden ones.",
  "Today's prank: say 'I need space.' Then send a second message: 'Space next to you. Obviously.'",
  "Tell her: 'I tried to be productive, but then my brain played a highlight reel of you.'",
  "Send: 'You have one unread fine.' Fine amount: one smile, payable immediately.",
  "Today's tiny joke: Diab's heart has one tab open, one notification, and one favorite name.",
  "Tell her: 'If being wonderful was a job, you would be promoted every morning.'"
];

const seed_love = [
  "If only I could kidnap you into our little universe, even Google would not be able to find you.",
  "If I could steal you away to a secret universe, I would make the stars sign a privacy agreement before they looked at you.",
  "Svetlana, I love you in the quiet places where words arrive late and the heart has already spoken.",
  "Every ordinary day becomes warmer when your name passes through my mind.",
  "If I could fold the distance between us, I would keep you close enough for the universe to get jealous.",
  "I love you more gently than morning light and more stubbornly than time.",
  "You are not just someone I miss; you are the place my heart keeps trying to return to.",
  "I love the way your existence turns the world softer, even from far away.",
  "If my heart had a map, every road would eventually spell Svetlana.",
  "You are my favorite thought, my softest dream, and the reason ordinary minutes feel golden.",
  "I would hide you in our own private sky, where only tenderness knows the address.",
  "Even if every search engine in the world looked for you, I would keep you safe in the place only love can enter.",
  "I love you like a secret universe with one sun, one moon, and one name: Svetlana.",
  "Some people are met by chance; you feel like you were recognized by my soul.",
  "Every time I think of you, my day becomes a room with the lights turned on.",
  "I love you in all the languages I know, and in the silence between them too.",
  "You are the soft interruption my heart never wants to mute.",
  "If distance is a wall, my love for you keeps drawing windows in it.",
  "My heart does not just say your name; it makes a home around it.",
  "You are the part of the day I keep looking for, even when nothing is missing."
];

const prank_openings = [
  "Today's prank",
  "Tiny prank",
  "Very serious prank",
  "Soft chaos plan",
  "Today's harmless trouble",
  "Official mischief plan",
  "Comedy mission",
  "Little drama plan",
  "Suspiciously romantic prank",
  "Today's playful trap",
  "Sweet nonsense mission",
  "Tiny operation"
];

const prank_setups = [
  "send 'we need to discuss something important'",
  "send 'I found a problem'",
  "send 'this is an official notice'",
  "send 'I need your signature'",
  "tell her the authorities called",
  "tell her NASA requested a report",
  "tell her Google Maps failed",
  "tell her your serious face resigned",
  "tell her your calendar started blushing",
  "send 'there has been an incident'",
  "send 'your daily audit is complete'",
  "tell her customer support opened a case",
  "tell her the moon filed a complaint",
  "tell her your coffee needs answers",
  "send 'I have classified information'",
  "tell her your heart held a meeting",
  "send 'I am investigating you'",
  "tell her the productivity department is upset",
  "send 'your account has unusual activity'",
  "tell her the weather app is confused",
  "send 'I have a delivery for you'",
  "tell her your brain opened too many tabs",
  "send 'we have a tiny emergency'",
  "tell her your smile detector exploded"
];

const prank_reveals = [
  "the emergency is that she is too adorable and Diab is not trained for this",
  "the problem is that her smile keeps improving the entire atmosphere",
  "the notice says she is loved beyond all reasonable limits",
  "the signature is needed to confirm she is dangerously sweet",
  "the report says Diab smiled again for no professional reason",
  "the map failed because every road led back to Svetlana",
  "the complaint is that one woman should not have this much charm",
  "the meeting concluded that missing her is a full-time occupation",
  "the audit found too much beauty and not enough warning labels",
  "the incident is one thought of her causing a heart-wide celebration",
  "the case is about unauthorized cuteness and repeat happiness",
  "the moon is jealous because Diab keeps looking for her light instead",
  "the coffee wants to know why it is no longer the reason he wakes up smiling",
  "the classified information is that he loves her more than yesterday",
  "the investigation discovered she has been stealing attention with tenderness",
  "productivity is upset because Svetlana keeps appearing in every thought",
  "the unusual activity is Diab smiling at his screen like a romantic suspect",
  "the weather app is confused because her name keeps making the day warmer",
  "the delivery contains one invisible hug and a very obvious compliment",
  "the tabs are all named Svetlana and none of them want to close",
  "the detector exploded because her smile exceeded the safe sparkle limit",
  "the final verdict is that she must accept one sweet message immediately"
];

const prank_endings = [
  "No appeal is available.",
  "The sentence is one laugh.",
  "The evidence is overwhelming.",
  "Diab accepts full responsibility.",
  "This message self-destructs into a smile.",
  "The heart court has spoken.",
  "Please respond with one tiny smile.",
  "The romance department is monitoring the situation.",
  "The case remains beautifully open.",
  "All witnesses are biased in her favor.",
  "Further sweetness is expected.",
  "This is not a drill."
];

const love_openings = [
  "Svetlana",
  "My angel Svetlana",
  "My beautiful Svetlana",
  "My heart",
  "My soft universe",
  "My favorite miracle",
  "My golden thought",
  "My love",
  "My sweetest distance",
  "My always"
];

const love_images = [
  "a private universe where every star knows your name",
  "a quiet morning that begins inside my heart",
  "a warm light that keeps finding me",
  "the softest place my thoughts can rest",
  "a secret sky I would build only for us",
  "the reason distance feels temporary",
  "the name my heart says before it sleeps",
  "the smile my day keeps waiting for",
  "the golden line running through my ordinary hours",
  "the home my heart recognizes",
  "a moonlit path back to tenderness",
  "the beautiful answer to a question I never knew I was asking",
  "the calm inside every noisy day",
  "the sweet proof that souls can recognize each other",
  "the hidden melody behind my happiest thoughts",
  "the page of my life I never want to stop reading",
  "the little sun I carry through the day",
  "the reason my future feels less far away",
  "the universe I would choose every time",
  "the gentle magic I believe in most"
];

const love_actions = [
  "I would hide you from the whole world just to keep you safe in joy",
  "I would follow your smile through any distance",
  "I would save every small memory with you like gold",
  "I would choose your voice over a thousand perfect songs",
  "I would make a shelter out of my arms and call it ours",
  "I would keep writing your name into every tomorrow",
  "I would ask time to slow down whenever you are near",
  "I would turn every ordinary minute into a place for us",
  "I would build a door in the sky if it led me to you",
  "I would make the stars jealous by loving you quietly and completely",
  "I would carry your laugh like a secret treasure",
  "I would keep every version of you loved",
  "I would fold the map until your heart was beside mine",
  "I would save the softest part of every day for you",
  "I would protect your smile like it is my favorite sunrise",
  "I would choose our tiny universe over every crowded world",
  "I would let the whole internet lose you if it meant I found you in my arms",
  "I would turn missing you into a promise to love you harder",
  "I would keep your name warm in every language I learn",
  "I would make every day a small proof that you are loved"
];

const love_closings = [
  "I love you more than yesterday, and yesterday was already serious.",
  "You are my favorite place to arrive.",
  "Even far away, you are close to the best part of me.",
  "My heart keeps choosing you without asking permission.",
  "You make the world feel less random and more kind.",
  "I am so grateful that your name exists in my life.",
  "You are loved in the loud ways and the quiet ones.",
  "The universe feels warmer because you are in it.",
  "I love you with patience, hunger, tenderness, and hope.",
  "No distance can make my heart forget where it belongs.",
  "You are my softest certainty.",
  "I miss you with a smile hidden inside it.",
  "My love for you keeps finding new rooms inside me.",
  "You are the thought I never want to finish.",
  "I love you beyond maps, clocks, and reasonable explanations.",
  "You are worth every wait and every wish.",
  "You make my future feel like a hand reaching back for mine.",
  "If love had coordinates, mine would point to you.",
  "You are the little forever I keep carrying.",
  "I love you like our own universe already exists and is waiting."
];

const seed_pranks_de = [
  "Heutiger Streich: Schreib ganz ernst, 'Svetlana, wir müssen reden.' Dann gestehe: 'Dein Lächeln ist viel zu stark und ich fordere Schadenersatz in Form von Lachen.'",
  "Schreib ihr: 'Ich habe Beweise.' Wenn sie fragt welche, sag: 'Screenshots aus meinem Herzen, die beweisen, dass du bezaubernd bist.'",
  "Heutiger Comedy-Bericht: Diab wollte normal sein, erinnerte sich an Svetlana und verlor sofort den Fall.",
  "Frag sie, ob sie deutsches Recht kennt. Wenn sie nein sagt, antworte: 'Zu spät, du wurdest zu einer imaginären Umarmung verurteilt.'",
  "Eilmeldung: Ein lokales Herz weigert sich, sich nach einer Nachricht von Svetlana normal zu benehmen.",
  "Schreib 'Ich brauche Hilfe' und erkläre dann, dass sie zu süß ist und der Kundendienst nicht antwortet.",
  "Sag: 'Ich habe dein geheimes Talent gefunden.' Das Talent ist, Diab so lächeln zu lassen, als hätte er alle Erwachsenenpflichten vergessen.",
  "Kleine Geschichte: Der Kaffee fragte, warum Diab lächelt. Dem Kaffee wurde gesagt, er würde es nicht verstehen, weil er nur Kaffee ist.",
  "Heutige Warnung: Wenn Svetlana zu sehr lächelt, könnte Diab ohne Aufsicht Gedichte schreiben.",
  "Sag: 'Ich reiche eine Beschwerde ein.' Beschwerde: Sie ist weiterhin wunderbar ohne Genehmigung."
];

const seed_love_de = [
  "Wenn ich dich nur in unser kleines Universum entführen könnte, würde dich nicht einmal Google finden.",
  "Wenn ich dich in ein geheimes Universum stehlen könnte, müssten die Sterne erst eine Schweigepflicht unterschreiben.",
  "Svetlana, ich liebe dich an den stillen Orten, wo Worte zu spät kommen und das Herz schon gesprochen hat.",
  "Jeder gewöhnliche Tag wird wärmer, sobald dein Name durch meine Gedanken geht.",
  "Wenn ich die Entfernung zwischen uns falten könnte, würde ich dich so nah halten, dass das Universum neidisch wird.",
  "Ich liebe dich sanfter als Morgenlicht und sturer als die Zeit.",
  "Du bist nicht nur jemand, den ich vermisse; du bist der Ort, zu dem mein Herz immer zurück will.",
  "Ich liebe, wie deine Existenz die Welt weicher macht, sogar aus der Ferne.",
  "Wenn mein Herz eine Karte hätte, würde jeder Weg am Ende Svetlana buchstabieren.",
  "Du bist mein liebster Gedanke, mein weichster Traum und der Grund, warum gewöhnliche Minuten golden wirken."
];

const prank_openings_de = [
  "Heutiger Streich",
  "Kleiner Streich",
  "Sehr ernster Streich",
  "Sanfter Chaosplan",
  "Heutiger harmloser Unsinn",
  "Offizieller Schabernack",
  "Comedy-Mission",
  "Kleines Drama",
  "Verdächtig romantischer Streich",
  "Heutige spielerische Falle"
];

const prank_setups_de = [
  "schreib 'wir müssen etwas Wichtiges besprechen'",
  "schreib 'ich habe ein Problem gefunden'",
  "schreib 'dies ist eine offizielle Mitteilung'",
  "schreib 'ich brauche deine Unterschrift'",
  "sag ihr, die Behörden hätten angerufen",
  "sag ihr, die NASA wolle einen Bericht",
  "sag ihr, Google Maps habe versagt",
  "sag ihr, dein ernstes Gesicht habe gekündigt",
  "sag ihr, dein Kalender sei rot geworden",
  "schreib 'es gab einen Vorfall'",
  "schreib 'deine tägliche Prüfung ist abgeschlossen'",
  "sag ihr, der Kundendienst habe einen Fall eröffnet",
  "sag ihr, der Mond habe eine Beschwerde eingereicht",
  "sag ihr, dein Kaffee brauche Antworten",
  "schreib 'ich habe geheime Informationen'",
  "sag ihr, dein Herz habe eine Sitzung abgehalten",
  "schreib 'ich ermittle gegen dich'",
  "sag ihr, die Produktivitätsabteilung sei verärgert",
  "schreib 'dein Konto zeigt ungewöhnliche Aktivität'",
  "sag ihr, die Wetter-App sei verwirrt"
];

const prank_reveals_de = [
  "der Notfall ist, dass sie zu bezaubernd ist und Diab dafür nicht ausgebildet wurde",
  "das Problem ist, dass ihr Lächeln die ganze Atmosphäre verbessert",
  "die Mitteilung sagt, dass sie über alle vernünftigen Grenzen hinaus geliebt wird",
  "die Unterschrift bestätigt, dass sie gefährlich süß ist",
  "der Bericht sagt, dass Diab wieder ohne beruflichen Grund gelächelt hat",
  "die Karte versagte, weil jeder Weg zurück zu Svetlana führte",
  "die Beschwerde lautet, dass eine Frau nicht so viel Charme haben sollte",
  "die Sitzung ergab, dass Vermissen ein Vollzeitjob ist",
  "die Prüfung fand zu viel Schönheit und zu wenige Warnhinweise",
  "der Vorfall war ein Gedanke an sie, der eine Herzfeier ausgelöst hat",
  "der Fall handelt von unerlaubter Süßheit und wiederholtem Glück",
  "der Mond ist eifersüchtig, weil Diab ständig nach ihrem Licht sucht",
  "der Kaffee wissen will, warum er nicht mehr der Grund ist, warum Diab lächelt",
  "die geheime Information lautet, dass er sie mehr liebt als gestern",
  "die Ermittlungen ergaben, dass sie Aufmerksamkeit mit Zärtlichkeit stiehlt",
  "die Produktivität leidet, weil Svetlana in jedem Gedanken auftaucht",
  "die ungewöhnliche Aktivität ist Diab, der wie ein romantischer Verdächtiger auf den Bildschirm lächelt",
  "die Wetter-App verwirrt ist, weil ihr Name den Tag wärmer macht",
  "die Lieferung eine unsichtbare Umarmung und ein sehr offensichtliches Kompliment enthält",
  "alle Tabs Svetlana heißen und keiner geschlossen werden will"
];

const prank_endings_de = [
  "Berufung ist ausgeschlossen.",
  "Das Urteil lautet: ein Lachen.",
  "Die Beweise sind überwältigend.",
  "Diab übernimmt die volle Verantwortung.",
  "Diese Nachricht verwandelt sich gleich in ein Lächeln.",
  "Das Herzgericht hat gesprochen.",
  "Bitte mit einem kleinen Lächeln antworten.",
  "Die Romantikabteilung beobachtet die Lage.",
  "Der Fall bleibt wunderschön offen.",
  "Alle Zeugen sind zu ihren Gunsten voreingenommen."
];

const love_openings_de = [
  "Svetlana",
  "Mein Engel Svetlana",
  "Meine schöne Svetlana",
  "Mein Herz",
  "Mein weiches Universum",
  "Mein liebstes Wunder",
  "Mein goldener Gedanke",
  "Meine Liebe",
  "Meine süßeste Entfernung",
  "Mein Immer"
];

const love_images_de = [
  "ein privates Universum, in dem jeder Stern deinen Namen kennt",
  "ein stiller Morgen, der in meinem Herzen beginnt",
  "ein warmes Licht, das mich immer findet",
  "der weichste Ort, an dem meine Gedanken ruhen können",
  "ein geheimer Himmel, den ich nur für uns bauen würde",
  "der Grund, warum Entfernung vorübergehend wirkt",
  "der Name, den mein Herz vor dem Schlafen sagt",
  "das Lächeln, auf das mein Tag wartet",
  "die goldene Linie durch meine gewöhnlichen Stunden",
  "das Zuhause, das mein Herz erkennt",
  "ein Mondweg zurück zur Zärtlichkeit",
  "die schöne Antwort auf eine Frage, die ich nie kannte",
  "die Ruhe in jedem lauten Tag",
  "der süße Beweis, dass Seelen einander erkennen können",
  "die verborgene Melodie hinter meinen glücklichsten Gedanken"
];

const love_actions_de = [
  "ich würde dich vor der ganzen Welt verstecken, nur um dich in Freude sicher zu halten",
  "ich würde deinem Lächeln durch jede Entfernung folgen",
  "ich würde jede kleine Erinnerung mit dir wie Gold bewahren",
  "ich würde deine Stimme tausend perfekten Liedern vorziehen",
  "ich würde aus meinen Armen einen Schutz bauen und ihn unser Zuhause nennen",
  "ich würde deinen Namen in jedes Morgen schreiben",
  "ich würde die Zeit bitten, langsamer zu werden, wenn du nah bist",
  "ich würde jede gewöhnliche Minute in einen Ort für uns verwandeln",
  "ich würde eine Tür in den Himmel bauen, wenn sie zu dir führt",
  "ich würde die Sterne neidisch machen, weil ich dich still und vollständig liebe",
  "ich würde dein Lachen wie einen geheimen Schatz tragen",
  "ich würde jede Version von dir lieben",
  "ich würde die Karte falten, bis dein Herz neben meinem liegt",
  "ich würde den weichsten Teil jedes Tages für dich aufheben",
  "ich würde dein Lächeln beschützen, als wäre es mein liebster Sonnenaufgang"
];

const love_closings_de = [
  "Ich liebe dich mehr als gestern, und gestern war es schon ernst.",
  "Du bist mein liebster Ort zum Ankommen.",
  "Auch aus der Ferne bist du dem besten Teil von mir nah.",
  "Mein Herz wählt dich, ohne um Erlaubnis zu fragen.",
  "Du lässt die Welt weniger zufällig und freundlicher wirken.",
  "Ich bin so dankbar, dass dein Name in meinem Leben existiert.",
  "Du wirst in den lauten und in den stillen Arten geliebt.",
  "Das Universum fühlt sich wärmer an, weil du darin bist.",
  "Ich liebe dich mit Geduld, Sehnsucht, Zärtlichkeit und Hoffnung.",
  "Keine Entfernung kann mein Herz vergessen lassen, wohin es gehört.",
  "Du bist meine weichste Gewissheit.",
  "Ich vermisse dich mit einem Lächeln darin.",
  "Meine Liebe zu dir findet immer neue Räume in mir.",
  "Du bist der Gedanke, den ich nie beenden möchte.",
  "Ich liebe dich jenseits von Karten, Uhren und vernünftigen Erklärungen."
];

function unique_messages(messages) {
  return Array.from(new Set(messages.map((message) => message.trim()).filter(Boolean)));
}

function shuffle_messages(messages, seed_text) {
  const shuffled = [...messages];
  let seed = Array.from(seed_text).reduce((total, character) => total + character.charCodeAt(0), 0);

  for (let index = shuffled.length - 1; index > 0; index -= 1) {
    seed = (seed * 1664525 + 1013904223) % 4294967296;
    const swap_index = seed % (index + 1);
    [shuffled[index], shuffled[swap_index]] = [shuffled[swap_index], shuffled[index]];
  }

  return shuffled;
}

function build_pranks(target_count) {
  const messages = [...seed_pranks];

  for (const opening of prank_openings) {
    for (const setup of prank_setups) {
      for (const reveal of prank_reveals) {
        const ending = prank_endings[(messages.length + setup.length + reveal.length) % prank_endings.length];
        messages.push(`${opening}: ${setup}. Then reveal that ${reveal}. ${ending}`);

        if (unique_messages(messages).length >= target_count) {
          return shuffle_messages(unique_messages(messages), "svetlana_pranks").slice(0, target_count);
        }
      }
    }
  }

  return shuffle_messages(unique_messages(messages), "svetlana_pranks");
}

function build_love_notes(target_count) {
  const messages = [...seed_love];

  for (const opening of love_openings) {
    for (const image of love_images) {
      for (const action of love_actions) {
        const closing = love_closings[(messages.length + image.length + action.length) % love_closings.length];
        messages.push(`${opening}, you are ${image}. ${action}. ${closing}`);

        if (unique_messages(messages).length >= target_count) {
          return shuffle_messages(unique_messages(messages), "svetlana_love").slice(0, target_count);
        }
      }
    }
  }

  return shuffle_messages(unique_messages(messages), "svetlana_love");
}

function build_pranks_de(target_count) {
  const messages = [...seed_pranks_de];

  for (const opening of prank_openings_de) {
    for (const setup of prank_setups_de) {
      for (const reveal of prank_reveals_de) {
        const ending = prank_endings_de[(messages.length + setup.length + reveal.length) % prank_endings_de.length];
        messages.push(`${opening}: ${setup}. Dann enthülle, dass ${reveal}. ${ending}`);

        if (unique_messages(messages).length >= target_count) {
          return shuffle_messages(unique_messages(messages), "svetlana_pranks_de").slice(0, target_count);
        }
      }
    }
  }

  return shuffle_messages(unique_messages(messages), "svetlana_pranks_de");
}

function build_love_notes_de(target_count) {
  const messages = [...seed_love_de];

  for (const opening of love_openings_de) {
    for (const image of love_images_de) {
      for (const action of love_actions_de) {
        const closing = love_closings_de[(messages.length + image.length + action.length) % love_closings_de.length];
        messages.push(`${opening}, du bist ${image}. ${action}. ${closing}`);

        if (unique_messages(messages).length >= target_count) {
          return shuffle_messages(unique_messages(messages), "svetlana_love_de").slice(0, target_count);
        }
      }
    }
  }

  return shuffle_messages(unique_messages(messages), "svetlana_love_de");
}

fs.mkdirSync(data_directory, { recursive: true });
fs.writeFileSync(prank_path, `${JSON.stringify(build_pranks(420), null, 2)}\n`);
fs.writeFileSync(love_path, `${JSON.stringify(build_love_notes(420), null, 2)}\n`);
fs.writeFileSync(prank_de_path, `${JSON.stringify(build_pranks_de(420), null, 2)}\n`);
fs.writeFileSync(love_de_path, `${JSON.stringify(build_love_notes_de(420), null, 2)}\n`);

console.log("Generated 420 daily pranks and 420 daily love notes in English and German.");

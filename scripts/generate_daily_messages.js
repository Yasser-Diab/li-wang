const fs = require("fs");
const path = require("path");

const data_directory = path.join(__dirname, "..", "data");
const joy_path = path.join(data_directory, "daily_joy_messages.json");
const love_path = path.join(data_directory, "daily_love_messages.json");
const joy_de_path = path.join(data_directory, "daily_joy_messages_de.json");
const love_de_path = path.join(data_directory, "daily_love_messages_de.json");
const night_tales_path = path.join(data_directory, "night_tales.json");
const night_tales_de_path = path.join(data_directory, "night_tales_de.json");

function unique_messages(messages) {
  return Array.from(new Set(messages.map((message) => String(message).trim()).filter(Boolean)));
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

function slice_shuffled(messages, target_count, seed_text) {
  return shuffle_messages(unique_messages(messages), seed_text).slice(0, target_count);
}

const seed_joy = [
  "Harmless chaos for today: send 'I have a serious update' and then reveal that the coffee has been demoted because a smile already did all the work.",
  "Tiny comedy report: the moon filed a complaint because people keep getting poetic without permission.",
  "Soft prank idea: announce that everyone must be serious for sixty seconds and then fail together almost immediately.",
  "Public notice: adulthood nearly started this morning, but breakfast delayed the launch.",
  "Little joke for today: if the Wi-Fi asks why the room feels warmer, blame the good mood and protect the rest of the evidence.",
  "Friendly nonsense bulletin: the fridge light is convinced it deserves applause every time it successfully finds cake.",
  "Plot twist of the day: the alarm clock acted offended when nobody thanked it for its dramatic performance.",
  "Mild mischief suggestion: send 'urgent meeting in the kitchen' and let the agenda turn out to be cookies.",
  "Today the weather attempted to be mysterious, but the sunlight gave the whole surprise away before lunch.",
  "The socks would like it known that disappearing in the laundry is not a bug, it is performance art."
];

const joy_openings = [
  "Tiny harmless chaos",
  "Little plot twist",
  "Soft comedy alert",
  "Friendly nonsense report",
  "Today's playful idea",
  "Mild mischief notice",
  "Unofficial happiness memo",
  "Small dramatic bulletin",
  "A very unserious update",
  "The daily laugh dispatch",
  "A miniature act of nonsense",
  "A harmless trouble report"
];

const joy_setups = [
  "Text 'I discovered something suspicious'",
  "Say 'we need a professional opinion'",
  "Send 'the kitchen has issued a statement'",
  "Announce that the playlist has become emotional again",
  "Claim that the coffee requested legal representation",
  "Say that the pillow has started spreading rumors",
  "Text 'I have breaking domestic news'",
  "Declare that the moon has become judgmental",
  "Inform everyone that the weather app is confused again",
  "Say 'I have reviewed the evidence'",
  "Text 'this is an official notification from the laughter department'",
  "Announce that the toaster wants to be appreciated",
  "Claim that the alarm clock is demanding respect",
  "Text 'I have a serious finding from today's investigation'",
  "Declare that the group chat is dangerously close to becoming theater",
  "Say that the fridge light deserves an award",
  "Text 'the stars held a meeting last night'",
  "Announce that the socks are plotting another disappearance",
  "Say 'the kettle has reached an emotional conclusion'",
  "Text 'the day has submitted a formal complaint'"
];

const joy_reveals = [
  "the suspicious thing is how quickly a good mood can take over an ordinary room",
  "the professional opinion is that a laugh would improve the entire situation",
  "the statement says dessert is innocent and should be supported immediately",
  "the playlist became emotional because one song still remembers summer too clearly",
  "the coffee needs help competing with people who wake up charming",
  "the pillow says nobody should be expected to leave a warm bed without applause",
  "the breaking news is that the day improved after one good conversation",
  "the moon is being judgmental because nobody invited it to breakfast",
  "the weather app cannot explain why everything feels softer than forecast",
  "the evidence points to a dangerous amount of hidden sweetness",
  "the laughter department has approved one dramatic smile and zero stress",
  "the toaster feels underappreciated for its daily commitment to crunch",
  "the alarm clock is upset that everyone blames it for the existence of mornings",
  "the investigation found traces of joy where seriousness was expected",
  "the group chat has become theater because everyone is one emoji away from a monologue",
  "the award goes to the fridge light for dedication under difficult dessert conditions",
  "the stars agreed that some people make night feel less lonely",
  "the socks are disappearing only to keep life mysterious",
  "the kettle concluded that tea is basically a small act of forgiveness",
  "the complaint says the day became far too pleasant to be ordinary",
  "the whole emergency is that someone remembered how funny life can be",
  "the final report confirms that gentle chaos is good for morale"
];

const joy_endings = [
  "Please respond with a smile at your earliest convenience.",
  "No further seriousness is required.",
  "All witnesses support the joke.",
  "The case may now dissolve into laughter.",
  "The evidence has been filed under 'worth it.'",
  "The mood is expected to improve shortly.",
  "No apology will be accepted for enjoying this.",
  "The romance department remains calmly amused.",
  "Nothing was harmed except unnecessary tension.",
  "A tiny laugh is the recommended next step.",
  "This message is legally allowed to become a grin.",
  "The whole situation is now beautifully unserious."
];

const seed_love = [
  "If only I could kidnap you into our little universe, even Google would not be able to find you.",
  "I love you in the quiet places where words arrive late and the heart has already spoken.",
  "Svetlana, every ordinary day becomes warmer when your name passes through my mind.",
  "If I could fold the distance between us, I would keep you close enough for the universe to get jealous.",
  "I love you more gently than morning light and more stubbornly than time.",
  "You are the soft interruption my heart never wants to mute.",
  "My love for you keeps finding new rooms inside me.",
  "You are my favorite thought, my softest dream, and the reason ordinary minutes feel golden."
];

const love_openings = [
  "Svetlana",
  "My angel Svetlana",
  "My love",
  "My heart",
  "My soft universe",
  "My favorite miracle",
  "My sweetest distance",
  "My always",
  "Beautiful soul",
  "Golden one"
];

const love_images = [
  "you are the quiet light that keeps returning to me",
  "you are the home my heart recognizes in any weather",
  "you are the warm line running through an ordinary day",
  "you are the reason distance never gets the last word",
  "you are the soft place my thoughts go when they are tired",
  "you are the hidden melody beneath my happiest moments",
  "you are the kind answer to a question my soul had been carrying",
  "you are the page of life I never want to finish reading",
  "you are the calm in the middle of every loud hour",
  "you are the little universe I would choose every time"
];

const love_actions = [
  "I would keep choosing you even on the quiet days that ask for patience",
  "I would save every small memory with you like it was made of gold",
  "I would fold the distance smaller every chance I got",
  "I would protect your smile like it was my favorite sunrise",
  "I would make room for you in every version of my future",
  "I would let the whole internet lose you if it meant I found you in my arms",
  "I would carry your laugh with me like a private treasure",
  "I would turn missing you into another reason to love you harder",
  "I would build tenderness into the walls of every tomorrow",
  "I would keep your name warm in every language I learn"
];

const love_closings = [
  "I love you more than yesterday, and yesterday was already serious.",
  "You are my favorite place to arrive.",
  "Even far away, you are close to the best part of me.",
  "My heart keeps choosing you without asking permission.",
  "You make the world feel less random and more kind.",
  "No distance can make my heart forget where it belongs.",
  "You are my softest certainty.",
  "You are worth every wait and every wish.",
  "I miss you with a smile hidden inside it.",
  "You make my future feel like a hand reaching back for mine."
];

const seed_night_tales = [
  "Tonight the city went quiet early, but the moon stayed awake a little longer, as if it knew one heart still wanted a story before sleep. So it laid a silver path across the rooftops and whispered that the softest distances are often the ones already learning how to disappear.",
  "In a small invisible garden above the night, the stars kept passing a secret from one to another: somewhere below, two souls had already found each other, and that was enough to make the darkness gentle.",
  "The night folded itself around the windows like velvet, and somewhere between the hush of the room and the hush of the sky, love sat down without making a sound and stayed.",
  "A slow wind crossed the sleeping buildings and carried one quiet truth with it: there are hearts that know each other long before the world learns their names.",
  "The lamp, the moon, and the last awake star kept each other company until the room felt less like a room and more like a safe harbor made of light."
];

const night_openings = [
  "Tonight",
  "After 21:00",
  "In the quiet hour",
  "When the windows turned dark and kind",
  "At the edge of sleep",
  "Under the patient moon",
  "When the city finally lowered its voice",
  "Deep inside the blue hour",
  "While the rooftops rested",
  "In the hush before dreams"
];

const night_scenes = [
  "the moon lingered above the rooftops as if it had one more secret to tell",
  "the stars arranged themselves like a note nobody wanted to fold away",
  "the wind moved slowly, careful not to disturb the last good thought of the day",
  "the room held its breath the way a story does before its gentlest sentence",
  "the curtains floated softly as if they had learned the language of lullabies",
  "the streetlights kept watch like quiet guardians of tender things",
  "the dark felt less empty and more like velvet around a jewel",
  "the sky looked close enough to touch with one brave little wish",
  "the silence became warm instead of lonely",
  "the last light in the room felt almost human with patience"
];

const night_turns = [
  "and somewhere inside that stillness, love became easier to hear",
  "and the heart remembered that waiting can still be full of light",
  "and every distance looked less like a wall and more like a road on its way home",
  "and even the shadows seemed willing to soften at the edges",
  "and the quiet turned into a place where hope could sit down and stay",
  "and the whole night seemed to lean closer, just to listen",
  "and the world felt briefly arranged in the right order",
  "and a small peace arrived without asking for attention",
  "and the darkness lost its sharp corners",
  "and the sky behaved like it already knew the ending would be gentle"
];

const night_closings = [
  "So the night carried its story carefully, like a candle shielded from the wind.",
  "And that was enough to make sleep feel like a blessing instead of an ending.",
  "The tale ended softly, the way good nights always should.",
  "Nothing dramatic happened after that, only peace.",
  "The stars kept the rest of the story until tomorrow.",
  "By then the heart had already understood everything it needed.",
  "The room stayed quiet, but it was no longer empty.",
  "Even silence seemed grateful to be there."
];

const seed_joy_de = [
  "Harmloser Schabernack fuer heute: Schreib 'Ich habe Neuigkeiten' und verrate dann, dass der Kaffee seinen Job verloren hat, weil ein Laecheln schon alles erledigt.",
  "Kleiner Comedy-Bericht: Der Mond hat eine Beschwerde eingereicht, weil schon wieder jemand poetisch geworden ist.",
  "Sanfter Scherz fuer heute: Sag 'wir muessen eine Minute ernst sein' und verbringt dann die ganze Minute damit, nicht zu lachen.",
  "Eilmeldung: Das Erwachsensein wollte heute Morgen fast beginnen, aber dann kam das Fruehstueck dazwischen.",
  "Kleines Lachen fuer heute: Falls das WLAN fragt, warum alles waermer wirkt, bitte die gute Stimmung nicht verraten."
];

const joy_openings_de = [
  "Kleiner harmloser Unsinn",
  "Kleine Wendung des Tages",
  "Sanfter Comedy-Alarm",
  "Freundlicher Nonsens-Bericht",
  "Heutige Spielidee",
  "Milde Schabernack-Meldung",
  "Inoffizielles Gluecks-Memo",
  "Kleines Drama-Bulletin",
  "Sehr unserioeses Update",
  "Taegliche Lach-Notiz",
  "Mini-Unsinn des Tages",
  "Harmloser Trouble-Bericht"
];

const joy_setups_de = [
  "Schreib 'ich habe etwas Verdaechtiges entdeckt'",
  "Sag 'wir brauchen eine professionelle Meinung'",
  "Schreib 'die Kueche hat eine Erklaerung abgegeben'",
  "Verkuende, dass die Playlist wieder emotional geworden ist",
  "Behaupte, der Kaffee habe einen Anwalt verlangt",
  "Sag, das Kissen verbreite Geruechte",
  "Schreib 'ich habe haeusliche Eilmeldungen'",
  "Erklaere, dass der Mond ploetzlich wertend geworden ist",
  "Informiere alle, dass die Wetter-App wieder verwirrt ist",
  "Sag 'ich habe die Beweise geprueft'",
  "Schreib 'dies ist eine offizielle Mitteilung der Lach-Abteilung'",
  "Verkuende, dass der Toaster mehr Anerkennung moechte",
  "Behaupte, der Wecker verlange Respekt",
  "Schreib 'ich habe ein ernstes Ergebnis aus der Untersuchung'",
  "Erklaere, dass der Gruppenchat kurz vor Theater steht",
  "Sag, das Kuehlschranklicht verdiene einen Preis",
  "Schreib 'die Sterne haben gestern Nacht getagt'",
  "Verkuende, dass die Socken wieder verschwinden wollen",
  "Sag 'der Wasserkessel ist zu einem emotionalen Schluss gekommen'",
  "Schreib 'der Tag hat eine offizielle Beschwerde eingereicht'"
];

const joy_reveals_de = [
  "das Verdaechtige ist, wie schnell gute Laune einen gewoehnlichen Raum uebernehmen kann",
  "die professionelle Meinung lautet, dass ein Lachen alles verbessern wuerde",
  "die Erklaerung sagt, dass Dessert unschuldig ist und sofort unterstuetzt werden sollte",
  "die Playlist wurde emotional, weil ein Lied den Sommer nicht vergessen hat",
  "der Kaffee Hilfe braucht, um gegen charmante Menschen anzukommen",
  "das Kissen meint, niemand sollte ohne Applaus aus einem warmen Bett aufstehen muessen",
  "die Eilmeldung lautet, dass der Tag nach einem guten Gespraech besser geworden ist",
  "der Mond wertend ist, weil ihn niemand zum Fruehstueck eingeladen hat",
  "die Wetter-App nicht erklaeren kann, warum alles weicher wirkt als vorhergesagt",
  "die Beweise auf eine gefaehrliche Menge versteckter Suessigkeit hindeuten",
  "die Lach-Abteilung ein dramatisches Laecheln und null Stress genehmigt hat",
  "der Toaster fuer taegliche Knusper-Treue gewuerdigt werden moechte",
  "der Wecker beleidigt ist, weil alle ihm die Existenz des Morgens vorwerfen",
  "die Untersuchung Spuren von Freude gefunden hat, wo Ernst erwartet wurde",
  "der Gruppenchat zu Theater geworden ist, weil nur noch ein Emoji bis zum Monolog fehlt",
  "der Preis an das Kuehlschranklicht fuer Einsatz unter schwierigen Dessert-Bedingungen geht",
  "die Sterne beschlossen haben, dass manche Menschen die Nacht weniger einsam machen",
  "die Socken nur verschwinden, um das Leben geheimnisvoll zu halten",
  "der Wasserkessel beschlossen hat, dass Tee im Grunde eine kleine Form von Vergebung ist",
  "die Beschwerde sagt, dass der Tag zu angenehm geworden ist, um noch gewoehnlich zu sein",
  "der ganze Notfall darin besteht, dass jemand wieder gemerkt hat, wie lustig das Leben sein kann",
  "der Abschlussbericht bestaetigt, dass sanftes Chaos gut fuer die Stimmung ist"
];

const joy_endings_de = [
  "Bitte antworte bei Gelegenheit mit einem Laecheln.",
  "Weitere Ernsthaftigkeit ist nicht noetig.",
  "Alle Zeugen stehen hinter dem Witz.",
  "Der Fall darf sich nun in Lachen aufloesen.",
  "Die Beweise wurden unter 'lohnt sich' abgelegt.",
  "Mit besserer Stimmung ist in Kuerze zu rechnen.",
  "Keine Entschuldigung fuer Genuss wird angenommen.",
  "Die Romantik-Abteilung bleibt ruhig amuesiert.",
  "Niemand kam zu Schaden, ausser unnoetiger Spannung.",
  "Ein kleines Lachen ist der empfohlene naechste Schritt.",
  "Diese Nachricht darf sich legal in ein Grinsen verwandeln.",
  "Die ganze Lage ist jetzt wunderschoen unserioes."
];

const seed_love_de = [
  "Wenn ich dich nur in unser kleines Universum entfuehren koennte, wuerde dich nicht einmal Google finden.",
  "Svetlana, ich liebe dich an den stillen Orten, wo Worte zu spaet kommen und das Herz schon gesprochen hat.",
  "Jeder gewoehnliche Tag wird waermer, sobald dein Name durch meine Gedanken geht.",
  "Wenn ich die Entfernung zwischen uns falten koennte, wuerde ich dich so nah halten, dass das Universum neidisch wird.",
  "Ich liebe dich sanfter als Morgenlicht und sturer als die Zeit.",
  "Du bist die weiche Unterbrechung, die mein Herz nie stumm schalten will."
];

const love_openings_de = [
  "Svetlana",
  "Mein Engel Svetlana",
  "Meine Liebe",
  "Mein Herz",
  "Mein weiches Universum",
  "Mein liebstes Wunder",
  "Meine suesseste Ferne",
  "Mein Immer",
  "Schoene Seele",
  "Goldener Gedanke"
];

const love_images_de = [
  "du bist das stille Licht, das immer wieder zu mir zurueckfindet",
  "du bist das Zuhause, das mein Herz bei jedem Wetter erkennt",
  "du bist die warme Linie durch einen gewoehnlichen Tag",
  "du bist der Grund, warum Entfernung nie das letzte Wort bekommt",
  "du bist der weiche Ort, an den meine Gedanken gehen, wenn sie muede sind",
  "du bist die verborgene Melodie unter meinen gluecklichsten Momenten",
  "du bist die freundliche Antwort auf eine Frage, die meine Seele lange getragen hat",
  "du bist die Seite meines Lebens, die ich nie zu Ende lesen will",
  "du bist die Ruhe mitten in jeder lauten Stunde",
  "du bist das kleine Universum, das ich jedes Mal waehlen wuerde"
];

const love_actions_de = [
  "ich wuerde dich selbst an stillen Tagen immer wieder waehlen",
  "ich wuerde jede kleine Erinnerung mit dir wie Gold bewahren",
  "ich wuerde die Entfernung bei jeder Gelegenheit kleiner falten",
  "ich wuerde dein Laecheln schuetzen wie meinen liebsten Sonnenaufgang",
  "ich wuerde dir in jeder Version meiner Zukunft Raum geben",
  "ich wuerde das ganze Internet dich verlieren lassen, wenn ich dich dafuer in meinen Armen finde",
  "ich wuerde dein Lachen wie einen privaten Schatz mit mir tragen",
  "ich wuerde Vermissen in einen weiteren Grund verwandeln, dich mehr zu lieben",
  "ich wuerde Zaertlichkeit in die Waende jedes Morgens bauen",
  "ich wuerde deinen Namen in jeder Sprache warm halten, die ich lerne"
];

const love_closings_de = [
  "Ich liebe dich mehr als gestern, und gestern war es schon ernst.",
  "Du bist mein liebster Ort zum Ankommen.",
  "Auch aus der Ferne bist du dem besten Teil von mir nah.",
  "Mein Herz waehlt dich, ohne um Erlaubnis zu fragen.",
  "Du laesst die Welt weniger zufaellig und freundlicher wirken.",
  "Keine Entfernung kann mein Herz vergessen lassen, wohin es gehoert.",
  "Du bist meine weichste Gewissheit.",
  "Du bist jedes Warten und jeden Wunsch wert.",
  "Ich vermisse dich mit einem versteckten Laecheln darin.",
  "Du laesst meine Zukunft wie eine Hand wirken, die nach meiner zurueckgreift."
];

const seed_night_tales_de = [
  "Heute Nacht wurde die Stadt frueh still, aber der Mond blieb noch ein wenig wach, als wuesste er, dass ein Herz noch eine Geschichte vor dem Schlafen wollte. Also legte er einen silbernen Weg ueber die Daecher und fluesterte, dass die sanftesten Entfernungen oft schon dabei sind zu verschwinden.",
  "In einem kleinen unsichtbaren Garten ueber der Nacht gaben die Sterne ein Geheimnis weiter: irgendwo darunter hatten zwei Seelen einander bereits gefunden, und das reichte aus, um die Dunkelheit weich zu machen.",
  "Die Nacht legte sich wie Samt um die Fenster, und irgendwo zwischen der Stille des Zimmers und der Stille des Himmels setzte sich die Liebe hin, ohne ein Geraeusch zu machen, und blieb."
];

const night_openings_de = [
  "Heute Nacht",
  "Nach 21 Uhr",
  "In der stillen Stunde",
  "Als die Fenster dunkel und freundlich wurden",
  "Am Rand des Schlafs",
  "Unter dem geduldigen Mond",
  "Als die Stadt endlich leiser wurde",
  "Tief in der blauen Stunde",
  "Waehrend die Daecher ruhten",
  "In der Ruhe vor den Traeumen"
];

const night_scenes_de = [
  "blieb der Mond ueber den Daechern stehen, als haette er noch ein Geheimnis zu erzaehlen",
  "ordneten sich die Sterne wie eine Notiz, die niemand mehr wegfalten wollte",
  "bewegte sich der Wind langsam, um den letzten guten Gedanken des Tages nicht zu stoeren",
  "hielt der Raum den Atem an wie eine Geschichte vor ihrem sanftesten Satz",
  "schwebten die Vorhaenge weich, als haetten sie die Sprache von Wiegenliedern gelernt",
  "wachten die Strassenlichter wie ruhige Hueter zarter Dinge",
  "fuehlte sich die Dunkelheit weniger leer und mehr wie Samt um ein Juwel an",
  "wirkte der Himmel nah genug fuer einen mutigen kleinen Wunsch",
  "wurde die Stille warm statt einsam",
  "bekam das letzte Licht im Zimmer fast etwas Menschliches"
];

const night_turns_de = [
  "und irgendwo in dieser Stille wurde Liebe leichter hoerbar",
  "und das Herz erinnerte sich daran, dass Warten trotzdem Licht enthalten kann",
  "und jede Entfernung sah weniger wie eine Mauer und mehr wie ein Heimweg aus",
  "und selbst die Schatten waren bereit, weicher zu werden",
  "und die Ruhe verwandelte sich in einen Ort, an dem Hoffnung sitzen bleiben konnte",
  "und die ganze Nacht schien sich nur zum Zuhoeren naeher zu lehnen",
  "und die Welt fuehlte sich fuer einen Moment richtig sortiert an",
  "und ein kleiner Frieden kam, ohne Aufmerksamkeit zu verlangen",
  "und die Dunkelheit verlor ihre scharfen Ecken",
  "und der Himmel benahm sich, als kenne er bereits das sanfte Ende"
];

const night_closings_de = [
  "So trug die Nacht ihre Geschichte vorsichtig wie eine vor dem Wind geschuetzte Kerze.",
  "Und das reichte aus, damit Schlaf sich wie ein Segen anfuehlte.",
  "Die Geschichte endete sanft, so wie gute Naechte enden sollten.",
  "Danach geschah nichts Grosses mehr, nur Frieden.",
  "Die Sterne behielten den Rest der Geschichte bis morgen.",
  "Bis dahin hatte das Herz schon alles verstanden, was es wissen musste.",
  "Der Raum blieb still, aber nicht mehr leer.",
  "Sogar die Stille wirkte dankbar, dort sein zu duerfen."
];

function build_daily_joy(target_count, {
  seed_messages,
  openings,
  setups,
  reveals,
  endings,
  connector,
  seed_text
}) {
  const messages = [...seed_messages];

  for (const opening of openings) {
    for (const setup of setups) {
      for (const reveal of reveals) {
        const ending = endings[(messages.length + setup.length + reveal.length) % endings.length];
        messages.push(`${opening}: ${setup}. ${connector(reveal)} ${ending}`);

        if (unique_messages(messages).length >= target_count) {
          return slice_shuffled(messages, target_count, seed_text);
        }
      }
    }
  }

  return slice_shuffled(messages, target_count, seed_text);
}

function build_love_notes(target_count, {
  seed_messages,
  openings,
  images,
  actions,
  closings,
  seed_text
}) {
  const messages = [...seed_messages];

  for (const opening of openings) {
    for (const image of images) {
      for (const action of actions) {
        const closing = closings[(messages.length + image.length + action.length) % closings.length];
        messages.push(`${opening}, ${image}. ${action}. ${closing}`);

        if (unique_messages(messages).length >= target_count) {
          return slice_shuffled(messages, target_count, seed_text);
        }
      }
    }
  }

  return slice_shuffled(messages, target_count, seed_text);
}

function build_night_tales(target_count, {
  seed_messages,
  openings,
  scenes,
  turns,
  closings,
  seed_text
}) {
  const messages = [...seed_messages];

  for (const opening of openings) {
    for (const scene of scenes) {
      for (const turn of turns) {
        const closing = closings[(messages.length + scene.length + turn.length) % closings.length];
        messages.push(`${opening}, ${scene}, ${turn}. ${closing}`);

        if (unique_messages(messages).length >= target_count) {
          return slice_shuffled(messages, target_count, seed_text);
        }
      }
    }
  }

  return slice_shuffled(messages, target_count, seed_text);
}

const english_joy = build_daily_joy(730, {
  seed_messages: seed_joy,
  openings: joy_openings,
  setups: joy_setups,
  reveals: joy_reveals,
  endings: joy_endings,
  connector: (reveal) => `Then confess that ${reveal}.`,
  seed_text: "english_joy"
});

const german_joy = build_daily_joy(730, {
  seed_messages: seed_joy_de,
  openings: joy_openings_de,
  setups: joy_setups_de,
  reveals: joy_reveals_de,
  endings: joy_endings_de,
  connector: (reveal) => `Dann beichte, dass ${reveal}.`,
  seed_text: "german_joy"
});

const english_love = build_love_notes(540, {
  seed_messages: seed_love,
  openings: love_openings,
  images: love_images,
  actions: love_actions,
  closings: love_closings,
  seed_text: "english_love"
});

const german_love = build_love_notes(540, {
  seed_messages: seed_love_de,
  openings: love_openings_de,
  images: love_images_de,
  actions: love_actions_de,
  closings: love_closings_de,
  seed_text: "german_love"
});

const english_night_tales = build_night_tales(420, {
  seed_messages: seed_night_tales,
  openings: night_openings,
  scenes: night_scenes,
  turns: night_turns,
  closings: night_closings,
  seed_text: "english_night_tales"
});

const german_night_tales = build_night_tales(420, {
  seed_messages: seed_night_tales_de,
  openings: night_openings_de,
  scenes: night_scenes_de,
  turns: night_turns_de,
  closings: night_closings_de,
  seed_text: "german_night_tales"
});

fs.mkdirSync(data_directory, { recursive: true });
fs.writeFileSync(joy_path, `${JSON.stringify(english_joy, null, 2)}\n`);
fs.writeFileSync(joy_de_path, `${JSON.stringify(german_joy, null, 2)}\n`);
fs.writeFileSync(love_path, `${JSON.stringify(english_love, null, 2)}\n`);
fs.writeFileSync(love_de_path, `${JSON.stringify(german_love, null, 2)}\n`);
fs.writeFileSync(night_tales_path, `${JSON.stringify(english_night_tales, null, 2)}\n`);
fs.writeFileSync(night_tales_de_path, `${JSON.stringify(german_night_tales, null, 2)}\n`);

console.log("Generated 730 joy messages, 540 love notes, and 420 night tales in English and German.");

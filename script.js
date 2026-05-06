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
const memory_storage_key = "svetlana_diab_memories";
const event_storage_key = "svetlana_diab_events";
const theme_storage_key = "svetlana_diab_theme";
const language_storage_key = "svetlana_diab_language";

const fallback_daily_joy_messages = [
  "Today's prank: look very serious and say, 'Svetlana, we need to talk.' Then pause like a movie villain and confess: 'Your smile is illegally powerful and I demand compensation in laughter.'",
  "Tiny mission: send 'I have evidence' and when she asks what evidence, say: 'Screenshots from my heart proving you are adorable.'",
  "Today's comedy report: Diab tried to act normal, then remembered Svetlana exists and immediately lost the case.",
  "Prank plan: ask her if she knows German law. When she says no, tell her: 'Too late, you have been sentenced to one hug in my imagination.'",
  "Breaking news: local heart refuses to behave after receiving one message from Svetlana.",
  "Today's emergency: send 'I need help' then explain the problem is that she is too cute and customer service is not answering.",
  "Romantic prank: say 'I found your secret talent.' The secret talent is making Diab smile like he forgot all adult responsibilities.",
  "Tiny story: the coffee asked why Diab was smiling. The coffee was informed it would not understand because it is only coffee.",
  "Today's silly warning: if Svetlana smiles too much, Diab may start writing poetry without supervision.",
  "Prank idea: say 'I am filing a complaint.' Complaint: she keeps being wonderful with no permit."
];

const fallback_daily_love_messages = [
  "If only I could kidnap you into our little universe, even Google would not be able to find you.",
  "I love you in the quiet places where words arrive late and the heart has already spoken.",
  "Svetlana, every ordinary day becomes warmer when your name passes through my mind.",
  "If I could fold the distance between us, I would keep you close enough for the universe to get jealous.",
  "I love you more gently than morning light and more stubbornly than time."
];

const fallback_daily_joy_messages_de = [
  "Heutiger Streich: Schreib ganz ernst, 'Svetlana, wir müssen reden.' Dann gestehe: 'Dein Lächeln ist viel zu stark und ich fordere Schadenersatz in Form von Lachen.'",
  "Kleine Mission: Schreib 'Ich habe Beweise.' Wenn sie fragt welche, sag: 'Screenshots aus meinem Herzen, die beweisen, dass du bezaubernd bist.'",
  "Heutiger Comedy-Bericht: Diab wollte normal sein, erinnerte sich an Svetlana und verlor sofort den Fall.",
  "Streichplan: Frag sie, ob sie deutsches Recht kennt. Wenn nicht, sag: 'Zu spät, du wurdest zu einer Umarmung in meiner Vorstellung verurteilt.'",
  "Eilmeldung: Ein lokales Herz weigert sich, sich nach einer Nachricht von Svetlana normal zu benehmen."
];

const fallback_daily_love_messages_de = [
  "Wenn ich dich nur in unser kleines Universum entführen könnte, würde dich nicht einmal Google finden.",
  "Svetlana, ich liebe dich an den stillen Orten, wo Worte zu spät kommen und das Herz schon gesprochen hat.",
  "Jeder gewöhnliche Tag wird wärmer, sobald dein Name durch meine Gedanken geht.",
  "Wenn ich die Entfernung zwischen uns falten könnte, würde ich dich so nah halten, dass das Universum neidisch wird.",
  "Ich liebe dich sanfter als Morgenlicht und sturer als die Zeit."
];

const translations = {
  en: {
    document_language: "en",
    language_button: "DE",
    login_eyebrow: "our private place",
    login_copy: "A little door made only for two hearts.",
    username_label: "Name",
    password_label: "Secret word",
    username_placeholder: "Svetlana",
    password_placeholder: "Our secret",
    login_button: "Enter our world",
    login_error: "This little world opens only with the right name and secret word.",
    welcome_kicker: "hello, beautiful soul",
    enter_home_button: "Enter and keep smiling",
    header_eyebrow: "only ours",
    dark_theme_button: "Dark theme",
    light_theme_button: "Light theme",
    logout_button: "Leave softly",
    hero_eyebrow: "a place for us",
    hero_heading: "Every day with you becomes part of the story.",
    hero_message_svetlana: "This place is here to greet you gently, make you smile, and keep every precious day close.",
    hero_message_diab: "A home for the joy Svetlana brings, and for every memory worth keeping.",
    today_prank_eyebrow: "today's prank",
    today_prank_heading: "One little laugh for today",
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
    made_with_love: "Made with Love By Diab",
    love_note_eyebrow: "today's love note",
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
    locale: "en",
    greetings: {
      morning_svetlana: ["Good morning, my angel Svetlana", "Guten Morgen, mein Engel Svetlana"],
      afternoon_svetlana: ["Good afternoon, my angel Svetlana", "Guten Tag, mein Engel Svetlana"],
      evening_svetlana: ["Good evening, my angel Svetlana", "Guten Abend, mein Engel Svetlana"],
      night_svetlana: ["Good night, my angel Svetlana", "Gute Nacht, mein Engel Svetlana"],
      morning_diab: ["Good morning, Diab", "Guten Morgen, Diab"],
      afternoon_diab: ["Good afternoon, Diab", "Guten Tag, Diab"],
      evening_diab: ["Good evening, Diab", "Guten Abend, Diab"],
      night_diab: ["Good night, Diab", "Gute Nacht, Diab"]
    }
  },
  de: {
    document_language: "de",
    language_button: "US",
    login_eyebrow: "unser privater Ort",
    login_copy: "Eine kleine Tür, gemacht nur für zwei Herzen.",
    username_label: "Name",
    password_label: "Geheimwort",
    username_placeholder: "Svetlana",
    password_placeholder: "Unser Geheimnis",
    login_button: "Unsere Welt betreten",
    login_error: "Diese kleine Welt öffnet sich nur mit dem richtigen Namen und Geheimwort.",
    welcome_kicker: "hallo, schöne Seele",
    enter_home_button: "Eintreten und weiterlächeln",
    header_eyebrow: "nur unseres",
    dark_theme_button: "Dunkles Design",
    light_theme_button: "Helles Design",
    logout_button: "Sanft gehen",
    hero_eyebrow: "ein Ort für uns",
    hero_heading: "Jeder Tag mit dir wird Teil der Geschichte.",
    hero_message_svetlana: "Dieser Ort ist hier, um dich sanft zu begrüßen, dich lächeln zu lassen und jeden kostbaren Tag nah zu halten.",
    hero_message_diab: "Ein Zuhause für die Freude, die Svetlana bringt, und für jede Erinnerung, die bewahrt werden soll.",
    today_prank_eyebrow: "heutiger Streich",
    today_prank_heading: "Ein kleines Lachen für heute",
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
    gallery_eyebrow: "Fotos und Lächeln",
    gallery_heading: "Erinnerungsgalerie",
    add_memory: "Erinnerung hinzufügen",
    events_eyebrow: "unser kleines Fürimmer",
    events_heading: "Schöne Tage",
    add_event: "Tag hinzufügen",
    made_with_love: "Mit Liebe gemacht von Diab",
    love_note_eyebrow: "heutige Liebesnachricht",
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
    delete_memory_confirm: "Diese Erinnerung löschen?",
    delete_event_confirm: "Diesen Tag löschen?",
    fallback_memory_date: "Ein Tag zum Bewahren",
    fallback_event_date: "Ein schöner Tag",
    default_memory_one_title: "Der erste goldene Rahmen",
    default_memory_one_date: "Wartet auf ein Lächeln",
    default_memory_one_note: "Das erste Foto, das du hinzufügst, wird hier leben.",
    default_memory_two_title: "Eine weiche kleine Erinnerung",
    default_memory_two_date: "Irgendein schöner Tag",
    default_memory_two_note: "Ein Platz für ein Bild, einen Satz und das Gefühl darum herum.",
    default_memory_three_title: "Der nächste Lieblingsmoment",
    default_memory_three_date: "Bald, ganz natürlich",
    default_memory_three_note: "Bereit, sobald ein Tag zu süß wird, um ihn zu vergessen.",
    first_event_date: "18. Januar 2025",
    first_event_title: "Der Tag, an dem wir uns gefunden haben",
    first_event_description: "Der Anfang von etwas Seltenem und Schönem.",
    years: ["Jahr", "Jahre"],
    months: ["Monat", "Monate"],
    days: ["Tag", "Tage"],
    locale: "de-DE",
    greetings: {
      morning_svetlana: ["Guten Morgen, mein Engel Svetlana", "Ein neuer Tag in unserer kleinen Welt."],
      afternoon_svetlana: ["Guten Tag, mein Engel Svetlana", "Ich hoffe, dein Tag fühlt sich weich und hell an."],
      evening_svetlana: ["Guten Abend, mein Engel Svetlana", "Der Abend gehört ein bisschen uns."],
      night_svetlana: ["Gute Nacht, mein Engel Svetlana", "Möge dein Herz ruhig und geliebt schlafen."],
      morning_diab: ["Guten Morgen, Diab", "Ein weiterer Tag mit Svetlana im Herzen."],
      afternoon_diab: ["Guten Tag, Diab", "Bewahre die Freude gut auf."],
      evening_diab: ["Guten Abend, Diab", "Die kleine Welt wartet auf neue Erinnerungen."],
      night_diab: ["Gute Nacht, Diab", "Svetlana bleibt der schönste Gedanke."],
    }
  }
};

const default_memory_gallery_items = [
  {
    id: "first_empty_frame",
    is_placeholder: true,
    title: "First golden frame",
    date_label: "Waiting for a smile",
    date_value: "",
    note: "The first photo you add will live here.",
    image_data: ""
  },
  {
    id: "soft_little_memory",
    is_placeholder: true,
    title: "A soft little memory",
    date_label: "Any beautiful day",
    date_value: "",
    note: "A place for a picture, a sentence, and the feeling around it.",
    image_data: ""
  },
  {
    id: "next_favorite_moment",
    is_placeholder: true,
    title: "The next favorite moment",
    date_label: "Soon, naturally",
    date_value: "",
    note: "Ready whenever a day becomes too sweet to forget.",
    image_data: ""
  }
];

const default_event_timeline_items = [
  {
    id: "first_day",
    is_locked: true,
    date_label: "January 18, 2025",
    date_value: "2025-01-18",
    title: "The day we found each other",
    description: "The beginning of something rare and beautiful."
  }
];

function get_default_memory_gallery_items() {
  return [
    {
      id: "first_empty_frame",
      is_placeholder: true,
      title: translate("default_memory_one_title"),
      date_label: translate("default_memory_one_date"),
      date_value: "",
      note: translate("default_memory_one_note"),
      image_data: ""
    },
    {
      id: "soft_little_memory",
      is_placeholder: true,
      title: translate("default_memory_two_title"),
      date_label: translate("default_memory_two_date"),
      date_value: "",
      note: translate("default_memory_two_note"),
      image_data: ""
    },
    {
      id: "next_favorite_moment",
      is_placeholder: true,
      title: translate("default_memory_three_title"),
      date_label: translate("default_memory_three_date"),
      date_value: "",
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
  de: fallback_daily_joy_messages_de
};
let daily_love_messages_by_language = {
  en: fallback_daily_love_messages,
  de: fallback_daily_love_messages_de
};
let current_memory_items = [];
let current_event_items = [];
let editing_memory_id = null;
let editing_event_id = null;
let editing_memory_image_data = "";
let welcome_audio_context = null;

document.addEventListener("DOMContentLoaded", initialize_application);

async function initialize_application() {
  collect_dom_references();
  bind_event_handlers();
  apply_saved_language();
  apply_saved_theme();
  daily_joy_messages_by_language = await load_daily_joy_messages_by_language();
  daily_love_messages_by_language = await load_daily_love_messages_by_language();
  apply_language();
  update_today_prank_message();
  update_daily_love_message();
  await load_saved_content();
  update_home_counters();
}

function collect_dom_references() {
  dom_references.reaction_layer = document.getElementById("reaction_layer");
  dom_references.language_toggle_button = document.getElementById("language_toggle_button");
  dom_references.language_flag_icon = document.getElementById("language_flag_icon");
  dom_references.login_screen = document.getElementById("login_screen");
  dom_references.login_form = document.getElementById("login_form");
  dom_references.username_input = document.getElementById("username_input");
  dom_references.password_input = document.getElementById("password_input");
  dom_references.login_error_message = document.getElementById("login_error_message");
  dom_references.welcome_overlay = document.getElementById("welcome_overlay");
  dom_references.welcome_primary_message = document.getElementById("welcome_primary_message");
  dom_references.welcome_secondary_message = document.getElementById("welcome_secondary_message");
  dom_references.daily_joy_message = document.getElementById("daily_joy_message");
  dom_references.enter_home_button = document.getElementById("enter_home_button");
  dom_references.home_screen = document.getElementById("home_screen");
  dom_references.home_greeting = document.getElementById("home_greeting");
  dom_references.hero_personal_message = document.getElementById("hero_personal_message");
  dom_references.today_prank_message = document.getElementById("today_prank_message");
  dom_references.today_prank_card = document.querySelector(".today_prank_card");
  dom_references.daily_love_message = document.getElementById("daily_love_message");
  dom_references.daily_love_note = document.querySelector(".daily_love_note");
  dom_references.hero_symbol = document.querySelector(".hero_symbol");
  dom_references.days_together_counter = document.getElementById("days_together_counter");
  dom_references.years_together_counter = document.getElementById("years_together_counter");
  dom_references.diab_age_counter = document.getElementById("diab_age_counter");
  dom_references.svetlana_age_counter = document.getElementById("svetlana_age_counter");
  dom_references.diab_next_birthday_message = document.getElementById("diab_next_birthday_message");
  dom_references.svetlana_next_birthday_message = document.getElementById("svetlana_next_birthday_message");
  dom_references.memory_gallery = document.getElementById("memory_gallery");
  dom_references.event_timeline = document.getElementById("event_timeline");
  dom_references.add_memory_button = document.getElementById("add_memory_button");
  dom_references.add_event_button = document.getElementById("add_event_button");
  dom_references.logout_button = document.getElementById("logout_button");
  dom_references.theme_toggle_button = document.getElementById("theme_toggle_button");
  dom_references.memory_dialog = document.getElementById("memory_dialog");
  dom_references.event_dialog = document.getElementById("event_dialog");
  dom_references.memory_form = document.getElementById("memory_form");
  dom_references.event_form = document.getElementById("event_form");
  dom_references.memory_dialog_title = document.getElementById("memory_dialog_title");
  dom_references.event_dialog_title = document.getElementById("event_dialog_title");
  dom_references.close_memory_dialog_button = document.getElementById("close_memory_dialog_button");
  dom_references.close_event_dialog_button = document.getElementById("close_event_dialog_button");
  dom_references.memory_title_input = document.getElementById("memory_title_input");
  dom_references.memory_date_input = document.getElementById("memory_date_input");
  dom_references.memory_note_input = document.getElementById("memory_note_input");
  dom_references.memory_image_input = document.getElementById("memory_image_input");
  dom_references.memory_image_hint = document.getElementById("memory_image_hint");
  dom_references.save_memory_button = document.getElementById("save_memory_button");
  dom_references.save_event_button = document.getElementById("save_event_button");
  dom_references.event_title_input = document.getElementById("event_title_input");
  dom_references.event_date_input = document.getElementById("event_date_input");
  dom_references.event_description_input = document.getElementById("event_description_input");
}

function bind_event_handlers() {
  dom_references.language_toggle_button.addEventListener("click", toggle_language);
  dom_references.login_form.addEventListener("submit", handle_login);
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
  dom_references.close_memory_dialog_button.addEventListener("click", () => close_dialog(dom_references.memory_dialog));
  dom_references.close_event_dialog_button.addEventListener("click", () => close_dialog(dom_references.event_dialog));
  dom_references.memory_form.addEventListener("submit", save_memory_from_form);
  dom_references.event_form.addEventListener("submit", save_event_from_form);
  dom_references.memory_gallery.addEventListener("click", handle_memory_action);
  dom_references.event_timeline.addEventListener("click", handle_event_action);
  dom_references.today_prank_card.addEventListener("click", (event) => burst_reaction(event.currentTarget, "spark"));
  dom_references.daily_love_note.addEventListener("click", (event) => burst_reaction(event.currentTarget, "heart"));
  dom_references.hero_symbol.addEventListener("click", (event) => burst_reaction(event.currentTarget, "heart"));
}

function translate(key, ...args) {
  const value = translations[current_language][key];
  return typeof value === "function" ? value(...args) : value;
}

function set_text(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.textContent = value;
  }
}

function set_placeholder(selector, value) {
  const element = document.querySelector(selector);

  if (element) {
    element.placeholder = value;
  }
}

function apply_saved_language() {
  current_language = localStorage.getItem(language_storage_key) || "en";
  document.documentElement.lang = translate("document_language");
}

function toggle_language() {
  current_language = current_language === "en" ? "de" : "en";
  localStorage.setItem(language_storage_key, current_language);
  apply_language();
  burst_reaction(dom_references.language_toggle_button, "spark", 8);
}

function apply_language() {
  document.documentElement.lang = translate("document_language");
  dom_references.language_flag_icon.textContent = translate("language_button");
  dom_references.language_flag_icon.dataset.flag = translate("language_button");
  dom_references.language_toggle_button.setAttribute("aria-label", current_language === "en" ? "Switch to German" : "Zu Englisch wechseln");
  dom_references.language_toggle_button.title = current_language === "en" ? "Switch to German" : "Zu Englisch wechseln";
  set_text(".login_panel .eyebrow_text", translate("login_eyebrow"));
  set_text(".login_copy", translate("login_copy"));
  set_text("label[for='username_input']", translate("username_label"));
  set_text("label[for='password_input']", translate("password_label"));
  set_placeholder("#username_input", translate("username_placeholder"));
  set_placeholder("#password_input", translate("password_placeholder"));
  dom_references.login_form.querySelector("#login_button").textContent = translate("login_button");
  set_text("#welcome_kicker", translate("welcome_kicker"));
  dom_references.enter_home_button.textContent = translate("enter_home_button");
  set_text(".home_header .eyebrow_text", translate("header_eyebrow"));
  dom_references.logout_button.textContent = translate("logout_button");
  update_theme_button(document.body.dataset.theme || "light");
  set_text(".hero_content .eyebrow_text", translate("hero_eyebrow"));
  set_text("#hero_heading", translate("hero_heading"));
  set_text(".today_prank_card .eyebrow_text", translate("today_prank_eyebrow"));
  set_text("#today_prank_heading", translate("today_prank_heading"));
  set_text("[aria-labelledby='time_heading'] .eyebrow_text", translate("time_eyebrow"));
  set_text("#time_heading", translate("time_heading"));
  set_text(".featured_metric .metric_label", translate("days_label"));
  set_text(".featured_metric .metric_note", translate("days_note"));
  set_text(".time_grid .metric_card:nth-child(2) .metric_label", translate("years_label"));
  set_text(".time_grid .metric_card:nth-child(2) .metric_note", translate("years_note"));
  set_text(".time_grid .metric_card:nth-child(3) .metric_label", translate("diab_age_label"));
  set_text(".time_grid .metric_card:nth-child(3) .metric_note", translate("diab_age_note"));
  set_text(".time_grid .metric_card:nth-child(4) .metric_label", translate("svetlana_age_label"));
  set_text(".time_grid .metric_card:nth-child(4) .metric_note", translate("svetlana_age_note"));
  set_text(".time_grid .metric_card:nth-child(5) .metric_label", translate("diab_birthday_label"));
  set_text(".time_grid .metric_card:nth-child(6) .metric_label", translate("svetlana_birthday_label"));
  set_text("[aria-labelledby='memory_gallery_heading'] .eyebrow_text", translate("gallery_eyebrow"));
  set_text("#memory_gallery_heading", translate("gallery_heading"));
  dom_references.add_memory_button.textContent = translate("add_memory");
  set_text("[aria-labelledby='event_timeline_heading'] .eyebrow_text", translate("events_eyebrow"));
  set_text("#event_timeline_heading", translate("events_heading"));
  dom_references.add_event_button.textContent = translate("add_event");
  set_text(".love_footer > p", translate("made_with_love"));
  set_text("#daily_love_heading", translate("love_note_eyebrow"));
  set_text("label[for='memory_title_input']", translate("title_label"));
  set_text("label[for='memory_date_input']", translate("date_label"));
  set_text("label[for='memory_note_input']", translate("note_label"));
  set_text("label[for='memory_image_input']", translate("picture_label"));
  set_text("label[for='event_title_input']", translate("title_label"));
  set_text("label[for='event_date_input']", translate("date_label"));
  set_text("label[for='event_description_input']", translate("event_description_label"));
  set_placeholder("#memory_title_input", translate("memory_title_placeholder"));
  set_placeholder("#memory_note_input", translate("memory_note_placeholder"));
  set_placeholder("#event_title_input", translate("event_title_placeholder"));
  set_placeholder("#event_description_input", translate("event_description_placeholder"));
  dom_references.close_memory_dialog_button.setAttribute("aria-label", current_language === "de" ? "Schließen" : "Close");
  dom_references.close_event_dialog_button.setAttribute("aria-label", current_language === "de" ? "Schließen" : "Close");

  if (editing_memory_id) {
    dom_references.memory_dialog_title.textContent = translate("memory_dialog_edit");
    dom_references.save_memory_button.textContent = translate("update_memory");
  } else {
    dom_references.memory_dialog_title.textContent = translate("memory_dialog_add");
    dom_references.save_memory_button.textContent = translate("save_memory");
  }

  if (editing_event_id) {
    dom_references.event_dialog_title.textContent = translate("event_dialog_edit");
    dom_references.save_event_button.textContent = translate("update_event");
  } else {
    dom_references.event_dialog_title.textContent = translate("event_dialog_add");
    dom_references.save_event_button.textContent = translate("save_event");
  }

  if (current_user_profile) {
    update_home_for_user(current_user_profile);

    if (!dom_references.welcome_overlay.classList.contains("hidden")) {
      const greeting = get_time_based_greeting(current_user_profile);
      const todays_message = get_daily_joy_message();
      dom_references.welcome_primary_message.textContent = greeting.primary;
      dom_references.welcome_secondary_message.textContent = greeting.secondary;
      dom_references.daily_joy_message.textContent = todays_message;
    }
  }

  update_today_prank_message();
  update_daily_love_message();
  update_home_counters();
  translate_default_items();

  if (current_memory_items.length > 0) {
    render_memory_gallery(current_memory_items);
  }

  if (current_event_items.length > 0) {
    render_event_timeline(current_event_items);
  }
}

function translate_default_items() {
  if (current_memory_items.length > 0 && current_memory_items.every((item) => item.is_placeholder)) {
    current_memory_items = get_default_memory_gallery_items();
    render_memory_gallery(current_memory_items);
  }

  if (current_event_items.length > 0) {
    current_event_items = current_event_items.map((item) => (item.is_locked ? get_default_event_timeline_items()[0] : item));
    render_event_timeline(current_event_items);
  }
}

async function handle_login(event) {
  event.preventDefault();

  prepare_welcome_audio();
  const submitted_username = dom_references.username_input.value.trim().toLowerCase();
  const submitted_password = dom_references.password_input.value;
  const user_profile = await authenticate_user(submitted_username, submitted_password);

  if (!user_profile) {
    dom_references.login_error_message.textContent = translate("login_error");
    return;
  }

  current_user_profile = {
    user_key: user_profile.user_key,
    display_name: user_profile.display_name
  };

  sessionStorage.setItem("logged_in_user", JSON.stringify(current_user_profile));
  dom_references.login_error_message.textContent = "";
  dom_references.username_input.value = "";
  dom_references.password_input.value = "";

  update_home_for_user(current_user_profile);
  show_welcome_overlay(current_user_profile);
}

async function authenticate_user(username, password) {
  const local_user = allowed_users[username];

  if (!local_user || local_user.password !== password) {
    return null;
  }

  try {
    const response = await fetch("/api/login", {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify({
        username,
        password
      })
    });

    if (response.ok) {
      const server_user = await response.json();
      return {
        user_key: server_user.user_key,
        display_name: server_user.display_name
      };
    }
  } catch (error) {
    // The private gate still works from the local credentials below.
  }

  return {
    user_key: local_user.user_key,
    display_name: local_user.display_name
  };
}

function handle_logout() {
  sessionStorage.removeItem("logged_in_user");
  current_user_profile = null;
  dom_references.home_screen.classList.add("hidden");
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.login_screen.classList.remove("hidden");
}

function show_welcome_overlay(user_profile) {
  const greeting = get_time_based_greeting(user_profile);
  const todays_message = get_daily_joy_message();

  dom_references.welcome_primary_message.textContent = greeting.primary;
  dom_references.welcome_secondary_message.textContent = greeting.secondary;
  dom_references.daily_joy_message.textContent = todays_message;
  dom_references.today_prank_message.textContent = todays_message;
  dom_references.login_screen.classList.add("hidden");
  dom_references.home_screen.classList.add("hidden");
  dom_references.welcome_overlay.classList.remove("hidden");
  play_welcome_sound();
  window.setTimeout(() => burst_reaction(dom_references.welcome_overlay, "spark", 18), 260);
  window.setTimeout(() => burst_reaction(dom_references.welcome_overlay, "heart", 14), 760);
}

function enter_home_from_welcome() {
  dom_references.welcome_overlay.classList.add("hidden");
  dom_references.home_screen.classList.remove("hidden");
  update_home_counters();
  burst_reaction(dom_references.hero_symbol, "heart", 16);
}

function get_time_based_greeting(user_profile) {
  const current_hour = new Date().getHours();
  const is_svetlana = user_profile.user_key === "svetlana";
  const person_key = is_svetlana ? "svetlana" : "diab";
  let day_part = "night";

  if (current_hour < 12) {
    day_part = "morning";
  } else if (current_hour < 18) {
    day_part = "afternoon";
  } else if (current_hour < 22) {
    day_part = "evening";
  }

  const [primary, secondary] = translations[current_language].greetings[`${day_part}_${person_key}`];
  return { primary, secondary };
}

async function load_daily_joy_messages_by_language() {
  return {
    en: await load_message_list("daily_joy_messages", fallback_daily_joy_messages),
    de: await load_message_list("daily_joy_messages_de", fallback_daily_joy_messages_de)
  };
}

async function load_daily_love_messages_by_language() {
  return {
    en: await load_message_list("daily_love_messages", fallback_daily_love_messages),
    de: await load_message_list("daily_love_messages_de", fallback_daily_love_messages_de)
  };
}

async function load_message_list(message_name, fallback_messages) {
  try {
    const response = await fetch(`/api/${message_name}`);

    if (response.ok) {
      const server_messages = await response.json();
      if (Array.isArray(server_messages) && server_messages.length > 0) {
        return server_messages;
      }
    }
  } catch (error) {
    // Static hosting can use the JSON file below.
  }

  try {
    const response = await fetch(`data/${message_name}.json`);

    if (response.ok) {
      const static_messages = await response.json();
      if (Array.isArray(static_messages) && static_messages.length > 0) {
        return static_messages;
      }
    }
  } catch (error) {
    return fallback_messages;
  }

  return fallback_messages;
}

function get_daily_joy_message() {
  return get_daily_message_from_list(daily_joy_messages_by_language[current_language]);
}

function get_daily_love_message() {
  return get_daily_message_from_list(daily_love_messages_by_language[current_language]);
}

function get_daily_message_from_list(message_list) {
  const safe_message_list = Array.isArray(message_list) && message_list.length > 0 ? message_list : fallback_daily_joy_messages;
  const today = new Date();
  const date_key = `${today.getFullYear()}_${today.getMonth() + 1}_${today.getDate()}`;
  const hash_value = Array.from(date_key).reduce((total, character) => total + character.charCodeAt(0), 0);
  const message_index = hash_value % safe_message_list.length;
  return safe_message_list[message_index];
}

function update_today_prank_message() {
  dom_references.today_prank_message.textContent = get_daily_joy_message();
}

function update_daily_love_message() {
  dom_references.daily_love_message.textContent = get_daily_love_message();
}

function update_home_for_user(user_profile) {
  const greeting = get_time_based_greeting(user_profile);
  dom_references.home_greeting.textContent = greeting.primary;

  if (user_profile.user_key === "svetlana") {
    dom_references.hero_personal_message.textContent = translate("hero_message_svetlana");
  } else {
    dom_references.hero_personal_message.textContent = translate("hero_message_diab");
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
  const loaded_memories = await api_get_items("memories", memory_storage_key, get_default_memory_gallery_items());
  const loaded_events = await api_get_items("events", event_storage_key, get_default_event_timeline_items());

  current_memory_items = loaded_memories;
  current_event_items = loaded_events;
  render_memory_gallery(current_memory_items);
  render_event_timeline(current_event_items);
}

async function api_get_items(item_type, storage_key, fallback_items) {
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
    // Local storage keeps the page useful when no server is running.
  }

  const stored_items = JSON.parse(localStorage.getItem(storage_key) || "null");
  return Array.isArray(stored_items) && stored_items.length > 0 ? stored_items : fallback_items;
}

async function api_save_items(item_type, storage_key, items) {
  localStorage.setItem(storage_key, JSON.stringify(items));

  try {
    await fetch(`/api/${item_type}`, {
      method: "POST",
      headers: {
        "Content-Type": "application/json"
      },
      body: JSON.stringify(items)
    });
  } catch (error) {
    // The browser copy is already saved.
  }
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
      const memory_actions = create_item_actions("memory", memory_item.id);
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

    if (!event_item.is_locked) {
      const timeline_actions = create_item_actions("event", event_item.id);
      timeline_content.appendChild(timeline_actions);
    }

    timeline_item.append(timeline_marker, timeline_content);
    dom_references.event_timeline.appendChild(timeline_item);
  });
}

function create_item_actions(item_type, item_id) {
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

  const delete_button = document.createElement("button");
  delete_button.className = "small_action_button danger_action_button";
  delete_button.type = "button";
  delete_button.dataset.action = `delete_${item_type}`;
  delete_button.dataset.item_id = item_id;
  delete_button.title = translate("delete");
  delete_button.setAttribute("aria-label", translate("delete"));
  delete_button.appendChild(create_action_icon("delete"));

  action_bar.append(edit_button, delete_button);
  return action_bar;
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
  master_gain.gain.exponentialRampToValueAtTime(0.09, now + 0.04);
  master_gain.gain.exponentialRampToValueAtTime(0.0001, now + 1.55);
  master_gain.connect(welcome_audio_context.destination);

  [
    { frequency: 523.25, start: 0, duration: 0.62 },
    { frequency: 659.25, start: 0.18, duration: 0.68 },
    { frequency: 783.99, start: 0.38, duration: 0.86 },
    { frequency: 1046.5, start: 0.7, duration: 0.72 }
  ].forEach((note) => {
    const oscillator = welcome_audio_context.createOscillator();
    const note_gain = welcome_audio_context.createGain();
    oscillator.type = "sine";
    oscillator.frequency.setValueAtTime(note.frequency, now + note.start);
    note_gain.gain.setValueAtTime(0.0001, now + note.start);
    note_gain.gain.exponentialRampToValueAtTime(0.36, now + note.start + 0.05);
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
  dom_references.memory_dialog_title.textContent = translate("memory_dialog_add");
  dom_references.save_memory_button.textContent = translate("save_memory");
  dom_references.memory_image_hint.textContent = "";
  open_dialog(dom_references.memory_dialog);
}

function prepare_new_event() {
  editing_event_id = null;
  dom_references.event_form.reset();
  dom_references.event_dialog_title.textContent = translate("event_dialog_add");
  dom_references.save_event_button.textContent = translate("save_event");
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
  dom_references.memory_dialog_title.textContent = translate("memory_dialog_edit");
  dom_references.save_memory_button.textContent = translate("update_memory");
  dom_references.memory_title_input.value = memory_item.title || "";
  dom_references.memory_date_input.value = memory_item.date_value || "";
  dom_references.memory_note_input.value = memory_item.note || "";
  dom_references.memory_image_input.value = "";
  dom_references.memory_image_hint.textContent = editing_memory_image_data ? translate("image_replace_hint") : "";
  open_dialog(dom_references.memory_dialog);
}

async function delete_memory(item_id) {
  const should_delete = window.confirm(translate("delete_memory_confirm"));

  if (!should_delete) {
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

  editing_event_id = item_id;
  dom_references.event_dialog_title.textContent = translate("event_dialog_edit");
  dom_references.save_event_button.textContent = translate("update_event");
  dom_references.event_title_input.value = event_item.title || "";
  dom_references.event_date_input.value = event_item.date_value || "";
  dom_references.event_description_input.value = event_item.description || "";
  open_dialog(dom_references.event_dialog);
}

async function delete_event(item_id) {
  const should_delete = window.confirm(translate("delete_event_confirm"));

  if (!should_delete) {
    return;
  }

  current_event_items = current_event_items.filter((item) => item.id !== item_id);
  await api_save_items("events", event_storage_key, current_event_items);
  render_event_timeline(current_event_items.length > 0 ? current_event_items : get_default_event_timeline_items());
  burst_reaction(dom_references.event_timeline, "spark", 8);
}

function open_dialog(dialog_element) {
  if (typeof dialog_element.showModal === "function") {
    dialog_element.showModal();
  } else {
    dialog_element.setAttribute("open", "");
  }
}

function close_dialog(dialog_element) {
  if (typeof dialog_element.close === "function") {
    dialog_element.close();
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
  close_dialog(dom_references.memory_dialog);
  burst_reaction(dom_references.memory_gallery, "heart", 12);
}

async function save_event_from_form(event) {
  event.preventDefault();

  const event_date = dom_references.event_date_input.value;
  const existing_event = current_event_items.find((item) => item.id === editing_event_id);

  const saved_event = {
    id: editing_event_id || create_item_id(),
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

function apply_saved_theme() {
  const saved_theme = localStorage.getItem(theme_storage_key) || "light";
  document.body.dataset.theme = saved_theme;
  update_theme_button(saved_theme);
}

function toggle_theme() {
  const next_theme = document.body.dataset.theme === "dark" ? "light" : "dark";
  document.body.dataset.theme = next_theme;
  localStorage.setItem(theme_storage_key, next_theme);
  update_theme_button(next_theme);
  burst_reaction(dom_references.theme_toggle_button, "spark", 10);
}

function update_theme_button(theme_name) {
  const is_dark_theme = theme_name === "dark";
  dom_references.theme_toggle_button.textContent = is_dark_theme ? translate("light_theme_button") : translate("dark_theme_button");
  dom_references.theme_toggle_button.setAttribute("aria-pressed", String(is_dark_theme));
}

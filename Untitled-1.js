/**
 * ====================================================================
 * OUR LITTLE LOVE STORY ❤️ — CONFIGURATION FILE
 * ====================================================================
 * 
 * Girl can easily customize all names, messages, photos, voice notes,
 * reasons, timeline memories, future dreams, proposal text, handwritten
 * letter, and secret surprises right here in this single file!
 */

const loveStoryConfig = {
  // Names & Main Info
  girlName: "MAANI",
  boyName: "GURVEER",
  storyTitle: "Our Little Love Story ❤️",
  specialDate: "14 SEPTEMBER,2026", // Anniversary / First met date

  // Background Music
  bgMusicUrl: "tera te tera te.mpeg",
  bgMusicStartTime: 10, // Start song from 10 seconds (0:10)

  // Section 1: Landing Screen
  landing: {
    greeting: "Hey You… 💌",
    subtext: "I made something special, just for you.",
    buttonText: "Open My Heart ❤️"
  },

  // Section 2: Personal Message (Typewriter Effect)
  personalMessage: {
    intro: "There's something I've been wanting to tell you for a long time…",
    mainText: "tusi kdo mera lyi special bn ge menu v ni pta, bs eh pta v jassar saab tusi addat ta bn ge ho kdo te kive eh menu v ni pta🥺💗 thnks ena khush krn lyi menu read more hope it makes you happy te thonu thoda jawab mil juu🥹👀."
  },


  // Section 4: Why You? Section
  reasons: [
    {
      id: 1,
      title: "Your Smile 😊",
      icon: "smile",
      shortText: "It lights up even my cloudiest days.",
      expandedMessage: "thodi cute je smile kaffi aa menu khush krn lyi, hor kuch ni chida menu jad tak tusi mera kol ho..."
    },
    {
      id: 2,
      title: "The Way You Make Me Laugh 😂",
      icon: "laugh",
      shortText: "Our inside jokes and witty banter.",
      expandedMessage: "jdo tusi mera nl gal krde ho mera mood pura chnge ho jnda ho khushi alg hi hundi aa jinu me express ni kr sakdii..."
    },
    {
      id: 3,
      title: "Your Genuine Kindness 💖",
      icon: "heart",
      shortText: "How deeply you care for people around you.",
      expandedMessage: "lokk thode lyi ki sochde aa menu fark ni pndaa, kyiki jo tusi mera agge ho menu us insaan nal bhot attachment aa jo kde kuch glt ni kru hna mera syane baachee...."
    },
    {
      id: 4,
      title: "Your Random Messages 📱",
      icon: "message-circle",
      shortText: "Seeing your name pop up on my screen.",
      expandedMessage: "bs mera agge evi reho tusi jive ho best ho te me thode bina ni rehna chodi i need you ,your love,your support alwayss...."
    },
    {
      id: 5,
      title: "The Way You Listen 👂✨",
      icon: "headphones",
      shortText: "You actually hear what I feel, not just what I say.",
      expandedMessage: "thoda hor dso hor dso kehna v me bhot vadia lgda me khushi hundi aa v koi hai menu sun lyi sambn lyi...."
    },
    {
      id: 6,
      title: "Simply… YOU ❤️",
      icon: "sparkles",
      shortText: "All your tiny quirks and wonderful details.",
      expandedMessage: "simple gal menu tusi chide ho meri life ch hamesha eve hai jo meri gll mne mera nl jid v kre te at last meri mn le...."
    }
  ],

  // Section 5: Love Timeline
  timeline: [
    {
      date: "Day 1",
      title: "The First Hello 💬",
      badge: "The Beginning",
      description: "ik normal day jo ena special bn geya , oh insaan jo menu ena special feel kronda....",
      image: "photo1.png"
    },
    {
      date: "Day 2",
      title: "The First Long Conversation 🌙",
      badge: "Late Night Talks",
      description: "te thoda majk jide te menu ena yaakin ho geya , odo sochya v ni se tusi ene special bn jo ge...",
      image: "photo2.png"
    },
    {
      date: "Day 3",
      title: "Smiling Because of You 😊",
      badge: "Realization",
      description: "Catching myself staring at my phone and smiling like a complete dork whenever you messaged.",
      image: "photo3.png"
    },
    {
      date: "Day 4",
      title: "The Memory I Keep Replaying 🎬",
      badge: "Unforgettable",
      description: "apniya calls your second step ho mera lyi sab too cute chijj aa thodi cute ji awaj jo ki menu sab to jada pyari lagdi aa te mera din bnon lyi best aa...",
      image: "photo4.png"
    },
    {
      date: "Today",
      title: "The Day I Realized… ❤️",
      badge: "Forever Moment",
      description: "today i realized ki tusi schi bhot special bn ge , me nhi reha chodi thode bina i want you with me mera cute jee baachaa...",
      image: "photo1.png"
    }
  ],

  // Section 6: Mini-Game Question
  miniGame: {
    title: "Okay… one tiny question before I continue 👀",
    question: "Do you think someone has a little crush on you?",
    yesText: "YES ❤️",
    noText: "NO 😏",
    successMessage: "thonu pta se....😌❤️"
  },

  // Section 7: Future Dreams Section
  futureDreams: [
    {
      title: "Watching Sunsets Together 🌅",
      description: "appa dove ikathe gumn jaye te shm nu sunset dekhyee...",
      gradient: "from-amber-200 via-rose-300 to-pink-400"
    },
    {
      title: "Random Coffee Dates ☕",
      description: "appa dove milya ik duje nl gallan kryee....",
      gradient: "from-orange-200 via-pink-200 to-rose-300"
    },
    {
      title: "Exploring New Places ✈️",
      description: "ikthe ghumyee te fr ik din gurughr chlye aa te forever nall rheye....",
      gradient: "from-sky-200 via-indigo-200 to-pink-300"
    },
    {
      title: "Movie Nights & Cozy Blankets 🎬",
      description: "dove apdi life enjoy krye te nll rheye....",
      gradient: "from-purple-200 via-pink-200 to-rose-200"
    },

    {
      title: "Celebrating Every Milestone 🎂",
      description: "ik duje nl hr ik din enjoy krye te apde special din nl mnye te ik duje nl rheye....",
      gradient: "from-rose-200 via-pink-300 to-red-300"
    }
  ],

  // Section 8: Build-Up Section Messages
  buildUpMessages: [
    "Okay…",
    "I've hidden behind silly jokes.",
    "I've hidden behind random late-night conversations.",
    "But I don't want to hide this feeling anymore.",
    "ik jaruri gll dsni see thonu....."
  ],

  // Section 9: Proposal Section
  proposal: {
    anticipation: "I think you already know what I'm about to say…",
    mainQuestion: "Will You Be with me forever? ❤️",
    subQuestion: "i know tusi v mera lyi same feel krde hovo ge....",
    yesButtonText: "YES ❤️",
    timeButtonText: "I Need A Little Time 🥺",
    yesCelebrationMessage: "You just made my heart the happiest place in the world! ❤️✨",
    yesSubText: "This is only the beginning of our story…",
    timeResponseTitle: "Take All The Time You Need 💖",
    timeResponseMessage: "There is no rush at all. My heart will always be open for you, whenever you're ready. Thank you for reading my heart today. 🥰"
  },

  // Section 10: Final Handwritten Letter
  finalLetter: {
    salutation: "Dear",
    bodyParagraphs: [
      "i what to tell you i love youuuuuu meraa noneee baaccheee🥹💕 Me thonu eh dsna chodi se bhot time to v me v same feel krde aa,",
      "i want to be with you foreverrrrr💗🪬menu schi kisa ne ena special feel ni krya 🥺, jina tusi kryyaa jdo me thode nl gal krdi aa ta menu bhot vadia lgda👀,",
      "tusi menu ena safe feel krone hoo, ik insaan jo kisa nu kutn nu min ni londa ho menu mnoda meri eni care krdaa menu schi jakin ni hunda ki koi mera ena kr sakda",
      "jdo tusi mera te hakk jatone ho, menu bhot vadia lgda thnks🥺💕 mera vre ena sochn lyi ena specail feel kon lyi te haaa mera nl future plan krn lye te me v ehi choni aa ki me future ch thode nl hi hova mera baacheeee😘🫂 . ❤️"
    ]
  },

  // Section 11: Secret Surprise
  secretSurprise: {
    buttonText: "One Last Thing 👀",
    modalTitle: "P.S. High Five! ✋❤️",
    modalMessage: "If you're smiling right now… mission accomplished. You are truly wonderful!",
    photo: "photo4.png"
  }
};

// Export to global scope for browser ES modules or standard script loading
if (typeof window !== 'undefined') {
  window.loveStoryConfig = loveStoryConfig;
}

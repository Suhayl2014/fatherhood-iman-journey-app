export interface Milestone {
  id: string;
  ageRange: string;
  title: string;
  description: string;
  islamicPerspective: string;
  tips: string[];
  category: 'physical' | 'cognitive' | 'social' | 'emotional' | 'spiritual';
}

export const milestones: Milestone[] = [
  {
    id: "m1",
    ageRange: "0-1 year",
    title: "First Smiles",
    description: "Your baby will begin to smile responsively, especially to your voice and face.",
    islamicPerspective: "The Prophet Muhammad (peace be upon him) had great love for children and would smile at them. A child's smile is considered one of Allah's blessings and a sign of fitrah (natural disposition).",
    tips: [
      "Recite the adhan softly in your baby's ear when they're calm",
      "Make gentle eye contact while reciting short surahs",
      "Smile at your baby frequently - it's a form of sadaqah (charity)",
      "Develop a bedtime routine with soft Islamic nasheeds"
    ],
    category: "social"
  },
  {
    id: "m2",
    ageRange: "0-1 year",
    title: "Recognizing Voices",
    description: "Your baby will recognize familiar voices, especially parents, and may turn toward sounds.",
    islamicPerspective: "This is a perfect time to introduce the sounds of the Quran. The pure sound of recitation can soothe babies and begin their lifelong connection with Allah's words.",
    tips: [
      "Recite short surahs during daily care routines",
      "Play gentle Quran recitation during nap time",
      "Use a consistent, gentle voice for duas before feeding or sleeping",
      "Respond consistently to your baby's cries to build trust and security"
    ],
    category: "cognitive"
  },
  {
    id: "m3",
    ageRange: "0-1 year",
    title: "Beginning to Crawl",
    description: "Your baby will become more mobile, possibly crawling or scooting to explore their environment.",
    islamicPerspective: "In Islam, exploration and seeking knowledge are encouraged from early ages. This natural curiosity is a gift that should be nurtured within safe boundaries.",
    tips: [
      "Create a safe, halal environment for exploration",
      "Begin teaching simple boundaries with gentle redirection",
      "Say 'Bismillah' before helping them try new movements",
      "Introduce soft Islamic-themed toys and board books"
    ],
    category: "physical"
  },
  {
    id: "m4",
    ageRange: "1-2 years",
    title: "First Words",
    description: "Your baby may begin saying simple words or attempting to communicate verbally.",
    islamicPerspective: "The first word many Muslim parents encourage is 'Allah.' Teaching children about their Creator from these early stages plants the seeds of faith.",
    tips: [
      "Regularly use Islamic phrases like 'Bismillah' and 'Alhamdulillah'",
      "Respond positively when your baby attempts these words",
      "Read simple Islamic board books with basic concepts",
      "Create a 'word of the day' practice with simple Islamic terms"
    ],
    category: "cognitive"
  },
  {
    id: "m5",
    ageRange: "1-2 years",
    title: "Walking Independently",
    description: "Your toddler will begin walking without support, exploring their environment with new freedom.",
    islamicPerspective: "Walking is mentioned in the Quran as one of Allah's signs and blessings. This new independence is an opportunity to begin teaching about gratitude for our physical abilities.",
    tips: [
      "Say 'Bismillah' and 'Alhamdulillah' when they take steps",
      "Begin teaching about wudu through gentle water play",
      "Create safe spaces for prayer where they can observe and imitate",
      "Introduce the concept of following (like following in prayer) through simple games"
    ],
    category: "physical"
  },
  {
    id: "m6",
    ageRange: "1-2 years",
    title: "Growing Empathy",
    description: "Your toddler will begin showing concern when others are upset and may try to comfort them.",
    islamicPerspective: "Empathy and compassion (rahmah) are core Islamic values that the Prophet Muhammad (peace be upon him) emphasized. Nurturing these qualities early helps develop a merciful heart.",
    tips: [
      "Model compassion in your interactions with others",
      "Explain emotions from an Islamic perspective (being gentle like the Prophet)",
      "Read stories about the Prophet's kindness to children and animals",
      "Encourage sharing as an act of kindness and generosity (karam)"
    ],
    category: "emotional"
  },
  {
    id: "m7",
    ageRange: "3-4 years",
    title: "Prayer Imitation",
    description: "Your child will begin to imitate prayer movements and may try to join family in salah.",
    islamicPerspective: "While children aren't obligated to pray until reaching maturity, this natural imitation builds the foundation for their future worship. The Prophet (peace be upon him) was gentle with children who approached during prayer.",
    tips: [
      "Provide a small prayer mat specially for them",
      "Teach simple prayer movements with positive reinforcement",
      "Explain basic concepts of who we pray to in simple terms",
      "Don't force participation but always invite and welcome it"
    ],
    category: "spiritual"
  },
  // New milestones
  {
    id: "m8",
    ageRange: "0-1 year",
    title: "Recognizing Parents",
    description: "Your baby will begin to recognize their parents' faces and voices, showing preference for them.",
    islamicPerspective: "Allah has created children with a natural affinity for their parents. This bond forms the foundation of family love that Islam holds in high regard.",
    tips: [
      "Speak to your baby regularly, especially when making eye contact",
      "Recite the Quran to your baby so they become familiar with this sound",
      "Hold your baby close during dhikr (remembrance of Allah)",
      "Learn and recite duas for protection of children"
    ],
    category: "social"
  },
  {
    id: "m9",
    ageRange: "0-1 year",
    title: "Reacting to Names of Allah",
    description: "Your baby may show special attention when hearing the names of Allah or Quranic recitation.",
    islamicPerspective: "In Islamic tradition, the soul already knows its Creator. The fitrah (natural disposition) responds innately to divine reminders, even in infancy.",
    tips: [
      "Regularly recite the 99 names of Allah around your baby",
      "Create a calming routine with Quranic recitation",
      "Use musical toys that play Islamic nasheeds or recitation",
      "Notice and reinforce positive reactions to spiritual sounds"
    ],
    category: "spiritual"
  },
  {
    id: "m10",
    ageRange: "1-2 years",
    title: "First Tastes",
    description: "Your baby begins trying solid foods and experiencing new flavors.",
    islamicPerspective: "The Sunnah encourages starting children with naturally sweet foods like dates. The Prophet Muhammad (peace be upon him) practiced tahneek, placing softened dates in a newborn's mouth.",
    tips: [
      "Say Bismillah before feeding your baby",
      "Introduce halal foods first, establishing good habits early",
      "Share the blessings of food that Allah provides",
      "Establish a practice of gratitude for food"
    ],
    category: "physical"
  },
  {
    id: "m11",
    ageRange: "1-2 years",
    title: "Responding to Boundaries",
    description: "Your baby begins understanding simple instructions and boundaries.",
    islamicPerspective: "Islam emphasizes the importance of gentle but clear guidance from an early age. The Prophet Muhammad (peace be upon him) taught that we should begin teaching our children from age seven.",
    tips: [
      "Use consistent, simple language for boundaries",
      "Model the behavior you want to see",
      "Praise good behavior as much as redirecting unwanted behavior",
      "Begin teaching simple concepts of halal and haram in age-appropriate ways"
    ],
    category: "cognitive"
  },
  {
    id: "m12",
    ageRange: "1-2 years",
    title: "First Islamic Words",
    description: "Your toddler begins attempting Islamic phrases like 'Allah' or 'Bismillah'.",
    islamicPerspective: "The Prophet Muhammad (peace be upon him) said: 'Make the first word spoken by your children be 'La ilaha illa Allah' (There is no god but Allah)'.",
    tips: [
      "Regularly and clearly speak these words around your toddler",
      "Show excitement when they attempt Islamic words",
      "Create visual aids with Islamic words and symbols",
      "Use simple songs or rhymes incorporating Islamic phrases"
    ],
    category: "spiritual"
  },
  {
    id: "m13",
    ageRange: "3-4 years",
    title: "Identifying Islamic Symbols",
    description: "Your toddler starts recognizing Islamic imagery such as mosques, the crescent moon, or prayer rugs.",
    islamicPerspective: "Developing a visual understanding of Islamic symbols helps children form their Muslim identity and feel connected to their faith community.",
    tips: [
      "Point out mosques when you pass them",
      "Have Islamic-themed books with clear imagery",
      "Create a special area for prayer with visible Islamic elements",
      "Use play to familiarize them with Islamic practices like a small prayer rug"
    ],
    category: "cognitive"
  },
  {
    id: "m14",
    ageRange: "3-4 years",
    title: "Joining in Dua",
    description: "Your child begins to raise their hands and say 'Ameen' during family duas.",
    islamicPerspective: "Engaging children in dua from an early age teaches them to turn to Allah for their needs and to express gratitude for blessings.",
    tips: [
      "Make dua out loud so your child can hear and learn",
      "Teach them to raise their hands and say 'Ameen'",
      "Encourage them to make their own simple duas",
      "Explain that Allah loves to hear from children"
    ],
    category: "spiritual"
  },
  {
    id: "m15",
    ageRange: "5-6 years",
    title: "Understanding Islamic Stories",
    description: "Your child can follow and remember simple stories about the prophets and companions.",
    islamicPerspective: "The Quran emphasizes the importance of learning from the stories of the prophets. These narratives help children understand Islamic values through examples.",
    tips: [
      "Tell stories about prophets in simple language",
      "Use picture books about Islamic figures",
      "Act out stories with your child",
      "Connect prophets' experiences to your child's life"
    ],
    category: "cognitive"
  },
  {
    id: "m16",
    ageRange: "7+ years",
    title: "Understanding Charity",
    description: "Your child begins to grasp the concept of giving to others for the sake of Allah.",
    islamicPerspective: "Charity (sadaqah) is a fundamental Islamic principle. The Prophet Muhammad (peace be upon him) was the most generous during Ramadan, teaching us the importance of giving.",
    tips: [
      "Let your child put coins in charity boxes",
      "Involve them in giving away toys or clothes they've outgrown",
      "Explain how helping others makes Allah happy",
      "Create a 'giving jar' for collecting money for charity"
    ],
    category: "emotional"
  }
];

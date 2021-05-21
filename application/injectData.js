const axios = require("axios");

//  TODO Convert to JSON File
// default Users Listed in Remote DB
const users = [
  {
    uniqueID: 0,
    username: "testuser",
    email: "a@gmail.com",
    password: "aaaaa",
  },
  {
    uniqueID: 1,
    username: "alyssamerkadio",
    email: "alyssa21@gmail.com",
    password: "WhitePeopleHappy",
  },
  {
    uniqueID: 2,
    username: "jenkinsmarcolo",
    email: "jmleniel@dlsu.dasma.com.ph",
    password: "Jokrill",
  },
  {
    uniqueID: 3,
    username: "malakaimerquin",
    email: "malakai@yahoo.com",
    password: "boyoingOW",
  },
  {
    uniqueID: 4,
    username: "pantenedenise",
    email: "opfracture@yahoo.com",
    password: "SolarMower",
  },
  {
    uniqueID: 5,
    username: "quenevictoria",
    email: "Qazujm@daporta.com.eu",
    password:
      "KP0c@vGu7ysp4EgoFHOUdqv*Tb#m2^K8NW^T!cc8KO!XSOn&K#yUz25DJmYzFTGCq9lrTjy#",
  },
];

const kanbanDataPreset1 = {
  lanes: [
    {
      id: "lane1",
      title: "Planned Tasks",
      label: "2/2",
      cards: [
        {
          id: "Card1",
          title: "Write Blog",
          description: "Can AI make memes",
          label: "30 mins",
        },
        {
          id: "Card2",
          title: "Pay Rent",
          description: "Transfer via NEFT",
          label: "5 mins",
          metadata: { sha: "be312a1" },
        },
      ],
    },
    {
      id: "lane2",
      title: "Demo",
      label: "2/2",
      cards: [
        {
          id: "Card3",
          title: "Prepare false data",
          description:
            "It has to make sense and not that damned copy-pasta text.",
          label: "2 hours?",
        },
        {
          id: "Card4",
          title: "Last minute fixes",
          description:
            "Better to throw your whole project to the ground by making some last-minute, untested 'fixes' to your work!",
          label: "1 minute",
        },
      ],
    },
    {
      id: "lane3",
      title: "Next Unit Test",
      label: "1/1",
      cards: [
        {
          id: "Card5",
          title: "Test your projects",
          description:
            "Check every nook & cranny of your project to make sure everything works as planned",
        },
      ],
    },
  ],
};

const kanbanDataPreset2 = {
  lanes: [
    {
      id: "lane1",
      title: "Webdevelopment Blog",
      label: "2/2",
      cards: [
        {
          id: "Card1",
          title: "Devlog v0.2",
          description: "Understanding API Calls",
        },
        {
          id: "Card2",
          title: "Segmantic Fault",
          description:
            "Understand error codes in procedural programming languages",
          label: "1 Hour",
        },
      ],
    },
    {
      id: "lane2",
      title: "Research Sampling",
      label: "0/0",
      cards: [
        {
          id: "Card3",
          title: "Determine Research Sampling Methodology",
          label: "Expendable",
        },
      ],
    },
  ],
};

projectDatabaseInject = [
  {
    uniqueID: 0,
    favoured: true,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Grocery Store - Application",
    backgroundID: "2",
    description: "Application for simulating grocery stores.",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 0,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Redux Project",
    backgroundID: "3",
    description: "Project Stack of Redux",
    kanbanData: kanbanDataPreset1,
  },
  {
    uniqueID: 0,
    favoured: true,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Hot tub Stream OTW",
    backgroundID: "1",
    description:
      "Get your friends in a all-in-one hang-out in a Hot tub party!",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 0,
    favoured: false,
    members: [],
    projectName: "Memorial Queza",
    backgroundID: "2",
    description:
      "This is a test project purposely made for fake data injection.",
    kanbanData: kanbanDataPreset1,
  },
  {
    uniqueID: 1,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Roblox Project",
    backgroundID: "2",
    description: "This project is for fun and to build a house in roblox",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 1,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Minecraft Mansion",
    backgroundID: "3",
    description: "Build the Tower of your dreams in minecraft!",
    kanbanData: kanbanDataPreset1,
  },
  {
    uniqueID: 1,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "New PC Building with 0 dollars",
    backgroundID: "1",
    description: "Help us build a PC using 0 Dollars",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 1,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Web Application",
    backgroundID: "2",
    description: "Grocery Web Application",
    kanbanData: kanbanDataPreset1,
  },
  {
    uniqueID: 2,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Web Application",
    backgroundID: "3",
    description: "New Forum Web Application!",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 2,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "New Company Set",
    backgroundID: "1",
    description: "New Company Set for Recording ads!",
    kanbanData: kanbanDataPreset1,
  },
  {
    uniqueID: 2,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Advertise",
    backgroundID: "3",
    description: "Advertisement for our company",
    kanbanData: kanbanDataPreset2,
  },
  {
    uniqueID: 2,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Rearrangement of Equipments",
    backgroundID: "2",
    description: "Rearrangement or Fixing of Equipments",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 3,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Poster for Church",
    backgroundID: "1",
    description: "Poster that needed to be submitted",
    kanbanData: kanbanDataPreset2,
  },

  {
    uniqueID: 3,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Research Paper about Computer Vision",
    backgroundID: "2",
    description: "Making of Research Paper needed for submission",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 3,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Fixing of Keyboard",
    backgroundID: "1",
    description: "Fix all Company Keyboards",
    kanbanData: kanbanDataPreset2,
  },

  {
    uniqueID: 3,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Upgrade of PC's",
    backgroundID: "3",
    description: "Upgrading of all PC's in the company",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 4,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Fixing of Roof",
    backgroundID: "2",
    description: "Fixing of Company Roof",
    kanbanData: kanbanDataPreset2,
  },

  {
    uniqueID: 4,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Soccer Competition",
    backgroundID: "3",
    description: "Soccer Competition for Employees!",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 4,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Bonus Payment",
    backgroundID: "2",
    description: "Calculation of All Bonus Payment for the Company",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 4,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Renovation",
    backgroundID: "3",
    description: "All Required Renovation for the Company",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 5,
    favoured: false,
    members: [{ username: "jenkinsmarcolo" }],
    projectName: "Renovation of Kitchen",
    backgroundID: "2",
    description: "Renovation of Kitchen at home",
    kanbanData: kanbanDataPreset2,
  },

  {
    uniqueID: 5,
    favoured: false,
    members: [{ uniqueID: 1 }],
    projectName: "Meeting with Investors",
    backgroundID: "1",
    description: "Preparation of the Meeting with Investors",
    kanbanData: kanbanDataPreset1,
  },

  {
    uniqueID: 5,
    favoured: false,
    members: [{ uniqueID: 3 }],
    projectName: "Construction of New Building",
    backgroundID: "1",
    description: "Future Company Building Project",
    kanbanData: kanbanDataPreset2,
  },

  {
    uniqueID: 5,
    favoured: false,
    members: [{ uniqueID: 4 }],
    projectName: "Weekly Revenue Meetings",
    backgroundID: "3",
    description: "Week 51 Revenue meeting for the company",
    kanbanData: kanbanDataPreset2,
  },
];

const taskDatabaseInject = [
  {
    uniqueID: 0,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 0,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset2,
    taskPriority: "high",
  },
  {
    uniqueID: 0,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset2,
    taskPriority: "low",
  },
  {
    uniqueID: 0,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 0,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 1,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 1,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 1,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "low",
  },
  {
    uniqueID: 1,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 1,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 2,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset2,
    taskPriority: "high",
  },
  {
    uniqueID: 2,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 2,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "low",
  },
  {
    uniqueID: 2,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 2,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 3,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 3,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 3,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset2,
    taskPriority: "low",
  },
  {
    uniqueID: 3,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 3,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 4,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 4,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset2,
    taskPriority: "high",
  },
  {
    uniqueID: 4,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset2,
    taskPriority: "low",
  },
  {
    uniqueID: 4,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 4,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 5,
    taskName: "Jump 3 miles instaneously.",
    taskDescription: "The federation requires you to do it.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 5,
    taskName: "Go insane on a bike.",
    taskDescription: "Swing it!",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
  {
    uniqueID: 5,
    taskName: "Do your projects.",
    taskDescription: "Do your boring projects duud.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "low",
  },
  {
    uniqueID: 5,
    taskName:
      "Ask why your program isn't doing what you want it to do, despite you telling it what to do.",
    taskDescription: "Life of a programmer, ey?",
    kanbanData: kanbanDataPreset1,
    taskPriority: "medium",
  },
  {
    uniqueID: 5,
    taskName: "LSS - dance your favorite song",
    taskDescription: "Nothing beats chilling and beating.",
    kanbanData: kanbanDataPreset1,
    taskPriority: "high",
  },
];

// users.forEach(async (user) => {
//   await axios.post("http://localhost:3000/debug/registerUser", user);
// });

projectDatabaseInject.forEach(async (project) => {
  await axios.post("http://localhost:3000/debug/projects/create", project);
});

// taskDatabaseInject.forEach(async (task) => {
//   await axios.post("http://localhost:3000/debug/tasks/create", task);
// });

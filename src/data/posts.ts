export interface Author {
  name: string;
  avatar: string;
  role?: string;
}

export interface Post {
  slug: string;
  title: string;
  category: string;
  date: string;
  excerpt: string;
  image: string;
  author: Author;
  featured?: boolean;
  content: string;
}

export const allPosts: Post[] = [
  {
    slug: "a-decade-of-growth-10-year-anniversary",
    title: "A Decade of Growth: Community Garden Celebrates 10-Year Anniversary",
    category: "EVENTS",
    date: "July 2025",
    excerpt: "Over 50 people gathered on Friday 27th June to celebrate a decade of community, creativity, and cultivation at A Space 2 Grow Community Garden.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/a-decade-of-growth.png",
    author: {
      name: "Laura Kerry",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    featured: true,
    content: `Over 50 people gathered on Friday 27th June to celebrate a decade of community, creativity, and cultivation at A Space 2 Grow Community Garden. The event brought together a vibrant mix of current students, graduates, university staff, local volunteers, and businesses — all united by a shared love for green spaces and growing things together.
 
Children delighted in digging up potatoes and carrots, while others got hands-on with nature printing workshops, using flowers and leaves from the garden to create beautiful botanical art. One of the highlights of the day was the chance to peek inside a live bee hive and sample honey from Boldon Bees — a sweet reminder of the garden’s thriving biodiversity. 

The garden was beautifully decorated with handmade bunting created by volunteers from Sunderland Mind, adding a colourful and personal touch to the celebration. The atmosphere was further lifted by live music, which brought a joyful, relaxed energy to the afternoon and had people tapping their feet as they explored the garden.
 
Adding to the creative spirit of the day, photography students displayed their artwork throughout the garden, showcasing stunning images that captured both nature and the people who have brought the space to life over the past year. The buffet was a true garden-to-table experience, featuring freshly harvested carrot sticks, horseradish sauce, potato salad, and onion bhajis — all made with produce grown on-site. 

"It was so special to see some of the original volunteers back together," said Laura Kerry, A Space 2 Grow trustee and event organiser. "This garden has always been about more than just plants — it’s about people, and the community that has been built over the past ten years."
 
Many of the graduates who returned for the celebration shared how their time in the garden had inspired them to start growing their own food. "Every one of them now has their own allotment," Laura added. "They said this space gave them the confidence and knowledge to get started."

**Workshop Highlight: Nature Printing with Marjolaine Ryley**
Senior Lecturer in Photography, Marjolaine Ryley, who led the nature printing workshop, said:
"It was a joy to work with families and children using flowers and leaves from the garden. Hammer printing and natural dyeing are such simple, beautiful ways to connect with nature — and it was lovely to see people discovering the colours and patterns hidden in the plants around them."

**A Decade of Dedication**
Rob Hunt, who has been involved with the garden on and off since its early days, reflected on the journey:
"It’s amazing to see how far the garden has come. I remember when it was just an idea — and now it’s a thriving space full of life. What’s kept me coming back is the people. There’s something really grounding about working together outdoors, and seeing the impact it has on the community."

The event also marked a major milestone: A Space 2 Grow is now officially a registered community garden with the Royal Horticultural Society — a recognition of the hard work and dedication poured into the space over the years.
 
Looking ahead, the team hopes to expand planting efforts, explore ways to generate income through produce sales, and continue building partnerships with students and the wider community through creative projects and a new website.
 
Laura said in her closing speech:
"Here’s to the next chapter of A Space 2 Grow!"`
  },
  {
    slug: "bioblitz-at-a-space-2-grow",
    title: "BioBlitz at A Space 2 Grow Uncovers Garden's Hidden Treasures",
    category: "ENVIRONMENT",
    date: "July 2025",
    excerpt: "On Wednesday 4th June 2025, volunteers, students, and staff from the University of Sunderland, alongside members of the Durham Wildlife Trust, came together for a vibrant and engaging BioBlitz.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/bio-blitz-growing-plant.png",
    author: {
      name: "Laura Kerry",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    content: `On Wednesday 4th June 2025, volunteers, students, and staff from the University of Sunderland, alongside members of the Durham Wildlife Trust, came together for a vibrant and engaging BioBlitz at A Space 2 Grow Community Garden.  

A BioBlitz is a rapid biodiversity survey aimed at discovering as many species as possible within a set location and time. It offers a snapshot of the area’s wildlife and flora, bringing people closer to nature while contributing to citizen science. 
 
Despite the rain showers, the garden was buzzing with life. The BioBlitz team recorded an impressive range of species, with over 25 wild plants, 30+ invertebrates, and several bird species identified during the day.
 
Among the plants discovered were dog rose, oxeye daisy, false rhubarb, and Spanish iris, while invertebrates included ladybirds, bumblebees, spiders, woodlice, and even a cucumber spider. Bird sightings included the robin, black-headed gull, starling, and goldfinch.
 
Organised as part of the university's annual wildlife calendar, the event highlighted not just the ecological richness of the space, but also the important role that community gardens can play in promoting urban biodiversity and sustainability. It was also a great opportunity for volunteers to learn more about local species and their habitats.
 
Laura Kerry, Sustainability Officer at the University of Sunderland, coordinated the event and said:
"The BioBlitz was a fantastic way to engage both the university and local community with the natural world right on our doorstep. It’s amazing what you can find when you stop and look closely. A big thank you to everyone who took part!"

A Space 2 Grow is supported by a group of dedicated trustees and volunteers, and events like this are part of its wider mission to connect people with nature, promote wellbeing, and support environmental education.`
  },
  {
    slug: "a-year-of-renewal-community",
    title: "A Space 2 Grow: A Year of Renewal, Community, and Connection with Nature",
    category: "COMMUNITY",
    date: "June 2025",
    excerpt: "In October 2024, the University of Sunderland began actively supporting A Space 2 Grow... Now, as we approach its 10-year anniversary, the garden is enjoying a new lease of life.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/renewal-community.png",
    author: {
      name: "Laura Kerry",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    content: `In October 2024, the University of Sunderland began actively supporting A Space 2 Grow — a community garden located next to St Peter’s Church in Monkwearmouth, just a short walk from St Peter’s Campus. Now, as we approach its 10-year anniversary, the garden is enjoying a new lease of life, thanks to the commitment and collaboration of university staff, students, local residents, and community partners.
 
Originally created as a peaceful green space for reflection, wellbeing and connection, the garden had seen reduced activity in recent years. But over the past 8 months, a dedicated team of volunteers has come together to revitalise it — transforming overgrown borders, clearing pathways, repairing raised beds, and reintroducing planting plans. The University’s Sustainability Team has led this renewed momentum, helping to organise regular volunteering sessions, secure additional funding through grants and donations, and bring new life to the space.
 
Through partnerships with businesses like Nurture, our grounds maintenance contractor, we've sourced materials to upgrade essential features such as composting areas and raised beds. Local companies including Holiday Inn Sunderland, North East BIC, Marker Study, and Volker Stevin have all sent fantastic volunteer teams to support key garden improvements as part of their corporate social responsibility efforts. Together, these contributions are helping to restore the garden as a welcoming, inclusive space that benefits the whole community.
 
As part of this revitalisation, we’ve also run themed events and activities. During Student Volunteering Week in February, over 25 staff, students, and community members braved the cold to weed, clear, and prepare the garden for spring. In early June, we hosted a BioBlitz in partnership with Durham Wildlife Trust — a fun and informative biodiversity survey that revealed over 25 plant species, 30+ invertebrates, and several birds, helping us better understand and celebrate the garden’s ecological value.
 
Beyond gardening, the space is evolving into a vibrant community hub. Art students are set to bring colour and creativity to the garden, while plans are underway to host outdoor crafting sessions, mindfulness and prayer activities, and composting workshops throughout the summer. The university's Developer Society is also supporting the creation of a new website to promote the garden’s events and opportunities more widely.
 
The garden’s 10-year anniversary will be celebrated on Friday 27 June, offering an opportunity to thank all the incredible volunteers and supporters who have contributed their time, energy, and enthusiasm over the life of the garden. It’s also a moment to look ahead — as we continue to grow this space into something that reflects the values of sustainability, inclusivity, and community that lie at the heart of the university.
 
Whether you’re interested in hands-on gardening, arts and wellbeing activities, or just getting outdoors and meeting new people, A Space 2 Grow is open to all staff and students. To get involved, join the Teams group or visit our SharePoint page for details on volunteering sessions, events, and corporate volunteering opportunities.`
  },
  {
    slug: "university-volunteers-breathe-new-life",
    title: "University of Sunderland Volunteers Breathe New Life into Community Garden",
    category: "COMMUNITY",
    date: "February 2025",
    excerpt: "Staff and students at the University of Sunderland have been dedicating their free time to revitalise a community garden located just a stone’s throw from St Peter’s Campus.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/university-of-sunderland.png",
    author: {
      name: "Laura Kerry",
      avatar: "https://images.unsplash.com/photo-1544005313-94ddf0286df2?q=80&w=200&auto=format&fit=crop"
    },
    content: `Staff and students at the University of Sunderland have been dedicating their free time to revitalise a community garden located just a stone’s throw from St Peter’s Campus. 

Established a decade ago, the garden has suffered from dwindling volunteer numbers in recent years, leading to signs of neglect. In response, the University has stepped in to support the project, encouraging staff and students to get involved in restoring the space.
 
The University’s Sustainability Team has also been actively supporting the initiative, raising funds for a new shed and reaching out to their grounds maintenance contractor, Nurture, for assistance. Nurture has since pledged to help by sourcing new sleepers to replace the rotting wood in the raised beds, with the upgrades scheduled for the spring.
 
As part of Student Volunteering Week (10th–16th February), two hands-on volunteering sessions were organised, bringing together 25 dedicated volunteers, including staff, students, and local community members. Braving the cold and rain, they worked together to weed and tidy the garden.
 
Laura Kerry, Sustainability Officer at the University of Sunderland, praised the enthusiasm for the project, saying: 
"I am so pleased with the level of interest in this initiative. We now have a strong and diverse group of people committed to working on the garden throughout the year, and it’s exciting to see how our efforts will transform it into a sanctuary for the community to enjoy."
 
University staff member and local resident Rob Hunt, who has been involved with the garden since its inception, also expressed his excitement about the renewed interest:
"I have been involved in the garden for 10 years, and this new injection of funding and volunteers is going to make a huge difference. It will be great to see the garden restored to its former glory in time for its 10th anniversary in June."
 
With plenty of work still to be done before spring planting begins in March, volunteers will be repurposing wood from the old shed to build a new composting bin and staining the fence. Longer-term plans include incorporating arts and crafts into the space, as well as hosting outdoor workshops and meditation sessions throughout the spring and summer.
 
The next clean-up session is scheduled for this Wednesday from 3:30pm to 5:00pm, followed by a special planting session on Wednesday 12th March to mark National Plant a Flower Day.`
  },
  {
    slug: "a-big-bbq-thank-you",
    title: "A BIG BBQ thank you!",
    category: "EVENTS",
    date: "July 2024",
    excerpt: "Just to say thank you to every one that attended todays BBQ and those who helped make the day a huge success.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/bbq-blog.png",
    author: {
      name: "Rob Hunt",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    content: `Just to say thank you to every one that attended todays BBQ and those who helped make the day a huge success. The weather looked very unpromising this morning, but this afternoon brightened up and the whole event was a real treat.

In the end well over 100 came along. What was really pleasing was the nice mixture of local residents, students and university staff, parish members and others with an interest in community gardens. The combination of music, food and activities meant there was a really good buzz about the event. 

There are so many to thank including Barbara from Bedes Bistro, Tracy and Steve from the Co-op, Mick from Gentoo, the african drummers as well as Clare, Jo and David who provided the music. There are many more to thank for what was a brilliant day!`
  },
  {
    slug: "spring-is-here",
    title: "Spring Is Here …",
    category: "NEWS",
    date: "April 2024",
    excerpt: "With Spring comes the new growing season and jobs to do. It was great to see a few folk at a Space 2 Grow today helping clearing, weeding, potting on and planting.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/spring-is-here-blog.png",
    author: {
      name: "Rob Hunt",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    content: `With Spring comes the new growing season and jobs to do. It was great to see a few folk at a Space 2 Grow today helping clearing, weeding, potting on and planting.

If you fancy coming along to join in the fun and learn a bit about gardening or just enjoy the space check the garden calendar for the next session.`
  },
  {
    slug: "2014-cycle-challenge",
    title: "A Space 2 Grow 2014 Cycle Challenge",
    category: "EVENTS",
    date: "August 2014",
    excerpt: "On the 9th August cyclists, walkers and our mascot Biscop Bear set off for our first fund raising challenge. Through rain, wind and shine, not to mention hurricane Bertha our team completed the route.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/cycle-challenge.png",
    author: {
      name: "Rob Hunt",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    content: `On the 9th August cyclists, walkers and our mascot Biscop Bear set off for our first fund raising challenge. Through rain, wind and shine, not to mention hurricane Bertha our team completed the route with a walk along the pilgrims way to Lindisfarne.

A big thank you to everyone who supported us.

Enjoy this video of a few highlights of this years challenge: https://youtu.be/YxFHcKlUNKA?list=PLHun3xtocLLHeV5ahTpZ-rdV9JRRyWSR7`
  },
  {
    slug: "a-space-2-be-incredible",
    title: "A Space 2 Be Incredible!",
    category: "COMMUNITY",
    date: "May 2014",
    excerpt: "A Space 2 Grow has always looked to work in partnership and so today talks started with Gentoo housing association. They are exploring ways to build healthy communities in Sunderland.",
    image: "https://pub-1dc16f247cd64361ba6cb13a5f547dbc.r2.dev/blog/garden-plan.jpg",
    author: {
      name: "Rob H",
      avatar: "https://images.unsplash.com/photo-1500648767791-00dcc994a43e?q=80&w=200&auto=format&fit=crop"
    },
    content: `A Space 2 Grow has always looked to work in partnership and so today talks started with Gentoo housing association.

They are exploring ways to build healthy communities in Sunderland. One aspect of their sustainable and green agenda is working in collaboration with Todmordens Incredible Edible network. There was clear agreement that Gentoo and A Space 2 Grow can work together to create an incredible Space 2 Grow! So watch this space!`
  }
];

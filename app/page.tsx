'use client'

import { useState } from 'react'
import WorldMap from '../components/worldMap'
import AuthorInfo from '../components/authorInfo'
import ExcerptAnalysis from '../components/excerptAnalysis'
import { Author } from '../types/Author'
import { Card, CardContent, CardHeader } from '@/components/ui/card'

const authors: Author[] = [
  {
    id: 1,
    name: "Marcel Proust",
    country: "France",
    coordinates: [2.3522, 48.8566], // Paris, France
    bio: "Marcel Proust (1871–1922) was a French novelist, critic, and essayist, best known for his monumental novel 'In Search of Lost Time'. His work explores memory, perception, and the complexity of human experience.",
    excerpt: "“We do not receive wisdom, we must discover it for ourselves, after a journey through the wilderness which no one else can make for us, which no one can spare us, for our wisdom is the point of view from which we come at last to regard the world.”",
    analysis: "The author, through a very direct tone, does what seems like giving a lesson. He talks about wisdom, and specifically how you need to act in order to find it, and how if you don’t look for it, it will not come your way. Then, he proceeds to talk about why one should even attempt to get into such pursuit—of wisdom; he does so by stating how the way in which we last regard the world is completely linked to our wisdom, both its presence and absence. As for the literary devices used by the author there is a clear metaphor in the usage of “wilderness” when referring to life. Then, there is a usage of parallelism, as the author writes “no one else can make for us, (...) no one can spare us.” Further reinforcing the lonely nature of acquiring wisdom. In my perception it’s a well rounded text, not only effectively conveying its message but doing so with good language and style. I think the message is great, as I’ve found myself attempting to transfer wisdom before and sadly achieving no result or change.",
    picture: "/marcel-proust.png", title: "In Search of Lost Time"
  },
  {
    id: 2,
    name: "John Dos Passos",
    country: "United States",
    coordinates: [-87.6298, 41.8781], // New York City, USA
    bio: "John Dos Passos (1896–1970) was an American novelist and artist, part of the Lost Generation. He is best known for the U.S.A. trilogy, which combined fiction, biography, and newsreel techniques.",
    excerpt: "“The young man walks by himself, fast but not fast enough, far but not far enough (faces slide out of sight, talk trails into tattered scraps, footsteps tap fainter in alleys); he must catch the last subway, the streetcar, the bus, run up the gangplanks of all the steamboats, register at all the hotels, work in the cities, answer the want ads, learn the trades, take up the jobs, live in all the boarding houses, sleep in all the beds. One bed is not enough, one job is not enough, one life is not enough. At night, head swimming with wants, he walks by himself alone.”",
    analysis: "The author tries to convey what it feels like to be in busy, striving cities. He attempts to make the reader feel how lonely an individual can be amongst a radically industrialized environment, filled with people each with their own goals to strive for. John employs alliteration to make the tone feel even more crowded and overwhelming, like it is coming back at you again and again. This further instigates the sense of hunger and starvation that is brought by such strong capitalistic societies, where you are always looking for something–getting money to buy the next thing. Furthermore, the heavily fragmented imagery attempts to insert even more the alienation and isolation of urban life into the text, excerpts like “faces slide out of sight” and “talk trails into tattered scraps.” I believe the text is able to effectively convey its message, truly making me feel what I assume I was intended to by the author. Overall, the portrayal is haunting, definitely inciting a sense of empathy for those lost in the unforgiving rhythm of modernity.",
    picture: "/john-passos.png", title: "The 42nd Parallel"
  },
  {
    id: 3,
    name: "Johann Wolfgang von Goethe",
    country: "Germany",
    coordinates: [8.6821, 50.1109], // Frankfurt, Germany
    bio: "Johann Wolfgang von Goethe (1749–1832) was a German writer and statesman. His works include poetry, plays, and novels, and he is considered one of the greatest figures in Western literature.",
    excerpt: "“You are aware of only one unrest; Oh, never learn to know the other! Two souls, alas, are dwelling in my breast, And one is striving to forsake its brother. Unto the world in grossly loving zest, With clinging tendrils, one adheres; The other rises forcibly in quest, Of rarefied ancestral spheres. If there be spirits in the air, That hold their sway between the earth and sky, Descend out of the golden vapors there, And sweep me into iridescent life.”",
    analysis: "Through this excerpt, the author tries to convey an idea of duality, of having two desires inside oneself, one of materialism and the other of transcendence. The author does so through the usage of multiple metaphors, always within his especially romantic language. For instance, the “two souls” in his breast symbolize this internal struggle, with one adhering to the “grossly loving zest” of earthly pleasures and the other striving for “rarefied ancestral spheres.” This duality could be contemporaneously assimilated to Carl Jung’s shadow/persona concept in how one of the souls mostly end up surfacing to others. The invocation of “spirits in the air” further adds to the mystical layer, which blends neatly the “earthly” concerns with the spiritual longing. In general, the text is very interesting, full of emotion and elusive language. I especially enjoy this metaphor of inner conflict and disembodied duality of consciousnesses.",
    picture: "/johann-goethe.png", title: "Faust"
  },
  {
    id: 4,
    name: "James Joyce",
    country: "Ireland",
    coordinates: [-6.2603, 53.3498], // Dublin, Ireland
    bio: "James Joyce (1882–1941) was an Irish novelist, short story writer, and poet. He is best known for 'Ulysses', a landmark modernist work that has influenced countless authors.",
    excerpt: "“A few light taps upon the pane made him turn to the window. It had begun to snow again. He watched sleepily the flakes, silver and dark, falling obliquely against the lamplight. The time had come for him to set out on his journey westward. Yes, the newspapers were right: snow was general all over Ireland. It was falling on every part of the dark central plain, on the treeless hills, falling softly upon the Bog of Allen and, farther westward, softly falling into the dark mutinous Shannon waves. It was falling, too, upon every part of the lonely churchyard on the hill where Michael Furey lay buried. It lay thickly drifted on the crooked crosses and headstones, on the spears of the little gate, on the barren thorns. His soul swooned slowly as he heard the snow falling faintly through the universe and faintly falling, like the descent of their last end, upon all the living and the dead.”",
    analysis: "The author here uses heavy symbolism, using the object of snow as a symbol for death. He has quite a morbid tone, being very reflective of life’s transience. The imagery of the snow falling “softly” creates a sort of connection between the living and the dead; a unison of mortality. Joyce has a really good use of descriptive language, with characteristics like “silver and dark flakes,” and “snow falling faintly through the universe,” really enhancing the somber tone of the excerpt. The passage captures the inevitability of death, offering a certain introspection through the evocative imagery and poetic rhythm. I think what makes the text especially meaningful is the way it blends something that seems so personal, but yet is so universal. Reflecting how interconnected are human experiences, even in death.",
    picture: "/james-joyce.png", title: "The Dubliners"
  },
  {
    id: 5,
    name: "Mary Shelley",
    country: "England",
    coordinates: [-0.1276, 51.5074], // London, UK
    bio: "Mary Shelley (1797–1851) was an English novelist who wrote the Gothic novel 'Frankenstein', a cornerstone of science fiction and horror literature.",
    excerpt: "“Hateful day when I received life!' I exclaimed in agony. 'Accursed creator! Why did you form a monster so hideous that even you turned from me in disgust? God, in pity, made man beautiful and alluring, after his own image; but my form is a filthy type of yours, more horrid even from the very resemblance. Satan had his companions, fellow-devils, to admire and encourage him; but I am solitary and abhorred.'”",
    analysis: "In this excerpt, Shelley exposes the creature’s psyche, she makes the monster’s self-loathing clear and direct. She captures the agony the creature feels, the pure anguish at the simple act of existing, “Hateful day when I received life!” Still in the excerpt, there is a well executed juxtaposition, where Shelley compares the divine beauty of God’s creations to the grotesque form of the monster. This stark contrast evidences the creature’s torment, born without consent and subjected to a life of solitude and scorn. The way Shelley brings Satan to comparison creates a bitter sense of irony, as although both were outcasts, at least Satan found company among the damned. Nevertheless, the main theme with this excerpt is not really painting the creature as a monstrosity, but instead, to highlight failures within the human race: the inability to see past appearance, the fear put on one another. Overall, the passage serves to transmit an ache of the soul, the need for acceptance and the desolation that follows its denial.",
    picture: "/mary-shelley.png", title: "Frankenstein"
  },
  {
    id: 6,
    name: "William Shakespeare",
    country: "England",
    coordinates: [-1.7017, 52.1917], // Stratford-upon-Avon, UK
    bio: "William Shakespeare (1564–1616) was an English playwright and poet, widely regarded as the greatest writer in the English language. His works span tragedy, comedy, and history.",
    excerpt: "“To be, or not to be, that is the question: Whether 'tis nobler in the mind to suffer, The slings and arrows of outrageous fortune, Or to take arms against a sea of troubles, And by opposing end them. To die—to sleep, No more; and by a sleep to say we end, The heart-ache and the thousand natural shocks, That flesh is heir to: 'tis a consummation, Devoutly to be wish'd. To die, to sleep; To sleep, perchance to dream—ay, there's the rub: For in that sleep of death what dreams may come, When we have shuffled off this mortal coil, Must give us pause—there's the respect, That makes calamity of so long life.”",
    analysis: "I find this quote to be very iconic, in the soliloquy Hamlet weighs enduring life’s suffering against the uncertainty of death. His contemplation of “the slings and arrows of outrageous fortune” probably talks about trials faced in life–maybe related to wealth–framed as external assaults on the self, placing oneself in the center of the world. As he brings the imagery of “sea of troubles” he emphasizes even more the tremendous scale at which the individual is suffering in, drowning in this expanding pain. The phrase “To sleep, perchance to dream” brings about this fleeting hope for peace that is yet darkened by the fear of the unknown. Hamlet’s inability to choose is further perceived through the way the rhythm of the soliloquy changes, being a mirror of what his mind is going through, a back and forth between the alternatives for his future.",
    picture: "/william-shakespeare.png", title: "Hamlet"
  },
  {
    id: 7,
    name: "Dylan Thomas",
    country: "Wales",
    coordinates: [-3.945, 51.6214], // Swansea, Wales
    bio: "Dylan Thomas (1914–1953) was a Welsh poet and writer whose works are noted for their lyrical intensity and emotional fervor. He wrote 'Do not go gentle into that good night', one of his best-known poems.",
    excerpt: "“Do not go gentle into that good night, Old age should burn and rave at close of day; Rage, rage against the dying of the light. Though wise men at their end know dark is right, Because their words had forked no lightning they do not go gentle into that good night. Good men, the last wave by, crying how bright, Their frail deeds might have danced in a green bay, Rage, rage against the dying of the light. Wild men who caught and sang the sun in flight, And learn, too late, they grieved it on its way, Do not go gentle into that good night. Grave men, near death, who see with blinding sight, Blind eyes could blaze like meteors and be gay, Rage, rage against the dying of the light. And you, my father, there on the sad height, Curse, bless me now with your fierce tears, I pray. Do not go gentle into that good night. Rage, rage against the dying of the light.”",
    analysis: "In this poem, Dylan Thomas uses the “Good Night” as an euphemism for death. Throughout the poem he maintains a pretty consistent desperate tone as he steadily brings about different situations where one should not go gentle into that good night; where one should resist dying. The repetitive wording of “Rage, rage against the dying of the light” further adds to how urgent the author considers this fight and how much passion/violence he thinks one should allocate towards the goal. Thomas categorizes “wise men,” “good men,” “wild men,” and “grave men”—each facing regret, realization; all having some sort of resistance toward giving into that good night. The poem’s cyclical nature seems to convey and reinforce the inevitability of death, coming to you, your friends, again and again. This refrain ties together the emotional urgency and thematic core of the poem, urging defiance in the face of inevitability. Overall, the poem just follows Thomas’ impassioned plea for resistance against death.",
    picture: "/dylan-thomas.png", title: "Do Not Go Gentle into That Good Night"
  },
  {
    id: 8,
    name: "Tennessee Williams",
    country: "United States",
    coordinates: [-90.0715, 29.9511], // New Orleans, LA
    bio: "Tennessee Williams (1911–1983) was an American playwright, author of many stage classics. He often focused on the emotional struggles of characters in the American South.",
    excerpt: "“He was a boy, just a boy, when I was a very young girl. When I was sixteen, I made the discovery - love. All at once and much, much too completely. It was like you suddenly turned a blinding light on something that had always been half in shadow, that's how it struck the world for me. But I was unlucky. Deluded. There was something different about the boy, a nervousness, a softness and tenderness which wasn’t like a man’s, although he wasn’t the least bit effeminate looking–still–that thing was there. He came to me for help. I didn't know that. I didn't find out anything till after our marriage when we'd run away and come back and all I knew was I'd failed him in some mysterious way and wasn't able to give the help he needed but couldn't speak of! He was in the quicksands and clutching at me–but I wasn’t holding him out, I was slipping in with him!”",
    analysis: "The character here is, in a very resentful tone, confessing about her experience with a man. First, to describe how strong and sudden the love he gave to her was she uses a metaphor of light and shadow, how before she was in shadow (indicating a lack of love) and how his love came to her as a blinding light. Next, she reveals some curious aspects about the boy’s personality, to do so she uses contrasting characteristics by highlighting his nervousness, softness, and tenderness. Then, she gets to the conclusion of his effeminate nature and homosexuality. She then begins blaming herself for not noticing, and through my analysis I conclude that the reason she does so is not only because of how he was forced into passing as straight due to society, but also due to the fact that she knew he would’ve done that anyways and to anyone; it is nothing personal against her. In the end she brings a metaphor of quicksand, for how they—together—fell into depression. The metaphor evokes an inexorable descent into despair, illustrating how their mutual dependence became a consuming force, dragging them into their emotional abyss. Additionally, it exposes how tragic the weight of societal expectations and values can be, which in their case ends up twisting their connection, building a shared burden of guilt and regret, and making their fall as inevitable as it was devastating.",
    picture: "/tennessee-williams.png", title: "A Streetcar Named Desire"
  },
  {
    "id": 9,
    "name": "T.S. Eliot",
    "country": "United Kingdom",
    "coordinates": [-0.1276, 51.5074],
    "bio": "T.S. Eliot (1888–1965) was a British-American poet, essayist, and playwright, widely regarded as one of the most important figures in modernist literature. His works often grapple with themes of time, memory, and spiritual desolation.",
    "excerpt": "Time present and time past / Are both perhaps present in time future / And time future contained in time past...",
    "analysis": "Eliot explores the unbearable tension between how time loops back and yet is unrecoverable. The repetition lulls us into a trance, while enjambment makes thoughts tumble, mirroring how memory itself is an echo—both a guide and a ghost. His reflection on unredeemable time resonates today, in an age of algorithmic predictions and digital archives, where the line between memory and presence blurs disturbingly.",
    "picture": "/ts-eliot.jpg",
    "title": "Four Quartets"
},
{
    "id": 10,
    "name": "Anonymous Egyptian Poet",
    "country": "Egypt",
    "coordinates": [31.2357, 30.0444],
    "bio": "An anonymous poet from the Ramesside Period (1300-1100 BC), whose poem 'I Was Simply Off to See Nefrus' offers a vivid, personal glimpse into ancient Egyptian emotional life.",
    "excerpt": "I was simply off to see Nefrus my friend / Just to sit and chat at her place (about men)...",
    "analysis": "This poem captures the raw push-pull of desire and fear, as the speaker begs Hathor to let her escape the gaze of Mehy. The apostrophes and mythic allusions magnify how overwhelming such feelings are. Strikingly modern in its exploration of being seen and judged, it echoes the contemporary experience of navigating public and private selves, particularly for women in surveilled societies.",
    "picture": "/egyptian.jpg",
    "title": "I Was Simply Off to See Nefrus"
},
{
    "id": 11,
    "name": "William Shakespeare",
    "country": "England",
    "coordinates": [-1.7017, 52.1917],
    "bio": "William Shakespeare (1564–1616) was an English playwright and poet, widely regarded as the greatest writer in the English language. His works span tragedy, comedy, and history.",
    "excerpt": "JULIET: This bud of love, by summer’s ripening breath, May prove a beauteous flower...",
    "analysis": "Shakespeare’s metaphor of love as a 'bud' captures the paradox of love's immediacy and its need to grow. The stichomythia between Romeo and Juliet shows love as negotiation, not certainty. Its lyrical excess asks whether true connection requires slow cultivation—a question that lingers in an era of instant gratification.",
    "picture": "/shakespeare.jpg",
    "title": "Romeo and Juliet"
},
{
    "id": 12,
    "name": "David Foster Wallace",
    "country": "United States",
    "coordinates": [-86.1581, 39.7684],
    "bio": "David Foster Wallace (1962–2008) was an American writer and essayist, known for his postmodern and metafictional works exploring consciousness, addiction, and the human condition.",
    "excerpt": "In the day-to-day trenches of adult life, there is actually no such thing as atheism...",
    "analysis": "Wallace argues that everyone 'worships' something, whether consciously or not. His casual tone masks a deep critique of consumerism and modern idolatry. The anaphora-driven rhythm makes his point inescapable: absent conscious choice, we risk being 'eaten alive' by the things we uncritically serve. Especially prescient now, when algorithms curate desires without our consent.",
    "picture": "/david-foster-wallace.jpg",
    "title": "This is Water"
},
{
    "id": 13,
    "name": "Fyodor Dostoevsky",
    "country": "Russia",
    "coordinates": [30.3351, 59.9343],
    "bio": "Fyodor Dostoevsky (1821–1881) was a Russian novelist, philosopher, and journalist. His works probe the psychological depths of human nature and grapple with existential and moral dilemmas.",
    "excerpt": "Now I ask you: what can be expected of man as a being endowed with such strange qualities?...",
    "analysis": "Dostoevsky lays bare the human tendency to sabotage comfort just to assert autonomy. His hyperbolic 'risking his gingerbread' undercuts utilitarian logic with irony. He mocks the idea that humans seek only rational self-interest, instead framing irrational chaos as the ultimate declaration of freedom—a message that resonates amid today's obsession with optimization.",
    "picture": "/dostoevsky.jpg",
    "title": "Notes from Underground"
},
{
    "id": 14,
    "name": "Yukio Mishima",
    "country": "Japan",
    "coordinates": [139.6917, 35.6895],
    "bio": "Yukio Mishima (1925–1970) was a Japanese author, playwright, and nationalist, renowned for his exploration of beauty, death, and the conflict between modernity and tradition.",
    "excerpt": "Dreams, memories, the sacred—they are all alike in that they are beyond our grasp...",
    "analysis": "Mishima meditates on how sanctity emerges from unattainability. His paradox—'His touch defiles… yet he contains the source of miracles'—encapsulates the human dilemma of desire and reverence. The elevated language amplifies this metaphysical inquiry, now even more piercing in a digital age of constant availability, where the sacred risks being stripped of its mystique.",
    "picture": "/mishima.jpg",
    "title": "Spring Snow"
},
{
    "id": 15,
    "name": "William Butler Yeats",
    "country": "Ireland",
    "coordinates": [-6.2603, 53.3498],
    "bio": "William Butler Yeats (1865–1939) was an Irish poet and dramatist, a key figure in 20th-century literature and a driving force behind the Irish Literary Revival.",
    "excerpt": "Turning and turning in the widening gyre / The falcon cannot hear the falconer...",
    "analysis": "Yeats captures a vision of societal collapse, twisting the Second Coming into an ominous inevitability. His fractured syntax mirrors a world unraveling, while mythic imagery like the 'rough beast' hints at archetypal fears. The poem resonates in an era marked by global crises, tapping into a collective unconscious bracing for what slouches next toward our crumbling 'Bethlehems'.",
    "picture": "/yeats.jpg",
    "title": "The Second Coming"
},
{
    "id": 16,
    "name": "Hannah Arendt",
    "country": "Germany",
    "coordinates": [13.405, 52.52],
    "bio": "Hannah Arendt (1906–1975) was a German-American philosopher and political theorist known for her works on totalitarianism, authority, and the nature of evil.",
    "excerpt": "The ideal subject of totalitarian rule is not the convinced Nazi or the convinced Communist...",
    "analysis": "Arendt dissects how totalitarianism thrives when distinctions between fact and fiction erode. Her clinical yet urgent tone reveals a society numbed by cynicism, primed for manipulation. Especially relevant in today's digital disinformation landscape, her analysis warns how apathy and exhaustion become fertile ground for authoritarian control, as truth itself dissolves into quicksand.",
    "picture": "/arendt.jpg",
    "title": "The Origins of Totalitarianism"
}
]


export default function Home() {
  const [selectedAuthor, setSelectedAuthor] = useState<Author | null>(null)

  return (
    <main className="min-h-screen bg-background mb-8">
      <h1 className="text-4xl font-bold text-center py-8" style={{ color: "var(--text-color)" }}>
        Literature Around the World
      </h1>
      <WorldMap authors={authors} onSelectAuthor={setSelectedAuthor} />
      {selectedAuthor && (
        <Card className="max-w-4xl mx-auto mt-8 p-6 rounded-lg shadow-lg bg-card text-card-foreground border-4">
          <CardHeader><AuthorInfo author={selectedAuthor} /></CardHeader>
          <div className="mb-6 border-t" style={{ borderColor: "var(--accent-color)" }}></div>
          <CardContent><ExcerptAnalysis excerpt={selectedAuthor.excerpt} analysis={selectedAuthor.analysis} title={selectedAuthor.title}/></CardContent>
        </Card>
      )}
    </main>
  )
}

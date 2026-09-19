const stories = [
  {
    id: 'future-juba', category: 'South Sudan', location: 'Juba', author: 'Cazo Desk', date: '18 Sep 2026', read: '5 min read', featured: true,
    title: 'The city building its future one street at a time',
    excerpt: 'Across Juba, a new generation is turning practical ideas into businesses, classrooms and public spaces.',
    body: 'Juba is changing in visible and quiet ways. New businesses are opening beside old markets, young founders are building services for their neighborhoods, and community groups are making room for conversations that once had no stage.\n\nThe work is unfinished, but the direction is clear: South Sudan\'s next chapter will be shaped by the people who live it every day.',
    image: 'https://images.unsplash.com/photo-1539650116574-75c0c6d73f6e?auto=format&fit=crop&w=1200&q=85'
  },
  {
    id: 'river-economy', category: 'Economy', location: 'Nile corridor', author: 'Nadia Deng', date: '17 Sep 2026', read: '4 min read',
    title: 'Along the Nile, small traders are writing a bigger economic story',
    excerpt: 'A closer look at the informal networks keeping local commerce moving.',
    body: 'From early morning river crossings to the last market stalls at dusk, trade along the Nile relies on trust, timing and a remarkable amount of improvisation.',
    image: 'https://images.unsplash.com/photo-1500530855697-b586d89ba3ee?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'new-classrooms', category: 'Society', location: 'Central Equatoria', author: 'Grace Lado', date: '16 Sep 2026', read: '6 min read',
    title: 'What a new classroom means for a whole community',
    excerpt: 'Teachers and families are building a culture of learning with limited resources.',
    body: 'The first lesson begins before the school bell. Families clear paths, teachers prepare shared materials, and students arrive carrying an optimism that feels larger than the room.',
    image: 'https://images.unsplash.com/photo-1509062522246-3755977927d7?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'regional-signal', category: 'Africa', location: 'East Africa', author: 'Cazo Desk', date: '15 Sep 2026', read: '3 min read',
    title: 'The regional signals worth watching this week',
    excerpt: 'Five developments connecting South Sudan to a changing East Africa.',
    body: 'The region is moving through a period of ambitious plans and difficult questions. Here are the signals our newsroom is following most closely.',
    image: 'https://images.unsplash.com/photo-1523805009345-7448845a9e53?auto=format&fit=crop&w=800&q=85'
  },
  {
    id: 'makers-juba', category: 'Culture', location: 'Juba', author: 'Atem Simon', date: '14 Sep 2026', read: '5 min read',
    title: 'The makers putting Juba on the cultural map',
    excerpt: 'Artists, designers and musicians are finding new ways to make the city heard.',
    body: 'A lively creative scene is gathering momentum in Juba. Its members are building their own venues, audiences and vocabulary.',
    image: 'https://images.unsplash.com/photo-1531058020387-3be344556be6?auto=format&fit=crop&w=800&q=85'
  }
];

const breakingStories = [
  "South Sudan's next chapter is being written by its people.",
  'The stories shaping Juba, East Africa and the world.',
  'Independent reporting, close to the people and the facts.'
];
let activeTopic = 'All stories';
let breakingIndex = 0;

const app = document.querySelector('#app');
const modalBackdrop = document.querySelector('#modalBackdrop');
const articleModal = document.querySelector('#articleModal');
const mobileNav = document.querySelector('#mobileNav');
const searchPanel = document.createElement('div');
searchPanel.className = 'container search-panel';
searchPanel.innerHTML = '<input id="searchInput" type="search" placeholder="Search the signal..." aria-label="Search stories">';
document.querySelector('.site-header').append(searchPanel);

const storyMeta = story => `<div class="story-meta"><span>${story.location}</span><span>·</span><span>${story.date}</span><span>·</span><span>${story.read}</span></div>`;
const storyCard = story => `<article class="story-row"><img src="${story.image}" alt="${story.title}"><div><span class="category">${story.category}</span><h3><a href="#article/${story.id}" data-article="${story.id}">${story.title}</a></h3><p class="story-excerpt">${story.excerpt}</p>${storyMeta(story)}</div><a class="read-arrow" href="#article/${story.id}" data-article="${story.id}" aria-label="Read ${story.title}">↗</a></article>`;

function renderHome() {
  const visibleStories = activeTopic === 'All stories' ? stories : stories.filter(story => story.category === activeTopic);
  const featured = stories.find(story => story.featured);
  const topics = [...new Set(stories.map(story => story.category))];
  app.innerHTML = `<section class="hero" id="home"><div class="container hero-grid"><div class="hero-copy"><div class="section-kicker">The signal / Issue 001</div><h1>Know. <em>Understand.</em><br>Move.</h1><p>Independent reporting from South Sudan, Africa and the world. Clear-eyed stories for a country in motion.</p></div><article class="hero-feature"><img src="${featured.image}" alt="${featured.title}"><div class="feature-overlay"><span class="category">${featured.category} / Lead story</span><h2><a href="#article/${featured.id}" data-article="${featured.id}">${featured.title}</a></h2>${storyMeta(featured)}</div></article></div></section>
  <section class="content-section" id="latest"><div class="container"><div class="content-header"><h2>Latest <span>stories</span></h2><a class="text-link" href="#latest">View all ↗</a></div><div class="latest-layout"><div class="story-list">${visibleStories.map(storyCard).join('')}</div><aside class="topic-rail" id="topics"><h3>Follow a thread</h3><div class="topic-list"><button class="topic-button ${activeTopic === 'All stories' ? 'active' : ''}" data-topic="All stories">All stories <span class="topic-count">${stories.length}</span></button>${topics.map(topic => `<button class="topic-button ${activeTopic === topic ? 'active' : ''}" data-topic="${topic}">${topic} <span class="topic-count">${stories.filter(story => story.category === topic).length}</span></button>`).join('')}</div></aside></div></div></section>
  <section class="about" id="about"><div class="container about-grid"><div><div class="section-kicker">Why Cazo</div><h3>Reporting with a point of view, never an agenda.</h3></div><div><p class="about-copy">CAZO NEWS is an independent newsroom focused on the people, ideas and decisions moving South Sudan forward. We believe good reporting should make the world more legible, then leave you ready to act.</p><div class="about-rule"><div class="about-stat"><strong>01</strong><span>People first</span></div><div class="about-stat"><strong>02</strong><span>Facts clearly</span></div><div class="about-stat"><strong>03</strong><span>Always curious</span></div></div></div></div></section>
  <section class="topics-section"><div class="container"><div class="content-header"><h2>Explore <span>topics</span></h2></div><div class="topic-cards">${topics.slice(0, 4).map(topic => { const story = stories.find(item => item.category === topic); return `<a class="topic-card" href="#topics" data-topic-link="${topic}"><img src="${story.image}" alt=""><h3>${topic}</h3></a>`; }).join('')}</div></div></section>`;
}

function renderLogin() {
  app.innerHTML = `<section class="login-view"><div class="section-kicker">Cazo newsroom</div><h1>Make the signal clearer.</h1><p>Sign in to manage stories, review drafts and publish to the world.</p><form id="loginForm"><label class="form-field">Email<input name="email" type="email" required placeholder="editor@cazonews.com"></label><label class="form-field">Password<input name="password" type="password" required placeholder="Your password"></label><p class="form-message" id="formMessage"></p><button class="button button-red" type="submit">Enter newsroom ↗</button></form></section>`;
  document.querySelector('#loginForm').addEventListener('submit', event => { event.preventDefault(); renderAdmin(); });
}

function renderAdmin() {
  app.innerHTML = `<section class="admin-view"><div class="container"><div class="admin-toolbar"><div><div class="section-kicker">Prototype newsroom</div><h1>Story desk.</h1></div><button class="button button-red" id="newStory">New story +</button></div><div class="admin-table">${stories.map(story => `<div class="admin-item"><div><strong>${story.title}</strong><div class="story-meta"><span>${story.category}</span><span>·</span><span>${story.date}</span></div></div><span class="status">Published</span></div>`).join('')}</div></div></section>`;
}

function openArticle(id) {
  const story = stories.find(item => item.id === id);
  if (!story) return;
  articleModal.innerHTML = `<button class="modal-close" id="modalClose" aria-label="Close article">×</button><img class="modal-image" src="${story.image}" alt="${story.title}"><div class="modal-content"><span class="category">${story.category} / ${story.location}</span><h1>${story.title}</h1>${storyMeta(story)}<div class="story-body">${story.body.split('\\n\\n').map(paragraph => `<p>${paragraph}</p>`).join('')}</div><p><strong>By ${story.author}</strong></p></div>`;
  modalBackdrop.classList.add('is-open');
  modalBackdrop.setAttribute('aria-hidden', 'false');
  document.querySelector('#modalClose').focus();
}

function closeArticle() { modalBackdrop.classList.remove('is-open'); modalBackdrop.setAttribute('aria-hidden', 'true'); }
function route() { window.location.hash === '#login' ? renderLogin() : renderHome(); window.scrollTo(0, 0); }

renderHome();
window.addEventListener('hashchange', route);
document.addEventListener('click', event => {
  const articleLink = event.target.closest('[data-article]');
  if (articleLink) { event.preventDefault(); openArticle(articleLink.dataset.article); }
  const topicButton = event.target.closest('[data-topic]');
  if (topicButton) { activeTopic = topicButton.dataset.topic; renderHome(); document.querySelector('#latest').scrollIntoView({ behavior: 'smooth' }); }
  const topicLink = event.target.closest('[data-topic-link]');
  if (topicLink) { event.preventDefault(); activeTopic = topicLink.dataset.topicLink; renderHome(); document.querySelector('#latest').scrollIntoView({ behavior: 'smooth' }); }
  if (event.target.closest('#menuToggle')) mobileNav.classList.toggle('is-open');
  if (event.target.closest('#searchToggle')) { searchPanel.classList.toggle('is-open'); if (searchPanel.classList.contains('is-open')) document.querySelector('#searchInput').focus(); }
  if (event.target === modalBackdrop || event.target.closest('#modalClose')) closeArticle();
});
document.querySelector('#breakingNext').addEventListener('click', () => { breakingIndex = (breakingIndex + 1) % breakingStories.length; document.querySelector('#breakingText').textContent = breakingStories[breakingIndex]; });
document.addEventListener('input', event => { if (event.target.id !== 'searchInput') return; const query = event.target.value.toLowerCase().trim(); activeTopic = 'All stories'; const matches = stories.filter(story => `${story.title} ${story.category} ${story.excerpt}`.toLowerCase().includes(query)); document.querySelector('.story-list').innerHTML = matches.length ? matches.map(storyCard).join('') : '<p class="story-excerpt">No stories found for that search.</p>'; });
document.addEventListener('keydown', event => { if (event.key === 'Escape') { closeArticle(); mobileNav.classList.remove('is-open'); } });

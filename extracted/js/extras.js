/* Portfolio extras: services, testimonials, contact form, resume, social links,
   scroll progress and back-to-top. Data comes from Supabase. */
(function () {
  var $ = function (s) { return document.querySelector(s); };
  var esc = function (x) { return String(x == null ? '' : x).replace(/[&<>"]/g, function (c) { return {'&':'&amp;','<':'&lt;','>':'&gt;','"':'&quot;'}[c]; }); };
  var url = function (u) { return /^https?:\/\//i.test(u || '') ? esc(u) : ''; };

  var css = '' +
  '#sp{position:fixed;top:0;left:0;height:3px;width:0;background:linear-gradient(90deg,#c9302a,#dbb96b);z-index:200;pointer-events:none}' +
  '#tt{position:fixed;right:18px;bottom:calc(env(safe-area-inset-bottom,0px) + 18px);width:46px;height:46px;border-radius:50%;border:1px solid var(--ln);background:var(--pn);color:var(--gold);cursor:pointer;z-index:50;display:grid;place-items:center;opacity:0;transform:translateY(12px);pointer-events:none;transition:.3s}' +
  '#tt.on{opacity:1;transform:none;pointer-events:auto}#tt:hover{border-color:var(--gold)}#tt svg{width:20px;height:20px}' +
  '.xg{display:grid;grid-template-columns:repeat(2,1fr);gap:16px}' +
  '.xc{border:1px solid var(--ln);background:var(--pn);padding:24px 22px;position:relative;border-top:3px solid var(--red2)}' +
  '.xc i{font:400 44px var(--bb);color:#12301f;position:absolute;right:14px;top:2px;font-style:normal;line-height:1}' +
  '.xc h3{font:400 28px/1.1 var(--bb);letter-spacing:.03em;margin:0 0 8px;position:relative}.xc p{margin:0;color:#b7c4bc;font-size:14px;position:relative}' +
  '.xq{border:1px solid var(--ln);background:var(--pn);padding:22px;margin-bottom:16px;border-left:4px solid var(--gold)}' +
  '.xq p{margin:0 0 12px;font-size:16px;line-height:1.6}.xq b{display:block;font-weight:600}.xq span{color:var(--mu);font-size:13px}' +
  '.cf{max-width:560px;margin:0 auto 34px;text-align:left}.cf .r2{display:grid;grid-template-columns:1fr 1fr;gap:14px}' +
  '.cf label{display:block;font:500 11px var(--mono);letter-spacing:.16em;text-transform:uppercase;color:var(--gold);margin-bottom:14px}' +
  '.cf input,.cf textarea{display:block;width:100%;margin-top:7px;background:var(--pn);border:1px solid var(--ln);border-radius:4px;padding:12px 14px;color:var(--tx);font:400 15px Inter,sans-serif;letter-spacing:0;text-transform:none}' +
  '.cf input:focus,.cf textarea:focus{outline:0;border-color:var(--gold)}.cf textarea{resize:vertical;min-height:130px}' +
  '.cf .hp{position:absolute;left:-9999px;width:1px;height:1px;opacity:0}' +
  '.cf button{border:0;cursor:pointer;width:100%}.cf button:disabled{opacity:.6;cursor:wait}' +
  '.cs{min-height:22px;margin:12px 0 0;font-size:14px;text-align:center}.cs.ok{color:#5fd39a}.cs.er{color:var(--red2)}' +
  '.rs{margin-top:20px}' +
  '@media(max-width:700px){.xg{grid-template-columns:1fr}.cf .r2{grid-template-columns:1fr}}';
  var st = document.createElement('style'); st.textContent = css; document.head.appendChild(st);

  /* scroll progress + back to top (no data needed) */
  var sp = document.createElement('div'); sp.id = 'sp'; document.body.appendChild(sp);
  var tt = document.createElement('button'); tt.id = 'tt'; tt.type = 'button'; tt.setAttribute('aria-label', 'Back to top');
  tt.innerHTML = '<svg viewBox="0 0 24 24" fill="none" stroke="currentColor" stroke-width="2" stroke-linecap="round" stroke-linejoin="round"><path d="M12 19V5M5 12l7-7 7 7"/></svg>';
  tt.onclick = function () { window.scrollTo({ top: 0, behavior: 'smooth' }); };
  document.body.appendChild(tt);
  function onScroll() {
    var h = document.documentElement.scrollHeight - innerHeight, y = window.scrollY;
    sp.style.width = (h > 0 ? y / h * 100 : 0) + '%'; tt.classList.toggle('on', y > 700);
  }
  addEventListener('scroll', onScroll, { passive: true }); onScroll();

  if (!window.SUPABASE_URL || !window.supabase) return;
  var sb = window.supabase.createClient(window.SUPABASE_URL, window.SUPABASE_ANON_KEY);

  function addSection(id, lab, title, inner, before) {
    var s = document.createElement('section'); s.id = id;
    s.innerHTML = '<div class="wrap"><p class="lab">' + lab + '</p><h2>' + title + '</h2>' + inner + '</div>';
    if (before && before.parentNode) before.parentNode.insertBefore(s, before); else document.body.insertBefore(s, $('footer'));
  }

  /* contact form */
  function contactForm() {
    var anchor = $('#contact .wrap > p:not(.lab)'); if (!anchor) return;
    var f = document.createElement('form'); f.className = 'cf'; f.noValidate = true;
    f.innerHTML = '<div class="r2"><label>Name<input name="n" maxlength="100" autocomplete="name" required></label>' +
      '<label>Email<input name="e" type="email" maxlength="150" autocomplete="email" required></label></div>' +
      '<label>Message<textarea name="m" maxlength="2000" required></textarea></label>' +
      '<input class="hp" name="w" tabindex="-1" autocomplete="off" aria-hidden="true">' +
      '<button class="bt" type="submit">Send message</button><p class="cs" role="status"></p>';
    anchor.after(f);
    var out = f.querySelector('.cs'), btn = f.querySelector('button');
    f.onsubmit = function (e) {
      e.preventDefault(); out.className = 'cs';
      var n = f.n.value.trim(), em = f.e.value.trim(), m = f.m.value.trim();
      if (f.w.value) { out.textContent = 'Thanks, your message was sent.'; out.className = 'cs ok'; return; }
      if (!n || !/^[^@\s]+@[^@\s]+\.[^@\s]+$/.test(em) || m.length < 5) { out.textContent = 'Please enter your name, a valid email and a message of at least 5 characters.'; out.className = 'cs er'; return; }
      var last = 0; try { last = +localStorage.getItem('cf_t') || 0; } catch (x) {}
      if (Date.now() - last < 60000) { out.textContent = 'Please wait a minute before sending another message.'; out.className = 'cs er'; return; }
      btn.disabled = true; out.textContent = 'Sending...';
      sb.from('messages').insert({ name: n, email: em, message: m }).then(function (r) {
        btn.disabled = false;
        if (r.error) { out.textContent = 'Could not send right now. Please email me directly.'; out.className = 'cs er'; return; }
        try { localStorage.setItem('cf_t', Date.now()); } catch (x) {}
        f.reset(); out.textContent = 'Thanks, your message was sent. I will reply soon.'; out.className = 'cs ok';
      });
    };
  }
  contactForm();

  var ICO = {
    youtube: '<svg viewBox="0 0 24 24"><rect x="2" y="5" width="20" height="14" rx="4" fill="#FF0000"/><path fill="#fff" d="M10 9l5 3-5 3z"/></svg>',
    instagram: '<svg viewBox="0 0 24 24"><rect x="2" y="2" width="20" height="20" rx="6" fill="#E1306C"/><rect x="6.5" y="6.5" width="11" height="11" rx="3.5" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="12" cy="12" r="2.6" fill="none" stroke="#fff" stroke-width="1.8"/><circle cx="16" cy="8" r="1" fill="#fff"/></svg>',
    github: '<svg viewBox="0 0 24 24"><path fill="#fff" d="M12 .5a11.5 11.5 0 00-3.64 22.41c.58.1.79-.25.79-.56v-2c-3.2.7-3.88-1.37-3.88-1.37-.52-1.33-1.28-1.69-1.28-1.69-1.04-.71.08-.7.08-.7 1.15.08 1.76 1.18 1.76 1.18 1.03 1.76 2.69 1.25 3.35.96.1-.75.4-1.25.73-1.54-2.55-.29-5.24-1.28-5.24-5.69 0-1.26.45-2.28 1.18-3.09-.12-.29-.51-1.46.11-3.05 0 0 .97-.31 3.18 1.18a11 11 0 015.78 0c2.2-1.49 3.17-1.18 3.17-1.18.63 1.59.24 2.76.12 3.05.74.81 1.18 1.83 1.18 3.09 0 4.42-2.7 5.4-5.27 5.68.41.36.78 1.06.78 2.14v3.17c0 .31.21.67.8.56A11.5 11.5 0 0012 .5z"/></svg>'
  };

  Promise.all([
    sb.from('profiles').select('*').limit(1),
    sb.from('services').select('*').order('display_order'),
    sb.from('testimonials').select('*').order('display_order')
  ]).then(function (r) {
    var p = (r[0].data && r[0].data[0]) || {}, sv = r[1].data || [], tm = r[2].data || [];

    if (sv.length) addSection('services', 'What I do', 'WHAT I <em>DO</em>',
      '<div class="xg">' + sv.map(function (x, i) { return '<div class="xc"><i>0' + (i + 1) + '</i><h3>' + esc(x.title) + '</h3><p>' + esc(x.description) + '</p></div>'; }).join('') + '</div>', $('#projects'));

    if (tm.length) addSection('testimonials', 'Kind words', 'WHAT PEOPLE <em>SAY</em>',
      tm.map(function (x) { return '<div class="xq"><p>' + esc(x.quote) + '</p><b>' + esc(x.name) + '</b><span>' + esc(x.role) + '</span></div>'; }).join(''), $('#contact'));

    var av = $('#contact .wrap > p:not(.lab)'); if (av && p.availability) av.textContent = p.availability;

    if (url(p.resume_url) && $('#about .fx')) {
      var a = document.createElement('a'); a.className = 'bt rs'; a.href = p.resume_url; a.target = '_blank'; a.rel = 'noopener'; a.textContent = 'Download resume';
      $('#about .fx').appendChild(a);
    }

    var soc = $('#contact .soc');
    if (soc) {
      var li = soc.querySelector('a[aria-label="LinkedIn"]'); if (li && url(p.linkedin_url)) li.href = p.linkedin_url;
      [['youtube_url', 'YouTube', 'youtube'], ['instagram_url', 'Instagram', 'instagram'], ['github_url', 'GitHub', 'github']].forEach(function (d) {
        if (!url(p[d[0]])) return;
        var l = document.createElement('a'); l.href = p[d[0]]; l.target = '_blank'; l.rel = 'noopener'; l.setAttribute('aria-label', d[1]); l.innerHTML = ICO[d[2]];
        soc.appendChild(l);
      });
    }
  }).catch(function () {});
})();

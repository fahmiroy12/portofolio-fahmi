// script.js - interactivity & dynamic data
// Default data (ganti sesuai profil Anda)
const profile = {
  name: 'Fahmi',
  headline: 'Teknisi Pendingin & Tata Udara | Spesialis Instalasi & Servis',
  about: 'Saya adalah teknisi pendingin tata udara berpengalaman dalam instalasi, troubleshooting, dan perawatan sistem pendingin untuk rumah, kantor, dan fasilitas komersial. Fokus pada efisiensi energi, keselamatan kerja, dan solusi yang tahan lama.',
  location: 'Karawang, Indonesia',
  email: 'roy616843@gmail.com',
  whatsapp: '+6285888681958',
  experience: '5+ tahun',
  certs: 'Handling Refrigerant, K3'
};

// sample projects (edit or expand)
const projects = [
  {title:'Instalasi AC Split - Rumah Tinggal', type:'res', desc:'Instalasi unit AC split 1/2PK, 1PK, 1.5PK, 2PK, 2.5PK, penempatan indoor/outdoor unit, dan balancing airflow.'},
  {title:'Perancangan Ducting & AHU - Kantor 5 Lantai', type:'com', desc:'Perancangan AHU, ducting, dan sistem kontrol untuk area kantor dan perumahan dll.'},
  {title:'Program Maintenance Ruko Komersial', type:'maint', desc:'Pengecekan Unit Gratis, Cleaning AC Per Unit 1/2PK-1PK Rp.80.000, 1.5PK-2PK Rp.130.000, 2.5PK Rp.150.000 kalau ada trouble unit nego ditempat'},
  {title:'Harga Pemasangan AC Baru Terima Beres', type:'res', desc:'1/2PK Rp.3.500.000, 1PK Rp.4.000.000, 1.5PK Rp.6.000.000, 2PK Rp.8.000.000, 2.5PK Rp.10.000.000'},
   {title:'Penjualan AC Second Terima Beres', type:'res', desc:'1/2PK Rp.2.200.000, 1PK Rp.2.500.000, 1.5PK Rp.3.000.000, 2PK Rp.4.000.000, 2.5PK Rp.5.000.000 plus garansi teknisi 1 bulan'},
   {title:'Penyedian Servis (AC/Air Conditioner, Kulkas Dan Mesin Cuci', type:'res', desc:''}
];

// init UI
document.addEventListener('DOMContentLoaded', () => {
  document.getElementById('name').textContent = profile.name;
  document.getElementById('name-inline').textContent = profile.name;
  document.getElementById('name-card').textContent = profile.name;
  document.getElementById('name-foot').textContent = profile.name;
  document.getElementById('headline').textContent = profile.headline;
  document.getElementById('about-text').textContent = profile.about;
  document.getElementById('location').textContent = profile.location;
  document.getElementById('email').textContent = profile.email;
  document.getElementById('email').href = 'mailto:roy616843@gmail.com'+profile.email;
  document.getElementById('email2').href = 'mailto:roy616843@gmail.com'+profile.email;
  document.getElementById('wa-link').textContent = profile.whatsapp;
  document.getElementById('wa-link').href = 'https://wa.me/6285888681958'+profile.whatsapp.replace(/[^0-9]/g,'');
  document.getElementById('experience').textContent = profile.experience;
  document.getElementById('certs').textContent = profile.certs;
  document.getElementById('year').textContent = new Date().getFullYear();

  // populate projects
  const grid = document.getElementById('projects-grid');
  projects.forEach(p=>{
    const el = document.createElement('article');
    el.className='project';
    el.setAttribute('data-type',p.type);
    el.innerHTML = `<h3>${p.title}</h3><p style="margin:0;color:var(--muted)">${p.desc}</p><div style="margin-top:8px"><span class="tag-pill">${p.type==='res'? 'Residensial': p.type==='com'? 'Komersial':'Maintenance'}</span></div>`;
    grid.appendChild(el);
  });

  // project filters
  document.querySelectorAll('[data-filter]').forEach(btn=>{
    btn.addEventListener('click',()=>{
      const f = btn.getAttribute('data-filter');
      document.querySelectorAll('.project').forEach(p=>{
        p.style.display = (f==='*' || p.getAttribute('data-type')===f) ? 'block' : 'none';
      });
    });
  });

  // theme toggle (dark/light)
  const themeBtn = document.getElementById('theme-toggle');
  themeBtn.addEventListener('click',()=>{
    const html = document.documentElement;
    const isDark = html.getAttribute('data-theme')==='dark';
    if(isDark){ html.setAttribute('data-theme',''); themeBtn.textContent='Dark'; themeBtn.setAttribute('aria-pressed','false'); }
    else{ html.setAttribute('data-theme','dark'); themeBtn.textContent='Light'; themeBtn.setAttribute('aria-pressed','true'); }
  });

  // WhatsApp contact quick message
  document.getElementById('contact-wa').addEventListener('click', ()=>{
    const num = profile.whatsapp.replace(/[^0-9]/g,'');
    const text = encodeURIComponent(`Halo ${profile.name}, saya ingin konsultasi mengenai layanan HVAC.`);
    window.open('https://wa.me/6285888681958? text='+text,'_blank');
  });

  // print
  document.getElementById('print-btn').addEventListener('click', ()=>window.print());

  // download CV (generate simple .txt)
  document.getElementById('cv-btn').addEventListener('click', (e)=>{
    e.preventDefault();
    const cv = `CV - ${profile.name}\n\nProfil:\n${profile.about}\n\nPengalaman: ${profile.experience}\nSertifikat: ${profile.certs}\n\nKontak:\nEmail: ${profile.email}\nWA: ${profile.whatsapp}`;
    const blob = new Blob([cv],{type:'text/plain'});
    const url = URL.createObjectURL(blob);
    const a = document.createElement('a'); a.href=url; a.download = `CV_${profile.name.replace(/\s+/g,'_')}.txt`; document.body.appendChild(a); a.click(); a.remove(); URL.revokeObjectURL(url);
  });

  // accessibility: show focus outlines only when using keyboard
  (function(){
    function handleFirstTab(e){ if(e.key==='Tab') document.documentElement.classList.add('show-focus'); }
    window.addEventListener('keydown',handleFirstTab,{once:true});
  })();
});

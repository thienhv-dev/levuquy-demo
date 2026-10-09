"use client"

import { useEffect, useRef, useState } from "react"
import { Check, ChevronLeft, ChevronRight, Copy, Heart, MapPin, Maximize2, Music, X } from "lucide-react"
import { getImagePath } from "@/lib/image-utils"
import { wedding, type Photo } from "@/lib/wedding-data"

const pad = (value: number) => String(value).padStart(2, "0")
const { date, groom, bride, venue } = wedding
// Thiệp vu quy ghi nhà gái, cô dâu trước; thiệp thành hôn thì ngược lại.
const [first, second] = wedding.brideFirst ? [bride, groom] : [groom, bride]
const shortDate = `${pad(date.day)}.${pad(date.month)}.${date.year}`
// Chữ gọi chung khi link không kèm ?to=Tên — thiệp đăng công khai nên dùng cách gọi hợp mọi vai vế.
const defaultGuest = "Cả nhà"

/**
 * Tên khách mời trên link, theo thứ tự ưu tiên:
 *   ?g=…  — tên mã hoá Base64 URL (UTF-8) từ trang tạo link; chỉ gồm chữ, số, "-", "_" nên dán vào Messenger/Zalo không bị cắt
 *   ?to=… — link cũ: Base64 của tên đã encodeURIComponent, hoặc tên viết thẳng (?to=Cô+Hoa)
 */
function readGuest(params: URLSearchParams) {
  const token = params.get("g")?.trim()
  if (token) {
    try {
      const binary = atob(token.replace(/-/g, "+").replace(/_/g, "/"))
      return new TextDecoder("utf-8", { fatal: true }).decode(Uint8Array.from(binary, char => char.charCodeAt(0))).trim()
    } catch {
      // Chuỗi hỏng thì xem như không có tên.
    }
  }
  const raw = params.get("to")?.trim()
  if (!raw) return ""
  try {
    const decoded = decodeURIComponent(atob(raw))
    // So khớp lại để không nhầm tên thuần ASCII trông giống chuỗi Base64.
    if (btoa(encodeURIComponent(decoded)) === raw) return decoded
  } catch {
    // Không phải Base64: tên viết thẳng, URLSearchParams đã giải mã sẵn.
  }
  return raw
}

function Heading({ no, title, note }: { no: string; title: string; note?: string }) {
  return <header className="st-heading" data-reveal><span className="st-mono">{no}</span><h2>{title}</h2>{note && <p className="st-hand">{note}</p>}</header>
}

function Picture({ photo, alt }: { photo: Photo; alt: string }) {
  return <img src={getImagePath(photo.light)} alt={alt} loading="lazy" decoding="async" />
}

/* Dấu bưu điện: vòng chữ chạy quanh ngày cưới và mấy nét sóng huỷ tem. */
function Postmark() {
  return <svg className="st-postmark" viewBox="0 0 200 120" aria-hidden="true">
    <defs><path id="st-postmark-ring" d="M18,60 a42,42 0 1,1 84,0 a42,42 0 1,1 -84,0" /></defs>
    <circle cx="60" cy="60" r="55" /><circle cx="60" cy="60" r="29" />
    <text className="st-postmark-ring"><textPath href="#st-postmark-ring" textLength={258}>{`${first.full} & ${second.full} ·`.toUpperCase()}</textPath></text>
    <text className="st-postmark-day" x="60" y="59" textAnchor="middle">{pad(date.day)}.{pad(date.month)}</text>
    <text className="st-postmark-year" x="60" y="73" textAnchor="middle">{date.year}</text>
    {[38, 52, 66, 80].map(y => <path key={y} d={`M120,${y} q10,-9 20,0 t20,0 t20,0 t20,0`} />)}
  </svg>
}

/* Bìa: phong bì dán dấu sáp — chạm dấu sáp, nắp lật lên và lá thư trượt ra. */
function Cover({ guest, onStart, onOpen }: { guest: string; onStart: () => void; onOpen: () => void }) {
  const [open, setOpen] = useState(false)
  return <div className={`st-cover ${open ? "is-open" : ""}`} role="dialog" aria-modal="true" aria-label="Mở thiệp cưới" onAnimationEnd={event => { if (event.animationName === "st-cover-out") onOpen() }}>
    <p className="st-cover-to"><span className="st-label">Thân gửi</span><strong className="st-hand">{guest}</strong></p>
    <div className="st-env">
      <div className="st-env-letter"><span className="st-mono">Wedding invitation</span><b>{first.full}<em>&</em>{second.full}</b><span className="st-mono">{shortDate}</span></div>
      <div className="st-env-front" />
      <div className="st-env-flap" />
      <button autoFocus className="st-seal" onClick={() => { onStart(); setOpen(true) }} aria-label="Mở thiệp cưới">{wedding.monogram}</button>
    </div>
    <p className="st-cover-hint st-hand">chạm vào dấu sáp để mở thiệp</p>
  </div>
}

function Calendar() {
  const offset = (new Date(date.year, date.month - 1, 1).getDay() + 6) % 7
  const days = new Date(date.year, date.month, 0).getDate()
  const cells = [...Array(offset).fill(0), ...Array.from({ length: days }, (_, index) => index + 1)]
  return <div className="st-cal" data-reveal>
    <div className="st-cal-top" aria-hidden="true"><i /><i /></div>
    <p className="st-cal-month">Tháng {date.month} · {date.year}</p>
    <strong>{date.day}</strong>
    <p className="st-cal-week">{date.weekday} · {date.time}</p>
    <p className="st-cal-lunar">{wedding.lunar}</p>
    <div className="st-cal-grid" role="img" aria-label={`Lịch tháng ${date.month} năm ${date.year}, ngày cưới ${date.day}`}>
      {["T2", "T3", "T4", "T5", "T6", "T7", "CN"].map(label => <b key={label}>{label}</b>)}
      {cells.map((day, index) => <span key={index}>{day || ""}{day === date.day && <svg viewBox="0 0 54 48"><path pathLength={1} d="M9,26 C5,9 38,1 47,18 C54,36 20,47 10,32 C4,20 18,7 40,8" /></svg>}</span>)}
    </div>
  </div>
}

function Countdown() {
  const [left, setLeft] = useState<number | null>(null)
  useEffect(() => {
    const update = () => setLeft(Math.max(0, new Date(date.iso).getTime() - Date.now()))
    update()
    const timer = setInterval(update, 1000)
    return () => clearInterval(timer)
  }, [])
  const parts = left === null ? null : [Math.floor(left / 86400000), Math.floor(left / 3600000) % 24, Math.floor(left / 60000) % 60, Math.floor(left / 1000) % 60]
  return <div data-reveal>
    <div className="st-countdown" role="timer">
      {["ngày", "giờ", "phút", "giây"].map((label, index) => <div key={label}><strong>{parts ? (index ? pad(parts[index]) : parts[index]) : "--"}</strong><span>{label}</span></div>)}
    </div>
    {parts && <p className="st-hand st-countdown-note">{left ? `còn ${parts[0]} ngày nữa thôi!` : "hôm nay là ngày vui của chúng mình!"}</p>}
  </div>
}

/* Cuộn phim: tự lướt sang khung kế mỗi vài giây khi đang nằm trong màn hình; khách chạm vào là dừng hẳn để tự vuốt. */
function Film() {
  const strip = useRef<HTMLOListElement>(null)
  useEffect(() => {
    const node = strip.current
    if (!node || window.matchMedia("(prefers-reduced-motion: reduce)").matches) return
    let visible = false
    let timer: ReturnType<typeof setInterval> | undefined
    const step = () => {
      if (!visible || document.hidden) return
      const frame = node.firstElementChild?.clientWidth ?? 260
      const atEnd = node.scrollLeft + node.clientWidth >= node.scrollWidth - 4
      node.scrollTo({ left: atEnd ? 0 : node.scrollLeft + frame, behavior: "smooth" })
    }
    const observer = new IntersectionObserver(([entry]) => { visible = entry.isIntersecting }, { threshold: 0.6 })
    const stop = () => { clearInterval(timer); observer.disconnect() }
    observer.observe(node)
    timer = setInterval(step, 3800)
    node.addEventListener("pointerdown", stop, { once: true })
    node.addEventListener("wheel", stop, { once: true, passive: true })
    return () => { stop(); node.removeEventListener("pointerdown", stop); node.removeEventListener("wheel", stop) }
  }, [])
  return <ol ref={strip} className="st-film" data-reveal>{wedding.story.map((item, index) => <li key={item.title}>
    <div className="st-film-frame"><Picture photo={item.photo} alt={item.title} /><span className="st-mono">{pad(index + 1)}A</span></div>
    <p className="st-label">{item.when}</p><h3>{item.title}</h3><p>{item.text}</p>
  </li>)}</ol>
}

/* Album: một xấp ảnh polaroid — chạm tấm trên cùng để lật sang tấm kế. */
function Gallery() {
  const photos = wedding.gallery
  const [index, setIndex] = useState(0)
  const [leaving, setLeaving] = useState(false)
  const [opened, setOpened] = useState<number | null>(null)
  const lightbox = useRef<HTMLDialogElement>(null)
  const at = (offset: number) => (index + offset + photos.length) % photos.length
  const next = () => {
    if (leaving) return
    setLeaving(true)
    setTimeout(() => { setIndex(value => (value + 1) % photos.length); setLeaving(false) }, 430)
  }
  const open = (target: number) => { setOpened(target); lightbox.current?.showModal() }
  const step = (direction: number) => setOpened(value => value === null ? value : (value + direction + photos.length) % photos.length)
  return <>
    <div className="st-deck" data-reveal>
      {[3, 2, 1, 0].map(offset => <button key={photos[at(offset)].light} className={`st-deck-card is-p${offset} ${!offset && leaving ? "is-leaving" : ""}`} tabIndex={offset ? -1 : 0} aria-hidden={offset > 0} onClick={next} aria-label="Xem ảnh kế tiếp">
        <Picture photo={photos[at(offset)]} alt={`Ảnh cưới ${at(offset) + 1}`} />
        <span className="st-hand">tấm số {at(offset) + 1}</span>
      </button>)}
    </div>
    <div className="st-deck-bar" data-reveal>
      <button onClick={() => setIndex(at(-1))} aria-label="Ảnh trước"><ChevronLeft size={18} strokeWidth={1.5} /></button>
      <span className="st-mono">{pad(index + 1)} / {pad(photos.length)}</span>
      <button onClick={next} aria-label="Ảnh kế tiếp"><ChevronRight size={18} strokeWidth={1.5} /></button>
      <button onClick={() => open(index)} aria-label="Phóng lớn ảnh"><Maximize2 size={15} strokeWidth={1.5} /></button>
    </div>
    <div className="st-contact" data-reveal>{photos.map((item, target) => <button key={item.light} className={target === index ? "is-current" : ""} onClick={() => setIndex(target)} aria-label={`Chọn ảnh ${target + 1}`}><Picture photo={item} alt="" /></button>)}</div>
    <dialog ref={lightbox} className="st-lightbox" onClose={() => setOpened(null)} onClick={event => { if (event.target === lightbox.current) lightbox.current.close() }} onKeyDown={event => { if (event.key === "ArrowLeft") step(-1); if (event.key === "ArrowRight") step(1) }}>
      {opened !== null && <img src={getImagePath(photos[opened].full)} alt={`Ảnh cưới ${opened + 1}`} />}
      <button className="st-lightbox-close" onClick={() => lightbox.current?.close()} aria-label="Đóng ảnh"><X size={20} /></button>
      <button className="st-lightbox-arrow is-prev" onClick={() => step(-1)} aria-label="Ảnh trước"><ChevronLeft size={22} /></button>
      <button className="st-lightbox-arrow is-next" onClick={() => step(1)} aria-label="Ảnh tiếp theo"><ChevronRight size={22} /></button>
    </dialog>
  </>
}

/* Mừng cưới: hai chiếc phong bì, chạm để mở. */
function Gifts() {
  const [open, setOpen] = useState<number | null>(null)
  const [copied, setCopied] = useState(false)
  const gift = open === null ? null : wedding.gifts[open]
  const copy = (value: string) => navigator.clipboard?.writeText(value).then(() => { setCopied(true); setTimeout(() => setCopied(false), 1800) })
  return <div data-reveal>
    <div className="st-gifts">{wedding.gifts.map((item, index) => <button key={item.side} className={open === index ? "is-open" : ""} aria-expanded={open === index} onClick={() => setOpen(open === index ? null : index)}>
      <span className="st-gift-env" aria-hidden="true"><i /><Heart size={13} fill="currentColor" strokeWidth={0} /></span>
      <b className="st-hand">{item.side}</b>
    </button>)}</div>
    {gift && <div className="st-gift-card" key={open}>
      {gift.number || gift.qr ? <>
        {gift.qr && <img src={getImagePath(gift.qr)} alt="Mã QR mừng cưới" />}
        {gift.number ? <>
          <p>{gift.bank}</p><strong>{gift.number}</strong><p>{gift.holder}</p>
          <button className="st-button" onClick={() => copy(gift.number)}>{copied ? <><Check size={15} /> Đã sao chép</> : <><Copy size={15} strokeWidth={1.5} /> Sao chép số tài khoản</>}</button>
        </> : <p>{gift.note || "Quét mã QR để chuyển khoản"}</p>}
      </> : <p className="st-hand">Thông tin mừng cưới sẽ được cập nhật sau nhé.</p>}
    </div>}
  </div>
}

export function CreamInvitation() {
  const [opened, setOpened] = useState(false)
  const [guest, setGuest] = useState(defaultGuest)
  const [playing, setPlaying] = useState(false)
  const root = useRef<HTMLElement>(null)
  const audio = useRef<HTMLAudioElement>(null)

  useEffect(() => {
    const name = readGuest(new URLSearchParams(window.location.search))
    if (name) setGuest(name.slice(0, 60))
  }, [])

  // Tải lại trang thì luôn bắt đầu từ đầu thiệp, không để trình duyệt nhớ vị trí cuộn cũ.
  useEffect(() => {
    history.scrollRestoration = "manual"
    window.scrollTo(0, 0)
  }, [])

  useEffect(() => {
    document.documentElement.style.overflow = opened ? "" : "hidden"
    return () => { document.documentElement.style.overflow = "" }
  }, [opened])

  useEffect(() => {
    const node = root.current
    if (!node || !opened) return
    node.classList.add("is-animated")
    const observer = new IntersectionObserver(entries => entries.forEach(entry => {
      if (entry.isIntersecting) { entry.target.classList.add("is-in"); observer.unobserve(entry.target) }
    }), { threshold: 0.12, rootMargin: "0px 0px -6% 0px" })
    node.querySelectorAll("[data-reveal]").forEach(element => observer.observe(element))
    return () => observer.disconnect()
  }, [opened])

  useEffect(() => {
    if (!audio.current) return
    if (playing) audio.current.play().catch(() => setPlaying(false))
    else audio.current.pause()
  }, [playing])

  return <main ref={root} className="st">
    <audio ref={audio} loop preload="none" src={getImagePath(wedding.music)} />
    {!opened && <Cover guest={guest} onStart={() => { audio.current?.play().then(() => setPlaying(true)).catch(() => {}) }} onOpen={() => setOpened(true)} />}

    <div className="st-desk">
      <section className="st-hero">
        <p className="st-mono" data-reveal>Wedding invitation · No. {pad(date.day)}{pad(date.month)}{String(date.year).slice(2)}</p>
        <h1 data-reveal><span>{first.full}</span><em>&</em><span>{second.full}</span></h1>
        <p className="st-hand st-hero-note" data-reveal>chúng mình cưới!</p>
        <div className="st-stamp-wrap" data-reveal>
          <div className="st-shadow"><div className="st-stamp">
            <img src={getImagePath(wedding.heroPhoto.light)} alt={`${first.short} và ${second.short} trong ngày chụp ảnh cưới`} />
            <p><span className="st-hand">save the date</span><span className="st-mono">{shortDate}</span></p>
          </div></div>
          <Postmark />
        </div>
        <p className="st-hero-line" data-reveal>{date.weekday}, {date.day} tháng {date.month}, {date.year} · {date.time}</p>
        <p className="st-hero-place" data-reveal>{venue.name} · {venue.address}</p>
      </section>

      <section>
        <Heading no="01" title="Một lá thư tay" />
        <article className="st-letter tl" data-reveal>
          <span className="st-tape" aria-hidden="true" />
          <p>Thân gửi <b>{guest}</b>,</p>
          {wedding.invitation.map(text => <p key={text}>{text}</p>)}
          <p className="st-letter-sign">Thương mến,<br />{first.short} & {second.short}</p>
        </article>
      </section>

      <section>
        <Heading no="02" title="Vé mời dự lễ" note="giữ kỹ giúp tụi mình nhé" />
        <div className="st-shadow tr" data-reveal><div className="st-ticket">
          <div className="st-ticket-main">
            <p className="st-mono">Admit one · Wedding day</p>
            <h3>{first.full} <em>&</em> {second.full}</h3>
            <dl>
              <div><dt>Ngày</dt><dd>{shortDate}</dd></div>
              <div><dt>Thứ</dt><dd>{date.weekday}</dd></div>
              {wedding.ceremonies.map(item => <div key={item.title}><dt>{item.title}</dt><dd>{item.time}</dd></div>)}
              <div className="is-wide"><dt>Địa điểm</dt><dd>{venue.name}<small>{venue.address}</small></dd></div>
            </dl>
            <p className="st-ticket-lunar">({wedding.lunar})</p>
          </div>
          <div className="st-ticket-stub"><div><span>Khách mời</span><b className="st-hand">{guest}</b></div><i className="st-barcode" aria-hidden="true" /></div>
        </div></div>
      </section>

      <section>
        <Heading no="03" title="Hai nhân vật chính" />
        <div className="st-polaroids">
          {[first, second].map((person, index) => <figure key={person.full} className={`st-polaroid ${index ? "tr" : "tl"}`} data-reveal><span className="st-tape" aria-hidden="true" /><Picture photo={person.photo} alt={`${person === groom ? "Chú rể" : "Cô dâu"} ${person.full}`} /><figcaption><b className="st-hand">{person.short}</b><span>{person.role}</span></figcaption></figure>)}
        </div>
        <div className="st-families" data-reveal>
          <p>Trân trọng báo tin <span className="st-event-highlight">{wedding.event.toLowerCase()}</span> của con chúng tôi</p>
          <div>{wedding.families.map(family => <div key={family.side}><span>{family.side}</span>{family.parents.map(parent => <strong key={parent}>{parent}</strong>)}<small>{family.address}</small></div>)}</div>
        </div>
      </section>

      <section>
        <Heading no="04" title="Cuộn phim của hai đứa" note="tự lướt · vuốt ngang để xem tiếp →" />
        <Film />
      </section>

      <section>
        <Heading no="05" title="Chương trình" />
        <div className="st-shadow tr" data-reveal><div className="st-receipt">
          <p className="st-mono">Programme · {shortDate}</p>
          <ol>{wedding.schedule.map(item => <li className={item.endTime ? "st-schedule-range" : undefined} key={item.title}>
            <time>{item.time}</time><span>{item.title}</span>{item.endTime && <time className="st-schedule-end">{item.endTime}</time>}
          </li>)}</ol>
          <p className="st-hand">hẹn gặp cả nhà nhé ♡</p>
          <i className="st-barcode" aria-hidden="true" />
        </div></div>
      </section>

      <section>
        <Heading no="06" title="Khoanh ngày lại nào" />
        <Calendar />
        <Countdown />
      </section>

      <section>
        <Heading no="07" title="Đường đến ngày vui" />
        <div className="st-map tl" data-reveal>
          <span className="st-tape" aria-hidden="true" />
          <iframe title="Bản đồ địa điểm cưới" src={venue.mapEmbed} loading="lazy" referrerPolicy="no-referrer-when-downgrade" />
          <div className="st-map-tag"><MapPin size={18} strokeWidth={1.4} /><div><b>{venue.name}</b><span>{venue.address}</span></div></div>
        </div>
        <div className="st-actions" data-reveal>
          <a className="st-button" href={venue.mapLink} target="_blank" rel="noopener noreferrer"><MapPin size={15} strokeWidth={1.5} /> Mở Google Map</a>
        </div>
      </section>

      <section>
        <Heading no="08" title="Xấp ảnh cưới" note="chạm vào ảnh để lật" />
        <Gallery />
      </section>

      <section>
        <Heading no="09" title="Phong bì mừng cưới" note="chạm để mở" />
        <Gifts />
      </section>

      <section className="st-closing">
        <p className="st-hand st-thanks" data-reveal>Cảm ơn</p>
        <p data-reveal>{wedding.thanks}</p>
        <div data-reveal><Postmark /></div>
        <p className="st-label" data-reveal>{first.short} + {second.short} · {shortDate}</p>
      </section>
    </div>

    <button className={`st-music ${playing ? "is-playing" : ""}`} onClick={() => setPlaying(value => !value)} aria-label={playing ? "Tắt nhạc" : "Bật nhạc"} aria-pressed={playing}><Music size={17} strokeWidth={1.5} /></button>
  </main>
}

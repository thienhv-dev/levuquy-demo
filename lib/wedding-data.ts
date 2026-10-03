/**
 * Toàn bộ nội dung thiệp nằm ở đây — đổi tên, ngày, địa điểm, ảnh... chỉ cần sửa file này.
 * Ảnh đặt trong public/thiep (bản `_s` là ảnh thu nhỏ cho lưới album).
 */
const photo = (name: string) => ({ src: `/thiep/${name}.jpg`, thumb: `/thiep/${name}_s.jpg` })

export const wedding = {
  groom: { short: "Văn Thiện", full: "Hồ Văn Thiện", role: "Chú rể", photo: photo("ROM_6984") },
  bride: { short: "Thanh Tuyền", full: "Trần Thị Thanh Tuyền", role: "Cô dâu", photo: photo("ROM_6615") },
  monogram: "T & T",

  // Ngày cưới — `iso` dùng cho đếm ngược, các trường còn lại dùng để hiển thị.
  date: { iso: "2026-10-25T11:00:00+07:00", day: 25, month: 10, year: 2026, weekday: "Chủ nhật", time: "11:00" },
  lunar: "Nhằm ngày 16 tháng 9 năm Bính Ngọ",

  venue: {
    name: "Nhà hàng tiệc cưới Quảng Đại 2",
    address: "Số 190, Đường 30/4, Phường Hoà Cường, TP. Đà Nẵng",
    mapEmbed: "https://www.google.com/maps/embed?pb=!1m18!1m12!1m3!1d3834.4833867911398!2d108.21277117550467!3d16.0403865846349!2m3!1f0!2f0!3f0!3m2!1i1024!2i768!4f13.1!3m3!1m2!1s0x314219d8267c8721%3A0xeefec422af38796c!2zTmjDoCBow6BuZyB0aeG7h2MgY8aw4bubaSBRdeG6o25nIMSQ4bqhaSAy!5e0!3m2!1sen!2s!4v1760424500484!5m2!1sen!2s",
    mapLink: "https://maps.app.goo.gl/RmsV61ViRfQJqoud8",
  },

  heroPhoto: photo("DII_4575"),
  invitation: [
    "Chúng mình đã gặp được người khiến mỗi ngày trở nên dịu dàng hơn. Từ những điều bình dị, yêu thương lớn lên và trở thành lời hẹn ước.",
    "Nay chúng mình cùng nhau bước vào một hành trình mới. Rất mong được đón bạn đến chung vui, chứng kiến và gửi lời chúc phúc cho ngày trọng đại.",
  ],

  ceremonies: [
    { title: "Lễ thành hôn", time: "09:30" },
    { title: "Tiệc cưới", time: "11:00" },
  ],

  families: [
    { side: "Nhà trai", parents: ["Ông Hồ Cam", "Bà Nguyễn Thị Trang"], address: "Số 50, Đường Phạm Cự Lượng, Phường An Hải, TP. Đà Nẵng" },
    { side: "Nhà gái", parents: ["Bà Lê Thị Thu Hà"], address: "Tổ 5, Thôn Thái Đông, Xã Thăng Trường, TP. Đà Nẵng" },
  ],

  story: [
    { when: "Save the date", title: "Vẫn gặp anh", text: "Đi một vòng lớn rồi vẫn gặp anh, từ đó, thế gian bỗng hóa dịu dàng.", photo: photo("DII_4512") },
    { when: "Trọn vẹn", title: "Mãi một đời", text: "Tên của anh chỉ vỏn vẹn vài chữ, dù có rời rạc, chẳng thành câu, nhưng trong tim em luôn ấp ủ, chỉ nguyện bên nhau mãi một đời.", photo: photo("DII_4110") },
    { when: "Sau tất cả", title: "Mỗi phút giây", text: "Không cần một ngày đặc biệt nào cả, vì anh yêu em mỗi phút giây. Tình yêu này chẳng đợi một dịp để bày tỏ, mà luôn hiện hữu mỗi ngày.", photo: photo("DII_3899") },
  ],

  schedule: [
    { time: "09:00", title: "Chào mừng đến với ngôi nhà của chúng tôi" },
    { time: "09:15", title: "Đón khách & ổn định chỗ ngồi" },
    { time: "09:30", title: "Lễ thành hôn" },
    { time: "11:00", title: "Tiệc cưới & giao lưu" },
  ],

  thanks: "Cảm ơn bạn đã dành thời gian ghé thăm trang web của chúng tôi. Sự hiện diện của bạn trong ngày trọng đại này sẽ là món quà ý nghĩa nhất với chúng tôi.",

  gallery: ["DII_4575", "DII_4140", "DII_4452", "DII_3638", "DII_4512", "DII_3457", "DII_3899", "DII_4110", "DII_4933", "ROM_6639", "ROM_6818", "ROM_7360", "ROM_6615", "ROM_6984", "ROM_7527"].map(photo),

  // Mừng cưới — `qr` là ảnh trong public (đang dùng mã mẫu, thay bằng mã thật khi có), `note` là dòng chú thích dưới mã.
  gifts: [
    { side: "Mừng cưới", bank: "", number: "", holder: "", qr: "/thiep/qr-mock.svg", note: "Mã QR mẫu — thông tin chuyển khoản sẽ được cập nhật sau." },
  ],

  music: "/ido.mp3",
}

export type Photo = ReturnType<typeof photo>

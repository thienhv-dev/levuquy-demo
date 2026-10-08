/**
 * Toàn bộ nội dung thiệp nằm ở đây — đổi tên, ngày, địa điểm, ảnh... chỉ cần sửa file này.
 * Ảnh đặt trong public/thiep: `TÊN_s.jpg` là ảnh nhẹ hiển thị trên thiệp, `TÊN.jpg` là ảnh gốc mở khi phóng lớn.
 */
const photo = (name: string) => ({ light: `/thiep/${name}_s.jpg`, full: `/thiep/${name}.jpg` })

export const wedding = {
  // `short` là tên gọi thân mật (chữ ký, lời đếm ngược), `full` là họ tên in trên thiệp.
  groom: { short: "Văn Đủ", full: "Bùi Văn Đủ", role: "Chú rể", photo: photo("LYN06714") },
  bride: { short: "Thị Tài", full: "Nguyễn Thị Tài", role: "Cô dâu", photo: photo("LYN06272") },
  monogram: "T & Đ",
  event: "Lễ vu quy",
  // Lễ vu quy: cô dâu và nhà gái đứng trước. Đặt false cho thiệp thành hôn bên nhà trai.
  brideFirst: true,

  // Ngày cưới — `iso` dùng cho đếm ngược, các trường còn lại dùng để hiển thị.
  date: { iso: "2026-10-25T11:00:00+07:00", day: 25, month: 10, year: 2026, weekday: "Chủ nhật", time: "11:00" },
  lunar: "Nhằm ngày 16 tháng 9 năm Bính Ngọ",

  // Lễ vu quy tại tư gia nhà gái. Bản đồ đang tìm theo tên thôn — thay `mapEmbed`/`mapLink` bằng link ghim đúng nhà khi có.
  venue: {
    name: "Tư Gia",
    address: "Thôn Đông - An Hải - Đặc khu Lý Sơn, Tỉnh Quảng Ngãi",
    mapEmbed: "https://maps.google.com/maps?q=Th%C3%B4n%20%C4%90%C3%B4ng%2C%20An%20H%E1%BA%A3i%2C%20L%C3%BD%20S%C6%A1n%2C%20Qu%E1%BA%A3ng%20Ng%C3%A3i&z=15&output=embed",
    mapLink: "https://www.google.com/maps/search/?api=1&query=Th%C3%B4n%20%C4%90%C3%B4ng%2C%20An%20H%E1%BA%A3i%2C%20L%C3%BD%20S%C6%A1n%2C%20Qu%E1%BA%A3ng%20Ng%C3%A3i",
  },

  heroPhoto: photo("LYN07000"),
  invitation: [
    "Chúng mình đã gặp được người khiến mỗi ngày trở nên dịu dàng hơn. Từ những điều bình dị, yêu thương lớn lên và trở thành lời hẹn ước.",
    "Trân trọng kính mời cả nhà đến dự tiệc chung vui cùng gia đình chúng mình tại tư gia. Sự hiện diện của cả nhà là niềm vinh hạnh cho gia đình chúng mình.",
  ],

  ceremonies: [
    { title: "Lễ vu quy", time: "09:30" },
    { title: "Tiệc chung vui", time: "11:00" },
  ],

  families: [
    { side: "Nhà gái", parents: ["Ông Nguyễn Văn Thành", "Bà Bùi Thị Hoa"], address: "Thôn Đông - An Hải, Đặc khu Lý Sơn - Tỉnh Quảng Ngãi" },
    { side: "Nhà trai", parents: ["Ông Bùi Chưa", "Bà Dương Thị Thanh Tâm"], address: "Thôn Đông - An Hải, Đặc khu Lý Sơn - Tỉnh Quảng Ngãi" },
  ],

  // Cuộn phim: bộ ảnh phông đỏ, mỗi khung một câu lục bát (xuống dòng bằng \n).
  story: [
    { when: "Áo cưới", title: "Ngày em làm cô dâu", text: "Em về khoác áo cô dâu,\nBao nhiêu thương nhớ bắt đầu từ đây.", photo: photo("LYN06763") },
    { when: "Nắm tay", title: "Đường xa cũng gần", text: "Tay anh nắm lấy tay em,\nĐường xa mấy cũng êm đềm mà đi.", photo: photo("LYN07049") },
    { when: "Ánh mắt", title: "Chẳng cần nói", text: "Nhìn nhau chẳng nói nên lời,\nMà nghe trong mắt một trời yêu thương.", photo: photo("LYN06954") },
    { when: "Nụ cười", title: "Thương từ đó", text: "Thương em từ một nụ cười,\nĐể rồi thương cả một đời về sau.", photo: photo("LYN06920") },
    { when: "Hôm nay", title: "Về chung một nhà", text: "Hôm nay về một nhà chung,\nTrăm năm xin được đi cùng với nhau.", photo: photo("LYN07000") },
  ],

  schedule: [
    { time: "09:00", title: "Chào mừng đến với ngôi nhà của chúng tôi" },
    { time: "09:15", title: "Đón khách & ổn định chỗ ngồi" },
    { time: "09:30", title: "Lễ vu quy" },
    { time: "11:00", title: "Tiệc cưới & giao lưu" },
  ],

  thanks: "Sự hiện diện của Quý Khách là niềm vinh hạnh cho gia đình chúng tôi. Rất hân hạnh được đón tiếp!",

  gallery: ["LYN06653", "LYN06530", "LYN06301", "LYN06615", "LYN06272", "LYN06278", "LYN06236", "LYN06714", "LYN06920", "LYN06954", "LYN07049", "LYN06763", "LYN07000"].map(photo),

  // Mừng cưới — `qr` là ảnh trong public (đang dùng mã mẫu, thay bằng mã thật khi có), `note` là dòng chú thích dưới mã.
  gifts: [
    { side: "Mừng cưới", bank: "", number: "", holder: "", qr: "/thiep/qr-mock.svg", note: "Mã QR mẫu — thông tin chuyển khoản sẽ được cập nhật sau." },
  ],

  music: "/ido.mp3",
}

export type Photo = ReturnType<typeof photo>

# SkillUp English

Trang web giới thiệu phần mềm học tiếng Anh trực tuyến, được xây dựng dựa trên bố cục Landwind và rebrand thành SkillUp English.

## Công nghệ

- HTML
- Tailwind CSS v4
- JavaScript cơ bản
- GitHub Pages

## Các trang

- `index.html`: trang giới thiệu chính
- `pricing.html`: bảng giá, bảng so sánh tính năng và FAQ thanh toán
- `contact.html`: form liên hệ, thông tin hỗ trợ và quy trình sau khi gửi

## Chức năng Buổi 3

- Responsive theo hướng mobile-first
- Kiểm tra tại 360px, 768px, 1024px và 1440px
- Không có horizontal scroll ở 360px
- Dark mode bằng design token
- 10 component trong `@layer components`
- Bảng so sánh cuộn ngang trên mobile
- Form liên hệ accessible với 7 trường
- Navbar mobile có vị trí cho hamburger
- Ba trang sử dụng chung Navbar, Footer và component

## Kiểm tra dark mode

Dark mode được kiểm tra bằng cách thêm tạm class `dark` vào thẻ `html` trong DevTools:

```html
<html lang="vi" class="dark">
```

Buổi 3 chưa sử dụng JavaScript để bật/tắt dark mode. Chức năng này sẽ được thực hiện ở Buổi 4.

## Form accessible

Form liên hệ có:

- `label for` liên kết với `input id`
- `autocomplete`
- `pattern` cho số điện thoại
- `aria-describedby`
- `role="alert"` cho vùng lỗi
- Focus rõ ràng
- Không dùng placeholder thay cho label

## Responsive

Các breakpoint đã kiểm tra:

- 360px
- 768px
- 1024px
- 1440px

Bảng so sánh sử dụng `overflow-x-auto` và `min-w-[720px]` để giữ khả năng đọc trên mobile.

## Figma

[Landwind - Tailwind CSS Landing Page](https://www.figma.com/design/h9lWb63nat97pWwZpzQ3DU/Landwind---Tailwind-CSS-Landing-Page--Community---Copy-?node-id=1-16010)

## GitHub Pages

URL dự kiến:

https://lanhuong67.github.io/tkw_2354050048_huong/

URL này sẽ được kiểm tra lại sau khi bật GitHub Pages.

## Pull Request

- [Pull Request Buổi 2](https://github.com/lanhuong67/tkw_2354050048_huong/pull/1)

## So sánh Figma và website

Ảnh so sánh Figma và website sẽ được bổ sung sau khi hoàn thành bản rebrand trên Figma.

## Sẽ làm lại nếu có thêm thời gian

Dự án sử dụng HTML tĩnh nên Navbar và Footer phải được chép lại ở cả ba trang. Nếu phát triển bằng framework hoặc template engine, các phần này nên được tách thành component dùng chung để tránh lặp code.

## Tương tác tự chọn Buổi 4

Nút sao chép mã khuyến mãi giúp người dùng lấy mã `SKILLUP20` mà không cần ghi nhớ hoặc nhập lại.
Sau khi sao chép, nút và vùng trạng thái xác nhận kết quả để người dùng biết thao tác đã thành công.
Vùng thông báo dùng `role="status"` và `aria-live="polite"`, nên người dùng bàn phím và trình đọc màn hình đều nhận được phản hồi.

## Chức năng Buổi 4

- Menu mobile cập nhật `aria-expanded`, đóng bằng phím `Escape`, bấm bên ngoài hoặc chuyển sang màn hình desktop.
- Navbar thêm bóng khi cuộn bằng `IntersectionObserver` và có nút lên đầu trang sau 400px.
- Accordion FAQ dùng event delegation và mỗi lúc chỉ mở một câu hỏi.
- Dark mode ghi nhớ bằng `localStorage`, mặc định theo `prefers-color-scheme`.
- Công tắc giá tháng/năm dùng `role="switch"`, `aria-checked` và `Intl.NumberFormat("vi-VN")`.
- Slider cảm nhận tự viết, có `inert` cho slide ẩn và chấm chỉ dẫn sinh bằng JavaScript.
- Hiệu ứng lộ dần dùng `IntersectionObserver` và tôn trọng `prefers-reduced-motion`.

## Kiến trúc JavaScript

- `js/main.js`: điểm khởi động duy nhất, chỉ import và gọi các hàm `init`.
- `js/nav.js`: menu mobile, trạng thái navbar và nút lên đầu trang.
- `js/theme.js`: công tắc dark mode và lưu lựa chọn của người dùng.
- `js/faq.js`: accordion FAQ và điều hướng giữa câu hỏi.
- `js/pricing.js`: công tắc giá tháng/năm và định dạng tiền Việt Nam.
- `js/slider.js`: slider cảm nhận, tự chạy và quản lý slide ẩn.
- `js/reveal.js`: hiệu ứng lộ dần khi phần tử đi vào màn hình.
- `js/copy.js`: sao chép mã khuyến mãi và thông báo kết quả.

Mỗi module tự kiểm tra phần tử mình phụ trách trước khi khởi tạo, vì vậy một file `main.js` được dùng chung an toàn cho cả ba trang.

## Sử dụng bằng bàn phím

- Nhấn `Tab` để di chuyển tới các liên kết, công tắc và nút điều khiển.
- Nhấn `Escape` để đóng menu mobile và đưa focus về nút mở menu.
- Trong FAQ, dùng `Arrow Up`, `Arrow Down`, `Home` và `End` để chuyển giữa các câu hỏi.
- Trong slider, dùng `Arrow Left`, `Arrow Right`, `Home` và `End` để chuyển cảm nhận.
- Slide không hiển thị được đặt `inert`, nên phím `Tab` không đi vào nội dung đang ẩn.

## Chống nháy trắng khi tải dark mode

Script xác định giao diện sáng/tối được đặt inline trong `<head>` để chạy trước lần trình duyệt vẽ trang đầu tiên.
Lựa chọn đã lưu trong `localStorage` được ưu tiên hơn cài đặt `prefers-color-scheme` của hệ điều hành.
Đây là ngoại lệ duy nhất của quy tắc không viết JavaScript trực tiếp trong HTML; các tương tác còn lại đều nằm trong module.

## Chạy dự án

```bash
npm install
npm run dev
```

Build CSS để triển khai:

```bash
npm run build
```

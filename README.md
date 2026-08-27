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

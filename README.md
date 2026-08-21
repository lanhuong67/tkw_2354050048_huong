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
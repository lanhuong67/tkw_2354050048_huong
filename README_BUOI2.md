# Báo cáo Buổi 2: Phân tích Layout với Tailwind CSS

Khi đọc lại bài buổi 1, phần bên phải Hero đang sử dụng một bảng
lộ trình học, trong khi Figma sử dụng một hình minh họa lớn.

Cách sửa:

- Xóa bảng lộ trình khỏi Hero.
- Thay bằng hình minh họa học tiếng Anh trực tuyến.
- Đặt cột ảnh rộng `448px`.
- Đặt ảnh tối đa `532 × 416px`.
- Dùng `gap-24`, tương ứng `96px`, giữa hai cột.
- Hero dùng `py-16`, tương ứng `64px`, theo số đo Figma.

## Bảng dự đoán và kiểm chứng Flexbox/Grid

| Frame | Lựa chọn | Class dự đoán | Class sau kiểm chứng | Lý do |
| :--- | :--- | :--- | :--- | :--- |
| Navbar | Flexbox | `flex items-center justify-between gap-8` | `flex items-center justify-between gap-8` | Logo, menu và nút nằm trên cùng một hàng |
| Hàng nút Hero | Flexbox | `flex flex-wrap gap-4` | `flex flex-wrap gap-4` | Nút có chiều rộng theo nội dung và có thể xuống dòng |
| Hero hai cột | Grid | `grid items-center gap-12 lg:grid-cols-2` | `grid items-center lg:grid-cols-[1fr_28rem] lg:gap-24` | Nội dung và ảnh cần thẳng thành hai cột; cột ảnh có chiều rộng cố định |
| Dải logo | Flex-wrap | `flex flex-wrap items-center justify-center gap-x-12 gap-y-6` | `flex flex-wrap items-center justify-center gap-x-12 gap-y-6 lg:justify-between` | Logo dài ngắn khác nhau và cần tự xuống dòng |
| Khu vực tính năng | Grid | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` | `grid items-center gap-16 lg:grid-cols-2` | Sau khi kiểm chứng Figma, tính năng gồm hai hàng xen kẽ nội dung và minh họa |
| Bảng giá | Grid + Flexbox | `grid items-stretch gap-6 lg:grid-cols-3` | Ngoài: `grid items-stretch gap-6 lg:grid-cols-3`; trong: `flex h-full flex-col`; nút: `mt-auto` | Grid giúp ba ô cao bằng nhau; Flexbox đẩy các nút xuống đáy |

## Quy tắc lựa chọn layout

- Flexbox được sử dụng cho bố cục một chiều như Navbar, hàng nút,
  danh sách liên kết và nội dung bên trong thẻ.
- Grid được sử dụng khi các phần tử cần thẳng hàng theo cả hàng và cột.
- `flex-wrap` được sử dụng cho các phần tử dài ngắn khác nhau và cần
  tự xuống dòng.
- Khoảng cách giữa các phần tử sử dụng `gap`, không đặt margin riêng
  lên từng phần tử con.
- `absolute` chỉ dùng cho badge, skip-link hoặc thành phần trang trí,
  không dùng để xây dựng bố cục chính.
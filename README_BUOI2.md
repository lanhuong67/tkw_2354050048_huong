# Báo cáo Buổi 2: Phân tích Layout với Tailwind CSS

Dưới đây là bảng phân tích lựa chọn Flexbox/Grid cho các thành phần (Frame) trong giao diện:

| Frame | Chọn | Class Tailwind dự đoán | Lý do |
| :--- | :--- | :--- | :--- |
| **Navbar** | Flex | `flex items-center justify-between gap-8` | Các phần tử nằm trên một hàng |
| **Hàng nút Hero** | Flex | `flex flex-wrap gap-4` | Nút có chiều rộng theo nội dung |
| **Hero hai cột** | Grid | `grid items-center gap-12 lg:grid-cols-2` | Nội dung và ảnh cần thẳng thành hai cột |
| **Dải logo** | Flex-wrap | `flex flex-wrap items-center justify-center gap-x-12 gap-y-6` | Logo dài ngắn khác nhau và có thể xuống dòng |
| **Lưới tính năng** | Grid | `grid gap-6 sm:grid-cols-2 lg:grid-cols-3` | Các thẻ cần thẳng hàng dọc và ngang |
| **Bảng giá** | Grid + Flex | `grid items-stretch gap-6 lg:grid-cols-3` | Ba thẻ cần cao bằng nhau |

## Quy tắc lựa chọn

- Flexbox dùng cho bố cục một chiều.
- Grid dùng khi các phần tử cần thẳng hàng theo cả hàng và cột.
- Flex-wrap dùng cho danh sách dài ngắn khác nhau và cần tự xuống dòng.
- Khoảng cách giữa các phần tử dùng gap, không đặt margin riêng lên từng phần tử con.

Dải logo sử dụng Flexbox vì các logo có độ dài khác nhau và chỉ cần
xếp theo một hàng. `flex-wrap` cho phép các logo tự xuống dòng khi
không đủ chiều rộng. Khoảng cách được tạo bằng `gap-x-12 gap-y-6`,
không đặt margin riêng cho từng logo.
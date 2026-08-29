function messageFor(field) {
  const validity = field.validity;
  if (validity.valueMissing) {
    return field.type === "checkbox"
      ? "Vui lòng xác nhận đồng ý để tiếp tục."
      : "Vui lòng điền mục này.";
  }
  if (validity.typeMismatch) {
    return "Email chưa đúng dạng, ví dụ: chuvua@gmail.com";
  }
  if (validity.patternMismatch) {
    return "Nhập 10 chữ số, bắt đầu bằng 0. Ví dụ: 0912345678";
  }
  if (validity.tooShort) {
    return `Vui lòng nhập ít nhất ${field.minLength} ký tự.`;
  }
  if (validity.customError) {
    return field.validationMessage;
  }
  return "Thông tin chưa hợp lệ. Vui lòng kiểm tra lại.";
}

export function initContactForm() {
  const form = document.querySelector("form[aria-labelledby='form-title']");
  if (!form) return;

  form.noValidate = true;
  const fields = [...form.querySelectorAll("input, select, textarea")];
  const summary = form.querySelector("[data-form-summary]");

  function updateCustomValidity(field) {
    field.setCustomValidity("");
    if (field.minLength > 0 && field.value.length > 0 && field.value.length < field.minLength) {
      field.setCustomValidity(`Vui lòng nhập ít nhất ${field.minLength} ký tự.`);
    }
  }

  function showError(field) {
    updateCustomValidity(field);
    const errorBox = document.getElementById(`${field.id}-error`);
    const invalid = !field.checkValidity();
    field.setAttribute("aria-invalid", String(invalid));
    if (errorBox) errorBox.textContent = invalid ? messageFor(field) : "";
    return invalid;
  }

  fields.forEach((field) => {
    field.addEventListener("blur", () => showError(field));
    field.addEventListener("input", () => {
      if (field.getAttribute("aria-invalid") === "true") showError(field);
    });
    field.addEventListener("change", () => {
      if (field.getAttribute("aria-invalid") === "true") showError(field);
    });
  });

  form.addEventListener("submit", (event) => {
    event.preventDefault();
    const invalidFields = fields.filter(showError);

    if (invalidFields.length > 0) {
      summary.className = "rounded-lg bg-action-50 p-4 font-medium text-action-500";
      summary.textContent = `Có ${invalidFields.length} mục cần kiểm tra. Vui lòng sửa các lỗi bên dưới.`;
      summary.hidden = false;
      invalidFields[0].focus();
      return;
    }

    summary.className = "rounded-lg bg-success-50 p-4 font-medium text-ink";
    summary.textContent = "Gửi yêu cầu thành công! SkillUp English sẽ sớm liên hệ với bạn.";
    summary.hidden = false;
    form.reset();
    fields.forEach((field) => {
      field.setCustomValidity("");
      field.removeAttribute("aria-invalid");
    });
  });
}

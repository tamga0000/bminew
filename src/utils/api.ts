export const submitDataToGoogleSheets = async (data: SubmitDataParams): Promise<boolean> => {
  try {
    const formUrl = "https://docs.google.com/forms/d/e/1VUQLTqRBR5zahCKoyOP0NiqJlfz61_yLASKFaUrbBJg/formResponse";

    const formData = new FormData();
    formData.append("entry.1655691814", data.fullName);         // Họ tên
    formData.append("entry.943451764", data.age.toString());   // Độ tuổi
    formData.append("entry.1898986021", data.phoneNumber);      // Số điện thoại
    formData.append("entry.946703297", data.weight.toString()); // Cân nặng
    formData.append("entry.1856923099", data.height.toString()); // Chiều cao
    formData.append("entry.952692534", data.activityLevel);     // Mức độ vận động
    formData.append("entry.1979757439", data.bmi.toString());   // BMI
    formData.append("entry.1844499791", data.category);         // Phân loại
    formData.append("entry.167719965", data.unit);               // Đơn vị
    // Kiểm tra dữ liệu trước khi gửi
    console.log("🧾 Form data gửi:", Object.fromEntries(formData.entries()));

    await fetch(formUrl, {
      method: "POST",
      mode: "no-cors",
      body: formData
    });

    console.log("✅ Gửi Google Form thành công!");
    return true;
  } catch (error) {
    console.error("❌ Gửi Google Form lỗi:", error);
    return false;
  }
};

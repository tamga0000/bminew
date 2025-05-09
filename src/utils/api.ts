interface SubmitDataParams {
  fullName: string;
  phoneNumber: string;
  weight: number;
  height: number;
  bmi: number;
  category: string;
  unit: string;
}

export const submitDataToGoogleSheets = async (data: SubmitDataParams): Promise<boolean> => {
  try {
    console.log('Đang gửi dữ liệu đến Google Sheets...', data);
    
    const apiUrl = "https://script.google.com/macros/s/AKfycbxOoOsXckR0ph_VtitYs0vj7Hwt0C_Ai4VmZkmB0VYNAC2MrAupedRvdJ8-VBMdUQmzQQ/exec";
    
    const formData = new FormData();
    Object.entries(data).forEach(([key, value]) => {
      formData.append(key, value.toString());
    });
    
    console.log('FormData được tạo:', Object.fromEntries(formData.entries()));
    
    const response = await fetch(apiUrl, {
      method: 'POST',
      body: formData,
      mode: 'no-cors' // Google Apps Script requires no-cors mode
    });
    
    console.log('Đã gửi dữ liệu thành công!');
    return true;
  } catch (error) {
    console.error("Lỗi khi gửi dữ liệu:", error);
    return false;
  }
};
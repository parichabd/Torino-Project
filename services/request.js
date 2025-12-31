import api from "./api";

export async function safeRequest(requestFn) {
  try {
    const res = await requestFn();
    return { data: res.data, error: null };
  } catch (err) {
    if (!err.response) {
      // بک‌اند خاموش / نت قطع
      return { data: null, error: "SERVER_DOWN" };
    }

    if (err.response.status >= 500) {
      return { data: null, error: "SERVER_ERROR" };
    }

    return {
      data: null,
      error: err.response.status,
    };
  }
}
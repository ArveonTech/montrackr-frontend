export const handleApiError = (error) => {
  if (!error.response) {
    return Promise.reject({
      message: "Koneksi bermasalah, cek internet 🌐",
    });
  }

  const { status, data } = error.response;

  switch (status) {
    case 401:
      return Promise.reject({ message: "Session habis, login ulang 🔐" });

    case 403:
      return Promise.reject({ message: "Akses ditolak 🚫" });

    case 404:
      return Promise.reject({ message: "Data tidak ditemukan 🔍" });

    case 500:
      return Promise.reject({ message: "Server error, coba lagi nanti ⚠️" });

    default:
      return Promise.reject({
        message: data?.message || "Terjadi kesalahan",
      });
  }
};

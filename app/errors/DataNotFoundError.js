class DataNotFoundError extends Error {
  constructor(message = "Data tidak ditemukan") {
    super(message);

    this.status = "DATA_NOT_FOUND";
    this.statusCode = 404;
  }
}

module.exports = DataNotFoundError;

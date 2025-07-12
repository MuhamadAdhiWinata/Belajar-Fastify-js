module.exports = function (request, reply) {
  const { method, url } = request;
  reply.responseJSON("NOT_FOUND", 404, `Route ${method}:${url} not found`);
};

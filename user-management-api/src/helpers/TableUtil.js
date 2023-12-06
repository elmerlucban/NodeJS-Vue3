const paginate = require('express-paginate');
const ResponseFormatter = require('../helpers/ResponseFormatter');

exports.paginate = (req, totalCount, result) => {
  const defaultLimit = parseInt(req.query.limit) || 10;
  const defaultPage = parseInt(req.query.page) || 1;

  const limit = Math.min(defaultLimit, 100); 
  const offset = (defaultPage - 1) * limit;
  const pageCount = Math.ceil(totalCount / limit);

  const meta = {
    current_page: defaultPage,
    from: defaultPage === 1 ? 1 : offset + 1,
    last_page: pageCount,
    links: paginate.getArrayPages(req)(3, pageCount, defaultPage),
    per_page: limit,
    to: Math.min(offset + limit, totalCount),
    total: totalCount,
  };

  return ResponseFormatter.data(result, meta);
}
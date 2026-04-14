const paginate = async (model, query = {}, reqQuery = {}, options = {}) => {
  const { page = 1, limit = 2, sort = "-createdAt" } = reqQuery;
  const paginationOptions = {
    page: parseInt(page),
    limit: parseInt(limit),
    sort,
    ...options,
  };
  try {
    const result = await model.paginate(query, paginationOptions);
    return {
      data: result.docs,
      lastPage: result.lastPage,
      nextPage: result.nexttPage,
      hasNext: result.hasNext,
      hasPrev: result.hasPrev,
      currentPage: result.page,
      counter: result.pagingCounter ,
      limit: result.limit,
      totalDocs: result.totalDocs,
      totalPages: result.totalPages,
    };
  } catch (err) {
    console.error(err.message);
  }
};

module.exports = paginate;
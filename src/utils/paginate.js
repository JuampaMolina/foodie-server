const DEFAULT_LIMIT = 10;

export default async function paginate(model, query, { page, limit } = {}) {
  if (!page && !limit) {
    return query;
  }

  const resolvedPage = page ?? 1;
  const resolvedLimit = limit ?? DEFAULT_LIMIT;
  const skip = (resolvedPage - 1) * resolvedLimit;

  const [items, total] = await Promise.all([
    query.skip(skip).limit(resolvedLimit),
    model.countDocuments(),
  ]);

  return {
    items,
    page: resolvedPage,
    limit: resolvedLimit,
    total,
    totalPages: Math.ceil(total / resolvedLimit),
  };
}

function catchAsync(fn) {
  return (req, res, nex) => {
    fn(req, res).catch(next);
  };
}

module.exports = catchAsync;

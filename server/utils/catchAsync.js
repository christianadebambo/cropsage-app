module.exports = fn => {
  return (req, res, next) => {
    // Wrap the async function and catch any errors
    fn(req, res, next).catch(next);
  };
};
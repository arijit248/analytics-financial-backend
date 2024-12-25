const analyticsModel = require("../module/analyticsModule");

exports.customerList = (req, res, next) => {
  // const {page,limit} = req.body
  const { query } = req;
  const skip = (query.page - 1) * parseInt(query.limit);
  analyticsModel
    .customerList(skip, parseInt(query.limit))
    .then((custmerlist) => {
      res.status(200).send(custmerlist);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

exports.customerDetails = (req, res, next) => {
  const { id } = req.query;
  analyticsModel
    .customerDetailsById(id)
    .then((custmerDetails) => {
      res.status(200).send(custmerDetails);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

exports.customerTransactionDetails = (req, res, next) => {
  const { account_id } = req.query;
  analyticsModel
    .customerTransactionDetailsByAccountId(Number(account_id))
    .then((custmeTransactiorDetails) => {
      res.status(200).send(custmeTransactiorDetails);
    })
    .catch((err) => {
      console.log(err);
      next();
    });
};

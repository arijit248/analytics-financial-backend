const getDB = require("../utils/db").getDB;
const { ObjectId } = require("mongodb");
class Customer {
  static customerList(skip, limit) {
    let db = getDB();
    return (
      db
        .collection("customers")
        // .find()
        // .project({name:1, email:1, username:1})
        // .skip(skip)
        // .limit(limit)
        .aggregate([
          {
            $facet: {
              customars: [
                { $skip: skip },
                { $limit: limit },
                { $project: { name: 1, email: 1, username: 1, accounts: 1 } },
              ],
              totalCount: [{ $count: "count" }],
            },
          },
        ])
        .toArray()
        .then((result) => {
          return result;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }

  static customerDetailsById(id) {
    let db = getDB();
    return db
      .collection("customers")
      .findOne({ _id: new ObjectId(id) })
      .then((result) => {
        return result;
      })
      .catch((err) => {
        console.log(err);
      });
  }

  static customerTransactionDetailsByAccountId(id) {
    let db = getDB();
    return (
      db
        .collection("transactions")
        // .find({account_id:id})
        .aggregate([
          {
            $match: {
              account_id: id,
            },
          },
          {
            $lookup: {
              from: "accounts",
              localField: "account_id",
              foreignField: "account_id",
              as: "products_transaction",
            },
          },
          {
            $facet: {
              transactionDetails: [
                {
                  $project: {
                    transaction_count: 1,
                    account_id: 1,
                    transactions: 1,
                    // products_transaction: 1,
                    products_transaction: {
                      $map: {
                        input: "$products_transaction.products",
                        as: "product",
                        in: { products: "$$product" },
                      },
                    },
                  },
                },
              ],
            },
          },
        ])
        .toArray()
        .then((result) => {
          console.log(result);
          return result;
        })
        .catch((err) => {
          console.log(err);
        })
    );
  }
}

module.exports = Customer;

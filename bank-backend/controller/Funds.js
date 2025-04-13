const Funds = require('../models/Funds');
const calculate = require('../helpers/Calculate');
const RecordAllDeposit = require('../models/RecordAllDeposit');
const transaction = require('../helpers/Transaction');

exports.makeDeposit = async (req, res, next) => {
  const accountnumber = req.body.accountnumber;
  const firstname = req.body.firstname;
  const lastname = req.body.lastname;
  const amount = parseFloat(req.body.amount);
  const previousAmount = parseFloat(0.00);
  const initialDeposit = new calculate(previousAmount, amount);
  //check if account number does not exist updates new data
  Funds.find({ 'accountnumber': new RegExp(accountnumber, 'i') }).then(data => {
    if (data.length === 0) {
      const deposit = new Funds({
        accountnumber: accountnumber,
        firstname: firstname,
        lastname: lastname,
        amount: amount,
        transaction: {
          transaction_type: "deposits",
          transaction_description: "",
          transaction_reference: transaction.generate_Info(),
          transaction_deposits: amount,
          transaction_withdrawals: "",
          transaction_date: new Date().toLocaleString(),
        },
        account:
        {
          amount: amount,
          previous_balance: 0,
          new_balance: initialDeposit.totaldeposit()
        }

      })
      deposit.save().then(docs => {
        res.status(200).json({ message: `Deposit has been made successfully ,${docs}` });
        //add this transaction to all transactions
        const record = new RecordAllDeposit({
          accountnumber: accountnumber,
          firstname: firstname,
          lastname: lastname,
          amount: amount,
          transaction: {
            transaction_type: "deposits",
            transaction_description: "",
            transaction_reference: transaction.generate_Info(),
            transaction_deposits: amount,
            transaction_withdrawals: "",
            transaction_date: new Date().toLocaleString(),
          },
          account:
          {
            amount: amount,
            previous_balance: 0,
            new_balance: initialDeposit.totaldeposit()
          }

        })
        record.save().then(data => {
          console.log(`transactions has been recorded ${data}`)
        }).catch(error => {
          console.log(error)
        })
      }).catch(error => {
        res.status(500).json({ message: error })
      })
    }
    else {
      //when our account number already exists
      try {
        const existingBalance = data[data.length - 1]['account'][0]['new_balance'];//existing balance of the account number
        const date = data[data.length - 1]['transaction'][0]['transaction_date'];
        const newAmount = parseFloat(req.body.amount);//new amount
        const newDeposit = new calculate(existingBalance, newAmount);
        const total_deposit = newDeposit.totaldeposit();
        console.log('date is', date)
        console.log('total deposit', total_deposit)

        //record deposit transaction

        Funds.updateMany({ transaction_date: date }, {
          accountnumber: accountnumber,
          firstname: firstname,
          lastname: lastname,
          amount: amount,
          transaction: {
            transaction_type: "deposits",
            transaction_description: "Deposits are allowed here",
            transaction_reference: transaction.generate_Info(),
            transaction_deposits: amount,
            transaction_withdrawals: "",
            transaction_date: new Date().toLocaleString(),
          },
          account: {
            amount: amount,
            previous_balance: existingBalance,
            new_balance: total_deposit
          }
        },
          function (err, docs) {
            if (err) res.json(err);
            else res.status(200).json({ message: "Deposit made successfully" });
            console.log(docs)
            //record all deposits transactions
            const record = new RecordAllDeposit({
              accountnumber: accountnumber,
              firstname: firstname,
              lastname: lastname,
              amount: amount,
              transaction: {
                transaction_type: "deposits",
                transaction_description: "",
                transaction_reference: transaction.generate_Info(),
                transaction_deposits: amount,
                transaction_withdrawals: "",
                transaction_date: new Date().toLocaleString(),
              },
              account:
              {
                amount: amount,
                previous_balance: existingBalance,
                new_balance: total_deposit
              }

            })
            record.save().then(docs => {
              console.log(`Transactions has been successfully recorded,${docs}`);
            })
          });
      } catch (error) {
        res.status(400).json({ message: 'No information provided' })
      }


    }
  })

}



# How to spend your time locked transaction

This guide will walk you through the process of claiming a time locked transaction from a USB key. This involves accessing the transaction details on the key, making sure you have the latest version of `lbrynet` and finally using the transaction details to call `account_deposit` to claim your LBC.

## Check `lbrynet` version

If you already have `lbrynet` installed then you can check your version like this:

```
lbrynet version
```

If above command fails, you may need to start `lbrynet` first (and then try above again):

```
lbrynet start
```

If you do not have `lbrynet` installed or your version is less than `v0.108.0` then you can get latest version here:

[https://github.com/lbryio/lbry-sdk/releases](https://github.com/lbryio/lbry-sdk/releases)


## Gather Information

### Transaction ID and Transaction Output Number

1. On the USB key, find a file named `address.txt` and copy the address in this file.
1. Go to [LBRY Explorer](https://explorer.lbry.com/) and enter the address you copied.
1. You should see one transaction containing this address, click on this transaction.
1. You will need two pieces of information on this page, the `transaction id` and the `nout`.
1. The `transaction id` can be found at the top of the page and directly below the text `LBRY Transaction`.
1. The `nout` is the position of the output containing your address, starting with 0. Starting from the top of the list of outputs, count the outputs until you get to your address, then subtract 1 from this count, that is your `nout`.

### Private Key and Redeem Script

1. On the USB key, find a file named `key.zip` and unzip this file using the password emailed to you previously.
1. You should now have a file named `key.txt` which is base64 encoded and contains your `private key` and `redeem script`.
1. To decode the contents of the file you can use a website such as [base64decode.org](https://www.base64decode.org/) (not a secure option) or if you have Python installed you can do this on the command line:
  ```
  python -m base64 -d /path/to/key.txt
  ```
1. After decoding you will see a key/value mapping of various items, including `privateKey` and `redeemScript`. Take note of these values.

## Redeem

Now that you have gathered the necessary information it is easy to redeem your LBC. Time locked transaction can be redeemed using the `lbrynet account deposit` command (fill in the values you gathered previously):

```
lbrynet account deposit <transaction id> <nout> <redeemScript> <privateKey>
```

If you get an error that says `AssertionError: Cannot find private key for signing output.`, try a different number for `<nout>` (for example, increase or decrease it by 1).

Enjoy your LBC!

## Get in touch

Whether you got to the end without a hiccup or you got stuck along the way, we want to hear from you. [Join our Discord](https://discord.gg/y3W9JuS) to get help, stay updated, and talk to other wallet server operators.

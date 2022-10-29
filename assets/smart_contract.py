from django.dispatch import receiver
from pyteal import *


def smart_contract():

    def basic_checks(txn: Txn): return And(
        txn.rekey_to() == Global.zero_address(),
        txn.close_remainder_to() == Global.zero_address()
    )
    program = And(
        basic_checks(Txn),
        Txn.sender() == Addr("PL2QBCRGJGFIZ2T2DU3U55FB6PXP6ECR2RE5VOGFOO7OQTHKZ7RWUM4474"),
        Txn.receiver() == Addr("RTXD6IFUU6PKBD4C3D4MZYLJJUZ55FM5W4KMZC4IR2Z6TSZNM4EJ7GAU4M")
    )

    return program

if __name__ == "__main__":
    print(compileTeal(smart_contract(), mode=Mode.Signature, version=6))

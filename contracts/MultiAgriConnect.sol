// SPDX-License-Identifier: MIT
pragma solidity >=0.5.0 <0.9.0;

contract MultiAgriConnect {
    struct ContractDetails {
        address farmer;
        address buyer;
        string contractDetails;
        bool isSigned;
        uint256 totalAmount;
        uint256 installmentAmount;
        uint256 installmentsRemaining;
        uint256 nextPaymentDue;
    }

    mapping(uint256 => ContractDetails) public contracts;
    uint256 public contractCount;

    mapping(uint256 => mapping(address => uint256)) public paymentsMade;

    event ContractCreated(uint256 indexed contractId, address indexed farmer, address indexed buyer);
    event ContractSigned(uint256 indexed contractId);
    event PaymentMade(uint256 indexed contractId, address indexed payer, uint256 amount);

    function createContract(
        address _farmer,
        string memory _contractDetails,
        uint256 _totalAmount,
        uint256 _installmentAmount
    ) public returns (uint256) {
        contractCount++;
        ContractDetails storage newContract = contracts[contractCount];

        newContract.farmer = _farmer;
        newContract.buyer = msg.sender;
        newContract.contractDetails = _contractDetails;
        newContract.isSigned = false;
        newContract.totalAmount = _totalAmount;
        newContract.installmentAmount = _installmentAmount;
        newContract.installmentsRemaining = _totalAmount / _installmentAmount;
        newContract.nextPaymentDue = block.timestamp;

        emit ContractCreated(contractCount, _farmer, msg.sender);
        return contractCount;
    }

    function signContract(uint256 _contractId) public {
        ContractDetails storage contractToSign = contracts[_contractId];
        require(!contractToSign.isSigned, "Contract is already signed");
        require(msg.sender == contractToSign.buyer, "Only the designated buyer can sign the contract");
        contractToSign.isSigned = true;
        emit ContractSigned(_contractId);
    }

    function makePayment(uint256 _contractId) public payable {
        ContractDetails storage contractToPay = contracts[_contractId];
        require(contractToPay.isSigned, "Contract is not signed");
        require(msg.sender == contractToPay.buyer, "Only the buyer can make payments");
        require(msg.value == contractToPay.installmentAmount, "Incorrect installment amount");

        paymentsMade[_contractId][msg.sender] += msg.value;
        contractToPay.installmentsRemaining -= 1;
        contractToPay.nextPaymentDue = block.timestamp + 30 days;

        if (contractToPay.installmentsRemaining == 0) {
            payable(contractToPay.farmer).transfer(contractToPay.totalAmount);
        } else {
            payable(contractToPay.farmer).transfer(msg.value);
        }

        emit PaymentMade(_contractId, msg.sender, msg.value);
    }

    function getContractDetails(uint256 _contractId) public view returns (
        address farmer,
        address buyer,
        string memory contractDetails,
        bool isSigned,
        uint256 totalAmount,
        uint256 installmentAmount,
        uint256 installmentsRemaining,
        uint256 nextPaymentDue
    ) {
        ContractDetails storage contractToView = contracts[_contractId];
        return (
            contractToView.farmer,
            contractToView.buyer,
            contractToView.contractDetails,
            contractToView.isSigned,
            contractToView.totalAmount,
            contractToView.installmentAmount,
            contractToView.installmentsRemaining,
            contractToView.nextPaymentDue
        );
    }
}
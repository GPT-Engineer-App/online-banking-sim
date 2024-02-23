import React, { useState } from "react";
import { Box, Button, Container, Flex, FormControl, FormLabel, Heading, Input, Stack, Text, VStack, useToast } from "@chakra-ui/react";
import { FaTrash, FaPiggyBank, FaExchangeAlt, FaMoneyBillWave, FaRegCreditCard } from "react-icons/fa";

const initialAccounts = {};

const Index = () => {
  const [accounts, setAccounts] = useState(initialAccounts);
  const [selectedAccount, setSelectedAccount] = useState("");
  const [amount, setAmount] = useState("");
  const [interestRate, setInterestRate] = useState(0.01); // 1% interest rate
  const [loanAmount, setLoanAmount] = useState("");
  const toast = useToast();

  const handleCreateAccount = () => {
    const newAccountId = `acc-${Object.keys(accounts).length + 1}`;
    setAccounts({
      ...accounts,
      [newAccountId]: {
        balance: 0,
        directDebits: [],
      },
    });
    toast({
      title: "Account created.",
      description: `Account ID: ${newAccountId} has been successfully created.`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleSelectAccount = (e) => {
    setSelectedAccount(e.target.value);
  };

  const handleAmountChange = (e) => {
    setAmount(e.target.value);
  };

  const handleLoanAmountChange = (e) => {
    setLoanAmount(e.target.value);
  };

  const handleDeposit = () => {
    if (!selectedAccount || amount <= 0) return;
    const balance = accounts[selectedAccount].balance + parseFloat(amount);
    setAccounts({
      ...accounts,
      [selectedAccount]: {
        ...accounts[selectedAccount],
        balance,
      },
    });
    setAmount("");
    toast({
      title: "Deposit made.",
      description: `Amount of $${amount} deposited to account ${selectedAccount}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleWithdraw = () => {
    if (!selectedAccount || amount <= 0 || accounts[selectedAccount].balance < amount) return;
    const balance = accounts[selectedAccount].balance - parseFloat(amount);
    setAccounts({
      ...accounts,
      [selectedAccount]: {
        ...accounts[selectedAccount],
        balance,
      },
    });
    setAmount("");
    toast({
      title: "Withdrawal made.",
      description: `Amount of $${amount} withdrawn from account ${selectedAccount}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleDeleteAccount = (accountId) => {
    const newAccounts = { ...accounts };
    delete newAccounts[accountId];
    setAccounts(newAccounts);
    if (selectedAccount === accountId) setSelectedAccount("");
    toast({
      title: "Account deleted.",
      description: `Account ID: ${accountId} has been deleted successfully.`,
      status: "error",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleApplyInterest = () => {
    if (!selectedAccount) return;
    const balance = accounts[selectedAccount].balance + accounts[selectedAccount].balance * interestRate;
    setAccounts({
      ...accounts,
      [selectedAccount]: {
        ...accounts[selectedAccount],
        balance,
      },
    });
    toast({
      title: "Interest applied.",
      description: `Interest applied to account ${selectedAccount}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  const handleTakeLoan = () => {
    if (!selectedAccount || loanAmount <= 0) return;
    const balance = accounts[selectedAccount].balance + parseFloat(loanAmount);
    setAccounts({
      ...accounts,
      [selectedAccount]: {
        ...accounts[selectedAccount],
        balance,
        loan: (accounts[selectedAccount].loan || 0) + parseFloat(loanAmount),
      },
    });
    setLoanAmount("");
    toast({
      title: "Loan taken.",
      description: `Loan of $${loanAmount} taken on account ${selectedAccount}`,
      status: "success",
      duration: 5000,
      isClosable: true,
    });
  };

  return (
    <Container maxW="container.md">
      <VStack spacing={4} align="stretch">
        <Box p={5} shadow="md" borderWidth="1px">
          <Heading fontSize="xl">Banking Simulator</Heading>
        </Box>

        <Button leftIcon={<FaPiggyBank />} onClick={handleCreateAccount}>
          Create New Account
        </Button>

        <FormControl id="account-id">
          <FormLabel>Select Account</FormLabel>
          <Input as="select" value={selectedAccount} onChange={handleSelectAccount} placeholder="Select account">
            <option value="">Select account</option>
            {Object.keys(accounts).map((accountId) => (
              <option key={accountId} value={accountId}>
                {accountId} - ${accounts[accountId].balance.toFixed(2)}
              </option>
            ))}
          </Input>
        </FormControl>

        <Heading size="md" my={4}>
          Manage Account
        </Heading>

        <Flex>
          <FormControl id="amount" flex="1" mr={2}>
            <FormLabel>Amount</FormLabel>
            <Input value={amount} onChange={handleAmountChange} placeholder="Enter amount" />
          </FormControl>
          <Button leftIcon={<FaMoneyBillWave />} colorScheme="green" onClick={handleDeposit}>
            Deposit
          </Button>
          <Button leftIcon={<FaMoneyBillWave />} colorScheme="red" ml={2} onClick={handleWithdraw}>
            Withdraw
          </Button>
        </Flex>

        <Flex mt={4}>
          <FormControl id="loan-amount" flex="1" mr={2}>
            <FormLabel>Loan Amount</FormLabel>
            <Input value={loanAmount} onChange={handleLoanAmountChange} placeholder="Enter loan amount" />
          </FormControl>
          <Button leftIcon={<FaRegCreditCard />} colorScheme="teal" onClick={handleTakeLoan}>
            Take Loan
          </Button>
        </Flex>

        <Button leftIcon={<FaExchangeAlt />} colorScheme="blue" mt={4} onClick={handleApplyInterest}>
          Apply Interest
        </Button>

        <Stack direction="row" spacing={4} align="center" mt={4}>
          {Object.keys(accounts).map((accountId) => (
            <Flex key={accountId} p={3} shadow="md" borderWidth="1px" borderRadius="md" align="center">
              <Text mr={4}>
                {accountId} - ${accounts[accountId].balance.toFixed(2)}
              </Text>
              <Button leftIcon={<FaTrash />} colorScheme="red" size="sm" onClick={() => handleDeleteAccount(accountId)}>
                Delete
              </Button>
            </Flex>
          ))}
        </Stack>
      </VStack>
    </Container>
  );
};

export default Index;

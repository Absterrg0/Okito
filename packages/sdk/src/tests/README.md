# SDK Test Suite

This comprehensive test suite validates all functionality of the Solana SDK, ensuring reliability and correctness across all token operations.

## Test Structure

```
tests/
├── setup.ts                          # Test utilities and mock setup
├── token/
│   └── token-supply.test.ts          # Token supply function tests
├── account/
│   ├── token-balance.test.ts         # Token balance function tests
│   └── transaction-history.test.ts   # Transaction history tests
├── payment/
│   └── pay.test.ts                   # Payment function tests
├── operations/
│   └── base-operation.test.ts        # Operation class tests
├── integration/
│   └── sdk-integration.test.ts       # Full SDK integration tests
└── README.md                         # This file
```

## Running Tests

### All Tests
```bash
npm test
```

### Watch Mode (Development)
```bash
npm run test:watch
```

### Coverage Report
```bash
npm run test:coverage
```

### Unit Tests Only
```bash
npm run test:unit
```

### Integration Tests Only
```bash
npm run test:integration
```

## Test Categories

### 1. Unit Tests

#### Token Supply Tests (`token/token-supply.test.ts`)
- ✅ Valid mint address handling
- ✅ Invalid mint address error handling
- ✅ Connection error handling
- ✅ UI amount calculations
- ✅ Symbol-based lookups
- ✅ Edge cases (zero supply, large amounts)
- ✅ Performance validation
- ✅ Concurrent request handling

#### Token Balance Tests (`account/token-balance.test.ts`)
- ✅ Valid wallet and mint combinations
- ✅ Wallet validation (connected/disconnected)
- ✅ Non-existent token accounts
- ✅ Invalid mint addresses
- ✅ Connection errors
- ✅ Different token decimals
- ✅ Large and fractional balances
- ✅ Multiple wallet compatibility
- ✅ Performance benchmarks

#### Transaction History Tests (`account/transaction-history.test.ts`)
- ✅ Wallet validation
- ✅ Pagination (before/until parameters)
- ✅ Limit validation (1-1000)
- ✅ Different commitment levels
- ✅ Empty transaction lists
- ✅ Connection errors
- ✅ Rate limiting handling
- ✅ Failed transaction parsing
- ✅ Pagination detection (hasMore)
- ✅ Legacy function compatibility

#### Payment Tests (`payment/pay.test.ts`)
- ✅ USDC and USDT payments
- ✅ Wallet validation
- ✅ Amount conversion (human-readable to raw)
- ✅ Configuration handling
- ✅ Transfer failures
- ✅ Edge cases (zero, negative, large amounts)
- ✅ Concurrent payments
- ✅ Legacy function compatibility

#### Operation Class Tests (`operations/base-operation.test.ts`)
- ✅ BurnTokenOperation functionality
- ✅ TransferTokenOperation functionality
- ✅ AirdropOperation functionality
- ✅ Base operation features
- ✅ Error handling across operations
- ✅ Configuration options
- ✅ Performance validation
- ✅ State management

### 2. Integration Tests (`integration/sdk-integration.test.ts`)

#### Complete Workflows
- ✅ Token management workflow (supply → balance → transfer → burn → history)
- ✅ Payment workflow (balance check → payment → verification)
- ✅ Airdrop workflow (balance check → airdrop → result validation)

#### Error Handling Integration
- ✅ Cascading failures
- ✅ Wallet disconnection across operations
- ✅ Invalid token addresses

#### Performance Integration
- ✅ Concurrent operations
- ✅ Multiple wallets
- ✅ Timing benchmarks

#### Real-world Scenarios
- ✅ DeFi interaction flows
- ✅ Merchant payment scenarios
- ✅ Token distribution scenarios

#### SDK Stability
- ✅ API consistency
- ✅ Version compatibility
- ✅ Function signature validation

## Test Configuration

### Mock Setup (`setup.ts`)
The test suite uses comprehensive mocking to ensure predictable, fast tests:

- **MockWallet**: Implements `SignerWallet` interface with random keypairs
- **MockConnection**: Extends Solana `Connection` with mock responses
- **Test Configuration**: Predefined constants for consistent testing
- **Utility Functions**: Helper functions for test setup and teardown

### Test Data
- **Networks**: Devnet endpoints for safe testing
- **Token Mints**: USDC/USDT devnet addresses
- **Amounts**: Standardized test amounts with proper decimals
- **Wallets**: Randomly generated keypairs for isolation

## Coverage Goals

The test suite aims for comprehensive coverage:

- **Functions**: 100% of exported functions
- **Branches**: All error paths and edge cases
- **Lines**: Complete code execution coverage
- **Integration**: End-to-end workflow validation

## Test Principles

### 1. Isolation
- Each test is independent
- Mocks reset between tests
- No shared state between test suites

### 2. Predictability
- Deterministic mock responses
- Consistent test data
- Reproducible results

### 3. Performance
- Fast execution (< 30 seconds total)
- Timeout protection (30 second max per test)
- Concurrent test execution where safe

### 4. Realism
- Real wallet implementations
- Actual Solana data structures
- Production-like error scenarios

## Mock Strategy

### Connection Mocking
```typescript
// Mock successful responses in test environment
if (process.env.NODE_ENV === 'test') {
    return this.mockResponses.get('methodName');
}
return super.methodName(params);
```

### Function Mocking
```typescript
// Mock external dependencies
jest.mock('../../src/module', () => ({
    functionName: jest.fn()
}));
```

### Wallet Mocking
```typescript
// Generate random wallets for each test
const wallet = createTestWallet();
expect(wallet.publicKey).toBeDefined();
expect(wallet.connected).toBe(true);
```

## Adding New Tests

### 1. Unit Tests
```typescript
describe('New Function', () => {
    test('should handle valid input', async () => {
        const result = await newFunction(validInput);
        expect(result.success).toBe(true);
    });
    
    test('should handle invalid input', async () => {
        const result = await newFunction(invalidInput);
        expect(result.success).toBe(false);
        expect(result.error).toBeDefined();
    });
});
```

### 2. Integration Tests
```typescript
test('should handle complete new workflow', async () => {
    // 1. Setup
    const setup = await setupNewWorkflow();
    
    // 2. Execute workflow steps
    const step1 = await executeStep1(setup);
    const step2 = await executeStep2(step1.result);
    
    // 3. Validate results
    expect(step2.success).toBe(true);
});
```

## Continuous Integration

The test suite is designed for CI/CD integration:

- **Fast execution**: Completes in under 30 seconds
- **No external dependencies**: Fully mocked
- **Coverage reporting**: Generates lcov reports
- **Exit codes**: Proper success/failure indication
- **Parallel execution**: Safe for concurrent runs

## Test Maintenance

### Regular Tasks
1. **Update mocks** when Solana libraries change
2. **Add tests** for new SDK functions
3. **Review coverage** reports for gaps
4. **Benchmark performance** for regressions

### Mock Data Updates
- Update devnet mint addresses if they change
- Refresh mock transaction signatures
- Verify mock account data structures

## Troubleshooting

### Common Issues

1. **Test timeouts**: Increase timeout in jest.config.js
2. **Mock failures**: Check NODE_ENV=test is set
3. **Import errors**: Verify all dependencies are mocked
4. **Wallet issues**: Ensure fresh wallets per test

### Debug Mode
```bash
# Run with verbose output
npm test -- --verbose

# Run single test file
npm test -- token-supply.test.ts

# Run with coverage details
npm run test:coverage -- --verbose
```

This comprehensive test suite ensures the SDK is production-ready and maintains high quality standards across all functionality. 
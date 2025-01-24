import { describe, it, expect } from 'vitest'
import * as timestamp from '../src/utils/Timestamp'
import { daysInMonth, isBuddhistLeapYear, isBuddhistGreatLeapYear } from '../src/utils/Timestamp'

describe('[TIMESTAMP] isLeapYear', () => {
  // Gregory Calendar Tests
  it('2020 (Gregorian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2020, 'gregory')
    expect(tests).toBe(true)
  })

  it('2019 (Gregorian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2019, 'gregory')
    expect(tests).toBe(false)
  })

  it('2000 (Gregorian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2000, 'gregory')
    expect(tests).toBe(true)
  })

  it('2100 (Gregorian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2100, 'gregory')
    expect(tests).toBe(false)
  })

  // ISO8601 Calendar Tests (matches Gregorian)
  it('2020 (ISO8601) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2020, 'iso8601')
    expect(tests).toBe(true)
  })

  it('2019 (ISO8601) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2019, 'iso8601')
    expect(tests).toBe(false)
  })

  // Buddhist Calendar Tests
  it('Year 2567 (Buddhist) is a Leap Year', () => {
    expect(isBuddhistLeapYear(2567)).toBe(true)
  })

  it('Year 2565 (Buddhist) is a Leap Year', () => {
    expect(isBuddhistLeapYear(2565)).toBe(true)
  })

  it('Year 2568 (Buddhist) is a Great Leap Year', () => {
    expect(isBuddhistGreatLeapYear(2568)).toBe(true)
  })

  it('Year 2567 (Buddhist) and Month 3 has 30 days', () => {
    expect(daysInMonth(2567, 3, 'buddhist')).toBe(30)
  })

  it('Year 2568 (Buddhist) and Month 3 has 30 days (Great Leap Year)', () => {
    expect(daysInMonth(2568, 3, 'buddhist')).toBe(30)
  })
  // Ethiopic Calendar Tests
  it('2000 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2000, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 400
  })

  it('1900 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1900, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 100 but not 400
  })

  it('2004 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2004, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 4 but not 100
  })

  it('2001 (Ethiopic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2001, 'ethiopic')
    expect(tests).toBe(false) // Not divisible by 4
  })

  it('1600 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1600, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 400
  })

  it('1700 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1700, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 100 but not 400
  })

  it('2024 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2024, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 4 but not 100
  })

  it('2100 (Ethiopic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2100, 'ethiopic')
    expect(tests).toBe(true) // Divisible by 4 but not 100
  })

  it('2023 (Ethiopic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(2023, 'ethiopic')
    expect(tests).toBe(false) // Not divisible by 4
  })

  // Hebrew Calendar Tests
  // https://www.torahcalc.com/tools/leap-years
  it('5785 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5785, 'hebrew')
    expect(tests).toBe(false)
  })

  it('5784 (Hebrew) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5784, 'hebrew')
    expect(tests).toBe(true)
  })

  it('5783 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5783, 'hebrew')
    expect(tests).toBe(false)
  })

  it('5782 (Hebrew) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5782, 'hebrew')
    expect(tests).toBe(true)
  })

  it('5781 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5781, 'hebrew')
    expect(tests).toBe(false)
  })

  it('5780 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5780, 'hebrew')
    expect(tests).toBe(false)
  })

  it('5779 (Hebrew) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5779, 'hebrew')
    expect(tests).toBe(true)
  })

  it('5778 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5778, 'hebrew')
    expect(tests).toBe(false)
  })

  it('5777 (Hebrew) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(5777, 'hebrew')
    expect(tests).toBe(false)
  })

  // Islamic Calendar Tests
  it('1443 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1443, 'islamic')
    expect(tests).toBe(false)
  })

  it('1444 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1444, 'islamic')
    expect(tests).toBe(false) // Year 2 of the cycle
  })

  it('1451 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1451, 'islamic')
    expect(tests).toBe(false) // Year 1 of the cycle
  })

  it('1453 (Islamic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1453, 'islamic')
    expect(tests).toBe(true) // Year 2 of the cycle
  })

  it('1455 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1455, 'islamic')
    expect(tests).toBe(false) // Year 4 of the cycle
  })

  it('1463 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1463, 'islamic')
    expect(tests).toBe(false) // Year 11 of the cycle
  })

  it('1464 (Islamic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1464, 'islamic')
    expect(tests).toBe(true) // Year 13 of the cycle
  })

  it('1499 (Islamic) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1499, 'islamic')
    expect(tests).toBe(true) // Year 29 of the cycle
  })

  it('1500 (Islamic) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1500, 'islamic')
    expect(tests).toBe(false) // Year 30 of the cycle
  })

  // Persian Calendar Tests
  it('1399 (Persian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1399, 'persian')
    expect(tests).toBe(true) // Confirm Esfand 30 exists
  })

  it('1400 (Persian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1400, 'persian')
    expect(tests).toBe(false)
  })

  it('1403 (Persian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1403, 'persian')
    expect(tests).toBe(false)
  })

  it('1404 (Persian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1404, 'persian')
    expect(tests).toBe(true)
  })

  it('1408 (Persian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1408, 'persian')
    expect(tests).toBe(true)
  })

  it('1410 (Persian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1410, 'persian')
    expect(tests).toBe(false)
  })

  it('1412 (Persian) is a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1412, 'persian')
    expect(tests).toBe(true)
  })

  it('1414 (Persian) is NOT a Leap Year', async () => {
    const tests = timestamp.isLeapYear(1414, 'persian')
    expect(tests).toBe(false)
  })
})

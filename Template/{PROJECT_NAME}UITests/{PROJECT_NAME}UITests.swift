//
//  {PROJECT_NAME}UITests.swift
//  {PROJECT_NAME}UITests
//
//  Created by {AUTHOR} on {TODAY}.
//  Copyright © {YEAR} {ORGANIZATION}. All rights reserved.
//

import XCTest

class {PROJECT_NAME}UITests: XCTestCase {
    override func setUp() {
        super.setUp()
        // Put setup code here. This method is called before the invocation of each test method in the class.
        continueAfterFailure = false
        XCUIApplication().launch()
    }

    override func tearDown() {
        // Put teardown code here. This method is called after the invocation of each test method in the class.
        super.tearDown()
    }

    func testExample() {
        // This is an example of a functional test case.
        // Use XCTAssert and related functions to verify your tests produce the correct results.
    }
}

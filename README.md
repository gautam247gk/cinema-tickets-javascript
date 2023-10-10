# Cinema Tickets JavaScript

This is a coding exercise by DWP which will allow me to demonstrate how I code and my approach to a given problem.

## Installation

To install this project, you will need to have [Node.js](https://nodejs.org/en/) and [npm](https://www.npmjs.com/) installed on your machine. Once you have those installed, you can run the following command in your terminal:

`npm install`

This will install all of the necessary dependencies for the project.

## Usage

To run the project, you can use the following command:

`npm start`

This will start the project and run the sample code in the index.js file.

## Testing

To run the tests for the project, you can use the following command:

`npm test`

This will run all of the tests using the Mocha.js library and output the results in your terminal.
The test results should validate the given buisiness rules and constarints of the project which are as follows:

### Business Rules

- There are 3 types of tickets i.e. Infant, Child, and Adult.

- The ticket prices are based on the type of ticket (see table below).

- The ticket purchaser declares how many and what type of tickets they want to buy.

- Multiple tickets can be purchased at any given time.

- Only a maximum of 20 tickets that can be purchased at a time.

- Infants do not pay for a ticket and are not allocated a seat. They will be sitting on an Adult's lap.

- Child and Infant tickets cannot be purchased without purchasing an Adult ticket.

| Ticket Type | Price |

| ------ | --- |

| INFANT | £0 |

| CHILD | £10 |

| ADULT | £20 |

- There is an existing `TicketPaymentService` responsible for taking payments.

- There is an existing `SeatReservationService` responsible for reserving seats.

### Constraints

- The TicketService interface CANNOT be modified. (For Java solution only)

- The code in the thirdparty.\* packages CANNOT be modified.

- The `TicketTypeRequest` SHOULD be an immutable object.

## Contributing

If you would like to contribute to this project, please fork the repository and submit a pull request.

## License

This project is licensed under the [MIT License](https://opensource.org/licenses/MIT).

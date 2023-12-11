// import TicketTypeRequest from "./lib/TicketTypeRequest.js";
// import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";

// export default class TicketService {
//   /**
//    * Should only have private methods other than the one below.
//    */

//   purchaseTickets(accountId, ...ticketTypeRequests) {
//     // throws InvalidPurchaseException
//   }
// }

import TicketTypeRequest from "./lib/TicketTypeRequest.js";
import InvalidPurchaseException from "./lib/InvalidPurchaseException.js";
import TicketPaymentService from "../thirdparty/paymentgateway/TicketPaymentService.js";
import SeatReservationService from "../thirdparty/seatbooking/SeatReservationService.js";

export default class TicketService {
  /**
   * Should only have private methods other than the one below.
   */

  purchaseTickets(accountId, ...ticketTypeRequests) {
    // Checking if the number of requested tickets exceeds the maximum limit whicih is 20
    if (ticketTypeRequests.length > 20) {
      throw new InvalidPurchaseException(
        "Maximum of 20 tickets can be purchased at a time."
      );
    }

    let totalCost = 0;

    // counters for each ticket type
    let infantCount = 0;
    let childCount = 0;
    let adultCount = 0;

    // Loop to iterate through the ticketTypeRequests
    for (const request of ticketTypeRequests) {
      if (!(request instanceof TicketTypeRequest)) {
        throw new InvalidPurchaseException("Invalid ticket request.");
      }

      // Count the number of each ticket type
      switch (request.getTicketType()) {
        case "INFANT":
          infantCount += request.getNoOfTickets();
          break;
        case "CHILD":
          childCount += request.getNoOfTickets();
          break;
        case "ADULT":
          adultCount += request.getNoOfTickets();
          break;
        default:
          throw new InvalidPurchaseException("Invalid ticket type.");
      }

      // Calculate the cost of each ticket using a private method and multiplying
      // with no of tickets of that type and add it to the total cost
      totalCost +=
        this.#calculateTicketCost(request.getTicketType()) *
        request.getNoOfTickets();
    }
    // console.log("Counts", infantCount, childCount, adultCount);
    //console.log("Total Cost", totalCost);

    // Condition to check that infants are accompanied by adults
    if (infantCount > 0 && adultCount === 0) {
      throw new InvalidPurchaseException(
        "Infant tickets require at least one adult ticket."
      );
    }
    // Make a payment request to the TicketPaymentService
    let tps = new TicketPaymentService();
    tps.makePayment(accountId, totalCost);

    // Make a seat reservation request to the SeatReservationService
    let srs = new SeatReservationService();
    srs.reserveSeat(accountId, adultCount + childCount);

    // console.log(adultCount + childCount + " Tickets purchased successfully.");
    return totalCost;
  }

  // Private method(ES2020) to calculate the cost of a ticket based on its type
  #calculateTicketCost(ticketType) {
    switch (ticketType) {
      case "INFANT":
        return 0;
      case "CHILD":
        return 10;
      case "ADULT":
        return 20;
      default:
        throw new InvalidPurchaseException("Invalid ticket type.");
    }
  }
}

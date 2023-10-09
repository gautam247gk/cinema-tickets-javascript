import TicketService from "./pairtest/TicketService.js";
import TicketTypeRequest from "./pairtest/lib/TicketTypeRequest.js";

// Intialize the TicketService class
const t = new TicketService();
console.log("TicketService initialized.");
// Purchase tickets

// const ticketTypeRequests = Array.from(
//   { length: 20 }, // change to 21 to trigger invalid purchase exception
//   () => new TicketTypeRequest("ADULT", 1)
// );

// purachae 3 infant and 1 adult
const ticketTypeRequests = [
  new TicketTypeRequest("CHILD", 3),
  new TicketTypeRequest("ADULT", 1),
];
t.purchaseTickets(1234, ...ticketTypeRequests);

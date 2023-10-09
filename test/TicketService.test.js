import { assert } from "chai";
import TicketService from "../src/pairtest/TicketService.js";
import InvalidPurchaseException from "../src/pairtest/lib/InvalidPurchaseException.js";
import TicketTypeRequest from "../src/pairtest/lib/TicketTypeRequest.js";

describe("TicketService.js", () => {
  describe("PurchaseTickets", () => {
    it("should throw an error if more than 20 tickets are requested", () => {
      const service = new TicketService();
      const accountId = 210947;
      const ticketTypeRequests = Array.from(
        { length: 21 },
        () => new TicketTypeRequest("ADULT", 1)
      );
      assert.throws(
        () => service.purchaseTickets(accountId, ...ticketTypeRequests),
        InvalidPurchaseException
      );
    });

    it("should throw an error if an invalid ticket request is made", () => {
      const service = new TicketService();
      const accountId = 210947;
      const ticketTypeRequests = [
        new TicketTypeRequest("ADULT", 1),
        "invalid-ticket-request",
      ];
      assert.throws(
        () => service.purchaseTickets(accountId, ...ticketTypeRequests),
        InvalidPurchaseException
      );
    });

    it("should throw an error if infants are not accompanied by adults", () => {
      const service = new TicketService();
      const accountId = 210947;
      const ticketTypeRequests = [new TicketTypeRequest("INFANT", 1)];
      assert.throws(
        () => service.purchaseTickets(accountId, ...ticketTypeRequests),
        InvalidPurchaseException
      );
    });

    it("should make a payment request and a seat reservation request", () => {
      const paymentServiceMock = {
        makePayment: (accountId, amount) => {
          assert.strictEqual(accountId, 210947);
          assert.strictEqual(amount, 20);
        },
      };
      const reservationServiceMock = {
        reserveSeats: (accountId, count) => {
          assert.strictEqual(accountId, 210947);
          assert.strictEqual(count, 1);
        },
      };
      const service = new TicketService(
        paymentServiceMock,
        reservationServiceMock
      );
      const accountId = 210947;
      const ticketTypeRequests = [new TicketTypeRequest("ADULT", 1)];
      service.purchaseTickets(accountId, ...ticketTypeRequests);
    });
  });

  describe("CalculateTicketCost", () => {
    it("should return the correct cost for an infant ticket", () => {
      const service = new TicketService();
      const cost = service.calculateTicketCost("INFANT");
      assert.strictEqual(cost, 0);
    });

    it("should return the correct cost for a child ticket", () => {
      const service = new TicketService();
      const cost = service.calculateTicketCost("CHILD");
      assert.strictEqual(cost, 10);
    });

    it("should return the correct cost for an adult ticket", () => {
      const service = new TicketService();
      const cost = service.calculateTicketCost("ADULT");
      assert.strictEqual(cost, 20);
    });

    it("should throw an error for an invalid ticket type", () => {
      const service = new TicketService();
      assert.throws(
        () => service.calculateTicketCost("INVALID"),
        InvalidPurchaseException
      );
    });
  });
});

/**
 * Constants barrel — import all model constants from one place.
 * Usage: const { ALLOCATION_STATUS, BOOKING_STATUS } = require('../models/constants');
 */
const { ALLOCATION_STATUS, ALLOCATION_TYPE, RETURN_CONDITION } = require('./allocationStatus');
const { BOOKING_STATUS, BOOKING_TYPE } = require('./bookingStatus');

module.exports = {
  ALLOCATION_STATUS,
  ALLOCATION_TYPE,
  RETURN_CONDITION,
  BOOKING_STATUS,
  BOOKING_TYPE,
};

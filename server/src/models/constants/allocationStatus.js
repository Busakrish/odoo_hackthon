/**
 * Allocation Status Constants
 * Single source of truth — import these everywhere instead of raw strings.
 * Prevents typos across controllers, services, and validations.
 */
const ALLOCATION_STATUS = Object.freeze({
  ACTIVE:      'Active',
  TRANSFERRED: 'Transferred',
  RETURNED:    'Returned',
});

/**
 * Allocation Type Constants
 */
const ALLOCATION_TYPE = Object.freeze({
  PERMANENT:  'Permanent',
  TEMPORARY:  'Temporary',
});

/**
 * Return Condition Constants
 */
const RETURN_CONDITION = Object.freeze({
  EXCELLENT: 'Excellent',
  GOOD:      'Good',
  DAMAGED:   'Damaged',
  LOST:      'Lost',
});

module.exports = { ALLOCATION_STATUS, ALLOCATION_TYPE, RETURN_CONDITION };

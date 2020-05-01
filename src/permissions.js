// Permissions:
// Total: 8 bits
// Scope: 1 bit (0 => SELF, 1 => ANY)
// Resources: 2 bits (00 => Appointment, 01=>Record)
// Actions: 5 bits

export default {
  SCOPE: {
    SELF: 0b00000000,
    ANY: 0b10000000,
  },
  RESOURCE: {
    APPOINTMENT: 0b0000000,
    RECORD: 0b0100000,
  },
  ACTIONS: {
    VIEW: 0b00001,
    CREATE: 0b00010,
    MODIFY: 0b00100,
    DELETE: 0b01000,
  },
};

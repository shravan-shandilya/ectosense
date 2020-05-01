// Permissions:
// 8 bits
// First 3 bits represet resource
// Next 5 bits represent actions on resource

export default {
  APPOINTMENT: {
    VIEW: 0b00000000,
    CREATE: 0b00000001,
    MODIFY: 0b00000010,
    DELETE: 0b00000011,
  },
  RECORD: {
    VIEW: 0b00100000,
    CREATE: 0b00100001,
    MODIFY: 0b00100010,
    DELETE: 0b00100011,
  },
};
